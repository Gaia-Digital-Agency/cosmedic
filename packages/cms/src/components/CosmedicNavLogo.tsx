'use client'
import React from 'react'
import Link from 'next/link'

// Brand mark embedded as base64 — rendered at the top of the admin sidebar nav.
// This is the correct slot for the logo in Payload v3: beforeNav renders inside
// the sidebar NavWrapper, above all nav links, visible on every admin page.
// (graphics.Logo is login-page-only in Payload v3 — NOT shown in the dashboard nav.)
const MARK = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAIGNIUk0AAHomAACAhAAA+gAAAIDoAAB1MAAA6mAAADqYAAAXcJy6UTwAAAEUUExURfTv5vLt5J6VjHVqYXdsY62knPHs42ZbUSIUCiYYDntuZmhcUyQWDCgaEHtuZ3tvZ+/q4WdcUnptZvLs4/Pu5TwuJUI0K2dcU2leVb63rScZD6SckiweFCocEqWdlHFlXK2kmy8iGCUXDVhMQuTe1ca+tTAiGCkbEaadlPj06+Ha0k1ANicaDycYDjYpH9DJwPbx6PXw55mPhjUmHWNWTtrUy+Xf1l1RSFFFO8e/t8W9tXtwZ97Yz5WLgtHKwTYoHyMVC66knJyTitfQyIF0bX1waY+FfPTu5iYXDvfz6oF3befh2Pfy6SweFVFEO31yaaqhmODa0XxxaPPt5E5COOXf1zUnHcnCuZaLg/by6dzVzdjRyM7QnFMAAAABYktHRACIBR1IAAAAB3RJTUUH6gUVACwLes8IvwAAAk96VFh0UmF3IHByb2ZpbGUgdHlwZSB4bXAAADiNjVVLluMgDNzrFHMErC8+jhOb3bw3yzn+lETS+bSnu82LMSBUpZIg9Pf3H/qVT/QgucpA33xx8YtbKDdnNw9f/ZCd+RiXy2UwY351zRkLMd2l6R5NBbbdV9IeW2CjSWx6mDp6OBTBJmYZcnCTa3TZojs2+p5gvnDLsV/9CMk1SgSwUR/JQ7a58GFeTB5uMHfJHfqxg5t13a0RJ7kRNSWLND7w28GoZcNcyMoHQmJpAIIxGlb5ijXM4Wc8ZCFhdA3Ge01ucLbgzSLc3hrfwmSwcdmMVdXvIdItxrmYYfZQtCYbwhpRDx8BI/BK5pH4smYrCkmEhYn36QS9BPKUykRHcADA+hsLUEDKkBD2tRRboRQsgmkaQG4GHgROVlPg55yk0J/5FtgxU0Wl/AEFh+8IpYNPS/Il+jh3qTuq6M0tvfr92i0c7ifOJdQQmp2J/HPnWeQBveCIh3FJmBoxNliOIb/csdO9psAGJ5q5swQYfn0UJ92qs+G8jDKS+mpVbki8oFIYtVtncWa1bHh9wKRmBKxclky7ZwCmq1buphGCWuuwgpNyHkWUoeiiIqosrlnAizrhBeQamFhWtKbNgtAX6SiZ9opctTTgz/I8JsMJTE/Ieoqsr8j/A6Zn5PuV8YJuVcUOdAzwnblrM+WV8a2UE/peG0CZdPBI6I4zdsqQvtHmGflUmzswPbR5RYa7H2lzB6ZCvl2oPL4+5e9W80aas5RF/34fz6WTPwWENK//4Hmf0z9WdW8R/C7pTQAAAStJREFUOMvdkulWwjAQRqe0lgZaEIgFBosaRXBv3DfcFVfc9/d/D6FNqR6SPoD3V84390xyZgIQoaV0Q6CPgAQzbRGBlZEKWdsR2Ll/IeR/5ZopGC3EQrEUpRRS6WxIYYxEAnFFVq5UQbdswaCOhEQZ1sAY5IO6446jOHr1YQFxYnIqSWDTM43ZBAGbrbn5BaYUFpeWV3y+6qBKIGvrG5xvbjGFgN72jgbU3w2HMiQg7u0DUADebqIQ/gwKmaH169Q/ODwSgzrO5ALyRZf0Opz4wYb46VmQnjfirZV620R2EQpAO9J142X7qn8FqP4DkusbuOVUKTh4171/eJQ3CX8UMhufntUdgm29vCYL+Pbud2RC2cYQ8vEpe4RZQS/E6X5xiUCrtbqg9R0LP3HHMYxTawSHAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAABJRU5ErkJggg=='

const CosmedicNavLogo: React.FC = () => (
  <Link
    href="/admin"
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      padding: '16px 20px 12px',
      textDecoration: 'none',
      borderBottom: '1px solid var(--theme-border-color, rgba(0,0,0,0.08))',
      marginBottom: '8px',
    }}
  >
    <img
      src={MARK}
      alt="BIMC CosMedic"
      width={28}
      height={28}
      style={{ width: 28, height: 28, display: 'block', flexShrink: 0 }}
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
  </Link>
)

export default CosmedicNavLogo
