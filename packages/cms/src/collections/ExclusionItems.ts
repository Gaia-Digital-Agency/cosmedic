import type { CollectionConfig } from 'payload'
import { isAuthenticated, readPublic } from '../lib/access'
import { sortOrderField } from '../lib/seo'

export const ExclusionItems: CollectionConfig = {
  slug: 'exclusion-items',
  admin: {
    useAsTitle: 'text',
    defaultColumns: ['text', 'scope', 'sortOrder'],
    group: 'Editorial',
    description: 'Universal "what is excluded" items. Linked from Procedures.excluded. Seeded from pricelist Further Info.',
  },
  access: {
    read: readPublic,
    create: isAuthenticated,
    update: isAuthenticated,
    delete: isAuthenticated,
  },
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
