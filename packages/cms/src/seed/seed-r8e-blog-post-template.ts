/**
 * Phase R8.E — BlogPostTemplate global seed.
 *
 * The global's field schema already provides defaults ('Written by',
 * 'About the author', 'More from the journal', etc.), so /blog/<slug>
 * renders correctly even with the DB row empty (Payload falls back to
 * field defaults when reading globals).
 *
 * This seed explicitly writes that default snapshot into the DB row so:
 *   1. Editors see the values pre-populated when they open the global
 *      in the admin (cleaner UX than blank fields hinted only by
 *      placeholder text).
 *   2. The source of truth for the rendered strings is the DB, not the
 *      schema — eliminates the surprise of "I cleared the field but the
 *      old text is still showing."
 *
 * Idempotent (updateGlobal upserts). Run via:
 *   NODE_ENV=production pnpm --filter @cosmedic/cms exec tsx \
 *     src/seed/seed-r8e-blog-post-template.ts
 */

import { config as loadEnv } from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
loadEnv({ path: path.resolve(dirname, '../../.env') })

const { getPayload } = await import('payload')
const config = (await import('../payload.config')).default
const { upsertGlobal } = await import('./seed-helpers')

async function main(): Promise<void> {
  const payload = await getPayload({ config })
  payload.logger.info('[seed-r8e-blog-post-template] starting')

  await upsertGlobal(payload, 'blog-post-template', {
    byline: {
      writtenByLabel: 'Written by',
      publishedLabel: 'Published',
      lengthLabel: 'Length',
      filedUnderLabel: 'Filed under',
    },
    aboutTheAuthor: {
      eyebrowLabel: 'About the author',
      readFullProfileCta: 'Read full profile',
      bookConsultationCta: 'Book a consultation',
    },
    moreFromTheJournal: {
      eyebrow: 'More from the journal',
      headingPre: 'Read ',
      headingItalic: 'on.',
      backToJournalCta: 'Back to the journal',
    },
  })

  payload.logger.info('[seed-r8e-blog-post-template] done')
  process.exit(0)
}

main().catch((err) => {
  console.error('[seed-r8e-blog-post-template] failed:', err)
  process.exit(1)
})
