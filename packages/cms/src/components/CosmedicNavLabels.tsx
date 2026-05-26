'use client'

/**
 * CosmedicNavLabels — injects "COLLECTIONS" and "GLOBALS" sub-labels into
 * each bucket group in the Payload admin sidebar.
 *
 * Why client-side DOM injection? Payload 3.x nav is rendered by DefaultNavClient
 * (a 'use client' React component). The only extension points that run INSIDE
 * the nav wrapper are beforeNavLinks / afterNavLinks — but both are outside the
 * individual group markup. To place separators *within* a group (between the
 * last collection link and the first global link), we have to manipulate the
 * existing DOM nodes post-mount.
 *
 * The first global in every multi-type bucket is well-known (it's always the
 * "Main" page global, registered right after the bucket's collections in
 * payload.config.ts). We target it by id and prepend a separator element.
 *
 * Registered as admin.components.afterNavLinks so it mounts alongside the nav.
 */

import React, { useEffect } from 'react'

/**
 * IDs of the first global link in each bucket that also has collections.
 * Nav link id pattern: `nav-global-{global-slug}`.
 * Homepage has no collections → no separator needed there.
 */
const FIRST_GLOBALS = [
  'treatments-page',  // Treatments bucket (after Disciplines / SubCategories / Procedures)
  'surgeons-page',    // Doctors bucket    (after Surgeons)
  'results-page',     // Results bucket    (after BeforeAfterCases / Stories)
  'pricing-page',     // Pricing bucket    (after ClinicCatalogueItems)
  'journey-page',     // Journey bucket    (after JourneySteps / RecoveryStays)
  'contact-page',     // Contact bucket    (after Enquiries)
  'blog-page',        // About bucket      (after BlogPosts / BlogTags / Authors / PressMentions / Awards / PrivacySections)
] as const

/**
 * IDs of the first nav link in each bucket that HAS collections.
 * Nav link id pattern: `nav-{collection-slug}`.
 */
const FIRST_COLLECTIONS = [
  'disciplines',            // Treatments bucket
  'surgeons',               // Doctors bucket
  'before-after-cases',     // Results bucket
  'clinic-catalogue-items', // Pricing bucket
  'journey-steps',          // Journey bucket
  'enquiries',              // Contact bucket (Payload pluralises to "enquiries")
  'blog-posts',             // About bucket
] as const

const SEP_CLASS = 'cosmedic-nav-sep'

function injectSeparators() {
  // Remove any previously injected separators to avoid duplicates on re-runs.
  document.querySelectorAll(`.${SEP_CLASS}`).forEach((el) => el.remove())

  // "GLOBALS" separator — insert before the first global in each multi-type group.
  for (const slug of FIRST_GLOBALS) {
    const el = document.getElementById(`nav-global-${slug}`)
    if (!el?.parentNode) continue
    const sep = makeSep('Globals')
    el.parentNode.insertBefore(sep, el)
  }

  // "COLLECTIONS" label — insert before the first collection in each such group.
  for (const slug of FIRST_COLLECTIONS) {
    const el = document.getElementById(`nav-${slug}`)
    if (!el?.parentNode) continue
    const sep = makeSep('Collections')
    el.parentNode.insertBefore(sep, el)
  }
}

function makeSep(text: string): HTMLElement {
  const el = document.createElement('div')
  el.className = SEP_CLASS
  el.setAttribute('aria-hidden', 'true')
  el.textContent = text
  return el
}

const CosmedicNavLabels: React.FC = () => {
  useEffect(() => {
    injectSeparators()

    // Re-inject after any nav DOM changes (group collapse/expand, route changes).
    const nav = document.querySelector('.nav__wrap') ?? document.querySelector('[class*="nav"]')
    if (!nav) return
    const observer = new MutationObserver(() => injectSeparators())
    observer.observe(nav, { childList: true, subtree: true })
    return () => observer.disconnect()
  }, [])

  // The style tag is inert during SSR; it activates when the client hydrates.
  return (
    <style>{`
      .cosmedic-nav-sep {
        padding: 0.2rem 0.75rem 0.1rem;
        margin-top: 0.45rem;
        font-family: "JetBrains Mono", ui-monospace, monospace;
        font-size: 0.53rem;
        font-weight: 600;
        letter-spacing: 0.16em;
        text-transform: uppercase;
        color: var(--theme-elevation-400);
        border-top: 1px solid var(--theme-elevation-100);
        pointer-events: none;
        user-select: none;
      }
      /* No top border on the very first label inside a group */
      .nav-group__content > .cosmedic-nav-sep:first-child {
        border-top: none;
        margin-top: 0;
      }
    `}</style>
  )
}

export default CosmedicNavLabels
