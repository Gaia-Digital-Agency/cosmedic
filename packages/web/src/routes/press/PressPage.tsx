import React from 'react'
import { PageShell } from '@/components/shell/PageShell'
import { CmsExtraBlocks } from '@/components/CmsExtraBlocks'
import { ChapterOpener } from '@/components/primitives/ChapterOpener'
import { Reveal } from '@/components/primitives/Reveal'
import { Mono, Eyebrow } from '@/components/primitives/Mono'
import { Btn } from '@/components/primitives/Btn'
import { IMG } from '@/content/seed'

const ACCREDITATIONS = [
  {
    name: 'ACHSI',
    full: 'Australian Council on Healthcare Standards International',
    note: 'First Indonesian hospital · 2014, renewed 2024',
  },
  {
    name: 'ISO 9001:2015',
    full: 'International Organization for Standardization',
    note: 'Quality management certification',
  },
  {
    name: 'Healthcare Asia',
    full: 'Medical Tourism Hospital of the Year 2026',
    note: 'Indonesia category',
  },
  {
    name: 'ISAPS',
    full: 'International Society of Aesthetic Plastic Surgery',
    note: 'Member institution',
  },
  {
    name: 'IPRAS',
    full: 'International Confederation for Plastic Reconstructive & Aesthetic Surgery',
    note: 'Affiliated faculty',
  },
  {
    name: 'JCI Pathway',
    full: 'Joint Commission International',
    note: 'Pre-accreditation, ongoing',
  },
  {
    name: 'TGA',
    full: 'Therapeutic Goods Administration (AU)',
    note: 'Sponsored device protocols',
  },
  {
    name: 'FDA',
    full: 'U.S. Food and Drug Administration',
    note: 'Implant & device sourcing',
  },
]

const PRESS = [
  { pub: 'Vogue Australia', headline: 'The new wave of considered cosmetic medicine.', date: 'March 2026' },
  { pub: 'T Magazine', headline: 'A retreat with the rigour of a hospital.', date: 'January 2026' },
  { pub: "Harper's Bazaar Asia", headline: "Bali's quiet revolution in aesthetic surgery.", date: 'November 2025' },
  { pub: 'Robb Report', headline: 'Why discerning patients are flying to Nusa Dua.', date: 'October 2025' },
  { pub: 'The Australian Financial Review', headline: 'The medical-tourism centre Australians actually trust.', date: 'August 2025' },
  { pub: 'Tatler Asia', headline: "Inside BIMC CosMedic — Bali's most accredited centre.", date: 'May 2025' },
]

export const PressPage: React.FC = () => (
  <PageShell activePage="press">
    <ChapterOpener
      chapter="Chapter IX — Accreditations & Press"
      title={['Held to the', 'highest standards.']}
      lede="Indonesia's first ACHSI-accredited international hospital, named Medical Tourism Hospital of the Year at the 2026 Healthcare Asia Awards, and quietly reviewed in the publications we read ourselves."
      image={IMG.clinic}
      imageHue={3}
      imageLabel="ACCREDITATIONS"
      breadcrumbs={[{ label: 'BIMC CosMedic', href: '/' }, { label: 'Accreditations & Press' }]}
    />

    <div className="stats-row">
      <Reveal>
        <div className="stat-block">
          <span className="stat-num italic">First</span>
          <span className="stat-label">ACHSI in Indonesia</span>
        </div>
      </Reveal>
      <Reveal delay={80}>
        <div className="stat-block">
          <span className="stat-num">2026</span>
          <span className="stat-label">Hospital of the Year</span>
        </div>
      </Reveal>
      <Reveal delay={160}>
        <div className="stat-block">
          <span className="stat-num">28</span>
          <span className="stat-label">Years of practice</span>
        </div>
      </Reveal>
      <Reveal delay={240}>
        <div className="stat-block">
          <span className="stat-num">8</span>
          <span className="stat-label">International standards</span>
        </div>
      </Reveal>
    </div>

    <section className="page-section">
      <Reveal>
        <div className="section-head">
          <Eyebrow>Accreditations</Eyebrow>
          <div>
            <h2 className="section-title">The credentials we hold.</h2>
            <p className="section-lede">
              We have spent twenty-eight years building these credentials, one at a time, because
              they are the only thing that actually matters in our line of work.
            </p>
          </div>
        </div>
      </Reveal>
      <div className="press-grid">
        {ACCREDITATIONS.map((a, i) => (
          <Reveal key={i} delay={i * 50}>
            <div
              className="press-item"
              style={{
                flexDirection: 'column',
                padding: 32,
                alignItems: 'flex-start',
                textAlign: 'left',
              }}
            >
              <Mono style={{ marginBottom: 14 }}>0{i + 1}</Mono>
              <h4
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 28,
                  fontStyle: 'italic',
                  fontWeight: 400,
                  margin: '0 0 8px',
                  color: 'var(--ink-100)',
                  letterSpacing: '-0.005em',
                }}
              >
                {a.name}
              </h4>
              <p
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 15,
                  color: 'var(--ink-80)',
                  margin: '0 0 12px',
                  lineHeight: 1.5,
                }}
              >
                {a.full}
              </p>
              <Mono style={{ color: 'var(--accent-deep)' }}>{a.note}</Mono>
            </div>
          </Reveal>
        ))}
      </div>
    </section>

    <section className="page-section tinted">
      <Reveal>
        <div className="section-head">
          <Eyebrow>In the press</Eyebrow>
          <div>
            <h2 className="section-title">
              Quietly, in <span className="italic">good company.</span>
            </h2>
            <p className="section-lede">
              A small selection from the editorial coverage of the past eighteen months. We do not
              pitch — but we are happy to talk to journalists who reach us directly.
            </p>
          </div>
        </div>
      </Reveal>
      <div style={{ borderTop: '1px solid var(--ink-20)' }}>
        {PRESS.map((p, i) => (
          <Reveal key={i} delay={i * 50}>
            <div className="press-row">
              <Mono>{p.pub}</Mono>
              <h4
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontStyle: 'italic',
                  fontSize: 26,
                  fontWeight: 400,
                  margin: 0,
                  letterSpacing: '-0.005em',
                }}
              >
                "{p.headline}"
              </h4>
              <Mono>{p.date}</Mono>
              <span style={{ textAlign: 'right', color: 'var(--ink-60)' }}>→</span>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal>
        <div style={{ marginTop: 60, textAlign: 'center' }}>
          <Btn kind="ghost">Press enquiries</Btn>
        </div>
      </Reveal>
    </section>
    <CmsExtraBlocks slug="press" />
  </PageShell>
)
