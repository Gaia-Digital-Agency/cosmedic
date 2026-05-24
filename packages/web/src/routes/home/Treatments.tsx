import React from 'react'
import { Reveal } from '@/components/primitives/Reveal'
import { Img } from '@/components/primitives/Img'
import { Mono, Eyebrow } from '@/components/primitives/Mono'
import { TREATMENT_LIST, TREATMENT_IMG } from '@/content/seed'
import { useCms } from '@/lib/cms-context'
import { findPageBySlug } from '@/lib/cms-adapters'

export const Treatments: React.FC = () => {
  const cms = useCms()
  const block = (cms ? findPageBySlug(cms, 'home') : undefined)?.treatmentsBlock
  const eyebrow = block?.eyebrow || 'Treatments'
  const headingPart1 = block?.headingPart1 || 'Six disciplines,'
  const headingPart2 = block?.headingPart2 || 'one sanctuary.'
  const lede =
    block?.lede ||
    'A complete repertoire under one roof, sequenced into a single journey. Treatments may be combined; recovery is always private.'

  return (
  <section className="treatments" id="treatments">
    <div className="treatments-head">
      <Reveal>
        <Eyebrow>{eyebrow}</Eyebrow>
      </Reveal>
      <Reveal delay={120}>
        <h2 className="section-title">
          <span>{headingPart1}</span>
          <br />
          <span className="italic">{headingPart2}</span>
        </h2>
      </Reveal>
      <Reveal delay={220}>
        <p className="section-lede">{lede}</p>
      </Reveal>
    </div>
    <div className="treatments-grid">
      {TREATMENT_LIST.map((t, i) => (
        <Reveal key={t.slug} delay={i * 80} y={32}>
          <a href={`/treatments/${t.slug}`} style={{ display: 'block', color: 'inherit' }}>
            <article className="treatment-card">
              <div className="treatment-image">
                <Img
                  media={t.heroImage}
                  src={TREATMENT_IMG(t.slug)}
                  fallbackLabel={t.t.toUpperCase()}
                  fallbackHue={t.hue}
                  alt={`${t.t} discipline imagery`}
                  sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw"
                />
                <div className="treatment-num">
                  <Mono>{t.n}</Mono>
                </div>
              </div>
              <div className="treatment-body">
                <h3 className="treatment-title">{t.t}</h3>
                <p className="treatment-sub">{t.sub}</p>
                <p className="treatment-text">{t.body}</p>
                <div className="treatment-foot">
                  <span className="treatment-link">
                    Read more <span>→</span>
                  </span>
                </div>
              </div>
            </article>
          </a>
        </Reveal>
      ))}
    </div>
  </section>
  )
}
