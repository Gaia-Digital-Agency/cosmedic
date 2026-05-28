import type { GlobalConfig } from 'payload'
import { isAuthenticated, readPublic } from '../../lib/access'
import { revalidateGlobalAfterChange } from '../../lib/revalidate'

/**
 * Phase R8 — j. Blog-Post-Template.
 *
 * Singleton holding every chrome string shared across all /blog/<slug> pages.
 * Per-post hero/body/byline-data lives on the BlogPosts row; this global holds
 * only what is identical across every post: byline labels, "About the author"
 * section labels + CTAs, and the "More from the journal" related-posts block.
 */
export const BlogPostTemplate: GlobalConfig = {
  slug: 'blog-post-template',
  label: 'Blog Post Template',
  admin: {
    group: 'About',
    hidden: true,
    description:
      'Template-level chrome shared across every /blog/<slug> post. Per-post data (title, hero, body, author byline) lives on the BlogPosts row; this global holds only the labels + CTAs that are identical across all posts.',
  },
  access: { read: readPublic, update: isAuthenticated },
  hooks: revalidateGlobalAfterChange(),
  fields: [
    {
      name: 'byline',
      type: 'group',
      admin: { description: 'Labels in the byline row above the article body.' },
      fields: [
        { name: 'writtenByLabel', type: 'text', defaultValue: 'Written by' },
        { name: 'publishedLabel', type: 'text', defaultValue: 'Published' },
        { name: 'lengthLabel', type: 'text', defaultValue: 'Length' },
        { name: 'filedUnderLabel', type: 'text', defaultValue: 'Filed under' },
      ],
    },
    {
      name: 'aboutTheAuthor',
      type: 'group',
      admin: { description: 'The "About the author" section that appears after the article body.' },
      fields: [
        { name: 'eyebrowLabel', type: 'text', defaultValue: 'About the author' },
        { name: 'readFullProfileCta', type: 'text', defaultValue: 'Read full profile' },
        { name: 'bookConsultationCta', type: 'text', defaultValue: 'Book a consultation' },
      ],
    },
    {
      name: 'moreFromTheJournal',
      type: 'group',
      admin: { description: 'The "More from the journal" related-posts section at the foot of every post.' },
      fields: [
        { name: 'eyebrow', label: 'Label above heading', type: 'text', defaultValue: 'More from the journal' },
        {
          name: 'headingPre',
          type: 'text',
          defaultValue: 'Read ',
          admin: { description: 'Roman part of the H2, before the italic. Trailing space included.' },
        },
        {
          name: 'headingItalic',
          type: 'text',
          defaultValue: 'on.',
          admin: { description: 'Italic part of the H2.' },
        },
        { name: 'backToJournalCta', type: 'text', defaultValue: 'Back to the journal' },
      ],
    },
  ],
}
