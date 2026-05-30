import type { CollectionConfig } from 'payload'
import { isAuthenticated, readPublic } from '../lib/access'
import { revalidationHooks } from '../lib/revalidate'
import { seoGroup, sortOrderField } from '../lib/seo'
import { makeCollectionTranslateHook, T, R, A, SEO_SPECS } from '../hooks/autoTranslate'

export const Disciplines: CollectionConfig = {
  slug: 'disciplines',
  labels: { singular: 'Sub Treatment', plural: 'Sub Treatments' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'sortOrder'],
    group: 'Procedures',
    description: 'The 6 top-level treatment disciplines (Surgical / Reconstructive / Non-surgical / Hair / Dental / Concierge). Each renders at /treatments/{slug} AND drives the top level of the Treatments mega-menu, the homepage Treatments grid, and the /treatments index cards.',
  },
  access: {
    read: readPublic,
    create: isAuthenticated,
    update: isAuthenticated,
    delete: isAuthenticated,
  },
  hooks: {
    ...revalidationHooks(),
    afterChange: [makeCollectionTranslateHook([
      T('title'), T('subtitle'), R('body'), T('chapterTitle.a'), T('chapterTitle.b'),
      T('tagline'), T('lede'), R('overview'),
      A('faqs', [T('q'), T('a')]),
      ...SEO_SPECS,
    ])],
  },
  fields: [
    { name: 'slug', type: 'text', required: true, unique: true, index: true,
      admin: { description: 'URL fragment for the discipline page. "surgical" → https://cosmedic.gaiada.online/treatments/surgical. Lowercase, hyphens only.', hidden: true } },
    { name: 'title', type: 'text', required: true, localized: true,
      admin: { description: 'Display name of the discipline. Shown on the mega-menu, /treatments grid, and as the discipline page heading. e.g. "Surgical".' } },
    { name: 'subtitle', type: 'text', localized: true,
      admin: { description: 'One-line subtitle shown under the title on /treatments cards. e.g. "Rhinoplasty · Breast · Body".' } },
    { name: 'displayCount', type: 'text',
      admin: { description: 'Free-text count shown on the discipline card on /treatments. e.g. "9 procedures". Not auto-computed.', hidden: true } },
    { name: 'hue', type: 'number', min: 0, max: 5, defaultValue: 0,
      admin: { description: 'Brand-palette colour token (0-5) used as the placeholder gradient when the hero image fails to load.', hidden: true } },
    { name: 'body', type: 'richText', localized: true,
      admin: { description: 'Card-paragraph copy used on the /treatments index card AND the homepage Treatments section.' } },
    {
      name: 'chapterTitle',
      type: 'group',
      admin: { description: 'Two-line hero headline on /treatments/{slug}. Split between roman first line and italic accent second line.', hidden: true },
      fields: [
        { name: 'a', type: 'text', localized: true,
          admin: { description: 'First line (roman type).' } },
        { name: 'b', type: 'text', localized: true,
          admin: { description: 'Second line (italic accent).' } },
      ],
    },
    { name: 'tagline', type: 'text', localized: true,
      admin: { description: 'Small mono-font eyebrow shown above the hero title on /treatments/{slug}.' } },
    { name: 'lede', label: 'Intro paragraph', type: 'textarea', localized: true,
      admin: { description: 'Lede paragraph rendered under the hero title on /treatments/{slug}.' } },
    { name: 'overview', type: 'richText', localized: true,
      admin: { description: 'Long-form overview rich-text block rendered as the body content of /treatments/{slug}.' } },
    { name: 'heroImage', type: 'upload', relationTo: 'media',
      admin: { description: 'Hero background image on /treatments/{slug}. Also feeds the discipline thumbnail on the homepage Treatments grid + /treatments index.' } },
    { name: 'leadSurgeons', type: 'relationship', relationTo: 'surgeons', hasMany: true,
      admin: { description: 'Surgeons who lead this discipline. Rendered as "Lead surgeons" mini-cards in the discipline page sidebar.', hidden: true } },
    {
      name: 'faqs',
      type: 'array',
      admin: { description: 'Frequently-asked-questions section at the bottom of /treatments/{slug}.', hidden: true },
      fields: [
        { name: 'q', type: 'text', required: true, localized: true,
          admin: { description: 'The question shown as the accordion header.' } },
        { name: 'a', type: 'textarea', required: true, localized: true,
          admin: { description: 'The answer revealed when the accordion expands.' } },
      ],
    },
    seoGroup,
    sortOrderField,
  ],
}
