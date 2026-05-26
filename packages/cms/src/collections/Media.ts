import type { CollectionConfig } from 'payload'
import { apiWarningField } from '../lib/api-warning'

export const Media: CollectionConfig = {
  slug: 'media',
  folders: true,
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'filename',
    defaultColumns: ['filename', 'category', 'alt', 'isPlaceholder', 'updatedAt'],
    listSearchableFields: ['filename', 'alt'],
    group: 'Media Library',
    description: 'Every image used anywhere on the site — hero images, doctor portraits, before/after composites, logos, OG/share previews, lifestyle imagery. Filter by "Placeholder" to see the seed-shipped images still awaiting real photos from the clinic. TWO ways to organise: (1) the Category dropdown tags each asset to a site bucket (Homepage, Treatments, Doctors, …) — use this to filter the list view; (2) the "Browse by Folder" toggle gives a desktop-style folder tree (drag-and-drop, create/rename folders) for free-form organisation — like grouping all assets from a 2026 brand refresh under one folder. Folders and Category are independent — an asset can live in any folder and still be tagged to any Category. Upload here once → reference everywhere via Upload fields on other collections.',
  },
  fields: [
    apiWarningField,
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    {
      name: 'category',
      type: 'select',
      defaultValue: 'uncategorised',
      index: true,
      admin: {
        position: 'sidebar',
        description:
          'Which bucket this asset belongs to. Filter the Media list by Category to see all assets used in a given site section. Existing assets default to "Uncategorised" — sort over time.',
      },
      options: [
        { label: 'Homepage', value: 'homepage' },
        { label: 'Treatments', value: 'treatments' },
        { label: 'Doctors', value: 'doctors' },
        { label: 'Results', value: 'results' },
        { label: 'Pricing', value: 'pricing' },
        { label: 'Journey', value: 'journey' },
        { label: 'Contact', value: 'contact' },
        { label: 'Blog', value: 'blog' },
        { label: 'Uncategorised', value: 'uncategorised' },
      ],
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
      options: { quality: 90 },
    },
    imageSizes: [
      { name: 'sm', width: 480, height: undefined, position: 'centre', formatOptions: { format: 'webp', options: { quality: 88 } } },
      { name: 'md', width: 768, height: undefined, position: 'centre', formatOptions: { format: 'webp', options: { quality: 88 } } },
      { name: 'lg', width: 1280, height: undefined, position: 'centre', formatOptions: { format: 'webp', options: { quality: 87 } } },
      { name: 'xl', width: 1920, height: undefined, position: 'centre', formatOptions: { format: 'webp', options: { quality: 86 } } },
      { name: 'xxl', width: 2560, height: undefined, position: 'centre', formatOptions: { format: 'webp', options: { quality: 85 } } },
    ],
  },
}
