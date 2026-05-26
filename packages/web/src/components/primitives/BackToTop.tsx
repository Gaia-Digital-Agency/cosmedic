import React, { useEffect, useState } from 'react'

/**
 * Floating "back to top" button.
 * Appears after the user scrolls past 600px. Smooth-scrolls to top on click.
 * Positioned bottom-right, above the FloatingChrome CTA pill (which uses
 * z-index 50) by sitting at z-index 45 with a slight offset so they don't
 * overlap.
 */
export const BackToTop: React.FC = () => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = (): void => setVisible(window.scrollY > 600)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollUp = (): void => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Phase N2: size + shadow shape match the WhatsApp FAB (.chat-fab) so
  // the two buttons read as a paired chrome cluster. Colour identity stays
  // brown/cream (matches the editorial theme); the WA FAB stays green.
  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={scrollUp}
      style={{
        position: 'fixed',
        // bottom: 160 = 94 (AskDoctor bottom) + 54 (AskDoctor height) + 12 (gap).
        // Stack from bottom: WhatsApp (28) → AskDoctor (94) → BackToTop (160).
        right: 28,
        bottom: 160,
        width: 54,
        height: 54,
        borderRadius: '50%',
        border: '1px solid var(--accent)',
        background: 'var(--paper)',
        color: 'var(--accent-deep)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        boxShadow: visible ? '0 8px 28px rgba(31,27,22,0.22)' : 'none',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(8px)',
        pointerEvents: visible ? 'auto' : 'none',
        transition: 'opacity 220ms ease, transform 220ms ease, box-shadow 220ms ease',
        zIndex: 45,
        fontFamily: 'var(--font-mono)',
      }}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M8 13V3" />
        <path d="M3.5 7.5L8 3l4.5 4.5" />
      </svg>
    </button>
  )
}
