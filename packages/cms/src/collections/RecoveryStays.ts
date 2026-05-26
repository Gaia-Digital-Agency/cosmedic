import type { CollectionConfig } from 'payload'
import { isAuthenticated, readPublic } from '../lib/access'
import { revalidationHooks } from '../lib/revalidate'
import { seoGroup, sortOrderField } from '../lib/seo'
import { apiWarningField } from '../lib/api-warning'

export const RecoveryStays: CollectionConfig = {
  slug: 'recovery-stays',
  labels: { singular: 'f. Villa', plural: 'f. Villas' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'location', 'bedrooms', 'priceFromIdrPerNight', 'sortOrder'],
    group: 'Journey',
    description:
      'The villa-card grid on /recovery-stays. Each row is one card (hero image, location, bedrooms, pool type, price-from per night, body paragraph).',
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
    { name: 'name', type: 'text', required: true, admin: { description: 'Villa or suite name, e.g. "Villa Sembilan".' } },
    { name: 'location', type: 'text', admin: { description: 'Suburb / area, e.g. "Nusa Dua", "Ubud", "Sanur", "Jimbaran".' } },
    {
      name: 'bedrooms',
      type: 'text',
      admin: { description: 'e.g. "2 BR", "3 BR", "1 BR". Shown in the meta-row under the title.' },
    },
    {
      name: 'poolType',
      type: 'text',
      defaultValue: 'Private',
      admin: { description: 'e.g. "Private", "Resort". Renders as "{poolType} pool" in the meta-row.' },
    },
    { name: 'heroImage', type: 'upload', relationTo: 'media', admin: { description: 'Large card image. Falls back to a tinted painted-SVG card if blank.' } },
    {
      name: 'imageHue',
      type: 'number',
      defaultValue: 0,
      admin: { description: 'Fallback hue index (0-5) used when no image uploaded.' },
    },
    {
      name: 'body',
      type: 'textarea',
      admin: { description: 'Short paragraph (~2 sentences) shown under the meta-row.' },
    },
    {
      name: 'driveTime',
      type: 'text',
      admin: {
        description:
          'Drive time to BIMC Nusa Dua, e.g. "5 min". Leave blank to compute from location (Nusa Dua=5min, Jimbaran=15min, Sanur=25min, anywhere else=45min).',
      },
    },
    {
      name: 'nursingNote',
      type: 'text',
      defaultValue: 'Available daily',
      admin: { description: 'Right-most meta cell, e.g. "Available daily".' },
    },
    { name: 'gallery', type: 'array', fields: [{ name: 'image', type: 'upload', relationTo: 'media', required: true }] },
    {
      name: 'descriptor',
      type: 'richText',
      admin: { description: 'LEGACY — long-form descriptor (currently unused on /recovery-stays).' },
    },
    { name: 'amenities', type: 'array', fields: [{ name: 'value', type: 'text', required: true }] },
    {
      name: 'priceFromAudPerNight',
      type: 'number',
      admin: { description: 'Optional AUD price-from (auto-computed from IDR via Settings if blank).' },
    },
    {
      name: 'priceFromIdrPerNight',
      type: 'number',
      admin: { description: 'IDR price-from per night, e.g. 2940000 displays as "From IDR 2,940,000 / night".' },
    },
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
