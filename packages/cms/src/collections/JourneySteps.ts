import type { CollectionConfig } from 'payload'
import { isAuthenticated, readPublic } from '../lib/access'
import { revalidationHooks } from '../lib/revalidate'
import { sortOrderField } from '../lib/seo'
import { apiWarningField } from '../lib/api-warning'

export const JourneySteps: CollectionConfig = {
  slug: 'journey-steps',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'dayLabel', 'category', 'sortOrder'],
    group: 'Journey',
    description: 'Patient-journey steps shown as the timeline on /journey AND reused as the "Recovery timeline" block on procedure detail. Each step has a day label, title, body, and category.',
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
