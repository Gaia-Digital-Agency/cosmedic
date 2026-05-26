import type { GlobalConfig } from 'payload'
import { isAuthenticated, readPublic } from '../../lib/access'
import { revalidateGlobalAfterChange } from '../../lib/revalidate'
import { apiWarningField } from '../../lib/api-warning'

export const PricingOverview: GlobalConfig = {
  slug: 'pricing-overview',
  label: 'c. Overview',
  admin: {
    group: 'Pricing',
    description:
      'Optional editorial overview between the chapter opener and the discipline price list. Leave every field blank and the section will not render.',
  },
  access: { read: readPublic, update: isAuthenticated },
  hooks: revalidateGlobalAfterChange(),
  fields: [
    apiWarningField,
    { name: 'eyebrow', type: 'text',
      admin: { description: 'Small-caps eyebrow above the H2.' } },
    { name: 'headingPart1', type: 'text',
      admin: { description: 'Roman text part of the H2.' } },
    { name: 'headingPart2', type: 'text',
      admin: { description: 'Italic accent text part of the H2.' } },
    { name: 'body', type: 'textarea',
      admin: { description: 'Single paragraph body.' } },
  ],
}
