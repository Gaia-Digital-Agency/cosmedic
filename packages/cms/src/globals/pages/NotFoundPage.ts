import type { GlobalConfig } from 'payload'
import { isAuthenticated, readPublic } from '../../lib/access'
import { revalidateGlobalAfterChange } from '../../lib/revalidate'
import { apiWarningField } from '../../lib/api-warning'

export const NotFoundPage: GlobalConfig = {
  slug: 'not-found-page',
  label: 'h. 404 Not Found',
  admin: {
    group: 'About',
    description: 'Editorial content for the 404 Not Found page (shown whenever a URL doesn\'t match any route).',
  },
  access: { read: readPublic, update: isAuthenticated },
  hooks: revalidateGlobalAfterChange(),
  fields: [
    apiWarningField,
    {
      name: 'eyebrow',
      type: 'text',
      localized: true,
      defaultValue: 'Error · 404',
      admin: { description: 'Small-caps mono eyebrow above the heading.' },
    },
    {
      name: 'headingA',
      type: 'text',
      localized: true,
      defaultValue: 'Page',
      admin: { description: 'First part of the h1 (roman).' },
    },
    {
      name: 'headingB',
      type: 'text',
      localized: true,
      defaultValue: 'not found.',
      admin: { description: 'Second part of the h1 (italic serif).' },
    },
    {
      name: 'lede',
      type: 'textarea',
      localized: true,
      defaultValue:
        'The page you were looking for has moved or never existed. Return to the homepage, or contact our concierge if you were sent this link by mistake.',
      admin: { description: 'Body paragraph under the heading.' },
    },
    {
      name: 'primaryBtnLabel',
      type: 'text',
      localized: true,
      defaultValue: 'Return to homepage',
      admin: { description: 'Label on the primary CTA button.' },
    },
    {
      name: 'primaryBtnHref',
      type: 'text',
      localized: true,
      defaultValue: '/',
      admin: { description: 'Href for the primary button. Default: homepage.' },
    },
    {
      name: 'secondaryBtnLabel',
      type: 'text',
      localized: true,
      defaultValue: 'Speak with a concierge',
      admin: { description: 'Label on the ghost button.' },
    },
    {
      name: 'secondaryBtnHref',
      type: 'text',
      localized: true,
      defaultValue: '/contact',
      admin: { description: 'Href for the ghost button. Default: /contact.' },
    },
  ],
}
