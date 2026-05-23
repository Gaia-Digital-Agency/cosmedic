import React from 'react'
import { Reveal } from '@/components/primitives/Reveal'
import { Mono } from '@/components/primitives/Mono'
import { SLOT_TIMES, TIMEZONES, TOPICS, type Day } from './data'

type Props = {
  days: Day[]
  selectedDay: Day | null
  setSelectedDay: (d: Day | null) => void
  selectedTime: string | null
  setSelectedTime: (t: string | null) => void
  tz: string
  setTz: (t: string) => void
  topic: string
  setTopic: (t: string) => void
  name: string
  setName: (n: string) => void
  email: string
  setEmail: (e: string) => void
  prefillProc: string
  canSubmit: boolean
  onSubmit: () => void
}

export const BookingForm: React.FC<Props> = (p) => (
  <Reveal delay={120}>
    <div style={{ background: 'var(--paper-warm)', border: '1px solid var(--ink-20)', padding: 36 }}>
      <Mono style={{ color: 'var(--accent-deep)' }}>Step I · Choose a day</Mono>
      <div className="vc-day-picker">
        {p.days.map((d) => (
          <button
            key={d.key}
            type="button"
            disabled={d.isWeekend}
            onClick={() => {
              p.setSelectedDay(d)
              p.setSelectedTime(null)
            }}
            style={{
              padding: '12px 4px',
              border: `1px solid ${p.selectedDay?.key === d.key ? 'var(--accent-deep)' : 'var(--ink-20)'}`,
              background:
                p.selectedDay?.key === d.key
                  ? 'var(--accent-deep)'
                  : d.isWeekend
                    ? 'transparent'
                    : 'var(--paper)',
              color:
                p.selectedDay?.key === d.key
                  ? 'var(--paper)'
                  : d.isWeekend
                    ? 'var(--ink-40)'
                    : 'var(--ink-90)',
              cursor: d.isWeekend ? 'not-allowed' : 'pointer',
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              fontFamily: 'var(--font-mono)',
              fontSize: 10,
              letterSpacing: '0.1em',
            }}
          >
            <span style={{ fontSize: 9, opacity: 0.7, textTransform: 'uppercase' }}>{d.dow}</span>
            <span style={{ fontFamily: 'var(--font-serif)', fontSize: 22, letterSpacing: 0 }}>{d.day}</span>
            <span style={{ fontSize: 9, opacity: 0.7, textTransform: 'uppercase' }}>{d.mon}</span>
          </button>
        ))}
      </div>
      <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 13, color: 'var(--ink-60)', margin: '12px 0 0' }}>
        Weekends by appointment — please WhatsApp the concierge.
      </p>

      <div style={{ marginTop: 28, paddingTop: 24, borderTop: '1px solid var(--ink-20)' }}>
        <Mono style={{ color: 'var(--accent-deep)' }}>Step II · Choose a time</Mono>
        <div style={{ display: 'flex', gap: 10, marginTop: 14, flexWrap: 'wrap' }}>
          {SLOT_TIMES.map((t) => (
            <button
              key={t}
              type="button"
              disabled={!p.selectedDay}
              onClick={() => p.setSelectedTime(t)}
              style={{
                padding: '12px 18px',
                border: `1px solid ${p.selectedTime === t ? 'var(--accent-deep)' : 'var(--ink-20)'}`,
                background: p.selectedTime === t ? 'var(--accent-deep)' : 'var(--paper)',
                color: p.selectedTime === t ? 'var(--paper)' : p.selectedDay ? 'var(--ink-90)' : 'var(--ink-40)',
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                letterSpacing: '0.18em',
                cursor: p.selectedDay ? 'pointer' : 'not-allowed',
              }}
            >
              {t}
            </button>
          ))}
        </div>
        <div style={{ marginTop: 16 }}>
          <Mono>Time zone</Mono>
          <div style={{ display: 'flex', gap: 8, marginTop: 8, flexWrap: 'wrap' }}>
            {TIMEZONES.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => p.setTz(t)}
                style={{
                  padding: '8px 14px',
                  border: `1px solid ${p.tz === t ? 'var(--accent)' : 'var(--ink-20)'}`,
                  background: p.tz === t ? 'var(--accent-tint)' : 'transparent',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 10,
                  letterSpacing: '0.16em',
                  cursor: 'pointer',
                  color: 'var(--ink-90)',
                }}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ marginTop: 28, paddingTop: 24, borderTop: '1px solid var(--ink-20)' }}>
        <Mono style={{ color: 'var(--accent-deep)' }}>Step III · About you</Mono>
        <div className="contact-hours-grid" style={{ marginTop: 16 }}>
          <label className="field">
            <span className="field-label">Your name</span>
            <input type="text" placeholder="First name" value={p.name} onChange={(e) => p.setName(e.target.value)} required />
          </label>
          <label className="field">
            <span className="field-label">Email</span>
            <input type="email" placeholder="you@email.com" value={p.email} onChange={(e) => p.setEmail(e.target.value)} required />
          </label>
          <label className="field" style={{ gridColumn: '1 / -1' }}>
            <span className="field-label">
              What you'd like to discuss{' '}
              <em style={{ fontStyle: 'italic', color: 'var(--ink-40)', fontSize: 12, marginLeft: 6 }}>optional</em>
            </span>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 8 }}>
              {TOPICS.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => p.setTopic(t)}
                  style={{
                    padding: '8px 14px',
                    border: `1px solid ${p.topic === t ? 'var(--accent)' : 'var(--ink-20)'}`,
                    background: p.topic === t ? 'var(--accent-tint)' : 'transparent',
                    fontFamily: 'var(--font-mono)',
                    fontSize: 10,
                    letterSpacing: '0.16em',
                    cursor: 'pointer',
                    color: 'var(--ink-90)',
                  }}
                >
                  {t}
                </button>
              ))}
            </div>
            {p.prefillProc && (
              <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', color: 'var(--accent-deep)', fontSize: 14, margin: '12px 0 0' }}>
                Prefilled from your last page · <strong>{p.prefillProc}</strong>
              </p>
            )}
          </label>
        </div>
      </div>

      <div
        style={{
          marginTop: 28,
          paddingTop: 24,
          borderTop: '1px solid var(--ink-20)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 24,
        }}
      >
        <p style={{ margin: 0, fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 14, color: 'var(--ink-60)' }}>
          {p.canSubmit && p.selectedDay && p.selectedTime
            ? `${p.selectedDay.dow} ${p.selectedDay.mon} ${p.selectedDay.day} · ${p.selectedTime} · ${p.tz}`
            : 'Choose a day, a time, and tell us your name.'}
        </p>
        <button
          type="button"
          disabled={!p.canSubmit}
          onClick={p.onSubmit}
          className="btn btn-accent"
          style={{ opacity: p.canSubmit ? 1 : 0.4, cursor: p.canSubmit ? 'pointer' : 'not-allowed' }}
        >
          <span>Confirm Booking</span>
          <span className="btn-arrow">→</span>
        </button>
      </div>
    </div>
  </Reveal>
)
