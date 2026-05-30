import type { GlobalConfig } from 'payload'
import { isAuthenticated, readPublic } from '../lib/access'
import { revalidateGlobalAfterChange } from '../lib/revalidate'

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: 'Footer',
  admin: {
    group: 'Homepage',
    description: 'Footer at the bottom of every page: white-on-dark logo, three link columns (Treatments / About / Connect), enquiry summary, address, copyright line.',
  },
  access: { read: readPublic, update: isAuthenticated },
  hooks: revalidateGlobalAfterChange(),
  fields: [
    { name: 'brandTagline', type: 'text', localized: true,
      defaultValue: 'Managed by BIMC Hospital',
      admin: { description: 'Mono-small-caps line under the footer logo. Editorial reinforcement of the "Managed by BIMC Hospital" endorsement; matches the header logo alt text.' } },
    { name: 'treatmentsHeading', type: 'text', localized: true,
      defaultValue: 'Treatments',
      admin: { description: 'Heading above the auto-derived Treatments column (the list itself comes from Disciplines collection — q8). Editable here if the clinic wants a different label.', hidden: true } },
    {
      name: 'linkColumns',
      type: 'array',
      admin: { description: 'The two columns to the right of Treatments (default: About / Connect). Each column = one heading + a list of links. The Treatments column is always rendered separately from Disciplines and is excluded from this array.', hidden: true },
      fields: [
        { name: 'heading', type: 'text', required: true, localized: true,
          admin: { description: 'Column heading shown above the links.' } },
        { name: 'items', type: 'array', required: true,
          admin: { description: 'Links listed under the column heading.' },
          fields: [
            { name: 'label', type: 'text', required: true, localized: true },
            { name: 'href', type: 'text', required: true },
            { name: 'social', type: 'select',
              admin: { description: 'Optional. If set, the href is auto-derived from Settings.socialLinks[platform=...] at render time, overriding the manual href above. Use for Instagram / Facebook / etc. so the URL stays in one place (Settings).' },
              options: [
                { label: '—', value: 'none' },
                { label: 'Instagram', value: 'instagram' },
                { label: 'Facebook', value: 'facebook' },
                { label: 'WhatsApp', value: 'whatsapp' },
                { label: 'TikTok', value: 'tiktok' },
                { label: 'YouTube', value: 'youtube' },
                { label: 'LinkedIn', value: 'linkedin' },
                { label: 'X / Twitter', value: 'x' },
              ] },
          ] },
      ],
    },
    {
      name: 'newsletter',
      type: 'group',
      admin: { description: 'Newsletter signup widget in the footer brand column.' },
      fields: [
        { name: 'label', type: 'text', localized: true, defaultValue: 'Receive our quarterly journal',
          admin: { description: 'Line above the input field. Mono-small caps style.' } },
        { name: 'placeholder', type: 'text', localized: true, defaultValue: 'Your email address',
          admin: { description: 'Input placeholder text.' } },
        { name: 'buttonLabel', type: 'text', defaultValue: '→',
          admin: { description: 'Submit button label. Single arrow character by default.' } },
      ],
    },
    {
      name: 'footerBottomLines',
      type: 'array',
      admin: { description: 'Bottom row of the footer (below the divider). Order = display order, left to right. The first entry is the copyright line and uses `{year}` substitution; the rest are static text.', hidden: true },
      fields: [
        { name: 'text', type: 'text', required: true },
      ],
    },
    { name: 'enquirySummary', type: 'richText',
      admin: { description: 'Short rich-text block above the footer newsletter signup. Currently optional/unused — reserved for future "Want a personal estimate?" copy.', hidden: true } },
    { name: 'addressBlock', type: 'richText',
      admin: { description: 'Rich-text variant of the footer address block. Currently uses Settings.addressLine1/2/city/postalCode/country directly; this field is a free-form override.', hidden: true } },
    { name: 'copyrightTemplate', type: 'text',
      defaultValue: '© {year} BIMC CosMedic Centre',
      admin: { description: 'DEPRECATED — kept for backwards-compat. Use footerBottomLines[0] instead (the first bottom line is now the copyright with `{year}` substitution). This field still works as a fallback if footerBottomLines is empty.', hidden: true } },
    { name: 'logoLight', type: 'upload', relationTo: 'media',
      admin: { description: 'Logo in the footer brand column on every page. White-on-dark variant — typically the inverse of the header logo.' } },
  ],
}
