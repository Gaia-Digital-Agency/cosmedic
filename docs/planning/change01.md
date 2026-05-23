# Phase Q tracker — `changes01.docx` 27-item batch

> Source: [/changes/changes01.docx](../changes/changes01.docx) — user-provided change list (2026-05-22 scp upload). Each item below maps to one of the 6 clustered Phase Q commits in [all_todo.md](all_todo.md). Tick `[x]` as each Phase Q commit lands and verifies. After **Phase Q is fully shipped, every item below should be `[x]`**.

---

## Q-1 — Logo cluster (commit ref TBD)

- [ ] **#1** Change the logo with the brown coloured one
- [ ] **#3** Fix the heading and logo
- [ ] **#4** Ensure logo is not stretched on mobile view

## Q-2 — Layout / Responsive cluster (commit ref TBD)

- [ ] **#2** Switch to burger menu when viewport reaches 1480px (avoid stretched logo and button)
- [ ] **#5** Update the footer to match (user-supplied image reference)
- [ ] **#9** Add sufficient margin top on the homepage mobile view
- [ ] **#20** Visual bug on mobile: content touching the viewport — fix this
- [ ] **#22** Align content properly to match the container (aligned with breadcrumb)
- [ ] **#23** Remove `max-width` on `.detail-body`
- [ ] **#24** Ensure top margin is sufficient

## Q-3 — Breadcrumb cluster (commit ref TBD)

- [ ] **#12** Align breadcrumbs properly — check all pages
- [ ] **#13** Match size and align position properly

## Q-4 — B&A extras (commit ref TBD)

- [ ] **#18** Add to Before/After: patient age · performing doctor · length / duration post surgery (e.g. 4 months)

## Q-5 — Pricing extras (commit ref TBD)

- [ ] **#15** Set pricing main to IDR only; AUD auto-calculated via global rate (`Settings.audToIdrRate`)

## Q-6 — CMS admin theme + CTA bug + dead-item check (commit ref TBD)

- [ ] **#19** Fix bug — CTA click from treatment detail page: once changed, cannot select more detailed treatment
- [ ] **#25** Audit Inclusion/Exclusion item usage; remove if not rendered anywhere
- [ ] **#26** CMS backend — set light menu theme as the default

---

## Items handled by other phases (not Q)

- [ ] **#6** Footer treatments items auto-generated from CMS list — already CMS-driven via `Footer.linkColumns`; verify or extend (audit-only)
- [ ] **#7** Change home section to full team picture (in Figma) — imagery refresh, Phase 10 / Phase Q (clarification pending)
- [ ] **#8** Change all images to the Figma set — imagery refresh, Phase 10 / Phase Q (clarification pending)
- [ ] **#10** On treatment page, remove a section and use the similar section from the homepage — needs UX decision, Phase Q follow-up
- [ ] **#11** Fix slug structure to nested form (`/treatments/surgical/face`) — breaks 37 routes; awaiting user decision (Phase Q clarification #1)
- [ ] **#14** Remove all pricing from backend; let pricing populated from procedure detail — **Phase C9** (pricing unification, single-source via Procedures)
- [ ] **#16** Rework procedure sorting (related to parent group only) — sort UX, can land in Q-6 or as a small N-series patch
- [ ] **#17** Remove pricing tiers — **CONTRADICTS** `CMS_structure.md` (Pricing Tiers retained); awaiting user decision (Phase Q clarification #2)
- [ ] **#21** Broken-links audit — Phase **C10** sign-off + final QA pass
- [ ] **#27** Favicon change to latest — **Phase P**

---

## How items map to commits

The 27 items above are addressed across **Phases C, P, Q, M, N** — not just Phase Q. Phase Q is reserved for items that don't fit elsewhere and arrive grouped per the docx batch. Cross-references kept in [all_todo.md](all_todo.md) Phase summary table.
