import type { GlobalConfig } from 'payload'
import { isAuthenticated, readPublic } from '../lib/access'
import { revalidateGlobalAfterChange } from '../lib/revalidate'
import { apiWarningField } from '../lib/api-warning'

export const FloatingChrome: GlobalConfig = {
  slug: 'floating-chrome',
  label: 'i. Floating-CTA',
  admin: {
    group: 'Homepage',
    description: 'Floating UI shown bottom-right on every page: the brown "Plan Your Treatment" CTA pill and the green WhatsApp/chat bubble next to it.',
  },
  access: { read: readPublic, update: isAuthenticated },
  hooks: revalidateGlobalAfterChange(),
  fields: [
    apiWarningField,
    {
      name: 'ctaPill',
      type: 'group',
      admin: { description: 'The brown CTA pill rendered bottom-right of every page. Mirrors the "Plan Your Treatment" button in the header.' },
      fields: [
        { name: 'label', type: 'text', defaultValue: 'Plan your treatment',
          admin: { description: 'Text shown on the pill button.' } },
        { name: 'href', type: 'text', defaultValue: '/contact',
          admin: { description: 'Where the pill button links to when clicked.' } },
        { name: 'enabled', type: 'checkbox', defaultValue: true,
          admin: { description: 'Uncheck to hide the pill from every page.' } },
      ],
    },
    {
      name: 'chat',
      type: 'group',
      admin: { description: 'The floating green WhatsApp bubble next to the CTA pill (bottom-right of every page).' },
      fields: [
        { name: 'enabled', type: 'checkbox', defaultValue: true,
          admin: { description: 'Uncheck to hide the WhatsApp bubble from every page.' } },
        { name: 'provider', type: 'select', defaultValue: 'whatsapp',
          admin: { description: 'WhatsApp (default — uses Settings.whatsappNumber) or a custom embedded widget.' },
          options: [{ label: 'WhatsApp', value: 'whatsapp' }, { label: 'Custom embed', value: 'custom' }] },
        { name: 'embedScript', type: 'textarea',
          admin: { description: 'Custom widget HTML/JS (only used if provider = "Custom embed").' } },
        { name: 'openOnLoad', type: 'checkbox', defaultValue: false,
          admin: { description: 'If true, the chat panel opens automatically when the page loads (use sparingly).' } },
      ],
    },
  ],
}
