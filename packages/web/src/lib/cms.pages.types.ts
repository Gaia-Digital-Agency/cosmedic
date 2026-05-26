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
  // 25.28 — privacy-page DPO section + TOC heading
  tocHeading?: string
  dpo?: {
    eyebrow?: string
    headingA?: string
    headingB?: string
    lede?: string
    emailLabel?: string
    email?: string
    postLabel?: string
    addressLine1?: string
    addressLine2?: string
    addressLine3?: string
    generalContactLabel?: string
  }
}
