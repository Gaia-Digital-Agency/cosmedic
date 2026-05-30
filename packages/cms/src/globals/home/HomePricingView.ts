import type { GlobalConfig } from 'payload'
import { isAuthenticated, readPublic } from '../../lib/access'
import { revalidateGlobalAfterChange } from '../../lib/revalidate'

export const HomePricingView: GlobalConfig = {
  slug: 'home-pricing-view',
  label: 'Pricing',
  admin: {
    group: 'Homepage',
    description:
      'Section chrome for the Pricing teaser on / (the 8 price tiles + footnote + view-all CTA). The prices themselves are NOT edited here — source: **e. Pricing → PriceListItems / Procedures** (catalogueGroup, name, IDR + AUD). This item controls only the eyebrow, heading, lede, footnote, and view-all CTA.',
  },
  access: { read: readPublic, update: isAuthenticated },
  hooks: revalidateGlobalAfterChange(),
  fields: [
    { name: 'lede', label: 'Intro paragraph', type: 'textarea', localized: true,
      defaultValue:
        'Indicative starting prices in IDR (with AUD equivalent). Final quotes are tailored after consultation. Travel, accommodation and concierge can be packaged.',
      admin: { description: 'Intro paragraph (D8 — lede before eyebrow for section views).' } },
    { name: 'eyebrow', label: 'Label above heading', type: 'text', localized: true, defaultValue: 'Pricing · Starting From',
      admin: { description: 'Section eyebrow.' } },
    {
      name: 'heading', type: 'group',
      admin: { description: 'Two-part section heading. Part A renders roman; part B renders italic.' },
      fields: [
        { name: 'a', type: 'text', localized: true, defaultValue: 'Transparent',
          admin: { description: 'First part (roman). e.g. "Transparent".' } },
        { name: 'b', type: 'text', localized: true, defaultValue: 'pricing.',
          admin: { description: 'Second part (italic). e.g. "pricing.".' } },
      ],
    },
    { name: 'footnote', type: 'textarea', localized: true,
      defaultValue:
        'Prices indicative for international patients. AUD shown at 1 AUD ≈ Rp 12,500 (May 2026). Recovery stays, transfers and 12-month telehealth follow-up included on most surgical packages.',
      admin: { description: 'Footnote beneath the price grid.' } },
    { name: 'viewAllLabel', type: 'text', localized: true, defaultValue: 'View full pricing',
      admin: { description: 'Right-side ghost-CTA label.' } },
    { name: 'viewAllHref', type: 'text', defaultValue: '/pricing',
      admin: { description: 'Where the ghost CTA links.' } },
  ],
}
