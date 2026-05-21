import type { CollectionConfig } from 'payload'
import { isAuthenticated, readPublic } from '../lib/access'
import { revalidationHooks } from '../lib/revalidate'
import { seoGroup, sortOrderField } from '../lib/seo'
import { apiWarningField } from '../lib/api-warning'

export const Disciplines: CollectionConfig = {
  slug: 'disciplines',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'sortOrder'],
    group: 'Catalogue',
    description: '6 disciplines. Each renders at /treatment-{slug}. Drives Treatments mega-menu top level.',
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
    { name: 'slug', type: 'text', required: true, unique: true, index: true,
      admin: { description: 'e.g. "surgical" → /treatment-surgical' } },
    { name: 'title', type: 'text', required: true, admin: { description: '"Surgical"' } },
    { name: 'subtitle', type: 'text', admin: { description: '"Rhinoplasty · Breast · Body"' } },
    { name: 'displayCount', type: 'text', admin: { description: 'e.g. "9 procedures" (free text, not auto)' } },
    { name: 'hue', type: 'number', min: 0, max: 5, defaultValue: 0 },
    { name: 'body', type: 'richText', admin: { description: 'Card paragraph used on treatments index + home' } },
    {
      name: 'chapterTitle',
      type: 'group',
      admin: { description: 'Two-part title with italic accent on the second part' },
      fields: [
        { name: 'a', type: 'text', admin: { description: 'First half (roman)' } },
        { name: 'b', type: 'text', admin: { description: 'Second half (italic accent)' } },
      ],
    },
    { name: 'tagline', type: 'text', admin: { description: 'Editorial strap above title' } },
    { name: 'lede', type: 'textarea', admin: { description: 'Hero lede paragraph' } },
    { name: 'overview', type: 'richText', admin: { description: 'Long-form overview block' } },
    { name: 'heroImage', type: 'upload', relationTo: 'media' },
    { name: 'leadSurgeons', type: 'relationship', relationTo: 'surgeons', hasMany: true },
    {
      name: 'faqs',
      type: 'array',
      fields: [
        { name: 'q', type: 'text', required: true },
        { name: 'a', type: 'textarea', required: true },
      ],
    },
    seoGroup,
    sortOrderField,
  ],
}
