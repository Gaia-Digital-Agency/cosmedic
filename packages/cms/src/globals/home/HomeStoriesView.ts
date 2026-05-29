import type { GlobalConfig } from 'payload'
import { isAuthenticated, readPublic } from '../../lib/access'
import { revalidateGlobalAfterChange } from '../../lib/revalidate'

export const HomeStoriesView: GlobalConfig = {
  slug: 'home-stories-view',
  label: 'Stories View',
  admin: {
    hidden: true,
    group: 'Homepage',
    description:
      'Section chrome for the Stories teaser on / (3 testimonial cards). The patient stories themselves are NOT edited here — source: **d. Results → h. Patient-Stories** (rows where isFeatured=true). This item controls only the eyebrow, heading, lede, and CTA. lede may contain inline HTML for the "full stories page" link.',
  },
  access: { read: readPublic, update: isAuthenticated },
  hooks: revalidateGlobalAfterChange(),
  fields: [
    { name: 'lede', label: 'Intro paragraph', type: 'textarea',
      defaultValue:
        'Verified reviews from international patients. Video testimonials and Google reviews on our full stories page.',
      admin: { description: 'Intro paragraph (D8 — lede before eyebrow for section views).' } },
    { name: 'eyebrow', label: 'Label above heading', type: 'text', defaultValue: 'Verified Patient Stories',
      admin: { description: 'Section eyebrow.' } },
    {
      name: 'heading', type: 'group',
      admin: { description: 'Two-part heading. Part A = first word (italic); part B = remainder (roman).' },
      fields: [
        { name: 'a', type: 'text', defaultValue: 'Stories,',
          admin: { description: 'First word of the heading (italic). e.g. "Stories,".' } },
        { name: 'b', type: 'text', defaultValue: 'not slogans.',
          admin: { description: 'Remainder of the heading (roman). e.g. "not slogans.".' } },
      ],
    },
    { name: 'ctaLabel', type: 'text', defaultValue: 'Read more stories',
      admin: { description: 'Bottom CTA label.' } },
    { name: 'ctaHref', type: 'text', defaultValue: '/results#stories',
      admin: { description: 'Where the bottom CTA links.' } },
  ],
}
