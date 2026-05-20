import type { CollectionConfig } from 'payload'
import { isAuthenticated, readPublic } from '../lib/access'
import { sortOrderField } from '../lib/seo'

export const MachineTreatments: CollectionConfig = {
  slug: 'machine-treatments',
  admin: {
    useAsTitle: 'machineName',
    defaultColumns: ['machineName', 'area', 'pricing.standardIdr', 'sortOrder'],
    group: 'Pricing Catalogue',
    description: 'Laser / RF / non-injection machine treatments from pricelist Machine sheet. Three-tier pricing (Tourist / Kitas+KTP / Package).',
  },
  access: {
    read: readPublic,
    create: isAuthenticated,
    update: isAuthenticated,
    delete: isAuthenticated,
  },
  fields: [
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
