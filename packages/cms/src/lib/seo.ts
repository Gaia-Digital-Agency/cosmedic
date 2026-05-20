import type { Field } from 'payload'

export const seoGroup: Field = {
  name: 'seo',
  type: 'group',
  admin: { description: 'Per-record SEO override (falls back to SeoDefaults global).' },
  fields: [
    { name: 'title', type: 'text' },
    { name: 'description', type: 'textarea' },
    { name: 'ogImage', type: 'upload', relationTo: 'media' },
    { name: 'canonical', type: 'text' },
    { name: 'noindex', type: 'checkbox', defaultValue: false },
  ],
}

export const publishStatusField: Field = {
  name: 'publishStatus',
  type: 'select',
  defaultValue: 'published',
  required: true,
  options: [
    { label: 'Draft', value: 'draft' },
    { label: 'Published', value: 'published' },
    { label: 'Scheduled', value: 'scheduled' },
  ],
  admin: { position: 'sidebar' },
}

export const sortOrderField: Field = {
  name: 'sortOrder',
  type: 'number',
  defaultValue: 0,
  admin: { position: 'sidebar', description: 'Lower = earlier in listings.' },
}
