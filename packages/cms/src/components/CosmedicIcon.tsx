import React from 'react'

/**
 * Compact brand mark for Payload's admin breadcrumb / collapsed-nav slot.
 *
 * Uses the canonical BIMC CosMedic mark (medical cross + profile
 * silhouette) cropped from the wide lockup. Sized larger than Payload's
 * default 24-28px slot via explicit height/width so it reads clearly,
 * with maxWidth/maxHeight guards so it never overflows.
 */
const CosmedicIcon: React.FC = () => (
  <img
    src="/cosmedic-mark-32.png"
    alt="BIMC CosMedic"
    width={36}
    height={36}
    style={{
      width: 36,
      height: 36,
      maxWidth: '100%',
      maxHeight: '100%',
      display: 'block',
      objectFit: 'contain',
    }}
  />
)

export default CosmedicIcon
