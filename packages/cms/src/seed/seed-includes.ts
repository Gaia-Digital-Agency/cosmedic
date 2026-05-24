/**
 * Seed Journey-step records parsed from the "Further Information" section
 * of pricelist.xlsx. (Inclusion/Exclusion seeding removed in q19 alongside
 * the dropped collections — site renders inclusion bullets from the
 * free-text `Procedures.detail.included[]` array.)
 */

import type { Payload } from 'payload'
import { upsert } from './seed-helpers'
import { paragraphsToLexical } from './lexical'
import { parseFurtherInformation, slugify } from './parse-pricelist'

export async function seedIncludesExcludesJourney(payload: Payload): Promise<void> {
  const further = parseFurtherInformation()
  let order = 0
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
  payload.logger.info(`[seed] journey-days=${further.journey.length}`)
}
