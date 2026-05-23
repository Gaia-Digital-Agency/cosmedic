import React from 'react'
import { Reveal } from '@/components/primitives/Reveal'
import { Img } from '@/components/primitives/Img'
import { Mono, Eyebrow } from '@/components/primitives/Mono'
import { SURGEON_LIST, SURGEON_IMG } from '@/content/seed'

const BULLETS: [string, string, string][] = [
  ['I.', 'Twenty minutes', 'Long enough to listen, short enough not to overstay.'],
  ['II.', 'A coordinator, not a surgeon', "We'll triage your enquiry and brief the right specialist."],
  ['III.', 'Zoom or Google Meet', 'Whichever your country prefers. Link emailed on booking.'],
  ['IV.', 'Free, and no obligation', 'No card required. We do not market afterwards.'],
]

export const WhatToExpect: React.FC = () => (
  <Reveal>
    <div>
      <Eyebrow>What to expect</Eyebrow>
      <h2 className="section-title" style={{ marginTop: 16 }}>
        A quiet conversation, <span className="italic">no script.</span>
      </h2>
      <ul
        style={{
          listStyle: 'none',
          padding: 0,
          margin: '32px 0 0',
          display: 'flex',
          flexDirection: 'column',
          gap: 18,
          borderTop: '1px solid var(--ink-20)',
        }}
      >
        {BULLETS.map(([k, t, d], i) => (
          <li
            key={i}
            style={{
              paddingTop: 18,
              borderBottom: '1px solid var(--ink-20)',
              paddingBottom: 18,
            }}
          >
            <Mono>{k}</Mono>
            <h4
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 22,
                fontWeight: 400,
                margin: '8px 0 6px',
                letterSpacing: '-0.01em',
              }}
            >
              {t}
            </h4>
            <p
              style={{
                margin: 0,
                fontSize: 15,
                color: 'var(--ink-60)',
                lineHeight: 1.55,
              }}
            >
              {d}
            </p>
          </li>
        ))}
      </ul>

      <div style={{ marginTop: 36 }}>
        <Mono>Coordinated by</Mono>
        <div style={{ display: 'flex', gap: 12, marginTop: 14, alignItems: 'center' }}>
          {SURGEON_LIST.slice(4, 7).map((s) => (
            <div
              key={s.slug}
              style={{
                width: 48,
                height: 48,
                borderRadius: '50%',
                overflow: 'hidden',
                background: 'var(--cream)',
              }}
            >
              <Img
                src={SURGEON_IMG(s.slug)}
                fallbackLabel={s.common.toUpperCase()}
                fallbackHue={s.hue}
                alt=""
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          ))}
          <span
            style={{
              fontFamily: 'var(--font-serif)',
              fontStyle: 'italic',
              color: 'var(--ink-60)',
              fontSize: 15,
              marginLeft: 4,
            }}
          >
            Three patient coordinators, English & Bahasa.
          </span>
        </div>
      </div>
    </div>
  </Reveal>
)
