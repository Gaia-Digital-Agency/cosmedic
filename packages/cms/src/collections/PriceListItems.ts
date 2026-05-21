import type { CollectionConfig } from 'payload'
import { isAuthenticated, readPublic } from '../lib/access'
import { revalidationHooks } from '../lib/revalidate'
import { sortOrderField } from '../lib/seo'
import { apiWarningField } from '../lib/api-warning'

export const PriceListItems: CollectionConfig = {
  slug: 'price-list-items',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'sheet', 'category', 'priceIdr2026', 'sortOrder'],
    group: 'Treatments & Pricing',
    description: 'The complete clinic price catalogue (~200 rows from docs/pricelist.xlsx). Renders as the big tables on /pricing, grouped by Sheet (Surgical / Non-Surgical / Machine / Injection / BTL) and then by Category. This is the canonical source for every price on the site.',
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
      admin: { description: 'Auto-generated from sheet + name during seed' } },
    {
      name: 'sheet',
      type: 'select',
      required: true,
      options: [
        { label: 'Surgical Procedures', value: 'surgical' },
        { label: 'Non-Surgical Treatments', value: 'non-surgical' },
        { label: 'Machine', value: 'machine' },
        { label: 'Injection', value: 'injection' },
        { label: 'BTL (Hair Removal)', value: 'btl' },
      ],
    },
    { name: 'category', type: 'text', admin: { description: 'e.g. "Face & Neck"' } },
    { name: 'subCategory', type: 'text', admin: { description: 'e.g. "Breast"' } },
    { name: 'name', type: 'text', required: true },
    { name: 'unit', type: 'text', admin: { description: 'e.g. "1 ml", "per thread", "Face"' } },
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
    },
    { name: 'notes', type: 'text', admin: { description: 'Parenthetical notes from the row' } },
    { name: 'priceIdr2025', type: 'number' },
    { name: 'priceAud2025', type: 'number' },
    { name: 'priceIdr2026', type: 'number' },
    { name: 'priceAud2026', type: 'number' },
    { name: 'priceIdrRangeLow', type: 'number' },
    { name: 'priceIdrRangeHigh', type: 'number' },
    { name: 'featuredRank', type: 'number', admin: { description: '1/2/3 from "Top 3" marker in xlsx column 1' } },
    { name: 'includesImplant', type: 'checkbox', defaultValue: false },
    { name: 'linkedProcedure', type: 'relationship', relationTo: 'procedures',
      admin: { description: 'If this row maps to a curated editorial procedure' } },
    { name: 'linkedInjectableProduct', type: 'relationship', relationTo: 'injectable-products' },
    { name: 'linkedMachineTreatment', type: 'relationship', relationTo: 'machine-treatments' },
    sortOrderField,
  ],
}
