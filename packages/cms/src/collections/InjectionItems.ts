import type { CollectionConfig } from 'payload'
import { isAuthenticated, readPublic } from '../lib/access'
import { revalidationHooks } from '../lib/revalidate'
import { seoGroup } from '../lib/seo'
import { apiWarningField } from '../lib/api-warning'

export const InjectionItems: CollectionConfig = {
  slug: 'injection-items',
  labels: { singular: 'Injection', plural: 'Injection' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'mainCategory', 'brand', 'sortOrder'],
    group: 'Pricing',
    description: 'Injectable treatment price rows rendered in the Injection table on /pricing. Grouped by mainCategory (Filler · Skin Booster). Includes brand/product fields for injectable products.',
  },
  access: {
    read: readPublic,
    create: isAuthenticated,
    update: isAuthenticated,
    delete: isAuthenticated,
  },
  hooks: {
    ...revalidationHooks(),
  },
  fields: [
    apiWarningField,
    { name: 'slug', type: 'text', required: true, unique: true, index: true,
      admin: { description: 'URL fragment / catalogue key for this item.' } },
    { name: 'name', type: 'text', required: true,
      admin: { description: 'Display name shown on the /pricing catalogue row.' } },
    { name: 'shortName', type: 'text',
      admin: { description: 'Optional shorter label.' } },
    { name: 'catalogueGroup', type: 'text', defaultValue: 'injection',
      admin: { hidden: true, description: 'Hardcoded to "injection" — do not change.' } },
    { name: 'mainCategory', type: 'text',
      admin: { description: 'Main category — e.g. "filler", "skin-booster".' } },
    { name: 'subCategory', type: 'text',
      admin: { description: 'Optional 3rd-level grouping label inside Main Category.' } },
    { name: 'unit', type: 'text',
      admin: { description: 'e.g. "1 ml", "per unit", "per thread".' } },
    {
      name: 'audienceTier',
      type: 'select',
      defaultValue: 'standard',
      options: [
        { label: 'Standard', value: 'standard' },
        { label: 'BIMC Tourist', value: 'tourist' },
        { label: 'BIMC Kitas + KTP', value: 'kitas_ktp' },
        { label: 'Package', value: 'package' },
      ],
      admin: { description: 'Pricing tier.' },
    },
    { name: 'brand', type: 'text', admin: { description: 'e.g. "Juvederm", "Restylane", "Teosyal".' } },
    { name: 'productLine', type: 'text', admin: { description: 'e.g. "Volux", "Voluma", "Lyft".' } },
    { name: 'manufacturer', type: 'text', admin: { description: 'e.g. "Allergan", "Galderma".' } },
    { name: 'fdaApproved', type: 'checkbox', defaultValue: false,
      admin: { description: 'FDA-approved badge.' } },
    { name: 'parentDiscipline', type: 'relationship', relationTo: 'disciplines',
      admin: { description: 'Optional — links this item to a treatment discipline.' } },
    { name: 'description', type: 'richText',
      admin: { description: 'Optional rich-text description.' } },
    {
      name: 'sections',
      type: 'array',
      admin: { description: 'Optional body sections.' },
      fields: [
        { name: 'anchorId', type: 'text', required: true },
        { name: 't', type: 'text', required: true },
        { name: 'body', type: 'richText', required: true },
      ],
    },
    {
      name: 'faqs',
      type: 'array',
      admin: { description: 'Optional FAQ items.' },
      fields: [
        { name: 'q', type: 'text', required: true },
        { name: 'a', type: 'textarea', required: true },
      ],
    },
    { name: 'heroImage', type: 'upload', relationTo: 'media',
      admin: { description: 'Optional hero image.' } },
    {
      name: 'pricing',
      type: 'group',
      admin: { description: 'Catalogue pricing — drives the displayed price on /pricing.' },
      fields: [
        { name: 'priceIdr2025', type: 'number', admin: { description: 'Price in IDR (2025).' } },
        { name: 'priceIdr2026', type: 'number', admin: { description: 'Price in IDR (2026).' } },
        { name: 'priceIdrRangeLow', type: 'number', admin: { description: 'For range values.' } },
        { name: 'priceIdrRangeHigh', type: 'number' },
        { name: 'priceNotes', type: 'text', admin: { description: 'e.g. "per 1ml".' } },
        { name: 'displayYear', type: 'select', defaultValue: '2026',
          options: [{ label: '2025', value: '2025' }, { label: '2026', value: '2026' }] },
      ],
    },
    {
      name: 'detail',
      type: 'group',
      admin: { description: 'Optional detail fields.' },
      fields: [
        { name: 'duration', type: 'text' },
        { name: 'recovery', type: 'text' },
        { name: 'included', type: 'array',
          fields: [{ name: 'value', type: 'text', required: true }] },
      ],
    },
    seoGroup,
    {
      name: 'sortOrder',
      type: 'number',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
        description: 'Order within mainCategory. Lower numbers appear earlier. Use 10/20/30… leaving gaps for inserts.',
      },
    },
  ],
}
