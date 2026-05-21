import React from 'react'

/**
 * No-op — suppresses Payload's default admin wordmark. The brand mark
 * is rendered via CosmedicIcon (breadcrumb) and CosmedicBeforeLogin
 * (login hero). Returning anything here causes a duplicate on the
 * login screen.
 */
const CosmedicLogo: React.FC = () => null

export default CosmedicLogo
