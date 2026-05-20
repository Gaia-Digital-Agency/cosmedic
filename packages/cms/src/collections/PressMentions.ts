import type { CollectionConfig } from 'payload'
import { isAuthenticated, readPublic } from '../lib/access'
import { sortOrderField } from '../lib/seo'

export const PressMentions: CollectionConfig = {
  slug: 'press-mentions',
  admin: {
    useAsTitle: 'publication',
    defaultColumns: ['publication', 'headline', 'publishedDate', 'isFeatured'],
    group: 'Editorial',
    description: 'Press / editorial mentions for /press page.',
  },
  access: {
    read: readPublic,
    create: isAuthenticated,
    update: isAuthenticated,
    delete: isAuthenticated,
  },
  fields: [
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
