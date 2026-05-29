import type { CollectionConfig } from 'payload'
import { isAuthenticated, readPublic } from '../lib/access'
import { revalidationHooks } from '../lib/revalidate'

export const Authors: CollectionConfig = {
  slug: 'authors',
  labels: { singular: 'Author', plural: 'Authors' },
  admin: {
    hidden: true,
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
    { name: 'slug', type: 'text', required: true, unique: true, index: true,
      admin: { hidden: true } },
    { name: 'name', type: 'text', required: true },
    { name: 'role', type: 'text' },
    { name: 'bio', type: 'richText' },
    { name: 'surgeonProfile', type: 'relationship', relationTo: 'surgeons',
      admin: { description: 'If author is one of the clinic surgeons' } },
    { name: 'portrait', type: 'upload', relationTo: 'media',
      admin: { description: 'Author headshot shown in the blog post byline and "About the author" callout at the bottom of /blog/{slug}. Square crop, minimum 200×200px.' } },
  ],
}
