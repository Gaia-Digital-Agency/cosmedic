import type { GlobalConfig } from 'payload'
import { isAuthenticated, publishedOrAuthed } from '../../lib/access'
import { revalidateGlobalAfterChange } from '../../lib/revalidate'
import { pageFields } from './_pageFields'

export const RecoveryStaysPage: GlobalConfig = {
  slug: 'recovery-stays-page',
  dbName: 'rec_stays_pg',
  label: 'e. Recovery-Stays',
  admin: {
    group: 'Journey',
    description:
      'Whole /recovery-stays editorial: hero, the 4-tile top stats row, "The portfolio" section heading (cards come from f. Villas), and "What\'s included" section heading + inclusions list. The legacy chapterTitle / tagline / lede / sections fields above remain available for the optional CmsExtraBlocks slot — the new groups below are what actually render the page.',
  },
  access: { read: publishedOrAuthed, update: isAuthenticated },
  hooks: revalidateGlobalAfterChange(),
  fields: [
    ...pageFields(),
    {
      name: 'hero',
      type: 'group',
      admin: { description: 'ChapterOpener at the top of /recovery-stays.' },
      fields: [
        { name: 'chapter', type: 'text', admin: { description: 'Chapter eyebrow, e.g. "Chapter VII — Recovery Stays".' } },
        {
          name: 'title',
          type: 'group',
          fields: [
            { name: 'a', type: 'text', admin: { description: 'First line of headline, e.g. "A villa, a".' } },
            { name: 'b', type: 'text', admin: { description: 'Second line, e.g. "quiet recovery.".' } },
          ],
        },
        { name: 'lede', label: 'Intro paragraph', type: 'textarea' },
        { name: 'heroImage', type: 'upload', relationTo: 'media',
          admin: { description: 'Hero image for the Recovery Stays page banner. Shown in the ChapterOpener on /recovery-stays. Recommended 1600×1200px portrait or landscape, JPG or WebP.' } },
        { name: 'imageHue', type: 'number', defaultValue: 4, admin: { description: 'Fallback hue index (0-5) when no image uploaded.' } },
        { name: 'imageLabel', type: 'text', defaultValue: 'RECOVERY STAYS' },
        { name: 'breadcrumbLabel', type: 'text', defaultValue: 'Recovery Stays' },
      ],
    },
    {
      name: 'topStats',
      type: 'array',
      admin: { description: 'Stat tiles directly under the hero. Up to 4 rows.' },
      fields: [
        { name: 'number', type: 'text', required: true, admin: { description: 'Big serif number, e.g. "6", "4", "5–21", "All".' } },
        { name: 'label', type: 'text', required: true },
        { name: 'italic', type: 'checkbox', defaultValue: false, admin: { description: 'Italicise the number (for word-like values such as "All" or ranges like "5–21").' } },
      ],
    },
    {
      name: 'portfolioSection',
      type: 'group',
      admin: { description: '"The portfolio" section heading. Villa cards are rendered from f. Villas, not here.' },
      fields: [
        { name: 'eyebrow', label: 'Label above heading', type: 'text', defaultValue: 'The portfolio' },
        { name: 'headingPre', type: 'text', defaultValue: '' },
        { name: 'headingItalic', type: 'text', defaultValue: 'Six' },
        { name: 'headingPost', type: 'text', defaultValue: ' places to recover.' },
        { name: 'lede', label: 'Intro paragraph', type: 'textarea' },
      ],
    },
    {
      name: 'inclusionsSection',
      type: 'group',
      admin: { description: '"What\'s included" section. Edit heading + lede here; edit each inclusion in the list below.' },
      fields: [
        { name: 'eyebrow', label: 'Label above heading', type: 'text', defaultValue: "What's included" },
        { name: 'headingPre', type: 'text', defaultValue: 'Every stay, ' },
        { name: 'headingItalic', type: 'text', defaultValue: 'considered.' },
        { name: 'headingPost', type: 'text', defaultValue: '' },
        { name: 'lede', label: 'Intro paragraph', type: 'textarea' },
      ],
    },
    {
      name: 'inclusions',
      type: 'array',
      admin: { description: 'Each row renders as one inclusion card (letter, title, body). Order here = display order.' },
      fields: [
        { name: 'letter', type: 'text', required: true, admin: { description: 'Single uppercase letter shown above the title, e.g. "A".' } },
        { name: 'title', type: 'text', required: true, admin: { description: 'e.g. "Welcome provisioning".' } },
        { name: 'body', type: 'textarea', required: true, admin: { description: 'One short sentence.' } },
      ],
    },
  ],
}
