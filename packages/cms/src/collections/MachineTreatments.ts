import type { CollectionConfig } from 'payload'
import { isAuthenticated, readPublic } from '../lib/access'
import { revalidationHooks } from '../lib/revalidate'
import { sortOrderField } from '../lib/seo'
import { apiWarningField } from '../lib/api-warning'

export const MachineTreatments: CollectionConfig = {
  slug: 'machine-treatments',
  admin: {
    useAsTitle: 'machineName',
    defaultColumns: ['machineName', 'area', 'pricing.standardIdr', 'sortOrder'],
    group: 'Treatments & Pricing',
    description: 'Laser / RF / non-injection machine treatments. Renders as rows in the Machine Treatments section of /pricing, grouped by machine name. Three-tier pricing per row (Tourist standard / Kitas+KTP / optional Package).',
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
      admin: { description: 'e.g. "laser-erbium-resurfacing-face"' } },
    { name: 'machineName', type: 'text', required: true, admin: { description: 'e.g. "Laser Erbium Resurfacing"' } },
    { name: 'area', type: 'text', required: true, admin: { description: 'e.g. "Face", "Neck", "Half Arm"' } },
    {
      name: 'pricing',
      type: 'group',
      fields: [
        { name: 'standardIdr', type: 'number', admin: { description: 'BIMC Tourist (standard) IDR' } },
        { name: 'kitasKtpIdr', type: 'number', admin: { description: 'Kitas + KTP holder IDR' } },
        { name: 'packageIdr', type: 'number', admin: { description: 'Package price IDR (optional)' } },
      ],
    },
    { name: 'notes', type: 'text' },
    { name: 'linkedProcedure', type: 'relationship', relationTo: 'procedures' },
    sortOrderField,
  ],
}
