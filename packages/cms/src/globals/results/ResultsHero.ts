import type { GlobalConfig } from 'payload'
import { isAuthenticated, readPublic } from '../../lib/access'
import { revalidateGlobalAfterChange } from '../../lib/revalidate'

export const ResultsHero: GlobalConfig = {
  slug: 'results-hero',
  label: 'Hero',
  admin: {
    group: 'Results',
    description:
      'ChapterOpener at the top of /results — chapter eyebrow, two-line title, lede, hero image, image hue, image label, breadcrumb label. Single source of truth for the /results hero.',
  },
  access: { read: readPublic, update: isAuthenticated },
  hooks: revalidateGlobalAfterChange(),
  fields: [
    { name: 'breadcrumbLabel', type: 'text', defaultValue: 'Results & Stories',
      admin: { description: 'Last segment in the breadcrumb trail.', hidden: true } },
    {
      name: 'title', type: 'group',
      admin: { description: 'Two-line headline. Line A renders roman; line B renders italic.' },
      fields: [
        { name: 'a', type: 'text', localized: true, defaultValue: 'Quietly',
          admin: { description: 'First line (roman).' } },
        { name: 'b', type: 'text', localized: true, defaultValue: 'transformative.',
          admin: { description: 'Second line (italic-friendly).' } },
      ],
    },
    { name: 'lede', label: 'Intro paragraph', type: 'textarea', localized: true,
      defaultValue:
        'A small selection of consented results paired with the stories behind them. Our complete library — over two hundred cases — is shared during private consultation.',
      admin: { description: 'Intro paragraph beneath the title (≈2 sentences).', hidden: true } },
    { name: 'heroImage', type: 'upload', relationTo: 'media',
      admin: { description: 'Hero image. Recommended ~1600×1200, JPEG/WebP.' } },
    { name: 'imageHue', type: 'number', min: 0, max: 6, defaultValue: 1,
      admin: { description: 'Painted-SVG fallback hue when no image is uploaded (0–6).' } },
    { name: 'imageLabel', type: 'text', localized: true, defaultValue: 'RESULTS & STORIES',
      admin: { description: 'Caption shown over the painted-SVG fallback / image card.' } },
    { name: 'chapter', type: 'text', localized: true, defaultValue: 'Chapter IV — Results & Stories',
      admin: { description: 'Small-caps eyebrow above the hero title.', hidden: true } },
  ],
}
