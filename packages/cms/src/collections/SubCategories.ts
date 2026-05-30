import type { CollectionConfig } from 'payload'
import { isAuthenticated, readPublic } from '../lib/access'
import { revalidationHooks } from '../lib/revalidate'
import { seoGroup, sortOrderField } from '../lib/seo'

export const SubCategories: CollectionConfig = {
  slug: 'sub-categories',
  labels: { singular: 'Sub-Category', plural: 'Sub-Categories' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'parent', 'slug', 'sortOrder'],
    group: 'Treatments',
    description: 'The 22 sub-categories nested under disciplines (e.g. Face / Body / Breast under Surgical). Each renders at /treatments/{slug} AND fills the second level of the Treatments mega-menu under its parent discipline.',
  },
  access: {
    read: readPublic,
    create: isAuthenticated,
    update: isAuthenticated,
    delete: isAuthenticated,
  },
  hooks: revalidationHooks(),
  fields: [
    { name: 'slug', type: 'text', required: true, index: true,
      admin: { description: 'URL fragment scoped to the parent discipline. Two sub-categories may share a slug (e.g. "breast" under Surgical and Reconstructive) — uniqueness is enforced per (parent, slug). Renders at /treatments/{discipline-slug}/{slug}.', hidden: true } },
    { name: 'parent', type: 'relationship', relationTo: 'disciplines', required: true,
      admin: { description: 'Parent discipline (Surgical / Reconstructive / etc.). Determines where in the mega-menu this sub-category appears.', hidden: true } },
    { name: 'title', type: 'text', required: true, localized: true,
      admin: { description: 'Display name shown on the mega-menu link and as the sub-category page heading. e.g. "Breast Surgery".' } },
    {
      name: 'chapterTitle',
      type: 'group',
      admin: { description: 'Two-line hero headline on /treatments/{slug}. Split between roman first line and italic accent second line.', hidden: true },
      fields: [
        { name: 'a', type: 'text', localized: true, admin: { description: 'First line (roman type).' } },
        { name: 'b', type: 'text', localized: true, admin: { description: 'Second line (italic accent).' } },
      ],
    },
    { name: 'tagline', type: 'text', localized: true,
      admin: { description: 'Small mono-font eyebrow shown above the hero title on this sub-category page.' } },
    { name: 'lede', label: 'Intro paragraph', type: 'textarea', localized: true,
      admin: { description: 'Lede paragraph rendered under the hero title on this sub-category page.' } },
    { name: 'intro', type: 'richText', localized: true,
      admin: { description: 'Rich-text intro paragraph rendered above the body sections.', hidden: true } },
    { name: 'overview', type: 'richText', localized: true,
      admin: { description: 'Long-form overview rich-text block rendered as the body content of /treatments/{slug}.', hidden: true } },
    { name: 'leadSurgeon', type: 'relationship', relationTo: 'surgeons',
      admin: { description: 'The single lead surgeon for this sub-category. Rendered as the "Lead surgeon" mini-card in the sub-category page sidebar.' } },
    {
      name: 'sections',
      type: 'array',
      admin: { description: 'Body sections rendered in order on /treatments/{slug}. Each section gets a heading + anchor link in the sticky-TOC sidebar.', hidden: true },
      fields: [
        { name: 'anchorId', type: 'text', required: true,
          admin: { description: 'URL-safe anchor id used in the TOC link and href, e.g. "overview" → /treatments/X#overview.' } },
        { name: 't', type: 'text', required: true, localized: true,
          admin: { description: 'Section heading rendered as <h2>.' } },
        { name: 'body', type: 'richText', required: true, localized: true,
          admin: { description: 'Section body — rich text (paragraphs, lists, emphasis).' } },
      ],
    },
    {
      name: 'faqs',
      type: 'array',
      admin: { description: 'Frequently-asked-questions accordion at the bottom of /treatments/{slug}.', hidden: true },
      fields: [
        { name: 'q', type: 'text', required: true, localized: true,
          admin: { description: 'Question shown as the accordion header.' } },
        { name: 'a', type: 'textarea', required: true, localized: true,
          admin: { description: 'Answer revealed when the accordion expands.' } },
      ],
    },
    { name: 'heroImage', type: 'upload', relationTo: 'media',
      admin: { description: 'Hero background image on /treatments/{slug}. Inherits parent discipline\'s hero when empty.' } },
    seoGroup,
    sortOrderField,
  ],
}
