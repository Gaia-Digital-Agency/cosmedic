import type { GlobalConfig } from 'payload'
import { isAuthenticated, publishedOrAuthed } from '../../lib/access'
import { revalidateGlobalAfterChange } from '../../lib/revalidate'
import { pageFields } from './_pageFields'

export const StoriesPage: GlobalConfig = {
  slug: 'stories-page',
  label: 'Stories',
  admin: {
    hidden: true,
    group: 'Results',
    description:
      'Chrome fields for /stories: hero image labels + the shared Share-Cta block at the bottom (edited in d. Share-Cta). Patient-quote rows come from **h. Patient-Stories**. Hero title is hardcoded; edit imageHue / imageLabel / breadcrumbLabel here.',
  },
  access: { read: publishedOrAuthed, update: isAuthenticated },
  hooks: revalidateGlobalAfterChange(),
  fields: [
    ...pageFields({ hideHero: true }),
    { name: 'imageHue', type: 'number', min: 0, max: 6, defaultValue: 5,
      admin: { description: 'Painted-SVG fallback hue when no hero image is uploaded (0–6).' } },
    { name: 'imageLabel', type: 'text', localized: true, defaultValue: 'STORIES',
      admin: { description: 'Caption shown over the painted-SVG fallback / image card.' } },
    { name: 'breadcrumbLabel', type: 'text', localized: true, defaultValue: 'Stories',
      admin: { description: 'Last segment in the breadcrumb trail.' } },
  ],
}
