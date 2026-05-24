import type { CollectionConfig } from 'payload'
import { isAuthenticated, readPublic } from '../lib/access'
import { revalidationHooks } from '../lib/revalidate'
import { sortOrderField } from '../lib/seo'
import { apiWarningField } from '../lib/api-warning'

export const BlogTags: CollectionConfig = {
  slug: 'blog-tags',
  labels: { singular: 'c. Blog-Tag', plural: 'c. Blog-Tags' },
  admin: {
    useAsTitle: 'name',
    group: 'h. About',
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
    apiWarningField,
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    { name: 'name', type: 'text', required: true },
    { name: 'description', type: 'textarea' },
    sortOrderField,
  ],
}
