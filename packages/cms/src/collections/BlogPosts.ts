import type { CollectionConfig } from 'payload'
import { isAuthenticated, publishedOrAuthed, isAuthenticated as canMutate } from '../lib/access'
import { revalidationHooks } from '../lib/revalidate'
import { seoGroup, publishStatusField, sortOrderField } from '../lib/seo'

export const BlogPosts: CollectionConfig = {
  slug: 'blog-posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'author', 'publishedAt', 'publishStatus'],
    group: 'Editorial',
    description: 'Blog index + post pages.',
  },
  access: {
    read: publishedOrAuthed,
    create: canMutate,
    update: canMutate,
    delete: isAuthenticated,
  },
  hooks: revalidationHooks(),
  fields: [
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
