import React, { useState } from 'react'
import { Reveal } from '@/components/primitives/Reveal'
import { Mono, Eyebrow } from '@/components/primitives/Mono'

export const LeadMagnet: React.FC = () => {
  const [submitted, setSubmitted] = useState(false)
  return (
    <section className="lead-magnet">
      <Reveal>
        <div className="lead-magnet-cover">
          <span className="cover-eyebrow">A guide · 24 pages · PDF</span>
          <h3 className="cover-title">
            <span>The Bali</span>
            <br />
            <span className="italic">Recovery</span>
            <br />
            <span>Guide.</span>
          </h3>
          <div className="cover-spacer" />
          <div className="cover-foot">
            <span>BIMC CosMedic</span>
            <span>MMXXVI</span>
          </div>
        </div>
      </Reveal>
      <Reveal delay={140}>
        <div className="lead-magnet-body">
          <Eyebrow>Free Guide</Eyebrow>
          <h2 className="section-title" style={{ marginTop: 18 }}>
            <span>What to expect from</span>{' '}
            <span className="italic">recovery in Bali.</span>
          </h2>
          <p style={{ marginTop: 22, fontSize: 17, lineHeight: 1.65 }}>
            A 24-page editorial guide written by our concierge team — covering recovery timelines
            for the ten most-requested procedures, what to pack, what villas suit which surgeries,
            and the pace of a typical fortnight in Nusa Dua.
          </p>
          {submitted ? (
            <div
              style={{
                marginTop: 28,
                padding: 20,
                border: '1px solid var(--accent)',
                background: 'var(--paper)',
              }}
            >
              <Mono style={{ color: 'var(--accent-deep)' }}>✓ Sent</Mono>
              <p style={{ margin: '10px 0 0', fontSize: 16 }}>
                Check your inbox — the guide is on its way.
              </p>
            </div>
          ) : (
            <form
              className="lead-magnet-form"
              onSubmit={(e) => {
                e.preventDefault()
                setSubmitted(true)
              }}
            >
              <input type="email" placeholder="Your email address" required />
              <button type="submit">Send Guide →</button>
            </form>
          )}
          <p className="lead-magnet-fine">One email. No marketing list. Unsubscribe anytime.</p>
        </div>
      </Reveal>
    </section>
  )
}
