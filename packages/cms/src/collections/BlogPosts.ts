import type { CollectionConfig } from 'payload'
import { isAuthenticated, publishedOrAuthed, isAuthenticated as canMutate } from '../lib/access'
import { revalidationHooks } from '../lib/revalidate'
import { seoGroup, publishStatusField, sortOrderField } from '../lib/seo'
import { makeCollectionTranslateHook, T, R, SEO_SPECS } from '../hooks/autoTranslate'

export const BlogPosts: CollectionConfig = {
  slug: 'blog-posts',
  labels: { singular: 'Blog Post', plural: 'Blog Posts' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'author', 'publishedAt', 'publishStatus'],
    group: 'Publications',
    description: 'Journal articles. Each post renders at /blog/{slug} and appears as a card on /blog. Has title, lede, rich-text body, hero image, author, tags, publish status, per-post SEO.',
  },
  access: {
    read: publishedOrAuthed,
    create: canMutate,
    update: canMutate,
    delete: isAuthenticated,
  },
  hooks: { ...revalidationHooks(), afterChange: [makeCollectionTranslateHook([T('title'), T('lede'), R('body'), ...SEO_SPECS])] },
  fields: [
    { name: 'slug', type: 'text', required: true, unique: true, index: true,
      admin: { hidden: true } },
    { name: 'title', type: 'text', required: true, localized: true },
    { name: 'lede', label: 'Intro paragraph', type: 'textarea', localized: true,
      admin: { hidden: true } },
    { name: 'body', type: 'richText', localized: true },
    { name: 'author', type: 'relationship', relationTo: 'authors' },
    { name: 'publishedAt', type: 'date' },
    { name: 'tags', type: 'relationship', relationTo: 'blog-tags', hasMany: true },
    { name: 'readingTimeMinutes', type: 'number',
      admin: { hidden: true } },
    { name: 'heroImage', type: 'upload', relationTo: 'media',
      admin: { description: 'Large image shown at the top of the blog post at /blog/{slug} and as the card thumbnail on the /blog index. Recommended 1600×900px (16:9), JPG or WebP.' } },
    publishStatusField,
    seoGroup,
    sortOrderField,
  ],
}
