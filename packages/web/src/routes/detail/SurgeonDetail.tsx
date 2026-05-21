import React from 'react'
import { PageShell } from '@/components/shell/PageShell'
import { Reveal } from '@/components/primitives/Reveal'
import { Img } from '@/components/primitives/Img'
import { Mono, Eyebrow } from '@/components/primitives/Mono'
import { Btn } from '@/components/primitives/Btn'
import { SURGEON_LIST, TREATMENT_LIST, SURGEON_IMG } from '@/content/seed'
import { useCms } from '@/lib/cms-context'

const DAY_LABEL: Record<string, string> = {
  mon: 'Mon', tue: 'Tue', wed: 'Wed', thu: 'Thu', fri: 'Fri', sat: 'Sat', sun: 'Sun',
}

type Props = { slug: string }

export const SurgeonDetail: React.FC<Props> = ({ slug }) => {
  const s = SURGEON_LIST.find((x) => x.slug === slug)
  if (!s) return null

  const cms = useCms()
  // Pull the raw CMS Surgeon record so we can render fields that aren't
  // exposed via the seed proxy (availabilitySchedule, languages).
  const cmsSurgeon = cms?.surgeons.find((x) => x.slug === slug)
  const schedule = cmsSurgeon?.availabilitySchedule || []
  const languages = (cmsSurgeon?.languages || []).map((l) => l.code).filter(Boolean)

  const relSlug = s.group === 'Plastic Surgery' ? 'surgical' : 'non-surgical'
  const relTreatment = TREATMENT_LIST.find((t) => t.slug === relSlug)
  const imgLabel = `DR. ${s.common.toUpperCase()}`
  const nameWords = s.name.split(' ')
  const lastWord = nameWords[nameWords.length - 1]
  const restName = nameWords.slice(0, -1).join(' ')

  return (
    <PageShell activePage={`surgeon-${slug}`}>
      <section className="surgeon-hero">
        <div className="surgeon-hero-img" data-surgeon={s.slug}>
          <Img src={SURGEON_IMG(slug)} fallbackLabel={imgLabel} fallbackHue={s.hue} alt="" />
        </div>
        <div className="surgeon-hero-body">
          <Reveal>
            <Eyebrow>
              {s.lead ? 'Lead Surgeon' : 'Specialist'} · {s.group}
            </Eyebrow>
            <h1 className="surgeon-hero-name">
              <span>
                {s.title} {restName}
              </span>
              <span className="italic">{lastWord}</span>
            </h1>
            <p className="surgeon-cred">{s.cred}</p>
          </Reveal>
          <Reveal delay={120}>
            <div style={{ display: 'flex', gap: 16, marginTop: 24 }}>
              <Btn kind="primary" as="a" href="/contact">
                Request a consultation
              </Btn>
              <Btn kind="ghost" as="a" href={`/treatment-${relSlug}`}>
                {relTreatment?.t || 'Treatments'}
              </Btn>
            </div>
          </Reveal>
        </div>
      </section>

      <nav
        className="page-breadcrumb"
        aria-label="Breadcrumb"
        style={{ background: 'var(--cream)', paddingTop: 24, paddingBottom: 24 }}
      >
        <a href="/">BIMC CosMedic</a>
        <span className="sep">/</span>
        <a href="/surgeons">Surgeons</a>
        <span className="sep">/</span>
        <span>Dr. {s.common}</span>
      </nav>

      <div className="stats-row">
        <Reveal>
          <div className="stat-block">
            <span className="stat-num">{s.years}</span>
            <span className="stat-label">Years in practice</span>
          </div>
        </Reveal>
        <Reveal delay={80}>
          <div className="stat-block">
            <span className="stat-num italic">{s.proc}</span>
            <span className="stat-label">Distinction</span>
          </div>
        </Reveal>
        <Reveal delay={240}>
          <div className="stat-block">
            <span className="stat-num italic">{s.spec_areas[0]}</span>
            <span className="stat-label">Specialty</span>
          </div>
        </Reveal>
      </div>

      <section className="page-section">
        <div className="surgeon-bio-layout">
          <aside className="surgeon-bio-aside">
            <Reveal>
              <Eyebrow>Biography</Eyebrow>
            </Reveal>
            <Reveal delay={80}>
              <dl className="surgeon-bio-facts">
                <div>
                  <dt>
                    <Mono>Specialism</Mono>
                  </dt>
                  <dd>{s.group}</dd>
                </div>
                <div>
                  <dt>
                    <Mono>Credentials</Mono>
                  </dt>
                  <dd>{s.cred}</dd>
                </div>
                <div>
                  <dt>
                    <Mono>Languages</Mono>
                  </dt>
                  <dd>
                    {languages.length > 0
                      ? languages.map((c) => c.toUpperCase()).join(' · ')
                      : 'English · Bahasa Indonesia'}
                  </dd>
                </div>
                <div>
                  <dt>
                    <Mono>Availability</Mono>
                  </dt>
                  <dd>
                    {schedule.length > 0 ? (
                      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                        {schedule.map((row, i) => (
                          <li key={i}>
                            <strong>{DAY_LABEL[row.day] || row.day.toUpperCase()}</strong>
                            {row.windowStart && row.windowEnd ? ` · ${row.windowStart}–${row.windowEnd}` : ''}
                            {row.byAppointment ? ' · by appointment' : ''}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      'Mon & Thu in person · weekday mornings by video'
                    )}
                  </dd>
                </div>
              </dl>
            </Reveal>
          </aside>

          <div className="surgeon-bio-body">
            <Reveal delay={120}>
              <p className="surgeon-bio-lede">dr. {s.common}</p>
            </Reveal>
            <Reveal delay={200}>
              <p className="surgeon-bio-text">{s.bio}</p>
            </Reveal>
            <Reveal delay={280}>
              <p className="surgeon-bio-text">
                Patients often describe {s.title} {s.common} as quiet, deeply patient, and frank —
                comfortable with saying "no" when "yes" would be the easier answer. We hold this
                very highly.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="page-section tinted">
        <Reveal>
          <Eyebrow>Specialty areas</Eyebrow>
        </Reveal>
        <Reveal delay={120}>
          <h2 className="section-title" style={{ marginTop: 16, marginBottom: 60 }}>
            What {s.title} {s.common} <span className="italic">does best.</span>
          </h2>
        </Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
          {s.spec_areas.map((area, i) => (
            <Reveal key={i} delay={i * 80}>
              <div
                style={{
                  padding: '32px 28px',
                  border: '1px solid var(--ink-20)',
                  background: 'var(--paper)',
                  minHeight: 180,
                }}
              >
                <Mono>0{i + 1}</Mono>
                <h4
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontStyle: 'italic',
                    fontSize: 28,
                    fontWeight: 400,
                    margin: '12px 0 0',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {area}
                </h4>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="page-section">
        <Reveal>
          <Eyebrow>Training & credentials</Eyebrow>
        </Reveal>
        <div style={{ marginTop: 40, borderTop: '1px solid var(--ink-20)' }}>
          {(
            [
              ['Medical Degree', s.train.split(' · ')[0], 'MBBS / MD'],
              ['Specialty Training', s.group, s.cred],
              ['Suffix', s.suffix, 'Board credential'],
              ['Practice', 'BIMC CosMedic Centre, Bali', 'Active'],
              [
                'Memberships',
                s.cred.includes('ISAPS')
                  ? 'ISAPS · IPRAS'
                  : 'National Society · International courses',
                'Active member',
              ],
            ] as [string, string, string][]
          ).map(([h, mid, right], i) => (
            <Reveal key={i} delay={i * 50}>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '240px 1fr 280px',
                  gap: 32,
                  padding: '26px 0',
                  borderBottom: '1px solid var(--ink-20)',
                  alignItems: 'baseline',
                }}
              >
                <span className="mono" style={{ color: 'var(--accent-deep)' }}>
                  {h}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 20,
                    color: 'var(--ink-100)',
                    letterSpacing: '-0.005em',
                  }}
                >
                  {mid}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontStyle: 'italic',
                    fontSize: 17,
                    color: 'var(--ink-60)',
                    textAlign: 'right',
                  }}
                >
                  {right}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="page-section tinted">
        <Reveal>
          <div className="section-head">
            <Eyebrow>The faculty</Eyebrow>
            <div>
              <h2 className="section-title">
                Meet the <span className="italic">other practitioners.</span>
              </h2>
            </div>
          </div>
        </Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
          {SURGEON_LIST.filter((x) => x.slug !== slug)
            .slice(0, 4)
            .map((other, i) => (
              <Reveal key={other.slug} delay={i * 60}>
                <a
                  href={`/surgeon-${other.slug}`}
                  style={{ color: 'inherit', display: 'block' }}
                >
                  <div className="surgeon-card" data-surgeon={other.slug}>
                    <div className="surgeon-card-img">
                      <Img
                        src={SURGEON_IMG(other.slug)}
                        fallbackLabel={`DR. ${other.common.toUpperCase()}`}
                        fallbackHue={other.hue}
                        alt=""
                      />
                    </div>
                    <div className="surgeon-card-meta">
                      <h4>
                        {other.title} {other.name}
                      </h4>
                      <Mono>{other.spec}</Mono>
                    </div>
                  </div>
                </a>
              </Reveal>
            ))}
        </div>
      </section>
    </PageShell>
  )
}
