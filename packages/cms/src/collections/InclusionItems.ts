import type { CollectionConfig } from 'payload'
import { isAuthenticated, readPublic } from '../lib/access'
import { revalidationHooks } from '../lib/revalidate'
import { sortOrderField } from '../lib/seo'
import { apiWarningField } from '../lib/api-warning'

export const InclusionItems: CollectionConfig = {
  slug: 'inclusion-items',
  admin: {
    useAsTitle: 'text',
    defaultColumns: ['text', 'scope', 'sortOrder'],
    group: '2 Treatments',
    description: 'Curated "what\'s included" line items shared across procedures. Procedures pick relevant ones via the Included relation. Editing a line here updates every procedure card that references it. Seeded from pricelist Further Info.',
  },
  access: {
    read: readPublic,
    create: isAuthenticated,
    update: isAuthenticated,
    delete: isAuthenticated,
  },
  hooks: revalidationHooks(),
  fields: [
    apiWarningField,
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
