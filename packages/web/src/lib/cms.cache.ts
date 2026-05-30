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
import type { Locale } from '../i18n'
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

// Per-locale cache map — keyed by Locale ('en' | 'id').
const caches: Record<string, CmsCache> = { en: EMPTY_CACHE }
const inflights: Record<string, Promise<CmsCache> | null> = {}

async function doLoad(locale?: string): Promise<CmsCache> {
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
      libraryCta,
      homeHero, homeIntro, homeLeadMagnet, homePlace,
      homeTreatmentsView, homePricingView, homeSurgeonsView,
      homeGalleryView, homeJourneyView, homeStoriesView,
      notFoundPage,
    ] = await Promise.all([
      fetchAll<Surgeon>('surgeons', 100, 1, locale),
      fetchAll<Discipline>('disciplines', 500, 1, locale),
      fetchAll<SubCategory>('sub-categories', 500, 1, locale),
      fetchAll<Procedure>('procedures', 500, 2, locale),
      // clinicCatalogueItems derived from procedures after await (see below)





      fetchAll<BeforeAfterCase>('before-after-cases', 500, 1, locale),
      fetchAll<Story>('stories', 500, 1, locale),
      fetchAll<PressMention>('press-mentions', 500, 1, locale),
      fetchAll<Award>('awards', 500, 1, locale),
      fetchAll<RecoveryStay>('recovery-stays', 500, 1, locale),
      fetchAll<BlogPost>('blog-posts', 100, 2, locale),
      fetchAll<Author>('authors', 100, 1, locale),
      fetchAll<JourneyStep>('journey-steps', 500, 1, locale),
      fetchAll<PrivacySection>('privacy-sections', 500, 1, locale).catch(() => []),
      fetchAllPageGlobals(locale),
      fetchGlobal<Settings>('settings', 1, locale),
      fetchGlobal<HeaderGlobal>('header', 1, locale),
      fetchGlobal<FooterGlobal>('footer', 1, locale),
      fetchGlobal<FloatingChromeGlobal>('floating-chrome', 1, locale),
      Promise.resolve({}), // brand-stats merged into home-intro.trustStrip
      fetchGlobal<EndorsementMarkGlobal>('endorsement-mark', 1, locale),
      Promise.resolve({}), // consultation-policy merged into pricing-insurance.consultation
      fetchGlobal<FormDefaults>('form-defaults', 1, locale),
      fetchGlobal<SeoDefaultsGlobal>('seo-defaults', 1, locale),
      fetchGlobal<ContactHeroGlobal>('contact-hero', 1, locale).catch(() => ({})),
      fetchGlobal<ContactEnquirySectionGlobal>('contact-enquiry-section', 1, locale).catch(() => ({})),
      Promise.resolve({}), // contact-visit-section merged into contact-hero.visitSection
      fetchGlobal<JourneyHeroGlobal>('journey-hero', 1, locale).catch(() => ({})),
      fetchGlobal<JourneyStatsGlobal>('journey-stats', 1, locale).catch(() => ({})),
      fetchGlobal<RecoveryStaysPageGlobal>('recovery-stays-page', 1, locale).catch(() => ({})),
      fetchGlobal<TreatmentsHeroGlobal>('treatments-hero', 1, locale).catch(() => ({})),
      fetchGlobal<TreatmentsIndexSectionGlobal>('treatments-index-section', 1, locale).catch(() => ({})),
      fetchGlobal<TreatmentsStatsGlobal>('treatments-stats', 1, locale).catch(() => ({})),
      fetchGlobal<DisciplineDetailTemplateGlobal>('discipline-detail-template', 1, locale).catch(() => ({})),
      fetchGlobal<SubCategoryDetailTemplateGlobal>('sub-category-detail-template', 1, locale).catch(() => ({})),
      fetchGlobal<SurgeonsHeroGlobal>('surgeons-hero', 1, locale).catch(() => ({})),
      Promise.resolve({}), // surgeons-lead-view merged into surgeons-plastic-view.lead
      Promise.resolve({}), // surgeons-plastic-view merged into surgeons-hero.sections
      Promise.resolve({}), // surgeons-aesthetic-view merged into surgeons-plastic-view.aestheticMedicine
      fetchGlobal<SurgeonDetailTemplateGlobal>('surgeon-detail-template', 1, locale).catch(() => ({})),
      fetchGlobal<BlogPostTemplateGlobal>('blog-post-template', 1, locale).catch(() => ({})),
      Promise.resolve({}), // pricing-hero merged into treatments-hero.pricing
      fetchGlobal<PricingOverviewGlobal>('pricing-overview', 1, locale).catch(() => ({})),
      fetchGlobal<PricingFootnoteGlobal>('pricing-footnote', 1, locale).catch(() => ({})),
      Promise.resolve({}), // pricing-insurance merged into treatments-hero.pricing
      Promise.resolve({}), // pricing-payment merged into pricing-insurance.payment
      fetchGlobal<PricingDisciplineListViewGlobal>('pricing-discipline-list-view', 1, locale).catch(() => ({})),
      fetchGlobal<PricingCatalogueViewGlobal>('pricing-catalogue-view', 1, locale).catch(() => ({})),
      fetchGlobal<ResultsHeroGlobal>('results-hero', 1, locale).catch(() => ({} as ResultsHeroGlobal)),
      fetchGlobal<ResultsFeaturedCasesViewGlobal>('results-featured-cases-view', 1, locale).catch(() => ({})),
      fetchGlobal<ResultsStoriesViewGlobal>('results-stories-view', 1, locale).catch(() => ({})),
      fetchGlobal<LibraryCtaGlobal>('library-cta', 1, locale).catch(() => ({})),
      fetchGlobal<HomeHeroGlobal>('home-hero', 1, locale).catch(() => ({})),
      fetchGlobal<HomeIntroGlobal>('home-intro', 1, locale).catch(() => ({})),
      fetchGlobal<HomeLeadMagnetGlobal>('home-lead-magnet', 1, locale).catch(() => ({})),
      fetchGlobal<HomePlaceGlobal>('home-place', 1, locale).catch(() => ({})),
      fetchGlobal<HomeTreatmentsViewGlobal>('home-treatments-view', 1, locale).catch(() => ({})), // now 'Sections'
      Promise.resolve({}), // home-pricing-view merged into home-treatments-view.pricing
      fetchGlobal<HomeSurgeonsViewGlobal>('home-surgeons-view', 1, locale).catch(() => ({})),
      Promise.resolve({}), // home-gallery-view merged into home-treatments-view.gallery
      Promise.resolve({}), // home-journey-view merged into home-intro.journey
      Promise.resolve({}), // home-stories-view merged into home-treatments-view.stories
      fetchGlobal<NotFoundPageGlobal>('not-found-page', 1, locale).catch(() => ({})),
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
        lede: pp.lede || (treatmentsHero as any)?.pricing?.lede || pricingHero.lede,
        heroImage: pp.heroImage || (treatmentsHero as any)?.pricing?.heroImage || pricingHero.heroImage || undefined,
        chapterTitle: pp.chapterTitle || {
          a: (treatmentsHero as any)?.pricing?.titleA || pricingHero.titleA,
          b: (treatmentsHero as any)?.pricing?.titleB || pricingHero.titleB,
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
      libraryCta,
      shareCta: libraryCta.share ?? {},
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

export async function loadCmsCache(force = false, locale: Locale = 'en'): Promise<CmsCache> {
  const current = caches[locale] ?? EMPTY_CACHE
  if (!force && current.loaded && Date.now() - current.loadedAt < CACHE_TTL_MS) {
    return current
  }
  if (inflights[locale]) return inflights[locale]!
  inflights[locale] = doLoad(locale).then((next) => {
    caches[locale] = next
    inflights[locale] = null
    return next
  })
  return inflights[locale]!
}

export function getCmsCacheSync(locale: Locale = 'en'): CmsCache {
  return caches[locale] ?? EMPTY_CACHE
}

export function setCmsCacheSync(next: CmsCache, locale: Locale = 'en'): void {
  caches[locale] = next
}
