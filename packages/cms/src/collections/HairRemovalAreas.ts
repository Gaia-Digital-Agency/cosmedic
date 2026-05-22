import type { CollectionConfig } from 'payload'
import { isAuthenticated, readPublic } from '../lib/access'
import { revalidationHooks } from '../lib/revalidate'
import { sortOrderField } from '../lib/seo'
import { apiWarningField } from '../lib/api-warning'

export const HairRemovalAreas: CollectionConfig = {
  slug: 'hair-removal-areas',
  admin: {
    useAsTitle: 'area',
    defaultColumns: ['area', 'bodyZone', 'priceIdr', 'sortOrder'],
    group: 'Treatments',
    description: 'BTL hair-removal areas and other BTL services. Renders as rows in the BTL Hair Removal section of /pricing, grouped by body zone (Face / Upper Body / Lower Body / Package / Other).',
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
    { name: 'area', type: 'text', required: true },
    {
      name: 'bodyZone',
      type: 'select',
      required: true,
      options: [
        { label: 'Face', value: 'face' },
        { label: 'Upper Body', value: 'upper-body' },
        { label: 'Lower Body', value: 'lower-body' },
        { label: 'Package', value: 'package' },
        { label: 'Other BTL', value: 'other' },
      ],
    },
    { name: 'priceIdr', type: 'number' },
    { name: 'notes', type: 'text' },
    sortOrderField,
  ],
}
