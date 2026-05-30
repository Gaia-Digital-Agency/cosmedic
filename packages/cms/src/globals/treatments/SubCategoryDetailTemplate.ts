import type { GlobalConfig } from 'payload'
import { isAuthenticated, readPublic } from '../../lib/access'
import { revalidateGlobalAfterChange } from '../../lib/revalidate'

export const SubCategoryDetailTemplate: GlobalConfig = {
  slug: 'sub-category-detail-template',
  label: 'Sub-Category Template',
  admin: {
    group: 'Procedures',
    description:
      'Template-level strings shared across every /treatments/<sub-category> page (22 routes). Per-sub-category data (chapter, title, lede, sections, faqs, treatments list) lives on the row in f. Sub-Categories. Procedure rows come from g. Procedures. This global controls only the chrome that repeats on every sub-category detail page.',
  },
  access: { read: readPublic, update: isAuthenticated },
  hooks: revalidateGlobalAfterChange(),
  fields: [
    { name: 'chapterSeparator', type: 'text', defaultValue: ' · ',
      admin: { description: 'Glue characters between the parent discipline title and the sub-category title in the ChapterOpener eyebrow. e.g. " · " → "Surgical · Breast Surgery".' } },
    {
      name: 'toc',
      type: 'group',
      admin: { description: 'Sticky table-of-contents labels in the left sidebar.' },
      fields: [
        { name: 'onThisPageLabel', type: 'text', localized: true, defaultValue: 'On this page',
          admin: { description: 'Small-caps heading above the TOC list.' } },
        { name: 'overviewLabel', type: 'text', localized: true, defaultValue: 'Overview',
          admin: { description: 'Label for the Overview anchor.' } },
        { name: 'treatmentsLabel', type: 'text', localized: true, defaultValue: 'Treatments',
          admin: { description: 'Label for the Treatments anchor.' } },
        { name: 'faqsLabel', type: 'text', localized: true, defaultValue: 'FAQs',
          admin: { description: 'Label for the FAQs anchor.' } },
      ],
    },
    {
      name: 'takeAStep',
      type: 'group',
      admin: { description: '"Take a step" CTA stack below the TOC sidebar. The three CTAs link to /video-consult, /contact, and the WhatsApp concierge.' },
      fields: [
        { name: 'eyebrow', label: 'Label above heading', type: 'text', localized: true, defaultValue: 'Take a step',
          admin: { description: 'Small-caps eyebrow above the CTA stack.' } },
        { name: 'videoConsultLabel', type: 'text', localized: true, defaultValue: 'Book a video consult →',
          admin: { description: 'Solid CTA — links to /video-consult?procedure=<title>.' } },
        { name: 'estimateLabel', type: 'text', localized: true, defaultValue: 'Get a written estimate →',
          admin: { description: 'Outline CTA — links to /contact?intent=estimate&procedure=<title>.' } },
        { name: 'whatsappLabel', type: 'text', localized: true, defaultValue: 'WhatsApp the concierge →',
          admin: { description: 'Secondary CTA — opens WhatsApp using the clinic number from Homepage → Settings → whatsappNumber.' } },
        { name: 'replyLine', type: 'text', localized: true, defaultValue: 'Replies within 24 hours. No obligation.',
          admin: { description: 'Italic line beneath the CTA stack.' } },
      ],
    },
    {
      name: 'overview',
      type: 'group',
      admin: { description: 'In-page Overview section.' },
      fields: [
        { name: 'heading', type: 'text', localized: true, defaultValue: 'Overview',
          admin: { description: 'h2 heading above the overview body. The body itself comes from Sub-Categories → overview.' } },
      ],
    },
    {
      name: 'treatments',
      type: 'group',
      admin: { description: 'In-page Treatments section (the procedure accordion).' },
      fields: [
        { name: 'heading', type: 'text', localized: true, defaultValue: 'Treatments',
          admin: { description: 'h2 heading above the procedure rows.' } },
        { name: 'intro', type: 'textarea', localized: true,
          defaultValue:
            'The full list, with our typical price-from. Tap any treatment to expand details. Final quote is tailored after consultation.',
          admin: { description: 'Paragraph below the heading, above the procedure accordion.' } },
      ],
    },
    {
      name: 'faqs',
      type: 'group',
      admin: { description: 'In-page FAQs section. The questions themselves come from Sub-Categories → faqs.' },
      fields: [
        { name: 'heading', type: 'text', localized: true, defaultValue: 'Frequently asked',
          admin: { description: 'h2 heading above the FAQ accordion.' } },
      ],
    },
  ],
}
