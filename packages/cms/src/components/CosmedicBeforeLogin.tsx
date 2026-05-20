import React from 'react'

/**
 * Login-page hero for Cosmedic CMS.
 *
 * Centred via explicit `marginInline: auto` + `width: 100%` because Payload's
 * default login wrapper does not always centre its `beforeLogin` slot when
 * the parent container has a constrained max-width.
 *
 * Stacked layout per brand.pdf §I:
 *   1. BIMC CosMedic lockup mark (bronze on light)
 *   2. "Cosmedic CMS" wordmark in Cormorant Garamond
 *   3. Mono endorsement tagline in JetBrains Mono with +22% tracking
 */
const CosmedicBeforeLogin: React.FC = () => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      width: '100%',
      maxWidth: 420,
      marginInline: 'auto',
      marginBottom: '2.5rem',
      gap: '1.25rem',
      padding: '0 1rem',
    }}
  >
    <img
      src="/cosmedic-mark-on-light.png"
      alt="BIMC CosMedic"
      style={{
        width: 'min(220px, 70%)',
        height: 'auto',
        display: 'block',
        marginInline: 'auto',
      }}
    />
    <h1
      style={{
        margin: 0,
        width: '100%',
        textAlign: 'center',
        fontFamily: '"Cormorant Garamond", Georgia, serif',
        fontWeight: 500,
        fontSize: '2.4rem',
        lineHeight: 1.1,
        letterSpacing: '0.02em',
        color: 'var(--theme-text)',
      }}
    >
      Cosmedic CMS
    </h1>
    <p
      style={{
        margin: 0,
        width: '100%',
        textAlign: 'center',
        fontFamily: '"JetBrains Mono", ui-monospace, monospace',
        fontSize: '0.72rem',
        fontWeight: 500,
        letterSpacing: '0.22em',
        textTransform: 'uppercase',
        color: 'var(--theme-elevation-500)',
      }}
    >
      Managed by BIMC Hospital · Nusa Dua · Bali
    </p>
  </div>
)

export default CosmedicBeforeLogin
