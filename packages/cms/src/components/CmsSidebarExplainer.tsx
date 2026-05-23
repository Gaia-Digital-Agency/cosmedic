import React from 'react'

/**
 * Sidebar explainer banner — renders above the admin nav via
 * `admin.components.beforeNavLinks`.
 *
 * Editors hear "Collection" and "Global" and freeze. One short block at the
 * top of the sidebar removes that friction. Per docs/cms_custom_change.md
 * step 5.
 */
const CmsSidebarExplainer: React.FC = () => (
  <div
    role="note"
    aria-label="Collections vs Globals"
    style={{
      margin: '0.5rem 0.75rem 1rem',
      padding: '0.65rem 0.8rem',
      borderRadius: 6,
      border: '1px solid var(--theme-elevation-100)',
      background: 'var(--theme-elevation-50)',
      fontFamily: '"JetBrains Mono", ui-monospace, monospace',
      fontSize: '0.62rem',
      lineHeight: 1.55,
      letterSpacing: '0.02em',
      color: 'var(--theme-text)',
    }}
  >
    <div
      style={{
        fontSize: '0.58rem',
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        color: 'var(--theme-elevation-500)',
        marginBottom: '0.4rem',
      }}
    >
      About this sidebar
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', columnGap: '0.5rem', rowGap: '0.25rem' }}>
      <span style={{ color: 'var(--theme-elevation-500)' }}>Collections</span>
      <span>many of the same thing</span>
      <span style={{ color: 'var(--theme-elevation-500)' }}></span>
      <span style={{ color: 'var(--theme-elevation-450)' }}>(e.g. 8 Doctors · all Before/After cases)</span>
      <span style={{ color: 'var(--theme-elevation-500)' }}>Globals</span>
      <span>one-of-a-kind</span>
      <span style={{ color: 'var(--theme-elevation-500)' }}></span>
      <span style={{ color: 'var(--theme-elevation-450)' }}>(e.g. the Header · the Home page hero)</span>
    </div>
  </div>
)

export default CmsSidebarExplainer
