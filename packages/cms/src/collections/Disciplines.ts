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
    group: 'Treatments',
    description: 'The 6 top-level treatment disciplines (Surgical / Reconstructive / Non-surgical / Hair / Dental / Concierge). Each renders at /treatments/{slug} AND drives the top level of the Treatments mega-menu, the homepage Treatments grid, and the /treatments index cards.',
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
      admin: { description: 'URL fragment for the discipline page. "surgical" → https://cosmedic.gaiada.online/treatments/surgical. Lowercase, hyphens only.' } },
    { name: 'title', type: 'text', required: true,
      admin: { description: 'Display name of the discipline. Shown on the mega-menu, /treatments grid, and as the discipline page heading. e.g. "Surgical".' } },
    { name: 'subtitle', type: 'text',
      admin: { description: 'One-line subtitle shown under the title on /treatments cards. e.g. "Rhinoplasty · Breast · Body".' } },
    { name: 'displayCount', type: 'text',
      admin: { description: 'Free-text count shown on the discipline card on /treatments. e.g. "9 procedures". Not auto-computed.' } },
    { name: 'hue', type: 'number', min: 0, max: 5, defaultValue: 0,
      admin: { description: 'Brand-palette colour token (0-5) used as the placeholder gradient when the hero image fails to load.' } },
    { name: 'body', type: 'richText',
      admin: { description: 'Card-paragraph copy used on the /treatments index card AND the homepage Treatments section.' } },
    {
      name: 'chapterTitle',
      type: 'group',
      admin: { description: 'Two-line hero headline on /treatments/{slug}. Split between roman first line and italic accent second line.' },
      fields: [
        { name: 'a', type: 'text',
          admin: { description: 'First line (roman type).' } },
        { name: 'b', type: 'text',
          admin: { description: 'Second line (italic accent).' } },
      ],
    },
    { name: 'tagline', type: 'text',
      admin: { description: 'Small mono-font eyebrow shown above the hero title on /treatments/{slug}.' } },
    { name: 'lede', type: 'textarea',
      admin: { description: 'Lede paragraph rendered under the hero title on /treatments/{slug}.' } },
    { name: 'overview', type: 'richText',
      admin: { description: 'Long-form overview rich-text block rendered as the body content of /treatments/{slug}.' } },
    { name: 'heroImage', type: 'upload', relationTo: 'media',
      admin: { description: 'Hero background image on /treatments/{slug}. Also feeds the discipline thumbnail on the homepage Treatments grid + /treatments index.' } },
    { name: 'leadSurgeons', type: 'relationship', relationTo: 'surgeons', hasMany: true,
      admin: { description: 'Surgeons who lead this discipline. Rendered as "Lead surgeons" mini-cards in the discipline page sidebar.' } },
    {
      name: 'faqs',
      type: 'array',
      admin: { description: 'Frequently-asked-questions section at the bottom of /treatments/{slug}.' },
      fields: [
        { name: 'q', type: 'text', required: true,
          admin: { description: 'The question shown as the accordion header.' } },
        { name: 'a', type: 'textarea', required: true,
          admin: { description: 'The answer revealed when the accordion expands.' } },
      ],
    },
    seoGroup,
    sortOrderField,
  ],
}
