import React from 'react'

/**
 * Admin header logo — rendered in the top-left nav slot and wrapped in an
 * <a href="/admin"> link by Payload automatically (becomes the "home" link).
 *
 * Uses the brand mark on a light background + the CMS name as text so the
 * link target is visually clear to clinic editors.
 *
 * NOTE: Previously returned null to avoid a duplicate on the login screen.
 * Payload v3 renders Logo + Icon in separate slots; Logo here is header-only,
 * Icon (CosmedicIcon.tsx) is the breadcrumb/collapsed-nav mark.
 */
const CosmedicLogo: React.FC = () => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      padding: '2px 0',
      textDecoration: 'none',
    }}
  >
    <img
      src="/cosmedic-mark-on-light.png"
      alt="BIMC CosMedic"
      width={28}
      height={28}
      style={{
        width: 28,
        height: 28,
        objectFit: 'contain',
        display: 'block',
        flexShrink: 0,
      }}
    />
    <span
      style={{
        fontFamily: '"Cormorant Garamond", Georgia, serif',
        fontSize: '15px',
        fontWeight: 600,
        letterSpacing: '0.04em',
        color: 'var(--theme-text, #2a2217)',
        lineHeight: 1,
        whiteSpace: 'nowrap',
      }}
    >
      Cosmedic CMS
    </span>
  </div>
)

export default CosmedicLogo
