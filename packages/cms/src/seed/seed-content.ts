/**
 * Seed editorial content collections — Before/After, Awards, Press,
 * Recovery Stays, Pricing Tiers, Blog Posts.
 */

import type { Payload } from 'payload'
import { upsert } from './seed-helpers'
import { plainTextToLexical } from './lexical'
import { slugify } from './parse-pricelist'
import { BA_PAIRS } from '../../../web/src/content/seed'
import { TREATMENT_CONTENT } from '../../../web/src/content/treatment-content'
import { BLOG_POSTS } from '../../../web/src/content/blog-data'

export async function seedBeforeAfterCases(payload: Payload): Promise<void> {
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
}

export async function seedAwards(payload: Payload): Promise<void> {
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
}

export async function seedPressMentions(payload: Payload): Promise<void> {
  const press = [
    { slug: 'tatler-asia', publication: 'Tatler Asia', headline: 'The discreet Bali clinic catering to international medical tourists', publishedDate: '2025-09-15', isFeatured: true, summary: 'Editorial feature on BIMC CosMedic\'s concierge model.' },
    { slug: 'vogue-australia', publication: 'Vogue Australia', headline: 'Why Sydney women fly to Bali for their aesthetics work', publishedDate: '2025-07-10', isFeatured: true, summary: 'Travel+beauty feature.' },
    { slug: 'kompas', publication: 'Kompas', headline: 'BIMC CosMedic raih akreditasi ACHSI', publishedDate: '2025-04-22', isFeatured: false, summary: 'Indonesian national press on ACHSI accreditation.' },
  ]
  for (let i = 0; i < press.length; i++) {
    await upsert(payload, 'press-mentions', 'slug', press[i].slug, { ...press[i], sortOrder: i })
  }
  payload.logger.info(`[seed] press-mentions=${press.length}`)
}

export async function seedRecoveryStays(payload: Payload): Promise<void> {
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
}

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

export async function seedBlogPosts(payload: Payload): Promise<void> {
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
}
