import React from 'react'
import { PageShell } from '@/components/shell/PageShell'
import { CmsExtraBlocks } from '@/components/CmsExtraBlocks'
import { ChapterOpener } from '@/components/primitives/ChapterOpener'
import { Reveal } from '@/components/primitives/Reveal'
import { Mono, Eyebrow } from '@/components/primitives/Mono'
import { Btn } from '@/components/primitives/Btn'
import { IMG } from '@/content/seed'

type Section = {
  id: string
  title: string
  body?: string[]
  list?: string[]
}

const SECTIONS: Section[] = [
  {
    id: 'summary',
    title: 'Summary',
    body: [
      'This is a plain-English summary of the legal terms below. The longer text governs in the event of any disagreement, but the substance of both is the same.',
      'We collect only the information we need to look after you medically and to run our clinic. We do not sell it, we do not share it for marketing, and we keep it for as long as the law requires us to.',
      'If you have any question, the easiest way to reach our Data Protection Officer is the email at the foot of this page. We answer within five working days.',
    ],
  },
  {
    id: 'who',
    title: 'Who we are',
    body: [
      'BIMC CosMedic is the cosmetic and aesthetic medicine division of BIMC Hospital, operated by PT Trisaka Reksa Waluya, an Indonesian limited company registered in Bali, Indonesia.',
      'Registered office: Jl. Bypass Ngurah Rai 100X, Kuta, Bali 80361, Indonesia. Hospital licence number 445/00045/DPMPTSP/2024.',
    ],
  },
  {
    id: 'data',
    title: 'What we collect',
    list: [
      'Identity & contact details — name, date of birth, passport or identity card, postal address, email, phone numbers, and emergency contact.',
      'Medical & clinical information — your past medical history, current medications, allergies, photographs taken in consultation, examination findings, theatre and recovery records, prescriptions, and any correspondence with referring physicians.',
      'Financial information — quoted and invoiced amounts, payment method, billing address, and where applicable insurance details. We do not store full card numbers; payment is processed by Stripe and our acquiring bank.',
      'Website usage — pages viewed, the device you used, and how you arrived. We use Plausible (privacy-preserving) for this; we do not run advertising trackers.',
    ],
  },
  {
    id: 'use',
    title: 'How we use it',
    list: [
      'To plan and deliver your medical care, and to allow other treating clinicians (anaesthetists, nursing staff, recovery teams) to do the same.',
      'To meet our legal obligations under Indonesian Law No. 17 of 2023 on Health, and to support the audit cycles required for ACHSI and ISO 9001:2015.',
      'To send you appointment reminders, follow-up instructions, and the quarterly journal — but only if you have asked to receive it. You can unsubscribe at any time, and we will keep doing so.',
      'To improve our service, in aggregate and non-identifiable form. Individual patient stories are only published with written consent.',
    ],
  },
  {
    id: 'shared',
    title: 'Who we share it with',
    body: [
      'We share your information with: the clinicians directly involved in your care; the laboratory and pathology partners who process your samples; the recovery villa concierge team where you are staying; your insurance company if you are claiming; your referring physician, with your consent; and the Indonesian Ministry of Health when statutorily required.',
      'We do not share your data with marketing companies, social platforms, or data brokers, and we have never sold patient information of any kind.',
    ],
  },
  {
    id: 'rights',
    title: 'Your rights',
    list: [
      'Access — a copy of everything we hold about you, in PDF, within 30 days of request.',
      'Correction — we will amend any factual inaccuracy you point out to us.',
      'Erasure — where there is no legal reason to keep your records, we will delete them. Clinical records must be kept for 25 years under Indonesian law.',
      'Withdrawal of consent — for any optional communication (newsletter, follow-up surveys), at any time, with no effect on your medical care.',
      'Complaint — to our Data Protection Officer first, and to the Indonesian Ministry of Communication and Informatics if you remain unsatisfied.',
    ],
  },
  {
    id: 'cookies',
    title: 'Cookies',
    body: [
      'This website sets a single first-party cookie to remember your language preference. We do not set advertising cookies or tracking pixels. Our analytics provider (Plausible) does not use cookies at all.',
    ],
  },
  {
    id: 'consent',
    title: 'Consent & medical decisions',
    body: [
      'Every surgical procedure carried out at BIMC CosMedic requires a written, informed consent form signed at least 48 hours before surgery. We are happy to discuss the form line by line in your pre-operative consultation, and to provide it in Bahasa Indonesia, English, or Mandarin.',
      'You may withdraw your consent at any point before surgery without explanation or financial penalty.',
    ],
  },
  {
    id: 'results',
    title: 'Photographs & results',
    body: [
      'Clinical photographs are taken as part of routine surgical practice and stored within your medical record. We will only publish them — anonymously or otherwise — with a separately signed release form, which you may revoke in writing at any time.',
    ],
  },
  {
    id: 'law',
    title: 'Governing law',
    body: [
      'These terms are governed by the laws of the Republic of Indonesia. Disputes will be resolved by the District Court of Denpasar, Bali, unless both parties agree to arbitration under BANI Arbitration Center rules.',
    ],
  },
]

export const PrivacyPage: React.FC = () => (
  <PageShell activePage="privacy">
    <ChapterOpener
      chapter="Chapter XI — Privacy & Terms"
      title={['Plain', 'language.']}
      lede="Your medical record is the most sensitive document you will ever sign. Here is exactly what we do with it, how long we keep it, and who else sees it."
      image={IMG.texture}
      imageHue={5}
      imageLabel="PRIVACY"
      breadcrumbs={[{ label: 'BIMC CosMedic', href: '/' }, { label: 'Privacy & Terms' }]}
    />

    <section
      style={{
        background: 'var(--paper-warm)',
        borderBottom: '1px solid var(--ink-20)',
        padding: '28px var(--page-x)',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          flexWrap: 'wrap',
          gap: 24,
        }}
      >
        <Mono>Last updated · 12 May 2026</Mono>
        <Mono>Version 4.2 · Annual review cycle</Mono>
        <Mono>Read in 6 minutes</Mono>
      </div>
    </section>

    <section className="page-section">
      <div className="privacy-layout">
        <aside className="privacy-toc">
          <Reveal>
            <Eyebrow>Contents</Eyebrow>
            <ol className="privacy-toc-list">
              {SECTIONS.map((s, i) => (
                <li key={s.id}>
                  <a href={`#${s.id}`}>
                    <span className="privacy-toc-num">{String(i + 1).padStart(2, '0')}</span>
                    <span>{s.title}</span>
                  </a>
                </li>
              ))}
            </ol>
          </Reveal>
        </aside>

        <div className="privacy-content">
          {SECTIONS.map((s, i) => (
            <Reveal key={s.id} delay={Math.min(i, 6) * 40}>
              <article id={s.id} className="privacy-section">
                <div className="privacy-section-head">
                  <Mono>§ {String(i + 1).padStart(2, '0')}</Mono>
                  <h3 className="privacy-section-title">{s.title}</h3>
                </div>
                {s.body &&
                  s.body.map((p, j) => (
                    <p key={j} className="privacy-p">
                      {p}
                    </p>
                  ))}
                {s.list && (
                  <ul className="privacy-list">
                    {s.list.map((it, j) => (
                      <li key={j}>{it}</li>
                    ))}
                  </ul>
                )}
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>

    <section className="page-section tinted">
      <Reveal>
        <div className="privacy-contact">
          <div>
            <Eyebrow>Data Protection Officer</Eyebrow>
            <h2 className="section-title" style={{ marginTop: 16 }}>
              Questions? <span className="italic">Write to us.</span>
            </h2>
            <p className="section-lede" style={{ maxWidth: 620 }}>
              We answer within five working days. For urgent medical questions, please use the main
              contact form — it reaches the on-call concierge in minutes.
            </p>
          </div>
          <div className="privacy-contact-meta">
            <div>
              <Mono>Email</Mono>
              <a href="mailto:privacy@bimcbali.com" className="privacy-contact-link">
                privacy@bimcbali.com
              </a>
            </div>
            <div>
              <Mono>Post</Mono>
              <span className="privacy-contact-addr">
                Data Protection Officer
                <br />
                BIMC CosMedic, Jl. Bypass Ngurah Rai 100X
                <br />
                Kuta, Bali 80361, Indonesia
              </span>
            </div>
            <div style={{ marginTop: 12 }}>
              <Btn kind="ghost" as="a" href="/contact">
                General contact
              </Btn>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
    <CmsExtraBlocks slug="privacy" />
  </PageShell>
)
