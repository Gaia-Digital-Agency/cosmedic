import type { GlobalConfig } from 'payload'
import { isAuthenticated, publishedOrAuthed } from '../../lib/access'
import { revalidateGlobalAfterChange } from '../../lib/revalidate'
import { pageFields } from './_pageFields'

export const GalleryPage: GlobalConfig = {
  slug: 'gallery-page',
  label: 'e. Gallery',
  admin: {
    group: 'd. Results',
    description:
      'Whole /gallery editorial: hero + filter-bar chrome + the shared Library-Cta block at the bottom (edited in c. Library-Cta — same Bucket — single source of truth across /results + /gallery). The before/after card grid is rendered from **g. Before-After-Cases**. Use the chapterTitle / tagline / lede / heroImage fields for the ChapterOpener; the imageHue / imageLabel / breadcrumbLabel / filterBarLabel / countFormat fields below complete the hero + filter chrome.',
  },
  access: { read: publishedOrAuthed, update: isAuthenticated },
  hooks: revalidateGlobalAfterChange(),
  fields: [
    ...pageFields(),
    { name: 'imageHue', type: 'number', min: 0, max: 6, defaultValue: 1,
      admin: { description: 'Painted-SVG fallback hue when no hero image is uploaded (0–6).' } },
    { name: 'imageLabel', type: 'text', defaultValue: 'GALLERY',
      admin: { description: 'Caption shown over the painted-SVG fallback / image card.' } },
    { name: 'breadcrumbLabel', type: 'text', defaultValue: 'Gallery',
      admin: { description: 'Last segment in the breadcrumb trail.' } },
    { name: 'filterBarLabel', type: 'text', defaultValue: 'Featured cases',
      admin: { description: 'Left-side filter-bar label above the grid.' } },
    { name: 'countFormat', type: 'text', defaultValue: '{n} cases · facial',
      admin: { description: 'Right-side count label. Use {n} as a placeholder for the number of cases.' } },
  ],
}
