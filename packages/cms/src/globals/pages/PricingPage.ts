import type { Field, GlobalConfig } from 'payload'
import { isAuthenticated, publishedOrAuthed } from '../../lib/access'
import { revalidateGlobalAfterChange } from '../../lib/revalidate'
import { pageFields } from './_pageFields'

/**
 * Phase C7 A2 wiring — 3 dedicated block group fields for /pricing editorial
 * frame. Every field is OPTIONAL so the renderer falls back to hardcoded copy
 * when blank (Rule R5 byte-identical).
 */
const overviewBlock: Field = {
  name: 'overviewBlock',
  type: 'group',
  admin: {
    description:
      'Optional editorial overview between the chapter opener and the price list. Leave blank and no section renders.',
  },
  fields: [
    { name: 'eyebrow', type: 'text' },
    { name: 'headingPart1', type: 'text', admin: { description: 'Roman text part of H2' } },
    { name: 'headingPart2', type: 'text', admin: { description: 'Italic accent part of H2' } },
    { name: 'body', type: 'textarea' },
  ],
}

const footnoteBlock: Field = {
  name: 'footnoteBlock',
  type: 'group',
  admin: {
    description:
      'Centred italic footnote rendered between the discipline price list and the full clinic catalogue table.',
  },
  fields: [{ name: 'text', type: 'textarea' }],
}

const insurancePaymentBlock: Field = {
  name: 'insurancePaymentBlock',
  type: 'group',
  admin: {
    description:
      'Two-column section at the bottom of /pricing. Left column: insurance copy. Right column: payment heading + key/value terms list.',
  },
  fields: [
    { name: 'insuranceEyebrow', type: 'text' },
    { name: 'insuranceHeadingRoman', type: 'text' },
    { name: 'insuranceHeadingItalic', type: 'text' },
    {
      name: 'insuranceBody',
      type: 'textarea',
      admin: { description: 'Body copy. Separate paragraphs with a blank line.' },
    },
    { name: 'paymentEyebrow', type: 'text' },
    { name: 'paymentHeadingRoman', type: 'text' },
    { name: 'paymentHeadingItalic', type: 'text' },
    {
      name: 'paymentTermsText',
      type: 'textarea',
      admin: {
        description:
          'One row per line. Format: "Label | Value". Leave blank to use hardcoded fallback.',
      },
    },
  ],
}

export const PricingPage: GlobalConfig = {
  slug: 'pricing-page',
  admin: {
    group: 'e. Pricing',
    description:
      'Editorial content for /pricing: hero (chapter / title / lede / heroImage) plus 3 A2 section blocks (overview, footnote, insurancePayment). The discipline price list and the full clinic catalogue table are data-driven from Procedures + PriceListItems.',
  },
  access: { read: publishedOrAuthed, update: isAuthenticated },
  hooks: revalidateGlobalAfterChange(),
  fields: [...pageFields(), overviewBlock, footnoteBlock, insurancePaymentBlock],
}
