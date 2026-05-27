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
  Settings,
  HeaderGlobal,
  FooterGlobal,
  FloatingChromeGlobal,
  BrandStatsGlobal,
  EndorsementMarkGlobal,
  ConsultationPolicy,
  FormDefaults,
  SeoDefaultsGlobal,
  ContactHeroGlobal,
  ContactEnquirySectionGlobal,
  ContactVisitSectionGlobal,
  JourneyHeroGlobal,
  JourneyStatsGlobal,
  RecoveryStaysPageGlobal,
  TreatmentsHeroGlobal,
  TreatmentsIndexSectionGlobal,
  TreatmentsStatsGlobal,
  DisciplineDetailTemplateGlobal,
  SubCategoryDetailTemplateGlobal,
  SurgeonsHeroGlobal,
  SurgeonsLeadViewGlobal,
  SurgeonsSectionViewGlobal,
  SurgeonDetailTemplateGlobal,
  PrivacySection,
  BlogPostTemplateGlobal,
  PricingHeroGlobal,
  PricingOverviewGlobal,
  PricingFootnoteGlobal,
  PricingInsuranceGlobal,
  PricingPaymentGlobal,
  PricingDisciplineListViewGlobal,
  PricingCatalogueViewGlobal,
  ResultsHeroGlobal,
  ResultsFeaturedCasesViewGlobal,
  ResultsStoriesViewGlobal,
  LibraryCtaGlobal,
  ShareCtaGlobal,
  HomeHeroGlobal,
  HomeIntroGlobal,
  HomeLeadMagnetGlobal,
  HomePlaceGlobal,
  HomeTreatmentsViewGlobal,
  HomePricingViewGlobal,
  HomeSurgeonsViewGlobal,
  HomeGalleryViewGlobal,
  HomeJourneyViewGlobal,
  HomeStoriesViewGlobal,
  NotFoundPageGlobal,
} from './cms.types'
import { fetchAll, fetchGlobal, fetchAllPageGlobals } from './cms.fetch'

export const EMPTY_CACHE: CmsCache = {
  loaded: false,
  loadedAt: 0,
  surgeons: [],
  disciplines: [],
  subCategories: [],
  procedures: [],
  clinicCatalogueItems: [],
  beforeAfterCases: [],
  stories: [],
  pressMentions: [],
  awards: [],
  recoveryStays: [],
  blogPosts: [],
  authors: [],
  journeySteps: [],
  privacySections: [],
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
  contactHero: {},
  contactEnquirySection: {},
  contactVisitSection: {},
  journeyHero: {},
  journeyStats: {},
  recoveryStaysPage: {},
  treatmentsHero: {},
  treatmentsIndexSection: {},
  treatmentsStats: {},
  disciplineDetailTemplate: {},
  subCategoryDetailTemplate: {},
  surgeonsHero: {},
  surgeonsLeadView: {},
  surgeonsPlasticView: {},
  surgeonsAestheticView: {},
  surgeonDetailTemplate: {},
  blogPostTemplate: {},
  pricingHero: {},
  pricingOverview: {},
  pricingFootnote: {},
  pricingInsurance: {},
  pricingPayment: {},
  pricingDisciplineListView: {},
  pricingCatalogueView: {},
  resultsHero: {},
  resultsFeaturedCasesView: {},
  resultsStoriesView: {},
  libraryCta: {},
  shareCta: {},
  homeHero: {},
  homeIntro: {},
  homeLeadMagnet: {},
  homePlace: {},
  homeTreatmentsView: {},
  homePricingView: {},
  homeSurgeonsView: {},
  homeGalleryView: {},
  homeJourneyView: {},
  homeStoriesView: {},
  notFoundPage: {},
}

let cache: CmsCache = EMPTY_CACHE
let inflight: Promise<CmsCache> | null = null

async function doLoad(): Promise<CmsCache> {
  try {
    const [
      surgeons, disciplines, subCategories, procedures,
      beforeAfterCases, stories, pressMentions, awards, recoveryStays,
      blogPosts, authors, journeySteps, privacySections, pages,
      settings, header, footer, floatingChrome, brandStats, endorsementMark,
      consultationPolicy, formDefaults, seoDefaults,
      contactHero, contactEnquirySection, contactVisitSection,
      journeyHero, journeyStats, recoveryStaysPage,
      treatmentsHero, treatmentsIndexSection, treatmentsStats,
      disciplineDetailTemplate, subCategoryDetailTemplate,
      surgeonsHero, surgeonsLeadView, surgeonsPlasticView,
      surgeonsAestheticView, surgeonDetailTemplate,
      blogPostTemplate,
      pricingHero, pricingOverview, pricingFootnote,
      pricingInsurance, pricingPayment,
      pricingDisciplineListView, pricingCatalogueView,
      resultsHero, resultsFeaturedCasesView, resultsStoriesView,
      libraryCta, shareCta,
      homeHero, homeIntro, homeLeadMagnet, homePlace,
      homeTreatmentsView, homePricingView, homeSurgeonsView,
      homeGalleryView, homeJourneyView, homeStoriesView,
      notFoundPage,
    ] = await Promise.all([
      fetchAll<Surgeon>('surgeons', 100, 1),
      fetchAll<Discipline>('disciplines'),
      fetchAll<SubCategory>('sub-categories'),
      fetchAll<Procedure>('procedures', 500, 2),
      // clinicCatalogueItems derived from procedures after await (see below)





      fetchAll<BeforeAfterCase>('before-after-cases'),
      fetchAll<Story>('stories'),
      fetchAll<PressMention>('press-mentions'),
      fetchAll<Award>('awards'),
      fetchAll<RecoveryStay>('recovery-stays'),
      fetchAll<BlogPost>('blog-posts', 100, 2),
      fetchAll<Author>('authors', 100, 1),
      fetchAll<JourneyStep>('journey-steps'),
      fetchAll<PrivacySection>('privacy-sections').catch(() => []),
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
      fetchGlobal<ContactHeroGlobal>('contact-hero').catch(() => ({})),
      fetchGlobal<ContactEnquirySectionGlobal>('contact-enquiry-section').catch(() => ({})),
      fetchGlobal<ContactVisitSectionGlobal>('contact-visit-section').catch(() => ({})),
      fetchGlobal<JourneyHeroGlobal>('journey-hero').catch(() => ({})),
      fetchGlobal<JourneyStatsGlobal>('journey-stats').catch(() => ({})),
      fetchGlobal<RecoveryStaysPageGlobal>('recovery-stays-page').catch(() => ({})),
      fetchGlobal<TreatmentsHeroGlobal>('treatments-hero').catch(() => ({})),
      fetchGlobal<TreatmentsIndexSectionGlobal>('treatments-index-section').catch(() => ({})),
      fetchGlobal<TreatmentsStatsGlobal>('treatments-stats').catch(() => ({})),
      fetchGlobal<DisciplineDetailTemplateGlobal>('discipline-detail-template').catch(() => ({})),
      fetchGlobal<SubCategoryDetailTemplateGlobal>('sub-category-detail-template').catch(() => ({})),
      fetchGlobal<SurgeonsHeroGlobal>('surgeons-hero').catch(() => ({})),
      fetchGlobal<SurgeonsLeadViewGlobal>('surgeons-lead-view').catch(() => ({})),
      fetchGlobal<SurgeonsSectionViewGlobal>('surgeons-plastic-view').catch(() => ({})),
      fetchGlobal<SurgeonsSectionViewGlobal>('surgeons-aesthetic-view').catch(() => ({})),
      fetchGlobal<SurgeonDetailTemplateGlobal>('surgeon-detail-template').catch(() => ({})),
      fetchGlobal<BlogPostTemplateGlobal>('blog-post-template').catch(() => ({})),
      fetchGlobal<PricingHeroGlobal>('pricing-hero').catch(() => ({} as PricingHeroGlobal)),
      fetchGlobal<PricingOverviewGlobal>('pricing-overview').catch(() => ({})),
      fetchGlobal<PricingFootnoteGlobal>('pricing-footnote').catch(() => ({})),
      fetchGlobal<PricingInsuranceGlobal>('pricing-insurance').catch(() => ({})),
      fetchGlobal<PricingPaymentGlobal>('pricing-payment').catch(() => ({})),
      fetchGlobal<PricingDisciplineListViewGlobal>('pricing-discipline-list-view').catch(() => ({})),
      fetchGlobal<PricingCatalogueViewGlobal>('pricing-catalogue-view').catch(() => ({})),
      fetchGlobal<ResultsHeroGlobal>('results-hero').catch(() => ({} as ResultsHeroGlobal)),
      fetchGlobal<ResultsFeaturedCasesViewGlobal>('results-featured-cases-view').catch(() => ({})),
      fetchGlobal<ResultsStoriesViewGlobal>('results-stories-view').catch(() => ({})),
      fetchGlobal<LibraryCtaGlobal>('library-cta').catch(() => ({})),
      fetchGlobal<ShareCtaGlobal>('share-cta').catch(() => ({})),
      fetchGlobal<HomeHeroGlobal>('home-hero').catch(() => ({})),
      fetchGlobal<HomeIntroGlobal>('home-intro').catch(() => ({})),
      fetchGlobal<HomeLeadMagnetGlobal>('home-lead-magnet').catch(() => ({})),
      fetchGlobal<HomePlaceGlobal>('home-place').catch(() => ({})),
      fetchGlobal<HomeTreatmentsViewGlobal>('home-treatments-view').catch(() => ({})),
      fetchGlobal<HomePricingViewGlobal>('home-pricing-view').catch(() => ({})),
      fetchGlobal<HomeSurgeonsViewGlobal>('home-surgeons-view').catch(() => ({})),
      fetchGlobal<HomeGalleryViewGlobal>('home-gallery-view').catch(() => ({})),
      fetchGlobal<HomeJourneyViewGlobal>('home-journey-view').catch(() => ({})),
      fetchGlobal<HomeStoriesViewGlobal>('home-stories-view').catch(() => ({})),
      fetchGlobal<NotFoundPageGlobal>('not-found-page').catch(() => ({})),
    ])
    // changes08-B: clinicCatalogueItems derived from procedures (single source of truth).
    // Surgical/Machine/Injection/BTL collections removed — Procedures covers all.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const clinicCatalogueItems = procedures.filter(p => p.catalogueGroup != null) as any[]
    // R6 — pricing-page lost its hero fields (split into pricing-hero global).
    // Mirror pricing-hero.lede + heroImage onto the pricing-page row inside
    // `pages` so seoFor() (which reads page.lede / page.heroImage) continues
    // to render the same per-route SEO meta as before R6.
    const pricingPageIdx = pages.findIndex((p) => p?.slug === 'pricing')
    if (pricingPageIdx >= 0) {
      const pp = pages[pricingPageIdx]
      pages[pricingPageIdx] = {
        ...pp,
        lede: pp.lede || pricingHero.lede,
        heroImage: pp.heroImage || pricingHero.heroImage || undefined,
        chapterTitle: pp.chapterTitle || {
          a: pricingHero.titleA,
          b: pricingHero.titleB,
        },
        tagline: pp.tagline || pricingHero.chapter,
      } as typeof pp
    }
    // R5 — same mirror trick for /results so seoFor() still picks up the
    // hero lede + image after R5 lifts the editorial off results-page.
    const resultsPageIdx = pages.findIndex((p) => p?.slug === 'results')
    if (resultsPageIdx >= 0) {
      const rp = pages[resultsPageIdx]
      pages[resultsPageIdx] = {
        ...rp,
        lede: rp.lede || resultsHero.lede,
        heroImage: rp.heroImage || resultsHero.heroImage || undefined,
        chapterTitle: rp.chapterTitle || {
          a: resultsHero.title?.a,
          b: resultsHero.title?.b,
        },
        tagline: rp.tagline || resultsHero.chapter,
      } as typeof rp
    }
    return {
      loaded: true,
      loadedAt: Date.now(),
      surgeons, disciplines, subCategories, procedures, clinicCatalogueItems,
      beforeAfterCases, stories, pressMentions, awards, recoveryStays,
      blogPosts, authors, journeySteps, privacySections, pages,
      settings, header, footer, floatingChrome, brandStats, endorsementMark,
      consultationPolicy, formDefaults, seoDefaults,
      contactHero, contactEnquirySection, contactVisitSection,
      journeyHero, journeyStats, recoveryStaysPage,
      treatmentsHero, treatmentsIndexSection, treatmentsStats,
      disciplineDetailTemplate, subCategoryDetailTemplate,
      surgeonsHero, surgeonsLeadView, surgeonsPlasticView,
      surgeonsAestheticView, surgeonDetailTemplate,
      blogPostTemplate,
      pricingHero, pricingOverview, pricingFootnote,
      pricingInsurance, pricingPayment,
      pricingDisciplineListView, pricingCatalogueView,
      resultsHero, resultsFeaturedCasesView, resultsStoriesView,
      libraryCta, shareCta,
      homeHero, homeIntro, homeLeadMagnet, homePlace,
      homeTreatmentsView, homePricingView, homeSurgeonsView,
      homeGalleryView, homeJourneyView, homeStoriesView,
      notFoundPage,
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
