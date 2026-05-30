import type { GlobalConfig } from 'payload'
import { isAuthenticated, readPublic } from '../../lib/access'
import { revalidateGlobalAfterChange } from '../../lib/revalidate'

export const PricingHero: GlobalConfig = {
  slug: 'pricing-hero',
  label: 'Pricing Hero',
  admin: {
    group: 'Procedures',
    description:
      'ChapterOpener at the top of /pricing — chapter eyebrow, two-line title, lede, hero image, image hue, image label, breadcrumb label. Single source of truth for the /pricing hero.',
  },
  access: { read: readPublic, update: isAuthenticated },
  hooks: revalidateGlobalAfterChange(),
  fields: [
    { name: 'chapter', type: 'text', localized: true, defaultValue: 'Chapter X — Pricing',
      admin: { description: 'Small-caps eyebrow above the hero title, e.g. "Chapter X — Pricing".', hidden: true } },
    { name: 'titleA', type: 'text', localized: true, defaultValue: 'Every treatment,',
      admin: { description: 'First line of the two-line headline (roman).' } },
    { name: 'titleB', type: 'text', localized: true, defaultValue: 'every price.',
      admin: { description: 'Second line of the headline (italic-friendly).' } },
    { name: 'lede', label: 'Intro paragraph', type: 'textarea', localized: true,
      defaultValue:
        'The complete pricing index, organised by discipline. Prices are starting figures in IDR with an Australian-dollar equivalent. Every plan is quoted precisely after a private consultation; what we quote is what you pay.',
      admin: { description: 'Intro paragraph beneath the title (≈2 sentences).', hidden: true } },
    { name: 'heroImage', type: 'upload', relationTo: 'media',
      admin: { description: 'Hero image displayed on the right of the title block. Recommended ~1600×1200, JPEG/WebP.' } },
    { name: 'imageHue', type: 'number', min: 0, max: 6, defaultValue: 2,
      admin: { description: 'Painted-SVG fallback hue when no image is uploaded (0–6, brand palette).', hidden: true } },
    { name: 'imageLabel', type: 'text', localized: true, defaultValue: 'PRICING',
      admin: { description: 'Caption shown over the painted-SVG fallback / image card.', hidden: true } },
    { name: 'breadcrumbLabel', type: 'text', localized: true, defaultValue: 'Pricing',
      admin: { description: 'Last segment in the breadcrumb trail.', hidden: true } },
  ],
}
