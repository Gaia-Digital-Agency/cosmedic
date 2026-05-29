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

/* ─── R4 defensive fallbacks ──────────────────────────────────────────── */
/* Verbatim copies of the strings that lived in this file pre-R4. Used  */
/* only when the CMS cache is cold / the template global has no value.  */
/* After the seed runs, the cache supplies the same strings — render    */
/* stays byte-identical (Rule 3 / no-data-loss).                        */
const TFB = {
  heroLeadLabel: 'Lead Surgeon',
  heroSpecialistLabel: 'Specialist',
  heroCtaConsultLabel: 'Request a consultation',
  heroCtaTreatmentsLabelFallback: 'Procedures',
  breadcrumbHomeLabel: 'BIMC CosMedic',
  breadcrumbSurgeonsLabel: 'Experts',
  statLabelYears: 'Years in practice',
  statLabelDistinction: 'Distinction',
  statLabelSpecialty: 'Specialty',
  biographyEyebrow: 'Biography',
  sidebarLabelSpecialism: 'Specialism',
  sidebarLabelCredentials: 'Credentials',
  sidebarLabelLanguages: 'Languages',
  sidebarLabelAvailability: 'Availability',
  languagesFallback: 'English · Bahasa Indonesia',
  availabilityFallback: 'Mon & Thu in person · weekday mornings by video',
  secondaryBioParagraph:
    'Patients often describe {title} {common} as quiet, deeply patient, and frank — comfortable with saying "no" when "yes" would be the easier answer. We hold this very highly.',
  specialtyEyebrow: 'Specialty areas',
  specialtyHeadingTemplate: 'What {title} {common} {italic}does best.{/italic}',
  trainingEyebrow: 'Training & credentials',
  trainingRowLabels: ['Medical Degree', 'Specialty Training', 'Suffix', 'Practice', 'Memberships'],
  trainingRowRights: ['MBBS / MD', 'Board credential', 'Active', 'Active member'],
  facultyEyebrow: 'The faculty',
  facultyHeading: { pre: 'Meet the ', italic: 'other practitioners.', post: '' },
}

/** Simple template substitution. Replaces every {key} in `tpl` with `vars[key]`. */
function fillTemplate(tpl: string, vars: Record<string, string>): string {
  return tpl.replace(/\{([a-zA-Z_]+)\}/g, (_, k: string) => (k in vars ? vars[k] : `{${k}}`))
}

/**
 * Render a template like `What {title} {common} {italic}does best.{/italic}`
 * as ReactNode, wrapping the italic section in a <span className="italic">.
 * Supports exactly one {italic}…{/italic} pair (matches the design pattern).
 */
function renderItalicTemplate(tpl: string, vars: Record<string, string>): React.ReactNode {
  const filled = fillTemplate(tpl, vars)
  const open = '{italic}'
  const close = '{/italic}'
  const i = filled.indexOf(open)
  const j = filled.indexOf(close)
  if (i < 0 || j < 0 || j < i) {
    // No italic markers — render as plain string.
    return filled
  }
  const pre = filled.slice(0, i)
  const mid = filled.slice(i + open.length, j)
  const post = filled.slice(j + close.length)
  return (
    <>
      {pre}
      <span className="italic">{mid}</span>
      {post}
    </>
  )
}

type Props = { slug: string }

export const SurgeonDetail: React.FC<Props> = ({ slug }) => {
  const s = SURGEON_LIST.find((x) => x.slug === slug)
  if (!s) return null

  const cms = useCms()
  const t = cms?.surgeonDetailTemplate
  // Pull the raw CMS Surgeon record so we can render fields that aren't
  // exposed via the seed proxy (availabilitySchedule, languages).
  const cmsSurgeon = cms?.surgeons.find((x) => x.slug === slug)
  const schedule = cmsSurgeon?.availabilitySchedule || []
  const languages = (cmsSurgeon?.languages || []).map((l) => l.code).filter(Boolean)

  const relSlug = s.group === 'Plastic Surgery' ? 'surgical' : 'non-surgical'
  const relTreatment = TREATMENT_LIST.find((t2) => t2.slug === relSlug)
  const imgLabel = `DR. ${s.common.toUpperCase()}`
  const nameWords = s.name.split(' ')
  const lastWord = nameWords[nameWords.length - 1]
  const restName = nameWords.slice(0, -1).join(' ')

  // Per-doctor template substitutions for the bio + specialty heading.
  const vars = { title: s.title, common: s.common }

  // Training rows. Labels (5) come from the template; row 0 mid + row 1 mid
  // are per-doctor (s.train + s.group); rows 2-4 mid use s.suffix / clinic
  // name / membership-conditional respectively. Right column: rows 0/2/3/4
  // come from template; row 1 right is the per-doctor `s.cred`.
  const labels = (t?.trainingRowLabels?.length ? t.trainingRowLabels.map((r) => r.value) : TFB.trainingRowLabels)
  const rights = (t?.trainingRowRights?.length ? t.trainingRowRights.map((r) => r.value) : TFB.trainingRowRights)
  const practiceMid =
    t?.trainingRowPracticeMid && t.trainingRowPracticeMid.trim().length > 0
      ? t.trainingRowPracticeMid
      : 'BIMC CosMedic Centre, Bali'
  const trainingRows: Array<[string, string, string]> = [
    [labels[0] || TFB.trainingRowLabels[0], s.train.split(' · ')[0], rights[0] || TFB.trainingRowRights[0]],
    [labels[1] || TFB.trainingRowLabels[1], s.group, s.cred],
    [labels[2] || TFB.trainingRowLabels[2], s.suffix, rights[1] || TFB.trainingRowRights[1]],
    [labels[3] || TFB.trainingRowLabels[3], practiceMid, rights[2] || TFB.trainingRowRights[2]],
    [
      labels[4] || TFB.trainingRowLabels[4],
      s.cred.includes('ISAPS') ? 'ISAPS · IPRAS' : 'National Society · International courses',
      rights[3] || TFB.trainingRowRights[3],
    ],
  ]

  const facultyHeading = t?.facultyHeading ?? TFB.facultyHeading

  return (
    <PageShell activePage={`surgeon-${slug}`}>
      <section className="surgeon-hero">
        <div className="surgeon-hero-img" data-surgeon={s.slug}>
          <Img
            media={s.portrait}
            src={SURGEON_IMG(slug)}
            fallbackLabel={imgLabel}
            fallbackHue={s.hue}
            alt=""
            loading="eager"
            sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 700px"
          />
        </div>
        <div className="surgeon-hero-body">
          <Reveal>
            <Eyebrow>
              {s.lead ? (t?.heroLeadLabel || TFB.heroLeadLabel) : (t?.heroSpecialistLabel || TFB.heroSpecialistLabel)} · {s.group}
            </Eyebrow>
            <h1 className="surgeon-hero-name">
              <span>
                {restName}
              </span>
              <span className="italic">{lastWord}</span>
            </h1>
            <p className="surgeon-cred">{s.cred}</p>
          </Reveal>
          <Reveal delay={120}>
            <div className="surgeon-hero-ctas">
              <Btn kind="primary" as="a" href="/contact">
                {t?.heroCtaConsultLabel || TFB.heroCtaConsultLabel}
              </Btn>
              <Btn kind="ghost" as="a" href={`/procedures/${relSlug}`}>
                {relTreatment?.t || (t?.heroCtaTreatmentsLabelFallback || TFB.heroCtaTreatmentsLabelFallback)}
              </Btn>
            </div>
          </Reveal>
        </div>
      </section>

      <nav className="page-breadcrumb page-breadcrumb--cream" aria-label="Breadcrumb">
        <a href="/">{t?.breadcrumbHomeLabel || TFB.breadcrumbHomeLabel}</a>
        <span className="sep">/</span>
        <a href="/experts">{t?.breadcrumbSurgeonsLabel || TFB.breadcrumbSurgeonsLabel}</a>
        <span className="sep">/</span>
        <span>Dr. {s.common}</span>
      </nav>

      <div className="stats-row">
        <Reveal>
          <div className="stat-block">
            <span className="stat-num">{s.years}</span>
            <span className="stat-label">{t?.statLabelYears || TFB.statLabelYears}</span>
          </div>
        </Reveal>
        <Reveal delay={80}>
          <div className="stat-block">
            <span className="stat-num italic">{s.proc}</span>
            <span className="stat-label">{t?.statLabelDistinction || TFB.statLabelDistinction}</span>
          </div>
        </Reveal>
        <Reveal delay={240}>
          <div className="stat-block">
            <span className="stat-num italic">{s.spec_areas[0]}</span>
            <span className="stat-label">{t?.statLabelSpecialty || TFB.statLabelSpecialty}</span>
          </div>
        </Reveal>
      </div>

      <section className="page-section">
        <div className="surgeon-bio-layout">
          <aside className="surgeon-bio-aside">
            <Reveal>
              <Eyebrow>{t?.biographyEyebrow || TFB.biographyEyebrow}</Eyebrow>
            </Reveal>
            <Reveal delay={80}>
              <dl className="surgeon-bio-facts">
                <div>
                  <dt>
                    <Mono>{t?.sidebarLabelSpecialism || TFB.sidebarLabelSpecialism}</Mono>
                  </dt>
                  <dd>{s.group}</dd>
                </div>
                <div>
                  <dt>
                    <Mono>{t?.sidebarLabelCredentials || TFB.sidebarLabelCredentials}</Mono>
                  </dt>
                  <dd>{s.cred}</dd>
                </div>
                <div>
                  <dt>
                    <Mono>{t?.sidebarLabelLanguages || TFB.sidebarLabelLanguages}</Mono>
                  </dt>
                  <dd>
                    {languages.length > 0
                      ? languages.map((c) => c.toUpperCase()).join(' · ')
                      : (t?.languagesFallback || TFB.languagesFallback)}
                  </dd>
                </div>
                <div>
                  <dt>
                    <Mono>{t?.sidebarLabelAvailability || TFB.sidebarLabelAvailability}</Mono>
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
                      (t?.availabilityFallback || TFB.availabilityFallback)
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
                {fillTemplate(t?.secondaryBioParagraph || TFB.secondaryBioParagraph, vars)}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="page-section tinted">
        <Reveal>
          <Eyebrow>{t?.specialtyEyebrow || TFB.specialtyEyebrow}</Eyebrow>
        </Reveal>
        <Reveal delay={120}>
          <h2 className="section-title" style={{ marginTop: 16, marginBottom: 60 }}>
            {renderItalicTemplate(t?.specialtyHeadingTemplate || TFB.specialtyHeadingTemplate, vars)}
          </h2>
        </Reveal>
        <div className="surgeon-specialty-grid">
          {s.spec_areas.map((area, i) => (
            <Reveal key={i} delay={i * 80}>
              <div className="surgeon-specialty-card">
                <Mono>0{i + 1}</Mono>
                <h4>{area}</h4>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="page-section">
        <Reveal>
          <Eyebrow>{t?.trainingEyebrow || TFB.trainingEyebrow}</Eyebrow>
        </Reveal>
        <div style={{ marginTop: 40, borderTop: '1px solid var(--ink-20)' }}>
          {trainingRows.map(([h, mid, right], i) => (
            <Reveal key={i} delay={i * 50}>
              <div className="surgeon-credentials-row">
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
            <Eyebrow>{t?.facultyEyebrow || TFB.facultyEyebrow}</Eyebrow>
            <div>
              <h2 className="section-title">
                {facultyHeading.pre ?? TFB.facultyHeading.pre}
                <span className="italic">{facultyHeading.italic ?? TFB.facultyHeading.italic}</span>
                {facultyHeading.post ?? TFB.facultyHeading.post}
              </h2>
            </div>
          </div>
        </Reveal>
        <div className="surgeon-faculty-grid">
          {SURGEON_LIST.filter((x) => x.slug !== slug)
            .slice(0, 4)
            .map((other, i) => (
              <Reveal key={other.slug} delay={i * 60}>
                <a
                  href={`/experts/${other.slug}`}
                  style={{ color: 'inherit', display: 'block' }}
                >
                  <div className="surgeon-card" data-surgeon={other.slug}>
                    <div className="surgeon-card-img">
                      <Img
                        media={other.portrait}
                        src={SURGEON_IMG(other.slug)}
                        fallbackLabel={`DR. ${other.common.toUpperCase()}`}
                        fallbackHue={other.hue}
                        alt=""
                        sizes="(max-width: 700px) 50vw, 25vw"
                      />
                    </div>
                    <div className="surgeon-card-meta">
                      <h4>
                        {other.name}
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
