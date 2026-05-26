import type { CollectionConfig } from 'payload'
import { isAuthenticated, readPublic } from '../lib/access'
import { revalidationHooks } from '../lib/revalidate'
import { sortOrderField } from '../lib/seo'
import { apiWarningField } from '../lib/api-warning'

export const PrivacySections: CollectionConfig = {
  slug: 'privacy-sections',
  labels: {
    singular: 'Privacy Section',
    plural: 'Privacy Sections',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'sortOrder'],
    group: 'About',
    description:
      'The numbered legal sections on /privacy. One row per section (Summary, Who we are, What we collect, …). `slug` is the URL anchor (e.g. "summary" → /privacy#summary). Lower sortOrder renders first.',
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
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        description:
          'Used as the URL anchor (#slug). Keep lowercase, hyphen-separated, no spaces. Editors should not change once a section is live (existing inbound links would break).',
      },
    },
    { name: 'title', type: 'text', required: true },
    {
      name: 'paragraphs',
      type: 'array',
      admin: {
        description:
          'Body paragraphs. Renders one <p> per row. Leave empty if this section uses a bulleted list instead.',
      },
      fields: [{ name: 'text', type: 'textarea', required: true }],
    },
    {
      name: 'listItems',
      type: 'array',
      admin: {
        description:
          'Bulleted list items. Renders one <li> per row. Use when the section reads as a list rather than prose.',
      },
      fields: [{ name: 'text', type: 'text', required: true }],
    },
    sortOrderField,
  ],
}
