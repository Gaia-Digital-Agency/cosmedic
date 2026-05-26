import type { GlobalConfig } from 'payload'
import { isAuthenticated, publishedOrAuthed } from '../../lib/access'
import { revalidateGlobalAfterChange } from '../../lib/revalidate'
import { pageFields } from './_pageFields'

export const StoriesPage: GlobalConfig = {
  slug: 'stories-page',
  label: 'f. Stories',
  admin: {
    group: 'Results',
    description:
      'Whole /stories editorial: hero + the shared Share-Cta block at the bottom (edited in d. Share-Cta — same Bucket — single source of truth across /results + /stories). The patient-quote rows are rendered from **h. Patient-Stories**. Use the chapterTitle / tagline / lede / heroImage fields for the ChapterOpener; the imageHue / imageLabel / breadcrumbLabel fields below complete the hero chrome.',
  },
  access: { read: publishedOrAuthed, update: isAuthenticated },
  hooks: revalidateGlobalAfterChange(),
  fields: [
    ...pageFields(),
    { name: 'imageHue', type: 'number', min: 0, max: 6, defaultValue: 5,
      admin: { description: 'Painted-SVG fallback hue when no hero image is uploaded (0–6).' } },
    { name: 'imageLabel', type: 'text', defaultValue: 'STORIES',
      admin: { description: 'Caption shown over the painted-SVG fallback / image card.' } },
    { name: 'breadcrumbLabel', type: 'text', defaultValue: 'Stories',
      admin: { description: 'Last segment in the breadcrumb trail.' } },
  ],
}
