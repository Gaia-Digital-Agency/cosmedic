import type { GlobalConfig } from 'payload'
import { isAuthenticated, publishedOrAuthed } from '../../lib/access'
import { revalidateGlobalAfterChange } from '../../lib/revalidate'
import { pageFields } from './_pageFields'

export const GalleryPage: GlobalConfig = {
  slug: 'gallery-page',
  label: 'Gallery',
  admin: {
    group: 'Results',
    description:
      'Chrome fields for /gallery: filter-bar labels + the shared Library-Cta block at the bottom (edited in c. Library-Cta). The before/after card grid is rendered from **g. Before-After-Cases**. Hero title is hardcoded; edit imageHue / imageLabel / breadcrumbLabel / filterBarLabel / countFormat here.',
  },
  access: { read: publishedOrAuthed, update: isAuthenticated },
  hooks: revalidateGlobalAfterChange(),
  fields: [
    ...pageFields({ hideHero: true }),
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
