import React from 'react'

const CosmedicBeforeLogin: React.FC = () => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginBottom: '2rem',
      gap: '1.1rem',
    }}
  >
    <h1
      style={{
        margin: 0,
        fontFamily: '"Cormorant Garamond", Georgia, serif',
        fontWeight: 500,
        fontSize: '2.4rem',
        letterSpacing: '0.02em',
        color: 'var(--theme-text)',
      }}
    >
      Cosmedic CMS
    </h1>
    <img
      src="/cosmedic-mark-on-light.png"
      alt="BIMC CosMedic"
      style={{ width: '180px', height: 'auto', display: 'block' }}
    />
    <p
      style={{
        margin: 0,
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
