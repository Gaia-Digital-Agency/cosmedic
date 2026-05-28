import type { CollectionConfig } from 'payload'
import { isAuthenticated, readPublic } from '../lib/access'
import { revalidationHooks } from '../lib/revalidate'
import { sortOrderField } from '../lib/seo'

export const BlogTags: CollectionConfig = {
  slug: 'blog-tags',
  labels: { singular: 'Blog Tag', plural: 'Blog Tags' },
  admin: {
    useAsTitle: 'name',
    group: 'About',
    description: 'Topic tags applied to blog posts. Rendered as filter chips on /blog and as the "Filed under" label on each post page.',
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
    { name: 'description', type: 'textarea' },
    sortOrderField,
  ],
}
