/**
 * CMS-backed content shim.
 *
 * Until Phase 6, this file held hand-edited TypeScript constants. It now
 * forwards every export to the CMS cache via the Proxy helpers in
 * `lib/cms-proxy.ts`. Components import the same named exports as before,
 * but every value resolves from the current `getCmsCacheSync()` snapshot.
 *
 * Asset URLs (Unsplash IDs, local asset paths, the WhatsApp number) stay
 * inline — these are not "editorial content" per Non-negotiable #3; they're
 * either build-time config (WHATSAPP_HREF will move to Settings in Phase 7)
 * or imagery slots that get filled by the Media collection over time.
 */

import { lazyArray, lazyRecord } from '@/lib/cms-proxy'
import { adaptDisciplines, adaptSubCategoriesByDiscipline, adaptSurgeons } from '@/lib/cms-adapters'
import { mediaUrl, lexicalToText } from '@/lib/cms'

/* ─── Types — unchanged for backwards-compat with existing imports ────── */

export type TreatmentSlug =
  | 'surgical'
  | 'reconstructive'
  | 'non-surgical'
  | 'hair'
  | 'dental'
  | 'recovery'

export type Treatment = {
  slug: TreatmentSlug
  n: string
  t: string
  sub: string
  count: string
  hue: number
  body: string
  procedures: string[]
}

export type SurgeonGroup = 'Plastic Surgery' | 'Aesthetic Medicine'

export type Surgeon = {
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
  group: SurgeonGroup
  bio: string
  spec_areas: string[]
}

export type BaPair = {
  num: string
  label: string
  time: string
  cat: string
  image: string
  // Phase C8 — full editorial fields. Empty/undefined when CMS row hasn't set them.
  year?: number
  beforeAlt?: string
  afterAlt?: string
  description?: string
  surgeonName?: string
  surgeonSlug?: string
  isFeatured?: boolean
  // q14 — patient age + recovery duration shown on B&A cards.
  patientAge?: number
  recoveryDuration?: string
}

/* ─── Live, CMS-backed exports ────────────────────────────────────────── */

export const TREATMENT_LIST = lazyArray<Treatment>((cms) =>
  adaptDisciplines(cms).map((d) => ({ ...d, slug: d.slug as TreatmentSlug })),
)

export const SUBCATEGORIES_BY_DISCIPLINE = lazyRecord<[string, string][]>((cms) =>
  adaptSubCategoriesByDiscipline(cms),
) as Record<TreatmentSlug, [string, string][]>

export const SURGEON_LIST = lazyArray<Surgeon>((cms) => adaptSurgeons(cms))

export const BA_PAIRS = lazyArray<BaPair>((cms) =>
  [...cms.beforeAfterCases]
    .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
    .map((ba) => {
      const tagValue = (ba.tags ?? [])[0]?.value || 'surgical'
      const label = ba.caseLabel.replace(/^Case\s+\d+\s*[—-]?\s*/i, '')
      const num = (ba.caseLabel.match(/Case\s+\d+/i) || ['Case'])[0]
      // Asset-path fallback mirrors the design/assets/results/ inventory.
      const assetFallback =
        ba.slug.includes('necklift') ? '/assets/results/necklift-female.webp'
        : ba.slug.includes('lip-lift-male') ? '/assets/results/lip-lift-male.webp'
        : ba.slug.includes('lip-lift') ? '/assets/results/lip-lift-female.webp'
        : '/assets/results/necklift-female.webp'

      // Resolve surgeon relation: relationship value may be an id or a populated object.
      const sg = ba.surgeon
      const surgeonId = typeof sg === 'number' ? sg : sg?.id
      const surgeonDoc = surgeonId
        ? cms.surgeons.find((s) => s.id === surgeonId)
        : undefined
      const surgeonName = surgeonDoc
        ? `${surgeonDoc.title || 'dr.'} ${surgeonDoc.commonName || surgeonDoc.name}`
        : undefined

      return {
        num,
        label,
        time: ba.year ? String(ba.year) : '',
        cat: tagValue,
        image: mediaUrl(ba.composite, assetFallback) || assetFallback,
        year: ba.year,
        beforeAlt: ba.beforeAlt || undefined,
        afterAlt: ba.afterAlt || undefined,
        description: ba.description ? lexicalToText(ba.description) : undefined,
        surgeonName,
        surgeonSlug: surgeonDoc?.slug,
        isFeatured: Boolean(ba.isFeatured),
        patientAge: ba.patientAge,
        recoveryDuration: ba.recoveryDuration,
      }
    }),
)

/* ─── Static config + asset URL helpers (not editorial content) ──────── */

export const WHATSAPP_HREF = 'https://wa.me/6281339001911'

const uid = (id: string, w = 1200, h = 1500, opts = ''): string =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&h=${h}&q=80${opts ? '&' + opts : ''}`

const ID = {
  hero: 'photo-1540555700478-4be289fbecef',
  surgical: 'photo-1631815589968-fdb09a223b1e',
  injectables: 'photo-1570172619644-dfd03ed5d881',
  hair: 'photo-1522337360788-8b13dee7a37e',
  dental: 'photo-1606811971618-4486d14f3f99',
  recovery: 'photo-1582719508461-905c673771fd',
  concierge: 'photo-1519810755548-39cd217da494',
  bali: 'photo-1537996194471-e657df975ab4',
  baliAlt: 'photo-1559494007-9f5847c49d94',
  bali2: 'photo-1604999565976-8913ad2ddb7c',
  villa1: 'photo-1540541338287-41700207dee6',
  villa2: 'photo-1582719478250-c89cae4dc85b',
  villa3: 'photo-1566073771259-6a8506099945',
  villa4: 'photo-1571896349842-33c89424de2d',
  villa5: 'photo-1600585154340-be6161a56a0c',
  villa6: 'photo-1564013799919-ab600027ffc6',
  clinic: 'photo-1631217872822-1c2546d6b864',
  clinicAlt: 'photo-1629909613654-28e377c37b09',
  reception: 'photo-1582719478250-c89cae4dc85b',
  textureOne: 'photo-1505944270255-72b8c68c6a70',
  textureTwo: 'photo-1515378791036-0648a3ef77b2',
  light: 'photo-1620462544879-1afb18cdd2f0',
  story1: 'photo-1494790108377-be9c29b29330',
  story2: 'photo-1531123897727-8f129e1688ce',
  story3: 'photo-1544005313-94ddf0286df2',
  story4: 'photo-1488426862026-3ee34a7d66df',
  story5: 'photo-1573496359142-b8d87734a5a2',
  story6: 'photo-1487412720507-e7ab37603c6f',
  story7: 'photo-1534528741775-53994a69daeb',
  story8: 'photo-1524504388940-b1c1722653e1',
}

export const IMG = {
  hero: uid(ID.hero, 1400, 1800),
  surgical: uid(ID.surgical, 1000, 1250),
  injectables: uid(ID.injectables, 1000, 1250),
  hair: uid(ID.hair, 1000, 1250),
  dental: uid(ID.dental, 1000, 1250),
  recovery: uid(ID.recovery, 1000, 1250),
  concierge: uid(ID.concierge, 1000, 1250),
  bali: uid(ID.bali, 1200, 1500),
  baliAlt: uid(ID.baliAlt, 1200, 1500),
  bali2: uid(ID.bali2, 1200, 1500),
  villa1: uid(ID.villa1, 1200, 900),
  villa2: uid(ID.villa2, 1200, 900),
  villa3: uid(ID.villa3, 1200, 900),
  villa4: uid(ID.villa4, 1200, 900),
  villa5: uid(ID.villa5, 1200, 900),
  villa6: uid(ID.villa6, 1200, 900),
  clinic: uid(ID.clinic, 1400, 900),
  clinicAlt: uid(ID.clinicAlt, 1400, 900),
  reception: uid(ID.reception, 1200, 800),
  texture: uid(ID.textureOne, 1200, 800),
  textureAlt: uid(ID.textureTwo, 1200, 800),
  light: uid(ID.light, 1200, 800),
}

export const STORY_PORTRAITS = [
  uid(ID.story1, 400, 400),
  uid(ID.story2, 400, 400),
  uid(ID.story3, 400, 400),
  uid(ID.story4, 400, 400),
  uid(ID.story5, 400, 400),
  uid(ID.story6, 400, 400),
  uid(ID.story7, 400, 400),
  uid(ID.story8, 400, 400),
]

const TREATMENT_IMAGES: Record<string, string> = {
  surgical: '/assets/treatments/surgical.webp',
  reconstructive: '/assets/treatments/surgical.webp',
  'non-surgical': '/assets/treatments/non-surgical.webp',
  hair: '/assets/treatments/hair.webp',
  dental: '/assets/treatments/dental.webp',
  recovery: '/assets/treatments/recovery.webp',
  concierge: '/assets/treatments/concierge.webp',
}

export const TREATMENT_IMG = (slug: string): string => TREATMENT_IMAGES[slug] || ''

const SURGEON_PORTRAITS: Record<string, string> = {
  suka: '/assets/surgeons/suka.png',
  astri: '/assets/surgeons/astri.png',
  indra: '/assets/surgeons/indra.webp',
  wara: '/assets/surgeons/wara.png',
  sissy: '/assets/surgeons/sissy.png',
  rosa: '/assets/surgeons/rosa.png',
  risma: '/assets/surgeons/risma.webp',
  theresia: '/assets/surgeons/theresia.webp',
}

export const SURGEON_IMG = (slug: string): string => SURGEON_PORTRAITS[slug] || ''
