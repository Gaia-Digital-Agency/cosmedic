import React from 'react'
import { Reveal } from '@/components/primitives/Reveal'
import { Mono } from '@/components/primitives/Mono'
import { Btn } from '@/components/primitives/Btn'
import type { Day } from './data'

type Props = {
  name: string
  email: string
  selectedDay: Day | null
  selectedTime: string | null
  tz: string
}

export const BookingConfirmation: React.FC<Props> = ({ name, email, selectedDay, selectedTime, tz }) => (
  <Reveal>
    <div
      style={{
        textAlign: 'center',
        padding: '60px 24px',
        background: 'var(--paper-warm)',
        border: '1px solid var(--ink-20)',
        borderLeft: '3px solid var(--accent)',
      }}
    >
      <Mono style={{ color: 'var(--accent-deep)' }}>✓ Booked</Mono>
      <h2 className="section-title" style={{ marginTop: 18 }}>
        Held for <span className="italic">{name.split(' ')[0] || 'you'}.</span>
      </h2>
      <p
        style={{
          fontSize: 17,
          color: 'var(--ink-80)',
          maxWidth: 540,
          margin: '20px auto 0',
          lineHeight: 1.6,
        }}
      >
        We've reserved{' '}
        <strong>
          {selectedDay?.dow}, {selectedDay?.mon} {selectedDay?.day}
        </strong>{' '}
        at <strong>{selectedTime}</strong> ({tz}). A calendar invitation and a Zoom link are on
        their way to <em>{email}</em>. The Bali Recovery Guide and a brief intro video from your
        coordinator are attached.
      </p>
      <div
        style={{
          marginTop: 36,
          display: 'flex',
          gap: 12,
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}
      >
        <Btn kind="ghost" as="a" href="/">
          Return home
        </Btn>
        <Btn kind="ghost" as="a" href="/journey">
          Read the journey
        </Btn>
      </div>
    </div>
  </Reveal>
)
