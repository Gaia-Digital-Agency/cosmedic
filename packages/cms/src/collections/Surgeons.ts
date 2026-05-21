import type { CollectionConfig } from 'payload'
import { isAuthenticated, readPublic } from '../lib/access'
import { revalidationHooks } from '../lib/revalidate'
import { seoGroup, sortOrderField } from '../lib/seo'
import { apiWarningField } from '../lib/api-warning'

export const Surgeons: CollectionConfig = {
  slug: 'surgeons',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'group', 'lead', 'sortOrder'],
    group: 'Catalogue',
    description: '8 surgeons. Each renders at /surgeon-{slug}. Group drives the Surgeons mega-menu.',
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
      admin: { description: 'URL slug, e.g. "suka" → /surgeon-suka' } },
    { name: 'name', type: 'text', required: true, admin: { description: 'Full formal name, e.g. "dr. I Made Suka Adnyana, SpBP-RE (K)"' } },
    { name: 'commonName', type: 'text', admin: { description: 'Short/familiar name, e.g. "Suka"' } },
    { name: 'title', type: 'text', defaultValue: 'dr.' },
    { name: 'suffix', type: 'text', admin: { description: 'e.g. "SpBP-RE (K)"' } },
    { name: 'spec', type: 'text', admin: { description: 'Specialty headline (1 line)' } },
    { name: 'train', type: 'text', admin: { description: 'Training narrative, e.g. "Indonesia · Japan"' } },
    { name: 'proc', type: 'text', admin: { description: 'Memberships, e.g. "ISAPS Member"' } },
    { name: 'credLine', type: 'text', admin: { description: 'Compact credentials line for cards' } },
    { name: 'yearsInPractice', type: 'number' },
    { name: 'hue', type: 'number', min: 0, max: 5, defaultValue: 0,
      admin: { description: 'Brand colour token index 0-5' } },
    { name: 'group', type: 'select', required: true, defaultValue: 'plastic-surgery',
      options: [
        { label: 'Plastic Surgery', value: 'plastic-surgery' },
        { label: 'Aesthetic Medicine', value: 'aesthetic-medicine' },
      ] },
    { name: 'lead', type: 'checkbox', defaultValue: false,
      admin: { description: 'Featured lead surgeon flag (homepage + indices)' } },
    { name: 'bio', type: 'richText', admin: { description: 'Long-form biography on /surgeon-{slug}' } },
    { name: 'specAreas', type: 'array', fields: [{ name: 'value', type: 'text', required: true }],
      admin: { description: 'Chip-style specialty tags' } },
    { name: 'portrait', type: 'upload', relationTo: 'media',
      admin: { description: 'Portrait — alt text required on the media record' } },
    { name: 'portraitPosition', type: 'text', defaultValue: 'center 30%',
      admin: { description: 'CSS object-position value' } },
    {
      name: 'availabilitySchedule',
      type: 'array',
      admin: { description: 'Per-day availability windows (from clinic pricelist Further Info)' },
      fields: [
        { name: 'day', type: 'select', required: true, options: ['mon','tue','wed','thu','fri','sat','sun'].map(d => ({ label: d.toUpperCase(), value: d })) },
        { name: 'windowStart', type: 'text', admin: { description: 'e.g. "09:00"' } },
        { name: 'windowEnd', type: 'text', admin: { description: 'e.g. "17:00"' } },
        { name: 'byAppointment', type: 'checkbox', defaultValue: true },
      ],
    },
    { name: 'languages', type: 'array', fields: [{ name: 'code', type: 'select', options: ['en','id','ja','fr','de'].map(c => ({ label: c, value: c })) }] },
    { name: 'credentialedProcedures', type: 'relationship', relationTo: 'procedures', hasMany: true,
      admin: { description: 'Procedures this surgeon performs (drives surgeon→procedure cross-links)' } },
    seoGroup,
    sortOrderField,
  ],
}
