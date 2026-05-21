import React from 'react'
// Bundle the admin theme CSS via Next.js's CSS loader. The brand palette,
// font overrides, and image-upload-field border styling all flow from this
// single file; loading it from an admin component guarantees it ships with
// the Payload admin bundle regardless of which admin page renders first.
import '../styles/admin-theme.css'

/**
 * Login-page hero for Cosmedic CMS.
 *
 * Stacked layout per brand.pdf section I:
 *   1. BIMC CosMedic lockup mark
 *   2. "Cosmedic CMS" wordmark in Cormorant Garamond
 *   3. Mono endorsement tagline
 *   4. Pre-launch sign-in helper (bootstrap credentials)
 *
 * The sign-in helper card is dev/pre-launch convenience only. Per
 * docs/plan.md phase 12 step 2, the bootstrap super-admin password
 * (Teameditor@123) gets rotated before clinic editor handover — this
 * component will be edited to remove the helper at the same time.
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
    {/* Login page only — full BIMC CosMedic lockup (plus + wordmark +
        endorsement). Everywhere else in the admin uses just the plus
        mark (CosmedicIcon, favicons). */}
    <img
      src="/cosmedic-mark-on-light.png"
      alt="BIMC CosMedic — Managed by BIMC Hospital"
      style={{
        width: 'min(260px, 75%)',
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
        fontSize: 'clamp(1.2rem, 4.8vw, 1.7rem)',
        lineHeight: 1.2,
        letterSpacing: '0.01em',
        color: 'var(--theme-text)',
        whiteSpace: 'nowrap',
      }}
    >
      Content Management System
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

    {showHelper ? (
    /* Pre-launch sign-in helper — bootstrap super-admin credentials.
       Hidden by setting `PAYLOAD_SHOW_SIGNIN_HELPER=false` in the cms
       env after Phase 12.2 password rotation. */
    <div
      role="note"
      style={{
        width: '100%',
        marginTop: '0.5rem',
        padding: '0.85rem 1rem',
        borderRadius: 8,
        border: '1px solid var(--theme-elevation-100)',
        background: 'var(--theme-elevation-50)',
        color: 'var(--theme-text)',
        fontFamily: '"JetBrains Mono", ui-monospace, monospace',
        fontSize: '0.7rem',
        letterSpacing: '0.04em',
        textAlign: 'left',
        lineHeight: 1.5,
      }}
    >
      <div
        style={{
          fontSize: '0.62rem',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'var(--theme-elevation-500)',
          marginBottom: '0.4rem',
        }}
      >
        Pre-launch · super_admin
      </div>
      <div>
        <span style={{ color: 'var(--theme-elevation-500)' }}>email&nbsp;</span>
        super_admin@email.com
      </div>
      <div>
        <span style={{ color: 'var(--theme-elevation-500)' }}>pass&nbsp;&nbsp;</span>
        Teameditor@123
      </div>
    </div>
    ) : null}
  </div>
)

// SSR-side env check. Defaults to ON so dev/pre-launch keep working;
// flip `PAYLOAD_SHOW_SIGNIN_HELPER=false` in cms .env after rotating
// the bootstrap password (Phase 12.2).
const showHelper = (process.env.PAYLOAD_SHOW_SIGNIN_HELPER ?? 'true') !== 'false'

export default CosmedicBeforeLogin
