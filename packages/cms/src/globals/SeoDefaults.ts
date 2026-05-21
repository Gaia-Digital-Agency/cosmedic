import type { GlobalConfig } from 'payload'
import { isAuthenticated, readPublic } from '../lib/access'
import { revalidateGlobalAfterChange } from '../lib/revalidate'
import { apiWarningField } from '../lib/api-warning'

export const SeoDefaults: GlobalConfig = {
  slug: 'seo-defaults',
  admin: { group: 'Site Settings', description: 'SEO defaults — title pattern, robots.txt, sitemap base URL, structured-data org info.' },
  access: { read: readPublic, update: isAuthenticated },
  hooks: revalidateGlobalAfterChange(),
  fields: [
    apiWarningField,
    { name: 'titlePattern', type: 'text', defaultValue: '{page} — BIMC CosMedic',
      admin: { description: '{page} is substituted at render.' } },
    { name: 'robotsTxt', type: 'textarea',
      defaultValue: 'User-agent: *\nAllow: /\nDisallow: /admin\nDisallow: /api/\nDisallow: /preview\nSitemap: https://cosmedic.gaiada.online/sitemap.xml' },
    { name: 'sitemapBaseUrl', type: 'text', defaultValue: 'https://cosmedic.gaiada.online' },
    { name: 'organizationSchema', type: 'json',
      admin: { description: 'schema.org JSON-LD for MedicalClinic. Injected on / and /contact.' } },
  ],
}
