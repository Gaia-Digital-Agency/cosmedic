import type { GlobalConfig } from 'payload'
import { isAuthenticated, readPublic } from '../../lib/access'
import { revalidateGlobalAfterChange } from '../../lib/revalidate'

export const TreatmentsHero: GlobalConfig = {
  slug: 'treatments-hero',
  label: 'Hero',
  admin: {
    group: 'Procedures',
    description:
      'Hero (ChapterOpener) for both /treatments and /pricing pages. Edit each page\'s title and intro paragraph here.',
  },
  access: { read: readPublic, update: isAuthenticated },
  hooks: revalidateGlobalAfterChange(),
  fields: [
    // ── /treatments hero ──────────────────────────────────────────────────
    {
      name: 'treatments',
      type: 'group',
      admin: { description: 'Hero for the /treatments index page.' },
      fields: [
        { name: 'titleA', type: 'text', localized: true, defaultValue: 'Six disciplines,',
          admin: { description: 'First line (roman).' } },
        { name: 'titleB', type: 'text', localized: true, defaultValue: 'one sanctuary.',
          admin: { description: 'Second line (italic-friendly).' } },
        { name: 'lede', label: 'Intro paragraph', type: 'textarea', localized: true,
          defaultValue: 'A complete repertoire of cosmetic medicine practiced under one roof — surgical, non-surgical, restorative, and the careful coordination that holds it all together.',
          admin: { description: 'Intro paragraph beneath the title.' } },
        { name: 'heroImage', type: 'upload', relationTo: 'media',
          admin: { description: 'Hero image for /treatments.' } },
      ],
    },
    // ── /pricing hero ─────────────────────────────────────────────────────
    {
      name: 'pricing',
      type: 'group',
      admin: { description: 'Hero for the /pricing page.' },
      fields: [
        { name: 'titleA', type: 'text', localized: true, defaultValue: 'Every treatment,',
          admin: { description: 'First line (roman).' } },
        { name: 'titleB', type: 'text', localized: true, defaultValue: 'every price.',
          admin: { description: 'Second line (italic-friendly).' } },
        { name: 'lede', label: 'Intro paragraph', type: 'textarea', localized: true,
          defaultValue: 'The complete pricing index, organised by discipline. Prices are starting figures in IDR with an Australian-dollar equivalent.',
          admin: { description: 'Intro paragraph beneath the title.' } },
        { name: 'heroImage', type: 'upload', relationTo: 'media',
          admin: { description: 'Hero image for /pricing.' } },
      ],
    },
  ],
}
