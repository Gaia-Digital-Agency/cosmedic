import type { CollectionConfig } from 'payload'
import { isAuthenticated } from '../lib/access'

export const Analytics: CollectionConfig = {
  slug: 'analytics',
  labels: { singular: 'Ask Log', plural: 'Analytics' },
  admin: {
    useAsTitle: 'question',
    defaultColumns: ['question', 'topics', 'wordCount', 'country', 'timezone', 'askedAt'],
    group: 'Contact',
    description: 'Every question submitted via Ask The Doctor. Captured automatically — IP, location, device, and the question text. View and delete only.',
  },
  access: {
    read: isAuthenticated,
    create: () => true,
    update: () => false,
    delete: isAuthenticated,
  },
  fields: [
    {
      name: 'question',
      type: 'textarea',
      required: true,
      admin: { readOnly: true },
    },
    {
      name: 'topics',
      type: 'select',
      hasMany: true,
      label: 'Topics',
      admin: { readOnly: true, description: 'Treatment categories detected in the question text.' },
      options: [
        { label: 'Face', value: 'face' },
        { label: 'Breast', value: 'breast' },
        { label: 'Body', value: 'body' },
        { label: 'Reconstructive', value: 'reconstructive' },
        { label: 'Injectables', value: 'injectables' },
        { label: 'Laser', value: 'laser' },
        { label: 'Skin', value: 'skin' },
        { label: 'Hair', value: 'hair' },
        { label: 'Dental', value: 'dental' },
        { label: 'Weight Loss', value: 'weight-loss' },
      ],
    },
    {
      name: 'wordCount',
      type: 'number',
      label: 'Words',
      admin: { readOnly: true },
    },
    {
      name: 'askedAt',
      type: 'date',
      label: 'Asked At',
      admin: {
        readOnly: true,
        date: { displayFormat: 'd MMM yyyy · HH:mm' },
      },
    },
    {
      name: 'ip',
      type: 'text',
      label: 'IP Address',
      admin: { readOnly: true, hidden: true },
    },
    {
      name: 'country',
      type: 'text',
      admin: { readOnly: true },
    },
    {
      name: 'city',
      type: 'text',
      admin: { readOnly: true },
    },
    {
      name: 'timezone',
      type: 'text',
      admin: { readOnly: true },
    },
    {
      name: 'userAgent',
      type: 'text',
      label: 'Browser / Device',
      admin: { readOnly: true, hidden: true },
    },
  ],
  timestamps: true,
}
