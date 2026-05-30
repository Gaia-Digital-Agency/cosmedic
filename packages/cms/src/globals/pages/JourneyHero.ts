import type { GlobalConfig } from 'payload'
import { isAuthenticated, readPublic } from '../../lib/access'
import { revalidateGlobalAfterChange } from '../../lib/revalidate'

export const JourneyHero: GlobalConfig = {
  slug: 'journey-hero',
  label: 'Hero',
  admin: {
    group: 'Journey',
    description:
      'Hero (ChapterOpener) at the top of /journey. Chapter eyebrow, two-line title, lede, hero image, and breadcrumb label.',
  },
  access: { read: readPublic, update: isAuthenticated },
  hooks: revalidateGlobalAfterChange(),
  fields: [
    {
      name: 'breadcrumbLabel',
      type: 'text',
      localized: true,
      defaultValue: 'Your Journey',
      admin: { description: 'Label shown for /journey in the breadcrumb trail.' },
    },
    {
      name: 'title',
      type: 'group',
      admin: { description: 'The two-line headline. Line A renders first, line B underneath.' },
      fields: [
        { name: 'a', type: 'text', localized: true, admin: { description: 'First line, e.g. "From enquiry,".' } },
        { name: 'b', type: 'text', localized: true, admin: { description: 'Second line, e.g. "to homecoming.".' } },
      ],
    },
    { name: 'lede', label: 'Intro paragraph', type: 'textarea', localized: true, admin: { description: 'Sub-paragraph under the title.', hidden: true } },
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
      localized: true,
      defaultValue: 'THE JOURNEY',
      admin: { description: 'Tiny mono label shown on the hero image card.' },
    },
    {
      name: 'chapter',
      type: 'text',
      localized: true,
      admin: { description: 'Chapter eyebrow above the title, e.g. "Chapter V — Your Journey".' },
    },
  ],
}
