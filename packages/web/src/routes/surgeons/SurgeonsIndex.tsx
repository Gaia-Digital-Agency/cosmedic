import React from 'react'
import { PageShell } from '@/components/shell/PageShell'
import { ChapterOpener } from '@/components/primitives/ChapterOpener'
import { Reveal } from '@/components/primitives/Reveal'
import { Img } from '@/components/primitives/Img'
import { Mono, Eyebrow } from '@/components/primitives/Mono'
import { Btn } from '@/components/primitives/Btn'
import { SURGEON_LIST, SURGEON_IMG, IMG, type Surgeon } from '@/content/seed'

const SurgeonCard: React.FC<{ s: Surgeon; idx: number }> = ({ s, idx }) => (
  <Reveal delay={idx * 60} y={20}>
    <a href={`/surgeons/${s.slug}`} style={{ color: 'inherit', display: 'block' }}>
      <div className="surgeon-card" data-surgeon={s.slug}>
        <div className="surgeon-card-img" style={{ aspectRatio: '4 / 5' }}>
          <Img
            src={SURGEON_IMG(s.slug)}
            fallbackLabel={`DR. ${s.common.toUpperCase()}`}
            fallbackHue={s.hue}
            alt=""
          />
        </div>
        <div className="surgeon-card-meta" style={{ paddingTop: 20 }}>
          <h4 style={{ fontSize: 22, marginTop: 6 }}>
            {s.title} {s.name}
          </h4>
          {s.suffix && (
            <span className="surgeon-train" style={{ fontSize: 14, marginTop: 2 }}>
              {s.suffix}
            </span>
          )}
          <span
            className="surgeon-train"
            style={{ fontSize: 14, marginTop: 6, color: 'var(--ink-80)' }}
          >
            {s.spec}
          </span>
          <span className="mono" style={{ marginTop: 12, color: 'var(--accent-deep)' }}>
            {s.proc}
          </span>
        </div>
      </div>
    </a>
  </Reveal>
)

export const SurgeonsIndex: React.FC = () => {
  const PLASTIC = SURGEON_LIST.filter((s) => s.group === 'Plastic Surgery')
  const AESTHETIC = SURGEON_LIST.filter((s) => s.group === 'Aesthetic Medicine')
  const lead = SURGEON_LIST[0]
  // Defensive: during a CMS cache cold-start the lazy proxy can briefly
  // hand back an empty array. Return a minimal placeholder instead of
  // crashing the SSR render — the next request (after cache warm) renders
  // the full page.
  if (!lead) {
    return (
      <PageShell activePage="surgeons">
        <ChapterOpener
          chapter="Chapter III — The Practitioners"
          title={['Hands you', 'can trust.']}
          lede="Loading surgeon roster…"
          image={IMG.clinic}
          imageHue={2}
          imageLabel="THE PRACTITIONERS"
          breadcrumbs={[{ label: 'BIMC CosMedic', href: '/' }, { label: 'Surgeons' }]}
        />
      </PageShell>
    )
  }
  return (
  <PageShell activePage="surgeons">
    <ChapterOpener
      chapter="Chapter III — The Practitioners"
      title={['Hands you', 'can trust.']}
      lede="Eight specialists across plastic surgery and aesthetic medicine — ISAPS members, fellowship-trained in Korea, Japan, and Singapore, and rooted in Bali."
      image={IMG.clinic}
      imageHue={2}
      imageLabel="THE PRACTITIONERS"
      breadcrumbs={[{ label: 'BIMC CosMedic', href: '/' }, { label: 'Surgeons' }]}
    />

    <section id="surgical" className="page-section" style={{ scrollMarginTop: 100 }}>
      <Reveal>
        <Eyebrow>Lead Plastic Surgeon</Eyebrow>
      </Reveal>
      <div
        className="surgeons-feature"
        style={{ marginTop: 40, paddingBottom: 0, borderBottom: 'none' }}
      >
        <Reveal delay={120}>
          <div className="surgeons-feature-img" data-surgeon={lead.slug}>
            <Img
              src={SURGEON_IMG(lead.slug)}
              fallbackLabel={`DR. ${lead.common.toUpperCase()}`}
              fallbackHue={lead.hue}
              alt=""
            />
          </div>
        </Reveal>
        <Reveal delay={240} style={{ paddingTop: 32 }}>
          <Mono>Lead Surgeon</Mono>
          <h2 className="surgeon-name">
            <span>
              {lead.title} {lead.name.split(' ').slice(0, -1).join(' ')}
            </span>
            <br />
            <span className="italic">{lead.name.split(' ').slice(-1)[0]}</span>
          </h2>
          <p className="surgeon-credentials">{lead.cred}</p>
          <p className="surgeon-body">{lead.bio}</p>
          <div className="surgeon-stats">
            <div>
              <Mono>Trained</Mono>
              <span>{lead.train}</span>
            </div>
            <div>
              <Mono>Specialty</Mono>
              <span>{lead.spec_areas[0]}</span>
            </div>
            <div>
              <Mono>Distinction</Mono>
              <span>{lead.proc}</span>
            </div>
          </div>
          <Btn kind="ghost" as="a" href={`/surgeons/${lead.slug}`}>
            Read the full profile
          </Btn>
        </Reveal>
      </div>
    </section>

    <section className="page-section tinted">
      <Reveal>
        <div className="section-head">
          <Eyebrow>Plastic Surgery</Eyebrow>
          <div>
            <h2 className="section-title">
              <span className="italic">Reconstructive</span> & aesthetic.
            </h2>
            <p className="section-lede">
              Our plastic surgery team holds combined fellowships from Korea, Japan, Singapore, and
              Indonesia — and ISAPS, FICS, and craniomaxillofacial subspecialty credentials.
            </p>
          </div>
        </div>
      </Reveal>
      <div className="surgeons-section-grid">
        {PLASTIC.slice(1).map((s, i) => (
          <SurgeonCard key={s.slug} s={s} idx={i + 1} />
        ))}
      </div>
    </section>

    <section id="aesthetic" className="page-section" style={{ scrollMarginTop: 100 }}>
      <Reveal>
        <div className="section-head">
          <Eyebrow>Aesthetic Medicine</Eyebrow>
          <div>
            <h2 className="section-title">
              <span className="italic">Quiet</span> non-surgical.
            </h2>
            <p className="section-lede">
              Anti-aging, dermatology, venereology and aesthetics — for the considered, everyday
              refinements between bigger decisions.
            </p>
          </div>
        </div>
      </Reveal>
      <div className="surgeons-section-grid-4">
        {AESTHETIC.map((s, i) => (
          <SurgeonCard key={s.slug} s={s} idx={PLASTIC.length + i} />
        ))}
      </div>
    </section>
  </PageShell>
  )
}
