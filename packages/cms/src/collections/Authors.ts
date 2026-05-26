import type { CollectionConfig } from 'payload'
import { isAuthenticated, readPublic } from '../lib/access'
import { revalidationHooks } from '../lib/revalidate'
import { apiWarningField } from '../lib/api-warning'

export const Authors: CollectionConfig = {
  slug: 'authors',
  labels: { singular: 'd. Author', plural: 'd. Authors' },
  admin: {
    useAsTitle: 'name',
    group: 'About',
    description: 'Blog post authors. Each author has a name, role, portrait, bio, and an optional link to a Surgeon record (when the author is one of the clinic\'s clinicians). Powers the byline + "About the author" callout on each /blog/{slug} page.',
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
    { name: 'role', type: 'text' },
    { name: 'bio', type: 'richText' },
    { name: 'portrait', type: 'upload', relationTo: 'media' },
    { name: 'surgeonProfile', type: 'relationship', relationTo: 'surgeons',
      admin: { description: 'If author is one of the clinic surgeons' } },
  ],
}
