/**
 * Page-globals types. The 14 Payload Globals replaced the old Pages collection
 * (2026-05-22 admin restructure). Each global holds editorial hero + sections
 * for one static route; the runtime cache flattens them into `CmsCache.pages`.
 */

import type { CmsMedia, Lexical } from './cms.types'

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
    teamCaption?: string
    groupPhoto?: number | CmsMedia | null
    groupPhotoAlt?: string
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
  // Phase C7 — pricing-page only.
  overviewBlock?: {
    eyebrow?: string
    headingPart1?: string
    headingPart2?: string
    body?: string
  }
  footnoteBlock?: {
    text?: string
  }
  insurancePaymentBlock?: {
    insuranceEyebrow?: string
    insuranceHeadingRoman?: string
    insuranceHeadingItalic?: string
    insuranceBody?: string
    paymentEyebrow?: string
    paymentHeadingRoman?: string
    paymentHeadingItalic?: string
    paymentTermsText?: string
  }
  // Phase R8.C — blog-page chrome additions (only set on blog-page row).
  thisIssueEyebrow?: string
  readTheEssayCtaLabel?: string
  archiveSection?: {
    eyebrow?: string
    headingPre?: string
    headingItalic?: string
    lede?: string
    filterAllLabel?: string
    emptyStateCopy?: string
  }
  // Phase R8.C — press-page chrome additions (only set on press-page row).
  accreditationsSection?: {
    eyebrow?: string
    heading?: string
    lede?: string
  }
  pressSection?: {
    eyebrow?: string
    headingPre?: string
    headingItalic?: string
    lede?: string
  }
  pressEnquiriesCtaLabel?: string
  // Phase R8.C — privacy-page chrome additions (only set on privacy-page row).
  lastUpdatedDate?: string
  versionLine?: string
  readingTimeLine?: string
  introParagraph?: string
  // Phase R5 — gallery-page + stories-page hero/filter additions.
  imageHue?: number
  imageLabel?: string
  breadcrumbLabel?: string
  filterBarLabel?: string
  countFormat?: string
}
