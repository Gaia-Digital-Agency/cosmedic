import type { CollectionConfig } from 'payload'
import { isAuthenticated, readPublic } from '../lib/access'
import { revalidationHooks } from '../lib/revalidate'
import { seoGroup, sortOrderField, publishStatusField } from '../lib/seo'
import { apiWarningField } from '../lib/api-warning'

export const Stories: CollectionConfig = {
  slug: 'stories',
  admin: {
    useAsTitle: 'patientLabel',
    defaultColumns: ['patientLabel', 'procedure', 'country', 'isFeatured'],
    group: 'd. Results',
    description: 'Patient testimonials. Renders on /stories (full set) and the homepage Stories section. Use anonymous labels (e.g. "Sarah, 42, Sydney") — no full names.',
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
    { name: 'patientLabel', type: 'text', required: true },
    { name: 'country', type: 'text', admin: { description: 'ISO country code or city, e.g. "AU/Sydney"' } },
    { name: 'procedure', type: 'relationship', relationTo: 'procedures' },
    { name: 'portrait', type: 'upload', relationTo: 'media' },
    { name: 'quote', type: 'text', admin: { description: 'Pullquote (~1 sentence)' } },
    { name: 'body', type: 'richText', admin: { description: 'Full testimonial' } },
    { name: 'videoUrl', type: 'text', admin: { description: 'Optional video testimonial URL' } },
    { name: 'year', type: 'number' },
    { name: 'surgeon', type: 'relationship', relationTo: 'surgeons' },
    { name: 'isFeatured', type: 'checkbox', defaultValue: false },
    publishStatusField,
    seoGroup,
    sortOrderField,
  ],
}
