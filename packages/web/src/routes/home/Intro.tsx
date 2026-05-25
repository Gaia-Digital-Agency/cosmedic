import React from 'react'
import { Reveal } from '@/components/primitives/Reveal'
import { Eyebrow } from '@/components/primitives/Mono'
import { useCms } from '@/lib/cms-context'

export const Intro: React.FC = () => {
  const cms = useCms()
  const g = cms?.homeIntro
  const eyebrow = g?.eyebrow || 'Our Approach'
  const pqBefore = g?.pullQuoteBefore || 'Aesthetic medicine, considered with the same '
  const pqAccent = g?.pullQuoteAccent || 'care '
  const pqAfter = g?.pullQuoteAfter || 'as the island that surrounds it.'
  const col1 =
    g?.col1 ||
    "For almost three decades, BIMC CosMedic has practiced cosmetic surgery the way Bali has practiced hospitality — quietly, with patience, and with deep respect for the person in the chair. We don't promise transformation. We promise consideration: of your face, your body, your time, and the life you intend to return to."
  const col2 =
    g?.col2 ||
    "Our centre sits within Indonesia's most accredited international hospital. Eight ISAPS- and FICS-credentialed specialists — fellowship-trained in Korea, Japan, Singapore and across Indonesia — work alongside a concierge team that handles everything from your arrival at Ngurah Rai to your final follow-up by video."

  return (
    <section className="intro">
      <div className="intro-grid">
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
        </Reveal>
        <div>
          <Reveal delay={120}>
            <p className="pull-quote">
              <span>{pqBefore}</span>
              <span className="italic">{pqAccent}</span>
              <span>{pqAfter}</span>
            </p>
          </Reveal>
          <div className="intro-cols">
            <Reveal delay={240}>
              <p>{col1}</p>
            </Reveal>
            <Reveal delay={340}>
              <p>{col2}</p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
