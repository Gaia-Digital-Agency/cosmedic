import type { GlobalConfig } from 'payload'
import { isAuthenticated, readPublic } from '../../lib/access'
import { revalidateGlobalAfterChange } from '../../lib/revalidate'

export const SurgeonsHero: GlobalConfig = {
  slug: 'surgeons-hero',
  label: 'Hero',
  admin: {
    group: 'Experts',
    description:
      'Hero (ChapterOpener) for the /surgeons index page. Single source of truth — used nowhere else.',
  },
  access: { read: readPublic, update: isAuthenticated },
  hooks: revalidateGlobalAfterChange(),
  fields: [
    { name: 'breadcrumbLabel', type: 'text', defaultValue: 'Surgeons',
      admin: { description: 'Last segment in the breadcrumb trail. e.g. "Surgeons".', hidden: true } },
    {
      name: 'title', label: 'Title', type: 'group',
      admin: { description: 'Two-line headline. Line A renders roman; line B renders italic.' },
      fields: [
        { name: 'a', type: 'text', required: true, localized: true,
          admin: { description: 'First line (roman). e.g. "Hands you".' } },
        { name: 'b', type: 'text', required: true, localized: true,
          admin: { description: 'Second line (italic). e.g. "can trust.".' } },
      ],
    },
    { name: 'lede', label: 'Intro paragraph', type: 'textarea', required: true, localized: true,
      admin: { description: 'Intro paragraph below the headline. Keep ~2 sentences.' } },
    { name: 'heroImage', type: 'upload', relationTo: 'media',
      admin: { description: 'Right-side image in the ChapterOpener. ~1200×1500 portrait crop preferred.' } },
    { name: 'imageHue', type: 'number', min: 0, max: 5, defaultValue: 2,
      admin: { description: 'Brand-palette colour token.', hidden: true } },
    { name: 'imageLabel', type: 'text', localized: true,
      admin: { description: 'Caption shown on the image card (uppercase mono), e.g. "THE PRACTITIONERS".' } },
    { name: 'chapter', type: 'text', required: true, localized: true,
      admin: { description: 'Eyebrow above the title, e.g. "Chapter III — The Practitioners".', hidden: true } },
  ],
}
