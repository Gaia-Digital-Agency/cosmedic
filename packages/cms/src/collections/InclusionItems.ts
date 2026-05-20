import type { CollectionConfig } from 'payload'
import { isAuthenticated, readPublic } from '../lib/access'
import { revalidationHooks } from '../lib/revalidate'
import { sortOrderField } from '../lib/seo'

export const InclusionItems: CollectionConfig = {
  slug: 'inclusion-items',
  admin: {
    useAsTitle: 'text',
    defaultColumns: ['text', 'scope', 'sortOrder'],
    group: 'Editorial',
    description: 'Universal "what surgery includes" items. Linked from Procedures.included. Seeded from pricelist Further Info.',
  },
  access: {
    read: readPublic,
    create: isAuthenticated,
    update: isAuthenticated,
    delete: isAuthenticated,
  },
  hooks: revalidationHooks(),
  fields: [
    { name: 'text', type: 'text', required: true },
    {
      name: 'scope',
      type: 'select',
      defaultValue: 'surgical-procedure',
      options: [
        { label: 'Surgical Procedure', value: 'surgical-procedure' },
        { label: 'Consultation', value: 'consultation' },
        { label: 'General', value: 'general' },
      ],
    },
    sortOrderField,
  ],
}
