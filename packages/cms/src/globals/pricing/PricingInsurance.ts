import type { GlobalConfig } from 'payload'
import { isAuthenticated, readPublic } from '../../lib/access'
import { revalidateGlobalAfterChange } from '../../lib/revalidate'

export const PricingInsurance: GlobalConfig = {
  slug: 'pricing-insurance',
  label: 'Insurance',
  admin: {
    group: 'Pricing',
    description:
      'Left column of the two-column section at the bottom of /pricing — insurance copy.',
  },
  access: { read: readPublic, update: isAuthenticated },
  hooks: revalidateGlobalAfterChange(),
  fields: [
    { name: 'eyebrow', label: 'Label above heading', type: 'text', defaultValue: 'Insurance',
      admin: { description: 'Small-caps eyebrow above the H2.' } },
    { name: 'headingRoman', type: 'text', defaultValue: 'Working',
      admin: { description: 'Roman text part of the H2.' } },
    { name: 'headingItalic', type: 'text', defaultValue: 'with insurers.',
      admin: { description: 'Italic accent text part of the H2.' } },
    { name: 'body', type: 'textarea',
      defaultValue:
        "Cosmetic surgery is rarely covered by health insurance. Reconstructive procedures may be — and where they are, we are happy to support your claim with full documentation, surgeon's reports, and itemised invoicing.\n\nTravel insurance is recommended for every patient, and we work with two specialist medical-travel insurers — details supplied during consultation.",
      admin: { description: 'Body copy. Separate paragraphs with a blank line.' } },
  ],
}
