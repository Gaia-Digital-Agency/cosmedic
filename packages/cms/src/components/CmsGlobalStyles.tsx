'use client'
import React from 'react'

/**
 * Global style injections for Cosmedic CMS admin.
 *
 * Mounted once as a Payload `providers` component so the styles apply
 * to every route in the admin without repeating them per-collection.
 *
 * Current rules:
 *  - Hide the built-in "API" tab on all document edit views (collections +
 *    globals). Editors should never need the raw JSON view; developers can
 *    still access the REST API directly via the /api/* endpoints.
 */
export default function CmsGlobalStyles({ children }: { children?: React.ReactNode }) {
  return (
    <>
      <style>{`
        /* ── Hide Payload built-in API tab ─────────────────────────────── */
        /* Targets the "API" pill in the doc-controls tab bar.              */
        /* Selector covers both the anchor variant and the button variant.  */
        .doc-controls__tabs a[href$="/api"],
        .doc-controls__tabs a[href*="/api?"],
        .doc-controls__tab--api,
        [class*="doc-controls"] a[aria-label="API"],
        [class*="doc-controls"] button[aria-label="API"] {
          display: none !important;
        }
      `}</style>
      {children}
    </>
  )
}
