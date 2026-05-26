import type { GlobalConfig } from 'payload'
import { isAuthenticated, readPublic } from '../../lib/access'
import { revalidateGlobalAfterChange } from '../../lib/revalidate'
import { apiWarningField } from '../../lib/api-warning'

export const SubCategoryDetailTemplate: GlobalConfig = {
  slug: 'sub-category-detail-template',
  label: 'i. Sub-Category-Template',
  admin: {
    group: 'Treatments',
    description:
      'Template-level strings shared across every /treatments/<sub-category> page (22 routes). Per-sub-category data (chapter, title, lede, sections, faqs, treatments list) lives on the row in f. Sub-Categories. Procedure rows come from g. Procedures. This global controls only the chrome that repeats on every sub-category detail page.',
  },
  access: { read: readPublic, update: isAuthenticated },
  hooks: revalidateGlobalAfterChange(),
  fields: [
    apiWarningField,
    { name: 'chapterSeparator', type: 'text', defaultValue: ' · ',
      admin: { description: 'Glue characters between the parent discipline title and the sub-category title in the ChapterOpener eyebrow. e.g. " · " → "Surgical · Breast Surgery".' } },
    {
      name: 'toc',
      type: 'group',
      admin: { description: 'Sticky table-of-contents labels in the left sidebar.' },
      fields: [
        { name: 'onThisPageLabel', type: 'text', defaultValue: 'On this page',
          admin: { description: 'Small-caps heading above the TOC list.' } },
        { name: 'overviewLabel', type: 'text', defaultValue: 'Overview',
          admin: { description: 'Label for the Overview anchor.' } },
        { name: 'treatmentsLabel', type: 'text', defaultValue: 'Treatments',
          admin: { description: 'Label for the Treatments anchor.' } },
        { name: 'faqsLabel', type: 'text', defaultValue: 'FAQs',
          admin: { description: 'Label for the FAQs anchor.' } },
      ],
    },
    {
      name: 'takeAStep',
      type: 'group',
      admin: { description: '"Take a step" CTA stack below the TOC sidebar. The three CTAs link to /video-consult, /contact, and the WhatsApp concierge.' },
      fields: [
        { name: 'eyebrow', type: 'text', defaultValue: 'Take a step',
          admin: { description: 'Small-caps eyebrow above the CTA stack.' } },
        { name: 'videoConsultLabel', type: 'text', defaultValue: 'Book a video consult →',
          admin: { description: 'Solid CTA — links to /video-consult?procedure=<title>.' } },
        { name: 'estimateLabel', type: 'text', defaultValue: 'Get a written estimate →',
          admin: { description: 'Outline CTA — links to /contact?intent=estimate&procedure=<title>.' } },
        { name: 'whatsappLabel', type: 'text', defaultValue: 'WhatsApp the concierge →',
          admin: { description: 'Secondary CTA — opens WhatsApp using the clinic number from a. Homepage → l. Settings → whatsappNumber.' } },
        { name: 'replyLine', type: 'text', defaultValue: 'Replies within 24 hours. No obligation.',
          admin: { description: 'Italic line beneath the CTA stack.' } },
      ],
    },
    {
      name: 'overview',
      type: 'group',
      admin: { description: 'In-page Overview section.' },
      fields: [
        { name: 'heading', type: 'text', defaultValue: 'Overview',
          admin: { description: 'h2 heading above the overview body. The body itself comes from f. Sub-Categories → overview.' } },
      ],
    },
    {
      name: 'treatments',
      type: 'group',
      admin: { description: 'In-page Treatments section (the procedure accordion).' },
      fields: [
        { name: 'heading', type: 'text', defaultValue: 'Treatments',
          admin: { description: 'h2 heading above the procedure rows.' } },
        { name: 'intro', type: 'textarea',
          defaultValue:
            'The full list, with our typical price-from. Tap any treatment to expand details. Final quote is tailored after consultation.',
          admin: { description: 'Paragraph below the heading, above the procedure accordion.' } },
      ],
    },
    {
      name: 'faqs',
      type: 'group',
      admin: { description: 'In-page FAQs section. The questions themselves come from f. Sub-Categories → faqs.' },
      fields: [
        { name: 'heading', type: 'text', defaultValue: 'Frequently asked',
          admin: { description: 'h2 heading above the FAQ accordion.' } },
      ],
    },
  ],
}
