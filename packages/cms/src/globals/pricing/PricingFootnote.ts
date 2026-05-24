import type { GlobalConfig } from 'payload'
import { isAuthenticated, readPublic } from '../../lib/access'
import { revalidateGlobalAfterChange } from '../../lib/revalidate'
import { apiWarningField } from '../../lib/api-warning'

export const PricingFootnote: GlobalConfig = {
  slug: 'pricing-footnote',
  label: 'd. Footnote',
  admin: {
    group: 'e. Pricing',
    description:
      'Centred italic footnote rendered between the discipline price list and the full clinic catalogue table.',
  },
  access: { read: readPublic, update: isAuthenticated },
  hooks: revalidateGlobalAfterChange(),
  fields: [
    apiWarningField,
    { name: 'text', type: 'textarea',
      defaultValue:
        'Prices indicative for international patients. AUD shown at 1 AUD ≈ Rp 10,500 (May 2026). Final quotes are tailored after consultation. Recovery stays, transfers, and twelve months of telehealth follow-up included on most surgical packages.',
      admin: { description: 'Centred italic footnote copy.' } },
  ],
}
