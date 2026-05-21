import type { CollectionConfig } from 'payload'
import { isAuthenticated, readPublic } from '../lib/access'
import { revalidationHooks } from '../lib/revalidate'
import { seoGroup, sortOrderField } from '../lib/seo'
import { apiWarningField } from '../lib/api-warning'

export const Procedures: CollectionConfig = {
  slug: 'procedures',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'parentSubCategory', 'featuredRank', 'sortOrder'],
    group: 'Catalogue',
    description: 'The 41+ editorial procedures. Each is a deep-content record (descriptions, sections, FAQs, pricing). The procedure accordion on sub-category pages reads from here.',
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
      admin: { description: 'e.g. "breast-augmentation"' } },
    { name: 'name', type: 'text', required: true },
    { name: 'shortName', type: 'text', admin: { description: 'For cards / nav (optional)' } },
    { name: 'parentDiscipline', type: 'relationship', relationTo: 'disciplines', required: true },
    { name: 'parentSubCategory', type: 'relationship', relationTo: 'sub-categories' },
    { name: 'description', type: 'richText', admin: { description: 'Top-of-page description' } },
    {
      name: 'sections',
      type: 'array',
      fields: [
        { name: 'anchorId', type: 'text', required: true },
        { name: 't', type: 'text', required: true },
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
    { name: 'surgeonsCredentialed', type: 'relationship', relationTo: 'surgeons', hasMany: true },
    { name: 'heroImage', type: 'upload', relationTo: 'media' },
    {
      name: 'pricing',
      type: 'group',
      admin: { description: 'All prices from docs/pricelist.xlsx Surgical sheet. Editable per record.' },
      fields: [
        { name: 'priceIdr2025', type: 'number' },
        { name: 'priceAud2025', type: 'number' },
        { name: 'priceIdr2026', type: 'number' },
        { name: 'priceAud2026', type: 'number' },
        { name: 'priceIdrRangeLow', type: 'number', admin: { description: 'For range values' } },
        { name: 'priceIdrRangeHigh', type: 'number' },
        { name: 'priceNotes', type: 'text', admin: { description: 'e.g. "Local Anesthesia", "General Anesthesia"' } },
        { name: 'displayYear', type: 'select', defaultValue: '2026',
          options: [{ label: '2025', value: '2025' }, { label: '2026', value: '2026' }],
          admin: { description: 'Which year to display by default on procedure cards' } },
      ],
    },
    { name: 'featuredRank', type: 'number', admin: { description: 'Top-3 indicator from pricelist column 1 (1, 2, or 3 — blank for non-featured)' } },
    { name: 'includesImplant', type: 'checkbox', defaultValue: false,
      admin: { description: 'Flagged from "*" marker in pricelist' } },
    {
      name: 'detail',
      type: 'group',
      admin: { description: 'Sub-category accordion detail fields' },
      fields: [
        { name: 'duration', type: 'text', admin: { description: 'e.g. "3.5 hours"' } },
        { name: 'recovery', type: 'text', admin: { description: 'e.g. "10–14 days for stitches; 6 weeks for swelling"' } },
        { name: 'included', type: 'array', fields: [{ name: 'value', type: 'text', required: true }] },
      ],
    },
    { name: 'included', type: 'relationship', relationTo: 'inclusion-items', hasMany: true,
      admin: { description: 'Universal what-surgery-includes (from xlsx Further Info Include list)' } },
    { name: 'excluded', type: 'relationship', relationTo: 'exclusion-items', hasMany: true,
      admin: { description: 'Universal what-is-excluded' } },
    { name: 'recoveryTimeline', type: 'relationship', relationTo: 'journey-steps', hasMany: true },
    { name: 'relatedBA', type: 'relationship', relationTo: 'before-after-cases', hasMany: true },
    { name: 'relatedProcedures', type: 'relationship', relationTo: 'procedures', hasMany: true },
    seoGroup,
    sortOrderField,
  ],
}
