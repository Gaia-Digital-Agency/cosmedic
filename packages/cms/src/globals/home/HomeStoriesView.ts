import type { GlobalConfig } from 'payload'
import { isAuthenticated, readPublic } from '../../lib/access'
import { revalidateGlobalAfterChange } from '../../lib/revalidate'
import { apiWarningField } from '../../lib/api-warning'

export const HomeStoriesView: GlobalConfig = {
  slug: 'home-stories-view',
  label: 'r. Stories-View',
  admin: {
    group: 'Homepage',
    description:
      'Section chrome for the Stories teaser on / (3 testimonial cards). The patient stories themselves are NOT edited here — source: **d. Results → h. Patient-Stories** (rows where isFeatured=true). This item controls only the eyebrow, heading, lede, and CTA. lede may contain inline HTML for the "full stories page" link.',
  },
  access: { read: readPublic, update: isAuthenticated },
  hooks: revalidateGlobalAfterChange(),
  fields: [
    apiWarningField,
    { name: 'eyebrow', type: 'text', defaultValue: 'Verified Patient Stories',
      admin: { description: 'Section eyebrow.' } },
    { name: 'headingItalic', type: 'text', defaultValue: 'Stories,',
      admin: { description: 'First word of the heading (italic).' } },
    { name: 'headingPart2', type: 'text', defaultValue: 'not slogans.',
      admin: { description: 'Remainder of the heading (roman).' } },
    { name: 'lede', type: 'textarea',
      defaultValue:
        'Verified reviews from international patients. Video testimonials and Google reviews on our full stories page.',
      admin: { description: 'Section lede beneath the heading. (Visible text version of the link-bearing default.)' } },
    { name: 'ctaLabel', type: 'text', defaultValue: 'Read more stories',
      admin: { description: 'Bottom CTA label.' } },
    { name: 'ctaHref', type: 'text', defaultValue: '/results#stories',
      admin: { description: 'Where the bottom CTA links.' } },
  ],
}
