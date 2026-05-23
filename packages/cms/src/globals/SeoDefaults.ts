import type { GlobalConfig } from 'payload'
import { isAuthenticated, readPublic } from '../lib/access'
import { revalidateGlobalAfterChange } from '../lib/revalidate'
import { apiWarningField } from '../lib/api-warning'

export const SeoDefaults: GlobalConfig = {
  slug: 'seo-defaults',
  admin: {
    group: '1 Homepage',
    description: 'Search-engine + crawler defaults: the title pattern used on every <title> tag, the /robots.txt content, the sitemap.xml base URL, and the homepage JSON-LD organization schema.',
  },
  access: { read: readPublic, update: isAuthenticated },
  hooks: revalidateGlobalAfterChange(),
  fields: [
    apiWarningField,
    { name: 'titlePattern', type: 'text', defaultValue: '{page} — BIMC CosMedic',
      admin: { description: 'Format used for every <title> tag across the site. `{page}` is replaced with the page name (e.g. "Home — BIMC CosMedic", "Surgeons — BIMC CosMedic").' } },
    { name: 'robotsTxt', type: 'textarea',
      defaultValue: 'User-agent: *\nAllow: /\nDisallow: /admin\nDisallow: /api/\nDisallow: /preview\nSitemap: https://cosmedic.gaiada.online/sitemap.xml',
      admin: { description: 'Full content of the /robots.txt route served to crawlers. Edit to change indexing rules.' } },
    { name: 'sitemapBaseUrl', type: 'text', defaultValue: 'https://cosmedic.gaiada.online',
      admin: { description: 'Base URL used in /sitemap.xml entries. Change when launching on a new domain.' } },
    { name: 'organizationSchema', type: 'json',
      admin: { description: 'schema.org JSON-LD blob injected into the homepage <head>. Used by Google/Bing to render rich-result panels. When set, overrides the default MedicalClinic schema. Leave empty to use the built-in default.' } },
  ],
}
