import type { GlobalConfig } from 'payload'
import { isAuthenticated, readPublic } from '../lib/access'
import { revalidateGlobalAfterChange } from '../lib/revalidate'

export const EmailTemplates: GlobalConfig = {
  slug: 'email-templates',
  label: 'Email',
  admin: {
    group: 'Contact',
    description: 'Outgoing email templates: the clinic-notify email sent to staff when a lead comes in, the auto-responder sent back to the enquirer, and any future transactional emails.',
  },
  access: { read: readPublic, update: isAuthenticated },
  hooks: revalidateGlobalAfterChange(),
  fields: [
    {
      name: 'templates',
      type: 'array',
      admin: { description: 'One row per template. Initial seed: enquiry-autoresponder (sent to enquirer), enquiry-clinic-notify (sent to clinic staff), newsletter-confirm, admin-password-reset.' },
      fields: [
        { name: 'id', type: 'text', required: true,
          admin: { description: 'Template key the server uses to look up this template, e.g. "enquiry-autoresponder". Do not rename without updating the email pipeline.' } },
        { name: 'subject', type: 'text', required: true,
          admin: { description: 'Email subject line. Supports {{name}}, {{procedure}}, etc. placeholders.' } },
        { name: 'bodyMjml', type: 'textarea', required: true,
          admin: { description: 'Email body — MJML or plain HTML. Placeholders like {{name}} / {{procedure}} / {{email}} get substituted at send time.' } },
        { name: 'locale', type: 'select', defaultValue: 'en',
          admin: { description: 'Locale this template applies to. EN today; ID activates in Phase 9.' },
          options: [{ label: 'English', value: 'en' }, { label: 'Bahasa Indonesia', value: 'id' }] },
      ],
    },
  ],
}
