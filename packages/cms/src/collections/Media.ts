import type { CollectionConfig } from 'payload'
import { apiWarningField } from '../lib/api-warning'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  fields: [
    apiWarningField,
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    {
      name: 'credit',
      type: 'text',
    },
    {
      name: 'caption',
      type: 'text',
    },
  ],
  upload: {
    mimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/svg+xml'],
    formatOptions: {
      format: 'webp',
      options: { quality: 82 },
    },
    imageSizes: [
      { name: 'sm', width: 480, height: undefined, position: 'centre', formatOptions: { format: 'webp', options: { quality: 80 } } },
      { name: 'md', width: 768, height: undefined, position: 'centre', formatOptions: { format: 'webp', options: { quality: 80 } } },
      { name: 'lg', width: 1280, height: undefined, position: 'centre', formatOptions: { format: 'webp', options: { quality: 78 } } },
      { name: 'xl', width: 1920, height: undefined, position: 'centre', formatOptions: { format: 'webp', options: { quality: 76 } } },
      { name: 'xxl', width: 2560, height: undefined, position: 'centre', formatOptions: { format: 'webp', options: { quality: 74 } } },
    ],
  },
}
