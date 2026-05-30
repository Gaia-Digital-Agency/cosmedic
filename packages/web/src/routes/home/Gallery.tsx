import React from 'react'
import { Reveal } from '@/components/primitives/Reveal'
import { Img } from '@/components/primitives/Img'
import { Mono, Eyebrow } from '@/components/primitives/Mono'
import { Btn } from '@/components/primitives/Btn'
import { BA_PAIRS } from '@/content/seed'
import { useCms } from '@/lib/cms-context'

export const Gallery: React.FC = () => {
  const cms = useCms()
  const g = cms?.homeHero?.gallery
  const eyebrow = g?.eyebrow || 'Before & After Results'
  const headingItalic = g?.heading?.a || 'Quietly'
  const headingPart2 = g?.heading?.b || 'transformative.'
  const lede = g?.lede || 'Three signature results from our facial repertoire.'
  const ctaLabel = g?.ctaLabel || 'View the full gallery'
  const ctaHref = g?.ctaHref || '/results#results'

  return (
    <section className="gallery" id="gallery">
      <div className="gallery-head">
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
        </Reveal>
        <Reveal delay={120}>
          <h2 className="section-title">
            <span className="italic">{headingItalic}</span> {headingPart2}
          </h2>
        </Reveal>
        <Reveal delay={220}>
          <p className="section-lede">{lede}</p>
        </Reveal>
      </div>
      <div className="gallery-grid">
        {BA_PAIRS.filter((c) => c.isFeatured !== false).map((c, i) => {
          const alt = c.beforeAlt && c.afterAlt
            ? `${c.beforeAlt} / ${c.afterAlt}`
            : c.beforeAlt || c.afterAlt || `${c.label} — before and after`
          return (
            <Reveal key={i} delay={i * 100} y={28}>
              <figure className="ba-card">
                <div className="ba-single">
                  <Img
                    src={c.image}
                    fallbackLabel={`${c.label.toUpperCase()} · ${c.num}`}
                    fallbackHue={i * 2}
                    alt={alt}
                  />
                  <span className="ba-tag">
                    <Mono>Before</Mono>
                  </span>
                  <span className="ba-tag accent" style={{ left: 'auto', right: 14 }}>
                    <Mono>After</Mono>
                  </span>
                </div>
                <figcaption>
                  <div>
                    <Mono>{c.num}</Mono>
                    <h4>{c.label}</h4>
                  </div>
                  <span className="ba-time">{c.time}</span>
                </figcaption>
                {(c.patientAge != null || c.recoveryDuration) && (
                  <Mono style={{ marginTop: 8, display: 'block', color: 'var(--ink-60)' }}>
                    {c.patientAge != null && <>Age · {c.patientAge}</>}
                    {c.patientAge != null && c.recoveryDuration && ' · '}
                    {c.recoveryDuration && <>Recovery · {c.recoveryDuration}</>}
                  </Mono>
                )}
                {c.surgeonName && (
                  <Mono style={{ marginTop: 8, display: 'block', color: 'var(--ink-60)' }}>
                    Surgeon ·{' '}
                    {c.surgeonSlug ? (
                      <a
                        href={`/experts/${c.surgeonSlug}`}
                        style={{ color: 'var(--accent-deep)', textDecoration: 'underline' }}
                      >
                        {c.surgeonName}
                      </a>
                    ) : (
                      c.surgeonName
                    )}
                  </Mono>
                )}
                {c.description && (
                  <p
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontStyle: 'italic',
                      fontSize: 14,
                      color: 'var(--ink-60)',
                      margin: '8px 0 0',
                      lineHeight: 1.55,
                    }}
                  >
                    {c.description}
                  </p>
                )}
              </figure>
            </Reveal>
          )
        })}
      </div>
      <Reveal>
        <div className="gallery-foot">
          <Btn kind="ghost" as="a" href={ctaHref}>
            {ctaLabel}
          </Btn>
        </div>
      </Reveal>
    </section>
  )
}
