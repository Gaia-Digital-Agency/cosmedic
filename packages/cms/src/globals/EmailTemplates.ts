import type { GlobalConfig } from 'payload'
import { isAuthenticated, readPublic } from '../lib/access'
import { revalidateGlobalAfterChange } from '../lib/revalidate'

export const EmailTemplates: GlobalConfig = {
  slug: 'email-templates',
  admin: { group: 'Forms', description: 'Transactional + notification email copy.' },
  access: { read: readPublic, update: isAuthenticated },
  hooks: revalidateGlobalAfterChange(),
  fields: [
    {
      name: 'templates',
      type: 'array',
      admin: { description: 'Initial seed: enquiry-autoresponder, enquiry-clinic-notify, newsletter-confirm, admin-password-reset.' },
      fields: [
        { name: 'id', type: 'text', required: true, admin: { description: 'Template key, e.g. "enquiry-autoresponder"' } },
        { name: 'subject', type: 'text', required: true },
        { name: 'bodyMjml', type: 'textarea', required: true,
          admin: { description: 'MJML or plain HTML. {{name}} / {{procedure}} / etc. placeholders are substituted by the email pipeline.' } },
        { name: 'locale', type: 'select', defaultValue: 'en',
          options: [{ label: 'English', value: 'en' }, { label: 'Bahasa Indonesia', value: 'id' }] },
      ],
    },
  ],
}
