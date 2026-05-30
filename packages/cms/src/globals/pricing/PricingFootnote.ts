import type { GlobalConfig } from 'payload'
import { isAuthenticated, readPublic } from '../../lib/access'
import { revalidateGlobalAfterChange } from '../../lib/revalidate'

export const PricingFootnote: GlobalConfig = {
  slug: 'pricing-footnote',
  label: 'Footnote',
  admin: {
    hidden: true,
    group: 'Treatments',
    description:
      'Centred italic footnote rendered between the discipline price list and the full clinic catalogue table.',
  },
  access: { read: readPublic, update: isAuthenticated },
  hooks: revalidateGlobalAfterChange(),
  fields: [
    { name: 'text', type: 'textarea', localized: true,
      defaultValue:
        'Prices indicative for international patients. AUD shown at 1 AUD ≈ Rp 10,500 (May 2026). Final quotes are tailored after consultation. Recovery stays, transfers, and twelve months of telehealth follow-up included on most surgical packages.',
      admin: { description: 'Centred italic footnote copy.' } },
  ],
}
