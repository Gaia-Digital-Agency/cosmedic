import type { GlobalConfig } from 'payload'
import { isAuthenticated, readPublic } from '../lib/access'
import { revalidateGlobalAfterChange } from '../lib/revalidate'

export const FormDefaults: GlobalConfig = {
  slug: 'form-defaults',
  label: 'Form',
  admin: {
    hidden: true,
    group: 'Contact',
    description: 'Copy strings used by every enquiry form: field labels, placeholder hints, submit button text, success/error/rate-limit messages. Applies to the homepage hero quick-form, the full /contact form, AND the /video-consult booking form. Edit once; applies everywhere.',
  },
  access: { read: readPublic, update: isAuthenticated },
  hooks: revalidateGlobalAfterChange(),
  fields: [
    {
      name: 'labels',
      type: 'group',
      admin: { description: 'Labels shown ABOVE each form field on the homepage hero quick-form and the /contact form.' },
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
      admin: { description: 'Faint placeholder hints shown INSIDE each empty form field.' },
      fields: [
        { name: 'name', type: 'text' },
        { name: 'email', type: 'text' },
        { name: 'phone', type: 'text' },
        { name: 'country', type: 'text' },
        { name: 'treatment', type: 'text' },
        { name: 'message', type: 'text' },
      ],
    },
    { name: 'submitLabel', type: 'text', defaultValue: 'Send enquiry',
      admin: { description: 'Text shown on the form submit button.' } },
    { name: 'successMessage', type: 'textarea',
      defaultValue: 'Thank you — your concierge will reply within one business day.',
      admin: { description: 'Confirmation shown under the form after a successful enquiry submission.' } },
    { name: 'errorMessage', type: 'textarea',
      defaultValue: 'Something went wrong. Please email cosmedic@bimcbali.com if it persists.',
      admin: { description: 'Error shown when the submission fails (server error, validation, network).' } },
    { name: 'rateLimitMessage', type: 'textarea',
      defaultValue: 'You submitted a form recently. Please wait a moment before sending another.',
      admin: { description: 'Shown when the visitor hits the IP rate limit (2 submissions per minute per IP).' } },
  ],
}
