import type { Field, GlobalConfig } from 'payload'
import { isAuthenticated, publishedOrAuthed } from '../../lib/access'
import { revalidateGlobalAfterChange } from '../../lib/revalidate'
import { pageFields } from './_pageFields'

/**
 * Phase C6 A2 wiring — 9 dedicated block group fields for the editor to
 * manage every editorial section frame on /. Each block is OPTIONAL so the
 * web renderer can fall back to its hardcoded copy when the field is empty
 * (Rule R5 byte-identical).
 *
 * Editor sees each block as a labelled group in the admin form — no hunting
 * inside a generic sections[] array.
 */
const introBlock: Field = {
  name: 'introBlock',
  type: 'group',
  admin: { description: 'Intro section on /. "Our Approach" eyebrow + italic pull quote + 2-column body.' },
  fields: [
    { name: 'eyebrow', label: 'Label above heading', type: 'text' },
    { name: 'pullQuoteBefore', type: 'text', admin: { description: 'Plain text before the italic accent word' } },
    { name: 'pullQuoteAccent', type: 'text', admin: { description: 'The italic accent word (e.g. "care")' } },
    { name: 'pullQuoteAfter', type: 'text', admin: { description: 'Plain text after the italic accent word' } },
    { name: 'col1', type: 'textarea' },
    { name: 'col2', type: 'textarea' },
  ],
}

const treatmentsBlock: Field = {
  name: 'treatmentsBlock',
  type: 'group',
  admin: { description: 'Treatments preview section frame on / (above the 6 discipline cards).' },
  fields: [
    { name: 'eyebrow', label: 'Label above heading', type: 'text' },
    { name: 'headingPart1', type: 'text', admin: { description: 'Roman text part of H2' } },
    { name: 'headingPart2', type: 'text', admin: { description: 'Italic accent part of H2' } },
    { name: 'lede', label: 'Intro paragraph', type: 'textarea' },
  ],
}

const pricingTeaserBlock: Field = {
  name: 'pricingTeaserBlock',
  type: 'group',
  admin: { description: 'Pricing teaser section frame on / (8 price rows + footnote).' },
  fields: [
    { name: 'eyebrow', label: 'Label above heading', type: 'text' },
    { name: 'headingPart1', type: 'text' },
    { name: 'headingPart2', type: 'text' },
    { name: 'lede', label: 'Intro paragraph', type: 'textarea' },
    { name: 'footnote', type: 'textarea' },
    { name: 'viewAllLabel', type: 'text' },
    { name: 'viewAllHref', type: 'text' },
  ],
}

const surgeonsBlock: Field = {
  name: 'surgeonsBlock',
  type: 'group',
  admin: { description: 'Surgeons strip section frame on / (lead surgeon + team group photo). q4 (2026-05-24): the 6-card associates grid was replaced with a single team photo. Per-surgeon profiles still live under /surgeons.' },
  fields: [
    { name: 'eyebrow', label: 'Label above heading', type: 'text' },
    { name: 'leadSurgeonEyebrow', type: 'text' },
    { name: 'leadBody', type: 'textarea' },
    { name: 'leadStat1Label', type: 'text' },
    { name: 'leadStat1Value', type: 'text' },
    { name: 'leadStat2Label', type: 'text' },
    { name: 'leadStat2Value', type: 'text' },
    { name: 'leadStat3Label', type: 'text' },
    { name: 'leadStat3Value', type: 'text' },
    { name: 'leadCtaLabel', type: 'text' },
    { name: 'associatesEyebrow', type: 'text', admin: { description: 'Eyebrow label on the team-photo row (left side).' } },
    { name: 'teamCaption', type: 'text', admin: { description: 'Caption on the team-photo row (right side). Replaces the legacy "{N} practitioners" count. Defaults to "The Cosmedic Team".' } },
    { name: 'groupPhoto', type: 'upload', relationTo: 'media', admin: { description: 'Single team group photo replacing the legacy 6-card associates grid. Falls back to /assets/surgeons/team-placeholder.webp when unset.' } },
    { name: 'groupPhotoAlt', type: 'text', admin: { description: 'Alt text for the team photo (accessibility). Falls back to the associatesEyebrow value.' } },
  ],
}

const galleryBlock: Field = {
  name: 'galleryBlock',
  type: 'group',
  admin: { description: 'Gallery (Before & After) teaser section frame on /.' },
  fields: [
    { name: 'eyebrow', label: 'Label above heading', type: 'text' },
    { name: 'headingPart1', type: 'text' },
    { name: 'headingPart2', type: 'text' },
    { name: 'lede', label: 'Intro paragraph', type: 'textarea' },
    { name: 'ctaLabel', type: 'text' },
    { name: 'ctaHref', type: 'text' },
  ],
}

const leadMagnetBlock: Field = {
  name: 'leadMagnetBlock',
  type: 'group',
  admin: { description: 'Lead-magnet section on / (recovery guide cover + email-capture form).' },
  fields: [
    { name: 'coverEyebrow', type: 'text' },
    { name: 'coverLine1', type: 'text' },
    { name: 'coverLine2', type: 'text' },
    { name: 'coverLine3', type: 'text' },
    { name: 'coverFoot1', type: 'text' },
    { name: 'coverFoot2', type: 'text' },
    { name: 'bodyEyebrow', type: 'text' },
    { name: 'headingPart1', type: 'text' },
    { name: 'headingAccent', type: 'text' },
    { name: 'lede', label: 'Intro paragraph', type: 'textarea' },
    { name: 'formPlaceholder', type: 'text' },
    { name: 'submitLabel', type: 'text' },
    { name: 'successHeading', type: 'text' },
    { name: 'successBody', type: 'text' },
    { name: 'fineprint', type: 'text' },
  ],
}

const journeyBlock: Field = {
  name: 'journeyBlock',
  type: 'group',
  admin: { description: 'Journey teaser section on / (5-step preview).' },
  fields: [
    { name: 'eyebrow', label: 'Label above heading', type: 'text' },
    { name: 'headingPart1', type: 'text' },
    { name: 'headingAccent', type: 'text' },
    { name: 'ctaLabel', type: 'text' },
    { name: 'ctaHref', type: 'text' },
  ],
}

const storiesBlock: Field = {
  name: 'storiesBlock',
  type: 'group',
  admin: { description: 'Stories teaser section on / (3 testimonial cards).' },
  fields: [
    { name: 'eyebrow', label: 'Label above heading', type: 'text' },
    { name: 'headingAccent', type: 'text' },
    { name: 'headingPart2', type: 'text' },
    { name: 'lede', label: 'Intro paragraph', type: 'textarea', admin: { description: 'May contain inline link via Markdown' } },
    { name: 'ctaLabel', type: 'text' },
    { name: 'ctaHref', type: 'text' },
  ],
}

const placeBlock: Field = {
  name: 'placeBlock',
  type: 'group',
  admin: { description: 'Place / "Recover in paradise" section on /. Lettered rows (A./B./C./D.) stay in code for now — editable list rolls in via Phase Q.' },
  fields: [
    { name: 'eyebrow', label: 'Label above heading', type: 'text' },
    { name: 'headingPart1', type: 'text' },
    { name: 'headingAccent', type: 'text' },
    { name: 'body', type: 'textarea' },
    { name: 'rowsText', type: 'textarea', admin: { description: 'One row per line. Format: "A. text body". Leave blank to use hardcoded fallback.' } },
    { name: 'ctaLabel', type: 'text' },
    { name: 'ctaHref', type: 'text' },
  ],
}

export const HomePage: GlobalConfig = {
  slug: 'home-page',
  label: 'Main',
  admin: {
    group: 'Homepage',
    description:
      'Page-level shell for / (home): title, slug, route, publishStatus, generic sections array, and the SEO group. Hero + section editorial moved to dedicated globals (b. Hero, e. Intro, g. Lead-Magnet, h. Place + the 6 view sections m–r) in Phase R2. The 9 block fields below are deprecated reads — kept until sign-off so editor data is not lost; the live route reads from the new section globals.',
  },
  access: { read: publishedOrAuthed, update: isAuthenticated },
  hooks: revalidateGlobalAfterChange(),
  fields: [
    ...pageFields(),
    introBlock,
    treatmentsBlock,
    pricingTeaserBlock,
    surgeonsBlock,
    galleryBlock,
    leadMagnetBlock,
    journeyBlock,
    storiesBlock,
    placeBlock,
  ],
}
