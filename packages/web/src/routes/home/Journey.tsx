import React from 'react'
import { Reveal } from '@/components/primitives/Reveal'
import { Eyebrow } from '@/components/primitives/Mono'
import { Btn } from '@/components/primitives/Btn'
import { useCms } from '@/lib/cms-context'

const STEPS: [string, string, string][] = [
  ['01', 'Consult', 'A private video call with a surgeon, anywhere in the world.'],
  ['02', 'Plan', 'A treatment plan, a recovery plan, and a stay — in one envelope.'],
  ['03', 'Arrive', 'Met at Ngurah Rai. Driven, by us, to the clinic or to your villa.'],
  ['04', 'Procedure', 'Performed in our ACHSI-accredited theatres at BIMC Nusa Dua.'],
  ['05', 'Recover', 'Daily nursing visits in a private villa, then twelve months of follow-up.'],
]

export const Journey: React.FC = () => {
  const cms = useCms()
  const g = cms?.homeJourneyView
  const eyebrow = g?.eyebrow || 'Your Journey'
  const headingPart1 = g?.headingPart1 || 'From enquiry to'
  const headingAccent = g?.headingAccent || 'homecoming.'
  const ctaLabel = g?.ctaLabel || 'Read the full journey'
  const ctaHref = g?.ctaHref || '/journey'

  return (
    <section className="journey" id="journey">
      <div className="journey-head">
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
        </Reveal>
        <Reveal delay={120}>
          <h2 className="section-title">
            <span>{headingPart1}</span> <span className="italic">{headingAccent}</span>
          </h2>
        </Reveal>
      </div>
      <div className="journey-steps">
        {STEPS.map(([n, t, d], i) => (
          <Reveal key={i} delay={i * 90}>
            <div className="journey-step">
              <div className="journey-num">
                <span>{n}</span>
                {i < STEPS.length - 1 && <span className="journey-arrow">→</span>}
              </div>
              <h4>{t}</h4>
              <p>{d}</p>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal>
        <div style={{ textAlign: 'center', marginTop: 60 }}>
          <Btn kind="ghost" as="a" href={ctaHref}>
            {ctaLabel}
          </Btn>
        </div>
      </Reveal>
    </section>
  )
}
