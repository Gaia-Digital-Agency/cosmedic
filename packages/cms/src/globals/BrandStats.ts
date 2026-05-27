import type { GlobalConfig } from 'payload'
import { isAuthenticated, readPublic } from '../lib/access'
import { revalidateGlobalAfterChange } from '../lib/revalidate'

export const BrandStats: GlobalConfig = {
  slug: 'brand-stats',
  label: 'Trust Strip',
  admin: {
    group: 'Homepage',
    description: 'The trust-bar stats strip rendered directly under the homepage hero (default: "28 years · 8 ISAPS-FICS · 3,400+ procedures · #1 hospital 2026"). Sourced from brand.pdf §IV.',
  },
  access: { read: readPublic, update: isAuthenticated },
  hooks: revalidateGlobalAfterChange(),
  fields: [
    {
      name: 'stats',
      type: 'array',
      admin: { description: 'The 4 stats shown in the homepage trust strip, left-to-right. Order here = display order.' },
      fields: [
        { name: 'number', type: 'text', required: true,
          admin: { description: 'Big serif number/marker shown above the label. e.g. "28", "8", "3,400+", "#1".' } },
        { name: 'label', type: 'text', required: true,
          admin: { description: 'Caption under the number (e.g. "years in practice").' } },
        { name: 'sourceNote', type: 'text',
          admin: { description: 'Provenance / source note for editor reference, e.g. "Per brand.pdf §IV". Not rendered on the site.' } },
      ],
    },
  ],
}
