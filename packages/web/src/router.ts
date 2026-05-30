/**
 * Minimal SSR router: `pathname → { kind, slug? }`. Each click is a full page
 * load (matches the design source, which used `.html` files); no client-side
 * SPA navigation. The discriminator drives `App.tsx`'s switch over which page
 * component to render.
 *
 * 25.16: top-level paths renamed to match reference site:
 *   /treatments/* → /procedures/*   (301 redirect from old URLs)
 *   /surgeons/*   → /experts/*      (301 redirect from old URLs)
 *   Sub-category slugs also renamed to match reference (see LEGACY_NESTED_REDIRECTS).
 *
 * 25.15: sub-category URLs are now nested as `/procedures/{discipline}/{sub}`.
 * Flat legacy URLs (pre-25.15 + the renames from 25.14) issue 301 redirects
 * to their nested equivalent via `LEGACY_SUB_REDIRECTS`.
 */

import type { Locale } from './i18n'
import { TREATMENT_LIST, SURGEON_LIST } from './content/seed'
import { SUBCATEGORY_DATA } from './content/subcategory-data'
import { BLOG_POST_BODIES } from './content/blog-data'

export type Route =
  | { kind: 'home' }
  | { kind: 'discipline'; slug: string }
  | { kind: 'subcategory'; disciplineSlug: string; slug: string }
  | { kind: 'surgeon'; slug: string }
  | { kind: 'treatments-index' }
  | { kind: 'surgeons-index' }
  | { kind: 'results' }
  | { kind: 'gallery' }
  | { kind: 'stories' }
  | { kind: 'journey' }
  | { kind: 'pricing' }
  | { kind: 'recovery-stays' }
  | { kind: 'press' }
  | { kind: 'contact' }
  | { kind: 'video-consult' }
  | { kind: 'blog-index' }
  | { kind: 'blog-post'; slug: string }
  | { kind: 'privacy' }
  | { kind: 'redirect'; to: string; status: 301 }
  | { kind: 'notfound' }

const getDisciplineSlugs = (): Set<string> => new Set(TREATMENT_LIST.map((t) => t.slug))
const getSurgeonSlugs = (): Set<string> => new Set(SURGEON_LIST.map((s) => s.slug))

const STATIC_ROUTES: Record<string, Route> = {
  '/procedures': { kind: 'treatments-index' },
  '/experts': { kind: 'surgeons-index' },
  '/results': { kind: 'results' },
  '/gallery': { kind: 'gallery' },
  '/stories': { kind: 'stories' },
  '/journey': { kind: 'journey' },
  '/pricing': { kind: 'pricing' },
  '/recovery-stays': { kind: 'recovery-stays' },
  '/press': { kind: 'press' },
  '/contact': { kind: 'contact' },
  '/video-consult': { kind: 'video-consult' },
  '/blog': { kind: 'blog-index' },
  '/privacy': { kind: 'privacy' },
}

/**
 * Legacy flat sub-category slug → current nested URL.
 *
 * Covers (a) pre-25.14 prefixed slugs renamed in 25.14, (b) post-25.14 flat
 * slugs that became nested in 25.15, and (c) short prod slugs that were
 * renamed to match the reference site in 25.16.
 */
const LEGACY_SUB_REDIRECTS: Record<string, string> = {
  // Pre-25.14 prefixed slugs → /procedures/... with ref sub-slugs (25.16)
  'surgical-face':                 '/procedures/surgical/face-neck',
  'surgical-body':                 '/procedures/surgical/surgical-body',
  'surgical-breast':               '/procedures/surgical/surgical-breast',
  'reconstructive-breast':         '/procedures/reconstructive/reconstructive-breast',
  'reconstructive-craniofacial':   '/procedures/reconstructive/reconstructive-craniofacial',
  'reconstructive-trauma':         '/procedures/reconstructive/reconstructive-trauma',
  'non-surgical-injectables':      '/procedures/non-surgical/injectable',
  'non-surgical-laser':            '/procedures/non-surgical/non-injectable',
  'non-surgical-skin':             '/procedures/non-surgical/nonsurgical-others',
  'hair-fue':                      '/procedures/hair/hair-fue',
  'hair-therapy':                  '/procedures/hair/hair-therapy',
  'dental-veneers':                '/procedures/dental/dental-veneers',
  'dental-alignment':              '/procedures/dental/dental-alignment',
  'dental-whitening':              '/procedures/dental/dental-whitening',
  'weight-loss-surgical':          '/procedures/weight-loss/weight-loss-surgical',
  'weight-loss-endoscopic':        '/procedures/weight-loss/weight-loss-endoscopic',
  'weight-loss-medical':           '/procedures/weight-loss/weight-loss-medical',
  // Post-25.14 flat → /procedures/... with ref sub-slugs (25.16)
  'injectables':                   '/procedures/non-surgical/injectable',
  'laser':                         '/procedures/non-surgical/non-injectable',
  'skin':                          '/procedures/non-surgical/nonsurgical-others',
  'craniofacial':                  '/procedures/reconstructive/reconstructive-craniofacial',
  'trauma':                        '/procedures/reconstructive/reconstructive-trauma',
  'veneers':                       '/procedures/dental/dental-veneers',
  'alignment':                     '/procedures/dental/dental-alignment',
  'whitening':                     '/procedures/dental/dental-whitening',
  'bariatric':                     '/procedures/weight-loss/weight-loss-surgical',
  'endoscopic':                    '/procedures/weight-loss/weight-loss-endoscopic',
  'glp-1':                         '/procedures/weight-loss/weight-loss-medical',
  'breast-recon':                  '/procedures/reconstructive/reconstructive-breast',
  // 'breast' has TWO parents — surgical and reconstructive. Map to surgical (original behaviour).
  'breast':                        '/procedures/surgical/surgical-breast',
  // 25.16: short prod-era slugs that no longer exist in the CMS
  'rhinoplasty':                   '/procedures/surgical/rhinoplasty',
  'face':                          '/procedures/surgical/face-neck',
  'body':                          '/procedures/surgical/surgical-body',
  'fue':                           '/procedures/hair/hair-fue',
  'therapy':                       '/procedures/hair/hair-therapy',
}

/** Discipline-slug → new slug. Used for `/procedures/recovery` → `/procedures/weight-loss`. */
const LEGACY_DISCIPLINE_REDIRECTS: Record<string, string> = {
  'recovery': '/procedures/weight-loss',
}

/**
 * Old prod nested URLs (pre-25.16) → new reference-matching nested URLs.
 * Checked when a /procedures/{discipline}/{slug} path fails the SUBCATEGORY_DATA lookup.
 */
const LEGACY_NESTED_REDIRECTS: Record<string, string> = {
  '/procedures/surgical/face':                    '/procedures/surgical/face-neck',
  '/procedures/surgical/breast':                  '/procedures/surgical/surgical-breast',
  '/procedures/surgical/body':                    '/procedures/surgical/surgical-body',
  '/procedures/non-surgical/injectables':         '/procedures/non-surgical/injectable',
  '/procedures/non-surgical/laser':               '/procedures/non-surgical/non-injectable',
  '/procedures/non-surgical/skin':                '/procedures/non-surgical/nonsurgical-others',
  '/procedures/reconstructive/breast':            '/procedures/reconstructive/reconstructive-breast',
  '/procedures/reconstructive/trauma':            '/procedures/reconstructive/reconstructive-trauma',
  '/procedures/reconstructive/craniofacial':      '/procedures/reconstructive/reconstructive-craniofacial',
  '/procedures/hair/fue':                         '/procedures/hair/hair-fue',
  '/procedures/hair/therapy':                     '/procedures/hair/hair-therapy',
  '/procedures/dental/veneers':                   '/procedures/dental/dental-veneers',
  '/procedures/dental/alignment':                 '/procedures/dental/dental-alignment',
  '/procedures/dental/whitening':                 '/procedures/dental/dental-whitening',
  '/procedures/weight-loss/glp-1':               '/procedures/weight-loss/weight-loss-medical',
  '/procedures/weight-loss/bariatric':            '/procedures/weight-loss/weight-loss-surgical',
  '/procedures/weight-loss/endoscopic':           '/procedures/weight-loss/weight-loss-endoscopic',
}

export function resolveRoute(pathname: string): Route {
  const path = pathname.replace(/\/+$/, '') || '/'

  if (path === '/' || path === '/index') return { kind: 'home' }

  if (STATIC_ROUTES[path]) return STATIC_ROUTES[path]

  // Legacy /treatments/* → /procedures/* (25.16 rename)
  if (path.startsWith('/treatments')) {
    return { kind: 'redirect', to: path.replace('/treatments', '/procedures'), status: 301 }
  }

  // Legacy /surgeons/* → /experts/* (25.16 rename)
  if (path.startsWith('/surgeons')) {
    return { kind: 'redirect', to: path.replace('/surgeons', '/experts'), status: 301 }
  }

  // /procedures/{discipline}/{sub-category}
  const nested = path.match(/^\/procedures\/([a-z0-9-]+)\/([a-z0-9-]+)$/)
  if (nested) {
    const [, disciplineSlug, slug] = nested
    if (!getDisciplineSlugs().has(disciplineSlug)) return { kind: 'notfound' }
    if (SUBCATEGORY_DATA[`${disciplineSlug}/${slug}`]) {
      return { kind: 'subcategory', disciplineSlug, slug }
    }
    if (LEGACY_NESTED_REDIRECTS[path]) {
      return { kind: 'redirect', to: LEGACY_NESTED_REDIRECTS[path], status: 301 }
    }
    return { kind: 'notfound' }
  }

  // /procedures/{slug}
  const flat = path.match(/^\/procedures\/([a-z0-9-]+)$/)
  if (flat) {
    const slug = flat[1]
    if (getDisciplineSlugs().has(slug)) return { kind: 'discipline', slug }
    if (LEGACY_DISCIPLINE_REDIRECTS[slug]) {
      return { kind: 'redirect', to: LEGACY_DISCIPLINE_REDIRECTS[slug], status: 301 }
    }
    if (LEGACY_SUB_REDIRECTS[slug]) {
      return { kind: 'redirect', to: LEGACY_SUB_REDIRECTS[slug], status: 301 }
    }
    return { kind: 'notfound' }
  }

  const expert = path.match(/^\/experts\/([a-z0-9-]+)$/)
  if (expert) {
    const slug = expert[1]
    if (getSurgeonSlugs().has(slug)) return { kind: 'surgeon', slug }
    return { kind: 'notfound' }
  }

  const blog = path.match(/^\/blog\/([a-z0-9-]+)$/)
  if (blog) {
    const slug = blog[1]
    if (BLOG_POST_BODIES[slug]) return { kind: 'blog-post', slug }
    return { kind: 'notfound' }
  }

  return { kind: 'notfound' }
}

/**
 * Strip the /id locale prefix from a pathname.
 * `/id/...` or `/id` → { locale: 'id', canonicalPath: '/...' }
 * Anything else   → { locale: 'en', canonicalPath: pathname }
 *
 * Used by server.ts before calling resolveRoute so the route table stays
 * unaware of the locale prefix.
 */
export function stripLocalePrefix(pathname: string): { locale: Locale; canonicalPath: string } {
  if (pathname === '/id' || pathname.startsWith('/id/')) {
    return { locale: 'id', canonicalPath: pathname.slice(3) || '/' }
  }
  return { locale: 'en', canonicalPath: pathname }
}
