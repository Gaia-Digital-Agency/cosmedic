import type { GlobalConfig } from 'payload'
import { isAuthenticated, readPublic } from '../../lib/access'
import { revalidateGlobalAfterChange } from '../../lib/revalidate'
import { apiWarningField } from '../../lib/api-warning'

export const HomePricingView: GlobalConfig = {
  slug: 'home-pricing-view',
  label: 'n. Pricing-View',
  admin: {
    group: 'Homepage',
    description:
      'Section chrome for the Pricing teaser on / (the 8 price tiles + footnote + view-all CTA). The prices themselves are NOT edited here — source: **e. Pricing → PriceListItems / Procedures** (catalogueGroup, name, IDR + AUD). This item controls only the eyebrow, heading, lede, footnote, and view-all CTA.',
  },
  access: { read: readPublic, update: isAuthenticated },
  hooks: revalidateGlobalAfterChange(),
  fields: [
    apiWarningField,
    { name: 'eyebrow', label: 'Label above heading', type: 'text', defaultValue: 'Pricing · Starting From',
      admin: { description: 'Section eyebrow.' } },
    { name: 'headingPart1', type: 'text', defaultValue: 'Transparent',
      admin: { description: 'First line of the heading (roman).' } },
    { name: 'headingPart2', type: 'text', defaultValue: 'pricing.',
      admin: { description: 'Second line of the heading (italic).' } },
    { name: 'lede', label: 'Intro paragraph', type: 'textarea',
      defaultValue:
        'Indicative starting prices in IDR (with AUD equivalent). Final quotes are tailored after consultation. Travel, accommodation and concierge can be packaged.',
      admin: { description: 'Section lede.' } },
    { name: 'footnote', type: 'textarea',
      defaultValue:
        'Prices indicative for international patients. AUD shown at 1 AUD ≈ Rp 12,500 (May 2026). Recovery stays, transfers and 12-month telehealth follow-up included on most surgical packages.',
      admin: { description: 'Footnote beneath the price grid.' } },
    { name: 'viewAllLabel', type: 'text', defaultValue: 'View full pricing',
      admin: { description: 'Right-side ghost-CTA label.' } },
    { name: 'viewAllHref', type: 'text', defaultValue: '/pricing',
      admin: { description: 'Where the ghost CTA links.' } },
  ],
}
