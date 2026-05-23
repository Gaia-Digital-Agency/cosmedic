/**
 * Seed Inclusion / Exclusion / Journey-step records parsed from the
 * "Further Information" section of pricelist.xlsx.
 */

import type { Payload } from 'payload'
import { upsert } from './seed-helpers'
import { paragraphsToLexical } from './lexical'
import { parseFurtherInformation, slugify } from './parse-pricelist'

export async function seedIncludesExcludesJourney(payload: Payload): Promise<void> {
  const further = parseFurtherInformation()
  let order = 0
  for (const text of further.includes) {
    await upsert(payload, 'inclusion-items', 'text', text, { text, scope: 'surgical-procedure', sortOrder: order++ })
  }
  order = 0
  for (const text of further.excludes) {
    await upsert(payload, 'exclusion-items', 'text', text, { text, scope: 'surgical-procedure', sortOrder: order++ })
  }
  order = 0
  for (const day of further.journey) {
    const slug = slugify(day.dayLabel)
    await upsert(payload, 'journey-steps', 'slug', slug, {
      slug,
      order: order++,
      dayLabel: day.dayLabel,
      title: day.dayLabel,
      body: paragraphsToLexical(day.lines),
      category: 'medical',
      sortOrder: order,
    })
  }
  payload.logger.info(`[seed] inclusions=${further.includes.length} exclusions=${further.excludes.length} journey-days=${further.journey.length}`)
}
