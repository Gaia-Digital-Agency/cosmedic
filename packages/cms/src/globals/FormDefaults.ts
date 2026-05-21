import type { GlobalConfig } from 'payload'
import { isAuthenticated, readPublic } from '../lib/access'
import { revalidateGlobalAfterChange } from '../lib/revalidate'
import { apiWarningField } from '../lib/api-warning'

export const FormDefaults: GlobalConfig = {
  slug: 'form-defaults',
  admin: { group: 'Forms', description: 'Enquiry form labels, placeholders, and feedback messages.' },
  access: { read: readPublic, update: isAuthenticated },
  hooks: revalidateGlobalAfterChange(),
  fields: [
    apiWarningField,
    {
      name: 'labels',
      type: 'group',
      fields: [
        { name: 'name', type: 'text', defaultValue: 'Your name' },
        { name: 'email', type: 'text', defaultValue: 'Email address' },
        { name: 'phone', type: 'text', defaultValue: 'Phone' },
        { name: 'country', type: 'text', defaultValue: 'Country' },
        { name: 'treatment', type: 'text', defaultValue: 'Treatment of interest' },
        { name: 'message', type: 'text', defaultValue: 'Tell us a little more' },
      ],
    },
    {
      name: 'placeholders',
      type: 'group',
      fields: [
        { name: 'name', type: 'text' },
        { name: 'email', type: 'text' },
        { name: 'phone', type: 'text' },
        { name: 'country', type: 'text' },
        { name: 'treatment', type: 'text' },
        { name: 'message', type: 'text' },
      ],
    },
    { name: 'submitLabel', type: 'text', defaultValue: 'Send enquiry' },
    { name: 'successMessage', type: 'textarea',
      defaultValue: 'Thank you — your concierge will reply within one business day.' },
    { name: 'errorMessage', type: 'textarea',
      defaultValue: 'Something went wrong. Please email cosmedic@bimcbali.com if it persists.' },
    { name: 'rateLimitMessage', type: 'textarea',
      defaultValue: 'You submitted a form recently. Please wait a moment before sending another.' },
  ],
}
