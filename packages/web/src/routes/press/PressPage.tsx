import React from 'react'
import { PageShell } from '@/components/shell/PageShell'
import { CmsExtraBlocks } from '@/components/CmsExtraBlocks'
import { ChapterOpener } from '@/components/primitives/ChapterOpener'
import { Reveal } from '@/components/primitives/Reveal'
import { Mono, Eyebrow } from '@/components/primitives/Mono'
import { Btn } from '@/components/primitives/Btn'
import { IMG } from '@/content/seed'
import { useCms } from '@/lib/cms-context'
import { awardsSorted, findPageBySlug, pressSorted } from '@/lib/cms-adapters'
import { mediaUrl } from '@/lib/cms'

export const PressPage: React.FC = () => {
  const cms = useCms()
  const page = cms ? findPageBySlug(cms, 'press') : undefined
  const awards = cms ? awardsSorted(cms) : []
  const press = cms ? pressSorted(cms) : []

  const formatPressDate = (iso?: string): string => {
    if (!iso) return ''
    const d = new Date(iso)
    if (isNaN(d.getTime())) return ''
    return d.toLocaleDateString('en-AU', { month: 'long', year: 'numeric', timeZone: 'UTC' })
  }

  const chapter = page?.tagline || 'Chapter IX — Accreditations & Press'
  const titleA = page?.chapterTitle?.a || 'Held to the'
  const titleB = page?.chapterTitle?.b || 'highest standards.'
  const lede =
    page?.lede ||
    "Indonesia's first ACHSI-accredited international hospital, named Medical Tourism Hospital of the Year at the 2026 Healthcare Asia Awards, and quietly reviewed in the publications we read ourselves."
  const heroImage = mediaUrl(page?.heroImage, '') || IMG.clinic

  const accred = page?.accreditationsSection || {}
  const pressSec = page?.pressSection || {}
  const accredEyebrow = accred.eyebrow || 'Accreditations'
  const accredHeading = accred.heading || 'The credentials we hold.'
  const accredLede =
    accred.lede ||
    'We have spent twenty-eight years building these credentials, one at a time, because they are the only thing that actually matters in our line of work.'
  const pressEyebrow = pressSec.eyebrow || 'In the press'
  const pressHeadingPre = pressSec.headingPre || 'Quietly, in '
  const pressHeadingItalic = pressSec.headingItalic || 'good company.'
  const pressLede =
    pressSec.lede ||
    'A small selection from the editorial coverage of the past eighteen months. We do not pitch — but we are happy to talk to journalists who reach us directly.'
  const pressEnquiriesCta = page?.pressEnquiriesCtaLabel || 'Press enquiries'

  return (
    <PageShell activePage="press">
      <ChapterOpener
        chapter={chapter}
        title={[titleA, titleB]}
        lede={lede}
        image={heroImage}
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
            <Eyebrow>{accredEyebrow}</Eyebrow>
            <div>
              <h2 className="section-title">{accredHeading}</h2>
              <p className="section-lede">{accredLede}</p>
            </div>
          </div>
        </Reveal>
        <div className="press-grid">
          {awards.map((a, i) => (
            <Reveal key={a.slug} delay={i * 50}>
              <div
                className="press-item"
                style={{
                  flexDirection: 'column',
                  padding: 32,
                  alignItems: 'flex-start',
                  textAlign: 'left',
                }}
              >
                <Mono style={{ marginBottom: 14 }}>{String(i + 1).padStart(2, '0')}</Mono>
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
                  {a.issuer}
                </p>
                <Mono style={{ color: 'var(--accent-deep)' }}>{a.summary}</Mono>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="page-section tinted">
        <Reveal>
          <div className="section-head">
            <Eyebrow>{pressEyebrow}</Eyebrow>
            <div>
              <h2 className="section-title">
                {pressHeadingPre}
                <span className="italic">{pressHeadingItalic}</span>
              </h2>
              <p className="section-lede">{pressLede}</p>
            </div>
          </div>
        </Reveal>
        <div style={{ borderTop: '1px solid var(--ink-20)' }}>
          {press.map((p, i) => (
            <Reveal key={p.slug} delay={i * 50}>
              <div className="press-row">
                <Mono>{p.publication}</Mono>
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
                <Mono>{formatPressDate(p.publishedDate)}</Mono>
                <span style={{ textAlign: 'right', color: 'var(--ink-60)' }}>→</span>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <div style={{ marginTop: 60, textAlign: 'center' }}>
            <Btn kind="ghost">{pressEnquiriesCta}</Btn>
          </div>
        </Reveal>
      </section>
      <CmsExtraBlocks slug="press" />
    </PageShell>
  )
}
