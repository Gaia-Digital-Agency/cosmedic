import React, { useState } from 'react'
import { PageShell } from '@/components/shell/PageShell'
import { CmsExtraBlocks } from '@/components/CmsExtraBlocks'
import { ChapterOpener } from '@/components/primitives/ChapterOpener'
import { Reveal } from '@/components/primitives/Reveal'
import { Img } from '@/components/primitives/Img'
import { Mono, Eyebrow } from '@/components/primitives/Mono'
import { Btn } from '@/components/primitives/Btn'
import { TREATMENT_LIST, IMG } from '@/content/seed'

const INTENT_COPY: Record<string, { eyebrow: string; title: string; lede: string }> = {
  estimate: {
    eyebrow: 'Written estimate',
    title: 'Get a written estimate.',
    lede: 'Tell us a little, and a coordinator will reply within 24 hours with a tailored, itemised estimate — no marketing, no follow-on calls.',
  },
  'video-consult': {
    eyebrow: 'Video consult',
    title: 'Book a video consult.',
    lede: "A free 20-minute video call with a coordinator. No surgeon time required at this stage — we'll triage and brief the right surgeon afterwards.",
  },
}

const REQUIRED_LABEL = (
  <em
    style={{
      fontFamily: 'var(--font-serif)',
      fontStyle: 'italic',
      color: '#B45A3C',
      fontSize: 12,
      marginLeft: 6,
    }}
  >
    required
  </em>
)

const OPTIONAL_LABEL = (
  <em style={{ fontStyle: 'italic', color: 'var(--ink-40)', fontSize: 12, marginLeft: 6 }}>
    optional
  </em>
)

export const ContactPage: React.FC = () => {
  const [showOptional, setShowOptional] = useState(false)
  const params =
    typeof window !== 'undefined'
      ? new URLSearchParams(window.location.search)
      : new URLSearchParams()
  const prefillProc = params.get('procedure') || ''
  const prefillIntent = params.get('intent') || ''
  const intent = INTENT_COPY[prefillIntent]

  return (
    <PageShell activePage="contact" hideCTA>
      <ChapterOpener
        chapter={intent ? `Chapter VIII — ${intent.eyebrow}` : 'Chapter VIII — Plan Your Journey'}
        title={intent ? [intent.title, ''] : ['Begin, when', 'you are ready.']}
        lede={
          intent
            ? intent.lede
            : 'Write to us in your own time, in your own words. A concierge will reply within twenty-four hours, in English or Bahasa Indonesia. There is no obligation — and no pressure — to proceed.'
        }
        image={IMG.reception}
        imageHue={3}
        imageLabel="PLAN YOUR JOURNEY"
        breadcrumbs={[{ label: 'BIMC CosMedic', href: '/' }, { label: 'Plan Your Journey' }]}
      />

      <section className="page-section">
        <div className="two-col" style={{ alignItems: 'start' }}>
          <Reveal>
            <div>
              <Eyebrow>The Enquiry</Eyebrow>
              <h2 className="section-title" style={{ marginTop: 16 }}>
                Tell us a little <span className="italic">about you.</span>
              </h2>
              <p
                style={{
                  marginTop: 24,
                  fontSize: 16,
                  lineHeight: 1.6,
                  color: 'var(--ink-80)',
                  maxWidth: 320,
                }}
              >
                Every field is optional. Tell us only what you are comfortable telling us today —
                we will follow up with the rest.
              </p>
              <div
                style={{
                  marginTop: 40,
                  paddingTop: 28,
                  borderTop: '1px solid var(--ink-20)',
                }}
              >
                <Mono>Direct lines</Mono>
                <ul
                  style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: '20px 0 0',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 14,
                  }}
                >
                  <li>
                    <Mono>Concierge</Mono>
                    <div style={{ fontFamily: 'var(--font-serif)', fontSize: 19, marginTop: 4 }}>
                      +62 361 3000 911
                    </div>
                  </li>
                  <li>
                    <Mono>WhatsApp</Mono>
                    <div style={{ fontFamily: 'var(--font-serif)', fontSize: 19, marginTop: 4 }}>
                      +62 811 3888 911
                    </div>
                  </li>
                  <li>
                    <Mono>Email</Mono>
                    <div style={{ fontFamily: 'var(--font-serif)', fontSize: 19, marginTop: 4 }}>
                      concierge@bimccosmedic.com
                    </div>
                  </li>
                  <li>
                    <Mono>Press</Mono>
                    <div style={{ fontFamily: 'var(--font-serif)', fontSize: 19, marginTop: 4 }}>
                      press@bimccosmedic.com
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <form className="contact-form-grid" onSubmit={(e) => e.preventDefault()}>
              <label className="field field-full">
                <span className="field-label">Your name {REQUIRED_LABEL}</span>
                <input type="text" placeholder="First name" required />
              </label>
              <label className="field field-full">
                <span className="field-label">Email {REQUIRED_LABEL}</span>
                <input type="email" placeholder="you@example.com" required />
              </label>
              <label className="field field-full">
                <span className="field-label">Area of interest {REQUIRED_LABEL}</span>
                <div className="select-row">
                  <span>{prefillProc || 'Select a treatment…'}</span>
                  <span className="chev">▾</span>
                </div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 16 }}>
                  {TREATMENT_LIST.map((t) => (
                    <button key={t.slug} type="button" className="chip">
                      {t.t}
                    </button>
                  ))}
                </div>
              </label>

              <div
                className="field-full"
                style={{
                  borderTop: '1px solid var(--ink-20)',
                  paddingTop: 24,
                  marginTop: 8,
                }}
              >
                {!showOptional && (
                  <button
                    type="button"
                    onClick={() => setShowOptional(true)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      padding: 0,
                      cursor: 'pointer',
                      fontFamily: 'var(--font-mono)',
                      fontSize: 11,
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      color: 'var(--accent-deep)',
                    }}
                  >
                    + Add a few more details (optional)
                  </button>
                )}
              </div>

              {showOptional && (
                <>
                  <label className="field">
                    <span className="field-label">Country & city {OPTIONAL_LABEL}</span>
                    <input type="text" placeholder="Sydney, Australia" />
                  </label>
                  <label className="field">
                    <span className="field-label">Approximate dates {OPTIONAL_LABEL}</span>
                    <input type="text" placeholder="Month / year" />
                  </label>
                  <label className="field field-full">
                    <span className="field-label">Tell us a little {OPTIONAL_LABEL}</span>
                    <textarea placeholder="What you'd like to discuss, in your own words. Or simply say hello." />
                  </label>
                </>
              )}

              <div
                className="field-full"
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: 24,
                  paddingTop: 24,
                  borderTop: '1px solid var(--ink-20)',
                }}
              >
                <p
                  style={{
                    margin: 0,
                    fontFamily: 'var(--font-serif)',
                    fontStyle: 'italic',
                    fontSize: 14,
                    color: 'var(--ink-60)',
                    maxWidth: 380,
                  }}
                >
                  Held in confidence. Reviewed by a credentialed surgeon. We reply within 24 hours.
                </p>
                <Btn kind="accent">Send enquiry</Btn>
              </div>
            </form>
          </Reveal>
        </div>
      </section>

      <section className="page-section tinted">
        <div className="two-col">
          <Reveal>
            <div>
              <Eyebrow>Visit</Eyebrow>
              <h2 className="section-title" style={{ marginTop: 16, marginBottom: 24 }}>
                Find us in <span className="italic">Nusa Dua.</span>
              </h2>
              <p
                style={{
                  fontSize: 17,
                  lineHeight: 1.65,
                  color: 'var(--ink-80)',
                  margin: '0 0 24px',
                  maxWidth: 480,
                }}
              >
                Within the BIMC Hospital Nusa Dua, on the southernmost reach of Bali. Twelve
                minutes from Ngurah Rai International Airport.
              </p>
              <div style={{ borderTop: '1px solid var(--ink-20)', paddingTop: 20 }}>
                <p
                  style={{
                    margin: 0,
                    fontFamily: 'var(--font-serif)',
                    fontSize: 19,
                    lineHeight: 1.55,
                  }}
                >
                  BIMC Hospital Nusa Dua
                  <br />
                  Kawasan ITDC Blok D
                  <br />
                  Nusa Dua 80363
                  <br />
                  Bali, Indonesia
                </p>
              </div>
              <div style={{ marginTop: 24, display: 'flex', gap: 12 }}>
                <Btn kind="ghost">Open in Maps</Btn>
                <Btn kind="ghost">Get directions</Btn>
              </div>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div>
              <div
                style={{ aspectRatio: '4 / 3', overflow: 'hidden', background: 'var(--cream)' }}
              >
                <Img src={IMG.bali} fallbackLabel="NUSA DUA · BALI" fallbackHue={4} alt="" />
              </div>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: 24,
                  marginTop: 24,
                }}
              >
                <div>
                  <Mono>Hours · Clinic</Mono>
                  <p
                    style={{
                      margin: '10px 0 0',
                      fontFamily: 'var(--font-serif)',
                      fontSize: 17,
                      lineHeight: 1.55,
                    }}
                  >
                    Mon – Sat · 09:00 – 19:00
                    <br />
                    Sun · By appointment
                  </p>
                </div>
                <div>
                  <Mono>Hours · Concierge</Mono>
                  <p
                    style={{
                      margin: '10px 0 0',
                      fontFamily: 'var(--font-serif)',
                      fontSize: 17,
                      lineHeight: 1.55,
                    }}
                  >
                    Twenty-four hours
                    <br />
                    Replies within ten minutes
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
      <CmsExtraBlocks slug="contact" />
    </PageShell>
  )
}
