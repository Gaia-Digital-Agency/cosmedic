import type { CollectionConfig } from 'payload'
import { isAuthenticated, readPublic } from '../lib/access'
import { revalidationHooks } from '../lib/revalidate'
import { sortOrderField } from '../lib/seo'
import { apiWarningField } from '../lib/api-warning'

export const PricingTiers: CollectionConfig = {
  slug: 'pricing-tiers',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'priceFromAud', 'isFeatured', 'sortOrder'],
    group: 'Pricing',
    description: 'Concierge package tiers (Sanctuary, Restorative, …) shown as the tier-cards section near the top of /pricing.',
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
    { name: 'name', type: 'text', required: true },
    { name: 'descriptor', type: 'richText' },
    { name: 'priceFromAud', type: 'number' },
    { name: 'priceFromIdr', type: 'number' },
    { name: 'inclusions', type: 'array', fields: [{ name: 'value', type: 'text', required: true }] },
    { name: 'isFeatured', type: 'checkbox', defaultValue: false },
    sortOrderField,
  ],
}
