import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Surgeons } from './collections/Surgeons'
import { Disciplines } from './collections/Disciplines'
import { SubCategories } from './collections/SubCategories'
import { Procedures } from './collections/Procedures'
import { BeforeAfterCases } from './collections/BeforeAfterCases'
import { Stories } from './collections/Stories'
import { PressMentions } from './collections/PressMentions'
import { Awards } from './collections/Awards'
import { RecoveryStays } from './collections/RecoveryStays'
import { BlogPosts } from './collections/BlogPosts'
import { BlogTags } from './collections/BlogTags'
import { Authors } from './collections/Authors'
import { JourneySteps } from './collections/JourneySteps'
import { Enquiries } from './collections/Enquiries'
import { Analytics } from './collections/Analytics'
import { PrivacySections } from './collections/PrivacySections'

import { Settings } from './globals/Settings'
import { Header } from './globals/Header'
import { Footer } from './globals/Footer'
import { FloatingChrome } from './globals/FloatingChrome'
import { BrandStats } from './globals/BrandStats'
import { EndorsementMark } from './globals/EndorsementMark'
import { ConsultationPolicy } from './globals/ConsultationPolicy'
import { FormDefaults } from './globals/FormDefaults'
import { EmailTemplates } from './globals/EmailTemplates'
import { SeoDefaults } from './globals/SeoDefaults'

import { HomePage } from './globals/pages/HomePage'
import { PressPage } from './globals/pages/PressPage'
import { PrivacyPage } from './globals/pages/PrivacyPage'
import { NotFoundPage } from './globals/pages/NotFoundPage'
import { TreatmentsPage } from './globals/pages/TreatmentsPage'
import { SurgeonsPage } from './globals/pages/SurgeonsPage'
import { ResultsPage } from './globals/pages/ResultsPage'
import { GalleryPage } from './globals/pages/GalleryPage'
import { PricingPage } from './globals/pages/PricingPage'
import { JourneyPage } from './globals/pages/JourneyPage'
import { JourneyHero } from './globals/pages/JourneyHero'
import { JourneyStats } from './globals/pages/JourneyStats'
import { StoriesPage } from './globals/pages/StoriesPage'
import { RecoveryStaysPage } from './globals/pages/RecoveryStaysPage'
import { ContactPage } from './globals/pages/ContactPage'
import { ContactHero } from './globals/pages/ContactHero'
import { ContactEnquirySection } from './globals/pages/ContactEnquirySection'
import { ContactVisitSection } from './globals/pages/ContactVisitSection'
import { VideoConsultPage } from './globals/pages/VideoConsultPage'
import { BlogPage } from './globals/pages/BlogPage'
import { BlogPostTemplate } from './globals/pages/BlogPostTemplate'

// Phase R4 — c. Doctors Bucket section globals.
// 5 globals that split /surgeons + /surgeons/<slug> editorial out of the
// hardcoded routes so every visible atom becomes CMS-editable.
import { SurgeonsHero } from './globals/doctors/SurgeonsHero'
import { SurgeonsLeadView } from './globals/doctors/SurgeonsLeadView'
import { SurgeonsPlasticView } from './globals/doctors/SurgeonsPlasticView'
import { SurgeonsAestheticView } from './globals/doctors/SurgeonsAestheticView'
import { SurgeonDetailTemplate } from './globals/doctors/SurgeonDetailTemplate'

// Phase R6 — e. Pricing Bucket section globals.
// 7 globals that split /pricing editorial out of the legacy nested groups
// on pricing-page (overviewBlock / footnoteBlock / insurancePaymentBlock)
// + lift the hardcoded ClinicCatalogueTable chrome into CMS.
import { PricingHero } from './globals/pricing/PricingHero'
import { PricingOverview } from './globals/pricing/PricingOverview'
import { PricingFootnote } from './globals/pricing/PricingFootnote'
import { PricingInsurance } from './globals/pricing/PricingInsurance'
import { PricingPayment } from './globals/pricing/PricingPayment'
import { PricingDisciplineListView } from './globals/pricing/PricingDisciplineListView'
import { PricingCatalogueView } from './globals/pricing/PricingCatalogueView'

// Phase R3 — b. Treatments Bucket section globals.
// 5 globals that lift the /treatments index chrome + the shared
// /treatments/<discipline> + /treatments/<sub-cat> template chrome out
// of the route source so every visible atom across the 29 treatment
// routes becomes CMS-editable.
import { TreatmentsHero } from './globals/treatments/TreatmentsHero'
import { TreatmentsIndexSection } from './globals/treatments/TreatmentsIndexSection'
import { TreatmentsStats } from './globals/treatments/TreatmentsStats'
import { DisciplineDetailTemplate } from './globals/treatments/DisciplineDetailTemplate'
import { SubCategoryDetailTemplate } from './globals/treatments/SubCategoryDetailTemplate'

// Phase R5 — d. Results Bucket section globals.
// 5 globals that lift /results + /gallery + /stories editorial out of the
// hardcoded routes; the two shared CTAs (library / share) close the prior
// cross-page duplication between /results+/gallery and /results+/stories.
import { ResultsHero } from './globals/results/ResultsHero'
import { ResultsFeaturedCasesView } from './globals/results/ResultsFeaturedCasesView'
import { ResultsStoriesView } from './globals/results/ResultsStoriesView'
import { LibraryCta } from './globals/results/LibraryCta'
import { ShareCta } from './globals/results/ShareCta'

// Phase R2 — a. Homepage Bucket section globals.
// 10 globals that split / editorial out of HomePage (the part-orphan
// page global with 9 block fields) into purpose-named globals. The first
// 4 are directly-editable (Hero, Intro, Lead-Magnet, Place); the last 6
// are view-only mirrors that own only the section chrome — their cards /
// data come from the source Bucket (b. Treatments, e. Pricing, c. Doctors,
// d. Results, f. Journey, d. Results).
import { HomeHero } from './globals/home/HomeHero'
import { HomeIntro } from './globals/home/HomeIntro'
import { HomeLeadMagnet } from './globals/home/HomeLeadMagnet'
import { HomePlace } from './globals/home/HomePlace'
import { HomeTreatmentsView } from './globals/home/HomeTreatmentsView'
import { HomePricingView } from './globals/home/HomePricingView'
import { HomeSurgeonsView } from './globals/home/HomeSurgeonsView'
import { HomeGalleryView } from './globals/home/HomeGalleryView'
import { HomeJourneyView } from './globals/home/HomeJourneyView'
import { HomeStoriesView } from './globals/home/HomeStoriesView'

import { seedSuperAdmin } from './seed/admin'
import { emailAdapter } from './lib/email-adapter'
import { fetchLiveAudToIdr, maybeUpdateRate } from './lib/exchangeRate'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  localization: {
    locales: ['en', 'id'],
    defaultLocale: 'en',
    fallback: true,
  },
  // Hide the global "Browse by Folder" nav button (keeps collection folders).
  folders: { browseByFolder: false },
  admin: {
    user: Users.slug,
    theme: 'all',
    avatar: {
      Component: '@/components/CosmedicUserAvatar',
    },
    meta: {
      titleSuffix: ' — Cosmedic CMS',
      description: 'BIMC CosMedic — content management for the clinic team.',
      // Next.js Metadata.icons shape (Payload MetaConfig extends Metadata).
      // The {icon, shortcut, apple} object form emits <link rel="icon"> etc.
      // automatically; the older [{rel, url}] array form is silently ignored.
      icons: {
        icon: [
          { url: '/favicon-16x16.png', type: 'image/png', sizes: '16x16' },
          { url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
          { url: '/android-chrome-192x192.png', type: 'image/png', sizes: '192x192' },
        ],
        shortcut: { url: '/favicon.ico' },
        apple: { url: '/apple-touch-icon.png', sizes: '180x180' },
      },
      openGraph: {
        siteName: 'Cosmedic CMS',
        description: 'BIMC CosMedic — content management for the clinic team.',
        images: [{ url: '/cosmedic-mark-on-light.png' }],
      },
    },
    components: {
      graphics: {
        Icon: '@/components/CosmedicIcon',
        Logo: '@/components/CosmedicLogo',
      },
      beforeLogin: ['@/components/CosmedicBeforeLogin'],
      beforeNav: ['@/components/CosmedicNavLogo'],
      afterNavLinks: ['@/components/CosmedicNavLabels'],
      providers: ['@/components/CmsGlobalStyles'],
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    // Ungrouped
    Users,
    // i. Media Library
    Media,
    // b. Treatments — data collections (always render before globals in Payload nav)
    Disciplines,
    SubCategories,
    Procedures,
    // c. Doctors
    Surgeons,
    // d. Results
    BeforeAfterCases,
    Stories,
    // f. Journey
    JourneySteps,
    RecoveryStays,
    // g. Contact
    Analytics,
    Enquiries,
    // h. About
    BlogPosts,
    BlogTags,
    Authors,
    PressMentions,
    Awards,
    PrivacySections,
  ],
  globals: [
    // ── a. Homepage ───────────────────────────────────────────────
    // Collections in this bucket: none. All 18 items are globals.
    // Registration order controls sidebar order within the group.
    HomePage,           // Main
    HomeHero,           // Hero
    Header,             // Header
    Footer,             // Footer
    HomeIntro,          // Intro
    BrandStats,         // Trust Strip
    HomeLeadMagnet,     // Lead Magnet
    HomePlace,          // Place
    FloatingChrome,     // Floating CTA
    EndorsementMark,    // Endorsement
    SeoDefaults,        // SEO Defaults
    Settings,           // Settings
    HomeTreatmentsView, // Treatments View
    HomePricingView,    // Pricing View
    HomeSurgeonsView,   // Surgeons View
    HomeGalleryView,    // Gallery View
    HomeJourneyView,    // Journey View
    HomeStoriesView,    // Stories View

    // ── b. Treatments ─────────────────────────────────────────────
    // Collections (Disciplines / SubCategories / Procedures) always first.
    TreatmentsPage,           // Main
    TreatmentsHero,           // Hero
    TreatmentsIndexSection,   // Index
    TreatmentsStats,          // Stats
    DisciplineDetailTemplate,    // Discipline Template
    SubCategoryDetailTemplate,   // Sub-Category Template

    // ── c. Doctors ────────────────────────────────────────────────
    // Collection (Surgeons) always first.
    SurgeonsPage,          // Main
    SurgeonsHero,          // Hero
    SurgeonsLeadView,      // Lead View
    SurgeonsPlasticView,   // Plastic Surgery View
    SurgeonsAestheticView, // Aesthetic Medicine View
    SurgeonDetailTemplate, // Detail Template

    // ── d. Results ────────────────────────────────────────────────
    // Collections (BeforeAfterCases / Stories) always first.
    ResultsPage,              // Main
    ResultsHero,              // Hero
    LibraryCta,               // Library CTA
    ShareCta,                 // Share CTA
    GalleryPage,              // Gallery
    StoriesPage,              // Stories
    ResultsFeaturedCasesView, // Featured Cases View
    ResultsStoriesView,       // Stories View

    // ── e. Pricing (globals moved to Treatments bucket — changes08-A) ──────
    PricingPage,               // Main
    PricingHero,               // Hero
    PricingOverview,           // Overview
    PricingFootnote,           // Footnote
    PricingInsurance,          // Insurance
    PricingPayment,            // Payment
    ConsultationPolicy,        // Consultation
    PricingDisciplineListView, // Discipline List View
    PricingCatalogueView,      // Catalogue View

    // ── f. Journey ────────────────────────────────────────────────
    // Collections (JourneySteps / RecoveryStays) always first.
    JourneyPage,       // Main
    JourneyHero,       // Hero
    JourneyStats,      // Stats
    RecoveryStaysPage, // Recovery Stays

    // ── g. Contact ────────────────────────────────────────────────
    // Collection (Enquiries / Inbox) always first.
    ContactPage,            // Main
    ContactHero,            // Hero
    ContactEnquirySection,  // Enquiry Section
    ContactVisitSection,    // Visit Section
    FormDefaults,           // Form
    EmailTemplates,         // Email
    VideoConsultPage,       // Video Consult

    // ── h. About ──────────────────────────────────────────────────
    // Collections (BlogPosts / BlogTags / Authors / PressMentions / Awards / PrivacySections) always first.
    BlogPage,          // Blog
    PressPage,         // Press
    PrivacyPage,       // Privacy
    BlogPostTemplate,  // Blog Post Template
    NotFoundPage,      // 404 Page
  ],
  endpoints: [
    {
      path: '/exchange-rate',
      method: 'post',
      handler: async (req) => {
        if (!req.user) return Response.json({ error: 'Unauthorized' }, { status: 401 })
        const mode = (req.query as Record<string, string>)?.mode ?? 'check'
        if (mode === 'check') {
          const liveRate = await fetchLiveAudToIdr()
          const settings = await req.payload.findGlobal({ slug: 'settings' }) as any
          return Response.json({ liveRate, currentRate: settings.audToIdrRate ?? 12800 })
        }
        // mode === 'apply' — force-apply regardless of threshold
        const liveRate = await fetchLiveAudToIdr()
        const settings = await req.payload.findGlobal({ slug: 'settings' }) as any
        const rateSource = `open.er-api.com · ${new Date().toISOString().slice(0, 16).replace('T', ' ')} UTC`
        await req.payload.updateGlobal({
          slug: 'settings',
          data: { audToIdrRate: liveRate, rateLastFetchedAt: new Date().toISOString(), rateSource },
        } as any)
        return Response.json({ liveRate, oldRate: settings.audToIdrRate, applied: true })
      },
    },
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  sharp,
  email: emailAdapter,
  plugins: [],
  onInit: async (payload) => {
    await seedSuperAdmin(payload)

    // Daily AUD→IDR rate check: once 60s after startup, then every 24h.
    const runRateCheck = () => {
      maybeUpdateRate(payload)
        .then((r) => payload.logger.info(r, 'exchange-rate check'))
        .catch((err) => payload.logger.error({ err }, 'exchange-rate fetch failed'))
    }
    setTimeout(runRateCheck, 60_000)
    setInterval(runRateCheck, 24 * 60 * 60 * 1_000)
  },
})
