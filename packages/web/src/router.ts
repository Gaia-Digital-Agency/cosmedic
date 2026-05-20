/**
 * Minimal SSR router: `pathname → { kind, slug? }`. Each click is a full page
 * load (matches the design source, which used `.html` files); no client-side
 * SPA navigation. The discriminator drives `App.tsx`'s switch over which page
 * component to render.
 */

import { TREATMENT_LIST, SURGEON_LIST } from './content/seed'
import { SUBCATEGORY_DATA } from './content/subcategory-data'

export type Route =
  | { kind: 'home' }
  | { kind: 'discipline'; slug: string }
  | { kind: 'subcategory'; slug: string }
  | { kind: 'surgeon'; slug: string }
  | { kind: 'notfound' }

const DISCIPLINE_SLUGS = new Set(TREATMENT_LIST.map((t) => t.slug))
const SURGEON_SLUGS = new Set(SURGEON_LIST.map((s) => s.slug))

export function resolveRoute(pathname: string): Route {
  const path = pathname.replace(/\/+$/, '') || '/'

  if (path === '/' || path === '/index') return { kind: 'home' }

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

  return { kind: 'notfound' }
}
