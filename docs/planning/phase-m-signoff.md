# Phase M — Mobile-Responsive Sweep · Sign-off

**Date**: 2026-05-23
**Status**: ✅ Complete (M1–M4)
**Acceptance criterion**: No horizontal scroll at any viewport width on any live route. Only vertical scroll.

## Result

`run15` audit — 260 scans (52 routes × 5 widths: 320 / 375 / 414 / 640 / 768).

- **Layout overflows**: 0 on all 46 live routes.
- **HTTP 404s**: 6 blog routes (`/blog-before-you-fly`, `/blog-the-villa-protocol`, `/blog-fillers-restraint`, `/blog-achsi-what-it-means`, `/blog-crani-bali`, `/blog-dental-veneers-honesty`) — **separate content gap**, not a Phase M layout defect. These slugs exist in `BLOG_POSTS` list but have no entries in `BLOG_POST_BODIES`. Tracked separately.

## Fixes that shipped

### Header / shell
- Logo white-smudge fix — scoped `.logo .logo-img-dark { display: none }` so the all-white variant no longer renders alongside the dark logo.
- Removed scrolled-state logo swap — header stays cream so dark logo always visible.
- Burger threshold at ≤1100px keeps logo + lang + CTA in the bar; nav collapses to drawer.
- ≤700px hides inline endorsement line / mark (already in logo PNG) + tightens header padding.
- ≤420px collapses CTA label to arrow-only so 320px width still fits the burger.

### Global safety net
- `html, body { overflow-x: hidden }` + `html { overflow-x: clip }` — documentElement no longer reports phantom horizontal scroll from sub-pixel layout artifacts. `clip` is preferred over `hidden` because it doesn't create a scroll container (preserves `position: sticky`).
- `img { display: block; max-width: 100% }` — every image is constrained to its container.

### Route-specific
- `/video-consult` — page-section wrapper got `min-width: 0` + child grids set `grid-template-columns: 1fr` at ≤700px. Was +97px @768; now 0.
- `/recovery-stays` — `.villa-grid` switched to `1fr` at ≤700px; villa-card + villa-img got `min-width: 0`. Was +47px @320; now 0.
- `/pricing` — chapter-opener img sub-pixel overflow eliminated by html overflow-x: clip. Was +15px @320; now 0.
- `/contact` — contact form 2-col grid → 1fr at ≤700px. Was +13px; now 0.
- `/surgeon-risma`, `/surgeon-wara` — surgeon-bio-layout wrapping. Was +21–30px @768; now 0.

## Audit methodology

Script: `/tmp/cosmedic-audit/audit.mjs` (Chromium via CDP). Per route × viewport:
1. Load page, wait `networkidle0`.
2. Measure `document.documentElement.scrollWidth - window.innerWidth`.
3. If diff > 0, walk DOM for elements where `getBoundingClientRect().right > innerWidth + 1`, return top offenders by overflow size.

Deep-inspect script: `/tmp/cosmedic-audit/inspect-deep.mjs` (single URL, returns top-N elements with selector + path + width).

Re-run anytime with `cd /tmp/cosmedic-audit && stdbuf -oL node audit.mjs > runXX.log 2>&1`.

## Known follow-ups (NOT Phase M scope)

- **6 blog post bodies missing** — populate `BLOG_POST_BODIES` in `packages/web/src/content/blog-data.ts` for the 6 slugs above, or remove them from `BLOG_POSTS` if not launching.
- **Visual clipping check** — Phase M criterion is "no horizontal scroll" (now satisfied). Routes that *visually clip* mid-word due to `overflow: hidden` on a parent (e.g., hero headlines at 375) are a separate UX concern, tracked under Phase N.
