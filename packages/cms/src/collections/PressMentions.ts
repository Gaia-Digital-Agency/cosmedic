import type { CollectionConfig } from 'payload'
import { isAuthenticated, readPublic } from '../lib/access'
import { revalidationHooks } from '../lib/revalidate'
import { sortOrderField } from '../lib/seo'
import { makeCollectionTranslateHook, T } from '../hooks/autoTranslate'

export const PressMentions: CollectionConfig = {
  slug: 'press-mentions',
  labels: { singular: 'Press Mention', plural: 'Press Mentions' },
  admin: {
    useAsTitle: 'publication',
    defaultColumns: ['publication', 'headline', 'publishedDate', 'isFeatured'],
    group: 'Publications',
    description: 'External press / editorial mentions of the clinic. Renders as the logo + headline grid on /press.',
  },
  access: {
    read: readPublic,
    create: isAuthenticated,
    update: isAuthenticated,
    delete: isAuthenticated,
  },
  hooks: { ...revalidationHooks(), afterChange: [makeCollectionTranslateHook([T('headline'), T('summary')])] },
  fields: [
    { name: 'slug', type: 'text', required: true, unique: true, index: true,
      admin: { hidden: true } },
    { name: 'publication', type: 'text', required: true },
    { name: 'headline', type: 'text', localized: true },
    { name: 'url', type: 'text', admin: { description: 'Outbound link' } },
    { name: 'publishedDate', type: 'date' },
    { name: 'summary', type: 'textarea', localized: true },
    { name: 'isFeatured', type: 'checkbox', defaultValue: false },
    sortOrderField,
    { name: 'logo', type: 'upload', relationTo: 'media',
      admin: { description: 'Publication masthead logo shown in the press grid on /press. Use a PNG with transparent background. Recommended max-width ~240px.' } },
  ],
}
