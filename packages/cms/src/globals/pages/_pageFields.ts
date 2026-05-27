/**
 * Shared field factory for the 14 Page Globals.
 *
 * Each editorial page (Home, Pricing, Journey, …) is a Payload Global — singleton
 * record — so its admin.group can live in the bucket that mirrors the site IA.
 *
 * The field shape mirrors the original `Pages` collection 1:1 so the data layer
 * in packages/web/src/lib/cms.ts can keep its `pages: CmsPage[]` interface
 * untouched (Rule 3 — visual invariance).
 *
 * `slug` and `route` are intentionally preserved (not strictly needed for a
 * singleton) so existing `findPageBySlug` / `findPageByRoute` adapters keep
 * working without per-call mapping.
 */

import type { Block, Field } from 'payload'
import { publishStatusField, seoGroup } from '../../lib/seo'

const pageBlocks: Block[] = [
  {
    slug: 'richText',
    labels: { singular: 'Rich Text', plural: 'Rich Text Blocks' },
    fields: [
      { name: 'eyebrow', label: 'Label above heading', type: 'text' },
      { name: 'heading', type: 'text' },
      { name: 'body', type: 'richText', required: true },
    ],
  },
  {
    slug: 'imageGrid',
    labels: { singular: 'Image Grid', plural: 'Image Grids' },
    fields: [
      { name: 'heading', type: 'text' },
      {
        name: 'columns',
        type: 'select',
        defaultValue: '3',
        options: ['2', '3', '4'].map((v) => ({ label: v + ' columns', value: v })),
      },
      {
        name: 'images',
        type: 'array',
        required: true,
        minRows: 1,
        fields: [
          { name: 'image', type: 'upload', relationTo: 'media', required: true },
          { name: 'caption', type: 'text' },
        ],
      },
    ],
  },
  {
    slug: 'ctaBand',
    labels: { singular: 'CTA Band', plural: 'CTA Bands' },
    fields: [
      { name: 'heading', type: 'text', required: true },
      { name: 'lede', label: 'Intro paragraph', type: 'textarea' },
      { name: 'primaryLabel', type: 'text' },
      { name: 'primaryHref', type: 'text' },
      { name: 'secondaryLabel', type: 'text' },
      { name: 'secondaryHref', type: 'text' },
    ],
  },
  {
    slug: 'stats',
    fields: [
      { name: 'heading', type: 'text' },
      {
        name: 'items',
        type: 'array',
        minRows: 1,
        fields: [
          { name: 'number', type: 'text', required: true, admin: { description: 'e.g. "28", "#1"' } },
          { name: 'label', type: 'text', required: true },
          { name: 'sourceNote', type: 'text' },
        ],
      },
    ],
  },
  {
    slug: 'faqAccordion',
    labels: { singular: 'FAQ Accordion', plural: 'FAQ Accordions' },
    fields: [
      { name: 'heading', type: 'text' },
      {
        name: 'items',
        type: 'array',
        minRows: 1,
        fields: [
          { name: 'q', type: 'text', required: true },
          { name: 'a', type: 'textarea', required: true },
        ],
      },
    ],
  },
  {
    slug: 'procedureList',
    fields: [
      { name: 'heading', type: 'text' },
      { name: 'filterDiscipline', type: 'relationship', relationTo: 'disciplines' },
      { name: 'filterSubCategory', type: 'relationship', relationTo: 'sub-categories' },
      {
        name: 'layout',
        type: 'select',
        defaultValue: 'grid',
        options: ['grid', 'list', 'featured'].map((v) => ({ label: v, value: v })),
      },
      { name: 'limit', type: 'number', defaultValue: 6 },
    ],
  },
  {
    slug: 'surgeonList',
    fields: [
      { name: 'heading', type: 'text' },
      {
        name: 'filterGroup',
        type: 'select',
        options: [
          { label: 'All', value: 'all' },
          { label: 'Plastic Surgery', value: 'plastic-surgery' },
          { label: 'Aesthetic Medicine', value: 'aesthetic-medicine' },
        ],
      },
      {
        name: 'layout',
        type: 'select',
        defaultValue: 'strip',
        options: ['strip', 'grid'].map((v) => ({ label: v, value: v })),
      },
    ],
  },
  {
    slug: 'baGrid',
    labels: { singular: 'B&A Grid', plural: 'B&A Grids' },
    fields: [
      { name: 'heading', type: 'text' },
      { name: 'filterProcedure', type: 'relationship', relationTo: 'procedures' },
      { name: 'limit', type: 'number', defaultValue: 6 },
      { name: 'featuredOnly', type: 'checkbox', defaultValue: false },
    ],
  },
  {
    slug: 'testimonialList',
    fields: [
      { name: 'heading', type: 'text' },
      { name: 'count', type: 'number', defaultValue: 3 },
      { name: 'featuredOnly', type: 'checkbox', defaultValue: false },
    ],
  },
  {
    slug: 'recoveryStayList',
    fields: [
      { name: 'heading', type: 'text' },
      { name: 'limit', type: 'number', defaultValue: 6 },
    ],
  },
  {
    slug: 'pressMentionList',
    fields: [
      { name: 'heading', type: 'text' },
      { name: 'limit', type: 'number', defaultValue: 8 },
    ],
  },
  {
    slug: 'contactForm',
    fields: [
      { name: 'heading', type: 'text' },
      { name: 'lede', label: 'Intro paragraph', type: 'textarea' },
      { name: 'sourceCta', type: 'text', admin: { description: 'Recorded against any submission' } },
    ],
  },
  {
    slug: 'journeyStepList',
    fields: [
      { name: 'heading', type: 'text' },
      {
        name: 'filterCategory',
        type: 'select',
        options: [
          { label: 'All', value: 'all' },
          { label: 'Consultation', value: 'consult' },
          { label: 'Medical', value: 'medical' },
          { label: 'Surgical', value: 'surgical' },
          { label: 'Recovery', value: 'recovery' },
          { label: 'Follow-up', value: 'follow-up' },
        ],
      },
    ],
  },
  {
    slug: 'externalEmbed',
    labels: { singular: 'External Embed', plural: 'External Embeds' },
    fields: [
      { name: 'heading', type: 'text' },
      { name: 'iframeUrl', type: 'text' },
      { name: 'html', type: 'textarea' },
    ],
  },
  {
    slug: 'notes',
    labels: { singular: 'Editor Notes', plural: 'Editor Notes' },
    fields: [
      {
        name: 'kind',
        type: 'select',
        defaultValue: 'info',
        options: ['info', 'warning', 'tip', 'disclaimer'].map((v) => ({ label: v, value: v })),
      },
      { name: 'heading', type: 'text' },
      { name: 'body', type: 'richText', required: true },
    ],
  },
]

export type PageFieldsOptions = {
  /**
   * When TRUE, the chapterTitle / tagline / lede / heroImage fields are omitted.
   * Use on page Globals whose hero is owned by a dedicated section Global
   * (e.g. surgeons-page hero lives on surgeons-hero) to keep editing
   * single-sourced and avoid duplicate fields on the same page. (R4.)
   */
  hideHero?: boolean
}

export function pageFields(options: PageFieldsOptions = {}): Field[] {
  const hero: Field[] = options.hideHero
    ? []
    : [
        {
          name: 'chapterTitle',
          type: 'group',
          fields: [
            { name: 'a', type: 'text' },
            { name: 'b', type: 'text' },
          ],
        },
        { name: 'tagline', type: 'text' },
        { name: 'lede', label: 'Intro paragraph', type: 'textarea' },
        { name: 'heroImage', type: 'upload', relationTo: 'media',
          admin: { description: 'Hero image for this page. Displayed in the ChapterOpener banner at the top of the page. Recommended 1600×1200px, JPG or WebP.' } },
      ]
  return [
    { name: 'title', type: 'text', required: true, admin: { description: 'Admin label only' } },
    {
      name: 'slug',
      type: 'text',
      required: true,
      admin: { description: 'Page slug used by web routes. Do not change once live.' },
    },
    {
      name: 'route',
      type: 'text',
      required: true,
      admin: { description: 'URL route this page renders on, e.g. "/", "/journey", "/pricing".' },
    },
    ...hero,
    {
      name: 'sections',
      type: 'blocks',
      admin: { description: 'Composable body sections — pick from the block library.' },
      blocks: pageBlocks,
    },
    publishStatusField,
    seoGroup,
  ]
}
