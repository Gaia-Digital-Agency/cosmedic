/**
 * Phase 6 content seed orchestrator.
 *
 * Idempotent — each section finds-by-slug then either updates or creates.
 * Safe to re-run.
 *
 * Order (forward-only foreign keys):
 *   1. Globals (Settings, BrandStats, EndorsementMark, ConsultationPolicy,
 *      FormDefaults, EmailTemplates, SeoDefaults, FloatingChrome, Header, Footer)
 *   2. Inclusions + Exclusions + JourneySteps (no FKs)
 *   3. Surgeons (no FKs except later self-update with credentialedProcedures)
 *   4. Disciplines (FK: leadSurgeons → Surgeons)
 *   5. SubCategories (FK: parent → Disciplines, leadSurgeon → Surgeons)
 *   6. Procedures (FK: parentDiscipline, parentSubCategory, surgeonsCredentialed)
 *   7. PriceListItems (FK: linkedProcedure)
 *   8. InjectableProducts + MachineTreatments + HairRemovalAreas
 *   9. BeforeAfterCases + Stories
 *  10. Awards + PressMentions + RecoveryStays + PricingTiers + BlogPosts
 *  11. Pages (home, journey, contact, …)
 */

import type { Payload } from 'payload'

// Source data — imported via relative paths from the web package until Phase 6c rewires.
// These imports work because tsx (and the cms's own Next.js bundler when running onInit)
// resolves relative file-system paths even across package boundaries.
import {
  TREATMENT_LIST,
  SUBCATEGORIES_BY_DISCIPLINE,
  SURGEON_LIST,
  BA_PAIRS,
  WHATSAPP_HREF,
} from '../../../web/src/content/seed'
import { TREATMENT_CONTENT } from '../../../web/src/content/treatment-content'
import { SUBCATEGORY_DATA } from '../../../web/src/content/subcategory-data'
import { BLOG_POSTS } from '../../../web/src/content/blog-data'

import { plainTextToLexical, paragraphsToLexical } from './lexical'
import {
  parseFurtherInformation,
  slugify,
} from './parse-pricelist'

type AnyDoc = Record<string, unknown> & { id: string | number }

// Loose typing — Payload's collection-name unions are exhaustive but our seed
// touches all of them via a generic dispatcher. The narrow type is regained
// via the collection slug at runtime.
/* eslint-disable @typescript-eslint/no-explicit-any */
async function upsert(
  payload: Payload,
  collection: string,
  whereField: string,
  whereValue: string,
  data: Record<string, unknown>,
): Promise<AnyDoc> {
  const existing = await (payload as any).find({
    collection,
    where: { [whereField]: { equals: whereValue } },
    limit: 1,
    depth: 0,
  })
  if (existing.docs.length > 0) {
    const doc = existing.docs[0] as AnyDoc
    const updated = await (payload as any).update({
      collection,
      id: doc.id,
      data,
      depth: 0,
    })
    return updated as AnyDoc
  }
  const created = await (payload as any).create({
    collection,
    data,
    depth: 0,
  })
  return created as AnyDoc
}

async function upsertGlobal(payload: Payload, slug: string, data: Record<string, unknown>): Promise<void> {
  await (payload as any).updateGlobal({ slug, data })
}
/* eslint-enable @typescript-eslint/no-explicit-any */

export async function runContentSeed(payload: Payload): Promise<void> {
  payload.logger.info('[seed] content: starting')

  // ─── 1. Globals ───────────────────────────────────────────────────────────
  await upsertGlobal(payload, 'settings', {
    siteName: 'BIMC CosMedic',
    siteTagline: 'Plastic Surgery & Aesthetic Medicine in Nusa Dua, Bali',
    defaultMetaDescription: 'BIMC CosMedic — discreet, accredited plastic surgery and aesthetic medicine in Nusa Dua, Bali. Concierge care for international medical tourists from AU, US and EU.',
    audToIdrRate: 10500,
    roundIdrTo: 50000,
    contactEmail: 'cosmedic@bimcbali.com',
    contactPhone: '+62-361-761-263',
    whatsappNumber: '+6281339001911',
    addressLine1: 'BIMC Hospital Nusa Dua, Kawasan ITDC Blok D',
    addressLine2: '',
    city: 'Nusa Dua, Bali',
    postalCode: '80363',
    country: 'Indonesia',
    hoursMonFri: 'Mon–Fri · 09:00–17:00',
    hoursSatSun: 'Sat · By appointment',
    socialLinks: [
      { platform: 'instagram', url: 'https://www.instagram.com/bimchospital/' },
      { platform: 'whatsapp', url: WHATSAPP_HREF },
    ],
    defaultLocale: 'en',
    currencyDisplayMode: 'idr-with-aud',
  })

  await upsertGlobal(payload, 'brand-stats', {
    stats: [
      { number: '28', label: 'Years In Practice', sourceNote: 'Per brand.pdf §IV' },
      { number: '8', label: 'ISAPS-FICS Surgeons', sourceNote: 'Per brand.pdf §IV' },
      { number: '3,400+', label: 'Procedures Performed', sourceNote: 'Per brand.pdf §IV' },
      { number: '#1', label: 'Hospital 2026', sourceNote: 'Per brand.pdf §IV' },
    ],
  })

  await upsertGlobal(payload, 'endorsement-mark', {
    endorsementLine: 'Managed by BIMC Hospital · Nusa Dua · Bali',
    clearspaceUnit: '1X (height of medical cross)',
    minScreenWidthPx: 96,
    minPrintMmWidth: 24,
  })

  await upsertGlobal(payload, 'consultation-policy', {
    feeIdr: 150000,
    feeAud: 15,
    waiverConditionText: 'Consultation fee is waived if your treatment is performed the same day.',
    displayOn: ['contact', 'procedure-detail', 'pricing'],
  })

  await upsertGlobal(payload, 'form-defaults', {
    labels: {
      name: 'Your name', email: 'Email address', phone: 'Phone',
      country: 'Country', treatment: 'Treatment of interest', message: 'Tell us a little more',
    },
    placeholders: {
      name: 'First and last name', email: 'name@example.com', phone: '+61 4XX XXX XXX',
      country: 'Australia', treatment: 'e.g. Rhinoplasty', message: 'Anything we should know about your timeline, goals, or medical history.',
    },
    submitLabel: 'Send enquiry',
    successMessage: 'Thank you — your concierge will reply within one business day.',
    errorMessage: 'Something went wrong. Please email cosmedic@bimcbali.com if it persists.',
    rateLimitMessage: 'You submitted a form recently. Please wait a moment before sending another.',
  })

  await upsertGlobal(payload, 'seo-defaults', {
    titlePattern: '{page} — BIMC CosMedic',
    robotsTxt: 'User-agent: *\nAllow: /\nDisallow: /admin\nDisallow: /api/\nDisallow: /preview\nSitemap: https://cosmedic.gaiada.online/sitemap.xml',
    sitemapBaseUrl: 'https://cosmedic.gaiada.online',
  })

  await upsertGlobal(payload, 'floating-chrome', {
    ctaPill: { label: 'Plan your treatment', href: '/contact', enabled: true },
    chat: { enabled: true, provider: 'whatsapp', openOnLoad: false },
  })

  await upsertGlobal(payload, 'email-templates', {
    templates: [
      {
        id: 'enquiry-autoresponder',
        subject: 'Thank you for your enquiry — BIMC CosMedic',
        bodyMjml: 'Dear {{name}},\n\nThank you for your enquiry with BIMC CosMedic. Our concierge team will reply to you within one business day with a tailored response to your interest in {{procedure}}.\n\nWarm regards,\nBIMC CosMedic',
        locale: 'en',
      },
      {
        id: 'enquiry-clinic-notify',
        subject: 'New enquiry — {{name}} — {{procedure}}',
        bodyMjml: 'New enquiry received:\n\nName: {{name}}\nEmail: {{email}}\nPhone: {{phone}}\nCountry: {{country}}\nProcedure of interest: {{procedure}}\nPreferred date: {{preferredDate}}\n\nMessage:\n{{message}}\n\nSource: {{sourcePage}}',
        locale: 'en',
      },
    ],
  })

  // Header + Footer drawn from header.tsx / footer.tsx labels.
  await upsertGlobal(payload, 'header', {
    navItems: [
      {
        label: 'Treatments', href: '/treatments', activePattern: '^/treatment',
        megaMenu: [
          { heading: 'Surgical', items: [
            { label: 'Face', href: '/treatment-surgical-face' },
            { label: 'Body', href: '/treatment-surgical-body' },
            { label: 'Breast', href: '/treatment-surgical-breast' },
          ] },
          { heading: 'Reconstructive', items: [
            { label: 'Breast Reconstruction', href: '/treatment-reconstructive-breast' },
            { label: 'Trauma & Scar', href: '/treatment-reconstructive-trauma' },
            { label: 'Craniofacial', href: '/treatment-reconstructive-craniofacial' },
          ] },
          { heading: 'Non-surgical', items: [
            { label: 'Injectables', href: '/treatment-non-surgical-injectables' },
            { label: 'Laser & Resurfacing', href: '/treatment-non-surgical-laser' },
            { label: 'Skin Health', href: '/treatment-non-surgical-skin' },
          ] },
          { heading: 'Hair · Dental · Weight Loss', items: [
            { label: 'FUE Surgical', href: '/treatment-hair-fue' },
            { label: 'Follicle Therapy', href: '/treatment-hair-therapy' },
            { label: 'Veneers', href: '/treatment-dental-veneers' },
            { label: 'Alignment', href: '/treatment-dental-alignment' },
            { label: 'Whitening', href: '/treatment-dental-whitening' },
            { label: 'Medical', href: '/treatment-weight-loss-medical' },
            { label: 'Endoscopic', href: '/treatment-weight-loss-endoscopic' },
            { label: 'Bariatric', href: '/treatment-weight-loss-surgical' },
          ] },
        ],
      },
      {
        label: 'Surgeons', href: '/surgeons', activePattern: '^/surgeon',
        megaMenu: [
          { heading: 'Plastic Surgery', items: SURGEON_LIST.filter((s: { group: string }) => s.group === 'Plastic Surgery').map((s: { common: string; slug: string }) => ({ label: 'dr. ' + s.common, href: '/surgeon-' + s.slug })) },
          { heading: 'Aesthetic Medicine', items: SURGEON_LIST.filter((s: { group: string }) => s.group === 'Aesthetic Medicine').map((s: { common: string; slug: string }) => ({ label: 'dr. ' + s.common, href: '/surgeon-' + s.slug })) },
        ],
      },
      { label: 'Your Journey', href: '/journey', activePattern: '^/journey' },
      { label: 'Gallery', href: '/gallery', activePattern: '^/gallery' },
      { label: 'Stories', href: '/stories', activePattern: '^/stories' },
      { label: 'Contact', href: '/contact', activePattern: '^/contact' },
    ],
    localeSwitcher: { enabled: true, labelEn: 'EN', labelId: 'ID' },
  })

  await upsertGlobal(payload, 'footer', {
    linkColumns: [
      { heading: 'Treatments', items: TREATMENT_LIST.map((t: { t: string; slug: string }) => ({ label: t.t, href: '/treatment-' + t.slug })) },
      { heading: 'Surgeons', items: SURGEON_LIST.map((s: { common: string; slug: string }) => ({ label: 'dr. ' + s.common, href: '/surgeon-' + s.slug })) },
      { heading: 'Information', items: [
        { label: 'Your Journey', href: '/journey' },
        { label: 'Gallery', href: '/gallery' },
        { label: 'Stories', href: '/stories' },
        { label: 'Press', href: '/press' },
        { label: 'Pricing', href: '/pricing' },
        { label: 'Recovery Stays', href: '/recovery-stays' },
        { label: 'Contact', href: '/contact' },
        { label: 'Privacy', href: '/privacy' },
      ] },
    ],
    enquirySummary: plainTextToLexical('Speak with our concierge. We respond within one business day.'),
    addressBlock: paragraphsToLexical([
      'BIMC Hospital Nusa Dua',
      'Kawasan ITDC Blok D — Nusa Dua, Bali 80363 — Indonesia',
      'cosmedic@bimcbali.com · +6281339001911',
    ]),
    copyrightTemplate: '© {year} BIMC CosMedic. Managed by BIMC Hospital, Nusa Dua.',
  })

  // ─── 2. Inclusions / Exclusions / JourneySteps from pricelist ────────────
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

  // ─── 3. Surgeons ──────────────────────────────────────────────────────────
  const surgeonIdBySlug: Record<string, string | number> = {}
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

  // ─── 4. Disciplines ───────────────────────────────────────────────────────
  const disciplineIdBySlug: Record<string, string | number> = {}
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

  // ─── 5. SubCategories ─────────────────────────────────────────────────────
  const subCatIdBySlug: Record<string, string | number> = {}
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

  // ─── 6. Procedures ────────────────────────────────────────────────────────
  // From SUBCATEGORY_DATA.treatments (rich editorial procedure records).
  const procedureIdBySlug: Record<string, string | number> = {}
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

  // ─── 7-10. PriceListItems / InjectableProducts / MachineTreatments /
  //          HairRemovalAreas seed steps retired in Phase C9c.
  // Catalogue rows now live on Procedures (catalogueGroup: surgical |
  // machine | injection | btl). The historical seed code was kept in git
  // history; for fresh installs the existing xlsx-import seed creates only
  // the surgical Procedures. The 24 + 34 + 43 = 101 catalogue rows are
  // migrated separately via:
  //   NODE_ENV=production pnpm --filter @cosmedic/cms exec \
  //     tsx src/seed/migrate-pricing-to-procedures.ts
  // which reads the xlsx via parse-pricelist.ts and upserts directly into
  // Procedures using deterministic slugs (machine-… / injection-… / btl-…).
  payload.logger.info(`[seed] catalogue (machine/injection/btl) — see migrate-pricing-to-procedures.ts`)

  // ─── 11. BeforeAfterCases ───────────────────────────────────────────────
  let baOrder = 0
  for (const ba of BA_PAIRS) {
    const baSlug = slugify(ba.num + '-' + ba.label)
    await upsert(payload, 'before-after-cases', 'slug', baSlug, {
      slug: baSlug,
      caseLabel: ba.num + ' — ' + ba.label,
      beforeAlt: 'Before ' + ba.label + ' (' + ba.time + ')',
      afterAlt: 'After ' + ba.label + ' (' + ba.time + ')',
      tags: [{ value: ba.cat }],
      year: 2025,
      isFeatured: baOrder < 3,
      sortOrder: baOrder++,
    })
  }
  payload.logger.info(`[seed] before-after-cases=${BA_PAIRS.length}`)

  // ─── 12. Awards (seed editorial + brand.pdf #1 hospital) ───────────────
  const awards = [
    { slug: 'achsi-accreditation', name: 'ACHSI Accredited', year: 2026, issuer: 'Australian Council on Healthcare Standards International', summary: 'Indonesia\'s first ACHSI-accredited international hospital.' },
    { slug: 'iso-9001', name: 'ISO 9001:2015', year: 2025, issuer: 'International Organisation for Standardisation', summary: 'Quality management system.' },
    { slug: 'isaps-member-clinic', name: 'ISAPS Member Clinic', year: 2025, issuer: 'International Society of Aesthetic Plastic Surgery', summary: 'Members of the world\'s leading aesthetic plastic surgery body.' },
    { slug: 'ipras-affiliate', name: 'IPRAS Affiliate', year: 2025, issuer: 'International Confederation for Plastic, Reconstructive and Aesthetic Surgery', summary: 'Reconstructive surgery affiliation.' },
    { slug: 'hospital-1-2026', name: '#1 Hospital 2026', year: 2026, issuer: 'Healthcare Asia Awards', summary: 'Ranked #1 hospital in Indonesia for international care.' },
  ]
  for (let i = 0; i < awards.length; i++) {
    await upsert(payload, 'awards', 'slug', awards[i].slug, { ...awards[i], sortOrder: i })
  }
  payload.logger.info(`[seed] awards=${awards.length}`)

  // ─── 13. PressMentions (placeholder seed; clinic to refine) ────────────
  const press = [
    { slug: 'tatler-asia', publication: 'Tatler Asia', headline: 'The discreet Bali clinic catering to international medical tourists', publishedDate: '2025-09-15', isFeatured: true, summary: 'Editorial feature on BIMC CosMedic\'s concierge model.' },
    { slug: 'vogue-australia', publication: 'Vogue Australia', headline: 'Why Sydney women fly to Bali for their aesthetics work', publishedDate: '2025-07-10', isFeatured: true, summary: 'Travel+beauty feature.' },
    { slug: 'kompas', publication: 'Kompas', headline: 'BIMC CosMedic raih akreditasi ACHSI', publishedDate: '2025-04-22', isFeatured: false, summary: 'Indonesian national press on ACHSI accreditation.' },
  ]
  for (let i = 0; i < press.length; i++) {
    await upsert(payload, 'press-mentions', 'slug', press[i].slug, { ...press[i], sortOrder: i })
  }
  payload.logger.info(`[seed] press-mentions=${press.length}`)

  // ─── 14. RecoveryStays (placeholder seed) ──────────────────────────────
  const villas = [
    { slug: 'villa-sembilan', name: 'Villa Sembilan', location: 'Seminyak', priceFromAudPerNight: 280, descriptor: 'A three-bedroom retreat with a private pool, ten minutes from BIMC.' },
    { slug: 'villa-damai', name: 'Villa Damai', location: 'Ubud', priceFromAudPerNight: 220 },
    { slug: 'villa-kelapa', name: 'Villa Kelapa', location: 'Nusa Dua', priceFromAudPerNight: 250 },
    { slug: 'villa-tirta', name: 'Villa Tirta', location: 'Canggu', priceFromAudPerNight: 290 },
    { slug: 'apurva-kempinski', name: 'The Apurva Kempinski Bali', location: 'Nusa Dua', priceFromAudPerNight: 480 },
    { slug: 'villa-sereno', name: 'Villa Sereno', location: 'Jimbaran', priceFromAudPerNight: 340 },
  ]
  for (let i = 0; i < villas.length; i++) {
    const v = villas[i] as typeof villas[number] & { descriptor?: string }
    await upsert(payload, 'recovery-stays', 'slug', v.slug, {
      slug: v.slug,
      name: v.name,
      location: v.location,
      priceFromAudPerNight: v.priceFromAudPerNight,
      descriptor: v.descriptor ? plainTextToLexical(v.descriptor) : undefined,
      sortOrder: i,
    })
  }
  payload.logger.info(`[seed] recovery-stays=${villas.length}`)

  // ─── 15. PricingTiers from TREATMENT_CONTENT.surgical.pricing ─────────
  const tierSource = TREATMENT_CONTENT.surgical?.pricing ?? []
  for (let i = 0; i < tierSource.length; i++) {
    const tier = tierSource[i]
    const tslug = slugify(tier.tier)
    await upsert(payload, 'pricing-tiers', 'slug', tslug, {
      slug: tslug,
      name: tier.tier,
      descriptor: plainTextToLexical(tier.italic + ' — ' + tier.small),
      priceFromAud: tier.amount === '0' ? 0 : Number(String(tier.amount).replace(/,/g, '')) || undefined,
      inclusions: tier.items.map((value: string) => ({ value })),
      isFeatured: Boolean(tier.featured),
      sortOrder: i,
    })
  }
  payload.logger.info(`[seed] pricing-tiers=${tierSource.length}`)

  // ─── 16. BlogPosts (metas; bodies populated separately) ─────────────────
  // BLOG_POSTS.date is free-form ("April 2026") — parse to ISO; fall back to today.
  function parseLooseDate(s: string): string | undefined {
    if (!s) return undefined
    const direct = new Date(s)
    if (!isNaN(direct.getTime())) return direct.toISOString()
    const monthYear = s.match(/^([A-Za-z]+)\s+(\d{4})$/)
    if (monthYear) {
      const d = new Date(monthYear[2] + '-' + monthYear[1] + '-01')
      if (!isNaN(d.getTime())) return d.toISOString()
    }
    return undefined
  }
  for (let i = 0; i < BLOG_POSTS.length; i++) {
    const post = BLOG_POSTS[i]
    await upsert(payload, 'blog-posts', 'slug', post.slug, {
      slug: post.slug,
      title: post.title,
      lede: post.dek,
      publishedAt: parseLooseDate(post.date),
      readingTimeMinutes: parseInt(post.read, 10) || undefined,
      publishStatus: 'published',
      sortOrder: i,
    })
  }
  payload.logger.info(`[seed] blog-posts (metas)=${BLOG_POSTS.length}`)

  // ─── 17. Editorial Page Globals (replaces the old Pages collection) ─────
  // Each route's editorial hero + sections lives in its own Payload Global so
  // the admin nav mirrors the site IA one-to-one (Homepage / Treatments /
  // Doctors / Results / Pricing / Journey / Contact / Blog).
  const pageGlobals: Array<{ globalSlug: string; data: Record<string, unknown> }> = [
    {
      globalSlug: 'home-page',
      data: {
        slug: 'home', route: '/', title: 'Home',
        chapterTitle: { a: 'Considered work', b: 'in considered hands.' },
        tagline: 'BIMC CosMedic · Nusa Dua, Bali',
        lede: 'Plastic surgery and aesthetic medicine for international medical tourists, performed by ISAPS-credentialed surgeons in Indonesia\'s first ACHSI-accredited hospital.',
      },
    },
    {
      globalSlug: 'journey-page',
      data: {
        slug: 'journey', route: '/journey', title: 'Your Journey',
        chapterTitle: { a: 'Your journey,', b: 'considered.' },
        tagline: 'Chapter III — Your Journey',
        lede: 'From first enquiry to the morning you fly home — what to expect, when, and why we sequence it this way.',
      },
    },
    {
      globalSlug: 'contact-page',
      data: {
        slug: 'contact', route: '/contact', title: 'Contact',
        chapterTitle: { a: 'Speak with', b: 'our concierge.' },
        tagline: 'Chapter VII — Contact',
        lede: 'Send an enquiry, schedule a video consult, or visit us in Nusa Dua. We reply within one business day.',
      },
    },
    {
      globalSlug: 'gallery-page',
      data: {
        slug: 'gallery', route: '/gallery', title: 'Gallery',
        chapterTitle: { a: 'Considered', b: 'before-and-after.' },
        tagline: 'Chapter IV — Gallery',
        lede: 'A small, curated set of before-and-after composites. Further imagery is available privately during consultation.',
      },
    },
    {
      globalSlug: 'stories-page',
      data: {
        slug: 'stories', route: '/stories', title: 'Stories',
        chapterTitle: { a: 'Patient', b: 'stories.' },
        tagline: 'Chapter V — Stories',
        lede: 'In the words of patients who have travelled here. Names changed where requested.',
      },
    },
    {
      globalSlug: 'pricing-page',
      data: {
        slug: 'pricing', route: '/pricing', title: 'Pricing',
        chapterTitle: { a: 'Transparent', b: 'pricing.' },
        tagline: 'Chapter VI — Pricing',
        lede: 'The full clinic catalogue — surgical, non-surgical, machine, injection, and BTL services. Every line item editable in the CMS, sourced from our 2025/2026 price list.',
      },
    },
    {
      globalSlug: 'press-page',
      data: {
        slug: 'press', route: '/press', title: 'Press',
        chapterTitle: { a: 'Press &', b: 'recognition.' },
        tagline: 'Chapter VIII — Press',
        lede: 'Editorial mentions, accreditations, and awards.',
      },
    },
    {
      globalSlug: 'privacy-page',
      data: {
        slug: 'privacy', route: '/privacy', title: 'Privacy',
        chapterTitle: { a: 'Privacy', b: 'policy.' },
        tagline: 'Privacy & Data',
        lede: 'How we handle your information. Aligned with Indonesian PDP Law (UU PDP 2022) and the GDPR for visitors from the EU.',
      },
    },
    // 6 new pages added 2026-05-22 so every navigable static route has an
    // editable Page record.
    {
      globalSlug: 'treatments-page',
      data: {
        slug: 'treatments', route: '/treatments', title: 'Treatments Index',
        chapterTitle: { a: 'Six', b: 'disciplines.' },
        tagline: 'Chapter II — Treatments',
        lede: 'Plastic surgery and aesthetic medicine, organised by discipline.',
      },
    },
    {
      globalSlug: 'surgeons-page',
      data: {
        slug: 'surgeons', route: '/surgeons', title: 'Surgeons Index',
        chapterTitle: { a: 'Considered', b: 'hands.' },
        tagline: 'Chapter — Surgeons',
        lede: 'Eight ISAPS- and BPRS-credentialed practitioners across plastic surgery and aesthetic medicine.',
      },
    },
    {
      globalSlug: 'results-page',
      data: {
        slug: 'results', route: '/results', title: 'Results',
        chapterTitle: { a: 'Considered', b: 'outcomes.' },
        tagline: 'Chapter IV — Results',
        lede: 'A selection of before-and-after cases from BIMC CosMedic, captioned with procedure and recovery timeline.',
      },
    },
    {
      globalSlug: 'recovery-stays-page',
      data: {
        slug: 'recovery-stays', route: '/recovery-stays', title: 'Recovery Stays',
        chapterTitle: { a: 'Recover', b: 'in Bali.' },
        tagline: 'Chapter — Recovery Stays',
        lede: 'Private villas and partner properties for pre- and post-operative stays, vetted for accessibility, quiet, and proximity to BIMC Nusa Dua.',
      },
    },
    {
      globalSlug: 'video-consult-page',
      data: {
        slug: 'video-consult', route: '/video-consult', title: 'Video Consult',
        chapterTitle: { a: 'Meet before', b: 'you travel.' },
        tagline: 'Chapter — Video Consult',
        lede: 'A 30-minute encrypted video consultation with your surgeon, before you book flights.',
      },
    },
    {
      globalSlug: 'blog-page',
      data: {
        slug: 'blog', route: '/blog', title: 'Blog Index',
        chapterTitle: { a: 'Notes &', b: 'briefings.' },
        tagline: 'Editorial',
        lede: 'Clinical notes, patient briefings, and considered reading on the work we do.',
      },
    },
  ]
  for (const pg of pageGlobals) {
    await upsertGlobal(payload, pg.globalSlug, { ...pg.data, publishStatus: 'published' })
  }
  payload.logger.info(`[seed] page globals=${pageGlobals.length}`)
  payload.logger.info('[seed] content: done — run `pnpm seed:media` for imagery')
}
