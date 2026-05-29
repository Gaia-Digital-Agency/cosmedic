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
  /** Honorific prefix (e.g. "dr."). Renamed from `title` per D2. */
  designation?: string
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
    priceIdr2026?: number
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

export type ClinicCatalogueItem = {
  id: number
  slug: string
  name: string
  shortName?: string
  catalogueGroup: 'surgical' | 'machine' | 'injection' | 'btl'
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
  pricing?: {
    priceIdr2025?: number
    priceIdr2026?: number
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
  /** Free-text procedure + year line displayed under city on /stories + /results, e.g. "Rhinoplasty · 2025". */
  procedureLabel?: string
  /** Brand-palette hue (0-5) for the portrait fallback gradient. */
  hue?: number
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
  /** Bedroom count display, e.g. "2 BR". */
  bedrooms?: string
  /** Pool type, e.g. "Private", "Resort". */
  poolType?: string
  heroImage?: number | CmsMedia
  imageHue?: number
  /** Short paragraph shown under the meta-row on each villa card. */
  body?: string
  /** Optional override for "Drive to clinic" cell; if blank derived from location. */
  driveTime?: string
  nursingNote?: string
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
  /** Display number above the title on /journey (e.g. "01"). Falls back to order zero-padded. */
  number?: string
  dayLabel?: string
  title: string
  body?: Lexical
  /** 4 short bullets shown under the body on /journey. */
  bullets?: Array<{ letter: string; text: string }>
  /** Hero image rendered beside each step on /journey. */
  image?: number | CmsMedia
  imageHue?: number
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

/* ─── R8 — h. About Bucket types ────────────────────────────────────────── */

export type PrivacySection = {
  id: number
  slug: string
  title: string
  paragraphs?: Array<{ text: string }>
  listItems?: Array<{ text: string }>
  sortOrder?: number
}

/* ─── Global types ─────────────────────────────────────────────────────── */

export type Settings = {
  siteName?: string
  siteTagline?: string
  defaultMetaDescription?: string
  audToIdrRate?: number
  roundIdrTo?: number
  contactEmail?: string
  pressEmail?: string
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
}

export type ContactHeroGlobal = {
  chapter?: string
  title?: { a?: string; b?: string }
  lede?: string
  heroImage?: CmsMedia | number | null
  imageHue?: number
  imageLabel?: string
  breadcrumbLabel?: string
}

export type ContactEnquirySectionGlobal = {
  eyebrow?: string
  headingPre?: string
  headingItalic?: string
  intro?: string
  directLines?: {
    sectionLabel?: string
    conciergeLabel?: string
    whatsappLabel?: string
    emailLabel?: string
    pressLabel?: string
  }
  trustLine?: string
  // 25.27 additions
  intentCopy?: Array<{ slug?: string; eyebrow?: string; title?: string; lede?: string }>
  formLabels?: {
    nameLabel?: string
    namePlaceholder?: string
    emailLabel?: string
    emailPlaceholder?: string
    treatmentLabel?: string
    treatmentPlaceholder?: string
    addDetailsLabel?: string
    countryLabel?: string
    countryPlaceholder?: string
    dateLabel?: string
    datePlaceholder?: string
    messageLabel?: string
    messagePlaceholder?: string
  }
  submitLabels?: {
    send?: string
    sending?: string
    sent?: string
    successMessage?: string
  }
}

export type NotFoundPageGlobal = {
  eyebrow?: string
  headingA?: string
  headingB?: string
  lede?: string
  primaryBtnLabel?: string
  primaryBtnHref?: string
  secondaryBtnLabel?: string
  secondaryBtnHref?: string
}

export type ContactVisitSectionGlobal = {
  eyebrow?: string
  headingPre?: string
  headingItalic?: string
  body?: string
  mapImage?: CmsMedia | number | null
  mapImageLabel?: string
  mapImageHue?: number
  openInMapsLabel?: string
  getDirectionsLabel?: string
  clinicHoursLabel?: string
  conciergeHoursLabel?: string
  conciergeHoursValue?: string
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
  brandTagline?: string
  treatmentsHeading?: string
  linkColumns?: Array<{
    heading: string
    items: Array<{
      label: string
      href: string
      social?: 'none' | 'instagram' | 'facebook' | 'whatsapp' | 'tiktok' | 'youtube' | 'linkedin' | 'x'
    }>
  }>
  newsletter?: {
    label?: string
    placeholder?: string
    buttonLabel?: string
  }
  footerBottomLines?: Array<{ text: string }>
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

export type JourneyHeroGlobal = {
  chapter?: string
  title?: { a?: string; b?: string }
  lede?: string
  heroImage?: CmsMedia | number | null
  imageHue?: number
  imageLabel?: string
  breadcrumbLabel?: string
}

export type JourneyStatsGlobal = {
  stats?: Array<{ number: string; label: string; italic?: boolean }>
}

/* ─── R3 — b. Treatments Bucket section globals ────────────────────────── */

export type TreatmentsHeroGlobal = {
  chapter?: string
  titleA?: string
  titleB?: string
  lede?: string
  heroImage?: number | CmsMedia | null
  imageHue?: number
  imageLabel?: string
  breadcrumbLabel?: string
}

export type TreatmentsIndexSectionGlobal = {
  eyebrow?: string
  heading?: string
  lede?: string
  readMoreLabel?: string
  readMoreArrow?: string
}

export type TreatmentsStatsGlobal = {
  stats?: Array<{ number: string; label: string }>
}

export type DisciplineDetailTemplateGlobal = {
  toc?: {
    onThisPageLabel?: string
    overviewLabel?: string
    subCategoriesLabel?: string
    proceduresLabel?: string
    faqsLabel?: string
  }
  overview?: { heading?: string }
  chooseAFocus?: {
    heading?: string
    bodyTemplate?: string
    availableLabel?: string
    comingLabel?: string
  }
  procedures?: { heading?: string; intro?: string }
  faqs?: { heading?: string }
  related?: {
    eyebrow?: string
    headingItalic?: string
    headingRoman?: string
    ledeTemplate?: string
  }
}

export type SubCategoryDetailTemplateGlobal = {
  chapterSeparator?: string
  toc?: {
    onThisPageLabel?: string
    overviewLabel?: string
    treatmentsLabel?: string
    faqsLabel?: string
  }
  takeAStep?: {
    eyebrow?: string
    videoConsultLabel?: string
    estimateLabel?: string
    whatsappLabel?: string
    replyLine?: string
  }
  overview?: { heading?: string }
  treatments?: { heading?: string; intro?: string }
  faqs?: { heading?: string }
}

/* ─── R4 — c. Doctors Bucket section globals ───────────────────────────── */

export type SurgeonsHeroGlobal = {
  chapter?: string
  title?: { a?: string; b?: string }
  lede?: string
  heroImage?: number | CmsMedia | null
  imageHue?: number
  imageLabel?: string
  breadcrumbLabel?: string
}

export type SurgeonsLeadViewGlobal = {
  sectionEyebrow?: string
  blockEyebrow?: string
  statLabelTrained?: string
  statLabelSpecialty?: string
  statLabelDistinction?: string
  ctaLabel?: string
}

export type SurgeonsSectionViewGlobal = {
  lede?: string
  eyebrow?: string
  heading?: { a?: string; b?: string }
  headingItalic?: string
}

export type SurgeonDetailTemplateGlobal = {
  // Hero
  heroLeadLabel?: string
  heroSpecialistLabel?: string
  heroCtaConsultLabel?: string
  /** Read-only mirror — resolves to Disciplines.title at read time. The route ignores this and reads the source. */
  heroCtaTreatmentsLabelTemplate?: string
  heroCtaTreatmentsLabelFallback?: string
  // Breadcrumb
  breadcrumbHomeLabel?: string
  breadcrumbSurgeonsLabel?: string
  // Stats row
  statLabelYears?: string
  statLabelDistinction?: string
  statLabelSpecialty?: string
  // Biography sidebar
  biographyEyebrow?: string
  sidebarLabelSpecialism?: string
  sidebarLabelCredentials?: string
  sidebarLabelLanguages?: string
  sidebarLabelAvailability?: string
  languagesFallback?: string
  availabilityFallback?: string
  // Biography body
  /** Template — uses {title} and {common} placeholders for per-doctor honorific + first name. */
  secondaryBioParagraph?: string
  // Specialty areas
  specialtyEyebrow?: string
  /** Template — uses {title}, {common}, and {italic}...{/italic} markers. */
  specialtyHeadingTemplate?: string
  // Training & credentials
  trainingEyebrow?: string
  trainingRowLabels?: Array<{ value: string }>
  trainingRowRights?: Array<{ value: string }>
  /** Read-only mirror — resolves to `${settings.siteName}, ${settings.city}` at read time. */
  trainingRowPracticeMid?: string
  // Faculty
  facultyEyebrow?: string
  facultyHeading?: { pre?: string; italic?: string; post?: string }
}

/* ─── R6 — e. Pricing Bucket section globals ───────────────────────────── */

export type PricingHeroGlobal = {
  chapter?: string
  titleA?: string
  titleB?: string
  lede?: string
  heroImage?: number | CmsMedia | null
  imageHue?: number
  imageLabel?: string
  breadcrumbLabel?: string
}

export type PricingOverviewGlobal = {
  eyebrow?: string
  heading?: { a?: string; b?: string }
  body?: string
}

export type PricingFootnoteGlobal = {
  text?: string
}

export type PricingInsuranceGlobal = {
  eyebrow?: string
  headingRoman?: string
  headingItalic?: string
  body?: string
}

export type PricingPaymentGlobal = {
  eyebrow?: string
  headingRoman?: string
  headingItalic?: string
  termsText?: string
}

export type PricingDisciplineListViewGlobal = {
  sectionEyebrow?: string
  onRequestLabel?: string
  includedLabel?: string
  arrowChar?: string
}

export type PricingCatalogueViewGlobal = {
  sectionEyebrow?: string
  headingRoman?: string
  headingItalic?: string
  introTemplate?: string
  sheetLabels?: {
    surgicalTitle?: string
    surgicalSubtitle?: string
    machineTitle?: string
    machineSubtitle?: string
    injectionTitle?: string
    injectionSubtitle?: string
    btlTitle?: string
    btlSubtitle?: string
  }
  hairZoneLabels?: {
    face?: string
    upperBody?: string
    lowerBody?: string
    packageZone?: string
    other?: string
  }
  injectableCategoryLabels?: {
    botulinumToxin?: string
    filler?: string
    skinBooster?: string
    collagenStimulator?: string
    bioRemodeling?: string
    threadLift?: string
    mesotherapy?: string
    hgh?: string
    other?: string
  }
}

/* ─── R5 — d. Results Bucket section globals ───────────────────────────── */

export type ResultsHeroGlobal = {
  chapter?: string
  title?: { a?: string; b?: string }
  lede?: string
  heroImage?: number | CmsMedia | null
  imageHue?: number
  imageLabel?: string
  breadcrumbLabel?: string
}

export type ResultsFeaturedCasesViewGlobal = {
  eyebrow?: string
  headingPre?: string
  headingItalic?: string
  lede?: string
  filterBarLabel?: string
  countFormat?: string
}

export type ResultsStoriesViewGlobal = {
  eyebrow?: string
  headingPre?: string
  headingItalic?: string
  lede?: string
}

export type LibraryCtaGlobal = {
  eyebrow?: string
  headingPre?: string
  headingItalic?: string
  body?: string
  buttonLabel?: string
  buttonHref?: string
  share?: {
    eyebrow?: string
    headingPre?: string
    headingItalic?: string
    headingPost?: string
    body?: string
    buttonLabel?: string
    buttonHref?: string
  }
}

export type ShareCtaGlobal = {
  eyebrow?: string
  headingPre?: string
  headingItalic?: string
  headingPost?: string
  body?: string
  buttonLabel?: string
  buttonHref?: string
}

export type BlogPostTemplateGlobal = {
  byline?: {
    writtenByLabel?: string
    publishedLabel?: string
    lengthLabel?: string
    filedUnderLabel?: string
  }
  aboutTheAuthor?: {
    eyebrowLabel?: string
    readFullProfileCta?: string
    bookConsultationCta?: string
  }
  moreFromTheJournal?: {
    eyebrow?: string
    headingPre?: string
    headingItalic?: string
    backToJournalCta?: string
  }
}

export type RecoveryStaysPageGlobal = {
  hero?: {
    chapter?: string
    title?: { a?: string; b?: string }
    lede?: string
    heroImage?: CmsMedia | number | null
    imageHue?: number
    imageLabel?: string
    breadcrumbLabel?: string
  }
  topStats?: Array<{ number: string; label: string; italic?: boolean }>
  portfolioSection?: {
    eyebrow?: string
    headingPre?: string
    headingItalic?: string
    headingPost?: string
    lede?: string
  }
  inclusionsSection?: {
    eyebrow?: string
    headingPre?: string
    headingItalic?: string
    headingPost?: string
    lede?: string
  }
  inclusions?: Array<{ letter: string; title: string; body: string }>
}

/* ─── R2 — a. Homepage Bucket section globals ──────────────────────────── */

export type HomeHeroGlobal = {
  eyebrow?: string
  title?: { a?: string; b?: string }
  lede?: string
  heroImage?: CmsMedia | number | null
  breadcrumbLabel?: string
  primaryCtaLabel?: string
  secondaryCtaLabel?: string
  secondaryCtaHref?: string
  quickEnquiry?: {
    eyebrow?: string
    heading?: string
    intro?: string
    nameLabel?: string
    namePlaceholder?: string
    emailLabel?: string
    emailPlaceholder?: string
    interestLabel?: string
    interestOptionalLabel?: string
    interestPlaceholder?: string
    revealInterestLabel?: string
    submitLabel?: string
    submittingLabel?: string
    successLabel?: string
    successFine?: string
    errorFine?: string
    fineprint?: string
  }
}

export type HomeIntroGlobal = {
  eyebrow?: string
  pullQuoteBefore?: string
  pullQuoteAccent?: string
  pullQuoteAfter?: string
  col1?: string
  col2?: string
}

export type HomeLeadMagnetGlobal = {
  coverImage?: CmsMedia | number | null
  coverEyebrow?: string
  coverLine1?: string
  coverLine2?: string
  coverLine3?: string
  coverFoot1?: string
  coverFoot2?: string
  bodyEyebrow?: string
  heading?: { a?: string; b?: string }
  lede?: string
  formPlaceholder?: string
  submitLabel?: string
  successHeading?: string
  successBody?: string
  fineprint?: string
}

export type HomePlaceGlobal = {
  eyebrow?: string
  heading?: { a?: string; b?: string }
  body?: string
  rows?: Array<{ letter: string; text: string }>
  ctaLabel?: string
  ctaHref?: string
  image?: CmsMedia | number | null
}

export type HomeTreatmentsViewGlobal = {
  lede?: string
  eyebrow?: string
  heading?: { a?: string; b?: string }
}

export type HomePricingViewGlobal = {
  lede?: string
  eyebrow?: string
  heading?: { a?: string; b?: string }
  footnote?: string
  viewAllLabel?: string
  viewAllHref?: string
}

export type HomeSurgeonsViewGlobal = {
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
  teamCaption?: string
  groupPhoto?: CmsMedia | number | null
  groupPhotoAlt?: string
}

export type HomeGalleryViewGlobal = {
  lede?: string
  eyebrow?: string
  heading?: { a?: string; b?: string }
  ctaLabel?: string
  ctaHref?: string
}

export type HomeJourneyViewGlobal = {
  eyebrow?: string
  heading?: { a?: string; b?: string }
  ctaLabel?: string
  ctaHref?: string
}

export type HomeStoriesViewGlobal = {
  lede?: string
  eyebrow?: string
  heading?: { a?: string; b?: string }
  ctaLabel?: string
  ctaHref?: string
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
  clinicCatalogueItems: ClinicCatalogueItem[]
  beforeAfterCases: BeforeAfterCase[]
  stories: Story[]
  pressMentions: PressMention[]
  awards: Award[]
  recoveryStays: RecoveryStay[]
  blogPosts: BlogPost[]
  authors: Author[]
  journeySteps: JourneyStep[]
  privacySections: PrivacySection[]
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
  contactHero: ContactHeroGlobal
  contactEnquirySection: ContactEnquirySectionGlobal
  contactVisitSection: ContactVisitSectionGlobal
  journeyHero: JourneyHeroGlobal
  journeyStats: JourneyStatsGlobal
  recoveryStaysPage: RecoveryStaysPageGlobal
  // R3 — b. Treatments Bucket section globals
  treatmentsHero: TreatmentsHeroGlobal
  treatmentsIndexSection: TreatmentsIndexSectionGlobal
  treatmentsStats: TreatmentsStatsGlobal
  disciplineDetailTemplate: DisciplineDetailTemplateGlobal
  subCategoryDetailTemplate: SubCategoryDetailTemplateGlobal
  // R4 — c. Doctors Bucket section globals
  surgeonsHero: SurgeonsHeroGlobal
  surgeonsLeadView: SurgeonsLeadViewGlobal
  surgeonsPlasticView: SurgeonsSectionViewGlobal
  surgeonsAestheticView: SurgeonsSectionViewGlobal
  surgeonDetailTemplate: SurgeonDetailTemplateGlobal
  // R8 — h. About Bucket
  blogPostTemplate: BlogPostTemplateGlobal
  // R6 — e. Pricing Bucket section globals
  pricingHero: PricingHeroGlobal
  pricingOverview: PricingOverviewGlobal
  pricingFootnote: PricingFootnoteGlobal
  pricingInsurance: PricingInsuranceGlobal
  pricingPayment: PricingPaymentGlobal
  pricingDisciplineListView: PricingDisciplineListViewGlobal
  pricingCatalogueView: PricingCatalogueViewGlobal
  // R5 — d. Results Bucket section globals
  resultsHero: ResultsHeroGlobal
  resultsFeaturedCasesView: ResultsFeaturedCasesViewGlobal
  resultsStoriesView: ResultsStoriesViewGlobal
  libraryCta: LibraryCtaGlobal
  shareCta: ShareCtaGlobal
  // R2 — a. Homepage Bucket section globals
  homeHero: HomeHeroGlobal
  homeIntro: HomeIntroGlobal
  homeLeadMagnet: HomeLeadMagnetGlobal
  homePlace: HomePlaceGlobal
  homeTreatmentsView: HomeTreatmentsViewGlobal
  homePricingView: HomePricingViewGlobal
  homeSurgeonsView: HomeSurgeonsViewGlobal
  homeGalleryView: HomeGalleryViewGlobal
  homeJourneyView: HomeJourneyViewGlobal
  homeStoriesView: HomeStoriesViewGlobal
  // 25.29
  notFoundPage: NotFoundPageGlobal
}
