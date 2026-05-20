/**
 * Minimal SSR router: `pathname → { kind, slug? }`. Each click is a full page
 * load (matches the design source, which used `.html` files); no client-side
 * SPA navigation. The discriminator drives `App.tsx`'s switch over which page
 * component to render.
 */

import { TREATMENT_LIST, SURGEON_LIST } from './content/seed'
import { SUBCATEGORY_DATA } from './content/subcategory-data'
import { BLOG_POST_BODIES } from './content/blog-data'

export type Route =
  | { kind: 'home' }
  | { kind: 'discipline'; slug: string }
  | { kind: 'subcategory'; slug: string }
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
  | { kind: 'notfound' }

const DISCIPLINE_SLUGS = new Set(TREATMENT_LIST.map((t) => t.slug))
const SURGEON_SLUGS = new Set(SURGEON_LIST.map((s) => s.slug))

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

export function resolveRoute(pathname: string): Route {
  const path = pathname.replace(/\/+$/, '') || '/'

  if (path === '/' || path === '/index') return { kind: 'home' }

  if (STATIC_ROUTES[path]) return STATIC_ROUTES[path]

  const treatment = path.match(/^\/treatment-([a-z0-9-]+)$/)
  if (treatment) {
    const slug = treatment[1]
    if (DISCIPLINE_SLUGS.has(slug)) return { kind: 'discipline', slug }
    if (SUBCATEGORY_DATA[slug]) return { kind: 'subcategory', slug }
    return { kind: 'notfound' }
  }

  const surgeon = path.match(/^\/surgeon-([a-z0-9-]+)$/)
  if (surgeon) {
    const slug = surgeon[1]
    if (SURGEON_SLUGS.has(slug)) return { kind: 'surgeon', slug }
    return { kind: 'notfound' }
  }

  const blog = path.match(/^\/blog-([a-z0-9-]+)$/)
  if (blog) {
    const slug = blog[1]
    if (BLOG_POST_BODIES[slug]) return { kind: 'blog-post', slug }
    return { kind: 'notfound' }
  }

  return { kind: 'notfound' }
}
