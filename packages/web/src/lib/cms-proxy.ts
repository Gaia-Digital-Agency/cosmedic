/**
 * Lazy CMS-backed proxies.
 *
 * Why this exists: the legacy `src/content/*.ts` files exported plain constants
 * (`SURGEON_LIST`, `TREATMENT_LIST`, `SUBCATEGORIES_BY_DISCIPLINE`,
 * `TREATMENT_CONTENT`, `SUBCATEGORY_DATA`, `BLOG_POSTS`, `BLOG_POST_BODIES`,
 * `BA_PAIRS`, …) that 28 components consume. Phase 6 swaps these from
 * hand-edited source-of-truth files to the CMS.
 *
 * Rather than touching every consumer, we replace the content modules with
 * Proxy-wrapped exports that lazily compute their value from the current
 * `getCmsCacheSync()` snapshot on each access. Components keep their imports
 * unchanged.
 *
 * Memoization: we cache the adapted value by `cmsCache.loadedAt`. Within one
 * SSR render pass, every property access returns the same materialized array
 * or object. When the CMS cache refreshes (60s TTL or POST /api/revalidate),
 * `loadedAt` changes and the proxies recompute.
 */

import { getCmsCacheSync, type CmsCache } from './cms'

type Memo<T> = { value: T | null; cmsLoadedAt: number }

export function lazyArray<T>(compute: (cms: CmsCache) => T[]): T[] {
  const memo: Memo<T[]> = { value: null, cmsLoadedAt: -1 }
  const reify = (): T[] => {
    const cms = getCmsCacheSync()
    if (memo.value && memo.cmsLoadedAt === cms.loadedAt) return memo.value
    memo.value = compute(cms)
    memo.cmsLoadedAt = cms.loadedAt
    return memo.value
  }
  return new Proxy([] as unknown as T[], {
    get(_t, prop, receiver) {
      const data = reify()
      const v = Reflect.get(data, prop, data)
      return typeof v === 'function' ? v.bind(data) : v
    },
    has(_t, prop) {
      return Reflect.has(reify(), prop)
    },
    ownKeys() {
      return Reflect.ownKeys(reify())
    },
    getOwnPropertyDescriptor(_t, prop) {
      return Reflect.getOwnPropertyDescriptor(reify(), prop)
    },
    getPrototypeOf() {
      return Array.prototype
    },
  })
}

export function lazyRecord<V>(compute: (cms: CmsCache) => Record<string, V>): Record<string, V> {
  const memo: Memo<Record<string, V>> = { value: null, cmsLoadedAt: -1 }
  const reify = (): Record<string, V> => {
    const cms = getCmsCacheSync()
    if (memo.value && memo.cmsLoadedAt === cms.loadedAt) return memo.value
    memo.value = compute(cms)
    memo.cmsLoadedAt = cms.loadedAt
    return memo.value
  }
  return new Proxy({} as Record<string, V>, {
    get(_t, prop) {
      return Reflect.get(reify(), prop)
    },
    has(_t, prop) {
      return Reflect.has(reify(), prop)
    },
    ownKeys() {
      return Reflect.ownKeys(reify())
    },
    getOwnPropertyDescriptor(_t, prop) {
      return Reflect.getOwnPropertyDescriptor(reify(), prop)
    },
  })
}
