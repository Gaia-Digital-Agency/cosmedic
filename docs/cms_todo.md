# Cosmedic — Working TODO

> Active worklist captured 2026-05-21. Lives alongside the master phase-tracker in [docs/todo.md](todo.md) but focuses on the in-flight Mobile-Responsive Sweep (Phase M) + the new N-series items the user added after Phase 8 went live.
>
> **Hard sign-off rule (set by user):** _No horizontal scroll at any width on any route. Only vertical scroll._

---

## Phase M — Mobile-Responsive Sweep (paused 2026-05-21, resuming)

Audit script lives at `/tmp/cosmedic-audit/audit.mjs`. Re-run with:

```bash
cd /tmp/cosmedic-audit && stdbuf -oL node audit.mjs > run.log 2>&1 &
```

It loops every route × `[320, 375, 414, 640, 768, 1024, 1280, 1440]` and reports `OVERFLOW route @ widths: ...` for any document-level horizontal overflow.

### Already shipped (live)

- **Logo white-smudge fix** — scoped `.logo .logo-img-dark { display: none }` to beat `.logo img { display: block }` specificity. (`packages/web/src/styles/globals.css:196-201`)
- **Logo-swap-on-scroll removed** — header background stays cream at all scroll positions, so swapping to the white-on-dark logo variant turned the mark invisible. Swap rules removed; CMS `Header.logoDark` field preserved (Rule 4 — no unilateral deletion). (`packages/web/src/styles/globals.css:196-204`)
- **M2 partial — burger threshold + header collapse rules** — at `max-width: 1100px` primary nav collapses to burger but lang switcher + CTA stay visible; at `max-width: 700px` endorsement line + lang switcher hide, header padding tightens, CTA shrinks. (`packages/web/src/styles/globals.css:1349-1380`)

### M1 — Finish multi-breakpoint overflow audit

- [ ] Re-run audit; capture complete `OVERFLOW` list across all 51 routes × 8 widths.
- 45 / 51 routes scanned before pause. Unscanned: `/treatment-reconstructive-trauma`, `/treatment-recovery`, `/treatment-surgical`, `/treatment-surgical-body`, `/treatment-surgical-breast`, `/treatment-surgical-face`, `/treatment-weight-loss-endoscopic`, `/treatment-weight-loss-medical`, `/treatment-weight-loss-surgical`.

### M2 — Fix 320–375px burger-missing bug

- [ ] At 320–375px the CTA "Plan Your Treatment" still pushes the burger button off-screen.
- The rule `@media (max-width: 420px) { .header-cta span:not(.btn-arrow) { display: none } }` was added but does NOT apply at runtime — verified via screenshot (CTA text still rendering full at 320).
- Likely culprit: specificity or the inner `<span>` selector mismatching the rendered DOM. Investigate first; then either bump specificity or restructure the CTA markup.
- File: `packages/web/src/styles/globals.css:1383-1388`.

### M3 — Per-route fixes (confirmed overflows so far)

- [ ] `/video-consult` — overflows by **+97px** at 768px viewport. Largest signal → likely a wide grid / iframe / form element. Structural.
- [ ] `/surgeon-risma` — overflows by **+30px** at 768px viewport.
- [ ] `/surgeon-wara` — overflows by **+21px** at 768px viewport.
- [ ] Plus whatever M1 surfaces from the remaining 6 routes.

### M4 — Sign-off

- [ ] Re-run audit; require zero document-level horizontal overflows on every route × 8 widths before declaring Phase M complete.
- [ ] Visual spot-check at 320 / 375 / 414 / 640 / 768 — header, golden-path CTAs, hero copy not clipped by parent `overflow: hidden`. (Document-overflow check won't catch parent-clipped content; mobile-view QA must.)

---

## Phase N — New items (added 2026-05-21)

### N0 — Check Mobile View

- [ ] Golden-path mobile-UX pass across 320 / 375 / 414 / 640 / 768 — overlaps with M1+M4 but specifically includes visual quality (clipped headlines, broken stacking, touched targets <44px), not just overflow.

### N1 — Vertically centre "MANAGED BY BIMC HOSPITAL" endorsement to logo

- [ ] In the header bar, align `logo-endorsement-line` / `logo-endorsement-mark` so it reads as vertically centred with the COSMEDIC brand logo glyph.
- Resize as needed for visual balance (currently the line sits beside the wordmark but is not optically centred).
- Must remain readable at desktop widths; already hidden ≤ 700px (per the already-shipped M2 partial).
- Affected: `packages/web/src/components/shell/Header.tsx` + `packages/web/src/styles/globals.css` (`.logo`, `.logo-endorsement-line`, `.logo-endorsement-mark`).

### N2 — Back-to-Top button = same size as WhatsApp FAB

- [ ] In FloatingChrome, the Back-to-Top button and the WhatsApp FAB should share **identical width / height / border-radius / shadow** so they read as a paired chrome cluster.
- Today the back-to-top is smaller and visually mismatched.
- Affected: `packages/web/src/components/shell/FloatingChrome.tsx` + the floating-chrome rules in `packages/web/src/styles/globals.css`.

### N3 — `/pricing` table consistency

URL: https://cosmedic.gaiada.online/pricing

- [ ] Enforce **consistent column widths** across every category table inside the `ClinicCatalogueTable` block (today they jitter from sheet to sheet because each `<table>` auto-sizes to its own content).
- [ ] Enforce **left-aligned text** for text columns (procedure name, notes, anaesthesia type).
- Numeric columns (IDR / AUD) stay right-aligned per currency convention.
- Affected: the `ClinicCatalogueTable` block component + its styles. Trace from `packages/web/src/routes/pricing/`.

---

## Order of work

1. **N1, N2, N3** first — small, isolated, high-visibility wins, no audit dependency.
2. **M1** — re-run audit to get full overflow list.
3. **M2** — fix 320–375 burger bug.
4. **M3** — per-route structural fixes (`/video-consult` first, surgeons after).
5. **M4** — re-audit, sign off.

---

## Working rules in force (from the user, verbatim)

- _"YOU HAVE NO PRIVELEGAE TO REMOVE OR DELETE ANYTHING"_ — no unilateral removal of CMS fields/collections/schema; dead fields get wired, never stripped.
- _"NO FRONT SIDE CHANGE IF CMS IS CHANGED, THATS ANOTHER RULE"_ — visual invariance: the rendered look/behaviour must not change when CMS schema is refactored.
- _"All pages and subpages, no horizontal scroll, page should fit viewport horizontally. Only Vertical scroll."_ — Phase M acceptance criterion.

See also: [feedback_cosmedic_rules.md](../../home/azlan/.claude/projects/-var-www-cosmedic/memory/feedback_cosmedic_rules.md) (auto-memory) for the seven-rule expanded set.
