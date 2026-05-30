import type { GlobalConfig } from 'payload'
import { isAuthenticated, readPublic } from '../../lib/access'
import { revalidateGlobalAfterChange } from '../../lib/revalidate'

export const DisciplineDetailTemplate: GlobalConfig = {
  slug: 'discipline-detail-template',
  label: 'Discipline Template',
  admin: {
    group: 'Treatments',
    hidden: true,
    description:
      'Template-level strings shared across every /treatments/<discipline> page (6 routes). Per-discipline data (chapter, title, lede, hero image, body sections, faqs, sub-categories list, procedures list) lives on the row in e. Disciplines. This global controls only the chrome that repeats on every discipline detail page.',
  },
  access: { read: readPublic, update: isAuthenticated },
  hooks: revalidateGlobalAfterChange(),
  fields: [
    {
      name: 'toc',
      type: 'group',
      admin: { description: 'Sticky table-of-contents labels in the left sidebar.' },
      fields: [
        { name: 'onThisPageLabel', type: 'text', localized: true, defaultValue: 'On this page',
          admin: { description: 'Small-caps heading above the TOC list.' } },
        { name: 'overviewLabel', type: 'text', localized: true, defaultValue: 'Overview',
          admin: { description: 'Label for the Overview anchor.' } },
        { name: 'subCategoriesLabel', type: 'text', localized: true, defaultValue: 'Sub-categories',
          admin: { description: 'Label for the Sub-categories anchor (shown only when the discipline has sub-categories).' } },
        { name: 'proceduresLabel', type: 'text', localized: true, defaultValue: 'Procedures',
          admin: { description: 'Label for the Procedures anchor (shown only when the discipline has direct procedures and no sub-categories).' } },
        { name: 'faqsLabel', type: 'text', localized: true, defaultValue: 'FAQs',
          admin: { description: 'Label for the FAQs anchor.' } },
      ],
    },
    {
      name: 'overview',
      type: 'group',
      admin: { description: 'In-page Overview section.' },
      fields: [
        { name: 'heading', type: 'text', localized: true, defaultValue: 'Overview',
          admin: { description: 'h2 heading above the discipline overview text. The overview body comes from Disciplines → overview.' } },
      ],
    },
    {
      name: 'chooseAFocus',
      type: 'group',
      admin: { description: '"Choose a focus" section that lists the sub-categories under a discipline.' },
      fields: [
        { name: 'heading', type: 'text', localized: true, defaultValue: 'Choose a focus',
          admin: { description: 'h2 heading above the sub-category list.' } },
        { name: 'bodyTemplate', type: 'textarea', localized: true,
          defaultValue:
            'This discipline is organised into {count} areas. Each page lists every treatment we offer with its starting price.',
          admin: { description: 'Body paragraph with the literal token {count} (replaced at render time with "two", "three", or the numeric count).' } },
        { name: 'availableLabel', type: 'text', localized: true, defaultValue: 'Read more →',
          admin: { description: 'CTA shown on a sub-category card when its detail page is live.' } },
        { name: 'comingLabel', type: 'text', localized: true, defaultValue: 'Coming v1.4',
          admin: { description: 'CTA shown on a sub-category card when the detail page is not yet published.' } },
      ],
    },
    {
      name: 'procedures',
      type: 'group',
      admin: { description: 'In-page Procedures section (rendered only when the discipline has procedures and no sub-categories).' },
      fields: [
        { name: 'heading', type: 'text', localized: true, defaultValue: 'Procedures',
          admin: { description: 'h2 heading above the procedure rows.' } },
        { name: 'intro', type: 'textarea', localized: true,
          defaultValue:
            'The full list, with our typical price-from. We will give you a precise quote during consultation.',
          admin: { description: 'Paragraph below the heading, above the procedure list.' } },
      ],
    },
    {
      name: 'faqs',
      type: 'group',
      admin: { description: 'In-page FAQs section. The questions themselves come from Disciplines → faqs.' },
      fields: [
        { name: 'heading', type: 'text', localized: true, defaultValue: 'Frequently asked',
          admin: { description: 'h2 heading above the FAQ accordion.' } },
      ],
    },
    {
      name: 'related',
      type: 'group',
      admin: { description: '"Related" cross-discipline carousel at the bottom of each /treatments/<discipline> page.' },
      fields: [
        { name: 'eyebrow', label: 'Label above heading', type: 'text', localized: true, defaultValue: 'Related',
          admin: { description: 'Small-caps eyebrow above the section title.' } },
        { name: 'headingItalic', type: 'text', localized: true, defaultValue: 'Often considered',
          admin: { description: 'First part of the heading rendered in italic.' } },
        { name: 'headingRoman', type: 'text', localized: true, defaultValue: 'alongside.',
          admin: { description: 'Second part of the heading rendered in roman.' } },
        { name: 'ledeTemplate', type: 'textarea', localized: true,
          defaultValue:
            'Many of our patients combine treatments across disciplines. These pair particularly well with {discipline}.',
          admin: { description: 'Intro paragraph with the literal token {discipline} (replaced at render time with the current discipline title in lowercase).' } },
      ],
    },
  ],
}
