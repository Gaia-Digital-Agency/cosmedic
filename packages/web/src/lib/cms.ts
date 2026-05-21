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
}

export type MachineTreatment = {
  id: number
  slug: string
  machineName: string
  area: string
  pricing?: { standardIdr?: number; kitasKtpIdr?: number; packageIdr?: number }
  notes?: string
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
  author?: number | { name: string; portrait?: number | CmsMedia }
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
  navItems?: Array<{
    label: string
    href: string
    activePattern?: string
    megaMenu?: Array<{ heading: string; items: Array<{ label: string; href: string }> }>
  }>
  localeSwitcher?: { enabled?: boolean; labelEn?: string; labelId?: string }
}

export type FooterGlobal = {
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

export type EndorsementMarkGlobal = {
  endorsementLine?: string
  clearspaceUnit?: string
  minScreenWidthPx?: number
  minPrintMmWidth?: number
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
      pricingTiers, blogPosts, journeySteps, inclusions, exclusions, pages,
      settings, header, footer, floatingChrome, brandStats, endorsementMark,
      consultationPolicy, formDefaults,
    ] = await Promise.all([
      fetchAll<Surgeon>('surgeons'),
      fetchAll<Discipline>('disciplines'),
      fetchAll<SubCategory>('sub-categories'),
      fetchAll<Procedure>('procedures'),
      fetchAll<PriceListItem>('price-list-items', 500, 0),
      fetchAll<InjectableProduct>('injectable-products'),
      fetchAll<MachineTreatment>('machine-treatments'),
      fetchAll<HairRemovalArea>('hair-removal-areas'),
      fetchAll<BeforeAfterCase>('before-after-cases'),
      fetchAll<Story>('stories'),
      fetchAll<PressMention>('press-mentions'),
      fetchAll<Award>('awards'),
      fetchAll<RecoveryStay>('recovery-stays'),
      fetchAll<PricingTier>('pricing-tiers'),
      fetchAll<BlogPost>('blog-posts'),
      fetchAll<JourneyStep>('journey-steps'),
      fetchAll<InclusionItem>('inclusion-items'),
      fetchAll<ExclusionItem>('exclusion-items'),
      fetchAll<CmsPage>('pages'),
      fetchGlobal<Settings>('settings'),
      fetchGlobal<HeaderGlobal>('header'),
      fetchGlobal<FooterGlobal>('footer'),
      fetchGlobal<FloatingChromeGlobal>('floating-chrome'),
      fetchGlobal<BrandStatsGlobal>('brand-stats'),
      fetchGlobal<EndorsementMarkGlobal>('endorsement-mark'),
      fetchGlobal<ConsultationPolicy>('consultation-policy'),
      fetchGlobal<FormDefaults>('form-defaults'),
    ])
    return {
      loaded: true,
      loadedAt: Date.now(),
      surgeons, disciplines, subCategories, procedures,
      priceListItems, injectableProducts, machineTreatments, hairRemovalAreas,
      beforeAfterCases, stories, pressMentions, awards, recoveryStays,
      pricingTiers, blogPosts, journeySteps, inclusions, exclusions, pages,
      settings, header, footer, floatingChrome, brandStats, endorsementMark,
      consultationPolicy, formDefaults,
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
