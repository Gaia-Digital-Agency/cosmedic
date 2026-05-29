import React, { useEffect, useRef, useState } from 'react'
import { TREATMENT_LIST, SUBCATEGORIES_BY_DISCIPLINE, SURGEON_LIST } from '@/content/seed'
import { useCms } from '@/lib/cms-context'
import { mediaUrl, mediaAlt } from '@/lib/cms'

type Props = {
  activePage?: string
}

export const Header: React.FC<Props> = ({ activePage = '' }) => {
  const cms = useCms()
  const localeSwitcher = cms?.header?.localeSwitcher
  const labelEn = localeSwitcher?.labelEn || 'EN'
  const labelId = localeSwitcher?.labelId || 'ID'
  const ctaLabel = cms?.floatingChrome?.ctaPill?.label || 'Plan Your Treatment'
  const ctaHref = cms?.floatingChrome?.ctaPill?.href || '/contact'
  const siteName = cms?.settings?.siteName || 'BIMC CosMedic'
  // CMS-driven logos with static fallback. logoDark is rendered when the
  // header has scrolled past the hero (`.scrolled`) via CSS swap; we emit
  // both <img>s and let the stylesheet show/hide based on header state.
  const logoLightSrc = mediaUrl(cms?.header?.logoLight, '/assets/logo.svg') || '/assets/logo.svg'
  const logoDarkSrc = mediaUrl(cms?.header?.logoDark, '/assets/logo-light.svg') || '/assets/logo-light.svg'
  const logoAlt = mediaAlt(cms?.header?.logoLight, `${siteName} — Managed by BIMC Hospital`)
  // EndorsementMark: the global is preserved in CMS (admin-editable) but is no
  // longer rendered alongside the logo. Phase N1 (2026-05-23): the production
  // logo PNG already contains "Managed by BIMC Hospital" baked in below the
  // wordmark, so a sibling endorsement element duplicated the same line. The
  // CMS field stays available for a future placement (e.g. footer) without
  // touching the data.

  const [scrolled, setScrolled] = useState(false)
  const [lang, setLang] = useState<'EN' | 'ID'>('EN')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileTreatmentsOpen, setMobileTreatmentsOpen] = useState(false)
  const [mobileSurgeonsOpen, setMobileSurgeonsOpen] = useState(false)
  const [openMenu, setOpenMenu] = useState<'treatments' | 'surgeons' | null>(null)
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const openMenuNow = (name: 'treatments' | 'surgeons') => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current)
      closeTimerRef.current = null
    }
    setOpenMenu(name)
  }

  const scheduleClose = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current)
    closeTimerRef.current = setTimeout(() => setOpenMenu(null), 2000)
  }

  useEffect(
    () => () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current)
    },
    [],
  )

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  // ESC closes the mobile drawer; ignored when drawer is closed.
  useEffect(() => {
    if (!mobileOpen) return
    const onKey = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') setMobileOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [mobileOpen])

  const surgeonCols = [
    { key: 'surgical', label: 'Surgical Doctors', group: 'Plastic Surgery', anchor: 'surgical' },
    { key: 'aesthetic', label: 'Aesthetic Doctors', group: 'Aesthetic Medicine', anchor: 'aesthetic' },
  ] as const

  return (
    <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-inner">
        <a href="/" className="logo">
          <img src={logoLightSrc} alt={logoAlt} className="logo-img logo-img-light" />
          <img src={logoDarkSrc} alt={logoAlt} className="logo-img logo-img-dark" />
        </a>
        <nav className="primary-nav">
          <div
            className={`has-dropdown ${openMenu === 'treatments' ? 'open' : ''}`}
            onMouseEnter={() => openMenuNow('treatments')}
            onMouseLeave={scheduleClose}
            onFocus={() => openMenuNow('treatments')}
            onBlur={scheduleClose}
          >
            <a
              href="/procedures"
              className={activePage.startsWith('treatment') ? 'active' : ''}
            >
              Procedures
            </a>
            <div className="dropdown-panel dropdown-panel-wide">
              <div className="dropdown-panel-grid">
                {TREATMENT_LIST.map((t) => {
                  const subs = SUBCATEGORIES_BY_DISCIPLINE[t.slug] || []
                  return (
                    <div key={t.slug} className="dropdown-discipline">
                      <a
                        href={`/procedures/${t.slug}`}
                        className={`dropdown-discipline-head ${
                          activePage === `treatment-${t.slug}` ? 'active' : ''
                        }`}
                      >
                        <span>{t.t}</span>
                      </a>
                      <ul className="dropdown-sublist">
                        {subs.map(([slug, title]) => (
                          <li key={slug}>
                            <a
                              href={`/procedures/${t.slug}/${slug}`}
                              className={activePage === `treatment-${slug}` ? 'active' : ''}
                            >
                              {title}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
          <div
            className={`has-dropdown ${openMenu === 'surgeons' ? 'open' : ''}`}
            onMouseEnter={() => openMenuNow('surgeons')}
            onMouseLeave={scheduleClose}
            onFocus={() => openMenuNow('surgeons')}
            onBlur={scheduleClose}
          >
            <a
              href="/experts"
              className={activePage.startsWith('surgeon') ? 'active' : ''}
            >
              Experts
            </a>
            <div className="dropdown-panel dropdown-panel-wide">
              <div className="dropdown-panel-grid dropdown-panel-grid-2col">
                {surgeonCols.map((col) => (
                  <div key={col.key} className="dropdown-discipline">
                    <a href={`/experts#${col.anchor}`} className="dropdown-discipline-head">
                      <span>{col.label}</span>
                    </a>
                    <ul className="dropdown-sublist">
                      {SURGEON_LIST.filter((s) => s.group === col.group).map((s) => (
                        <li key={s.slug}>
                          <a
                            href={`/experts/${s.slug}`}
                            className={activePage === `surgeon-${s.slug}` ? 'active' : ''}
                          >
                            {s.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <a
            href="/results"
            className={
              activePage === 'gallery' || activePage === 'stories' || activePage === 'results'
                ? 'active'
                : ''
            }
          >
            Results
          </a>
          <a href="/pricing" className={activePage === 'pricing' ? 'active' : ''}>
            Pricing
          </a>
          <a href="/journey" className={activePage === 'journey' ? 'active' : ''}>
            Your Journey
          </a>
          <a href="/contact" className={activePage === 'contact' ? 'active' : ''}>
            Contact
          </a>
        </nav>
        <div className="header-right">
          {localeSwitcher?.enabled !== false ? (
            // EN | ID switcher — visually present, functionally disabled
            // until Phase 9 lengthy ships (Payload localization + /id/*
            // SSR routing + ID editorial content). Keeping the chrome in
            // place so the header layout matches design + the position is
            // ready when the locale wiring lands.
            <div
              className="lang-switcher"
              role="group"
              aria-label="Language"
              title="Indonesian locale coming soon"
              style={{ opacity: 0.55, cursor: 'not-allowed' }}
            >
              {(
                [
                  ['en', labelEn],
                  ['id', labelId],
                ] as const
              ).map(([code, label]) => {
                const active = code === 'en'
                return (
                  <span
                    key={code}
                    className={`lang-pill ${active ? 'active' : ''}`}
                    aria-disabled="true"
                    aria-current={active ? 'true' : undefined}
                    lang={code}
                    style={{ pointerEvents: 'none', userSelect: 'none' }}
                  >
                    {label}
                  </span>
                )
              })}
            </div>
          ) : null}
          <a href={ctaHref} className="header-cta">
            <span>{ctaLabel}</span>
            <span className="btn-arrow">→</span>
          </a>
          <button
            type="button"
            className={`burger-btn ${mobileOpen ? 'open' : ''}`}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            onClick={() => setMobileOpen((o) => !o)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <div id="mobile-menu" className={`mobile-menu ${mobileOpen ? 'open' : ''}`} aria-hidden={!mobileOpen}>
        <div className="mobile-menu-inner">
          <div className="mobile-menu-section">
            <button
              type="button"
              className={`mobile-menu-head ${mobileTreatmentsOpen ? 'open' : ''}`}
              onClick={() => setMobileTreatmentsOpen((o) => !o)}
            >
              <span>Procedures</span>
              <span className="mobile-chev">{mobileTreatmentsOpen ? '−' : '+'}</span>
            </button>
            {mobileTreatmentsOpen && (
              <div className="mobile-submenu">
                <a href="/procedures" className="mobile-submenu-all">
                  All procedures →
                </a>
                {TREATMENT_LIST.map((t) => {
                  const subs = SUBCATEGORIES_BY_DISCIPLINE[t.slug] || []
                  return (
                    <div key={t.slug} className="mobile-discipline">
                      <a
                        href={`/procedures/${t.slug}`}
                        className={`mobile-discipline-head ${
                          activePage === `treatment-${t.slug}` ? 'active' : ''
                        }`}
                      >
                        {t.t}
                      </a>
                      {subs.length > 0 && (
                        <ul className="mobile-sublist">
                          {subs.map(([slug, title]) => (
                            <li key={slug}>
                              <a
                                href={`/procedures/${t.slug}/${slug}`}
                                className={activePage === `treatment-${slug}` ? 'active' : ''}
                              >
                                {title}
                              </a>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          <div className="mobile-menu-section">
            <button
              type="button"
              className={`mobile-menu-head ${mobileSurgeonsOpen ? 'open' : ''}`}
              onClick={() => setMobileSurgeonsOpen((o) => !o)}
            >
              <span>Experts</span>
              <span className="mobile-chev">{mobileSurgeonsOpen ? '−' : '+'}</span>
            </button>
            {mobileSurgeonsOpen && (
              <div className="mobile-submenu">
                <a href="/experts" className="mobile-submenu-all">
                  All doctors →
                </a>
                {surgeonCols.map((col) => (
                  <div key={col.group} className="mobile-discipline">
                    <a href={`/experts#${col.anchor}`} className="mobile-discipline-head">
                      {col.label}
                    </a>
                    <ul className="mobile-sublist">
                      {SURGEON_LIST.filter((s) => s.group === col.group).map((s) => (
                        <li key={s.slug}>
                          <a
                            href={`/experts/${s.slug}`}
                            className={activePage === `surgeon-${s.slug}` ? 'active' : ''}
                          >
                            {s.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mobile-menu-links">
            <a
              href="/results"
              className={
                activePage === 'gallery' || activePage === 'stories' || activePage === 'results'
                  ? 'active'
                  : ''
              }
            >
              Results
            </a>
          </div>

          <div className="mobile-menu-links">
            <a href="/pricing" className={activePage === 'pricing' ? 'active' : ''}>
              Pricing
            </a>
            <a href="/journey" className={activePage === 'journey' ? 'active' : ''}>
              Your Journey
            </a>
            <a href="/contact" className={activePage === 'contact' ? 'active' : ''}>
              Contact
            </a>
          </div>

          {localeSwitcher?.enabled !== false ? (
            <div className="mobile-menu-lang">
              {(
                [
                  ['EN', labelEn],
                  ['ID', labelId],
                ] as const
              ).map(([code, label]) => (
                <button
                  key={code}
                  type="button"
                  className={`mobile-lang-pill ${lang === code ? 'active' : ''}`}
                  onClick={() => setLang(code)}
                >
                  {label}
                </button>
              ))}
            </div>
          ) : null}

          <a
            href={ctaHref}
            className="btn btn-accent"
            style={{ width: '100%', justifyContent: 'center', marginTop: 24 }}
          >
            <span>{ctaLabel}</span>
            <span className="btn-arrow">→</span>
          </a>
        </div>
      </div>
    </header>
  )
}
