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
  const heroImage = page?.heroImage ? mediaUrl(page.heroImage, IMG.hero) || IMG.hero : IMG.hero

  const [expanded, setExpanded] = useState(false)
  return (
    <section className="hero-v2">
      <div className="hero-image-inner">
        <Img src={heroImage} fallbackLabel="BIMC · NUSA DUA" fallbackHue={3} alt="" />
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
            <form
              className={`quick-enquiry ${expanded ? 'expanded' : ''}`}
              onSubmit={(e) => {
                e.preventDefault()
                window.location.href = '/contact'
              }}
            >
              <label className="field">
                <span className="field-label">Your name</span>
                <input
                  type="text"
                  placeholder="First name"
                  required
                  onFocus={() => setExpanded(true)}
                />
              </label>
              <label className="field">
                <span className="field-label">Email</span>
                <input
                  type="email"
                  placeholder="you@email.com"
                  required
                  onFocus={() => setExpanded(true)}
                />
              </label>
              <div className="progressive">
                <label className="field">
                  <span className="field-label">
                    Area of interest{' '}
                    <em style={{ fontStyle: 'italic', color: 'var(--ink-40)' }}>(optional)</em>
                  </span>
                  <input type="text" placeholder="e.g. rhinoplasty, mommy makeover…" />
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
                Begin enquiry
              </Btn>
              <p className="form-fine">Held in confidence. Reviewed by a credentialed surgeon.</p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
