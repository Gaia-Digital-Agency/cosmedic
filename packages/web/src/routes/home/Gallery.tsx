import React from 'react'
import { Reveal } from '@/components/primitives/Reveal'
import { Img } from '@/components/primitives/Img'
import { Mono, Eyebrow } from '@/components/primitives/Mono'
import { Btn } from '@/components/primitives/Btn'
import { BA_PAIRS } from '@/content/seed'

export const Gallery: React.FC = () => (
  <section className="gallery" id="gallery">
    <div className="gallery-head">
      <Reveal>
        <Eyebrow>Before & After Results</Eyebrow>
      </Reveal>
      <Reveal delay={120}>
        <h2 className="section-title">
          <span className="italic">Quietly</span> transformative.
        </h2>
      </Reveal>
      <Reveal delay={220}>
        <p className="section-lede">Three signature results from our facial repertoire.</p>
      </Reveal>
    </div>
    <div className="gallery-grid">
      {BA_PAIRS.map((c, i) => (
        <Reveal key={i} delay={i * 100} y={28}>
          <figure className="ba-card">
            <div className="ba-single">
              <Img
                src={c.image}
                fallbackLabel={`${c.label.toUpperCase()} · ${c.num}`}
                fallbackHue={i * 2}
                alt={`${c.label} — before and after`}
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
          </figure>
        </Reveal>
      ))}
    </div>
    <Reveal>
      <div className="gallery-foot">
        <Btn kind="ghost" as="a" href="/results#results">
          View the full gallery
        </Btn>
      </div>
    </Reveal>
  </section>
)
