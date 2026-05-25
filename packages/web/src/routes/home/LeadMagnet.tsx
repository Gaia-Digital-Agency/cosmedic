import React, { useState } from 'react'
import { Reveal } from '@/components/primitives/Reveal'
import { Mono, Eyebrow } from '@/components/primitives/Mono'
import { useCms } from '@/lib/cms-context'

export const LeadMagnet: React.FC = () => {
  const [submitted, setSubmitted] = useState(false)
  const [email, setEmail] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const cms = useCms()
  const g = cms?.homeLeadMagnet

  const coverEyebrow = g?.coverEyebrow || 'A guide · 24 pages · PDF'
  const coverLine1 = g?.coverLine1 || 'The Bali'
  const coverLine2 = g?.coverLine2 || 'Recovery'
  const coverLine3 = g?.coverLine3 || 'Guide.'
  const coverFoot1 = g?.coverFoot1 || 'BIMC CosMedic'
  const coverFoot2 = g?.coverFoot2 || 'MMXXVI'
  const bodyEyebrow = g?.bodyEyebrow || 'Free Guide'
  const headingPart1 = g?.headingPart1 || 'What to expect from'
  const headingAccent = g?.headingAccent || 'recovery in Bali.'
  const lede =
    g?.lede ||
    'A 24-page editorial guide written by our concierge team — covering recovery timelines for the ten most-requested procedures, what to pack, what villas suit which surgeries, and the pace of a typical fortnight in Nusa Dua.'
  const formPlaceholder = g?.formPlaceholder || 'Your email address'
  const submitLabel = g?.submitLabel || 'Send Guide →'
  const successHeading = g?.successHeading || '✓ Sent'
  const successBody = g?.successBody || 'Check your inbox — the guide is on its way.'
  const fineprint = g?.fineprint || 'One email. No marketing list. Unsubscribe anytime.'

  return (
    <section className="lead-magnet">
      <Reveal>
        <div className="lead-magnet-cover">
          <span className="cover-eyebrow">{coverEyebrow}</span>
          <h3 className="cover-title">
            <span>{coverLine1}</span>
            <br />
            <span className="italic">{coverLine2}</span>
            <br />
            <span>{coverLine3}</span>
          </h3>
          <div className="cover-spacer" />
          <div className="cover-foot">
            <span>{coverFoot1}</span>
            <span>{coverFoot2}</span>
          </div>
        </div>
      </Reveal>
      <Reveal delay={140}>
        <div className="lead-magnet-body">
          <Eyebrow>{bodyEyebrow}</Eyebrow>
          <h2 className="section-title" style={{ marginTop: 18 }}>
            <span>{headingPart1}</span>{' '}
            <span className="italic">{headingAccent}</span>
          </h2>
          <p style={{ marginTop: 22, fontSize: 17, lineHeight: 1.65 }}>{lede}</p>
          {submitted ? (
            <div
              style={{
                marginTop: 28,
                padding: 20,
                border: '1px solid var(--accent)',
                background: 'var(--paper)',
              }}
            >
              <Mono style={{ color: 'var(--accent-deep)' }}>{successHeading}</Mono>
              <p style={{ margin: '10px 0 0', fontSize: 16 }}>{successBody}</p>
            </div>
          ) : (
            <form
              className="lead-magnet-form"
              onSubmit={async (e) => {
                e.preventDefault()
                if (submitting) return
                setSubmitting(true)
                setErrorMsg('')
                try {
                  const res = await fetch('/api/enquiry', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      name: 'Newsletter Signup',
                      email,
                      message: 'Lead-magnet form: requested The Bali Recovery Guide PDF.',
                      sourcePage: '/',
                      sourceCta: 'lead-magnet-newsletter',
                    }),
                  })
                  const body = await res.json()
                  if (res.ok && body.ok) {
                    setSubmitted(true)
                    setEmail('')
                  } else {
                    setErrorMsg('Sorry — something went wrong. Please try again or email us directly.')
                  }
                } catch {
                  setErrorMsg('Sorry — could not reach the server. Please try again.')
                } finally {
                  setSubmitting(false)
                }
              }}
            >
              <input
                type="email"
                placeholder={formPlaceholder}
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit" disabled={submitting}>
                {submitting ? 'Sending…' : submitLabel}
              </button>
              {errorMsg && <p style={{ marginTop: 8, color: '#a04040', fontSize: 13 }}>{errorMsg}</p>}
            </form>
          )}
          <p className="lead-magnet-fine">{fineprint}</p>
        </div>
      </Reveal>
    </section>
  )
}
