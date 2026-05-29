'use client'

/**
 * CosmedicNavLabels — intentionally inert.
 *
 * All nav bucket ordering + logout-last is now done with pure CSS flex
 * `order` in admin-theme.css (`.nav__wrap > .nav-group:has(#anchor)` and
 * `.nav__wrap > .nav__controls`). No DOM manipulation and no
 * MutationObserver here — the earlier observer + node remove/re-add caused
 * an infinite childList-mutation loop that hung the admin, and the
 * `appendChild` reorder pushed buckets past the logout control.
 *
 * Kept as a registered afterNavLinks component (returns null) so the config
 * reference stays valid; can be repurposed later if needed.
 */

import React from 'react'

const CosmedicNavLabels: React.FC = () => null

export default CosmedicNavLabels
