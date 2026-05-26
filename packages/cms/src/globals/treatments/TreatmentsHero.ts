import type { GlobalConfig } from 'payload'
import { isAuthenticated, readPublic } from '../../lib/access'
import { revalidateGlobalAfterChange } from '../../lib/revalidate'
import { apiWarningField } from '../../lib/api-warning'

export const TreatmentsHero: GlobalConfig = {
  slug: 'treatments-hero',
  label: 'b. Hero',
  admin: {
    group: 'Treatments',
    description:
      'ChapterOpener at the top of /treatments — chapter eyebrow, two-line title, lede, hero image, image hue, image label, breadcrumb label. Single source of truth for the /treatments index hero.',
  },
  access: { read: readPublic, update: isAuthenticated },
  hooks: revalidateGlobalAfterChange(),
  fields: [
    apiWarningField,
    { name: 'chapter', type: 'text', defaultValue: 'Chapter II — The Repertoire',
      admin: { description: 'Small-caps eyebrow above the hero title, e.g. "Chapter II — The Repertoire".' } },
    { name: 'titleA', type: 'text', defaultValue: 'Six disciplines,',
      admin: { description: 'First line of the two-line headline (roman).' } },
    { name: 'titleB', type: 'text', defaultValue: 'one sanctuary.',
      admin: { description: 'Second line of the headline (italic-friendly).' } },
    { name: 'lede', label: 'Intro paragraph', type: 'textarea',
      defaultValue:
        'A complete repertoire of cosmetic medicine practiced under one roof — surgical, non-surgical, restorative, and the careful coordination that holds it all together.',
      admin: { description: 'Lede paragraph beneath the title.' } },
    { name: 'heroImage', type: 'upload', relationTo: 'media',
      admin: { description: 'Hero image displayed alongside the title block. Recommended ~1600×1200, JPEG/WebP. Falls back to the painted-SVG when blank.' } },
    { name: 'imageHue', type: 'number', min: 0, max: 6, defaultValue: 1,
      admin: { description: 'Painted-SVG fallback hue when no image is uploaded (0–6, brand palette).' } },
    { name: 'imageLabel', type: 'text', defaultValue: 'THE REPERTOIRE',
      admin: { description: 'Caption shown over the painted-SVG fallback / image card.' } },
    { name: 'breadcrumbLabel', type: 'text', defaultValue: 'Treatments',
      admin: { description: 'Last segment in the breadcrumb trail.' } },
  ],
}
