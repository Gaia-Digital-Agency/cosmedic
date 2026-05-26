/**
 * Per-route SEO meta + JSON-LD structured data builder.
 *
 * Called at SSR time in server.ts. Returns the chunk of HTML to inject
 * into <head> via the <!--seo-outlet--> replacement marker. Pulls from
 * the warmed CmsCache for record-level overrides (Pages.seo / Surgeon
 * record / Blog post / etc.) with sensible fallbacks from SeoDefaults.
 */

import type { CmsCache } from './cms'

const SITE_ORIGIN = 'https://cosmedic.gaiada.online'
const DEFAULT_TITLE = 'BIMC CosMedic — Considered Cosmetic Medicine in Bali'
const DEFAULT_DESCRIPTION =
  'BIMC CosMedic — plastic surgery & aesthetic medicine clinic in Nusa Dua, Bali. ' +
  'Managed by BIMC Hospital. Editorial care for international medical travellers.'

type SeoFields = {
  title: string
  description: string
  canonical: string
  ogImage: string
  siteName: string
  jsonLd?: object
  noindex?: boolean
}

function esc(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function mediaAbs(url: string | undefined): string {
  if (!url) return `${SITE_ORIGIN}/cosmedic-mark-on-light.png`
  if (url.startsWith('http')) return url
  return `${SITE_ORIGIN}${url}`
}

function clampDescription(s: string): string {
  const clean = s.replace(/\s+/g, ' ').trim()
  if (clean.length <= 158) return clean
  return clean.slice(0, 155).trimEnd() + '…'
}

export function seoFor(pathname: string, cms: CmsCache): SeoFields {
  // Pull from SeoDefaults global (titlePattern, organizationSchema) and
  // Settings global (defaultOgImage, siteName). Both are warmed into the
  // CMS cache during SSR boot.
  const seoDefaults = cms.seoDefaults || {}
  const settings = (cms.settings || {}) as Record<string, unknown>
  // 25.31 — CMS-sourced identity fields; fall back to hardcoded strings when Settings empty
  const siteName = (settings.siteName as string) || 'BIMC CosMedic'
  const cityName = (settings.city as string) || 'Nusa Dua'
  const addressLine1 = (settings.addressLine1 as string) || 'BIMC Hospital Nusa Dua'
  const regionName = (settings.country as string) || 'Bali'
  const postalCode = (settings.postalCode as string) || '80363'
  const cmsDescription = (settings.defaultMetaDescription as string) || ''
  // titlePattern uses {page} substitution. Anything outside the {page} token
  // is the suffix when we render page-name-prefixed titles below.
  const titlePattern = seoDefaults.titlePattern || `{page} — ${siteName}`
  const fallbackTitleSuffix = titlePattern.includes('{page}')
    ? titlePattern.replace('{page}', '').trim()
    : ` — ${siteName}`
  const fallbackDescription = cmsDescription || DEFAULT_DESCRIPTION
  const fallbackOgUrl = (settings.defaultOgImage as { url?: string } | undefined)?.url

  let title = DEFAULT_TITLE
  let description = fallbackDescription
  let ogImage = mediaAbs(fallbackOgUrl)
  let jsonLd: object | undefined = undefined

  // Page-record overrides (home, journey, gallery, etc.)
  const pageSlug =
    pathname === '/'
      ? 'home'
      : pathname.replace(/^\//, '').replace(/\//g, '-').replace(/-$/, '') || 'home'
  const page = (cms.pages || []).find((p) => p.slug === pageSlug)
  if (page) {
    if (page.title) title = `${page.title}${fallbackTitleSuffix}`
    if (typeof page.lede === 'string' && page.lede) description = clampDescription(page.lede)
    const heroUrl = (page.heroImage as { url?: string } | undefined)?.url
    if (heroUrl) ogImage = mediaAbs(heroUrl)
  }

  // Surgeon page
  const surgeonMatch = pathname.match(/^\/surgeons\/([a-z0-9-]+)$/)
  if (surgeonMatch) {
    const s = (cms.surgeons || []).find((x) => x.slug === surgeonMatch[1])
    if (s) {
      const fullName = `${s.title || 'dr.'} ${s.commonName || s.name}`.trim()
      title = `${fullName} — ${s.spec || 'Surgeon'}${fallbackTitleSuffix}`
      description = clampDescription(
        `${fullName} at BIMC CosMedic. ${s.spec || ''} ${s.train || ''} ${s.credLine || ''}`,
      )
      const pUrl = (s.portrait as { url?: string } | undefined)?.url
      if (pUrl) ogImage = mediaAbs(pUrl)
      jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Physician',
        name: fullName,
        url: `${SITE_ORIGIN}${pathname}`,
        image: ogImage,
        medicalSpecialty: s.spec || 'PlasticSurgery',
        affiliation: {
          '@type': 'Hospital',
          name: addressLine1,
          address: { '@type': 'PostalAddress', addressLocality: cityName, addressCountry: 'ID' },
        },
      }
    }
  }

  // Discipline / sub-category page
  const treatmentMatch = pathname.match(/^\/treatments\/([a-z0-9-]+)$/)
  if (treatmentMatch) {
    const slug = treatmentMatch[1]
    const d = (cms.disciplines || []).find((x) => x.slug === slug)
    const sc = (cms.subCategories || []).find((x) => x.slug === slug)
    const entity = d || sc
    if (entity) {
      title = `${entity.title}${fallbackTitleSuffix}`
      if (entity.lede) description = clampDescription(entity.lede)
      const hUrl = (entity.heroImage as { url?: string } | undefined)?.url
      if (hUrl) ogImage = mediaAbs(hUrl)
      jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'MedicalProcedure',
        name: entity.title,
        description,
        url: `${SITE_ORIGIN}${pathname}`,
      }
    }
  }

  // Blog post
  const blogMatch = pathname.match(/^\/blog\/([a-z0-9-]+)$/)
  if (blogMatch) {
    const post = (cms.blogPosts || []).find((p) => p.slug === blogMatch[1])
    if (post) {
      title = `${post.title}${fallbackTitleSuffix}`
      if (post.lede) description = clampDescription(post.lede)
      jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description,
        url: `${SITE_ORIGIN}${pathname}`,
        datePublished: post.publishedAt || undefined,
        author: { '@type': 'Organization', name: 'BIMC CosMedic' },
      }
    }
  }

  // Homepage gets MedicalClinic schema by default — prefer CMS-curated
  // organizationSchema from SeoDefaults global if the clinic has populated it.
  if (pathname === '/' && !jsonLd) {
    const cmsOrgSchema = seoDefaults.organizationSchema as object | undefined
    jsonLd = cmsOrgSchema && typeof cmsOrgSchema === 'object'
      ? cmsOrgSchema
      : {
          '@context': 'https://schema.org',
          '@type': 'MedicalClinic',
          name: siteName,
          url: SITE_ORIGIN,
          logo: `${SITE_ORIGIN}/cosmedic-mark-on-light.png`,
          image: ogImage,
          description: fallbackDescription,
          parentOrganization: {
            '@type': 'Hospital',
            name: addressLine1,
          },
          address: {
            '@type': 'PostalAddress',
            addressLocality: cityName,
            addressRegion: regionName,
            postalCode,
            addressCountry: 'ID',
          },
          medicalSpecialty: ['PlasticSurgery', 'CosmeticDentistry', 'Dermatology'],
        }
  }

  const canonical = `${SITE_ORIGIN}${pathname === '/' ? '' : pathname}`
  return { title, description, canonical, ogImage, siteName, jsonLd }
}

/** Renders the chunk of HTML injected into <head> via <!--seo-outlet-->. */
export function renderSeoTags(seo: SeoFields): string {
  const tags: string[] = []
  tags.push(`<title>${esc(seo.title)}</title>`)
  tags.push(`<meta name="description" content="${esc(seo.description)}" />`)
  tags.push(`<link rel="canonical" href="${esc(seo.canonical)}" />`)
  tags.push(`<meta property="og:type" content="website" />`)
  tags.push(`<meta property="og:title" content="${esc(seo.title)}" />`)
  tags.push(`<meta property="og:description" content="${esc(seo.description)}" />`)
  tags.push(`<meta property="og:url" content="${esc(seo.canonical)}" />`)
  tags.push(`<meta property="og:image" content="${esc(seo.ogImage)}" />`)
  tags.push(`<meta property="og:site_name" content="${esc(seo.siteName)}" />`)
  tags.push(`<meta name="twitter:card" content="summary_large_image" />`)
  tags.push(`<meta name="twitter:title" content="${esc(seo.title)}" />`)
  tags.push(`<meta name="twitter:description" content="${esc(seo.description)}" />`)
  tags.push(`<meta name="twitter:image" content="${esc(seo.ogImage)}" />`)
  if (seo.noindex) tags.push(`<meta name="robots" content="noindex, nofollow" />`)
  if (seo.jsonLd) {
    const json = JSON.stringify(seo.jsonLd).replace(/</g, '\\u003c')
    tags.push(`<script type="application/ld+json">${json}</script>`)
  }
  return tags.join('\n    ')
}

/** Plausible analytics scaffold, opt-in via PLAUSIBLE_DOMAIN env. */
export function renderAnalytics(): string {
  const domain = process.env.PLAUSIBLE_DOMAIN
  const ga4 = process.env.GA4_MEASUREMENT_ID
  const parts: string[] = []
  if (domain) {
    parts.push(
      `<script defer data-domain="${esc(domain)}" src="https://plausible.io/js/script.js"></script>`,
    )
  }
  if (ga4) {
    parts.push(
      `<script async src="https://www.googletagmanager.com/gtag/js?id=${esc(ga4)}"></script>`,
      `<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${esc(ga4)}')</script>`,
    )
  }
  return parts.join('\n    ')
}
