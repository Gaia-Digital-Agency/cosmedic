/**
 * CMS data loader (SSR-side) — public barrel.
 *
 * Split into focused modules to keep each file under ~500 lines:
 *
 *   - `cms.types.ts`        — collection + global type definitions
 *   - `cms.pages.types.ts`  — Page-globals (PageBlock + CmsPage) types
 *   - `cms.fetch.ts`        — Payload REST helpers (server-internal)
 *   - `cms.cache.ts`        — cache state, loader, TTL
 *   - `cms.media.ts`        — Lexical + media URL helpers (browser-facing)
 *
 * Existing imports `from '@/lib/cms'` keep working because everything is
 * re-exported here.
 */

export * from './cms.types'
export * from './cms.pages.types'
export { PAYLOAD_URL, fetchAll, fetchGlobal, fetchAllPageGlobals, PAGE_GLOBAL_SLUGS } from './cms.fetch'
export { EMPTY_CACHE, loadCmsCache, getCmsCacheSync, setCmsCacheSync } from './cms.cache'
export {
  PUBLIC_PAYLOAD_URL,
  lexicalToText,
  lexicalToParagraphs,
  mediaUrl,
  mediaAlt,
  mediaSrcSet,
  mediaMime,
} from './cms.media'
