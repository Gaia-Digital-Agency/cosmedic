import type { CollectionConfig } from 'payload'
import { isAuthenticated, readPublic } from '../lib/access'
import { revalidationHooks } from '../lib/revalidate'
import { seoGroup, sortOrderField } from '../lib/seo'
import { apiWarningField } from '../lib/api-warning'

export const SubCategories: CollectionConfig = {
  slug: 'sub-categories',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'parent', 'slug', 'sortOrder'],
    group: 'Catalogue',
    description: '22 sub-categories. Each renders at /treatment-{slug}. Drives Treatments mega-menu second level.',
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
      admin: { description: 'e.g. "surgical-breast" → /treatment-surgical-breast' } },
    { name: 'parent', type: 'relationship', relationTo: 'disciplines', required: true,
      admin: { description: 'Parent discipline' } },
    { name: 'title', type: 'text', required: true },
    {
      name: 'chapterTitle',
      type: 'group',
      fields: [
        { name: 'a', type: 'text' },
        { name: 'b', type: 'text' },
      ],
    },
    { name: 'tagline', type: 'text' },
    { name: 'lede', type: 'textarea' },
    { name: 'intro', type: 'richText' },
    { name: 'overview', type: 'richText' },
    { name: 'leadSurgeon', type: 'relationship', relationTo: 'surgeons' },
    {
      name: 'sections',
      type: 'array',
      admin: { description: 'Page body sections (rendered as the sticky-TOC list)' },
      fields: [
        { name: 'anchorId', type: 'text', required: true, admin: { description: 'Anchor id, e.g. "overview"' } },
        { name: 't', type: 'text', required: true, admin: { description: 'Section title' } },
        { name: 'body', type: 'richText', required: true },
      ],
    },
    {
      name: 'faqs',
      type: 'array',
      fields: [
        { name: 'q', type: 'text', required: true },
        { name: 'a', type: 'textarea', required: true },
      ],
    },
    { name: 'heroImage', type: 'upload', relationTo: 'media' },
    seoGroup,
    sortOrderField,
  ],
}
