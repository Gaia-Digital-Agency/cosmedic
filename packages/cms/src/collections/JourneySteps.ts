import type { CollectionConfig } from 'payload'
import { isAuthenticated, readPublic } from '../lib/access'
import { sortOrderField } from '../lib/seo'

export const JourneySteps: CollectionConfig = {
  slug: 'journey-steps',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'dayLabel', 'category', 'sortOrder'],
    group: 'Editorial',
    description: 'Patient journey steps. Reused on /journey and as recovery timeline on procedure pages. Seeded from pricelist Day 1/2/4/7/10/14 + design 8-step.',
  },
  access: {
    read: readPublic,
    create: isAuthenticated,
    update: isAuthenticated,
    delete: isAuthenticated,
  },
  fields: [
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    { name: 'order', type: 'number', required: true, defaultValue: 0 },
    { name: 'dayLabel', type: 'text', admin: { description: 'e.g. "Day 1", "Week 1", "Before you fly"' } },
    { name: 'title', type: 'text', required: true },
    { name: 'body', type: 'richText' },
    { name: 'icon', type: 'upload', relationTo: 'media' },
    {
      name: 'category',
      type: 'select',
      defaultValue: 'consult',
      options: [
        { label: 'Consultation', value: 'consult' },
        { label: 'Medical', value: 'medical' },
        { label: 'Surgical', value: 'surgical' },
        { label: 'Recovery', value: 'recovery' },
        { label: 'Follow-up', value: 'follow-up' },
      ],
    },
    sortOrderField,
  ],
}
