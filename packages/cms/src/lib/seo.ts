import type { Field } from 'payload'

export const seoGroup: Field = {
  name: 'seo',
  type: 'group',
  admin: { description: 'Per-record SEO overrides for THIS page. Anything left blank inherits from the Globals → SEO & Meta → SEO Defaults record.' },
  fields: [
    { name: 'title', type: 'text',
      admin: { description: '<title> tag for this page only. Overrides the global title pattern when set.' } },
    { name: 'description', type: 'textarea',
      admin: { description: '<meta name="description"> for this page only. Used in search-engine snippets and OG/Twitter share previews when set.' } },
    { name: 'ogImage', type: 'upload', relationTo: 'media',
      admin: { description: 'Image used in social-share previews (Facebook, Twitter, LinkedIn, WhatsApp link preview) for this page only.' } },
    { name: 'canonical', type: 'text',
      admin: { description: '<link rel="canonical"> URL for this page. Leave blank to use the current URL.' } },
    { name: 'noindex', type: 'checkbox', defaultValue: false,
      admin: { description: 'Tick to add <meta name="robots" content="noindex,nofollow"> and tell search engines NOT to index this page.' } },
  ],
}

export const publishStatusField: Field = {
  name: 'publishStatus',
  type: 'select',
  defaultValue: 'published',
  required: true,
  options: [
    { label: 'Draft', value: 'draft' },
    { label: 'Published', value: 'published' },
    { label: 'Scheduled', value: 'scheduled' },
  ],
  admin: { position: 'sidebar', description: 'Draft = saved but not visible on the live site. Published = visible. Scheduled = will go live at a future date.' },
}

export const sortOrderField: Field = {
  name: 'sortOrder',
  type: 'number',
  defaultValue: 0,
  admin: { position: 'sidebar', description: 'Lower numbers appear EARLIER in listings (mega-menu, index pages, cards). Use 0/10/20/30 leaving room to insert items between.' },
}
