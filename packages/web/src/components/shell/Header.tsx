import React, { useEffect, useRef, useState } from 'react'
import { TREATMENT_LIST, SUBCATEGORIES_BY_DISCIPLINE, SURGEON_LIST } from '@/content/seed'

type Props = {
  activePage?: string
}

export const Header: React.FC<Props> = ({ activePage = '' }) => {
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

  const surgeonCols = [
    { key: 'surgical', label: 'Surgical Doctors', group: 'Plastic Surgery', anchor: 'surgical' },
    { key: 'aesthetic', label: 'Aesthetic Doctors', group: 'Aesthetic Medicine', anchor: 'aesthetic' },
  ] as const

  return (
    <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-inner">
        <a href="/" className="logo">
          <img src="/assets/logo.png" alt="BIMC CosMedic — Managed by BIMC Hospital" />
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
              href="/treatments"
              className={activePage.startsWith('treatment') ? 'active' : ''}
            >
              Treatments
            </a>
            <div className="dropdown-panel dropdown-panel-wide">
              <div className="dropdown-panel-grid">
                {TREATMENT_LIST.map((t) => {
                  const subs = SUBCATEGORIES_BY_DISCIPLINE[t.slug] || []
                  return (
                    <div key={t.slug} className="dropdown-discipline">
                      <a
                        href={`/treatment-${t.slug}`}
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
                              href={`/treatment-${slug}`}
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
              href="/surgeons"
              className={activePage.startsWith('surgeon') ? 'active' : ''}
            >
              Doctors
            </a>
            <div className="dropdown-panel dropdown-panel-wide">
              <div className="dropdown-panel-grid dropdown-panel-grid-2col">
                {surgeonCols.map((col) => (
                  <div key={col.key} className="dropdown-discipline">
                    <a href={`/surgeons#${col.anchor}`} className="dropdown-discipline-head">
                      <span>{col.label}</span>
                    </a>
                    <ul className="dropdown-sublist">
                      {SURGEON_LIST.filter((s) => s.group === col.group).map((s) => (
                        <li key={s.slug}>
                          <a
                            href={`/surgeon-${s.slug}`}
                            className={activePage === `surgeon-${s.slug}` ? 'active' : ''}
                          >
                            {s.title} {s.name}
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
          <div className="lang-switcher">
            {(['EN', 'ID'] as const).map((l) => (
              <button
                key={l}
                className={`lang-pill ${lang === l ? 'active' : ''}`}
                onClick={() => setLang(l)}
              >
                {l}
              </button>
            ))}
          </div>
          <a href="/contact" className="header-cta">
            <span>Plan Your Treatment</span>
            <span className="btn-arrow">→</span>
          </a>
          <button
            type="button"
            className={`burger-btn ${mobileOpen ? 'open' : ''}`}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((o) => !o)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <div className={`mobile-menu ${mobileOpen ? 'open' : ''}`} aria-hidden={!mobileOpen}>
        <div className="mobile-menu-inner">
          <div className="mobile-menu-section">
            <button
              type="button"
              className={`mobile-menu-head ${mobileTreatmentsOpen ? 'open' : ''}`}
              onClick={() => setMobileTreatmentsOpen((o) => !o)}
            >
              <span>Treatments</span>
              <span className="mobile-chev">{mobileTreatmentsOpen ? '−' : '+'}</span>
            </button>
            {mobileTreatmentsOpen && (
              <div className="mobile-submenu">
                <a href="/treatments" className="mobile-submenu-all">
                  All treatments →
                </a>
                {TREATMENT_LIST.map((t) => {
                  const subs = SUBCATEGORIES_BY_DISCIPLINE[t.slug] || []
                  return (
                    <div key={t.slug} className="mobile-discipline">
                      <a
                        href={`/treatment-${t.slug}`}
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
                                href={`/treatment-${slug}`}
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
              <span>Doctors</span>
              <span className="mobile-chev">{mobileSurgeonsOpen ? '−' : '+'}</span>
            </button>
            {mobileSurgeonsOpen && (
              <div className="mobile-submenu">
                <a href="/surgeons" className="mobile-submenu-all">
                  All doctors →
                </a>
                {surgeonCols.map((col) => (
                  <div key={col.group} className="mobile-discipline">
                    <a href={`/surgeons#${col.anchor}`} className="mobile-discipline-head">
                      {col.label}
                    </a>
                    <ul className="mobile-sublist">
                      {SURGEON_LIST.filter((s) => s.group === col.group).map((s) => (
                        <li key={s.slug}>
                          <a
                            href={`/surgeon-${s.slug}`}
                            className={activePage === `surgeon-${s.slug}` ? 'active' : ''}
                          >
                            {s.title} {s.name}
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

          <div className="mobile-menu-lang">
            {(['EN', 'ID'] as const).map((l) => (
              <button
                key={l}
                type="button"
                className={`mobile-lang-pill ${lang === l ? 'active' : ''}`}
                onClick={() => setLang(l)}
              >
                {l}
              </button>
            ))}
          </div>

          <a
            href="/contact"
            className="btn btn-accent"
            style={{ width: '100%', justifyContent: 'center', marginTop: 24 }}
          >
            <span>Plan Your Treatment</span>
            <span className="btn-arrow">→</span>
          </a>
        </div>
      </div>
    </header>
  )
}
