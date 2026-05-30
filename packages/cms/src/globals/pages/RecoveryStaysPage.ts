import type { GlobalConfig } from 'payload'
import { isAuthenticated, publishedOrAuthed } from '../../lib/access'
import { revalidateGlobalAfterChange } from '../../lib/revalidate'
import { pageFields } from './_pageFields'

export const RecoveryStaysPage: GlobalConfig = {
  slug: 'recovery-stays-page',
  dbName: 'rec_stays_pg',
  label: 'Page',
  admin: {
    group: 'Journey',
    description:
      'All content for /recovery-stays — breadcrumb, hero, top stats, portfolio section, what\'s included heading. Villa cards come from the Villas collection.',
  },
  access: { read: publishedOrAuthed, update: isAuthenticated },
  hooks: revalidateGlobalAfterChange(),
  fields: [
    ...pageFields({ hideHero: true }),
    {
      name: 'hero',
      label: 'Hero',
      type: 'group',
      admin: { description: 'ChapterOpener at the top of /recovery-stays.' },
      fields: [
        { name: 'chapter', type: 'text', localized: true, admin: { description: 'Chapter eyebrow, e.g. "Chapter VII — Recovery Stays".' } },
        {
          name: 'title',
          type: 'group',
          fields: [
            { name: 'a', type: 'text', localized: true, admin: { description: 'First line of headline, e.g. "A villa, a".' } },
            { name: 'b', type: 'text', localized: true, admin: { description: 'Second line, e.g. "quiet recovery.".' } },
          ],
        },
        { name: 'lede', label: 'Intro paragraph', type: 'textarea', localized: true },
        { name: 'heroImage', type: 'upload', relationTo: 'media',
          admin: { description: 'Hero image for the Recovery Stays page banner. Shown in the ChapterOpener on /recovery-stays. Recommended 1600×1200px portrait or landscape, JPG or WebP.' } },
        { name: 'imageHue', type: 'number', defaultValue: 4, admin: { description: 'Fallback hue index (0-5) when no image uploaded.' } },
        { name: 'imageLabel', type: 'text', localized: true, defaultValue: 'RECOVERY STAYS' },
        { name: 'breadcrumbLabel', type: 'text', localized: true, defaultValue: 'Recovery Stays' },
      ],
    },
    {
      name: 'topStats',
      type: 'array',
      admin: { description: 'Stat tiles directly under the hero. Up to 4 rows.' },
      fields: [
        { name: 'number', type: 'text', required: true, admin: { description: 'Big serif number, e.g. "6", "4", "5–21", "All".' } },
        { name: 'label', type: 'text', required: true, localized: true },
        { name: 'italic', type: 'checkbox', defaultValue: false, admin: { description: 'Italicise the number (for word-like values such as "All" or ranges like "5–21").' } },
      ],
    },
    {
      name: 'portfolioSection',
      label: 'Portfolio Section',
      type: 'group',
      admin: { description: '"The portfolio" section heading. Villa cards are edited in the Villas collection, not here.' },
      fields: [
        { name: 'eyebrow', label: 'Label above heading', type: 'text', localized: true, defaultValue: 'The portfolio' },
        { name: 'headingPre', type: 'text', defaultValue: '' },
        { name: 'headingItalic', type: 'text', localized: true, defaultValue: 'Six' },
        { name: 'headingPost', type: 'text', localized: true, defaultValue: ' places to recover.' },
        { name: 'lede', label: 'Intro paragraph', type: 'textarea', localized: true },
      ],
    },
    {
      name: 'inclusionsSection',
      label: "What's Included",
      type: 'group',
      admin: { hidden: true, description: '"What\'s included" section. Edit heading + intro paragraph here; edit each inclusion in the Villas list below.' },
      fields: [
        { name: 'eyebrow', label: 'Label above heading', type: 'text', localized: true, defaultValue: "What's included" },
        { name: 'headingPre', type: 'text', localized: true, defaultValue: 'Every stay, ' },
        { name: 'headingItalic', type: 'text', localized: true, defaultValue: 'considered.' },
        { name: 'headingPost', type: 'text', defaultValue: '' },
        { name: 'lede', label: 'Intro paragraph', type: 'textarea', localized: true },
      ],
    },
    {
      name: 'inclusions',
      type: 'array',
      admin: { hidden: true, description: 'Each row renders as one inclusion card (letter, title, body). Order here = display order.' },
      fields: [
        { name: 'letter', type: 'text', required: true, admin: { description: 'Single uppercase letter shown above the title, e.g. "A".' } },
        { name: 'title', type: 'text', required: true, localized: true, admin: { description: 'e.g. "Welcome provisioning".' } },
        { name: 'body', type: 'textarea', required: true, localized: true, admin: { description: 'One short sentence.' } },
      ],
    },
  ],
}
