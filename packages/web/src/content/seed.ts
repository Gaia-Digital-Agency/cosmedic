/**
 * Phase 2/3 seed data — ports `design/shared.jsx` window globals to TypeScript.
 *
 * This file is the editorial source-of-truth until Phase 6 swaps it for
 * Payload-backed data. Keep field shapes in lockstep with `docs/db_schema.md`
 * so the Phase 6 migration is a straight rename rather than a refactor.
 */

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

export const TREATMENT_LIST: Treatment[] = [
  {
    slug: 'surgical',
    n: '01',
    t: 'Surgical',
    sub: 'Rhinoplasty · Breast · Body',
    count: '9 procedures',
    hue: 0,
    body: 'Considered surgical work performed in our ACHSI-accredited theatres — from rhinoplasty and rejuvenation to breast and body contouring.',
    procedures: [
      'Rhinoplasty',
      'Breast augmentation',
      'Breast reduction',
      'Mastopexy',
      'Liposculpture',
      'Abdominoplasty',
      'Brachioplasty',
      'Thigh lift',
      'Facelift',
    ],
  },
  {
    slug: 'reconstructive',
    n: '02',
    t: 'Reconstructive Surgery',
    sub: 'Breast · Trauma · Craniofacial',
    count: '3 specialties',
    hue: 5,
    body: 'Reconstructive plastic surgery after cancer, trauma, or congenital conditions — led by craniomaxillofacial-credentialed surgeons in our ACHSI-accredited theatres.',
    procedures: [
      'Breast reconstruction',
      'DIEP flap',
      'Scar revision',
      'Burn reconstruction',
      'Cleft lip & palate',
      'Maxillofacial trauma',
    ],
  },
  {
    slug: 'non-surgical',
    n: '03',
    t: 'Non-surgical',
    sub: 'Injectables · Laser · Skin',
    count: '12 protocols',
    hue: 1,
    body: 'Quiet, expert hands for the everyday refinements — neuromodulators, dermal fillers, laser resurfacing and medical-grade facials.',
    procedures: [
      'Botulinum toxin',
      'Dermal fillers',
      'Profhilo',
      'Polynucleotides',
      'Skin boosters',
      'Fractional laser',
      'IPL',
      'Chemical peel',
      'HydraFacial',
      'Microneedling RF',
      'PRP for skin',
      'Medical-grade facial',
    ],
  },
  {
    slug: 'hair',
    n: '04',
    t: 'Hair Restoration',
    sub: 'FUE & Follicle Therapy',
    count: '3 protocols',
    hue: 2,
    body: 'Follicular unit extraction and PRP-based therapies, performed over considered single-day or staged sessions.',
    procedures: ['Sapphire FUE', 'DHI Choi Implanter', 'PRP scalp therapy'],
  },
  {
    slug: 'dental',
    n: '05',
    t: 'Dental Aesthetics',
    sub: 'Veneers · Alignment · Whitening',
    count: '5 services',
    hue: 3,
    body: 'The smile, refined. Porcelain veneers, clear alignment, professional whitening — paced to suit your visit.',
    procedures: [
      'Porcelain veneers',
      'Composite veneers',
      'Clear alignment',
      'Professional whitening',
      'Smile design consult',
    ],
  },
  {
    slug: 'recovery',
    n: '06',
    t: 'Weight Loss',
    sub: 'Medical · Endoscopic · Bariatric',
    count: '3 pathways',
    hue: 4,
    body: 'Medical weight-loss programmes, endoscopic procedures, and bariatric surgery — paced to suit your goals, with structured nutritional and behavioural support.',
    procedures: [
      'GLP-1 medications',
      'Tirzepatide',
      'Intragastric balloon',
      'Endoscopic sleeve gastroplasty',
      'Sleeve gastrectomy',
      'Gastric bypass',
    ],
  },
]

export const SUBCATEGORIES_BY_DISCIPLINE: Record<TreatmentSlug, [string, string][]> = {
  surgical: [
    ['surgical-face', 'Face'],
    ['surgical-body', 'Body'],
    ['surgical-breast', 'Breast'],
  ],
  reconstructive: [
    ['reconstructive-breast', 'Breast Reconstruction'],
    ['reconstructive-trauma', 'Trauma & Scar'],
    ['reconstructive-craniofacial', 'Craniofacial'],
  ],
  'non-surgical': [
    ['non-surgical-injectables', 'Injectables'],
    ['non-surgical-laser', 'Laser & Resurfacing'],
    ['non-surgical-skin', 'Skin Health'],
  ],
  hair: [
    ['hair-fue', 'FUE Surgical'],
    ['hair-therapy', 'Follicle Therapy'],
  ],
  dental: [
    ['dental-veneers', 'Veneers'],
    ['dental-alignment', 'Alignment'],
    ['dental-whitening', 'Whitening'],
  ],
  recovery: [
    ['weight-loss-medical', 'Medical'],
    ['weight-loss-endoscopic', 'Endoscopic'],
    ['weight-loss-surgical', 'Bariatric Surgery'],
  ],
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

export const SURGEON_LIST: Surgeon[] = [
  {
    slug: 'suka',
    name: 'I Made Suka Adnyana',
    common: 'Suka',
    title: 'dr.',
    suffix: 'SpBP-RE (K)',
    spec: 'Plastic Surgery — Facial, Body & Breast',
    train: 'Indonesia · Japan',
    proc: 'ISAPS Member',
    years: '7',
    hue: 0,
    lead: true,
    cred: 'dr. SpBP-RE (K) · ISAPS Member',
    group: 'Plastic Surgery',
    bio: 'dr. Suka is a member of the prestigious International Society of Aesthetic Plastic Surgery (ISAPS), one of the world\'s leading professional bodies for board-certified aesthetic plastic surgeons.',
    spec_areas: ['Facial Aesthetics', 'Body Contouring', 'Breast Surgery', 'Maxillofacial'],
  },
  {
    slug: 'astri',
    name: 'Astrinita Lestari Suyata',
    common: 'Astri',
    title: 'dr.',
    suffix: 'Sp.BP-RE',
    spec: 'Plastic, Reconstructive & Aesthetic Surgery',
    train: 'Hasanuddin · Udayana · South Korea',
    proc: 'ISAPS Member',
    years: '8',
    hue: 1,
    cred: 'dr. Sp.BP-RE · ISAPS Member · Korea Fellowship',
    group: 'Plastic Surgery',
    bio: 'dr. Astrinita Lestari Suyata, Sp.B.P.R.E — more familiarly known as dr. Astri — is an internationally trained Plastic Reconstructive and Aesthetic Surgeon and a proud member of ISAPS.',
    spec_areas: ['Face Rejuvenation', 'Body Contouring', 'Non-surgical', 'Minimally Invasive'],
  },
  {
    slug: 'indra',
    name: 'Ida Bagus Agung Indra Pramana',
    common: 'Indra',
    title: 'dr.',
    suffix: 'Sp.B.P.R.E., FICS',
    spec: 'Plastic, Reconstructive & Aesthetic Surgery',
    train: 'Udayana University',
    proc: 'FICS · Active Researcher',
    years: '2',
    hue: 2,
    cred: 'dr. Sp.B.P.R.E., FICS',
    group: 'Plastic Surgery',
    bio: 'dr. Indra graduated from the Plastic Reconstructive and Aesthetic Surgery Study Program at the Faculty of Medicine, Udayana University Bali in 2024.',
    spec_areas: ['Reconstructive', 'Aesthetic Surgery', 'Trauma', 'Research'],
  },
  {
    slug: 'wara',
    name: 'Gede Wara Samsarga',
    common: 'Wara',
    title: 'dr.',
    suffix: 'Sp.BP-RE, Subsp.KM(K), FICS',
    spec: 'Plastic Surgery — Craniomaxillofacial Subspecialty',
    train: 'Udayana · Singapore Fellowship',
    proc: 'Subspecialist · FICS',
    years: '10',
    hue: 3,
    cred: 'dr. Sp.BP-RE, Subsp.KM(K), FICS',
    group: 'Plastic Surgery',
    bio: 'dr. Wara is a Plastic Reconstructive and Aesthetic Surgeon with extensive experience in reconstructive and aesthetic surgery, especially in the craniomaxillofacial subspecialty.',
    spec_areas: ['Craniomaxillofacial', 'Blepharoplasty', 'Brow & Face Lift', 'Neck Lift'],
  },
  {
    slug: 'sissy',
    name: 'Sissy Yunita Surya',
    common: 'Sissy',
    title: 'dr.',
    suffix: 'M. Biomed (AAM)',
    spec: 'Aesthetic & Anti-Aging Medicine',
    train: 'Udayana University · AAM',
    proc: 'Magister AAM 2016',
    years: '17',
    hue: 4,
    cred: 'dr. M. Biomed (AAM)',
    group: 'Aesthetic Medicine',
    bio: 'Graduated as a physician from Udayana University in 2007, dr. Sissy started her duty in BIMC Hospital the following year as an emergency and international escort doctor.',
    spec_areas: ['Injectables', 'Hormonal Therapy', 'Laser', 'Thread Lift'],
  },
  {
    slug: 'rosa',
    name: 'Rosalina Silvia Dewi',
    common: 'Rosa',
    title: 'dr.',
    suffix: 'M. Biomed (AAM), Diploma AAAM (USA)',
    spec: 'Aesthetic & Anti-Aging Medicine',
    train: 'Udayana · AAAM (USA)',
    proc: 'Diploma AAAM',
    years: '12',
    hue: 5,
    cred: 'dr. M. Biomed (AAM), Diploma AAAM (USA)',
    group: 'Aesthetic Medicine',
    bio: 'dr. Rosa studied anti-aging at Udayana University, Bali, achieving a magister degree, with further studies at the American Academy of Aesthetic Medicine (USA).',
    spec_areas: ['Botox & Fillers', 'Laser Rejuvenation', 'Non-surgical Facials', 'Eye & Nose Refinement'],
  },
  {
    slug: 'risma',
    name: 'I Gusti Ayu Risma Pramita',
    common: 'Risma',
    title: 'dr.',
    suffix: 'Sp.D.V.E.',
    spec: 'Dermatology, Venereology & Aesthetics',
    train: 'Udayana University',
    proc: 'Sp.D.V.E. 2024',
    years: '2',
    hue: 0,
    cred: 'dr. Sp.D.V.E.',
    group: 'Aesthetic Medicine',
    bio: 'dr. Risma is a Dermatologist, Venereologist & Aesthetician who graduated from the Faculty of Medicine, Udayana University Bali in 2024.',
    spec_areas: ['Cosmetic Dermatology', 'LIFU & HIFU', 'RF Microneedling', 'Face Liposculpture'],
  },
  {
    slug: 'theresia',
    name: 'Theresia Indri Indrawati Setiadi',
    common: 'Theresia',
    title: 'dr.',
    suffix: 'Sp.DVE',
    spec: 'Dermatology, Venereology & Aesthetics',
    train: 'Diponegoro University · Korea',
    proc: 'Sp.DVE · KCCS Member',
    years: '2',
    hue: 1,
    cred: 'dr. Sp.DVE · Korean College of Cosmetic Surgery',
    group: 'Aesthetic Medicine',
    bio: 'dr. Theresia, Sp.DVE is a Dermatologist, Venereologist, and Aesthetician who graduated from the Faculty of Medicine, Diponegoro University, Indonesia, in 2024.',
    spec_areas: ['Dermal Fillers', 'Skin Boosters', 'PRP', 'Body Shaping'],
  },
]

export const WHATSAPP_HREF = 'https://wa.me/6281339001911'

/* ============================================
 * Imagery — ported verbatim from design/shared.jsx
 * ============================================ */

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

// Per-treatment images — local assets
const TREATMENT_IMAGES: Record<string, string> = {
  surgical: '/assets/treatments/surgical.webp',
  reconstructive: '/assets/treatments/surgical.webp',
  'non-surgical': '/assets/treatments/non-surgical.webp',
  hair: '/assets/treatments/hair.webp',
  dental: '/assets/treatments/dental.webp',
  recovery: '/assets/treatments/recovery.webp',
  concierge: '/assets/treatments/concierge.webp',
}

export const TREATMENT_IMG = (slug: string): string =>
  TREATMENT_IMAGES[slug] || ''

// Surgeon portraits — local assets, mirrors design/assets/surgeons/
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

export type BaPair = {
  num: string
  label: string
  time: string
  cat: string
  image: string
}

export const BA_PAIRS: BaPair[] = [
  {
    num: 'Case 047',
    label: 'Necklift',
    time: 'Five months',
    cat: 'surgical',
    image: '/assets/results/necklift-female.webp',
  },
  {
    num: 'Case 001',
    label: 'Lip Lift',
    time: 'Three months',
    cat: 'surgical',
    image: '/assets/results/lip-lift-female.webp',
  },
  {
    num: 'Case 003',
    label: 'Lip Lift',
    time: 'Three months',
    cat: 'surgical',
    image: '/assets/results/lip-lift-male.webp',
  },
]
