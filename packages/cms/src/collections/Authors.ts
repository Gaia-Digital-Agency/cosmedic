import type { CollectionConfig } from 'payload'
import { isAuthenticated, readPublic } from '../lib/access'
import { revalidationHooks } from '../lib/revalidate'

export const Authors: CollectionConfig = {
  slug: 'authors',
  admin: { useAsTitle: 'name', group: 'Editorial' },
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
    { name: 'role', type: 'text' },
    { name: 'bio', type: 'richText' },
    { name: 'portrait', type: 'upload', relationTo: 'media' },
    { name: 'surgeonProfile', type: 'relationship', relationTo: 'surgeons',
      admin: { description: 'If author is one of the clinic surgeons' } },
  ],
}
