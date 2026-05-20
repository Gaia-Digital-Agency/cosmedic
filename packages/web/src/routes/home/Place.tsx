import React from 'react'
import { Reveal } from '@/components/primitives/Reveal'
import { Img } from '@/components/primitives/Img'
import { Mono, Eyebrow } from '@/components/primitives/Mono'
import { Btn } from '@/components/primitives/Btn'
import { IMG } from '@/content/seed'

const ROWS: [string, string][] = [
  ['A.', 'Private recovery villas in Nusa Dua & Ubud'],
  ['B.', 'Daily nursing visits, dietitian on call'],
  ['C.', 'Drivers, security, and concierge — included'],
  ['D.', 'A short walk to the BIMC hospital'],
]

export const Place: React.FC = () => (
  <section className="place">
    <div className="place-grid">
      <Reveal>
        <div className="place-image">
          <Img src={IMG.bali} fallbackLabel="BALI · NUSA DUA" fallbackHue={4} alt="" />
        </div>
      </Reveal>
      <Reveal delay={140}>
        <div className="place-body">
          <Eyebrow>Recovery in Bali</Eyebrow>
          <h2 className="section-title">
            <span>Recover</span>
            <br />
            <span className="italic">in paradise.</span>
          </h2>
          <p>
            Nusa Dua sits on the southernmost reach of Bali — quiet beaches, soft afternoons, and
            the kind of warm, careful hospitality that has made the island synonymous with rest. We
            work with a small portfolio of villas and resorts, hand-selected for privacy and
            post-operative comfort.
          </p>
          <div className="place-list">
            {ROWS.map(([k, t], i) => (
              <div key={i} className="place-row">
                <Mono>{k}</Mono>
                <span>{t}</span>
              </div>
            ))}
          </div>
          <Btn kind="ghost" as="a" href="/recovery-stays">
            View recovery stays
          </Btn>
        </div>
      </Reveal>
    </div>
  </section>
)
