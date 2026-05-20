import React from 'react'

export const App: React.FC = () => (
  <main
    style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Georgia, serif',
      background: '#f4efe6',
      color: '#1f1b16',
      padding: '2rem',
      textAlign: 'center',
    }}
  >
    <h1 style={{ fontSize: '3rem', fontWeight: 500, margin: 0, letterSpacing: '0.02em' }}>
      BIMC CosMedic
    </h1>
    <p style={{ marginTop: '1rem', fontSize: '1.125rem', opacity: 0.7 }}>
      Coming soon — a new editorial home for our plastic surgery & aesthetic medicine clinic in
      Nusa Dua, Bali.
    </p>
  </main>
)
