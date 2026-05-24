import type { GlobalConfig } from 'payload'
import { isAuthenticated, publishedOrAuthed } from '../../lib/access'
import { revalidateGlobalAfterChange } from '../../lib/revalidate'
import { pageFields } from './_pageFields'

export const PressPage: GlobalConfig = {
  slug: 'press-page',
  label: 'e. Press',
  admin: {
    group: 'h. About',
    description:
      'Editorial content for /press: hero + the two section headings (Accreditations + In the press). Each accreditation card comes from the Awards collection; each press row from PressMentions. Edit those collections to add/remove items.',
  },
  access: { read: publishedOrAuthed, update: isAuthenticated },
  hooks: revalidateGlobalAfterChange(),
  fields: [
    ...pageFields(),
    {
      name: 'accreditationsSection',
      type: 'group',
      admin: {
        description:
          'Section heading above the awards grid. The cards themselves are pulled from the Awards collection.',
      },
      fields: [
        { name: 'eyebrow', type: 'text', defaultValue: 'Accreditations' },
        { name: 'heading', type: 'text', defaultValue: 'The credentials we hold.' },
        {
          name: 'lede',
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
        { name: 'eyebrow', type: 'text', defaultValue: 'In the press' },
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
