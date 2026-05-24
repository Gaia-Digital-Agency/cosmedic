import type { CollectionConfig } from 'payload'
import { isAuthenticated, readPublic } from '../lib/access'
import { revalidationHooks } from '../lib/revalidate'
import { sortOrderField } from '../lib/seo'
import { apiWarningField } from '../lib/api-warning'

export const Awards: CollectionConfig = {
  slug: 'awards',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'year', 'issuer'],
    group: 'h. About',
    description: 'Accreditations + awards (ACHSI, ISAPS, IPRAS, "#1 Hospital 2026", …). Renders as the awards strip on /press.',
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
    { name: 'year', type: 'number' },
    { name: 'issuer', type: 'text' },
    { name: 'logo', type: 'upload', relationTo: 'media' },
    { name: 'summary', type: 'textarea' },
    sortOrderField,
  ],
}
