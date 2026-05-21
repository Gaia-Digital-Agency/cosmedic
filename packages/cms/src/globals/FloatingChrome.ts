import type { GlobalConfig } from 'payload'
import { isAuthenticated, readPublic } from '../lib/access'
import { revalidateGlobalAfterChange } from '../lib/revalidate'
import { apiWarningField } from '../lib/api-warning'

export const FloatingChrome: GlobalConfig = {
  slug: 'floating-chrome',
  admin: { group: 'Site Settings', description: 'Floating CTA pill + WhatsApp/chat affordance shown on every page.' },
  access: { read: readPublic, update: isAuthenticated },
  hooks: revalidateGlobalAfterChange(),
  fields: [
    apiWarningField,
    {
      name: 'ctaPill',
      type: 'group',
      fields: [
        { name: 'label', type: 'text', defaultValue: 'Plan your treatment' },
        { name: 'href', type: 'text', defaultValue: '/contact' },
        { name: 'enabled', type: 'checkbox', defaultValue: true },
      ],
    },
    {
      name: 'chat',
      type: 'group',
      fields: [
        { name: 'enabled', type: 'checkbox', defaultValue: true },
        { name: 'provider', type: 'select', defaultValue: 'whatsapp',
          options: [{ label: 'WhatsApp', value: 'whatsapp' }, { label: 'Custom embed', value: 'custom' }] },
        { name: 'embedScript', type: 'textarea', admin: { description: 'Custom widget HTML/JS (only if provider=custom)' } },
        { name: 'openOnLoad', type: 'checkbox', defaultValue: false },
      ],
    },
  ],
}
