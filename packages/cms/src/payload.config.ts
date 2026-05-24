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
import { StoriesPage } from './globals/pages/StoriesPage'
import { RecoveryStaysPage } from './globals/pages/RecoveryStaysPage'
import { ContactPage } from './globals/pages/ContactPage'
import { VideoConsultPage } from './globals/pages/VideoConsultPage'
import { BlogPage } from './globals/pages/BlogPage'

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
    SurgeonsPage,
    ResultsPage,
    GalleryPage,
    PricingPage,
    JourneyPage,
    StoriesPage,
    RecoveryStaysPage,
    ContactPage,
    VideoConsultPage,
    BlogPage,
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
