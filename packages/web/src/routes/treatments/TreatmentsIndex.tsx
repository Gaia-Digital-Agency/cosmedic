import React from 'react'
import { PageShell } from '@/components/shell/PageShell'
import { ChapterOpener } from '@/components/primitives/ChapterOpener'
import { Reveal } from '@/components/primitives/Reveal'
import { Img } from '@/components/primitives/Img'
import { Eyebrow } from '@/components/primitives/Mono'
import { StatsRow } from '@/components/primitives/StatsRow'
import { TREATMENT_LIST, TREATMENT_IMG, IMG } from '@/content/seed'

const TREATMENTS_STATS = [
  { number: '28', label: 'Years in Bali' },
  { number: '2,400+', label: 'Procedures yearly' },
  { number: '8', label: 'Specialists on faculty' },
  { number: '96%', label: 'Patient satisfaction' },
]

export const TreatmentsIndex: React.FC = () => (
  <PageShell activePage="treatments">
    <ChapterOpener
      chapter="Chapter II — The Repertoire"
      title={['Six disciplines,', 'one sanctuary.']}
      lede="A complete repertoire of cosmetic medicine practiced under one roof — surgical, non-surgical, restorative, and the careful coordination that holds it all together."
      image={IMG.surgical}
      imageHue={1}
      imageLabel="THE REPERTOIRE"
      breadcrumbs={[{ label: 'BIMC CosMedic', href: '/' }, { label: 'Treatments' }]}
    />

    <section className="page-section">
      <Reveal>
        <div className="section-head">
          <Eyebrow>An Index</Eyebrow>
          <div>
            <h2 className="section-title">Browse by discipline.</h2>
            <p className="section-lede">
              Each discipline is led by a specialist surgeon and supported by the full clinical,
              recovery, and concierge team. Treatments may be combined across disciplines on a
              single visit.
            </p>
          </div>
        </div>
      </Reveal>

      <div className="treatment-index">
        {TREATMENT_LIST.map((t, i) => (
          <Reveal key={t.slug} delay={i * 60} y={20}>
            <a href={`/treatments/${t.slug}`} className="treatment-row" style={{ color: 'inherit' }}>
              <div className="ti-image">
                <Img src={TREATMENT_IMG(t.slug)} fallbackLabel={t.t.toUpperCase()} fallbackHue={t.hue} alt="" />
              </div>
              <div className="ti-body">
                <div>
                  <h3>{t.t}</h3>
                  <p className="ti-italic">{t.sub}</p>
                  <p>{t.body}</p>
                </div>
                <div className="ti-foot">
                  <span className="treatment-link">
                    Read more <span>→</span>
                  </span>
                </div>
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </section>

    <StatsRow stats={TREATMENTS_STATS} variant="page-row" />
  </PageShell>
)
