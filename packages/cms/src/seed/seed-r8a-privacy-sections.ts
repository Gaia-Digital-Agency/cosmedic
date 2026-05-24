/**
 * Phase R8.A — seed the `privacy-sections` collection with the 10 legal
 * sections currently hardcoded in packages/web/src/routes/privacy/PrivacyPage.tsx
 * (the SECTIONS const, L17–103).
 *
 * Idempotent. Run via:
 *   NODE_ENV=production pnpm --filter @cosmedic/cms exec tsx \
 *     src/seed/seed-r8a-privacy-sections.ts
 *
 * Visual invariance gate: after running, /privacy must render byte-identical
 * HTML to the pre-rewire snapshot once R8.D rewires the route.
 */

import { config as loadEnv } from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
loadEnv({ path: path.resolve(dirname, '../../.env') })

const { getPayload } = await import('payload')
const config = (await import('../payload.config')).default
const { upsert } = await import('./seed-helpers')

type SectionRow = {
  slug: string
  title: string
  sortOrder: number
  paragraphs?: string[]
  listItems?: string[]
}

const SECTIONS: SectionRow[] = [
  {
    slug: 'summary',
    title: 'Summary',
    sortOrder: 10,
    paragraphs: [
      'This is a plain-English summary of the legal terms below. The longer text governs in the event of any disagreement, but the substance of both is the same.',
      'We collect only the information we need to look after you medically and to run our clinic. We do not sell it, we do not share it for marketing, and we keep it for as long as the law requires us to.',
      'If you have any question, the easiest way to reach our Data Protection Officer is the email at the foot of this page. We answer within five working days.',
    ],
  },
  {
    slug: 'who',
    title: 'Who we are',
    sortOrder: 20,
    paragraphs: [
      'BIMC CosMedic is the cosmetic and aesthetic medicine division of BIMC Hospital, operated by PT Trisaka Reksa Waluya, an Indonesian limited company registered in Bali, Indonesia.',
      'Registered office: Jl. Bypass Ngurah Rai 100X, Kuta, Bali 80361, Indonesia. Hospital licence number 445/00045/DPMPTSP/2024.',
    ],
  },
  {
    slug: 'data',
    title: 'What we collect',
    sortOrder: 30,
    listItems: [
      'Identity & contact details — name, date of birth, passport or identity card, postal address, email, phone numbers, and emergency contact.',
      'Medical & clinical information — your past medical history, current medications, allergies, photographs taken in consultation, examination findings, theatre and recovery records, prescriptions, and any correspondence with referring physicians.',
      'Financial information — quoted and invoiced amounts, payment method, billing address, and where applicable insurance details. We do not store full card numbers; payment is processed by Stripe and our acquiring bank.',
      'Website usage — pages viewed, the device you used, and how you arrived. We use Plausible (privacy-preserving) for this; we do not run advertising trackers.',
    ],
  },
  {
    slug: 'use',
    title: 'How we use it',
    sortOrder: 40,
    listItems: [
      'To plan and deliver your medical care, and to allow other treating clinicians (anaesthetists, nursing staff, recovery teams) to do the same.',
      'To meet our legal obligations under Indonesian Law No. 17 of 2023 on Health, and to support the audit cycles required for ACHSI and ISO 9001:2015.',
      'To send you appointment reminders, follow-up instructions, and the quarterly journal — but only if you have asked to receive it. You can unsubscribe at any time, and we will keep doing so.',
      'To improve our service, in aggregate and non-identifiable form. Individual patient stories are only published with written consent.',
    ],
  },
  {
    slug: 'shared',
    title: 'Who we share it with',
    sortOrder: 50,
    paragraphs: [
      'We share your information with: the clinicians directly involved in your care; the laboratory and pathology partners who process your samples; the recovery villa concierge team where you are staying; your insurance company if you are claiming; your referring physician, with your consent; and the Indonesian Ministry of Health when statutorily required.',
      'We do not share your data with marketing companies, social platforms, or data brokers, and we have never sold patient information of any kind.',
    ],
  },
  {
    slug: 'rights',
    title: 'Your rights',
    sortOrder: 60,
    listItems: [
      'Access — a copy of everything we hold about you, in PDF, within 30 days of request.',
      'Correction — we will amend any factual inaccuracy you point out to us.',
      'Erasure — where there is no legal reason to keep your records, we will delete them. Clinical records must be kept for 25 years under Indonesian law.',
      'Withdrawal of consent — for any optional communication (newsletter, follow-up surveys), at any time, with no effect on your medical care.',
      'Complaint — to our Data Protection Officer first, and to the Indonesian Ministry of Communication and Informatics if you remain unsatisfied.',
    ],
  },
  {
    slug: 'cookies',
    title: 'Cookies',
    sortOrder: 70,
    paragraphs: [
      'This website sets a single first-party cookie to remember your language preference. We do not set advertising cookies or tracking pixels. Our analytics provider (Plausible) does not use cookies at all.',
    ],
  },
  {
    slug: 'consent',
    title: 'Consent & medical decisions',
    sortOrder: 80,
    paragraphs: [
      'Every surgical procedure carried out at BIMC CosMedic requires a written, informed consent form signed at least 48 hours before surgery. We are happy to discuss the form line by line in your pre-operative consultation, and to provide it in Bahasa Indonesia, English, or Mandarin.',
      'You may withdraw your consent at any point before surgery without explanation or financial penalty.',
    ],
  },
  {
    slug: 'results',
    title: 'Photographs & results',
    sortOrder: 90,
    paragraphs: [
      'Clinical photographs are taken as part of routine surgical practice and stored within your medical record. We will only publish them — anonymously or otherwise — with a separately signed release form, which you may revoke in writing at any time.',
    ],
  },
  {
    slug: 'law',
    title: 'Governing law',
    sortOrder: 100,
    paragraphs: [
      'These terms are governed by the laws of the Republic of Indonesia. Disputes will be resolved by the District Court of Denpasar, Bali, unless both parties agree to arbitration under BANI Arbitration Center rules.',
    ],
  },
]

async function main(): Promise<void> {
  const payload = await getPayload({ config })

  payload.logger.info(`[seed-r8a] upserting ${SECTIONS.length} privacy sections`)

  for (const s of SECTIONS) {
    await upsert(payload, 'privacy-sections', 'slug', s.slug, {
      slug: s.slug,
      title: s.title,
      sortOrder: s.sortOrder,
      paragraphs: (s.paragraphs || []).map((text) => ({ text })),
      listItems: (s.listItems || []).map((text) => ({ text })),
    })
    payload.logger.info(`[seed-r8a]   upserted "${s.slug}" — ${s.title}`)
  }

  payload.logger.info('[seed-r8a] done')
  process.exit(0)
}

main().catch((err) => {
  console.error('[seed-r8a] failed:', err)
  process.exit(1)
})
