import type { GlobalConfig } from 'payload'
import { isAuthenticated, readPublic } from '../../lib/access'
import { revalidateGlobalAfterChange } from '../../lib/revalidate'
import { apiWarningField } from '../../lib/api-warning'

export const SurgeonsHero: GlobalConfig = {
  slug: 'surgeons-hero',
  label: 'Hero',
  admin: {
    group: 'Doctors',
    description:
      'Hero (ChapterOpener) for the /surgeons index page. Single source of truth — used nowhere else.',
  },
  access: { read: readPublic, update: isAuthenticated },
  hooks: revalidateGlobalAfterChange(),
  fields: [
    apiWarningField,
    { name: 'breadcrumbLabel', type: 'text', defaultValue: 'Surgeons',
      admin: { description: 'Last segment in the breadcrumb trail. e.g. "Surgeons".' } },
    { name: 'titleA', type: 'text', required: true,
      admin: { description: 'First line of the two-line headline, roman. e.g. "Hands you".' } },
    { name: 'titleB', type: 'text', required: true,
      admin: { description: 'Second line of the headline, italic-rendered. e.g. "can trust.".' } },
    { name: 'lede', label: 'Intro paragraph', type: 'textarea', required: true,
      admin: { description: 'Intro paragraph below the headline. Keep ~2 sentences.' } },
    { name: 'heroImage', type: 'upload', relationTo: 'media',
      admin: { description: 'Right-side image in the ChapterOpener. ~1200×1500 portrait crop preferred.' } },
    { name: 'imageHue', type: 'number', min: 0, max: 5, defaultValue: 2,
      admin: { description: 'Brand-palette colour token (0–5) used as the placeholder gradient when the image fails to load.' } },
    { name: 'imageLabel', type: 'text',
      admin: { description: 'Caption shown on the image card (uppercase mono), e.g. "THE PRACTITIONERS".' } },
    { name: 'chapter', type: 'text', required: true,
      admin: { description: 'Eyebrow above the title, e.g. "Chapter III — The Practitioners".' } },
  ],
}
