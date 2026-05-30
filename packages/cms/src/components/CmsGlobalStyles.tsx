'use client'
import React, { useEffect } from 'react'
import { usePathname } from 'next/navigation'

/**
 * Global style + behaviour injections for Cosmedic CMS admin.
 * Mounted once as a Payload `providers` component.
 *
 * 1. Hide the built-in "API" tab on all document edit views.
 * 2. Inject the bucket (group) name into the admin breadcrumb.
 *    e.g.  [icon] / Hero  →  [icon] / Experts / Hero
 *
 * DOM structure (Payload 3.84.1 StepNav):
 *   <nav class="step-nav">
 *     <a class="step-nav__home">icon</a>
 *     <span>/</span>
 *     <span class="step-nav__last">Hero</span>   ← last item always has this class
 *   </nav>
 *
 * We insert <span.cosmedic-bucket-crumb>Bucket</span><span.cosmedic-bucket-slash>/</span>
 * directly before .step-nav__last.
 *
 * Idempotency: if the crumb already has the correct text we return without any
 * DOM change — this breaks the MutationObserver feedback loop.
 */

// ── Slug → bucket display name ─────────────────────────────────────────────
const GLOBAL_BUCKET: Record<string, string> = {
  // Homepage
  'home-page': 'Homepage', 'home-hero': 'Homepage', 'home-intro': 'Homepage',
  'home-lead-magnet': 'Homepage', 'home-place': 'Homepage',
  'home-treatments-view': 'Homepage', 'home-pricing-view': 'Homepage',
  'home-surgeons-view': 'Homepage', 'home-gallery-view': 'Homepage',
  'home-journey-view': 'Homepage', 'home-stories-view': 'Homepage',
  'header': 'Homepage', 'footer': 'Homepage', 'brand-stats': 'Homepage',
  'floating-chrome': 'Homepage', 'endorsement-mark': 'Homepage',
  'seo-defaults': 'Homepage', 'settings': 'Homepage',
  // Treatments
  'treatments-page': 'Treatments', 'treatments-hero': 'Treatments',
  'treatments-index-section': 'Treatments', 'treatments-stats': 'Treatments',
  'discipline-detail-template': 'Treatments', 'sub-category-detail-template': 'Treatments',
  // Experts
  'surgeons-page': 'Experts', 'surgeons-hero': 'Experts',
  'surgeons-lead-view': 'Experts', 'surgeons-plastic-view': 'Experts',
  'surgeons-aesthetic-view': 'Experts', 'surgeon-detail-template': 'Experts',
  // Results
  'results-page': 'Results', 'results-hero': 'Results',
  'results-featured-cases-view': 'Results', 'results-stories-view': 'Results',
  'gallery-page': 'Results', 'stories-page': 'Results',
  'library-cta': 'Results', 'share-cta': 'Results',
  // Pricing
  'pricing-page': 'Pricing', 'pricing-hero': 'Pricing',
  'pricing-overview': 'Pricing', 'pricing-footnote': 'Pricing',
  'pricing-insurance': 'Pricing', 'pricing-payment': 'Pricing',
  'consultation-policy': 'Pricing',
  'pricing-discipline-list-view': 'Pricing', 'pricing-catalogue-view': 'Pricing',
  // Journey
  'journey-page': 'Journey', 'journey-hero': 'Journey',
  'journey-stats': 'Journey', 'recovery-stays-page': 'Journey',
  // Contact
  'contact-page': 'Contact', 'contact-hero': 'Contact',
  'contact-enquiry-section': 'Contact', 'contact-visit-section': 'Contact',
  'form-defaults': 'Contact', 'email-templates': 'Contact',
  'video-consult-page': 'Contact',
  // About
  'blog-page': 'Publications', 'blog-post-template': 'Publications',
  'press-page': 'Publications', 'privacy-page': 'Publications', 'not-found-page': 'Publications',
}

const COLLECTION_BUCKET: Record<string, string> = {
  'disciplines': 'Treatments', 'sub-categories': 'Treatments', 'procedures': 'Treatments',
  'surgeons': 'Experts',
  'before-after-cases': 'Results', 'stories': 'Results',
  'surgical-items': 'Pricing', 'machine-items': 'Pricing',
  'injection-items': 'Pricing', 'btl-items': 'Pricing',
  'journey-steps': 'Journey', 'recovery-stays': 'Journey',
  'enquiries': 'Contact', 'analytics': 'Contact',
  'blog-posts': 'Publications', 'blog-tags': 'Publications', 'authors': 'Publications',
  'press-mentions': 'Publications', 'awards': 'Publications', 'privacy-sections': 'Publications',
  'media': 'Media Library',
}

function getBucket(pathname: string): string | null {
  const globalMatch = pathname.match(/\/globals\/([^/?#]+)/)
  if (globalMatch) return GLOBAL_BUCKET[globalMatch[1]] ?? null
  const collectionMatch = pathname.match(/\/collections\/([^/?#]+)/)
  if (collectionMatch) return COLLECTION_BUCKET[collectionMatch[1]] ?? null
  return null
}

const CRUMB_CLASS = 'cosmedic-bucket-crumb'
const SLASH_CLASS = 'cosmedic-bucket-slash'

function injectBucketCrumb(bucket: string | null) {
  const nav = document.querySelector('.step-nav')
  if (!nav) return

  const existingCrumb = nav.querySelector(`.${CRUMB_CLASS}`)
  const existingSlash = nav.querySelector(`.${SLASH_CLASS}`)

  if (!bucket) {
    existingCrumb?.remove()
    existingSlash?.remove()
    return
  }

  // ── Idempotency check — prevents MutationObserver feedback loop ──────────
  // If the crumb is already correct, return without touching the DOM.
  // No DOM change → observer doesn't fire → no infinite loop.
  if (existingCrumb?.textContent === bucket && existingSlash) return

  // Remove stale injection
  existingCrumb?.remove()
  existingSlash?.remove()

  // The last breadcrumb item always has class `step-nav__last`
  const lastItem = nav.querySelector('.step-nav__last')
  if (!lastItem) return

  // Insert [Bucket][/] immediately before the last item
  const crumb = document.createElement('span')
  crumb.className = CRUMB_CLASS
  crumb.textContent = bucket

  const slash = document.createElement('span')
  slash.className = SLASH_CLASS
  slash.textContent = '/'

  nav.insertBefore(crumb, lastItem)
  nav.insertBefore(slash, lastItem)
}

// ── Component ───────────────────────────────────────────────────────────────
export default function CmsGlobalStyles({ children }: { children?: React.ReactNode }) {
  const pathname = usePathname()

  // Default theme = LIGHT (not OS-auto). Payload's theme provider falls back to
  // prefers-color-scheme when no theme cookie exists; seed 'light' so first load
  // is light. Toggle still works (it overwrites this cookie). Runs once.
  useEffect(() => {
    const hasThemeCookie = document.cookie
      .split('; ')
      .some((row) => row.startsWith('payload-theme=light') || row.startsWith('payload-theme=dark'))
    if (!hasThemeCookie) {
      const d = new Date(); d.setTime(d.getTime() + 365 * 864e5)
      document.cookie = `payload-theme=light;expires=${d.toUTCString()};path=/`
      document.documentElement.setAttribute('data-theme', 'light')
    }
  }, [])

  useEffect(() => {
    const bucket = getBucket(pathname ?? '')

    // Initial attempt (breadcrumb may already be in DOM)
    injectBucketCrumb(bucket)

    // Watch for DOM changes — breadcrumb mounts asynchronously after the provider.
    // injectBucketCrumb is idempotent so repeated firing is safe.
    const obs = new MutationObserver(() => injectBucketCrumb(bucket))
    obs.observe(document.body, { childList: true, subtree: true })

    return () => obs.disconnect()
  }, [pathname])

  return (
    <>
      <style>{`
        /* ── Hide Payload built-in API tab ─────────────────────────────── */
        a[href$="/api"],
        a[href*="/api?"] {
          display: none !important;
        }

        /* ── Bucket breadcrumb crumb ────────────────────────────────────── */
        /* Inherits .step-nav span rules (max-width, ellipsis, font-weight). */
        .cosmedic-bucket-crumb {
          color: var(--theme-elevation-500);
        }
        .cosmedic-bucket-slash {
          /* matches the native <span>/</span> — no extra style needed */
        }
      `}</style>
      {children}
    </>
  )
}
