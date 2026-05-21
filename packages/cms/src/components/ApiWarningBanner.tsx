'use client'
import React from 'react'

/**
 * Developer-only warning banner.
 *
 * Rendered as a UI field at the top of every collection + global edit form,
 * directly below Payload's "Edit / API" doc-controls bar. The "API" button
 * exposes the raw JSON representation of the record — clinic editors should
 * never need it; modifying via that route bypasses validation/revalidation.
 */
const ApiWarningBanner: React.FC = () => (
  <div
    role="note"
    aria-label="Developer-only warning"
    style={{
      width: '100%',
      marginBottom: '1.5rem',
      padding: '0.9rem 1rem',
      borderLeft: '3px solid #A67C52',
      background: 'rgba(166, 124, 82, 0.08)',
      color: 'var(--theme-text)',
      fontFamily: '"JetBrains Mono", ui-monospace, monospace',
      fontSize: '0.72rem',
      letterSpacing: '0.04em',
      lineHeight: 1.55,
    }}
  >
    <div
      style={{
        fontSize: '0.62rem',
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        color: '#A67C52',
        fontWeight: 600,
        marginBottom: '0.35rem',
      }}
    >
      ⚠ Developer-only · API access
    </div>
    <div>
      The <strong>API</strong> button above exposes the raw JSON view of this
      record and is intended for external integrations or future AI
      functionality. <strong>Only developers should modify records through the
      API</strong> — editing via the JSON view bypasses field validation,
      cache revalidation, and email hooks. Clinic editors should always use
      the form below.
    </div>
  </div>
)

export default ApiWarningBanner
