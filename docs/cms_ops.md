# BIMC CosMedic — Payload CMS Operations

> Operational reference for **Cosmedic CMS** (Payload v3 white-labelled). Companion to `docs/cms_info.md` (branding/customization — the LOOK) and `docs/db_schema.md` (collections + fields — the WHAT). This doc is the HOW — how the CMS initialises, persists, exposes data, hooks into the web, and gets seeded.

---

## 1. What Payload is doing here

Payload v3 sits at `127.0.0.1:4007` as a Next.js app that:

1. **Persists** all editorial content + media metadata to Postgres (`cosmedic` db).
2. **Exposes** that content via three APIs:
   - REST: `/api/<collection>` and `/api/globals/<global>`
   - GraphQL: `/api/graphql`
   - Local API (for in-process callers like seed scripts and afterChange hooks)
3. **Hosts the admin UI** at `/admin` — white-labelled as Cosmedic CMS.
4. **Serves media files** from `packages/cms/public/media/` (mounted from disk; Payload writes here on upload).

The web app at `:3007` consumes Payload via HTTP fetch (REST). Web never imports Payload directly.

## 2. Init (Phase 1, one-time)

```bash
cd /var/www/cosmedic
pnpm create payload-app@latest \
  --name cms \
  --use-pnpm \
  --template blank \
  --db postgres
```

Then move into `packages/cms/` (the script may put it at root — adjust):

```bash
mv cms packages/cms
```

Update `packages/cms/package.json`:
- `"name": "@cosmedic/cms"`
- Add: `"scripts.dev": "PORT=4007 next dev"`, `"scripts.start": "PORT=4007 next start"`
- Add: `"scripts.generate:types": "payload generate:types"`
- Add: `"scripts.migrate": "payload migrate"`, `"scripts.migrate:create": "payload migrate:create"`

Apply Cosmedic CMS branding per `docs/cms_info.md` — three React components + admin-theme.css + admin config block.

## 3. `payload.config.ts` skeleton

```ts
import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import sharp from 'sharp'
import path from 'path'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Surgeons } from './collections/Surgeons'
// ...all collections

import { Settings } from './globals/Settings'
import { Header } from './globals/Header'
// ...all globals

export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://127.0.0.1:4007',
  admin: {
    user: Users.slug,
    theme: 'all',
    meta: {
      titleSuffix: ' — Cosmedic CMS',
      description: 'BIMC CosMedic — content management for the clinic team.',
      icons: [{ rel: 'icon', type: 'image/png', url: '/cosmedic-favicon.png' }],
      openGraph: { siteName: 'Cosmedic CMS', images: [{ url: '/cosmedic-mark-on-light.png' }] },
    },
    components: {
      graphics: {
        Icon: '@/components/CosmedicIcon',
        Logo: '@/components/CosmedicLogo',
      },
      beforeLogin: ['@/components/CosmedicBeforeLogin'],
    },
    css: path.resolve(__dirname, 'styles/admin-theme.css'),
  },
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [
      ...defaultFeatures,
      // Custom features for cosmedic — italic, blockquote, link, etc. are in defaults
    ],
  }),
  collections: [
    Users, Media,
    Surgeons, Disciplines, SubCategories, Procedures,
    PriceListItems, InjectableProducts, MachineTreatments, HairRemovalAreas,
    BeforeAfterCases, Stories, PressMentions, Awards, RecoveryStays, PricingTiers,
    BlogPosts, BlogTags, Authors,
    Pages, JourneySteps, InclusionItems, ExclusionItems,
    Enquiries, NewsletterSubscribers, Redirects,
  ],
  globals: [
    Settings, Header, Footer, FloatingChrome,
    BrandStats, EndorsementMark, ConsultationPolicy, FormDefaults,
    EmailTemplates, SeoDefaults,
  ],
  localization: {
    locales: ['en', 'id'],
    defaultLocale: 'en',
    fallback: true,
  },
  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URI },
    push: false,  // production safety — use explicit migrations
  }),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: { outputFile: path.resolve(__dirname, 'payload-types.ts') },
  sharp,
  cors: [process.env.FRONTEND_URL || 'http://127.0.0.1:3007'],
  csrf: [process.env.FRONTEND_URL || 'http://127.0.0.1:3007'],
})
```

## 4. Type generation flow

Payload generates TypeScript types from the live config:

```bash
pnpm --filter @cosmedic/cms generate:types
# Writes packages/cms/src/payload-types.ts
```

Run this:
- Whenever a collection's fields change.
- Before committing — types should always match the config.
- In CI (if any) as a verification step.

**Web consumes these types** via a TS path alias in `packages/web/tsconfig.json`:

```jsonc
{
  "compilerOptions": {
    "paths": {
      "@cosmedic/cms-types": ["../cms/src/payload-types.ts"]
    }
  }
}
```

Then in web code:

```ts
import type { Surgeon, Procedure } from '@cosmedic/cms-types'
```

Sharing types this way is the only direct coupling between web and cms packages — everything else flows over HTTP.

## 5. Collection implementation patterns

### Common field conventions

Every collection includes these shared fields (define once in a helper, reuse):

```ts
// packages/cms/src/fields/common.ts
import type { Field } from 'payload'

export const slugField: Field = {
  name: 'slug',
  type: 'text',
  required: true,
  unique: true,
  index: true,
  admin: { position: 'sidebar' },
}

export const seoGroup: Field = {
  name: 'seo',
  type: 'group',
  fields: [
    { name: 'title', type: 'text', localized: true },
    { name: 'description', type: 'textarea', localized: true },
    { name: 'ogImage', type: 'upload', relationTo: 'media' },
    { name: 'canonical', type: 'text' },
  ],
}

export const sortOrderField: Field = {
  name: 'sortOrder',
  type: 'number',
  defaultValue: 0,
  admin: { position: 'sidebar' },
}
```

### Example collection: `Surgeons`

```ts
// packages/cms/src/collections/Surgeons.ts
import type { CollectionConfig } from 'payload'
import { slugField, seoGroup, sortOrderField } from '../fields/common'
import { adminOrEditor, publicRead } from '../access'

export const Surgeons: CollectionConfig = {
  slug: 'surgeons',
  admin: {
    useAsTitle: 'commonName',
    defaultColumns: ['commonName', 'group', 'lead', 'slug', 'updatedAt'],
    listSearchableFields: ['name', 'commonName', 'slug'],
  },
  access: {
    read: publicRead,            // public can read published
    create: adminOrEditor,
    update: adminOrEditor,
    delete: adminOrEditor,
  },
  versions: {
    drafts: { autosave: { interval: 2000 } },  // editors get autosave drafts
    maxPerDoc: 25,
  },
  fields: [
    slugField,
    { name: 'name', type: 'text', required: true, localized: true },
    { name: 'commonName', type: 'text', required: true, localized: true },
    { name: 'title', type: 'text', defaultValue: 'dr.' },
    { name: 'suffix', type: 'text' },
    { name: 'spec', type: 'text', localized: true },
    { name: 'train', type: 'text', localized: true },
    { name: 'proc', type: 'text' },
    { name: 'yearsInPractice', type: 'number' },
    { name: 'hue', type: 'number', min: 0, max: 5 },
    { name: 'group', type: 'select', options: ['Plastic Surgery', 'Aesthetic Medicine'], required: true },
    { name: 'lead', type: 'checkbox', defaultValue: false },
    { name: 'credLine', type: 'text', localized: true },
    { name: 'bio', type: 'richText', localized: true },
    { name: 'specAreas', type: 'array', localized: true, fields: [{ name: 'label', type: 'text' }] },
    { name: 'portrait', type: 'upload', relationTo: 'media', required: true },
    { name: 'portraitPosition', type: 'text', defaultValue: 'center 30%' },
    {
      name: 'availabilitySchedule',
      type: 'array',
      fields: [
        { name: 'day', type: 'select', options: ['mon','tue','wed','thu','fri','sat','sun'] },
        { name: 'windowStart', type: 'text', admin: { description: 'e.g. 09:00' } },
        { name: 'windowEnd', type: 'text', admin: { description: 'e.g. 17:00' } },
        { name: 'byAppointment', type: 'checkbox', defaultValue: true },
      ],
    },
    { name: 'languages', type: 'select', hasMany: true, options: ['en','id','ja','fr','de','zh','ko'] },
    { name: 'credentialedProcedures', type: 'relationship', relationTo: 'procedures', hasMany: true },
    seoGroup,
    sortOrderField,
  ],
}
```

### Example collection: `Pages` (block array)

```ts
import type { CollectionConfig } from 'payload'
import { ChapterOpener, RichText, CTABand, Stats, FAQAccordion, ProcedureList } from '../blocks'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: { useAsTitle: 'route', defaultColumns: ['route', 'publishStatus', 'updatedAt'] },
  versions: { drafts: true },
  fields: [
    { name: 'slug', type: 'text', required: true, unique: true },
    { name: 'route', type: 'text', required: true, unique: true, admin: { description: 'URL path, e.g. /journey' } },
    { name: 'chapterTitle', type: 'array', localized: true, minRows: 2, maxRows: 2,
      fields: [{ name: 'segment', type: 'text' }] },
    { name: 'tagline', type: 'text', localized: true },
    { name: 'lede', type: 'textarea', localized: true },
    { name: 'heroImage', type: 'upload', relationTo: 'media' },
    {
      name: 'sections',
      type: 'blocks',
      localized: true,
      blocks: [ChapterOpener, RichText, CTABand, Stats, FAQAccordion, ProcedureList /* ... */],
    },
    seoGroup,
  ],
}
```

## 6. Globals pattern

Globals are singletons — exactly one row each. Use for site-wide config + structural data:

```ts
// packages/cms/src/globals/Settings.ts
import type { GlobalConfig } from 'payload'

export const Settings: GlobalConfig = {
  slug: 'settings',
  access: { read: () => true, update: ({ req: { user } }) => Boolean(user) },
  fields: [
    { name: 'siteName', type: 'text', localized: true, required: true },
    { name: 'audToIdrRate', type: 'number', defaultValue: 10500 },
    { name: 'roundIdrTo', type: 'number', defaultValue: 50000 },
    { name: 'contactEmail', type: 'email', required: true },
    // ...
  ],
}
```

Globals are accessed via `/api/globals/settings` (REST) or `payload.findGlobal({ slug: 'settings' })` (local API).

## 7. Access control

Four roles, configured per collection:

```ts
// packages/cms/src/access/index.ts
import type { Access } from 'payload'

export const publicRead: Access = ({ req: { user }, data }) => {
  // Unauthenticated visitors see only published records
  if (!user) return { publishStatus: { equals: 'published' } }
  // Editors + admins see everything
  return true
}

export const adminOnly: Access = ({ req: { user } }) => user?.roles?.includes('admin') ?? false
export const adminOrEditor: Access = ({ req: { user } }) =>
  user?.roles?.includes('admin') || user?.roles?.includes('editor') || false

// Enquiries: public can create, only editors+admins can read/update
export const enquiriesCreate: Access = () => true
export const enquiriesNoDelete: Access = () => false
```

`Users` collection has a `roles` field:

```ts
{ name: 'roles', type: 'select', hasMany: true, options: ['admin', 'editor', 'content-only'], defaultValue: ['editor'] }
```

Role matrix:

| Role | Read | Create | Update | Delete |
|---|---|---|---|---|
| `admin` | all | all | all | all (except Enquiries — DB only) |
| `editor` | all | all editorial | all editorial | none |
| `content-only` | all | BlogPosts / Stories only | same | none |
| (unauthenticated) | published only via web | Enquiries only | — | — |

## 8. Localization

- `locales: ['en', 'id']`, `defaultLocale: 'en'`, `fallback: true` (ID falls back to EN if a field has no ID value).
- Per field, set `localized: true`.
- Querying: `payload.find({ collection: 'surgeons', locale: 'id' })` returns ID values where present, EN where not.
- Admin UI auto-shows locale selector on localized fields — editors fill EN + ID side-by-side.

URL routing: web prefixes `/id/` for ID locale (handled at the web route level, not Payload).

## 9. Hooks

Hooks fire at points in the document lifecycle. We use them sparingly — each adds complexity.

### Common cosmedic hooks

```ts
// packages/cms/src/hooks/slugFromName.ts
// On beforeChange: auto-generate slug from name if not set
export const slugFromName: CollectionBeforeChangeHook = ({ data, operation }) => {
  if (operation === 'create' && !data.slug && data.name) {
    data.slug = data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
  }
  return data
}

// packages/cms/src/hooks/revalidateWeb.ts
// On afterChange: tell the web cache to bust this path
export const revalidateWeb: CollectionAfterChangeHook = async ({ doc, collection, req }) => {
  const path = pathForDoc(collection.slug, doc)  // e.g. /surgeons/suka
  if (!path) return doc
  try {
    await fetch(`${process.env.FRONTEND_URL}/api/revalidate`, {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-revalidate-token': process.env.REVALIDATE_TOKEN },
      body: JSON.stringify({ path }),
    })
  } catch (err) {
    req.payload.logger.warn({ err, path }, 'web revalidate failed')
  }
  return doc
}

// packages/cms/src/hooks/enquiryNotify.ts
// On afterChange (create only): send email to clinic on new enquiry
export const enquiryNotify: CollectionAfterChangeHook = async ({ doc, operation, req }) => {
  if (operation !== 'create') return doc
  const settings = await req.payload.findGlobal({ slug: 'settings' })
  await sendEmail({
    to: settings.contactEmail,
    subject: `New enquiry — ${doc.name} — ${doc.treatmentInterest ?? 'general'}`,
    html: renderEnquiryEmail(doc),
  })
  return doc
}
```

Apply per collection:

```ts
// Procedures.ts
hooks: {
  beforeChange: [slugFromName],
  afterChange: [revalidateWeb],
}

// Enquiries.ts
hooks: {
  afterChange: [enquiryNotify],
}
```

## 10. Drafts + preview

### Drafts

Enable per collection that needs review-before-publish:

```ts
versions: {
  drafts: {
    autosave: { interval: 2000 },  // optional autosave (Pages, BlogPosts)
  },
  maxPerDoc: 50,                    // keep last 50 versions for rollback
}
```

When `drafts: true`, editors save as draft by default; an explicit "Publish" button changes status. Public reads only see `publishStatus: 'published'`.

### Preview links

Editors click "Preview" in admin → opens the web frontend in draft mode:

```ts
// packages/cms/src/collections/Pages.ts (in admin block)
admin: {
  preview: (doc) => `${process.env.FRONTEND_URL}/api/preview?path=${encodeURIComponent(doc.route)}&token=...`,
}
```

The web's `/api/preview` handler validates the token, sets a draft-mode cookie, and redirects to the requested path. The route's data loader checks the cookie and fetches `draft: true` from Payload instead of published-only.

## 11. Media + image pipeline

```ts
// packages/cms/src/collections/Media.ts
import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  upload: {
    staticDir: 'media',
    adminThumbnail: 'sm',
    mimeTypes: ['image/png', 'image/jpeg', 'image/webp', 'image/avif', 'image/svg+xml', 'application/pdf'],
    imageSizes: [
      { name: 'sm',  width: 480 },
      { name: 'md',  width: 768 },
      { name: 'lg',  width: 1280 },
      { name: 'xl',  width: 1920 },
      { name: '2xl', width: 2560 },
    ],
    formatOptions: { format: 'avif', options: { quality: 80 } },
    // Sharp also auto-generates WebP and original (JPG/PNG) for fallback
  },
  fields: [
    { name: 'alt', type: 'text', required: true, localized: true,
      admin: { description: 'Required for accessibility (Lighthouse a11y Green).' } },
    { name: 'caption', type: 'text', localized: true },
    { name: 'credit', type: 'text', admin: { description: 'Photographer / source attribution' } },
    { name: 'license', type: 'select', options: ['licensed', 'cc-by', 'cc-by-sa', 'public-domain', 'ai-generated', 'unknown'] },
  ],
}
```

Files land in `packages/cms/public/media/` (gitignored). nginx serves `/api/media/*` with `expires 30d` (set in Phase 8 nginx config).

### `<Img>` consumes media

In web, the `<Img>` primitive reads Payload Media records and emits `<picture>` with `<source srcset>` for AVIF + WebP + original:

```tsx
function Img({ media, sizes = '100vw', loading = 'lazy' }) {
  const src = media.url
  const sizes2x = media.sizes?.['2xl']?.url
  const srcsetAvif = Object.entries(media.sizes ?? {})
    .map(([, s]) => `${s.url} ${s.width}w`)
    .join(', ')
  return (
    <picture>
      <source type="image/avif" srcSet={srcsetAvif} sizes={sizes} />
      <source type="image/webp" srcSet={srcsetWebp} sizes={sizes} />
      <img src={src} alt={media.alt} loading={loading} />
    </picture>
  )
}
```

## 12. Seed flow (Phase 6)

Orchestrator: `packages/cms/src/seed/index.ts`. Order matters because of relationships.

```ts
import payload from 'payload'
import { initPayload } from '../init'
import { seedSettings } from './settings'
import { seedMedia } from './media'
import { seedSurgeons } from './surgeons'
import { seedDisciplines } from './disciplines'
import { seedSubcategories } from './subcategories'
import { seedProcedures } from './procedures'
import { seedPriceListFromXlsx } from './priceList'
// ...

async function main() {
  await initPayload({ local: true })

  // 1. Globals first (no dependencies)
  await seedSettings()
  await seedBrandStats()
  await seedEndorsementMark()
  await seedConsultationPolicy()
  await seedFormDefaults()
  await seedEmailTemplates()
  await seedSeoDefaults()

  // 2. Media (everything else may reference it)
  const mediaIds = await seedMedia()

  // 3. Catalogue, in dependency order
  await seedDisciplines(mediaIds)
  await seedSubcategories(mediaIds)
  await seedProcedures(mediaIds)
  await seedPriceListFromXlsx({ xlsxPath: '../../docs/pricelist.xlsx' })
  await seedInjectableProducts()
  await seedMachineTreatments()
  await seedHairRemovalAreas()

  // 4. Editorial overrides
  await seedPages(mediaIds)
  await seedJourneySteps()
  await seedInclusionItems()
  await seedExclusionItems()

  // 5. Catalogue records that reference everything else
  await seedBeforeAfterCases(mediaIds)
  await seedStories(mediaIds)
  await seedPressMentions(mediaIds)
  await seedAwards(mediaIds)
  await seedRecoveryStays(mediaIds)
  await seedPricingTiers()

  // 6. Surgeons last (references credentialedProcedures)
  await seedSurgeons(mediaIds)

  // 7. Bootstrap admin (idempotent — no-op if exists)
  await seedAdmin()

  process.exit(0)
}
main()
```

### Idempotency rule

Every seed function uses upsert-by-slug:

```ts
export async function seedSurgeons(mediaIds: MediaIdMap) {
  for (const data of SURGEON_LIST) {
    const existing = await payload.find({
      collection: 'surgeons',
      where: { slug: { equals: data.slug } },
      limit: 1,
    })
    if (existing.docs.length > 0) {
      await payload.update({ collection: 'surgeons', id: existing.docs[0].id, data })
    } else {
      await payload.create({ collection: 'surgeons', data })
    }
  }
}
```

### xlsx parsing

`packages/cms/src/seed/priceList.ts`:

```ts
import xlsx from 'xlsx'

const wb = xlsx.readFile(xlsxPath)
for (const sheetName of ['Surgical Procedures', 'Non Surgical Treatments', 'Machine', 'Injection', 'BTL']) {
  const sheet = wb.Sheets[sheetName]
  const rows = xlsx.utils.sheet_to_json(sheet, { header: 1, defval: null })
  // Custom parser per sheet — section headers, top-3 flags, range prices, `*` implant marker
  // ...
}
```

Reference for the actual structure: `docs/db_schema.md` and the live `docs/pricelist.xlsx` columns.

## 13. Email pipeline (Phase 7)

```ts
// packages/cms/src/email.ts
import nodemailer from 'nodemailer'
import { emailAdapter } from '@payloadcms/email-nodemailer'

export const email = emailAdapter({
  defaultFromAddress: 'no-reply@cosmedic.gaiada.online',
  defaultFromName: 'Cosmedic CMS',
  transport: nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  }),
})
```

Wire into `payload.config.ts`:

```ts
email,
```

### Sending from a hook

```ts
import { renderEnquiryEmail } from '../templates/enquiry'

await req.payload.sendEmail({
  to: settings.contactEmail,
  subject: `New enquiry — ${doc.name}`,
  html: renderEnquiryEmail(doc),
})
```

### Email templates

Templates live in `packages/cms/src/templates/`. Two layers:

1. **Static templates** (TS functions, compile-time): used for system emails (password reset, admin notifications).
2. **Editable templates** in the `EmailTemplates` global: editors can customize the enquiry autoresponder copy without code changes. Hook loads the template by ID, runs string interpolation, sends.

## 14. Custom admin UI (Phase 1 branding + future)

Branding components covered in `docs/cms_info.md`. Additional Phase-1+ custom components if needed:

- **PriceCalculator** field component — for `Procedures.pricing`, shows live IDR ⇄ AUD conversion using `Settings.audToIdrRate`.
- **SurgeonAvailabilityPreview** — renders the availability schedule visually instead of just the raw array.
- **EnquiryStatusKanban** — alternative admin view for Enquiries (later, Phase 12+).

All custom UIs land in `packages/cms/src/components/` and are referenced from `field.admin.components` or `admin.components` config.

## 15. Web ↔ CMS data flow

The web app fetches from Payload over HTTP. Pattern:

```ts
// packages/web/src/lib/payload-client.ts
const PAYLOAD_URL = process.env.PAYLOAD_URL ?? 'http://127.0.0.1:4007'

export async function findBySlug<T>(collection: string, slug: string, locale = 'en'): Promise<T | null> {
  const url = new URL(`${PAYLOAD_URL}/api/${collection}`)
  url.searchParams.set('where[slug][equals]', slug)
  url.searchParams.set('locale', locale)
  url.searchParams.set('depth', '2')  // populate first 2 levels of relationships
  const res = await fetch(url, { headers: { 'content-type': 'application/json' } })
  if (!res.ok) return null
  const { docs } = await res.json()
  return docs[0] ?? null
}

export async function findGlobal<T>(slug: string, locale = 'en'): Promise<T | null> {
  const res = await fetch(`${PAYLOAD_URL}/api/globals/${slug}?locale=${locale}`)
  return res.ok ? await res.json() : null
}
```

Per-route SSR loader:

```ts
// packages/web/src/routes/surgeons/[slug].tsx
export async function loader({ params, request }: LoaderArgs) {
  const locale = getLocale(request)
  const [surgeon, settings, header, footer] = await Promise.all([
    findBySlug<Surgeon>('surgeons', params.slug, locale),
    findGlobal<Settings>('settings', locale),
    findGlobal<Header>('header', locale),
    findGlobal<Footer>('footer', locale),
  ])
  if (!surgeon) throw new Response('Not found', { status: 404 })
  return { surgeon, settings, header, footer, locale }
}
```

### Revalidation contract

When Payload mutates a record (afterChange hook), it posts to web:

```
POST http://127.0.0.1:3007/api/revalidate
x-revalidate-token: <shared secret from .env>
{ "path": "/surgeons/suka" }
```

Web's `/api/revalidate` handler verifies token, then invalidates its in-memory cache + ISR pages.

## 16. Bootstrap super-admin

First boot only: `packages/cms/src/seed/admin.ts` creates the super-admin from env vars if no user exists:

```ts
export async function seedAdmin() {
  const existing = await payload.find({ collection: 'users', limit: 1 })
  if (existing.docs.length > 0) return  // skip — at least one user exists

  await payload.create({
    collection: 'users',
    data: {
      email: process.env.PAYLOAD_SEED_ADMIN_EMAIL!,
      password: process.env.PAYLOAD_SEED_ADMIN_PASSWORD!,
      roles: ['admin'],
    },
  })
}
```

Env (gitignored):

```bash
PAYLOAD_SEED_ADMIN_EMAIL=super_admin@email.com
PAYLOAD_SEED_ADMIN_PASSWORD=Teameditor@123
```

Post-launch (Phase 12):
1. Rotate the bootstrap password to a strong random value via /admin.
2. Create per-editor accounts with appropriate roles.
3. Optionally disable the bootstrap user.

## 17. Operational commands quick-reference

```bash
# Run dev (cms only)
pnpm --filter @cosmedic/cms dev

# Build
pnpm --filter @cosmedic/cms build

# Generate types after schema change
pnpm --filter @cosmedic/cms generate:types

# Create + run migration
pnpm --filter @cosmedic/cms exec payload migrate:create add_some_field
pnpm --filter @cosmedic/cms exec payload migrate

# Seed (idempotent — safe to re-run)
pnpm --filter @cosmedic/cms exec tsx src/seed/index.ts

# Restart in production
pm2 restart cosmedic-cms

# Tail logs
pm2 logs cosmedic-cms --lines 100

# Open Payload admin
open https://cosmedic.gaiada.online/admin
```

## 18. Anti-patterns to avoid

- ❌ **Importing Payload from web code.** Web must always go through HTTP — never `import payload from 'payload'` in `packages/web/`. Tight coupling will break when Phase 8 hardens the boundary.
- ❌ **Writing to Postgres tables directly.** Even seed scripts should use Payload's Local API so hooks fire and relationships resolve.
- ❌ **Editing the auto-generated `payload-types.ts`.** It's overwritten on every `generate:types`.
- ❌ **Adding fields without a migration.** With `push: false`, the DB won't auto-match — Payload will error on startup. Always: edit collection → `migrate:create` → `migrate`.
- ❌ **Putting secrets in `payload.config.ts`.** All secrets via `process.env.*` so the config can be committed safely.
- ❌ **Bypassing access control via root API key.** A root key exists for seed/migration scripts — never expose it to web or to a public endpoint.
- ❌ **Reusing slugs across collections.** `surgeons/suka` and `pages/suka` would both be slugged "suka" — Payload handles it (slug uniqueness is per-collection), but it's confusing for editors. Pick distinct naming.
