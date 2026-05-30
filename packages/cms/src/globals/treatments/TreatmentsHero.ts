import type { GlobalConfig } from 'payload'
import { isAuthenticated, readPublic } from '../../lib/access'
import { revalidateGlobalAfterChange } from '../../lib/revalidate'

export const TreatmentsHero: GlobalConfig = {
  slug: 'treatments-hero',
  label: 'Hero',
  admin: {
    group: 'Treatments',
    description:
      'ChapterOpener at the top of /treatments — chapter eyebrow, two-line title, lede, hero image, image hue, image label, breadcrumb label. Single source of truth for the /treatments index hero.',
  },
  access: { read: readPublic, update: isAuthenticated },
  hooks: revalidateGlobalAfterChange(),
  fields: [
    { name: 'chapter', type: 'text', localized: true, defaultValue: 'Chapter II — The Repertoire',
      admin: { description: 'Small-caps eyebrow above the hero title, e.g. "Chapter II — The Repertoire".', hidden: true } },
    { name: 'titleA', type: 'text', localized: true, defaultValue: 'Six disciplines,',
      admin: { description: 'First line of the two-line headline (roman).' } },
    { name: 'titleB', type: 'text', localized: true, defaultValue: 'one sanctuary.',
      admin: { description: 'Second line of the headline (italic-friendly).' } },
    { name: 'lede', label: 'Intro paragraph', type: 'textarea', localized: true,
      defaultValue:
        'A complete repertoire of cosmetic medicine practiced under one roof — surgical, non-surgical, restorative, and the careful coordination that holds it all together.',
      admin: { description: 'Intro paragraph beneath the title.', hidden: true } },
    { name: 'heroImage', type: 'upload', relationTo: 'media',
      admin: { description: 'Hero image displayed alongside the title block. Recommended ~1600×1200, JPEG/WebP. Falls back to the painted-SVG when blank.' } },
    { name: 'imageHue', type: 'number', min: 0, max: 6, defaultValue: 1,
      admin: { description: 'Painted-SVG fallback hue when no image is uploaded (0–6, brand palette).', hidden: true } },
    { name: 'imageLabel', type: 'text', localized: true, defaultValue: 'THE REPERTOIRE',
      admin: { description: 'Caption shown over the painted-SVG fallback / image card.', hidden: true } },
    { name: 'breadcrumbLabel', type: 'text', localized: true, defaultValue: 'Treatments',
      admin: { description: 'Last segment in the breadcrumb trail.', hidden: true } },
  ],
}
