/**
 * CMS data loader + adapters (SSR-side).
 *
 * Fetches every Phase-6 collection + global from Payload at SSR boot, caches
 * in-memory (60s TTL), exposes synchronous getters to React components, and
 * hydrates the client via embedded JSON in entry-server.tsx so the first
 * client render matches SSR.
 *
 * Why fetch eagerly at boot rather than per-request:
 *   - SSR render is synchronous (renderToString)
 *   - Catalogue is small (~150 price items, 93 procedures, 17 sub-cats, 8 surgeons)
 *   - Whole cache fits comfortably in memory
 *   - When Payload mutates, the afterChange hook POSTs /api/revalidate on the
 *     web → cache is invalidated within seconds
 *
 * The `adaptCms*` helpers convert CMS payloads into the same shapes the
 * existing `src/content/*.ts` files used, so component code that referenced
 * `Treatment` / `Surgeon` / `SubCategoryEntry` etc. doesn't need to be
 * structurally rewritten — only its data source.
 */

const PAYLOAD_URL = process.env.PAYLOAD_URL || 'http://127.0.0.1:4007'

/**
 * Browser-visible Payload origin. Empty string means "root-relative" —
 * the browser hits `/api/media/...` which nginx routes to :4007. The
 * server-internal PAYLOAD_URL above is used only for SSR-time fetches.
 * Don't bake the internal 127.0.0.1:4007 into HTML; it isn't reachable
 * from outside the box.
 */
const PUBLIC_PAYLOAD_URL = process.env.PUBLIC_PAYLOAD_URL || ''

/* ─── Lexical types ────────────────────────────────────────────────────── */

export type LexicalNode = {
  type?: string
  text?: string
  tag?: string
  format?: number | string
  children?: LexicalNode[]
  [key: string]: unknown
}
export type Lexical = { root: { children: LexicalNode[] } } | undefined | null

/* ─── Collection types ─────────────────────────────────────────────────── */

export type CmsMediaSize = {
  url?: string
  width?: number
  height?: number
  mimeType?: string
  filesize?: number
  filename?: string
}

export type CmsMedia = {
  id: number
  alt?: string
  url?: string
  filename?: string
  width?: number
  height?: number
  mimeType?: string
  /** Seeded placeholder — suppressed from public rendering. */
  isPlaceholder?: boolean
  /**
   * Payload imageSizes outputs — produced by Sharp at upload time per
   * Media.upload.imageSizes config. Keys match the `name` of each size
   * (sm, md, lg, xl, xxl). Used by <Img> to emit <picture> srcset.
   */
  sizes?: Partial<Record<'sm' | 'md' | 'lg' | 'xl' | 'xxl', CmsMediaSize>>
}

export type Surgeon = {
  id: number
  slug: string
  name: string
  commonName?: string
  title?: string
  suffix?: string
  spec?: string
  train?: string
  proc?: string
  credLine?: string
  yearsInPractice?: number
  hue?: number
  group: 'plastic-surgery' | 'aesthetic-medicine'
  lead?: boolean
  bio?: Lexical
  specAreas?: Array<{ value: string }>
  portrait?: number | CmsMedia
  portraitPosition?: string
  credentialedProcedures?: Array<number | Procedure>
  /** Surgeon availability schedule — array of { day, windowStart, windowEnd, byAppointment }. */
  availabilitySchedule?: Array<{
    day: 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun'
    windowStart?: string
    windowEnd?: string
    byAppointment?: boolean
  }>
  languages?: Array<{ code: string }>
  sortOrder?: number
}

export type Discipline = {
  id: number
  slug: string
  order?: number
  title: string
  subtitle?: string
  displayCount?: string
  hue?: number
  body?: Lexical
  chapterTitle?: { a?: string; b?: string }
  tagline?: string
  lede?: string
  overview?: Lexical
  heroImage?: number | CmsMedia
  leadSurgeons?: Array<number | Surgeon>
  faqs?: Array<{ q: string; a: string }>
  sortOrder?: number
}

export type SubCategorySection = { anchorId: string; t: string; body: Lexical }

export type SubCategory = {
  id: number
  slug: string
  parent?: number | Discipline
  title: string
  chapterTitle?: { a?: string; b?: string }
  tagline?: string
  lede?: string
  intro?: Lexical
  overview?: Lexical
  leadSurgeon?: number | Surgeon
  sections?: SubCategorySection[]
  faqs?: Array<{ q: string; a: string }>
  heroImage?: number | CmsMedia
  sortOrder?: number
}

export type Procedure = {
  id: number
  slug: string
  name: string
  shortName?: string
  parentDiscipline?: number | Discipline
  parentSubCategory?: number | SubCategory
  description?: Lexical
  sections?: SubCategorySection[]
  faqs?: Array<{ q: string; a: string }>
  pricing?: {
    priceIdr2025?: number
    priceAud2025?: number
    priceIdr2026?: number
    priceAud2026?: number
    priceIdrRangeLow?: number
    priceIdrRangeHigh?: number
    priceNotes?: string
    displayYear?: '2025' | '2026'
  }
  featuredRank?: number
  includesImplant?: boolean
  detail?: {
    duration?: string
    recovery?: string
    included?: Array<{ value: string }>
  }
  sortOrder?: number
  heroImage?: number | CmsMedia
  surgeonsCredentialed?: Array<number | Surgeon>
  /** What's covered — relation to InclusionItems global. */
  included?: Array<number | { id: number; slug?: string; label?: string }>
  /** What's NOT included — relation to ExclusionItems global. */
  excluded?: Array<number | { id: number; slug?: string; label?: string }>
  /** Per-procedure recovery timeline (relation to JourneySteps). */
  recoveryTimeline?: Array<number | { id: number; slug?: string; title?: string; body?: string }>
  /** Related before/after composites. */
  relatedBA?: Array<number | BeforeAfterCase>
  /** Related procedures cross-links. */
  relatedProcedures?: Array<number | { id: number; slug?: string; name?: string }>
}

export type PriceListItem = {
  id: number
  slug: string
  sheet: 'surgical' | 'non-surgical' | 'machine' | 'injection' | 'btl'
  category?: string
  subCategory?: string
  name: string
  unit?: string
  audienceTier?: string
  notes?: string
  priceIdr2025?: number
  priceAud2025?: number
  priceIdr2026?: number
  priceAud2026?: number
  priceIdrRangeLow?: number
  priceIdrRangeHigh?: number
  featuredRank?: number
  includesImplant?: boolean
  sortOrder?: number
  /** Optional relation to the matching Procedure record (for "Learn more"). */
  linkedProcedure?: { id: number; slug?: string; name?: string } | number | null
  linkedInjectableProduct?: { id: number; slug?: string; name?: string } | number | null
  linkedMachineTreatment?: { id: number; slug?: string; machineName?: string; area?: string } | number | null
}

export type InjectableProduct = {
  id: number
  slug: string
  name: string
  brand?: string
  productLine?: string
  category: string
  unit?: string
  priceIdr?: number
  priceAud?: number
  notes?: string
  /** Free-text manufacturer name (rendered as small caption on pricing rows). */
  manufacturer?: string
  /** True when the product carries FDA clearance — surfaced as a small badge. */
  fdaApproved?: boolean
}

export type MachineTreatment = {
  id: number
  slug: string
  machineName: string
  area: string
  pricing?: { standardIdr?: number; kitasKtpIdr?: number; packageIdr?: number }
  notes?: string
  /** Optional relation to the matching Procedure record. */
  linkedProcedure?: { id: number; slug?: string; name?: string } | number | null
}

export type HairRemovalArea = {
  id: number
  slug: string
  area: string
  bodyZone: 'face' | 'upper-body' | 'lower-body' | 'package' | 'other'
  priceIdr?: number
  notes?: string
}

export type BeforeAfterCase = {
  id: number
  slug: string
  caseLabel: string
  procedure?: number | Procedure
  composite?: number | CmsMedia
  beforeAlt?: string
  afterAlt?: string
  surgeon?: number | Surgeon
  tags?: Array<{ value: string }>
  description?: Lexical
  year?: number
  isFeatured?: boolean
  sortOrder?: number
}

export type Story = {
  id: number
  slug: string
  patientLabel: string
  country?: string
  procedure?: number | Procedure
  portrait?: number | CmsMedia
  quote?: string
  body?: Lexical
  videoUrl?: string
  year?: number
  surgeon?: number | Surgeon
  isFeatured?: boolean
  sortOrder?: number
}

export type PressMention = {
  id: number
  slug: string
  publication: string
  logo?: number | CmsMedia
  headline?: string
  url?: string
  publishedDate?: string
  summary?: string
  isFeatured?: boolean
  sortOrder?: number
}

export type Award = {
  id: number
  slug: string
  name: string
  year?: number
  issuer?: string
  logo?: number | CmsMedia
  summary?: string
  sortOrder?: number
}

export type RecoveryStay = {
  id: number
  slug: string
  name: string
  location?: string
  heroImage?: number | CmsMedia
  gallery?: Array<{ image: number | CmsMedia }>
  descriptor?: Lexical
  amenities?: Array<{ value: string }>
  priceFromAudPerNight?: number
  priceFromIdrPerNight?: number
  partnerUrl?: string
  geo?: { lat?: number; lng?: number }
  sortOrder?: number
}

export type PricingTier = {
  id: number
  slug: string
  name: string
  descriptor?: Lexical
  priceFromAud?: number
  priceFromIdr?: number
  inclusions?: Array<{ value: string }>
  isFeatured?: boolean
  sortOrder?: number
}

export type BlogPost = {
  id: number
  slug: string
  title: string
  lede?: string
  body?: Lexical
  heroImage?: number | CmsMedia
  author?: number | { id?: number; name: string; role?: string; portrait?: number | CmsMedia; surgeonProfile?: number | { id: number; slug?: string; name?: string; commonName?: string } }
  publishedAt?: string
  tags?: Array<number | { slug: string; name: string }>
  readingTimeMinutes?: number
  publishStatus?: 'draft' | 'published' | 'scheduled'
  sortOrder?: number
}

export type JourneyStep = {
  id: number
  slug: string
  order?: number
  dayLabel?: string
  title: string
  body?: Lexical
  icon?: number | CmsMedia
  category?: 'consult' | 'medical' | 'surgical' | 'recovery' | 'follow-up'
  sortOrder?: number
}

export type InclusionItem = { id: number; text: string; scope?: string; sortOrder?: number }
export type ExclusionItem = { id: number; text: string; scope?: string; sortOrder?: number }

export type PageBlock =
  | { blockType: 'richText'; eyebrow?: string; heading?: string; body: Lexical }
  | { blockType: 'imageGrid'; heading?: string; columns?: '2' | '3' | '4'; images: Array<{ image: number | CmsMedia; caption?: string }> }
  | { blockType: 'ctaBand'; heading: string; lede?: string; primaryLabel?: string; primaryHref?: string; secondaryLabel?: string; secondaryHref?: string }
  | { blockType: 'stats'; heading?: string; items: Array<{ number: string; label: string; sourceNote?: string }> }
  | { blockType: 'faqAccordion'; heading?: string; items: Array<{ q: string; a: string }> }
  | { blockType: 'procedureList'; heading?: string; filterDiscipline?: number; filterSubCategory?: number; layout?: 'grid' | 'list' | 'featured'; limit?: number }
  | { blockType: 'surgeonList'; heading?: string; filterGroup?: 'all' | 'plastic-surgery' | 'aesthetic-medicine'; layout?: 'strip' | 'grid' }
  | { blockType: 'baGrid'; heading?: string; filterProcedure?: number; limit?: number; featuredOnly?: boolean }
  | { blockType: 'testimonialList'; heading?: string; count?: number; featuredOnly?: boolean }
  | { blockType: 'recoveryStayList'; heading?: string; limit?: number }
  | { blockType: 'pressMentionList'; heading?: string; limit?: number }
  | { blockType: 'contactForm'; heading?: string; lede?: string; sourceCta?: string }
  | { blockType: 'journeyStepList'; heading?: string; filterCategory?: string }
  | { blockType: 'externalEmbed'; heading?: string; iframeUrl?: string; html?: string }
  | { blockType: 'notes'; kind?: 'info' | 'warning' | 'tip' | 'disclaimer'; heading?: string; body: Lexical }

export type CmsPage = {
  id: number
  title: string
  slug: string
  route: string
  chapterTitle?: { a?: string; b?: string }
  tagline?: string
  lede?: string
  heroImage?: number | CmsMedia
  sections?: PageBlock[]
  publishStatus?: 'draft' | 'published'
  // Phase C6 A2 blocks (home-page only — every field optional; renderers must
  // fall back to hardcoded copy when blank so the site is byte-identical until
  // the editor populates these in /admin/globals/home-page).
  introBlock?: {
    eyebrow?: string
    pullQuoteBefore?: string
    pullQuoteAccent?: string
    pullQuoteAfter?: string
    col1?: string
    col2?: string
  }
  treatmentsBlock?: {
    eyebrow?: string
    headingPart1?: string
    headingPart2?: string
    lede?: string
  }
  pricingTeaserBlock?: {
    eyebrow?: string
    headingPart1?: string
    headingPart2?: string
    lede?: string
    footnote?: string
    viewAllLabel?: string
    viewAllHref?: string
  }
  surgeonsBlock?: {
    eyebrow?: string
    leadSurgeonEyebrow?: string
    leadBody?: string
    leadStat1Label?: string
    leadStat1Value?: string
    leadStat2Label?: string
    leadStat2Value?: string
    leadStat3Label?: string
    leadStat3Value?: string
    leadCtaLabel?: string
    associatesEyebrow?: string
  }
  galleryBlock?: {
    eyebrow?: string
    headingPart1?: string
    headingPart2?: string
    lede?: string
    ctaLabel?: string
    ctaHref?: string
  }
  leadMagnetBlock?: {
    coverEyebrow?: string
    coverLine1?: string
    coverLine2?: string
    coverLine3?: string
    coverFoot1?: string
    coverFoot2?: string
    bodyEyebrow?: string
    headingPart1?: string
    headingAccent?: string
    lede?: string
    formPlaceholder?: string
    submitLabel?: string
    successHeading?: string
    successBody?: string
    fineprint?: string
  }
  journeyBlock?: {
    eyebrow?: string
    headingPart1?: string
    headingAccent?: string
    ctaLabel?: string
    ctaHref?: string
  }
  storiesBlock?: {
    eyebrow?: string
    headingAccent?: string
    headingPart2?: string
    lede?: string
    ctaLabel?: string
    ctaHref?: string
  }
  placeBlock?: {
    eyebrow?: string
    headingPart1?: string
    headingAccent?: string
    body?: string
    rowsText?: string
    ctaLabel?: string
    ctaHref?: string
  }
}

/* ─── Global types ─────────────────────────────────────────────────────── */

export type Settings = {
  siteName?: string
  siteTagline?: string
  defaultMetaDescription?: string
  audToIdrRate?: number
  roundIdrTo?: number
  contactEmail?: string
  contactPhone?: string
  whatsappNumber?: string
  addressLine1?: string
  addressLine2?: string
  city?: string
  postalCode?: string
  country?: string
  hoursMonFri?: string
  hoursSatSun?: string
  googleMapsUrl?: string
  socialLinks?: Array<{ platform: string; url: string }>
  defaultLocale?: string
  currencyDisplayMode?: 'idr-only' | 'idr-with-aud'
}

export type HeaderGlobal = {
  logoLight?: CmsMedia | number | null
  logoDark?: CmsMedia | number | null
  navItems?: Array<{
    label: string
    href: string
    activePattern?: string
    megaMenu?: Array<{ heading: string; items: Array<{ label: string; href: string }> }>
  }>
  localeSwitcher?: { enabled?: boolean; labelEn?: string; labelId?: string }
}

export type FooterGlobal = {
  logoLight?: CmsMedia | number | null
  linkColumns?: Array<{ heading: string; items: Array<{ label: string; href: string }> }>
  enquirySummary?: Lexical
  addressBlock?: Lexical
  copyrightTemplate?: string
}

export type FloatingChromeGlobal = {
  ctaPill?: { label?: string; href?: string; enabled?: boolean }
  chat?: { enabled?: boolean; provider?: string; openOnLoad?: boolean; embedScript?: string }
}

export type BrandStatsGlobal = {
  stats?: Array<{ number: string; label: string; sourceNote?: string }>
}

export type ConsultationPolicy = {
  feeIdr?: number
  feeAud?: number
  waiverConditionText?: string
  displayOn?: string[]
}

export type FormDefaults = {
  labels?: Record<string, string>
  placeholders?: Record<string, string>
  submitLabel?: string
  successMessage?: string
  errorMessage?: string
  rateLimitMessage?: string
}

export type Author = {
  id: number
  slug: string
  name: string
  role?: string
  bio?: Lexical
  portrait?: number | CmsMedia
  /** Optional link to a Surgeon profile — used to badge clinician-authored posts. */
  surgeonProfile?: number | { id: number; slug: string; name?: string; commonName?: string }
}

export type EndorsementMarkGlobal = {
  endorsementLine?: string
  primaryLockup?: CmsMedia | number | null
  inverseLockup?: CmsMedia | number | null
  clearspaceUnit?: string
  minScreenWidthPx?: number
  minPrintMmWidth?: number
}

export type SeoDefaultsGlobal = {
  titlePattern?: string
  robotsTxt?: string
  sitemapBaseUrl?: string
  organizationSchema?: unknown
}

export type EmailTemplatesGlobal = {
  templates?: Array<{ key: string; subject: string; bodyMjml?: string }>
}

/* ─── Cache shape ──────────────────────────────────────────────────────── */

export type CmsCache = {
  loaded: boolean
  loadedAt: number
  // Catalogue
  surgeons: Surgeon[]
  disciplines: Discipline[]
  subCategories: SubCategory[]
  procedures: Procedure[]
  priceListItems: PriceListItem[]
  injectableProducts: InjectableProduct[]
  machineTreatments: MachineTreatment[]
  hairRemovalAreas: HairRemovalArea[]
  beforeAfterCases: BeforeAfterCase[]
  stories: Story[]
  pressMentions: PressMention[]
  awards: Award[]
  recoveryStays: RecoveryStay[]
  pricingTiers: PricingTier[]
  blogPosts: BlogPost[]
  authors: Author[]
  journeySteps: JourneyStep[]
  inclusions: InclusionItem[]
  exclusions: ExclusionItem[]
  pages: CmsPage[]
  // Globals
  settings: Settings
  header: HeaderGlobal
  footer: FooterGlobal
  floatingChrome: FloatingChromeGlobal
  brandStats: BrandStatsGlobal
  endorsementMark: EndorsementMarkGlobal
  consultationPolicy: ConsultationPolicy
  formDefaults: FormDefaults
  seoDefaults: SeoDefaultsGlobal
}

const EMPTY_CACHE: CmsCache = {
  loaded: false,
  loadedAt: 0,
  surgeons: [],
  disciplines: [],
  subCategories: [],
  procedures: [],
  priceListItems: [],
  injectableProducts: [],
  machineTreatments: [],
  hairRemovalAreas: [],
  beforeAfterCases: [],
  stories: [],
  pressMentions: [],
  awards: [],
  recoveryStays: [],
  pricingTiers: [],
  blogPosts: [],
  authors: [],
  journeySteps: [],
  inclusions: [],
  exclusions: [],
  pages: [],
  settings: {},
  header: {},
  footer: {},
  floatingChrome: {},
  brandStats: {},
  endorsementMark: {},
  consultationPolicy: {},
  formDefaults: {},
  seoDefaults: {},
}

let cache: CmsCache = EMPTY_CACHE
let inflight: Promise<CmsCache> | null = null

async function fetchAll<T>(collection: string, limit = 500, depth = 1): Promise<T[]> {
  const url = `${PAYLOAD_URL}/api/${collection}?limit=${limit}&depth=${depth}&draft=false`
  const res = await fetch(url, { headers: { Accept: 'application/json' } })
  if (!res.ok) {
    throw new Error(`[cms] failed to fetch ${collection}: ${res.status} ${res.statusText}`)
  }
  const json = (await res.json()) as { docs: T[] }
  return json.docs || []
}

/**
 * The 14 Payload Globals that replaced the Pages collection in the
 * 2026-05-22 admin restructure. Each is a singleton holding the editorial
 * hero + sections for one static route. The CmsCache.pages[] array is
 * assembled from these — downstream adapters (findPageBySlug, etc.) keep
 * their existing signature.
 */
const PAGE_GLOBAL_SLUGS = [
  'home-page',
  'press-page',
  'privacy-page',
  'treatments-page',
  'surgeons-page',
  'results-page',
  'gallery-page',
  'pricing-page',
  'journey-page',
  'stories-page',
  'recovery-stays-page',
  'contact-page',
  'video-consult-page',
  'blog-page',
] as const

async function fetchAllPageGlobals(): Promise<CmsPage[]> {
  const results = await Promise.all(
    PAGE_GLOBAL_SLUGS.map((slug) =>
      fetchGlobal<CmsPage>(slug, 1).catch((err) => {
        // Don't fail the whole cache load if one global is missing — log + skip.
        console.warn(`[cms] page global ${slug} failed:`, (err as Error)?.message)
        return null
      }),
    ),
  )
  // Drop globals that have no editorial slug populated (treatments/surgeons/blog
  // etc. before Step 9 seed runs). findPageBySlug ignores them anyway.
  return results.filter((p): p is CmsPage => p !== null && Boolean(p?.slug))
}

async function fetchGlobal<T>(slug: string, depth = 1): Promise<T> {
  const url = `${PAYLOAD_URL}/api/globals/${slug}?depth=${depth}`
  const res = await fetch(url, { headers: { Accept: 'application/json' } })
  if (!res.ok) {
    throw new Error(`[cms] failed to fetch global ${slug}: ${res.status} ${res.statusText}`)
  }
  return (await res.json()) as T
}

async function doLoad(): Promise<CmsCache> {
  try {
    const [
      surgeons, disciplines, subCategories, procedures,
      priceListItems, injectableProducts, machineTreatments, hairRemovalAreas,
      beforeAfterCases, stories, pressMentions, awards, recoveryStays,
      pricingTiers, blogPosts, authors, journeySteps, inclusions, exclusions, pages,
      settings, header, footer, floatingChrome, brandStats, endorsementMark,
      consultationPolicy, formDefaults, seoDefaults,
    ] = await Promise.all([
      fetchAll<Surgeon>('surgeons', 100, 1),
      fetchAll<Discipline>('disciplines'),
      fetchAll<SubCategory>('sub-categories'),
      fetchAll<Procedure>('procedures', 200, 2),
      fetchAll<PriceListItem>('price-list-items', 500, 1),
      fetchAll<InjectableProduct>('injectable-products'),
      fetchAll<MachineTreatment>('machine-treatments'),
      fetchAll<HairRemovalArea>('hair-removal-areas'),
      fetchAll<BeforeAfterCase>('before-after-cases'),
      fetchAll<Story>('stories'),
      fetchAll<PressMention>('press-mentions'),
      fetchAll<Award>('awards'),
      fetchAll<RecoveryStay>('recovery-stays'),
      fetchAll<PricingTier>('pricing-tiers'),
      fetchAll<BlogPost>('blog-posts', 100, 2),
      fetchAll<Author>('authors', 100, 1),
      fetchAll<JourneyStep>('journey-steps'),
      fetchAll<InclusionItem>('inclusion-items'),
      fetchAll<ExclusionItem>('exclusion-items'),
      fetchAllPageGlobals(),
      fetchGlobal<Settings>('settings'),
      fetchGlobal<HeaderGlobal>('header'),
      fetchGlobal<FooterGlobal>('footer'),
      fetchGlobal<FloatingChromeGlobal>('floating-chrome'),
      fetchGlobal<BrandStatsGlobal>('brand-stats'),
      fetchGlobal<EndorsementMarkGlobal>('endorsement-mark'),
      fetchGlobal<ConsultationPolicy>('consultation-policy'),
      fetchGlobal<FormDefaults>('form-defaults'),
      fetchGlobal<SeoDefaultsGlobal>('seo-defaults'),
    ])
    return {
      loaded: true,
      loadedAt: Date.now(),
      surgeons, disciplines, subCategories, procedures,
      priceListItems, injectableProducts, machineTreatments, hairRemovalAreas,
      beforeAfterCases, stories, pressMentions, awards, recoveryStays,
      pricingTiers, blogPosts, authors, journeySteps, inclusions, exclusions, pages,
      settings, header, footer, floatingChrome, brandStats, endorsementMark,
      consultationPolicy, formDefaults, seoDefaults,
    }
  } catch (err) {
    console.warn('[cms] load failed, using empty cache:', err)
    return EMPTY_CACHE
  }
}

const CACHE_TTL_MS = 60_000  // 60s — keeps SSR fast while picking up CMS edits.

export async function loadCmsCache(force = false): Promise<CmsCache> {
  if (!force && cache.loaded && Date.now() - cache.loadedAt < CACHE_TTL_MS) {
    return cache
  }
  if (inflight) return inflight
  inflight = doLoad().then((next) => {
    cache = next
    inflight = null
    return next
  })
  return inflight
}

export function getCmsCacheSync(): CmsCache {
  return cache
}

export function setCmsCacheSync(next: CmsCache): void {
  cache = next
}

/* ─── Lexical → plain text ────────────────────────────────────────────── */

export function lexicalToText(value: Lexical): string {
  if (!value || !value.root || !value.root.children) return ''
  const walk = (nodes: LexicalNode[]): string =>
    nodes.map((n) => {
      if (n.text != null) return String(n.text)
      if (n.children) return walk(n.children)
      return ''
    }).join('')
  return value.root.children
    .map((c) => {
      if (c.children) return walk(c.children)
      return ''
    })
    .filter(Boolean)
    .join('\n\n')
}

export function lexicalToParagraphs(value: Lexical): string[] {
  if (!value || !value.root || !value.root.children) return []
  const walk = (nodes: LexicalNode[]): string =>
    nodes.map((n) => {
      if (n.text != null) return String(n.text)
      if (n.children) return walk(n.children)
      return ''
    }).join('')
  return value.root.children
    .map((c) => (c.children ? walk(c.children) : ''))
    .map((s) => s.trim())
    .filter(Boolean)
}

/* ─── Media URL helper ─────────────────────────────────────────────────── */

export function mediaUrl(m: number | CmsMedia | undefined | null, fallback?: string): string | undefined {
  if (!m) return fallback
  if (typeof m === 'number') return fallback
  // Suppress seed placeholders on the public site. Editors flip the
  // `isPlaceholder` flag off in the CMS once they upload a real photo.
  // Record remains editable; only public rendering is hidden.
  if ((m as { isPlaceholder?: boolean }).isPlaceholder === true) return fallback
  if (m.url) {
    return m.url.startsWith('http') ? m.url : `${PUBLIC_PAYLOAD_URL}${m.url}`
  }
  return fallback
}

export function mediaAlt(m: number | CmsMedia | undefined | null, fallback = ''): string {
  if (!m || typeof m === 'number') return fallback
  return m.alt || fallback
}

/**
 * Build a srcset string from CmsMedia.sizes for use in <source srcset>.
 * Skips sizes that don't have a URL (Payload omits sizes smaller than
 * the original). Returns undefined if the media has no sizes hydrated
 * (e.g. when the value is just a number ref or sizes weren't included
 * in the depth=1 fetch).
 */
export function mediaSrcSet(m: number | CmsMedia | undefined | null): string | undefined {
  if (!m || typeof m === 'number' || !m.sizes) return undefined
  if ((m as { isPlaceholder?: boolean }).isPlaceholder === true) return undefined
  const parts: string[] = []
  for (const size of Object.values(m.sizes)) {
    if (!size || !size.url || !size.width) continue
    const url = size.url.startsWith('http') ? size.url : `${PUBLIC_PAYLOAD_URL}${size.url}`
    parts.push(`${url} ${size.width}w`)
  }
  if (m.url && m.width) {
    const url = m.url.startsWith('http') ? m.url : `${PUBLIC_PAYLOAD_URL}${m.url}`
    parts.push(`${url} ${m.width}w`)
  }
  return parts.length > 0 ? parts.join(', ') : undefined
}

/** Convenience: returns the original-format mimeType, used as <source type> hint. */
export function mediaMime(m: number | CmsMedia | undefined | null): string | undefined {
  if (!m || typeof m === 'number') return undefined
  return m.mimeType
}
