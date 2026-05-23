/**
 * Server-side fetch helpers for Payload REST.
 *
 * `PAYLOAD_URL` is the server-internal origin used at SSR boot. The
 * browser-facing equivalent (`PUBLIC_PAYLOAD_URL`) is in `cms.media.ts`.
 */

import type { CmsPage } from './cms.pages.types'

export const PAYLOAD_URL = process.env.PAYLOAD_URL || 'http://127.0.0.1:4007'

export async function fetchAll<T>(collection: string, limit = 500, depth = 1): Promise<T[]> {
  const url = `${PAYLOAD_URL}/api/${collection}?limit=${limit}&depth=${depth}&draft=false`
  const res = await fetch(url, { headers: { Accept: 'application/json' } })
  if (!res.ok) {
    throw new Error(`[cms] failed to fetch ${collection}: ${res.status} ${res.statusText}`)
  }
  const json = (await res.json()) as { docs: T[] }
  return json.docs || []
}

export async function fetchGlobal<T>(slug: string, depth = 1): Promise<T> {
  const url = `${PAYLOAD_URL}/api/globals/${slug}?depth=${depth}`
  const res = await fetch(url, { headers: { Accept: 'application/json' } })
  if (!res.ok) {
    throw new Error(`[cms] failed to fetch global ${slug}: ${res.status} ${res.statusText}`)
  }
  return (await res.json()) as T
}

/**
 * The 14 Payload Globals that replaced the Pages collection in the
 * 2026-05-22 admin restructure. Each is a singleton holding the editorial
 * hero + sections for one static route.
 */
export const PAGE_GLOBAL_SLUGS = [
  'home-page',
  'press-page',
  'privacy-page',
  'treatments-page',
  'surgeons-page',
  'results-page',
  'gallery-page',
  'pricing-page',
  'journey-page',
  'stories-page',
  'recovery-stays-page',
  'contact-page',
  'video-consult-page',
  'blog-page',
] as const

export async function fetchAllPageGlobals(): Promise<CmsPage[]> {
  const results = await Promise.all(
    PAGE_GLOBAL_SLUGS.map((slug) =>
      fetchGlobal<CmsPage>(slug, 1).catch((err) => {
        console.warn(`[cms] page global ${slug} failed:`, (err as Error)?.message)
        return null
      }),
    ),
  )
  // Drop globals that have no editorial slug populated (treatments/surgeons/blog
  // etc. before Step 9 seed runs). findPageBySlug ignores them anyway.
  return results.filter((p): p is CmsPage => p !== null && Boolean(p?.slug))
}
