import React from 'react'
import { Reveal } from '@/components/primitives/Reveal'
import { Img } from '@/components/primitives/Img'
import { Mono, Eyebrow } from '@/components/primitives/Mono'
import { Btn } from '@/components/primitives/Btn'
import { STORY_PORTRAITS } from '@/content/seed'

const STORIES = [
  {
    q: 'I came expecting a procedure. I left having had something closer to a retreat — handled, cared for, and quietly returned to myself.',
    n: 'Sarah K.',
    c: 'Sydney, Australia',
    p: 'Rhinoplasty · 2025',
    hue: 1,
    idx: 0,
    verified: 'Google review · ★★★★★',
  },
  {
    q: 'dr. Suka talked me out of two of the three things I\'d asked for. The result is the most natural I\'ve ever looked. I\'m grateful.',
    n: 'Margaux D.',
    c: 'Paris, France',
    p: 'Mid-face · 2024',
    hue: 3,
    idx: 1,
    verified: 'Trustpilot · ★★★★★',
  },
  {
    q: 'The villa, the nursing, the follow-ups — it felt less like medical tourism and more like being looked after by family.',
    n: 'James W.',
    c: 'Melbourne, Australia',
    p: 'Hair restoration · 2025',
    hue: 5,
    idx: 2,
    verified: 'Verified video review',
  },
]

export const Stories: React.FC = () => (
  <section className="stories" id="stories">
    <Reveal>
      <Eyebrow>Verified Patient Stories</Eyebrow>
    </Reveal>
    <Reveal delay={120}>
      <h2 className="section-title section-title-center">
        <span className="italic">Stories,</span> not slogans.
      </h2>
    </Reveal>
    <Reveal delay={200}>
      <p className="section-lede" style={{ margin: '22px auto 0', textAlign: 'center' }}>
        Verified reviews from international patients. Video testimonials and Google reviews on our{' '}
        <a
          href="/results#stories"
          style={{ color: 'var(--accent-deep)', textDecoration: 'underline' }}
        >
          full stories page
        </a>
        .
      </p>
    </Reveal>
    <div className="stories-grid">
      {STORIES.map((s, i) => (
        <Reveal key={i} delay={i * 100} y={32}>
          <figure className="story-card">
            <blockquote>
              <span className="quote-mark">"</span>
              {s.q}
            </blockquote>
            <figcaption>
              <Img
                src={STORY_PORTRAITS[s.idx]}
                fallbackLabel={s.n.toUpperCase()}
                fallbackHue={s.hue}
                alt=""
              />
              <div>
                <span className="story-name">{s.n}</span>
                <span className="story-city">{s.c}</span>
                <Mono style={{ marginTop: 4 }}>{s.p}</Mono>
                <Mono style={{ marginTop: 4, color: 'var(--accent-deep)' }}>{s.verified}</Mono>
              </div>
            </figcaption>
          </figure>
        </Reveal>
      ))}
    </div>
    <Reveal>
      <div style={{ textAlign: 'center', marginTop: 60 }}>
        <Btn kind="ghost" as="a" href="/results#stories">
          Read more stories
        </Btn>
      </div>
    </Reveal>
  </section>
)
