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
import { PriceListItems } from './collections/PriceListItems'
import { InjectableProducts } from './collections/InjectableProducts'
import { MachineTreatments } from './collections/MachineTreatments'
import { HairRemovalAreas } from './collections/HairRemovalAreas'
import { BeforeAfterCases } from './collections/BeforeAfterCases'
import { Stories } from './collections/Stories'
import { PressMentions } from './collections/PressMentions'
import { Awards } from './collections/Awards'
import { RecoveryStays } from './collections/RecoveryStays'
import { PricingTiers } from './collections/PricingTiers'
import { BlogPosts } from './collections/BlogPosts'
import { BlogTags } from './collections/BlogTags'
import { Authors } from './collections/Authors'
import { JourneySteps } from './collections/JourneySteps'
import { InclusionItems } from './collections/InclusionItems'
import { ExclusionItems } from './collections/ExclusionItems'
import { Pages } from './collections/Pages'
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

import { seedSuperAdmin } from './seed/admin'
import { emailAdapter } from './lib/email-adapter'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    theme: 'all',
    meta: {
      titleSuffix: ' — Cosmedic CMS',
      description: 'BIMC CosMedic — content management for the clinic team.',
      icons: [{ rel: 'icon', type: 'image/png', url: '/cosmedic-favicon.png' }],
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
    PriceListItems,
    InjectableProducts,
    MachineTreatments,
    HairRemovalAreas,
    BeforeAfterCases,
    Stories,
    PressMentions,
    Awards,
    RecoveryStays,
    PricingTiers,
    BlogPosts,
    BlogTags,
    Authors,
    JourneySteps,
    InclusionItems,
    ExclusionItems,
    Pages,
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
