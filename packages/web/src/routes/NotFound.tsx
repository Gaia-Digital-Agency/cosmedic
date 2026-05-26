import React from 'react'
import { PageShell } from '@/components/shell/PageShell'
import { Btn } from '@/components/primitives/Btn'
import { Eyebrow } from '@/components/primitives/Mono'
import { useCms } from '@/lib/cms-context'

export const NotFound: React.FC = () => {
  const cms = useCms()
  const g = cms?.notFoundPage

  return (
    <PageShell hideCTA>
      <section
        style={{
          minHeight: 'calc(100vh - 320px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: 'clamp(72px, 10vw, 160px) var(--page-x)',
          gap: 24,
        }}
      >
        <Eyebrow>{g?.eyebrow || 'Error · 404'}</Eyebrow>
        <h1 className="display" style={{ fontSize: 'clamp(56px, 8vw, 120px)' }}>
          <span className="line">{g?.headingA || 'Page'}</span>
          <span className="line italic">{g?.headingB || 'not found.'}</span>
        </h1>
        <p className="section-lede">
          {g?.lede ||
            'The page you were looking for has moved or never existed. Return to the homepage, or contact our concierge if you were sent this link by mistake.'}
        </p>
        <div style={{ display: 'flex', gap: 16 }}>
          <Btn kind="primary" as="a" href={g?.primaryBtnHref || '/'}>
            {g?.primaryBtnLabel || 'Return to homepage'}
          </Btn>
          <Btn kind="ghost" as="a" href={g?.secondaryBtnHref || '/contact'}>
            {g?.secondaryBtnLabel || 'Speak with a concierge'}
          </Btn>
        </div>
      </section>
    </PageShell>
  )
}
