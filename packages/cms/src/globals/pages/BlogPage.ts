import type { GlobalConfig } from 'payload'
import { isAuthenticated, publishedOrAuthed } from '../../lib/access'
import { revalidateGlobalAfterChange } from '../../lib/revalidate'
import { pageFields } from './_pageFields'

export const BlogPage: GlobalConfig = {
  slug: 'blog-page',
  label: 'Blog',
  admin: {
    group: 'Publications',
    hidden: true,
    description:
      'Editorial content for /blog (post index): hero, "This issue" featured callout label, and "The archive" filter section chrome. Posts and tags are managed in the BlogPosts / BlogTags collections.',
  },
  access: { read: publishedOrAuthed, update: isAuthenticated },
  hooks: revalidateGlobalAfterChange(),
  fields: [
    ...pageFields({ hideHero: true }),
    {
      name: 'thisIssueEyebrow',
      type: 'text',
      defaultValue: 'This issue',
      admin: {
        description:
          'Eyebrow above the featured-post block on /blog (top of the page, under the hero).',
      },
    },
    {
      name: 'readTheEssayCtaLabel',
      type: 'text',
      defaultValue: 'Read the essay →',
      admin: { description: 'Link label at the foot of the featured post card.' },
    },
    {
      name: 'archiveSection',
      type: 'group',
      admin: {
        description:
          'The lower "archive" section of /blog — the grid of all past posts with the discipline filter.',
      },
      fields: [
        { name: 'eyebrow', label: 'Label above heading', type: 'text', defaultValue: 'The archive' },
        {
          name: 'headingPre',
          type: 'text',
          defaultValue: 'Recent ',
          admin: { description: 'Roman part of the H2, before the italic. Trailing space included.' },
        },
        {
          name: 'headingItalic',
          type: 'text',
          defaultValue: 'writing.',
          admin: { description: 'Italic part of the H2.' },
        },
        {
          name: 'lede',
          label: 'Intro paragraph',
          type: 'textarea',
          defaultValue:
            'Filter by discipline, or read down. New essays go out with the quarterly journal — subscribe at the foot of any page.',
        },
        {
          name: 'filterAllLabel',
          type: 'text',
          defaultValue: 'All',
          admin: { description: 'Label of the first filter button (shows every post).' },
        },
        {
          name: 'emptyStateCopy',
          type: 'text',
          defaultValue: 'No posts in this category yet.',
          admin: { description: 'Shown when the current filter has no matching posts.' },
        },
      ],
    },
  ],
}
