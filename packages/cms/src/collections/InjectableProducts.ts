import type { CollectionConfig } from 'payload'
import { isAuthenticated, readPublic } from '../lib/access'
import { revalidationHooks } from '../lib/revalidate'
import { sortOrderField } from '../lib/seo'

export const InjectableProducts: CollectionConfig = {
  slug: 'injectable-products',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'brand', 'category', 'priceIdr', 'sortOrder'],
    group: 'Pricing Catalogue',
    description: 'Named injectable products (Restylane, Juvederm, Teosyal, …) parsed from pricelist Injection sheet.',
  },
  access: {
    read: readPublic,
    create: isAuthenticated,
    update: isAuthenticated,
    delete: isAuthenticated,
  },
  hooks: revalidationHooks(),
  fields: [
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    { name: 'name', type: 'text', required: true },
    { name: 'brand', type: 'text', admin: { description: 'e.g. "Juvederm"' } },
    { name: 'productLine', type: 'text', admin: { description: 'e.g. "Volux"' } },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Filler', value: 'filler' },
        { label: 'Botulinum toxin', value: 'botulinum-toxin' },
        { label: 'Skin Booster', value: 'skin-booster' },
        { label: 'Collagen Stimulator', value: 'collagen-stimulator' },
        { label: 'Bio-remodeling', value: 'bio-remodeling' },
        { label: 'HGH', value: 'hgh' },
        { label: 'Thread Lift', value: 'thread-lift' },
        { label: 'Mesotherapy', value: 'mesotherapy' },
      ],
    },
    { name: 'unit', type: 'text', admin: { description: 'e.g. "1 ml", "per unit", "per thread"' } },
    { name: 'priceIdr', type: 'number' },
    { name: 'priceAud', type: 'number' },
    { name: 'notes', type: 'text' },
    { name: 'manufacturer', type: 'text' },
    { name: 'fdaApproved', type: 'checkbox', defaultValue: false },
    sortOrderField,
  ],
}
