import React, { useState } from 'react'
import { PageShell } from '@/components/shell/PageShell'
import { CmsExtraBlocks } from '@/components/CmsExtraBlocks'
import { ChapterOpener } from '@/components/primitives/ChapterOpener'
import { Reveal } from '@/components/primitives/Reveal'
import { Img } from '@/components/primitives/Img'
import { Mono, Eyebrow } from '@/components/primitives/Mono'
import { Btn } from '@/components/primitives/Btn'
import { TREATMENT_LIST, IMG } from '@/content/seed'
import { useCms } from '@/lib/cms-context'
import { mediaUrl } from '@/lib/cms'

// Fallback intent copy — overridden by CMS contactEnquirySection.intentCopy when populated
const INTENT_COPY_FB: Record<string, { eyebrow: string; title: string; lede: string }> = {
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
      color: 'var(--accent)',
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
  const cms = useCms()
  const hero = cms?.contactHero ?? {}
  const enquiry = cms?.contactEnquirySection ?? {}
  const visit = cms?.contactVisitSection ?? {}
  const settings = cms?.settings ?? {}
  const directLines = enquiry.directLines ?? {}
  const fl = enquiry.formLabels ?? {}
  const sl = enquiry.submitLabels ?? {}

  // Build intentCopy map from CMS array, falling back to hardcoded INTENT_COPY_FB
  const intentCopyMap = React.useMemo(() => {
    const map: Record<string, { eyebrow: string; title: string; lede: string }> = { ...INTENT_COPY_FB }
    if (enquiry.intentCopy) {
      for (const row of enquiry.intentCopy) {
        if (row.slug) map[row.slug] = { eyebrow: row.eyebrow || '', title: row.title || '', lede: row.lede || '' }
      }
    }
    return map
  }, [enquiry.intentCopy])

  const [showOptional, setShowOptional] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [treatment, setTreatment] = useState('')
  const [country, setCountry] = useState('')
  const [preferredDate, setPreferredDate] = useState('')
  const [message, setMessage] = useState('')
  const [honeypot, setHoneypot] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error' | 'rate-limit'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const params =
    typeof window !== 'undefined'
      ? new URLSearchParams(window.location.search)
      : new URLSearchParams()
  const prefillProc = params.get('procedure') || ''
  const prefillIntent = params.get('intent') || ''
  const intent = intentCopyMap[prefillIntent]

  React.useEffect(() => {
    if (prefillProc && !treatment) setTreatment(prefillProc)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefillProc])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    if (submitting) return
    setSubmitting(true)
    setStatus('idle')
    setErrorMessage('')
    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          country,
          treatmentInterestText: treatment,
          preferredDate,
          message,
          honeypot,
          sourcePage: typeof window !== 'undefined' ? window.location.pathname : '/contact',
          sourceCta: 'contact-form',
        }),
      })
      const body = await res.json()
      if (res.ok && body.ok) {
        setStatus('success')
        setName(''); setEmail(''); setTreatment(''); setCountry(''); setPreferredDate(''); setMessage('')
      } else if (res.status === 429) {
        setStatus('rate-limit')
        setErrorMessage(`Please wait ${body.retryAfterSeconds || 60}s and try again.`)
      } else if (body.error === 'validation') {
        setStatus('error')
        setErrorMessage(body.issues?.[0]?.message || 'Please check the form and try again.')
      } else {
        setStatus('error')
        setErrorMessage(`Something went wrong. Please email ${settings.contactEmail || 'cosmedic@bimcbali.com'} if it persists.`)
      }
    } catch {
      setStatus('error')
      setErrorMessage(`Network error. Please try again or email ${settings.contactEmail || 'cosmedic@bimcbali.com'}.`)
    } finally {
      setSubmitting(false)
    }
  }

  const heroImage = mediaUrl(hero.heroImage ?? null, IMG.reception) || IMG.reception
  const mapImage = mediaUrl(visit.mapImage ?? null, IMG.bali) || IMG.bali
  const mapsUrl = settings.googleMapsUrl ||
    (() => {
      const parts = [
        settings.addressLine1,
        settings.addressLine2,
        settings.city,
        settings.postalCode,
        settings.country,
      ].filter(Boolean)
      return parts.length
        ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(parts.join(', '))}`
        : undefined
    })()

  const titleLines: [string, string] = intent
    ? [intent.title, '']
    : [hero.title?.a || 'Begin, when', hero.title?.b || 'you are ready.']
  const heroLede = intent
    ? intent.lede
    : hero.lede
      || 'Write to us in your own time, in your own words. A concierge will reply within twenty-four hours, in English or Bahasa Indonesia. There is no obligation — and no pressure — to proceed.'
  const heroChapter = intent
    ? `Chapter VIII — ${intent.eyebrow}`
    : hero.chapter || 'Chapter VIII — Plan Your Journey'
  const heroBreadcrumb = hero.breadcrumbLabel || 'Plan Your Journey'

  const addressLines: string[] = [
    settings.addressLine1,
    settings.addressLine2,
    [settings.city, settings.postalCode].filter(Boolean).join(' '),
    settings.country,
  ].filter((s): s is string => Boolean(s && s.trim()))

  const conciergeHoursLines = (visit.conciergeHoursValue || 'Twenty-four hours\nReplies within ten minutes')
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean)

  return (
    <PageShell activePage="contact" hideCTA>
      <ChapterOpener
        chapter={heroChapter}
        title={titleLines}
        lede={heroLede}
        image={heroImage}
        imageHue={hero.imageHue ?? 3}
        imageLabel={hero.imageLabel || 'PLAN YOUR JOURNEY'}
        breadcrumbs={[{ label: 'BIMC CosMedic', href: '/' }, { label: heroBreadcrumb }]}
      />

      <section className="page-section">
        <div className="two-col" style={{ alignItems: 'start' }}>
          <Reveal>
            <div>
              <Eyebrow>{enquiry.eyebrow || 'The Enquiry'}</Eyebrow>
              <h2 className="section-title" style={{ marginTop: 16 }}>
                {enquiry.headingPre || 'Tell us a little'}{' '}
                <span className="italic">{enquiry.headingItalic || 'about you.'}</span>
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
                {enquiry.intro
                  || 'Every field is optional. Tell us only what you are comfortable telling us today — we will follow up with the rest.'}
              </p>
              <div
                style={{
                  marginTop: 40,
                  paddingTop: 28,
                  borderTop: '1px solid var(--ink-20)',
                }}
              >
                <Mono>{directLines.sectionLabel || 'Direct lines'}</Mono>
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
                  {settings.contactPhone && (
                    <li>
                      <Mono>{directLines.conciergeLabel || 'Concierge'}</Mono>
                      <div style={{ fontFamily: 'var(--font-serif)', fontSize: 19, marginTop: 4 }}>
                        {settings.contactPhone}
                      </div>
                    </li>
                  )}
                  {settings.whatsappNumber && (
                    <li>
                      <Mono>{directLines.whatsappLabel || 'WhatsApp'}</Mono>
                      <div style={{ fontFamily: 'var(--font-serif)', fontSize: 19, marginTop: 4 }}>
                        {settings.whatsappNumber}
                      </div>
                    </li>
                  )}
                  {settings.contactEmail && (
                    <li>
                      <Mono>{directLines.emailLabel || 'Email'}</Mono>
                      <div style={{ fontFamily: 'var(--font-serif)', fontSize: 19, marginTop: 4 }}>
                        {settings.contactEmail}
                      </div>
                    </li>
                  )}
                  {settings.pressEmail && (
                    <li>
                      <Mono>{directLines.pressLabel || 'Press'}</Mono>
                      <div style={{ fontFamily: 'var(--font-serif)', fontSize: 19, marginTop: 4 }}>
                        {settings.pressEmail}
                      </div>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <form className="contact-form-grid" onSubmit={handleSubmit}>
              <input
                type="text"
                name="company"
                tabIndex={-1}
                autoComplete="off"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                style={{ position: 'absolute', left: '-10000px', top: 'auto', width: 1, height: 1, overflow: 'hidden' }}
                aria-hidden="true"
              />
              <label className="field field-full">
                <span className="field-label">{fl.nameLabel || 'Your name'} {REQUIRED_LABEL}</span>
                <input type="text" placeholder={fl.namePlaceholder || 'First name'} required value={name} onChange={(e) => setName(e.target.value)} />
              </label>
              <label className="field field-full">
                <span className="field-label">{fl.emailLabel || 'Email'} {REQUIRED_LABEL}</span>
                <input type="email" placeholder={fl.emailPlaceholder || 'you@example.com'} required value={email} onChange={(e) => setEmail(e.target.value)} />
              </label>
              <label className="field field-full">
                <span className="field-label">{fl.treatmentLabel || 'Area of interest'} {REQUIRED_LABEL}</span>
                <div className="select-row">
                  <span>{treatment || fl.treatmentPlaceholder || 'Select a treatment…'}</span>
                  <span className="chev">▾</span>
                </div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 16 }}>
                  {TREATMENT_LIST.map((t) => (
                    <button
                      key={t.slug}
                      type="button"
                      className={`chip ${treatment === t.t ? 'chip-active' : ''}`}
                      onClick={() => setTreatment(t.t)}
                    >
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
                    {fl.addDetailsLabel || '+ Add a few more details (optional)'}
                  </button>
                )}
              </div>

              {showOptional && (
                <>
                  <label className="field">
                    <span className="field-label">{fl.countryLabel || 'Country & city'} {OPTIONAL_LABEL}</span>
                    <input type="text" placeholder={fl.countryPlaceholder || 'Sydney, Australia'} value={country} onChange={(e) => setCountry(e.target.value)} />
                  </label>
                  <label className="field">
                    <span className="field-label">{fl.dateLabel || 'Approximate dates'} {OPTIONAL_LABEL}</span>
                    <input type="text" placeholder={fl.datePlaceholder || 'Month / year'} value={preferredDate} onChange={(e) => setPreferredDate(e.target.value)} />
                  </label>
                  <label className="field field-full">
                    <span className="field-label">{fl.messageLabel || 'Tell us a little'} {OPTIONAL_LABEL}</span>
                    <textarea placeholder={fl.messagePlaceholder || "What you'd like to discuss, in your own words. Or simply say hello."} value={message} onChange={(e) => setMessage(e.target.value)} />
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
                  {enquiry.trustLine
                    || 'Held in confidence. Reviewed by a credentialed surgeon. We reply within 24 hours.'}
                </p>
                <button type="submit" className="btn btn-accent" disabled={submitting}>
                  <span>{submitting ? (sl.sending || 'Sending…') : status === 'success' ? (sl.sent || 'Sent — thank you') : (sl.send || 'Send enquiry')}</span>
                  <span className="btn-arrow">→</span>
                </button>
              </div>
              {status === 'success' ? (
                <div className="field-full" role="status" style={{ padding: 16, background: 'var(--accent-tint)', borderLeft: '3px solid var(--accent)', marginTop: 16 }}>
                  <p style={{ margin: 0, fontFamily: 'var(--font-serif)', fontSize: 16, lineHeight: 1.55 }}>
                    {sl.successMessage || 'Thank you — your concierge will reply within one business day.'}
                  </p>
                </div>
              ) : null}
              {status === 'error' || status === 'rate-limit' ? (
                <div className="field-full" role="alert" style={{ padding: 16, background: 'var(--paper)', borderLeft: '3px solid var(--accent)', marginTop: 16 }}>
                  <p style={{ margin: 0, fontFamily: 'var(--font-serif)', fontSize: 16, lineHeight: 1.55 }}>
                    {errorMessage}
                  </p>
                </div>
              ) : null}
            </form>
          </Reveal>
        </div>
      </section>

      <section className="page-section tinted">
        <div className="two-col">
          <Reveal>
            <div>
              <Eyebrow>{visit.eyebrow || 'Visit'}</Eyebrow>
              <h2 className="section-title" style={{ marginTop: 16, marginBottom: 24 }}>
                {visit.headingPre || 'Find us in'}{' '}
                <span className="italic">{visit.headingItalic || 'Nusa Dua.'}</span>
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
                {visit.body
                  || 'Within the BIMC Hospital Nusa Dua, on the southernmost reach of Bali. Twelve minutes from Ngurah Rai International Airport.'}
              </p>
              {addressLines.length > 0 && (
                <div style={{ borderTop: '1px solid var(--ink-20)', paddingTop: 20 }}>
                  <p
                    style={{
                      margin: 0,
                      fontFamily: 'var(--font-serif)',
                      fontSize: 19,
                      lineHeight: 1.55,
                    }}
                  >
                    {addressLines.map((line, i) => (
                      <React.Fragment key={i}>
                        {line}
                        {i < addressLines.length - 1 && <br />}
                      </React.Fragment>
                    ))}
                  </p>
                </div>
              )}
              <div style={{ marginTop: 24, display: 'flex', gap: 12 }}>
                {mapsUrl ? (
                  <Btn kind="ghost" href={mapsUrl} target="_blank" rel="noopener">
                    {visit.openInMapsLabel || 'Open in Maps'}
                  </Btn>
                ) : (
                  <Btn kind="ghost">{visit.openInMapsLabel || 'Open in Maps'}</Btn>
                )}
                {mapsUrl ? (
                  <Btn kind="ghost" href={mapsUrl} target="_blank" rel="noopener">
                    {visit.getDirectionsLabel || 'Get directions'}
                  </Btn>
                ) : (
                  <Btn kind="ghost">{visit.getDirectionsLabel || 'Get directions'}</Btn>
                )}
              </div>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div>
              <div
                style={{ aspectRatio: '4 / 3', overflow: 'hidden', background: 'var(--cream)' }}
              >
                <Img
                  src={mapImage}
                  fallbackLabel={visit.mapImageLabel || 'NUSA DUA · BALI'}
                  fallbackHue={visit.mapImageHue ?? 4}
                  alt=""
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div className="contact-hours-grid">
                <div>
                  <Mono>{visit.clinicHoursLabel || 'Hours · Clinic'}</Mono>
                  <p
                    style={{
                      margin: '10px 0 0',
                      fontFamily: 'var(--font-serif)',
                      fontSize: 17,
                      lineHeight: 1.55,
                    }}
                  >
                    {settings.hoursMonFri || 'Mon – Sat · 09:00 – 19:00'}
                    {settings.hoursSatSun && (
                      <>
                        <br />
                        {settings.hoursSatSun}
                      </>
                    )}
                  </p>
                </div>
                <div>
                  <Mono>{visit.conciergeHoursLabel || 'Hours · Concierge'}</Mono>
                  <p
                    style={{
                      margin: '10px 0 0',
                      fontFamily: 'var(--font-serif)',
                      fontSize: 17,
                      lineHeight: 1.55,
                    }}
                  >
                    {conciergeHoursLines.map((line, i) => (
                      <React.Fragment key={i}>
                        {line}
                        {i < conciergeHoursLines.length - 1 && <br />}
                      </React.Fragment>
                    ))}
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
