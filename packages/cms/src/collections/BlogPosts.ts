import type { CollectionConfig } from 'payload'
import { isAuthenticated, publishedOrAuthed, isAuthenticated as canMutate } from '../lib/access'
import { revalidationHooks } from '../lib/revalidate'
import { seoGroup, publishStatusField, sortOrderField } from '../lib/seo'
import { apiWarningField } from '../lib/api-warning'

export const BlogPosts: CollectionConfig = {
  slug: 'blog-posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'author', 'publishedAt', 'publishStatus'],
    group: 'Journey',
    description: 'Journal articles. Each post renders at /blog/{slug} and appears as a card on /blog. Has title, lede, rich-text body, hero image, author, tags, publish status, per-post SEO.',
  },
  access: {
    read: publishedOrAuthed,
    create: canMutate,
    update: canMutate,
    delete: isAuthenticated,
  },
  hooks: revalidationHooks(),
  fields: [
    apiWarningField,
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    { name: 'title', type: 'text', required: true },
    { name: 'lede', type: 'textarea' },
    { name: 'body', type: 'richText' },
    { name: 'heroImage', type: 'upload', relationTo: 'media' },
    { name: 'author', type: 'relationship', relationTo: 'authors' },
    { name: 'publishedAt', type: 'date' },
    { name: 'tags', type: 'relationship', relationTo: 'blog-tags', hasMany: true },
    { name: 'readingTimeMinutes', type: 'number' },
    publishStatusField,
    seoGroup,
    sortOrderField,
  ],
}
