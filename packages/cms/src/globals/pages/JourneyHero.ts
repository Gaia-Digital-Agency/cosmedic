import type { GlobalConfig } from 'payload'
import { isAuthenticated, readPublic } from '../../lib/access'
import { revalidateGlobalAfterChange } from '../../lib/revalidate'
import { apiWarningField } from '../../lib/api-warning'

export const JourneyHero: GlobalConfig = {
  slug: 'journey-hero',
  label: 'b. Hero',
  admin: {
    group: 'Journey',
    description:
      'Hero (ChapterOpener) at the top of /journey. Chapter eyebrow, two-line title, lede, hero image, and breadcrumb label.',
  },
  access: { read: readPublic, update: isAuthenticated },
  hooks: revalidateGlobalAfterChange(),
  fields: [
    apiWarningField,
    {
      name: 'chapter',
      type: 'text',
      admin: { description: 'Chapter eyebrow above the title, e.g. "Chapter V — Your Journey".' },
    },
    {
      name: 'title',
      type: 'group',
      admin: { description: 'The two-line headline. Line A renders first, line B underneath.' },
      fields: [
        { name: 'a', type: 'text', admin: { description: 'First line, e.g. "From enquiry,".' } },
        { name: 'b', type: 'text', admin: { description: 'Second line, e.g. "to homecoming.".' } },
      ],
    },
    { name: 'lede', type: 'textarea', admin: { description: 'Sub-paragraph under the title.' } },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Large image to the right of the chapter title.' },
    },
    {
      name: 'imageHue',
      type: 'number',
      defaultValue: 4,
      admin: {
        description:
          'Fallback hue index (0-5) used when no image is uploaded. Tints the painted-SVG placeholder.',
      },
    },
    {
      name: 'imageLabel',
      type: 'text',
      defaultValue: 'THE JOURNEY',
      admin: { description: 'Tiny mono label shown on the hero image card.' },
    },
    {
      name: 'breadcrumbLabel',
      type: 'text',
      defaultValue: 'Your Journey',
      admin: { description: 'Label shown for /journey in the breadcrumb trail.' },
    },
  ],
}
