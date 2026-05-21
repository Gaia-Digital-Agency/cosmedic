import React from 'react'

/**
 * Admin user avatar for Cosmedic CMS.
 *
 * Replaces Payload's default Gravatar fallback with an inline SVG stethoscope
 * on the brand-bronze palette — recognisable medical mark, scales cleanly
 * to whatever size Payload's avatar slot allocates (top-right user menu,
 * audit-log rows, etc.).
 */
const CosmedicUserAvatar: React.FC = () => (
  <svg
    role="img"
    aria-label="Clinic admin"
    viewBox="0 0 40 40"
    xmlns="http://www.w3.org/2000/svg"
    style={{ width: '100%', height: '100%', display: 'block', maxWidth: 40, maxHeight: 40, borderRadius: '50%' }}
    preserveAspectRatio="xMidYMid meet"
  >
    <circle cx="20" cy="20" r="20" fill="#A67C52" />
    {/* Stethoscope: two earpieces (top), tubes converging, chestpiece (bottom) */}
    <g
      fill="none"
      stroke="#F4EFE6"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Left earpiece tube */}
      <path d="M13 11 V18 C13 22, 17 24, 20 24" />
      {/* Right earpiece tube */}
      <path d="M27 11 V18 C27 22, 23 24, 20 24" />
      {/* Earpiece tips */}
      <circle cx="13" cy="11" r="1.4" fill="#F4EFE6" />
      <circle cx="27" cy="11" r="1.4" fill="#F4EFE6" />
      {/* Vertical tube from junction down to chestpiece */}
      <path d="M20 24 V29" />
      {/* Chestpiece (bell) */}
      <circle cx="20" cy="31" r="3" fill="#F4EFE6" stroke="#F4EFE6" />
      <circle cx="20" cy="31" r="1.6" fill="#A67C52" stroke="none" />
    </g>
  </svg>
)

export default CosmedicUserAvatar
