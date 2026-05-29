'use client'

/**
 * CosmedicNavLabels — three jobs:
 *
 * 1. Reorder nav bucket groups to the canonical sequence:
 *    Homepage · Treatments · Experts · Results · Journey · About · Contact
 *
 * 2. Inject "COLLECTIONS" / "GLOBALS" sub-labels within each multi-type group.
 *
 * 3. Apply dark-brown / cream styling to global nav items so editors can
 *    instantly distinguish site-wide settings (globals) from record lists
 *    (collections).
 *
 * All three jobs use post-mount DOM manipulation: Payload 3.x renders the nav
 * client-side via DefaultNavClient, so CSS-only or SSR approaches can't reach
 * the nav tree. A MutationObserver re-runs after any nav DOM change.
 * All functions are idempotent to prevent observer feedback loops.
 */

import React, { useEffect } from 'react'

// ── 1. Bucket reorder ────────────────────────────────────────────────────────

const DESIRED_ORDER = [
  'Homepage', 'Treatments', 'Experts', 'Results', 'Journey', 'Publications', 'Contact',
]

/** One known selector per bucket — used to find the group's container. */
const BUCKET_ANCHORS: Array<{ bucket: string; id: string }> = [
  { bucket: 'Homepage',   id: 'nav-global-home-hero' },
  { bucket: 'Treatments', id: 'nav-disciplines' },
  { bucket: 'Experts',    id: 'nav-surgeons' },
  { bucket: 'Results',    id: 'nav-before-after-cases' },
  { bucket: 'Journey',    id: 'nav-journey-steps' },
  { bucket: 'Publications',      id: 'nav-blog-posts' },
  { bucket: 'Contact',    id: 'nav-enquiries' },
]

let reordering = false  // guard against MutationObserver feedback loop

function findGroupEl(itemId: string): Element | null {
  const item = document.getElementById(itemId)
  if (!item) return null
  // Walk up to the .nav-group ancestor
  let el: Element | null = item
  while (el && !el.classList.contains('nav-group')) {
    el = el.parentElement
  }
  return el
}

function reorderBuckets() {
  if (reordering) return

  const groups: Array<{ bucket: string; el: Element }> = []
  for (const { bucket, id } of BUCKET_ANCHORS) {
    const el = findGroupEl(id)
    if (el) groups.push({ bucket, el })
  }
  if (groups.length < 2) return

  const parent = groups[0].el.parentElement
  if (!parent) return

  // Idempotency: check if order is already correct
  const children = Array.from(parent.children)
  let lastIdx = -1
  let needsReorder = false
  for (const { el } of groups) {
    const idx = children.indexOf(el)
    if (idx <= lastIdx) { needsReorder = true; break }
    lastIdx = idx
  }
  if (!needsReorder) return

  reordering = true
  // Move bucket groups into desired order (other children — e.g. ungrouped Users — stay)
  groups.forEach(({ el }) => parent.appendChild(el))
  reordering = false
}

// ── 2. Collection / Global sub-labels ───────────────────────────────────────

const FIRST_GLOBALS = [
  'treatments-page',
  'surgeons-page',
  'results-page',
  'pricing-page',
  'journey-page',
  'contact-page',
  'blog-page',
] as const

const FIRST_COLLECTIONS = [
  'disciplines',
  'surgeons',
  'before-after-cases',
  'clinic-catalogue-items',
  'journey-steps',
  'enquiries',
  'blog-posts',
] as const

const SEP_CLASS = 'cosmedic-nav-sep'

function injectSeparators() {
  document.querySelectorAll(`.${SEP_CLASS}`).forEach(el => el.remove())

  for (const slug of FIRST_GLOBALS) {
    const el = document.getElementById(`nav-global-${slug}`)
    if (!el?.parentNode) continue
    el.parentNode.insertBefore(makeSep('Globals'), el)
  }

  for (const slug of FIRST_COLLECTIONS) {
    const el = document.getElementById(`nav-${slug}`)
    if (!el?.parentNode) continue
    el.parentNode.insertBefore(makeSep('Collections'), el)
  }
}

function makeSep(text: string): HTMLElement {
  const div = document.createElement('div')
  div.className = SEP_CLASS
  div.setAttribute('aria-hidden', 'true')
  div.textContent = text
  return div
}

// ── 3. Dark-brown global styling ─────────────────────────────────────────────

const GLOBAL_STYLED = 'cosmedic-global-styled'

function styleGlobals() {
  document.querySelectorAll('[id^="nav-global-"]').forEach(node => {
    if (!(node instanceof HTMLElement)) return
    if (node.classList.contains(GLOBAL_STYLED)) return  // already done

    node.classList.add(GLOBAL_STYLED)

    // Apply inline styles so they survive Payload's CSS resets.
    // We style the node itself AND scan for inner <a>/<span> to ensure
    // text colour applies regardless of whether the ID is on the link
    // container or on the anchor itself.
    const applyStyles = (el: HTMLElement) => {
      el.style.setProperty('background-color', '#533e27', 'important')
      el.style.setProperty('color', '#f4efe6', 'important')
      el.style.setProperty('border-radius', '4px')
      el.style.setProperty('margin-bottom', '1px')
    }
    applyStyles(node)
    node.querySelectorAll('a, span, svg').forEach(child => {
      if (child instanceof HTMLElement) {
        child.style.setProperty('color', '#f4efe6', 'important')
      }
    })

    // Hover handling via pointer events
    node.addEventListener('mouseenter', () => {
      node.style.setProperty('background-color', '#3d2e1c', 'important')
    })
    node.addEventListener('mouseleave', () => {
      node.style.setProperty('background-color', '#533e27', 'important')
    })
  })
}

// ── Main orchestrator ────────────────────────────────────────────────────────

function runAll() {
  if (reordering) return
  reorderBuckets()
  injectSeparators()
  styleGlobals()
}

// ── Component ────────────────────────────────────────────────────────────────

const CosmedicNavLabels: React.FC = () => {
  useEffect(() => {
    runAll()

    const nav = document.querySelector('.nav__wrap') ?? document.querySelector('[class*="nav"]')
    if (!nav) return

    const observer = new MutationObserver(() => { if (!reordering) runAll() })
    observer.observe(nav, { childList: true, subtree: true })
    return () => observer.disconnect()
  }, [])

  return (
    <style>{`
      /* Sub-labels */
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
      .nav-group__content > .cosmedic-nav-sep:first-child {
        border-top: none;
        margin-top: 0;
      }
      /* CSS fallback for global brown styling (covers cases where the ID
         is on a container element rather than the link itself) */
      [id^='nav-global-'] { background-color: #533e27 !important; border-radius: 4px; }
      [id^='nav-global-'], [id^='nav-global-'] a, [id^='nav-global-'] span { color: #f4efe6 !important; }
      [id^='nav-global-']:hover { background-color: #3d2e1c !important; }
    `}</style>
  )
}

export default CosmedicNavLabels
