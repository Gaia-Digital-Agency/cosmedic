import React, { useState } from 'react'
import { Img } from '@/components/primitives/Img'
import { Mono, Eyebrow } from '@/components/primitives/Mono'
import { Btn } from '@/components/primitives/Btn'
import { IMG } from '@/content/seed'
import { useCms } from '@/lib/cms-context'
import { findPageBySlug } from '@/lib/cms-adapters'
import { mediaUrl } from '@/lib/cms'

export const Hero: React.FC = () => {
  const cms = useCms()
  const page = cms ? findPageBySlug(cms, 'home') : undefined
  const eyebrow = page?.tagline || 'A sanctuary in Nusa Dua · Est. 1998'
  const titleA = page?.chapterTitle?.a || 'Plastic surgery'
  const titleB = page?.chapterTitle?.b || 'in Bali, by ISAPS surgeons.'
  const lede = page?.lede
  // If the linked media is flagged isPlaceholder, render no image at all —
  // the vignette + dark background carry the section. Stops the "Editorial
  // Hero / placeholder" seed file from being visible to public visitors.
  const heroMedia = page?.heroImage
  const isPlaceholderHero =
    heroMedia && typeof heroMedia === 'object' && (heroMedia as { isPlaceholder?: boolean }).isPlaceholder === true
  const heroImage = !isPlaceholderHero && heroMedia ? mediaUrl(heroMedia, '') : ''

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
          <Img src={heroImage} fallbackLabel="BIMC · NUSA DUA" fallbackHue={3} alt="" />
        ) : null}
        <div className="hero-image-vignette" />
      </div>

      <div className="hero-v2-content">
        <div className="hero-v2-headline">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="display">
            {page?.chapterTitle ? (
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
              <span>Plan Your Treatment</span>
              <span className="btn-arrow">→</span>
            </a>
            <a href="/pricing" className="btn btn-ghost-light">
              <span>View Pricing</span>
              <span className="btn-arrow">→</span>
            </a>
          </div>
        </div>

        <div className="hero-v2-side">
          <div className="hero-v2-card" id="enquiry">
            <Mono style={{ color: 'var(--accent-deep)' }}>Begin · No commitment</Mono>
            <h4>Get a private price estimate within 24 hours.</h4>
            <p>
              Two fields to start. We'll reply with a tailored estimate and procedure guide — no
              marketing.
            </p>
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
                <span className="field-label">Your name</span>
                <input
                  type="text"
                  placeholder="First name"
                  required
                  value={heroName}
                  onChange={(e) => setHeroName(e.target.value)}
                  onFocus={() => setExpanded(true)}
                />
              </label>
              <label className="field">
                <span className="field-label">Email</span>
                <input
                  type="email"
                  placeholder="you@email.com"
                  required
                  value={heroEmail}
                  onChange={(e) => setHeroEmail(e.target.value)}
                  onFocus={() => setExpanded(true)}
                />
              </label>
              <div className="progressive">
                <label className="field">
                  <span className="field-label">
                    Area of interest{' '}
                    <em style={{ fontStyle: 'italic', color: 'var(--ink-40)' }}>(optional)</em>
                  </span>
                  <input
                    type="text"
                    placeholder="e.g. rhinoplasty, mommy makeover…"
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
                  + Add a treatment area (optional)
                </button>
              )}
              <Btn kind="primary" full>
                {heroSubmitting ? 'Sending…' : heroStatus === 'success' ? 'Sent — thank you' : 'Begin enquiry'}
              </Btn>
              {heroStatus === 'success' ? (
                <p className="form-fine" style={{ color: 'var(--accent-deep)' }}>
                  Thank you — your concierge will reply within one business day.
                </p>
              ) : heroStatus === 'error' ? (
                <p className="form-fine" style={{ color: '#C28E66' }}>
                  Something went wrong. Please try the full form on /contact.
                </p>
              ) : (
                <p className="form-fine">Held in confidence. Reviewed by a credentialed surgeon.</p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
