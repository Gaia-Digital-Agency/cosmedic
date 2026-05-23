import React, { useState } from 'react'
import { Reveal } from '@/components/primitives/Reveal'
import { Mono, Eyebrow } from '@/components/primitives/Mono'
import { useCms } from '@/lib/cms-context'
import { findPageBySlug } from '@/lib/cms-adapters'

export const LeadMagnet: React.FC = () => {
  const [submitted, setSubmitted] = useState(false)
  const cms = useCms()
  const block = (cms ? findPageBySlug(cms, 'home') : undefined)?.leadMagnetBlock

  const coverEyebrow = block?.coverEyebrow || 'A guide · 24 pages · PDF'
  const coverLine1 = block?.coverLine1 || 'The Bali'
  const coverLine2 = block?.coverLine2 || 'Recovery'
  const coverLine3 = block?.coverLine3 || 'Guide.'
  const coverFoot1 = block?.coverFoot1 || 'BIMC CosMedic'
  const coverFoot2 = block?.coverFoot2 || 'MMXXVI'
  const bodyEyebrow = block?.bodyEyebrow || 'Free Guide'
  const headingPart1 = block?.headingPart1 || 'What to expect from'
  const headingAccent = block?.headingAccent || 'recovery in Bali.'
  const lede =
    block?.lede ||
    'A 24-page editorial guide written by our concierge team — covering recovery timelines for the ten most-requested procedures, what to pack, what villas suit which surgeries, and the pace of a typical fortnight in Nusa Dua.'
  const formPlaceholder = block?.formPlaceholder || 'Your email address'
  const submitLabel = block?.submitLabel || 'Send Guide →'
  const successHeading = block?.successHeading || '✓ Sent'
  const successBody = block?.successBody || 'Check your inbox — the guide is on its way.'
  const fineprint = block?.fineprint || 'One email. No marketing list. Unsubscribe anytime.'

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
              onSubmit={(e) => {
                e.preventDefault()
                setSubmitted(true)
              }}
            >
              <input type="email" placeholder={formPlaceholder} required />
              <button type="submit">{submitLabel}</button>
            </form>
          )}
          <p className="lead-magnet-fine">{fineprint}</p>
        </div>
      </Reveal>
    </section>
  )
}
