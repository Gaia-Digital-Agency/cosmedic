import type { GlobalConfig } from 'payload'
import { isAuthenticated, readPublic } from '../../lib/access'
import { revalidateGlobalAfterChange } from '../../lib/revalidate'

export const ContactHero: GlobalConfig = {
  slug: 'contact-hero',
  label: 'Hero',
  admin: {
    group: 'Contact',
    description: 'Hero block on /contact: chapter eyebrow, two-line title, intro paragraph, hero image, and breadcrumb label. Edit the image and copy here; the address / hours / phone shown lower on the page live on Homepage → Settings.',
  },
  access: { read: readPublic, update: isAuthenticated },
  hooks: revalidateGlobalAfterChange(),
  fields: [
    { name: 'breadcrumbLabel', type: 'text', defaultValue: 'Plan Your Journey',
      admin: { description: 'Label for the current page in the breadcrumb (the "Home → <this>" trail).', hidden: true } },
    {
      name: 'title', type: 'group',
      admin: { description: 'Two-line hero title. Line A is roman; line B renders italic-friendly.' },
      fields: [
        { name: 'a', type: 'text', localized: true, defaultValue: 'Begin, when',
          admin: { description: 'First line of the hero title.' } },
        { name: 'b', type: 'text', localized: true, defaultValue: 'you are ready.',
          admin: { description: 'Second line of the hero title (italic-friendly).' } },
      ],
    },
    { name: 'lede', label: 'Intro paragraph', type: 'textarea', localized: true,
      defaultValue: 'Write to us in your own time, in your own words. A concierge will reply within twenty-four hours, in English or Bahasa Indonesia. There is no obligation — and no pressure — to proceed.',
      admin: { description: 'Intro paragraph beneath the title.' } },
    { name: 'heroImage', type: 'upload', relationTo: 'media',
      admin: { description: 'Hero image displayed on the right of the title block. Recommended ~1600×1200, JPEG/WebP.' } },
    { name: 'imageHue', type: 'number', defaultValue: 3,
      admin: { description: 'Painted-SVG fallback hue when no image is uploaded (0–6, brand palette). 3 = deep accent.' } },
    { name: 'imageLabel', type: 'text', localized: true, defaultValue: 'PLAN YOUR JOURNEY',
      admin: { description: 'Caption label shown over the painted-SVG fallback if no hero image is uploaded.' } },
    { name: 'chapter', type: 'text', localized: true, defaultValue: 'Chapter VIII — Plan Your Journey',
      admin: { description: 'Small caps eyebrow above the hero title, e.g. "Chapter VIII — Plan Your Journey".', hidden: true } },
  ],
}
