/**
 * Minimal SSR router: `pathname → { kind, slug? }`. Each click is a full page
 * load (matches the design source, which used `.html` files); no client-side
 * SPA navigation. The discriminator drives `App.tsx`'s switch over which page
 * component to render.
 *
 * 25.15: sub-category URLs are now nested as `/treatments/{discipline}/{sub}`.
 * Flat legacy URLs (pre-25.15 + the renames from 25.14) issue 301 redirects
 * to their nested equivalent via `LEGACY_SUB_REDIRECTS`.
 */

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
  '/treatments': { kind: 'treatments-index' },
  '/surgeons': { kind: 'surgeons-index' },
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
 * Covers (a) pre-25.14 prefixed slugs that were renamed in 25.14, and
 * (b) post-25.14 flat slugs that became nested in 25.15. Discipline-level
 * slug `recovery` is also covered since it was renamed to `weight-loss`.
 */
const LEGACY_SUB_REDIRECTS: Record<string, string> = {
  // Pre-25.14 → nested (25.15) — the historical prefixed slugs
  'surgical-face':                 '/treatments/surgical/face',
  'surgical-body':                 '/treatments/surgical/body',
  'surgical-breast':               '/treatments/surgical/breast',
  'reconstructive-breast':         '/treatments/reconstructive/breast',
  'reconstructive-craniofacial':   '/treatments/reconstructive/craniofacial',
  'reconstructive-trauma':         '/treatments/reconstructive/trauma',
  'non-surgical-injectables':      '/treatments/non-surgical/injectables',
  'non-surgical-laser':            '/treatments/non-surgical/laser',
  'non-surgical-skin':             '/treatments/non-surgical/skin',
  'hair-fue':                      '/treatments/hair/fue',
  'hair-therapy':                  '/treatments/hair/therapy',
  'dental-veneers':                '/treatments/dental/veneers',
  'dental-alignment':              '/treatments/dental/alignment',
  'dental-whitening':              '/treatments/dental/whitening',
  'weight-loss-surgical':          '/treatments/weight-loss/bariatric',
  'weight-loss-endoscopic':        '/treatments/weight-loss/endoscopic',
  'weight-loss-medical':           '/treatments/weight-loss/glp-1',
  // Post-25.14 flat → nested (25.15) — short-lived flat URLs that were live ~30min
  'injectables':                   '/treatments/non-surgical/injectables',
  'laser':                         '/treatments/non-surgical/laser',
  'skin':                          '/treatments/non-surgical/skin',
  'craniofacial':                  '/treatments/reconstructive/craniofacial',
  'trauma':                        '/treatments/reconstructive/trauma',
  'veneers':                       '/treatments/dental/veneers',
  'alignment':                     '/treatments/dental/alignment',
  'whitening':                     '/treatments/dental/whitening',
  'bariatric':                     '/treatments/weight-loss/bariatric',
  'endoscopic':                    '/treatments/weight-loss/endoscopic',
  'glp-1':                         '/treatments/weight-loss/glp-1',
  'breast-recon':                  '/treatments/reconstructive/breast',
  // 'breast' has TWO parents now — surgical and reconstructive. Pre-25.15
  // `/treatments/breast` was the surgical aug page, so route to that.
  'breast':                        '/treatments/surgical/breast',
}

/** Discipline-slug → new slug (25.14 rename only). Used for `/treatments/recovery` → `/treatments/weight-loss`. */
const LEGACY_DISCIPLINE_REDIRECTS: Record<string, string> = {
  'recovery': '/treatments/weight-loss',
}

export function resolveRoute(pathname: string): Route {
  const path = pathname.replace(/\/+$/, '') || '/'

  if (path === '/' || path === '/index') return { kind: 'home' }

  if (STATIC_ROUTES[path]) return STATIC_ROUTES[path]

  // /treatments/{discipline}/{sub-category}
  const nested = path.match(/^\/treatments\/([a-z0-9-]+)\/([a-z0-9-]+)$/)
  if (nested) {
    const [, disciplineSlug, slug] = nested
    if (!getDisciplineSlugs().has(disciplineSlug)) return { kind: 'notfound' }
    if (SUBCATEGORY_DATA[`${disciplineSlug}/${slug}`]) {
      return { kind: 'subcategory', disciplineSlug, slug }
    }
    return { kind: 'notfound' }
  }

  // /treatments/{slug}
  const flat = path.match(/^\/treatments\/([a-z0-9-]+)$/)
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

  const surgeon = path.match(/^\/surgeons\/([a-z0-9-]+)$/)
  if (surgeon) {
    const slug = surgeon[1]
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
