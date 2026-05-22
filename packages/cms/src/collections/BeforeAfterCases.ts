import type { CollectionConfig } from 'payload'
import { isAuthenticated, readPublic } from '../lib/access'
import { revalidationHooks } from '../lib/revalidate'
import { seoGroup, sortOrderField } from '../lib/seo'
import { apiWarningField } from '../lib/api-warning'

export const BeforeAfterCases: CollectionConfig = {
  slug: 'before-after-cases',
  admin: {
    useAsTitle: 'caseLabel',
    defaultColumns: ['caseLabel', 'procedure', 'isFeatured', 'sortOrder'],
    group: 'Results',
    description: 'Before/after composite images. Renders on /gallery (full grid), /results (curated set), and the homepage Gallery teaser. Each composite is a single image split visually between before (left) and after (right). Use anonymous-friendly labels only.',
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
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    { name: 'caseLabel', type: 'text', required: true, admin: { description: 'Anonymous label, e.g. "Case 014 — Rhinoplasty"' } },
    { name: 'procedure', type: 'relationship', relationTo: 'procedures' },
    { name: 'composite', type: 'upload', relationTo: 'media',
      admin: { description: 'Single image: left half = before, right half = after' } },
    { name: 'beforeAlt', type: 'text', admin: { description: 'Required for a11y' } },
    { name: 'afterAlt', type: 'text', admin: { description: 'Required for a11y' } },
    { name: 'surgeon', type: 'relationship', relationTo: 'surgeons' },
    { name: 'tags', type: 'array', fields: [{ name: 'value', type: 'text', required: true }] },
    { name: 'description', type: 'richText' },
    { name: 'year', type: 'number' },
    { name: 'isFeatured', type: 'checkbox', defaultValue: false,
      admin: { description: 'Show on homepage gallery teaser' } },
    seoGroup,
    sortOrderField,
  ],
}
