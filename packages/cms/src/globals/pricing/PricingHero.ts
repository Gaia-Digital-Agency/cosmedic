import type { GlobalConfig } from 'payload'
import { isAuthenticated, readPublic } from '../../lib/access'
import { revalidateGlobalAfterChange } from '../../lib/revalidate'
import { apiWarningField } from '../../lib/api-warning'

export const PricingHero: GlobalConfig = {
  slug: 'pricing-hero',
  label: 'Hero',
  admin: {
    group: 'Pricing',
    description:
      'ChapterOpener at the top of /pricing — chapter eyebrow, two-line title, lede, hero image, image hue, image label, breadcrumb label. Single source of truth for the /pricing hero.',
  },
  access: { read: readPublic, update: isAuthenticated },
  hooks: revalidateGlobalAfterChange(),
  fields: [
    apiWarningField,
    { name: 'chapter', type: 'text', defaultValue: 'Chapter X — Pricing',
      admin: { description: 'Small-caps eyebrow above the hero title, e.g. "Chapter X — Pricing".' } },
    { name: 'titleA', type: 'text', defaultValue: 'Every treatment,',
      admin: { description: 'First line of the two-line headline (roman).' } },
    { name: 'titleB', type: 'text', defaultValue: 'every price.',
      admin: { description: 'Second line of the headline (italic-friendly).' } },
    { name: 'lede', label: 'Intro paragraph', type: 'textarea',
      defaultValue:
        'The complete pricing index, organised by discipline. Prices are starting figures in IDR with an Australian-dollar equivalent. Every plan is quoted precisely after a private consultation; what we quote is what you pay.',
      admin: { description: 'Intro paragraph beneath the title (≈2 sentences).' } },
    { name: 'heroImage', type: 'upload', relationTo: 'media',
      admin: { description: 'Hero image displayed on the right of the title block. Recommended ~1600×1200, JPEG/WebP.' } },
    { name: 'imageHue', type: 'number', min: 0, max: 6, defaultValue: 2,
      admin: { description: 'Painted-SVG fallback hue when no image is uploaded (0–6, brand palette).' } },
    { name: 'imageLabel', type: 'text', defaultValue: 'PRICING',
      admin: { description: 'Caption shown over the painted-SVG fallback / image card.' } },
    { name: 'breadcrumbLabel', type: 'text', defaultValue: 'Pricing',
      admin: { description: 'Last segment in the breadcrumb trail.' } },
  ],
}
