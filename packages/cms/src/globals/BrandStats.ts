import type { GlobalConfig } from 'payload'
import { isAuthenticated, readPublic } from '../lib/access'

export const BrandStats: GlobalConfig = {
  slug: 'brand-stats',
  admin: { group: 'Brand', description: 'Stats strip values (brand.pdf §IV). Used on home + about.' },
  access: { read: readPublic, update: isAuthenticated },
  fields: [
    {
      name: 'stats',
      type: 'array',
      admin: { description: 'Default seed: 28 years / 8 ISAPS-FICS / 3,400+ procedures / #1 hospital 2026' },
      fields: [
        { name: 'number', type: 'text', required: true, admin: { description: 'e.g. "28", "8", "3,400+", "#1"' } },
        { name: 'label', type: 'text', required: true },
        { name: 'sourceNote', type: 'text', admin: { description: 'Provenance, e.g. "Per brand.pdf §IV"' } },
      ],
    },
  ],
}
