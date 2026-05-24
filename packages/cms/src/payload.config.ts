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
// Phase C9c — PriceListItems / InjectableProducts / MachineTreatments /
// HairRemovalAreas collections retired. All catalogue rows now live on
// Procedures (catalogueGroup: surgical | machine | injection | btl). The
// underlying DB tables are intentionally preserved as a one-commit-rollback
// data backup; remove them only after sign-off on the unified /pricing.
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

import { seedSuperAdmin } from './seed/admin'
import { emailAdapter } from './lib/email-adapter'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
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
          { url: '/cosmedic-mark-32.png', type: 'image/png', sizes: '32x32' },
          { url: '/cosmedic-mark-192.png', type: 'image/png', sizes: '192x192' },
        ],
        shortcut: { url: '/favicon.ico' },
        apple: { url: '/cosmedic-apple-180.png', sizes: '180x180' },
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
      beforeNavLinks: ['@/components/CmsSidebarExplainer'],
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Users,
    Media,
    Surgeons,
    Disciplines,
    SubCategories,
    Procedures,
    BeforeAfterCases,
    Stories,
    PressMentions,
    Awards,
    RecoveryStays,
    BlogPosts,
    BlogTags,
    Authors,
    JourneySteps,
    Enquiries,
    PrivacySections,
  ],
  globals: [
    Settings,
    Header,
    Footer,
    FloatingChrome,
    BrandStats,
    EndorsementMark,
    ConsultationPolicy,
    FormDefaults,
    EmailTemplates,
    SeoDefaults,
    // 14 per-page Globals (replaces the Pages collection's per-row records).
    // Each lives in its bucket's admin.group for site-mirror navigation.
    HomePage,
    PressPage,
    PrivacyPage,
    TreatmentsPage,
    TreatmentsHero,
    TreatmentsIndexSection,
    TreatmentsStats,
    DisciplineDetailTemplate,
    SubCategoryDetailTemplate,
    SurgeonsPage,
    SurgeonsHero,
    SurgeonsLeadView,
    SurgeonsPlasticView,
    SurgeonsAestheticView,
    SurgeonDetailTemplate,
    ResultsPage,
    ResultsHero,
    LibraryCta,
    ShareCta,
    ResultsFeaturedCasesView,
    ResultsStoriesView,
    GalleryPage,
    PricingPage,
    PricingHero,
    PricingOverview,
    PricingFootnote,
    PricingInsurance,
    PricingPayment,
    PricingDisciplineListView,
    PricingCatalogueView,
    JourneyPage,
    JourneyHero,
    JourneyStats,
    StoriesPage,
    RecoveryStaysPage,
    ContactPage,
    ContactHero,
    ContactEnquirySection,
    ContactVisitSection,
    VideoConsultPage,
    BlogPage,
    BlogPostTemplate,
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
  },
})
