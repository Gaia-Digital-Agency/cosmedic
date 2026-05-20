import type { CollectionConfig } from 'payload'
import { isAuthenticated, readPublic } from '../lib/access'
import { sortOrderField } from '../lib/seo'

export const PricingTiers: CollectionConfig = {
  slug: 'pricing-tiers',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'priceFromAud', 'isFeatured', 'sortOrder'],
    group: 'Editorial',
    description: 'Concierge package tiers (Sanctuary, Restorative, …) for /pricing.',
  },
  access: {
    read: readPublic,
    create: isAuthenticated,
    update: isAuthenticated,
    delete: isAuthenticated,
  },
  fields: [
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    { name: 'name', type: 'text', required: true },
    { name: 'descriptor', type: 'richText' },
    { name: 'priceFromAud', type: 'number' },
    { name: 'priceFromIdr', type: 'number' },
    { name: 'inclusions', type: 'array', fields: [{ name: 'value', type: 'text', required: true }] },
    { name: 'isFeatured', type: 'checkbox', defaultValue: false },
    sortOrderField,
  ],
}
