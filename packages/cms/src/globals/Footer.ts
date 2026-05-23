import type { GlobalConfig } from 'payload'
import { isAuthenticated, readPublic } from '../lib/access'
import { revalidateGlobalAfterChange } from '../lib/revalidate'
import { apiWarningField } from '../lib/api-warning'

export const Footer: GlobalConfig = {
  slug: 'footer',
  admin: {
    group: 'Homepage',
    description: 'Footer at the bottom of every page: white-on-dark logo, three link columns (Treatments / About / Connect), enquiry summary, address, copyright line.',
  },
  access: { read: readPublic, update: isAuthenticated },
  hooks: revalidateGlobalAfterChange(),
  fields: [
    apiWarningField,
    { name: 'logoLight', type: 'upload', relationTo: 'media',
      admin: { description: 'Logo in the footer brand column on every page. White-on-dark variant — typically the inverse of the header logo.' } },
    {
      name: 'linkColumns',
      type: 'array',
      admin: { description: 'The three columns of links to the right of the footer brand (default: Treatments / About / Connect). Each column = one heading + a list of links.' },
      fields: [
        { name: 'heading', type: 'text', required: true,
          admin: { description: 'Column heading shown above the links.' } },
        { name: 'items', type: 'array', required: true,
          admin: { description: 'Links listed under the column heading.' },
          fields: [
            { name: 'label', type: 'text', required: true },
            { name: 'href', type: 'text', required: true },
          ] },
      ],
    },
    { name: 'enquirySummary', type: 'richText',
      admin: { description: 'Short rich-text block above the footer newsletter signup. Currently optional/unused — reserved for future "Want a personal estimate?" copy.' } },
    { name: 'addressBlock', type: 'richText',
      admin: { description: 'Rich-text variant of the footer address block. Currently uses Settings.addressLine1/2/city/postalCode/country directly; this field is a free-form override.' } },
    { name: 'copyrightTemplate', type: 'text',
      defaultValue: '© {year} BIMC CosMedic. All rights reserved.',
      admin: { description: 'Bottom-left of every footer. `{year}` auto-replaces to the current year at render time.' } },
  ],
}
