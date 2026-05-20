import React, { useState, useEffect } from 'react'
import { PageShell } from '@/components/shell/PageShell'
import { CmsExtraBlocks } from '@/components/CmsExtraBlocks'
import { ChapterOpener } from '@/components/primitives/ChapterOpener'
import { Reveal } from '@/components/primitives/Reveal'
import { Img } from '@/components/primitives/Img'
import { Mono, Eyebrow } from '@/components/primitives/Mono'
import { Btn } from '@/components/primitives/Btn'
import { SURGEON_LIST, SURGEON_IMG, IMG } from '@/content/seed'

const SLOT_TIMES = ['09:00', '10:30', '13:00', '14:30', '16:00']
const TIMEZONES = ['AEST (Sydney)', 'SGT (Singapore)', 'GMT (London)', 'WIB (Bali)']
const TOPICS = [
  'Surgical · Face',
  'Surgical · Body',
  'Surgical · Breast',
  'Hair Restoration',
  'Non-surgical',
  'Dental',
  'Not sure yet',
]

type Day = { key: string; day: number; mon: string; dow: string; isWeekend: boolean }

function buildDays(): Day[] {
  const out: Day[] = []
  const start = new Date()
  start.setHours(0, 0, 0, 0)
  start.setDate(start.getDate() + 1)
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const dows = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  for (let i = 0; i < 14; i++) {
    const d = new Date(start)
    d.setDate(start.getDate() + i)
    out.push({
      key: d.toISOString().slice(0, 10),
      day: d.getDate(),
      mon: months[d.getMonth()],
      dow: dows[d.getDay()],
      isWeekend: d.getDay() === 0 || d.getDay() === 6,
    })
  }
  return out
}

export const VideoConsultPage: React.FC = () => {
  // Defer client-side state (date/URL) to useEffect to avoid SSR hydration drift
  const [days, setDays] = useState<Day[]>([])
  const [prefillProc, setPrefillProc] = useState('')
  const [selectedDay, setSelectedDay] = useState<Day | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [tz, setTz] = useState(TIMEZONES[0])
  const [topic, setTopic] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    setDays(buildDays())
    const params = new URLSearchParams(window.location.search)
    const proc = params.get('procedure') || ''
    setPrefillProc(proc)
    if (proc) setTopic('Not sure yet')
  }, [])

  const canSubmit = selectedDay && selectedTime && name && email

  return (
    <PageShell activePage="contact" hideCTA>
      <ChapterOpener
        chapter="Chapter VIII — Video Consult"
        title={['Twenty quiet', 'minutes.']}
        lede={
          prefillProc
            ? `A complimentary 20-minute video call about ${prefillProc}. Speak with a coordinator who will brief the right surgeon afterwards. No card required, no obligation.`
            : 'A complimentary 20-minute video call with a patient coordinator. We listen, answer, and brief the right surgeon for you afterwards. No card required, no obligation.'
        }
        image={IMG.reception}
        imageHue={2}
        imageLabel="VIDEO CONSULT"
        breadcrumbs={[
          { label: 'BIMC CosMedic', href: '/' },
          { label: 'Plan Your Journey', href: '/contact' },
          { label: 'Video Consult' },
        ]}
      />

      <section className="page-section">
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          {submitted ? (
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
                  at <strong>{selectedTime}</strong> ({tz}). A calendar invitation and a Zoom link
                  are on their way to <em>{email}</em>. The Bali Recovery Guide and a brief intro
                  video from your coordinator are attached.
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
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1.5fr',
                gap: 64,
                alignItems: 'start',
              }}
            >
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
                    {(
                      [
                        ['I.', 'Twenty minutes', 'Long enough to listen, short enough not to overstay.'],
                        ['II.', 'A coordinator, not a surgeon', "We'll triage your enquiry and brief the right specialist."],
                        ['III.', 'Zoom or Google Meet', 'Whichever your country prefers. Link emailed on booking.'],
                        ['IV.', 'Free, and no obligation', 'No card required. We do not market afterwards.'],
                      ] as [string, string, string][]
                    ).map(([k, t, d], i) => (
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

              <Reveal delay={120}>
                <div
                  style={{
                    background: 'var(--paper-warm)',
                    border: '1px solid var(--ink-20)',
                    padding: 36,
                  }}
                >
                  <Mono style={{ color: 'var(--accent-deep)' }}>Step I · Choose a day</Mono>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(7, 1fr)',
                      gap: 8,
                      marginTop: 16,
                    }}
                  >
                    {days.map((d) => (
                      <button
                        key={d.key}
                        type="button"
                        disabled={d.isWeekend}
                        onClick={() => {
                          setSelectedDay(d)
                          setSelectedTime(null)
                        }}
                        style={{
                          padding: '12px 4px',
                          border: `1px solid ${
                            selectedDay?.key === d.key ? 'var(--accent-deep)' : 'var(--ink-20)'
                          }`,
                          background:
                            selectedDay?.key === d.key
                              ? 'var(--accent-deep)'
                              : d.isWeekend
                                ? 'transparent'
                                : 'var(--paper)',
                          color:
                            selectedDay?.key === d.key
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
                        <span style={{ fontSize: 9, opacity: 0.7, textTransform: 'uppercase' }}>
                          {d.dow}
                        </span>
                        <span
                          style={{
                            fontFamily: 'var(--font-serif)',
                            fontSize: 22,
                            letterSpacing: 0,
                          }}
                        >
                          {d.day}
                        </span>
                        <span style={{ fontSize: 9, opacity: 0.7, textTransform: 'uppercase' }}>
                          {d.mon}
                        </span>
                      </button>
                    ))}
                  </div>
                  <p
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontStyle: 'italic',
                      fontSize: 13,
                      color: 'var(--ink-60)',
                      margin: '12px 0 0',
                    }}
                  >
                    Weekends by appointment — please WhatsApp the concierge.
                  </p>

                  <div
                    style={{
                      marginTop: 28,
                      paddingTop: 24,
                      borderTop: '1px solid var(--ink-20)',
                    }}
                  >
                    <Mono style={{ color: 'var(--accent-deep)' }}>Step II · Choose a time</Mono>
                    <div style={{ display: 'flex', gap: 10, marginTop: 14, flexWrap: 'wrap' }}>
                      {SLOT_TIMES.map((t) => (
                        <button
                          key={t}
                          type="button"
                          disabled={!selectedDay}
                          onClick={() => setSelectedTime(t)}
                          style={{
                            padding: '12px 18px',
                            border: `1px solid ${
                              selectedTime === t ? 'var(--accent-deep)' : 'var(--ink-20)'
                            }`,
                            background:
                              selectedTime === t ? 'var(--accent-deep)' : 'var(--paper)',
                            color:
                              selectedTime === t
                                ? 'var(--paper)'
                                : selectedDay
                                  ? 'var(--ink-90)'
                                  : 'var(--ink-40)',
                            fontFamily: 'var(--font-mono)',
                            fontSize: 11,
                            letterSpacing: '0.18em',
                            cursor: selectedDay ? 'pointer' : 'not-allowed',
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
                            onClick={() => setTz(t)}
                            style={{
                              padding: '8px 14px',
                              border: `1px solid ${tz === t ? 'var(--accent)' : 'var(--ink-20)'}`,
                              background: tz === t ? 'var(--accent-tint)' : 'transparent',
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

                  <div
                    style={{
                      marginTop: 28,
                      paddingTop: 24,
                      borderTop: '1px solid var(--ink-20)',
                    }}
                  >
                    <Mono style={{ color: 'var(--accent-deep)' }}>Step III · About you</Mono>
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: 24,
                        marginTop: 16,
                      }}
                    >
                      <label className="field">
                        <span className="field-label">Your name</span>
                        <input
                          type="text"
                          placeholder="First name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                        />
                      </label>
                      <label className="field">
                        <span className="field-label">Email</span>
                        <input
                          type="email"
                          placeholder="you@email.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </label>
                      <label className="field" style={{ gridColumn: '1 / -1' }}>
                        <span className="field-label">
                          What you'd like to discuss{' '}
                          <em
                            style={{
                              fontStyle: 'italic',
                              color: 'var(--ink-40)',
                              fontSize: 12,
                              marginLeft: 6,
                            }}
                          >
                            optional
                          </em>
                        </span>
                        <div
                          style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 8 }}
                        >
                          {TOPICS.map((t) => (
                            <button
                              key={t}
                              type="button"
                              onClick={() => setTopic(t)}
                              style={{
                                padding: '8px 14px',
                                border: `1px solid ${
                                  topic === t ? 'var(--accent)' : 'var(--ink-20)'
                                }`,
                                background: topic === t ? 'var(--accent-tint)' : 'transparent',
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
                        {prefillProc && (
                          <p
                            style={{
                              fontFamily: 'var(--font-serif)',
                              fontStyle: 'italic',
                              color: 'var(--accent-deep)',
                              fontSize: 14,
                              margin: '12px 0 0',
                            }}
                          >
                            Prefilled from your last page · <strong>{prefillProc}</strong>
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
                    <p
                      style={{
                        margin: 0,
                        fontFamily: 'var(--font-serif)',
                        fontStyle: 'italic',
                        fontSize: 14,
                        color: 'var(--ink-60)',
                      }}
                    >
                      {canSubmit && selectedDay && selectedTime
                        ? `${selectedDay.dow} ${selectedDay.mon} ${selectedDay.day} · ${selectedTime} · ${tz}`
                        : 'Choose a day, a time, and tell us your name.'}
                    </p>
                    <button
                      type="button"
                      disabled={!canSubmit}
                      onClick={() => setSubmitted(true)}
                      className="btn btn-accent"
                      style={{
                        opacity: canSubmit ? 1 : 0.4,
                        cursor: canSubmit ? 'pointer' : 'not-allowed',
                      }}
                    >
                      <span>Confirm Booking</span>
                      <span className="btn-arrow">→</span>
                    </button>
                  </div>
                </div>
              </Reveal>
            </div>
          )}
        </div>
      </section>
      <CmsExtraBlocks slug="video-consult" />
    </PageShell>
  )
}
