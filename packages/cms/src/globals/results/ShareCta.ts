import type { GlobalConfig } from 'payload'
import { isAuthenticated, readPublic } from '../../lib/access'
import { revalidateGlobalAfterChange } from '../../lib/revalidate'
import { apiWarningField } from '../../lib/api-warning'

export const ShareCta: GlobalConfig = {
  slug: 'share-cta',
  label: 'd. Share-Cta',
  admin: {
    group: 'Results',
    description:
      '"Sharing your story / Have a story to share?" CTA shown at the bottom of /results and /stories. Edit once — applies to BOTH pages.',
  },
  access: { read: readPublic, update: isAuthenticated },
  hooks: revalidateGlobalAfterChange(),
  fields: [
    apiWarningField,
    { name: 'eyebrow', type: 'text', defaultValue: 'Sharing your story',
      admin: { description: 'Small-caps eyebrow above the heading.' } },
    { name: 'headingPre', type: 'text', defaultValue: 'Have a ',
      admin: { description: 'First part of the heading (roman). Renders before the italic word.' } },
    { name: 'headingItalic', type: 'text', defaultValue: 'story',
      admin: { description: 'Italic word inside the heading.' } },
    { name: 'headingPost', type: 'text', defaultValue: ' to share?',
      admin: { description: 'Roman tail of the heading after the italic word.' } },
    { name: 'body', type: 'textarea',
      defaultValue:
        "We never solicit testimonials — every story we publish is shared at the patient's instigation, in their own words, with their consent. If you'd like to share, we would be honoured to read it.",
      admin: { description: 'Body paragraph between the heading and the CTA button.' } },
    { name: 'buttonLabel', type: 'text', defaultValue: 'Write to us',
      admin: { description: 'Primary CTA button label.' } },
    { name: 'buttonHref', type: 'text', defaultValue: '/contact',
      admin: { description: 'Button href / link target.' } },
  ],
}
