import React, { useState } from 'react'
import { Img } from '@/components/primitives/Img'
import { Mono, Eyebrow } from '@/components/primitives/Mono'
import { Btn } from '@/components/primitives/Btn'
import { useCms } from '@/lib/cms-context'
import { mediaUrl } from '@/lib/cms'

export const Hero: React.FC = () => {
  const cms = useCms()
  const g = cms?.homeHero
  const eyebrow = g?.eyebrow || 'A sanctuary in Nusa Dua · Est. 1998'
  const titleA = g?.title?.a || 'Plastic surgery'
  const titleB = g?.title?.b || 'in Bali, by ISAPS surgeons.'
  const lede = g?.lede
  // If the linked media is flagged isPlaceholder, render no image at all —
  // the vignette + dark background carry the section.
  const heroMedia = g?.heroImage
  const isPlaceholderHero =
    heroMedia && typeof heroMedia === 'object' && (heroMedia as { isPlaceholder?: boolean }).isPlaceholder === true
  const heroImage = !isPlaceholderHero && heroMedia ? mediaUrl(heroMedia, '') : ''

  const primaryCtaLabel = g?.primaryCtaLabel || 'Plan Your Treatment'
  const secondaryCtaLabel = g?.secondaryCtaLabel || 'View Pricing'
  const secondaryCtaHref = g?.secondaryCtaHref || '/pricing'

  const qe = g?.quickEnquiry
  const qeEyebrow = qe?.eyebrow || 'Begin · No commitment'
  const qeHeading = qe?.heading || 'Get a private price estimate within 24 hours.'
  const qeIntro =
    qe?.intro ||
    "Two fields to start. We'll reply with a tailored estimate and procedure guide — no marketing."
  const qeNameLabel = qe?.nameLabel || 'Your name'
  const qeNamePlaceholder = qe?.namePlaceholder || 'First name'
  const qeEmailLabel = qe?.emailLabel || 'Email'
  const qeEmailPlaceholder = qe?.emailPlaceholder || 'you@email.com'
  const qeInterestLabel = qe?.interestLabel || 'Area of interest'
  const qeInterestOptional = qe?.interestOptionalLabel || '(optional)'
  const qeInterestPlaceholder = qe?.interestPlaceholder || 'e.g. rhinoplasty, mommy makeover…'
  const qeRevealInterestLabel = qe?.revealInterestLabel || '+ Add a treatment area (optional)'
  const qeSubmitLabel = qe?.submitLabel || 'Begin enquiry'
  const qeSubmittingLabel = qe?.submittingLabel || 'Sending…'
  const qeSuccessLabel = qe?.successLabel || 'Sent — thank you'
  const qeSuccessFine =
    qe?.successFine || 'Thank you — your concierge will reply within one business day.'
  const qeErrorFine = qe?.errorFine || 'Something went wrong. Please try the full form on /contact.'
  const qeFineprint = qe?.fineprint || 'Held in confidence. Reviewed by a credentialed surgeon.'

  const [expanded, setExpanded] = useState(false)
  const [heroName, setHeroName] = useState('')
  const [heroEmail, setHeroEmail] = useState('')
  const [heroProc, setHeroProc] = useState('')
  const [heroHoneypot, setHeroHoneypot] = useState('')
  const [heroSubmitting, setHeroSubmitting] = useState(false)
  const [heroStatus, setHeroStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const heroSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    if (heroSubmitting) return
    setHeroSubmitting(true)
    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: heroName,
          email: heroEmail,
          treatmentInterestText: heroProc,
          honeypot: heroHoneypot,
          sourcePage: '/',
          sourceCta: 'hero-enquiry',
        }),
      })
      const body = await res.json()
      if (res.ok && body.ok) {
        setHeroStatus('success')
        setHeroName(''); setHeroEmail(''); setHeroProc('')
      } else {
        setHeroStatus('error')
      }
    } catch {
      setHeroStatus('error')
    } finally {
      setHeroSubmitting(false)
    }
  }
  return (
    <section className="hero-v2">
      <div className="hero-image-inner">
        {heroImage ? (
          <Img media={heroMedia} src={heroImage} fallbackLabel="BIMC · NUSA DUA" fallbackHue={3} alt="" loading="eager" fetchPriority="high" />
        ) : null}
        <div className="hero-image-vignette" />
      </div>

      <div className="hero-v2-content">
        <div className="hero-v2-headline">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="display">
            {g?.title?.a || g?.title?.b ? (
              <>
                <span className="line">{titleA}</span>
                <span className="line italic accent">{titleB}</span>
              </>
            ) : (
              <>
                <span className="line">Plastic surgery</span>
                <span className="line italic">in Bali,</span>
                <span className="line">by ISAPS</span>
                <span className="line italic accent">surgeons.</span>
              </>
            )}
          </h1>
          {lede ? (
            <p className="hero-v2-sub-h1">{lede}</p>
          ) : (
            <>
              <p
                className="hero-v2-sub-h1"
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontStyle: 'italic',
                  fontSize: 22,
                  lineHeight: 1.45,
                  marginTop: 18,
                  color: 'rgba(255,255,255,0.86)',
                }}
              >
                The care of medicine. The grace of Bali.
              </p>
              <p className="hero-v2-sub-h1">
                Performed inside Indonesia's first ACHSI-accredited international hospital, with private
                villa recovery and twelve months of telehealth follow-up included. Procedures from Rp
                18,900,000 (≈ AUD 1,800).
              </p>
            </>
          )}

          <div className="hero-v2-actions">
            <a
              href="#enquiry"
              className="btn btn-accent"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById('enquiry')?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              <span>{primaryCtaLabel}</span>
              <span className="btn-arrow">→</span>
            </a>
            <a href={secondaryCtaHref} className="btn btn-ghost-light">
              <span>{secondaryCtaLabel}</span>
              <span className="btn-arrow">→</span>
            </a>
          </div>
        </div>

        <div className="hero-v2-side">
          <div className="hero-v2-card" id="enquiry">
            <Mono style={{ color: 'var(--accent-deep)' }}>{qeEyebrow}</Mono>
            <h4>{qeHeading}</h4>
            <p>{qeIntro}</p>
            <form className={`quick-enquiry ${expanded ? 'expanded' : ''}`} onSubmit={heroSubmit}>
              <input
                type="text"
                name="company"
                tabIndex={-1}
                autoComplete="off"
                value={heroHoneypot}
                onChange={(e) => setHeroHoneypot(e.target.value)}
                style={{ position: 'absolute', left: '-10000px', top: 'auto', width: 1, height: 1, overflow: 'hidden' }}
                aria-hidden="true"
              />
              <label className="field">
                <span className="field-label">{qeNameLabel}</span>
                <input
                  type="text"
                  placeholder={qeNamePlaceholder}
                  required
                  value={heroName}
                  onChange={(e) => setHeroName(e.target.value)}
                  onFocus={() => setExpanded(true)}
                />
              </label>
              <label className="field">
                <span className="field-label">{qeEmailLabel}</span>
                <input
                  type="email"
                  placeholder={qeEmailPlaceholder}
                  required
                  value={heroEmail}
                  onChange={(e) => setHeroEmail(e.target.value)}
                  onFocus={() => setExpanded(true)}
                />
              </label>
              <div className="progressive">
                <label className="field">
                  <span className="field-label">
                    {qeInterestLabel}{' '}
                    <em style={{ fontStyle: 'italic', color: 'var(--ink-40)' }}>{qeInterestOptional}</em>
                  </span>
                  <input
                    type="text"
                    placeholder={qeInterestPlaceholder}
                    value={heroProc}
                    onChange={(e) => setHeroProc(e.target.value)}
                  />
                </label>
              </div>
              {!expanded && (
                <button
                  type="button"
                  className="reveal-link"
                  onClick={() => setExpanded(true)}
                >
                  {qeRevealInterestLabel}
                </button>
              )}
              <Btn kind="primary" full>
                {heroSubmitting ? qeSubmittingLabel : heroStatus === 'success' ? qeSuccessLabel : qeSubmitLabel}
              </Btn>
              {heroStatus === 'success' ? (
                <p className="form-fine" style={{ color: 'var(--accent-deep)' }}>
                  {qeSuccessFine}
                </p>
              ) : heroStatus === 'error' ? (
                <p className="form-fine" style={{ color: 'var(--accent)' }}>
                  {qeErrorFine}
                </p>
              ) : (
                <p className="form-fine">{qeFineprint}</p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
