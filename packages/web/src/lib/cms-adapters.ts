/**
 * Adapters: CMS records → the legacy shapes the existing components were built
 * against. These exist so component code that previously imported from
 * `src/content/*.ts` can keep its render structure and just switch its data
 * source. After all components are migrated, these adapters are still useful as
 * the canonical "CMS → render" mapping point.
 */

import type {
  CmsCache,
  Discipline,
  Procedure,
  Story,
  SubCategory,
  Surgeon,
  RecoveryStay,
  PressMention,
  PricingTier,
  Award,
  BlogPost,
  BeforeAfterCase,
  CmsMedia,
} from './cms'
import { lexicalToText, mediaUrl } from './cms'

/* ─── Surgeon (legacy shape from src/content/seed.ts) ─────────────────── */

export type LegacySurgeon = {
  slug: string
  name: string
  common: string
  title: string
  suffix: string
  spec: string
  train: string
  proc: string
  years: string
  hue: number
  lead?: boolean
  cred: string
  group: 'Plastic Surgery' | 'Aesthetic Medicine'
  bio: string
  spec_areas: string[]
  /** Raw CmsMedia for responsive <picture> srcset rendering. */
  portrait?: number | import('./cms').CmsMedia | null
}

export function adaptSurgeon(s: Surgeon): LegacySurgeon {
  return {
    slug: s.slug,
    name: s.name,
    common: s.commonName || s.name,
    title: s.title || 'dr.',
    suffix: s.suffix || '',
    spec: s.spec || '',
    train: s.train || '',
    proc: s.proc || '',
    years: s.yearsInPractice != null ? String(s.yearsInPractice) : '',
    hue: s.hue ?? 0,
    lead: Boolean(s.lead),
    cred: s.credLine || '',
    group: s.group === 'plastic-surgery' ? 'Plastic Surgery' : 'Aesthetic Medicine',
    bio: lexicalToText(s.bio) || '',
    spec_areas: (s.specAreas ?? []).map((a) => a.value),
    portrait: s.portrait,
  }
}

export function adaptSurgeons(cms: CmsCache): LegacySurgeon[] {
  return [...cms.surgeons]
    .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
    .map(adaptSurgeon)
}

/* ─── Treatment / Discipline (legacy shape) ───────────────────────────── */

export type LegacyTreatment = {
  slug: string
  n: string
  t: string
  sub: string
  count: string
  hue: number
  body: string
  procedures: string[]
  /** Raw CmsMedia for responsive <picture> srcset rendering. */
  heroImage?: number | import('./cms').CmsMedia | null
}

export function adaptDiscipline(d: Discipline, allProcedures: Procedure[]): LegacyTreatment {
  const procedures = allProcedures
    .filter((p) => {
      const parent = p.parentDiscipline
      const parentId = typeof parent === 'number' ? parent : parent?.id
      return parentId === d.id
    })
    .map((p) => p.name)
  return {
    slug: d.slug,
    n: d.order != null ? String(d.order).padStart(2, '0') : '01',
    t: d.title,
    sub: d.subtitle || '',
    count: d.displayCount || '',
    hue: d.hue ?? 0,
    body: lexicalToText(d.body) || '',
    procedures,
    heroImage: d.heroImage,
  }
}

export function adaptDisciplines(cms: CmsCache): LegacyTreatment[] {
  return [...cms.disciplines]
    .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
    .map((d) => adaptDiscipline(d, cms.procedures))
}

/* ─── SubCategories index ─────────────────────────────────────────────── */

export type LegacySubcategoryTuple = [string, string]

export function adaptSubCategoriesByDiscipline(cms: CmsCache): Record<string, LegacySubcategoryTuple[]> {
  const out: Record<string, LegacySubcategoryTuple[]> = {}
  for (const d of cms.disciplines) {
    out[d.slug] = []
  }
  const sortedSubs = [...cms.subCategories].sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
  for (const s of sortedSubs) {
    const parent = s.parent
    const parentId = typeof parent === 'number' ? parent : parent?.id
    const disc = cms.disciplines.find((d) => d.id === parentId)
    if (!disc) continue
    out[disc.slug] = out[disc.slug] || []
    out[disc.slug].push([s.slug, s.title])
  }
  return out
}

/* ─── SubCategoryEntry (legacy from subcategory-data.ts) ──────────────── */

export type LegacyTreatmentRow = {
  name: string
  short: string
  priceFromIdr: number | 'included' | 'complimentary'
  detail: {
    description: string
    duration: string
    recovery: string
    included: string[]
  }
}

export type LegacySubCategoryEntry = {
  parent: string
  slug: string
  title: string
  chapterTitle: [string, string]
  tagline: string
  lede: string
  intro?: string
  overview: string
  sections: Array<{ id: string; t: string; body: string }>
  faqs: Array<{ q: string; a: string }>
  leadSurgeon: string
  treatments: LegacyTreatmentRow[]
}

export function adaptSubCategoryEntry(s: SubCategory, cms: CmsCache): LegacySubCategoryEntry | null {
  const parent = s.parent
  const parentId = typeof parent === 'number' ? parent : parent?.id
  const disc = cms.disciplines.find((d) => d.id === parentId)
  if (!disc) return null

  const leadSurgeon = s.leadSurgeon
  const leadId = typeof leadSurgeon === 'number' ? leadSurgeon : leadSurgeon?.id
  const leadSlug = cms.surgeons.find((sg) => sg.id === leadId)?.slug || ''

  const treatments = cms.procedures
    .filter((p) => {
      const pSub = p.parentSubCategory
      const subId = typeof pSub === 'number' ? pSub : pSub?.id
      return subId === s.id
    })
    .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
    .map<LegacyTreatmentRow>((p) => ({
      name: p.name,
      short: p.shortName || '',
      priceFromIdr: p.pricing?.priceIdr2026 ?? p.pricing?.priceIdr2025 ?? 0,
      detail: {
        description: lexicalToText(p.description) || '',
        duration: p.detail?.duration || '',
        recovery: p.detail?.recovery || '',
        included: (p.detail?.included ?? []).map((i) => i.value),
      },
    }))

  return {
    parent: disc.slug,
    slug: s.slug,
    title: s.title,
    chapterTitle: [s.chapterTitle?.a || '', s.chapterTitle?.b || ''],
    tagline: s.tagline || '',
    lede: s.lede || '',
    intro: lexicalToText(s.intro) || undefined,
    overview: lexicalToText(s.overview) || '',
    sections: (s.sections ?? []).map((sec) => ({
      id: sec.anchorId,
      t: sec.t,
      body: lexicalToText(sec.body),
    })),
    faqs: s.faqs ?? [],
    leadSurgeon: leadSlug,
    treatments,
  }
}

export function adaptSubCategoryData(cms: CmsCache): Record<string, LegacySubCategoryEntry> {
  const out: Record<string, LegacySubCategoryEntry> = {}
  for (const s of cms.subCategories) {
    const entry = adaptSubCategoryEntry(s, cms)
    if (entry) out[s.slug] = entry
  }
  return out
}

/* ─── DisciplineContent (legacy from treatment-content.ts) ────────────── */

export type LegacyDisciplineContent = {
  chapter: string
  title: [string, string]
  lede: string
  leadSurgeon: string
  subcategories?: Array<{ slug: string; title: string; short: string; available: boolean }>
  overview: string
  sections: Array<{ id: string; t: string; body: string }>
  procedures?: Array<{ n: string; d: string; priceFromIdr: number | null }>
  faqs: Array<{ q: string; a: string }>
  pricing: Array<{
    tier: string
    italic: string
    amountIdr: number | null
    from: string
    small: string
    items: string[]
    cta: string
    featured?: boolean
  }>
}

export function adaptDisciplineContent(slug: string, cms: CmsCache): LegacyDisciplineContent | null {
  const d = cms.disciplines.find((x) => x.slug === slug)
  if (!d) return null

  const leadId = d.leadSurgeons?.[0]
  const leadIdNum = typeof leadId === 'number' ? leadId : leadId?.id
  const leadSurgeon = cms.surgeons.find((s) => s.id === leadIdNum)?.slug || ''

  const subs = [...cms.subCategories]
    .filter((s) => {
      const parentId = typeof s.parent === 'number' ? s.parent : s.parent?.id
      return parentId === d.id
    })
    .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
    .map((s) => ({
      slug: s.slug,
      title: s.title,
      short: s.lede || s.tagline || '',
      available: true,
    }))

  const procedures = cms.procedures
    .filter((p) => {
      const pdId = typeof p.parentDiscipline === 'number' ? p.parentDiscipline : p.parentDiscipline?.id
      return pdId === d.id
    })
    .slice(0, 12)
    .map((p) => ({
      n: p.name,
      d: lexicalToText(p.description).slice(0, 200) || (p.shortName ?? ''),
      priceFromIdr: p.pricing?.priceIdr2026 ?? p.pricing?.priceIdr2025 ?? null,
    }))

  const pricingTiersForDisc = [...cms.pricingTiers].sort(
    (a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0),
  )
  const audToIdrRate = cms.settings?.audToIdrRate || 10500
  const pricing = pricingTiersForDisc.map((t) => {
    const idr =
      t.priceFromIdr != null
        ? t.priceFromIdr
        : t.priceFromAud != null
          ? t.priceFromAud * audToIdrRate
          : null
    return {
      tier: t.name,
      italic: lexicalToText(t.descriptor).split(' — ')[0] || '',
      amountIdr: idr,
      from: idr === 0 || idr == null ? 'Complimentary' : 'IDR · from',
      small: lexicalToText(t.descriptor).split(' — ').slice(1).join(' — ') || '',
      items: (t.inclusions ?? []).map((i) => i.value),
      cta: idr === 0 || idr == null ? 'Book a consult' : 'Plan your journey',
      featured: Boolean(t.isFeatured),
    }
  })

  return {
    chapter: d.tagline || '',
    title: [d.chapterTitle?.a || '', d.chapterTitle?.b || ''],
    lede: d.lede || '',
    leadSurgeon,
    subcategories: subs,
    overview: lexicalToText(d.overview) || '',
    sections: [],
    procedures,
    faqs: d.faqs ?? [],
    pricing,
  }
}

/* ─── Look-ups ────────────────────────────────────────────────────────── */

export const findSurgeonBySlug = (cms: CmsCache, slug: string): Surgeon | undefined =>
  cms.surgeons.find((s) => s.slug === slug)

export const findDisciplineBySlug = (cms: CmsCache, slug: string): Discipline | undefined =>
  cms.disciplines.find((d) => d.slug === slug)

export const findSubCategoryBySlug = (cms: CmsCache, slug: string): SubCategory | undefined =>
  cms.subCategories.find((s) => s.slug === slug)

export const findPageBySlug = (cms: CmsCache, slug: string): import('./cms').CmsPage | undefined =>
  cms.pages.find((p) => p.slug === slug)

export const findPageByRoute = (cms: CmsCache, route: string): import('./cms').CmsPage | undefined =>
  cms.pages.find((p) => p.route === route)

/* ─── Sorted accessors ────────────────────────────────────────────────── */

export const surgeonsSorted = (cms: CmsCache): Surgeon[] =>
  [...cms.surgeons].sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))

export const disciplinesSorted = (cms: CmsCache): Discipline[] =>
  [...cms.disciplines].sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))

export const subCategoriesSorted = (cms: CmsCache): SubCategory[] =>
  [...cms.subCategories].sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))

export const proceduresSorted = (cms: CmsCache): Procedure[] =>
  [...cms.procedures].sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))

export const baCasesSorted = (cms: CmsCache): BeforeAfterCase[] =>
  [...cms.beforeAfterCases].sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))

export const storiesSorted = (cms: CmsCache): Story[] =>
  [...cms.stories].sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))

export const pressSorted = (cms: CmsCache): PressMention[] =>
  [...cms.pressMentions].sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))

export const awardsSorted = (cms: CmsCache): Award[] =>
  [...cms.awards].sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))

export const recoveryStaysSorted = (cms: CmsCache): RecoveryStay[] =>
  [...cms.recoveryStays].sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))

export const pricingTiersSorted = (cms: CmsCache): PricingTier[] =>
  [...cms.pricingTiers].sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))

export const blogPostsSorted = (cms: CmsCache): BlogPost[] =>
  [...cms.blogPosts].sort(
    (a, b) =>
      new Date(b.publishedAt || 0).getTime() - new Date(a.publishedAt || 0).getTime(),
  )

export const proceduresForSubCategory = (cms: CmsCache, subId: number): Procedure[] =>
  cms.procedures
    .filter((p) => {
      const sId = typeof p.parentSubCategory === 'number' ? p.parentSubCategory : p.parentSubCategory?.id
      return sId === subId
    })
    .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))

export const subCategoriesForDiscipline = (cms: CmsCache, discId: number) =>
  cms.subCategories
    .filter((s) => {
      const id = typeof s.parent === 'number' ? s.parent : s.parent?.id
      return id === discId
    })
    .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))

/* ─── Media URL with fallback to assets/ path ─────────────────────────── */

export function surgeonPortraitUrl(s: Surgeon | undefined): string {
  if (!s) return ''
  const fromCms = mediaUrl(s.portrait)
  if (fromCms) return fromCms
  // Asset-path fallback for the 8 seeded portraits in packages/web/public/assets/surgeons/.
  return `/assets/surgeons/${s.slug}.${['suka','astri','sissy','rosa','wara'].includes(s.slug) ? 'png' : 'webp'}`
}

export function disciplineHeroUrl(d: Discipline | undefined, fallback?: string): string | undefined {
  if (!d) return fallback
  return mediaUrl(d.heroImage, fallback)
}

export function baCompositeUrl(b: BeforeAfterCase | undefined, fallback?: string): string | undefined {
  if (!b) return fallback
  return mediaUrl(b.composite, fallback)
}

export function recoveryHeroUrl(r: RecoveryStay | undefined, fallback?: string): string | undefined {
  if (!r) return fallback
  return mediaUrl(r.heroImage, fallback)
}

export function blogHeroUrl(p: BlogPost | undefined, fallback?: string): string | undefined {
  if (!p) return fallback
  return mediaUrl(p.heroImage, fallback)
}

export function mediaOrAsset(m: number | CmsMedia | undefined, asset: string): string {
  return mediaUrl(m) || asset
}
