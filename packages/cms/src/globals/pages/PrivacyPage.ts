import type { GlobalConfig } from 'payload'
import { isAuthenticated, publishedOrAuthed } from '../../lib/access'
import { revalidateGlobalAfterChange } from '../../lib/revalidate'
import { pageFields } from './_pageFields'

export const PrivacyPage: GlobalConfig = {
  slug: 'privacy-page',
  label: 'h. Privacy',
  admin: {
    group: 'h. About',
    description:
      'Editorial content for /privacy: hero, the three metadata lines (last updated / version / reading time), and the optional intro paragraph. The 10 numbered legal sections are edited in i. Privacy-Sections.',
  },
  access: { read: publishedOrAuthed, update: isAuthenticated },
  hooks: revalidateGlobalAfterChange(),
  fields: [
    ...pageFields(),
    {
      name: 'lastUpdatedDate',
      type: 'text',
      defaultValue: 'Last updated · 12 May 2026',
      admin: {
        description:
          'Left-most metadata line, e.g. "Last updated · 12 May 2026". Edit when the policy is revised.',
      },
    },
    {
      name: 'versionLine',
      type: 'text',
      defaultValue: 'Version 4.2 · Annual review cycle',
      admin: { description: 'Middle metadata line, e.g. "Version 4.2 · Annual review cycle".' },
    },
    {
      name: 'readingTimeLine',
      type: 'text',
      defaultValue: 'Read in 6 minutes',
      admin: { description: 'Right-most metadata line, e.g. "Read in 6 minutes".' },
    },
    {
      name: 'introParagraph',
      type: 'textarea',
      admin: {
        description:
          'Optional intro paragraph rendered above the numbered legal sections. Leave blank if not needed.',
      },
    },
    // 25.28 — additional labels + DPO contact section
    {
      name: 'imageLabel',
      type: 'text',
      defaultValue: 'PRIVACY',
      admin: { description: 'All-caps label overlaid on the hero image panel.' },
    },
    {
      name: 'tocHeading',
      type: 'text',
      defaultValue: 'Contents',
      admin: { description: 'Eyebrow label above the table-of-contents sidebar.' },
    },
    {
      name: 'dpo',
      type: 'group',
      admin: { description: 'Data Protection Officer contact block shown at the bottom of the Privacy page.' },
      fields: [
        { name: 'eyebrow', type: 'text', defaultValue: 'Data Protection Officer', admin: { description: 'Section eyebrow.' } },
        { name: 'headingA', type: 'text', defaultValue: 'Questions?', admin: { description: 'First part of the h2 (roman).' } },
        { name: 'headingB', type: 'text', defaultValue: 'Write to us.', admin: { description: 'Second part of the h2 (italic).' } },
        { name: 'lede', type: 'textarea', defaultValue: 'We answer within five working days. For urgent medical questions, please use the main contact form — it reaches the on-call concierge in minutes.', admin: { description: 'Short paragraph under the heading.' } },
        { name: 'emailLabel', type: 'text', defaultValue: 'Email', admin: { description: 'Mono label on the email row.' } },
        { name: 'email', type: 'text', defaultValue: 'privacy@bimcbali.com', admin: { description: 'DPO email address.' } },
        { name: 'postLabel', type: 'text', defaultValue: 'Post', admin: { description: 'Mono label on the postal address row.' } },
        { name: 'addressLine1', type: 'text', defaultValue: 'Data Protection Officer', admin: { description: 'First line of the postal address.' } },
        { name: 'addressLine2', type: 'text', defaultValue: 'BIMC CosMedic, Jl. Bypass Ngurah Rai 100X', admin: { description: 'Second line of the postal address.' } },
        { name: 'addressLine3', type: 'text', defaultValue: 'Kuta, Bali 80361, Indonesia', admin: { description: 'Third line of the postal address.' } },
        { name: 'generalContactLabel', type: 'text', defaultValue: 'General contact', admin: { description: 'Label on the ghost button linking to /contact.' } },
      ],
    },
  ],
}
