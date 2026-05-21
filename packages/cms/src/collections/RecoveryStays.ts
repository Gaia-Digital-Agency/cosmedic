import type { CollectionConfig } from 'payload'
import { isAuthenticated, readPublic } from '../lib/access'
import { revalidationHooks } from '../lib/revalidate'
import { seoGroup, sortOrderField } from '../lib/seo'
import { apiWarningField } from '../lib/api-warning'

export const RecoveryStays: CollectionConfig = {
  slug: 'recovery-stays',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'location', 'priceFromAudPerNight', 'sortOrder'],
    group: 'Pages',
    description: 'Villa partner accommodations for post-op recovery. Renders as the villa-card grid on /recovery-stays. Each card shows hero image, location, price-from, descriptor, amenities.',
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
    { name: 'name', type: 'text', required: true },
    { name: 'location', type: 'text', admin: { description: 'e.g. "Seminyak", "Ubud"' } },
    { name: 'heroImage', type: 'upload', relationTo: 'media' },
    { name: 'gallery', type: 'array', fields: [{ name: 'image', type: 'upload', relationTo: 'media', required: true }] },
    { name: 'descriptor', type: 'richText' },
    { name: 'amenities', type: 'array', fields: [{ name: 'value', type: 'text', required: true }] },
    { name: 'priceFromAudPerNight', type: 'number' },
    { name: 'priceFromIdrPerNight', type: 'number' },
    { name: 'partnerUrl', type: 'text' },
    {
      name: 'geo',
      type: 'group',
      fields: [
        { name: 'lat', type: 'number' },
        { name: 'lng', type: 'number' },
      ],
    },
    seoGroup,
    sortOrderField,
  ],
}
