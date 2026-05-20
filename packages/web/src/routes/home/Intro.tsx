import React from 'react'
import { Reveal } from '@/components/primitives/Reveal'
import { Eyebrow } from '@/components/primitives/Mono'

export const Intro: React.FC = () => (
  <section className="intro">
    <div className="intro-grid">
      <Reveal>
        <Eyebrow>Our Approach</Eyebrow>
      </Reveal>
      <div>
        <Reveal delay={120}>
          <p className="pull-quote">
            <span>Aesthetic medicine, considered with the same </span>
            <span className="italic">care </span>
            <span>as the island that surrounds it.</span>
          </p>
        </Reveal>
        <div className="intro-cols">
          <Reveal delay={240}>
            <p>
              For almost three decades, BIMC CosMedic has practiced cosmetic surgery the way Bali
              has practiced hospitality — quietly, with patience, and with deep respect for the
              person in the chair. We don't promise transformation. We promise consideration: of
              your face, your body, your time, and the life you intend to return to.
            </p>
          </Reveal>
          <Reveal delay={340}>
            <p>
              Our centre sits within Indonesia's most accredited international hospital. Eight
              ISAPS- and FICS-credentialed specialists — fellowship-trained in Korea, Japan,
              Singapore and across Indonesia — work alongside a concierge team that handles
              everything from your arrival at Ngurah Rai to your final follow-up by video.
            </p>
          </Reveal>
        </div>
      </div>
    </div>
  </section>
)
