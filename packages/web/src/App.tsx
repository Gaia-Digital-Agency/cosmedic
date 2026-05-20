import React from 'react'
import './styles/globals.css'
import { PageShell } from '@/components/shell/PageShell'

export const App: React.FC = () => (
  <PageShell activePage="home">
    <section
      style={{
        minHeight: 'calc(100vh - 200px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: 'clamp(72px, 10vw, 160px) var(--page-x)',
        gap: 24,
      }}
    >
      <span className="mono">Phase 2 — chrome live</span>
      <h1 className="display">
        <span className="line">Coming</span>
        <span className="line italic">soon.</span>
      </h1>
      <p className="section-lede">
        The Phase 2 chrome (Header · Footer · FloatingChrome) is now porting from the Claude
        Design source. Homepage and detail pages arrive in Phase 3.
      </p>
    </section>
  </PageShell>
)
