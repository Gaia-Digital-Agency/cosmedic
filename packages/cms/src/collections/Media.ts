import type { CollectionConfig } from 'payload'
import { apiWarningField } from '../lib/api-warning'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'filename',
    defaultColumns: ['filename', 'alt', 'isPlaceholder', 'updatedAt'],
    listSearchableFields: ['filename', 'alt'],
    group: 'Media Library',
    description: 'Every image used anywhere on the site — hero images, doctor portraits, before/after composites, logos, OG/share previews, lifestyle imagery. Filter by "Placeholder" to see the seed-shipped images still awaiting real photos from the clinic. Upload here once → reference everywhere via Upload fields on other collections.',
  },
  fields: [
    apiWarningField,
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    {
      name: 'isPlaceholder',
      type: 'checkbox',
      defaultValue: false,
      index: true,
      admin: {
        position: 'sidebar',
        description:
          'Flagged TRUE on every seed-shipped placeholder. UNCHECK after replacing with a real clinic photo. Filter the Media list by this flag to see the launch backlog.',
      },
      label: 'Placeholder — replace before launch',
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
