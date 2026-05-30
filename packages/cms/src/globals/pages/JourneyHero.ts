import type { GlobalConfig } from 'payload'
import { isAuthenticated, readPublic } from '../../lib/access'
import { revalidateGlobalAfterChange } from '../../lib/revalidate'

export const JourneyHero: GlobalConfig = {
  slug: 'journey-hero',
  label: 'Journey',
  admin: {
    group: 'Journey',
    description: 'All content for /journey — breadcrumb, hero, journey steps (from collection), stats tiles.',
  },
  access: { read: readPublic, update: isAuthenticated },
  hooks: revalidateGlobalAfterChange(),
  fields: [
    // ── Breadcrumb ────────────────────────────────────────────────────────────
    { name: 'breadcrumbLabel', label: 'Breadcrumb — Page Label', type: 'text', localized: true,
      defaultValue: 'Your Journey',
      admin: { description: 'Second item in the /journey breadcrumb trail.' } },

    // ── Hero Image ────────────────────────────────────────────────────────────
    { name: 'titleA', label: 'Title — Line A', type: 'text', localized: true,
      admin: { description: 'First line, e.g. "From enquiry,".' } },
    { name: 'titleB', label: 'Title — Line B', type: 'text', localized: true,
      admin: { description: 'Second line, e.g. "to homecoming.".' } },
    { name: 'lede', label: 'Intro paragraph', type: 'textarea', localized: true,
      admin: { description: 'Paragraph beneath the hero title.' } },
    { name: 'heroImage', type: 'upload', relationTo: 'media',
      admin: { description: 'Hero image for /journey.' } },
    { name: 'imageLabel', type: 'text', localized: true, defaultValue: 'THE JOURNEY',
      admin: { description: 'Mono label on the hero image card.' } },
    { name: 'imageHue', type: 'number', defaultValue: 4,
      admin: { description: 'SVG fallback hue (0–5).', hidden: true } },
    { name: 'chapter', type: 'text', localized: true,
      admin: { description: 'Chapter eyebrow above the title.', hidden: true } },

    // ── Stats ─────────────────────────────────────────────────────────────────
    { name: 'stats', label: 'Stats', type: 'array',
      admin: { description: 'Stat tiles at the bottom of /journey (e.g. 24h · 45min · 12mo).' },
      fields: [
        { name: 'number', type: 'text', required: true,
          admin: { description: 'Big serif number, e.g. "24h".' } },
        { name: 'label', type: 'text', required: true, localized: true,
          admin: { description: 'Caption under the number.' } },
        { name: 'italic', type: 'checkbox', defaultValue: false },
      ],
    },
  ],
}
