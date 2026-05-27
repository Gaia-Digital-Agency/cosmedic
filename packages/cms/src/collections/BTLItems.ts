import type { CollectionConfig } from 'payload'
import { isAuthenticated, readPublic } from '../lib/access'
import { revalidationHooks } from '../lib/revalidate'
import { seoGroup } from '../lib/seo'

export const BTLItems: CollectionConfig = {
  slug: 'btl-items',
  labels: { singular: 'BTL', plural: 'BTL' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'bodyZone', 'sortOrder'],
    group: 'Pricing',
    description: 'BTL hair removal price rows rendered in the BTL table on /pricing. Grouped by bodyZone (Face · Body · Packages · Skin Treatments).',
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
    { name: 'slug', type: 'text', required: true, unique: true, index: true,
      admin: { description: 'URL fragment / catalogue key for this item.' } },
    { name: 'name', type: 'text', required: true,
      admin: { description: 'Display name shown on the /pricing catalogue row — e.g. "Upper Lip", "Full Leg".' } },
    { name: 'shortName', type: 'text',
      admin: { description: 'Optional shorter label.' } },
    { name: 'catalogueGroup', type: 'text', defaultValue: 'btl',
      admin: { hidden: true, description: 'Hardcoded to "btl" — do not change.' } },
    { name: 'mainCategory', type: 'text',
      admin: { description: 'Optional grouping label.' } },
    { name: 'subCategory', type: 'text',
      admin: { description: 'Optional 3rd-level grouping label.' } },
    { name: 'unit', type: 'text',
      admin: { description: 'e.g. "per session".' } },
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
    {
      name: 'bodyZone',
      type: 'select',
      options: [
        { label: 'Face', value: 'face' },
        { label: 'Upper Body', value: 'upper-body' },
        { label: 'Lower Body', value: 'lower-body' },
        { label: 'Package', value: 'package' },
        { label: 'Other BTL', value: 'other' },
      ],
      admin: { description: 'Body zone used for grouping in the BTL table.' },
    },
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
        { name: 'priceNotes', type: 'text', admin: { description: 'Optional notes.' } },
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
        description: 'Order within bodyZone group. Lower numbers appear earlier. Use 10/20/30… leaving gaps for inserts.',
      },
    },
  ],
}
