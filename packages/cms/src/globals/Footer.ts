import type { GlobalConfig } from 'payload'
import { isAuthenticated, readPublic } from '../lib/access'

export const Footer: GlobalConfig = {
  slug: 'footer',
  admin: { group: 'Site Settings', description: 'Site footer — logo, link columns, enquiry summary, address, copyright.' },
  access: { read: readPublic, update: isAuthenticated },
  fields: [
    { name: 'logoLight', type: 'upload', relationTo: 'media', admin: { description: 'White-on-dark variant' } },
    {
      name: 'linkColumns',
      type: 'array',
      fields: [
        { name: 'heading', type: 'text', required: true },
        { name: 'items', type: 'array', required: true, fields: [
          { name: 'label', type: 'text', required: true },
          { name: 'href', type: 'text', required: true },
        ] },
      ],
    },
    { name: 'enquirySummary', type: 'richText' },
    { name: 'addressBlock', type: 'richText' },
    { name: 'copyrightTemplate', type: 'text',
      defaultValue: '© {year} BIMC CosMedic. All rights reserved.',
      admin: { description: '{year} is auto-replaced at render.' } },
  ],
}
