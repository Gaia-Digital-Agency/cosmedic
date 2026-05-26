import type { GlobalConfig } from 'payload'
import { isAuthenticated, readPublic } from '../../lib/access'
import { revalidateGlobalAfterChange } from '../../lib/revalidate'
import { apiWarningField } from '../../lib/api-warning'

export const LibraryCta: GlobalConfig = {
  slug: 'library-cta',
  label: 'c. Library-Cta',
  admin: {
    group: 'Results',
    description:
      '"Private gallery / Want to see more?" CTA shown at the bottom of /results and /gallery. Edit once — applies to BOTH pages.',
  },
  access: { read: readPublic, update: isAuthenticated },
  hooks: revalidateGlobalAfterChange(),
  fields: [
    apiWarningField,
    { name: 'eyebrow', label: 'Label above heading', type: 'text', defaultValue: 'Private gallery',
      admin: { description: 'Small-caps eyebrow above the heading.' } },
    { name: 'headingPre', type: 'text', defaultValue: 'Want to see ',
      admin: { description: 'First part of the heading (roman). Renders before the italic word.' } },
    { name: 'headingItalic', type: 'text', defaultValue: 'more?',
      admin: { description: 'Italic word(s) inside the heading.' } },
    { name: 'body', type: 'textarea',
      defaultValue:
        'Our complete library — over two hundred consented cases across every discipline — is shared during private consultation. We will match what we show you to the work you are considering.',
      admin: { description: 'Body paragraph between the heading and the CTA button.' } },
    { name: 'buttonLabel', type: 'text', defaultValue: 'Request the full library',
      admin: { description: 'Primary CTA button label.' } },
    { name: 'buttonHref', type: 'text', defaultValue: '/contact',
      admin: { description: 'Button href / link target.' } },
  ],
}
