import type { GlobalConfig } from 'payload'
import { isAuthenticated, readPublic } from '../../lib/access'
import { revalidateGlobalAfterChange } from '../../lib/revalidate'

export const JourneyHero: GlobalConfig = {
  slug: 'journey-hero',
  label: 'Journey',
  admin: {
    group: 'Journey',
    description: 'All content for /journey and /recovery-stays. Web page order top to bottom.',
  },
  access: { read: readPublic, update: isAuthenticated },
  hooks: revalidateGlobalAfterChange(),
  fields: [
    // ── /journey — Breadcrumb ─────────────────────────────────────────────────
    { name: 'breadcrumbLabel', label: 'Breadcrumb — Page Label', type: 'text', localized: true,
      defaultValue: 'Your Journey',
      admin: { description: 'Second item in the /journey breadcrumb trail.' } },

    // ── /journey — Hero Image ─────────────────────────────────────────────────
    { name: 'titleA', label: 'Title — Line A', type: 'text', localized: true,
      admin: { description: 'First line, e.g. "From enquiry,".' } },
    { name: 'titleB', label: 'Title — Line B', type: 'text', localized: true,
      admin: { description: 'Second line, e.g. "to homecoming.".' } },
    { name: 'lede', label: 'Intro paragraph', type: 'textarea', localized: true,
      admin: { description: 'Paragraph beneath the /journey hero title.' } },
    { name: 'heroImage', type: 'upload', relationTo: 'media',
      admin: { description: 'Hero image for /journey.' } },
    { name: 'imageLabel', type: 'text', localized: true, defaultValue: 'THE JOURNEY',
      admin: { description: 'Mono label on the hero image card.' } },
    { name: 'imageHue', type: 'number', defaultValue: 4,
      admin: { description: 'SVG fallback hue (0–5).', hidden: true } },
    { name: 'chapter', type: 'text', localized: true,
      admin: { description: 'Chapter eyebrow above the /journey title.', hidden: true } },

    // ── /journey — Stats ──────────────────────────────────────────────────────
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

    // ── /recovery-stays ───────────────────────────────────────────────────────
    { name: 'recoveryStays', label: 'Recovery Stays', type: 'group',
      admin: { description: 'All content for /recovery-stays — breadcrumb, hero, stats, portfolio, what\'s included.' },
      fields: [
        // Breadcrumb
        { name: 'breadcrumbLabel', label: 'Breadcrumb — Page Label', type: 'text', localized: true,
          defaultValue: 'Recovery Stays' },

        // Hero Image
        { name: 'hero', label: 'Hero Image', type: 'group', fields: [
          { name: 'title', type: 'group', fields: [
            { name: 'a', label: 'Two Line — TitleA', type: 'text', localized: true },
            { name: 'b', label: 'Two Line — TitleB', type: 'text', localized: true },
          ] },
          { name: 'lede', label: 'Paragraph', type: 'textarea', localized: true },
          { name: 'heroImage', label: 'Image', type: 'upload', relationTo: 'media' },
          { name: 'imageLabel', label: 'Image Label', type: 'text', localized: true,
            defaultValue: 'RECOVERY STAYS' },
          { name: 'imageHue', type: 'number', defaultValue: 4, admin: { hidden: true } },
          { name: 'chapter', type: 'text', localized: true, admin: { hidden: true } },
        ] },

        // Top Stats
        { name: 'topStats', label: 'Top Stats', type: 'array',
          admin: { description: 'Stat tiles directly under the /recovery-stays hero.' },
          fields: [
            { name: 'number', type: 'text', required: true },
            { name: 'label', type: 'text', required: true, localized: true },
            { name: 'italic', type: 'checkbox', defaultValue: false },
          ],
        },

        // Portfolio Section
        { name: 'portfolioSection', label: 'Portfolio Section', type: 'group',
          admin: { description: '"The portfolio" section. Villa cards come from the Villas collection.' },
          fields: [
            { name: 'eyebrow', label: 'Eyebrow', type: 'text', localized: true, defaultValue: 'The portfolio' },
            { name: 'headingPre', label: 'Two Line — TitleA', type: 'text', defaultValue: '' },
            { name: 'headingItalic', label: 'Two Line — TitleB', type: 'text', localized: true, defaultValue: 'Six' },
            { name: 'headingPost', label: 'Title C (roman tail)', type: 'text', localized: true, defaultValue: ' places to recover.' },
            { name: 'lede', label: 'Paragraph', type: 'textarea', localized: true },
          ],
        },

        // What's Included
        { name: 'inclusionsSection', label: "What's Included", type: 'group',
          admin: { description: '"What\'s included" section heading.' },
          fields: [
            { name: 'eyebrow', label: 'Eyebrow', type: 'text', localized: true, defaultValue: "What's included" },
            { name: 'headingPre', label: 'Two Line — TitleA', type: 'text', localized: true, defaultValue: 'Every stay, ' },
            { name: 'headingItalic', label: 'Two Line — TitleB', type: 'text', localized: true, defaultValue: 'considered.' },
            { name: 'headingPost', label: 'Title C (roman tail)', type: 'text', defaultValue: '' },
            { name: 'lede', label: 'Paragraph', type: 'textarea', localized: true },
          ],
        },
      ],
    },
  ],
}
