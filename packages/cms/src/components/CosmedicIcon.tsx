import React from 'react'

/**
 * Compact wordmark for Payload's admin breadcrumb / collapsed-nav slot.
 *
 * Intrinsic dimensions ~110×22 — narrow enough to fit Payload's breadcrumb
 * row at default font size without forcing horizontal scroll. Scales down
 * via maxWidth:100% when the slot is narrower.
 */
const CosmedicIcon: React.FC = () => (
  <svg
    role="img"
    aria-label="Cosmedic"
    viewBox="0 0 110 22"
    width="110"
    height="22"
    xmlns="http://www.w3.org/2000/svg"
    style={{ display: 'block', maxWidth: '100%', height: 'auto' }}
    preserveAspectRatio="xMinYMid meet"
  >
    <text
      x="0"
      y="16"
      fontFamily='"Cormorant Garamond", Georgia, "Times New Roman", serif'
      fontWeight="500"
      fontSize="16"
      letterSpacing="1.6"
      fill="#A67C52"
    >
      COSMEDIC
    </text>
  </svg>
)

export default CosmedicIcon
