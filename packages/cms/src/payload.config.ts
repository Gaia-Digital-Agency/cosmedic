import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { seedSuperAdmin } from './seed/admin'

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
  collections: [Users, Media],
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
  plugins: [],
  onInit: async (payload) => {
    await seedSuperAdmin(payload)
  },
})
