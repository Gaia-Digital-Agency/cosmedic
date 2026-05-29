import type { GlobalConfig } from 'payload'
import { isAuthenticated, readPublic } from '../../lib/access'
import { revalidateGlobalAfterChange } from '../../lib/revalidate'

export const PricingOverview: GlobalConfig = {
  slug: 'pricing-overview',
  label: 'Overview',
  admin: {
    group: 'Treatments',
    hidden: true,
    description:
      'Optional editorial overview between the chapter opener and the discipline price list. Leave every field blank and the section will not render.',
  },
  access: { read: readPublic, update: isAuthenticated },
  hooks: revalidateGlobalAfterChange(),
  fields: [
    { name: 'eyebrow', label: 'Label above heading', type: 'text',
      admin: { description: 'Small-caps eyebrow above the H2.' } },
    {
      name: 'heading', type: 'group',
      admin: { description: 'Two-part H2. Part A renders roman; part B renders italic. D1 merge from headingPart1 + headingPart2.' },
      fields: [
        { name: 'a', type: 'text', admin: { description: 'Roman part of the H2.' } },
        { name: 'b', type: 'text', admin: { description: 'Italic accent part of the H2.' } },
      ],
    },
    { name: 'body', type: 'textarea',
      admin: { description: 'Single paragraph body.' } },
  ],
}
