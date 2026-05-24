/**
 * CMS cache state + load orchestration.
 *
 * Fetches every Phase-6 collection + global at SSR boot, caches in memory
 * with a 60s TTL, and exposes synchronous getters used by SSR + the
 * `__COSMEDIC_CMS__` hydration script. When Payload mutates, the
 * `afterChange` hook POSTs `/api/revalidate` on the web — that endpoint
 * calls `loadCmsCache(true)` to bust + refill.
 */

import type {
  CmsCache,
  Surgeon,
  Discipline,
  SubCategory,
  Procedure,
  BeforeAfterCase,
  Story,
  PressMention,
  Award,
  RecoveryStay,
  BlogPost,
  Author,
  JourneyStep,
  InclusionItem,
  ExclusionItem,
  Settings,
  HeaderGlobal,
  FooterGlobal,
  FloatingChromeGlobal,
  BrandStatsGlobal,
  EndorsementMarkGlobal,
  ConsultationPolicy,
  FormDefaults,
  SeoDefaultsGlobal,
} from './cms.types'
import { fetchAll, fetchGlobal, fetchAllPageGlobals } from './cms.fetch'

export const EMPTY_CACHE: CmsCache = {
  loaded: false,
  loadedAt: 0,
  surgeons: [],
  disciplines: [],
  subCategories: [],
  procedures: [],
  beforeAfterCases: [],
  stories: [],
  pressMentions: [],
  awards: [],
  recoveryStays: [],
  blogPosts: [],
  authors: [],
  journeySteps: [],
  inclusions: [],
  exclusions: [],
  pages: [],
  settings: {},
  header: {},
  footer: {},
  floatingChrome: {},
  brandStats: {},
  endorsementMark: {},
  consultationPolicy: {},
  formDefaults: {},
  seoDefaults: {},
}

let cache: CmsCache = EMPTY_CACHE
let inflight: Promise<CmsCache> | null = null

async function doLoad(): Promise<CmsCache> {
  try {
    const [
      surgeons, disciplines, subCategories, procedures,
      beforeAfterCases, stories, pressMentions, awards, recoveryStays,
      blogPosts, authors, journeySteps, inclusions, exclusions, pages,
      settings, header, footer, floatingChrome, brandStats, endorsementMark,
      consultationPolicy, formDefaults, seoDefaults,
    ] = await Promise.all([
      fetchAll<Surgeon>('surgeons', 100, 1),
      fetchAll<Discipline>('disciplines'),
      fetchAll<SubCategory>('sub-categories'),
      fetchAll<Procedure>('procedures', 500, 2),
      fetchAll<BeforeAfterCase>('before-after-cases'),
      fetchAll<Story>('stories'),
      fetchAll<PressMention>('press-mentions'),
      fetchAll<Award>('awards'),
      fetchAll<RecoveryStay>('recovery-stays'),
      fetchAll<BlogPost>('blog-posts', 100, 2),
      fetchAll<Author>('authors', 100, 1),
      fetchAll<JourneyStep>('journey-steps'),
      fetchAll<InclusionItem>('inclusion-items'),
      fetchAll<ExclusionItem>('exclusion-items'),
      fetchAllPageGlobals(),
      fetchGlobal<Settings>('settings'),
      fetchGlobal<HeaderGlobal>('header'),
      fetchGlobal<FooterGlobal>('footer'),
      fetchGlobal<FloatingChromeGlobal>('floating-chrome'),
      fetchGlobal<BrandStatsGlobal>('brand-stats'),
      fetchGlobal<EndorsementMarkGlobal>('endorsement-mark'),
      fetchGlobal<ConsultationPolicy>('consultation-policy'),
      fetchGlobal<FormDefaults>('form-defaults'),
      fetchGlobal<SeoDefaultsGlobal>('seo-defaults'),
    ])
    return {
      loaded: true,
      loadedAt: Date.now(),
      surgeons, disciplines, subCategories, procedures,
      beforeAfterCases, stories, pressMentions, awards, recoveryStays,
      blogPosts, authors, journeySteps, inclusions, exclusions, pages,
      settings, header, footer, floatingChrome, brandStats, endorsementMark,
      consultationPolicy, formDefaults, seoDefaults,
    }
  } catch (err) {
    console.warn('[cms] load failed, using empty cache:', err)
    return EMPTY_CACHE
  }
}

const CACHE_TTL_MS = 60_000  // 60s — keeps SSR fast while picking up CMS edits.

export async function loadCmsCache(force = false): Promise<CmsCache> {
  if (!force && cache.loaded && Date.now() - cache.loadedAt < CACHE_TTL_MS) {
    return cache
  }
  if (inflight) return inflight
  inflight = doLoad().then((next) => {
    cache = next
    inflight = null
    return next
  })
  return inflight
}

export function getCmsCacheSync(): CmsCache {
  return cache
}

export function setCmsCacheSync(next: CmsCache): void {
  cache = next
}
