import type { CollectionConfig } from 'payload'
import { isAuthenticated } from '../lib/access'

export const Enquiries: CollectionConfig = {
  slug: 'enquiries',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'treatmentInterest', 'status', 'submittedAt'],
    group: 'Enquiries',
    description: 'Lead submissions. Public can create; only authed users can read/update. Never deleted (audit trail).',
  },
  access: {
    read: isAuthenticated,
    create: () => true,
    update: isAuthenticated,
    delete: () => false, // immutable from UI
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'email', type: 'text', required: true },
    { name: 'phone', type: 'text' },
    { name: 'country', type: 'text' },
    { name: 'treatmentInterest', type: 'relationship', relationTo: 'procedures' },
    { name: 'treatmentInterestText', type: 'text', admin: { description: 'Fallback when not a known procedure' } },
    { name: 'preferredDate', type: 'date' },
    { name: 'message', type: 'textarea' },
    { name: 'sourcePage', type: 'text' },
    { name: 'sourceCta', type: 'text' },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: 'New', value: 'new' },
        { label: 'Contacted', value: 'contacted' },
        { label: 'Scheduled', value: 'scheduled' },
        { label: 'Converted', value: 'converted' },
        { label: 'Closed', value: 'closed' },
        { label: 'Spam', value: 'spam' },
      ],
    },
    { name: 'assignedTo', type: 'relationship', relationTo: 'users' },
    {
      name: 'internalNotes',
      type: 'array',
      fields: [
        { name: 'at', type: 'date', admin: { description: 'Auto-stamped on save' } },
        { name: 'by', type: 'relationship', relationTo: 'users' },
        { name: 'text', type: 'textarea', required: true },
      ],
    },
    { name: 'submittedAt', type: 'date', admin: { readOnly: true } },
    { name: 'ip', type: 'text', admin: { readOnly: true } },
    { name: 'userAgent', type: 'text', admin: { readOnly: true } },
    { name: 'honeypot', type: 'text', admin: { hidden: true } },
  ],
}
