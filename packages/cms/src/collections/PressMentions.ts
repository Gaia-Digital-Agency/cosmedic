import type { CollectionConfig } from 'payload'
import { isAuthenticated, readPublic } from '../lib/access'
import { revalidationHooks } from '../lib/revalidate'
import { sortOrderField } from '../lib/seo'
import { apiWarningField } from '../lib/api-warning'

export const PressMentions: CollectionConfig = {
  slug: 'press-mentions',
  admin: {
    useAsTitle: 'publication',
    defaultColumns: ['publication', 'headline', 'publishedDate', 'isFeatured'],
    group: '1 Homepage',
    description: 'External press / editorial mentions of the clinic. Renders as the logo + headline grid on /press.',
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
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    { name: 'publication', type: 'text', required: true },
    { name: 'logo', type: 'upload', relationTo: 'media' },
    { name: 'headline', type: 'text' },
    { name: 'url', type: 'text', admin: { description: 'Outbound link' } },
    { name: 'publishedDate', type: 'date' },
    { name: 'summary', type: 'textarea' },
    { name: 'isFeatured', type: 'checkbox', defaultValue: false },
    sortOrderField,
  ],
}
