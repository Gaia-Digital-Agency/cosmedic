import type { CollectionConfig } from 'payload'
import { isAuthenticated, publishedOrAuthed } from '../lib/access'
import { seoGroup, publishStatusField } from '../lib/seo'

/**
 * Pages = the "even beyond what's on db" surface.
 *
 * One record per route that needs hand-crafted hero + body that isn't captured by a
 * catalogue collection. Routes covered: /, /journey, /gallery, /stories, /press, /privacy,
 * /contact, /video-consult, /pricing (hero text only — table reads from PriceListItems).
 *
 * Editors can:
 *  - rewrite hero title, lede, tagline
 *  - upload/swap hero image
 *  - add/remove/reorder body sections (richText, image grids, CTA bands, stats, FAQ, etc.)
 *  - override SEO per page
 *
 * The web's existing static section components stay as fallbacks when a Page record is
 * absent; once a Page record exists for the route, its content takes precedence.
 */
export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'route', 'publishStatus'],
    group: 'Editorial',
    description: 'Per-route editorial overrides — hero / lede / body sections / SEO. Used wherever the page is not driven by a catalogue collection.',
  },
  access: {
    read: publishedOrAuthed,
    create: isAuthenticated,
    update: isAuthenticated,
    delete: isAuthenticated,
  },
  fields: [
    { name: 'title', type: 'text', required: true, admin: { description: 'Admin label only' } },
    { name: 'slug', type: 'text', required: true, unique: true, index: true, admin: { description: 'e.g. "home", "journey", "contact"' } },
    { name: 'route', type: 'text', required: true, unique: true, admin: { description: 'URL route, e.g. "/", "/journey", "/contact"' } },
    {
      name: 'chapterTitle',
      type: 'group',
      fields: [
        { name: 'a', type: 'text' },
        { name: 'b', type: 'text' },
      ],
    },
    { name: 'tagline', type: 'text' },
    { name: 'lede', type: 'textarea' },
    { name: 'heroImage', type: 'upload', relationTo: 'media' },
    {
      name: 'sections',
      type: 'blocks',
      admin: { description: 'Composable body sections — pick from the block library.' },
      blocks: [
        {
          slug: 'richText',
          labels: { singular: 'Rich Text', plural: 'Rich Text Blocks' },
          fields: [
            { name: 'eyebrow', type: 'text' },
            { name: 'heading', type: 'text' },
            { name: 'body', type: 'richText', required: true },
          ],
        },
        {
          slug: 'imageGrid',
          labels: { singular: 'Image Grid', plural: 'Image Grids' },
          fields: [
            { name: 'heading', type: 'text' },
            { name: 'columns', type: 'select', defaultValue: '3',
              options: ['2','3','4'].map(v => ({ label: v + ' columns', value: v })) },
            { name: 'images', type: 'array', required: true, minRows: 1, fields: [
              { name: 'image', type: 'upload', relationTo: 'media', required: true },
              { name: 'caption', type: 'text' },
            ] },
          ],
        },
        {
          slug: 'ctaBand',
          labels: { singular: 'CTA Band', plural: 'CTA Bands' },
          fields: [
            { name: 'heading', type: 'text', required: true },
            { name: 'lede', type: 'textarea' },
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
            { name: 'items', type: 'array', minRows: 1, fields: [
              { name: 'number', type: 'text', required: true, admin: { description: 'e.g. "28", "#1"' } },
              { name: 'label', type: 'text', required: true },
              { name: 'sourceNote', type: 'text' },
            ] },
          ],
        },
        {
          slug: 'faqAccordion',
          labels: { singular: 'FAQ Accordion', plural: 'FAQ Accordions' },
          fields: [
            { name: 'heading', type: 'text' },
            { name: 'items', type: 'array', minRows: 1, fields: [
              { name: 'q', type: 'text', required: true },
              { name: 'a', type: 'textarea', required: true },
            ] },
          ],
        },
        {
          slug: 'procedureList',
          fields: [
            { name: 'heading', type: 'text' },
            { name: 'filterDiscipline', type: 'relationship', relationTo: 'disciplines' },
            { name: 'filterSubCategory', type: 'relationship', relationTo: 'sub-categories' },
            { name: 'layout', type: 'select', defaultValue: 'grid',
              options: ['grid','list','featured'].map(v => ({ label: v, value: v })) },
            { name: 'limit', type: 'number', defaultValue: 6 },
          ],
        },
        {
          slug: 'surgeonList',
          fields: [
            { name: 'heading', type: 'text' },
            { name: 'filterGroup', type: 'select', options: [
              { label: 'All', value: 'all' },
              { label: 'Plastic Surgery', value: 'plastic-surgery' },
              { label: 'Aesthetic Medicine', value: 'aesthetic-medicine' },
            ] },
            { name: 'layout', type: 'select', defaultValue: 'strip',
              options: ['strip','grid'].map(v => ({ label: v, value: v })) },
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
            { name: 'lede', type: 'textarea' },
            { name: 'sourceCta', type: 'text', admin: { description: 'Recorded against any submission' } },
          ],
        },
        {
          slug: 'journeyStepList',
          fields: [
            { name: 'heading', type: 'text' },
            { name: 'filterCategory', type: 'select', options: [
              { label: 'All', value: 'all' },
              { label: 'Consultation', value: 'consult' },
              { label: 'Medical', value: 'medical' },
              { label: 'Surgical', value: 'surgical' },
              { label: 'Recovery', value: 'recovery' },
              { label: 'Follow-up', value: 'follow-up' },
            ] },
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
            { name: 'kind', type: 'select', defaultValue: 'info',
              options: ['info','warning','tip','disclaimer'].map(v => ({ label: v, value: v })) },
            { name: 'heading', type: 'text' },
            { name: 'body', type: 'richText', required: true },
          ],
        },
      ],
    },
    publishStatusField,
    seoGroup,
  ],
}
