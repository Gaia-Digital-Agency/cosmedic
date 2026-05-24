import type { GlobalConfig } from 'payload'
import { isAuthenticated, readPublic } from '../../lib/access'
import { revalidateGlobalAfterChange } from '../../lib/revalidate'
import { apiWarningField } from '../../lib/api-warning'

export const PricingPayment: GlobalConfig = {
  slug: 'pricing-payment',
  label: 'f. Payment',
  admin: {
    group: 'e. Pricing',
    description:
      'Right column of the two-column section at the bottom of /pricing — payment heading + key/value terms list.',
  },
  access: { read: readPublic, update: isAuthenticated },
  hooks: revalidateGlobalAfterChange(),
  fields: [
    apiWarningField,
    { name: 'eyebrow', type: 'text', defaultValue: 'Payment',
      admin: { description: 'Small-caps eyebrow above the H2.' } },
    { name: 'headingRoman', type: 'text', defaultValue: 'Quiet,',
      admin: { description: 'Roman text part of the H2.' } },
    { name: 'headingItalic', type: 'text', defaultValue: 'considered terms.',
      admin: { description: 'Italic accent text part of the H2.' } },
    { name: 'termsText', type: 'textarea',
      defaultValue:
        'Deposit | 20% on confirmation\nBalance | On admission, by transfer\nCurrencies | IDR, AUD, USD, EUR\nCards | Accepted, 1.8% surcharge\nRefunds | Full, until 14 days before\nFinance | Available via partner lender',
      admin: {
        description:
          'One row per line. Format: "Label | Value". Leave blank to use the hardcoded fallback.',
      } },
  ],
}
