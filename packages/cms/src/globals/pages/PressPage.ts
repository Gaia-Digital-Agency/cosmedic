import type { GlobalConfig } from 'payload'
import { isAuthenticated, publishedOrAuthed } from '../../lib/access'
import { revalidateGlobalAfterChange } from '../../lib/revalidate'
import { pageFields } from './_pageFields'

export const PressPage: GlobalConfig = {
  slug: 'press-page',
  label: 'Press',
  admin: {
    group: 'Publications',
    description:
      'All content for /press — hero, Accreditations section, In the Press section. Cards come from Awards collection; rows from PressMentions collection.',
  },
  access: { read: publishedOrAuthed, update: isAuthenticated },
  hooks: revalidateGlobalAfterChange(),
  fields: [
    ...pageFields({ hideHero: true }),
    { name: 'breadcrumbLabel', label: 'Breadcrumb — Page Label', type: 'text', defaultValue: 'Accreditations & Press',
      admin: { description: 'Second item in the /press breadcrumb trail.' } },
    { name: 'imageLabel', label: 'Image Label', type: 'text', defaultValue: 'ACCREDITATIONS',
      admin: { description: 'All-caps label overlaid on the hero image.' } },
    { name: 'topStats', label: 'Stats Row', type: 'array',
      admin: { description: '4 stat tiles shown below the hero on /press.' },
      fields: [
        { name: 'number', type: 'text', required: true, admin: { description: 'e.g. "28", "First"' } },
        { name: 'label', type: 'text', required: true, admin: { description: 'e.g. "Years of practice"' } },
        { name: 'italic', type: 'checkbox', defaultValue: false, admin: { description: 'Render number in italic (for word-like values e.g. "First").' } },
      ],
    },
    {
      name: 'accreditationsSection',
      type: 'group',
      admin: {
        description:
          'Section heading above the awards grid. The cards themselves are pulled from the Awards collection.',
      },
      fields: [
        { name: 'eyebrow', label: 'Label above heading', type: 'text', defaultValue: 'Accreditations' },
        { name: 'heading', type: 'text', defaultValue: 'The credentials we hold.' },
        {
          name: 'lede',
          label: 'Intro paragraph',
          type: 'textarea',
          defaultValue:
            'We have spent twenty-eight years building these credentials, one at a time, because they are the only thing that actually matters in our line of work.',
        },
      ],
    },
    {
      name: 'pressSection',
      type: 'group',
      admin: {
        description:
          'Section heading above the press-mention rows. The rows themselves are pulled from the PressMentions collection.',
      },
      fields: [
        { name: 'eyebrow', label: 'Label above heading', type: 'text', defaultValue: 'In the press' },
        {
          name: 'headingPre',
          type: 'text',
          defaultValue: 'Quietly, in ',
          admin: { description: 'Roman part of the H2, before the italic. Trailing space included.' },
        },
        {
          name: 'headingItalic',
          type: 'text',
          defaultValue: 'good company.',
          admin: { description: 'Italic part of the H2.' },
        },
        {
          name: 'lede',
          label: 'Intro paragraph',
          type: 'textarea',
          defaultValue:
            'A small selection from the editorial coverage of the past eighteen months. We do not pitch — but we are happy to talk to journalists who reach us directly.',
        },
      ],
    },
    {
      name: 'pressEnquiriesCtaLabel',
      type: 'text',
      defaultValue: 'Press enquiries',
      admin: { description: 'Label of the CTA button at the foot of /press.' },
    },
  ],
}
