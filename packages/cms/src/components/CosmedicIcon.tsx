import React from 'react'

/**
 * Compact mark for the collapsed admin nav.
 * Pure-text "C" wordmark in Cormorant Garamond on brand bronze — avoids the
 * cropping/clipping that occurs when a multi-character image is rendered
 * into Payload's 32×32 nav slot.
 */
const CosmedicIcon: React.FC = () => (
  <span
    aria-label="Cosmedic CMS"
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 32,
      height: 32,
      borderRadius: 6,
      background: '#A67C52',
      color: '#F4EFE6',
      fontFamily: '"Cormorant Garamond", Georgia, serif',
      fontWeight: 500,
      fontSize: 22,
      lineHeight: 1,
      letterSpacing: 0,
    }}
  >
    C
  </span>
)

export default CosmedicIcon
