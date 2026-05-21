import React from 'react'

/**
 * Wordmark for the admin nav header.
 *
 * Renders "COSMEDIC" as an SVG locked to the slot height; width grows
 * naturally with the text so the wordmark stays legible at whatever size
 * Payload allocates. preserveAspectRatio="xMinYMid meet" anchors to the
 * left edge so it doesn't drift on resize.
 */
const CosmedicIcon: React.FC = () => (
  <svg
    role="img"
    aria-label="Cosmedic CMS"
    viewBox="0 0 160 32"
    xmlns="http://www.w3.org/2000/svg"
    style={{ width: 'auto', height: '100%', maxHeight: 32, display: 'block' }}
    preserveAspectRatio="xMinYMid meet"
  >
    <text
      x="0"
      y="22"
      fontFamily='"Cormorant Garamond", Georgia, serif'
      fontWeight="500"
      fontSize="22"
      letterSpacing="2.2"
      fill="#A67C52"
    >
      COSMEDIC
    </text>
  </svg>
)

export default CosmedicIcon
