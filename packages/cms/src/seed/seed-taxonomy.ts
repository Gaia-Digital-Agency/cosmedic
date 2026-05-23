/**
 * Seed the discipline → sub-category → procedure taxonomy, plus surgeons.
 *
 * Each step returns an id-by-slug map so later steps can build relations.
 */

import type { Payload } from 'payload'
import { upsert } from './seed-helpers'
import { plainTextToLexical } from './lexical'
import { slugify } from './parse-pricelist'
import {
  TREATMENT_LIST,
  SUBCATEGORIES_BY_DISCIPLINE,
  SURGEON_LIST,
} from '../../../web/src/content/seed'
import { TREATMENT_CONTENT } from '../../../web/src/content/treatment-content'
import { SUBCATEGORY_DATA } from '../../../web/src/content/subcategory-data'

export type IdMap = Record<string, string | number>

export async function seedSurgeons(payload: Payload): Promise<IdMap> {
  const surgeonIdBySlug: IdMap = {}
  for (let i = 0; i < SURGEON_LIST.length; i++) {
    const s = SURGEON_LIST[i]
    const doc = await upsert(payload, 'surgeons', 'slug', s.slug, {
      slug: s.slug,
      name: s.name,
      commonName: s.common,
      title: s.title,
      suffix: s.suffix,
      spec: s.spec,
      train: s.train,
      proc: s.proc,
      credLine: s.cred,
      yearsInPractice: Number(s.years),
      hue: s.hue,
      group: s.group === 'Plastic Surgery' ? 'plastic-surgery' : 'aesthetic-medicine',
      lead: Boolean(s.lead),
      bio: plainTextToLexical(s.bio),
      specAreas: s.spec_areas.map((value: string) => ({ value })),
      portraitPosition: 'center 30%',
      sortOrder: i,
    })
    surgeonIdBySlug[s.slug] = doc.id
  }
  payload.logger.info(`[seed] surgeons=${Object.keys(surgeonIdBySlug).length}`)
  return surgeonIdBySlug
}

export async function seedDisciplines(payload: Payload, surgeonIdBySlug: IdMap): Promise<IdMap> {
  const disciplineIdBySlug: IdMap = {}
  for (let i = 0; i < TREATMENT_LIST.length; i++) {
    const t = TREATMENT_LIST[i]
    const content = TREATMENT_CONTENT[t.slug]
    const leadSurgeonId = content?.leadSurgeon ? surgeonIdBySlug[content.leadSurgeon] : undefined
    const doc = await upsert(payload, 'disciplines', 'slug', t.slug, {
      slug: t.slug,
      order: Number(t.n.replace(/^0/, '')) || i + 1,
      title: t.t,
      subtitle: t.sub,
      displayCount: t.count,
      hue: t.hue,
      body: plainTextToLexical(t.body),
      chapterTitle: content ? { a: content.title[0], b: content.title[1] } : undefined,
      tagline: content?.chapter ?? undefined,
      lede: content?.lede ?? undefined,
      overview: content ? plainTextToLexical(content.overview) : undefined,
      leadSurgeons: leadSurgeonId ? [leadSurgeonId] : [],
      faqs: content?.faqs?.map(({ q, a }: { q: string; a: string }) => ({ q, a })) ?? [],
      sortOrder: i,
    })
    disciplineIdBySlug[t.slug] = doc.id
  }
  payload.logger.info(`[seed] disciplines=${Object.keys(disciplineIdBySlug).length}`)
  return disciplineIdBySlug
}

export async function seedSubCategories(
  payload: Payload,
  disciplineIdBySlug: IdMap,
  surgeonIdBySlug: IdMap,
): Promise<IdMap> {
  const subCatIdBySlug: IdMap = {}
  let subOrder = 0
  for (const discSlug of Object.keys(SUBCATEGORIES_BY_DISCIPLINE) as Array<keyof typeof SUBCATEGORIES_BY_DISCIPLINE>) {
    for (const [subSlug, subTitle] of SUBCATEGORIES_BY_DISCIPLINE[discSlug]) {
      const subData = SUBCATEGORY_DATA[subSlug]
      const data: Record<string, unknown> = {
        slug: subSlug,
        parent: disciplineIdBySlug[discSlug],
        title: subTitle,
        sortOrder: subOrder++,
      }
      if (subData) {
        data.chapterTitle = { a: subData.chapterTitle?.[0], b: subData.chapterTitle?.[1] }
        data.tagline = subData.tagline
        data.lede = subData.lede
        data.overview = plainTextToLexical(subData.overview ?? '')
        data.sections = (subData.sections ?? []).map((sec: { id: string; t: string; body: string }) => ({
          anchorId: sec.id, t: sec.t, body: plainTextToLexical(sec.body),
        }))
        data.faqs = subData.faqs ?? []
        if (subData.leadSurgeon && surgeonIdBySlug[subData.leadSurgeon]) {
          data.leadSurgeon = surgeonIdBySlug[subData.leadSurgeon]
        }
      }
      const doc = await upsert(payload, 'sub-categories', 'slug', subSlug, data)
      subCatIdBySlug[subSlug] = doc.id
    }
  }
  payload.logger.info(`[seed] sub-categories=${Object.keys(subCatIdBySlug).length}`)
  return subCatIdBySlug
}

export async function seedProcedures(
  payload: Payload,
  disciplineIdBySlug: IdMap,
  subCatIdBySlug: IdMap,
  surgeonIdBySlug: IdMap,
): Promise<void> {
  // From SUBCATEGORY_DATA.treatments (rich editorial procedure records).
  const procedureIdBySlug: IdMap = {}
  let procOrder = 0
  for (const subSlug of Object.keys(SUBCATEGORY_DATA)) {
    const sub = SUBCATEGORY_DATA[subSlug]
    if (!sub?.treatments) continue
    const disciplineSlug = sub.parent
    if (!disciplineIdBySlug[disciplineSlug]) {
      payload.logger.warn(`[seed] skipping procedures for sub-category "${subSlug}" — parent discipline "${disciplineSlug}" not in catalogue`)
      continue
    }
    for (const t of sub.treatments) {
      const procSlug = slugify(t.name)
      const detail = t.detail
      const priceFromAud = typeof t.priceFromAud === 'number' ? t.priceFromAud : undefined
      const doc = await upsert(payload, 'procedures', 'slug', procSlug, {
        slug: procSlug,
        name: t.name,
        shortName: t.short ?? undefined,
        parentDiscipline: disciplineIdBySlug[disciplineSlug],
        parentSubCategory: subCatIdBySlug[subSlug],
        description: detail?.description ? plainTextToLexical(detail.description) : undefined,
        pricing: priceFromAud != null ? { priceAud2025: priceFromAud, priceAud2026: priceFromAud, displayYear: '2026' } : undefined,
        detail: detail ? {
          duration: detail.duration,
          recovery: detail.recovery,
          included: (detail.included ?? []).map((value: string) => ({ value })),
        } : undefined,
        surgeonsCredentialed: sub.leadSurgeon && surgeonIdBySlug[sub.leadSurgeon] ? [surgeonIdBySlug[sub.leadSurgeon]] : [],
        sortOrder: procOrder++,
      })
      procedureIdBySlug[procSlug] = doc.id
    }
  }
  payload.logger.info(`[seed] procedures (editorial)=${Object.keys(procedureIdBySlug).length}`)

  // Catalogue rows (machine/injection/btl) migrated separately via
  // migrate-pricing-to-procedures.ts after Phase C9c.
  payload.logger.info(`[seed] catalogue (machine/injection/btl) — see migrate-pricing-to-procedures.ts`)
}
