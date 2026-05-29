'use client'

/**
 * CosmedicNavLabels — three jobs, no nav colour (that lives in admin-theme.css
 * on the main content cards instead):
 *
 * 1. Reorder nav bucket groups: Homepage · Treatments · Experts · Results
 *    · Journey · Publications · Contact (everything else after).
 * 2. Inject "COLLECTIONS" / "GLOBALS" sub-labels within each multi-type group.
 * 3. Move the Payload logout / exit link to the very bottom of the nav.
 */

import React, { useEffect } from 'react'

// ── 1. Bucket order ─────────────────────────────────────────────────────────

const DESIRED_ORDER = [
  'Homepage', 'Treatments', 'Experts', 'Results',
  'Journey', 'Publications', 'Contact',
]

const BUCKET_ANCHORS: Array<{ id: string }> = [
  { id: 'nav-global-home-hero' },     // Homepage
  { id: 'nav-disciplines' },          // Treatments
  { id: 'nav-surgeons' },             // Experts
  { id: 'nav-before-after-cases' },   // Results
  { id: 'nav-recovery-stays' },       // Journey  (journey-steps hidden; use recovery-stays)
  { id: 'nav-blog-posts' },           // Publications
  { id: 'nav-enquiries' },            // Contact
]

let reordering = false

function findGroupEl(itemId: string): Element | null {
  const item = document.getElementById(itemId)
  if (!item) return null
  let el: Element | null = item
  while (el && !el.classList.contains('nav-group')) el = el.parentElement
  return el
}

function reorderBuckets() {
  if (reordering) return

  const groups: Element[] = []
  for (const { id } of BUCKET_ANCHORS) {
    const el = findGroupEl(id)
    if (el) groups.push(el)
  }
  if (groups.length < 2) return

  const parent = groups[0].parentElement
  if (!parent) return

  // Idempotency: bail if already in correct relative order
  const children = Array.from(parent.children)
  let last = -1, ok = true
  for (const el of groups) {
    const idx = children.indexOf(el)
    if (idx <= last) { ok = false; break }
    last = idx
  }
  if (ok) return

  reordering = true
  groups.forEach(el => parent.appendChild(el))
  reordering = false
}

// ── 2. Collection / Global sub-labels ───────────────────────────────────────

const FIRST_GLOBALS = [
  'treatments-page', 'surgeons-page', 'results-page', 'pricing-page',
  'journey-page', 'contact-page', 'blog-page',
] as const

const FIRST_COLLECTIONS = [
  'disciplines', 'surgeons', 'before-after-cases',
  'journey-steps', 'enquiries', 'blog-posts',
] as const

const SEP_CLASS = 'cosmedic-nav-sep'

function injectSeparators() {
  document.querySelectorAll(`.${SEP_CLASS}`).forEach(el => el.remove())
  for (const slug of FIRST_GLOBALS) {
    const el = document.getElementById(`nav-global-${slug}`)
    if (el?.parentNode) el.parentNode.insertBefore(makeSep('Globals'), el)
  }
  for (const slug of FIRST_COLLECTIONS) {
    const el = document.getElementById(`nav-${slug}`)
    if (el?.parentNode) el.parentNode.insertBefore(makeSep('Collections'), el)
  }
}

function makeSep(text: string): HTMLElement {
  const div = document.createElement('div')
  div.className = SEP_CLASS
  div.setAttribute('aria-hidden', 'true')
  div.textContent = text
  return div
}

// ── 3. Move logout to bottom ─────────────────────────────────────────────────

function moveLogoutLast() {
  const logout = document.querySelector('.nav__log-out')
  if (!logout) return
  const parent = logout.parentElement
  if (!parent) return
  // Already last?
  if (parent.lastElementChild === logout) return
  parent.appendChild(logout)
}

// ── Orchestrator ─────────────────────────────────────────────────────────────

function runAll() {
  if (reordering) return
  reorderBuckets()
  injectSeparators()
  moveLogoutLast()
}

// ── Component ────────────────────────────────────────────────────────────────

const CosmedicNavLabels: React.FC = () => {
  useEffect(() => {
    runAll()
    const nav = document.querySelector('.nav__wrap') ?? document.querySelector('[class*="nav"]')
    if (!nav) return
    const obs = new MutationObserver(() => { if (!reordering) runAll() })
    obs.observe(nav, { childList: true, subtree: true })
    return () => obs.disconnect()
  }, [])

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
      .nav-group__content > .cosmedic-nav-sep:first-child {
        border-top: none;
        margin-top: 0;
      }
    `}</style>
  )
}

export default CosmedicNavLabels
