/**
 * CMS type definitions — collections, globals, media, cache shape.
 * Re-exported via `@/lib/cms`. Page-globals types live in `cms.pages.types.ts`.
 */

import type { CmsPage } from './cms.pages.types'

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

/* ─── Media ────────────────────────────────────────────────────────────── */

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

/* ─── Collection types ─────────────────────────────────────────────────── */

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
  catalogueGroup?: 'surgical' | 'machine' | 'injection' | 'btl'
  mainCategory?: string
  subCategory?: string
  unit?: string
  audienceTier?: 'standard' | 'tourist' | 'kitas_ktp' | 'package'
  brand?: string
  productLine?: string
  manufacturer?: string
  fdaApproved?: boolean
  bodyZone?: 'face' | 'upper-body' | 'lower-body' | 'package' | 'other'
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
  included?: Array<number | { id: number; slug?: string; label?: string }>
  excluded?: Array<number | { id: number; slug?: string; label?: string }>
  recoveryTimeline?: Array<number | { id: number; slug?: string; title?: string; body?: string }>
  relatedBA?: Array<number | BeforeAfterCase>
  relatedProcedures?: Array<number | { id: number; slug?: string; name?: string }>
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
  patientAge?: number
  recoveryDuration?: string
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
  beforeAfterCases: BeforeAfterCase[]
  stories: Story[]
  pressMentions: PressMention[]
  awards: Award[]
  recoveryStays: RecoveryStay[]
  blogPosts: BlogPost[]
  authors: Author[]
  journeySteps: JourneyStep[]
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
