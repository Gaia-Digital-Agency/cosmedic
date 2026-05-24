/**
 * Phase 6 content seed orchestrator.
 *
 * Idempotent — each section finds-by-slug then either updates or creates.
 * Safe to re-run. Split into focused modules (this file is the entry point):
 *
 *   - seed-helpers.ts        — upsert / upsertGlobal primitives
 *   - seed-globals.ts        — Settings / branding / forms / Header / Footer
 *   - seed-includes.ts       — Inclusion / Exclusion / JourneySteps
 *   - seed-taxonomy.ts       — Surgeons → Disciplines → SubCategories → Procedures
 *   - seed-content.ts        — BA / Awards / Press / Recovery Stays / Pricing Tiers / Blog
 *   - seed-page-globals.ts   — 14 editorial Page globals
 *
 * Order matters: each downstream step depends on the id-by-slug maps the
 * previous taxonomy steps return.
 */

import type { Payload } from 'payload'
import { seedGlobals } from './seed-globals'
import { seedIncludesExcludesJourney } from './seed-includes'
import {
  seedSurgeons,
  seedDisciplines,
  seedSubCategories,
  seedProcedures,
} from './seed-taxonomy'
import {
  seedBeforeAfterCases,
  seedAwards,
  seedPressMentions,
  seedRecoveryStays,
  seedBlogPosts,
} from './seed-content'
import { seedPageGlobals } from './seed-page-globals'

export async function runContentSeed(payload: Payload): Promise<void> {
  payload.logger.info('[seed] content: starting')

  await seedGlobals(payload)
  await seedIncludesExcludesJourney(payload)

  const surgeonIdBySlug = await seedSurgeons(payload)
  const disciplineIdBySlug = await seedDisciplines(payload, surgeonIdBySlug)
  const subCatIdBySlug = await seedSubCategories(payload, disciplineIdBySlug, surgeonIdBySlug)
  await seedProcedures(payload, disciplineIdBySlug, subCatIdBySlug, surgeonIdBySlug)

  await seedBeforeAfterCases(payload)
  await seedAwards(payload)
  await seedPressMentions(payload)
  await seedRecoveryStays(payload)
  await seedBlogPosts(payload)

  await seedPageGlobals(payload)

  payload.logger.info('[seed] content: done — run `pnpm seed:media` for imagery')
}
