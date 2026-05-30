import type { CollectionConfig } from 'payload'
import { isAuthenticated, readPublic } from '../lib/access'
import { revalidationHooks } from '../lib/revalidate'
import { sortOrderField } from '../lib/seo'

export const JourneySteps: CollectionConfig = {
  slug: 'journey-steps',
  labels: { singular: 'Step', plural: 'Steps' },
  admin: {
    hidden: true,
    useAsTitle: 'title',
    defaultColumns: ['number', 'title', 'order', 'sortOrder'],
    group: 'Journey',
    description:
      'The numbered patient-journey steps shown on /journey. Each row is one card (number, title, body paragraph, four bullets, image). Order via the `order` field (or sortOrder).',
  },
  access: {
    read: readPublic,
    create: isAuthenticated,
    update: isAuthenticated,
    delete: isAuthenticated,
  },
  hooks: revalidationHooks(),
  fields: [
    { name: 'slug', type: 'text', required: true, unique: true, index: true,
      admin: { hidden: true } },
    {
      name: 'order',
      type: 'number',
      required: true,
      defaultValue: 0,
      admin: { description: 'Numeric sort key — lower = earlier on the page. Use 1,2,3,…' },
    },
    {
      name: 'number',
      type: 'text',
      admin: {
        description:
          'Display number shown above the title, e.g. "01", "02". Two-digit format; leave blank to use the order field zero-padded.',
      },
    },
    { name: 'title', type: 'text', required: true, localized: true, admin: { description: 'Single-word section title, e.g. "Enquiry", "Consult".' } },
    {
      name: 'body',
      type: 'richText',
      localized: true,
      admin: { description: 'Body paragraph(s) under the title. Plain prose; one or two short paragraphs.' },
    },
    {
      name: 'bullets',
      type: 'array',
      admin: {
        description:
          'Four short bullet rows shown under the body. Letter is auto-uppercased in display (A./B./C./D.); text is one short phrase.',
      },
      fields: [
        { name: 'letter', type: 'text', required: true, admin: { description: 'Single letter, e.g. "A".' } },
        { name: 'text', type: 'text', required: true, localized: true, admin: { description: 'Short bullet sentence.' } },
      ],
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Hero image shown beside the step. Falls back to a tinted painted-SVG card if blank.' },
    },
    {
      name: 'imageHue',
      type: 'number',
      defaultValue: 0,
      admin: { description: 'Fallback hue index (0-5) used when no image uploaded.', hidden: true },
    },
    {
      name: 'dayLabel',
      type: 'text',
      admin: {
        description:
          'OPTIONAL — used by the older "Recovery timeline" block on procedure-detail (Day 1, Day 7…). Leave blank for /journey patient-journey rows.',
      },
    },
    {
      name: 'icon',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'OPTIONAL — small icon used by the older procedure-detail timeline block. Not rendered on /journey.',
        hidden: true,
      },
    },
    {
      name: 'category',
      type: 'select',
      defaultValue: 'consult',
      admin: { description: 'Used by the older procedure-detail timeline block for filtering. Not used by /journey.', hidden: true },
      options: [
        { label: 'Consultation', value: 'consult' },
        { label: 'Medical', value: 'medical' },
        { label: 'Surgical', value: 'surgical' },
        { label: 'Recovery', value: 'recovery' },
        { label: 'Follow-up', value: 'follow-up' },
      ],
    },
    sortOrderField,
  ],
}
