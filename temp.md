# CR25May — Status snapshot (2026-05-27)

---

## ✅ Completed (31 of 41)

| # | Item |
|---|---|
| 25.1 | Early-morning cleanup audit (`8a7007e` verification) |
| 25.2 | R2 + footer regression + atom-coverage closure |
| 25.4 | Phase 11 pre-launch QA gates infrastructure |
| 25.7 | N1/N2/N3 polish trio |
| 25.8 | Back-to-Top ↔ WhatsApp FAB vertical gap |
| 25.8a | Back-to-Top ↔ WhatsApp center-X alignment on mobile |
| 25.9 | Starburst texture clarify (comment fix) |
| 25.12 | Phase C6–C10 CMS structural alignment cleanup |
| 25.13 | Pricing bucket grouping audit |
| 25.13a | /pricing clinic catalogue data fix + hide-unpriced toggle |
| 25.13b | /pricing Well-Being catalogue heading + toggle + null-safe label |
| 25.13c | IDR/AUD currency toggle on treatment detail pages |
| 25.14 | Slug sweep — 44 renames across 3 collections |
| 25.15 | URL structure `/treatments/surgical/face` — nested routes live |
| 25.16 | CMS slug bug — superseded by 25.15 |
| 25.17 | Site-wide AUD↔IDR plumbing audit |
| 25.18 | Payload Bucket sort + admin group prefix strip |
| 25.19 | Brand logo SVG swap + 5-color palette enforcement |
| 25.23 | Home Place "Recover in paradise" image wired to CMS |
| 25.24 | Home Hero quick-enquiry form (17 fields) wired to CMS |
| 25.25 | Home Intro pull-quote + columns wired to CMS |
| 25.26 | Home Treatments/Pricing/Surgeons/Gallery/LeadMagnet/Journey/Stories wired |
| 25.27 | Contact page form labels + messages wired to CMS |
| 25.28 | Privacy page metadata + DPO section wired to CMS |
| 25.29 | NotFound page global created + wired |
| 25.30 | WhatsApp number single-sourced from CMS Settings |
| 25.31 | Hospital name / address single-sourced from CMS Settings in SEO schema |
| 25.36 | Production DB backup — daily cron `0 2 * * *`, 14-dump retention, first dump 1.5 MB ✓ |
| 25.39 | Sibling-site safety post-pm2-restarts re-verified (5/5 web-fronted siblings 200) |
| 25.40 | Nav reorder: Treatments > Results > Doctors > Pricing > Journey > Contact |
| 25.41 | /pricing: Clinic Catalogue before Well-Being Catalogue |
| ch5-p1+p3 | CMS field rearrangement — Phase 1 (15 reorders) + Phase 3 (3 hideHero toggles). JourneyPage/ContactPage/ResultsPage now use `pageFields({ hideHero: true })`. All Hero globals follow D3 standard order. Images moved to end per D7. |

**Also N/A-Done (1):**
- 25.5 — Phase 10 imagery gaps: A1 code-wiring ✅ shipped; B1/B2/B3 blocked (see Pending)

---

## ⏳ Pending (9 open)

### 🔴 Launch-blocking (3)

| # | Item | Blocker |
|---|---|---|
| 25.3 | SMTP provider + `.env` config | Awaiting your provider choice + creds |
| 25.38 | Form E2E (Contact → Payload → email) | Depends on 25.3 |
| 25.32 | Visual inspection every page × breakpoint vs design | Time-intensive manual pass |

### ⚪ Not launch-blocking (6)

| # | Item | Notes |
|---|---|---|
| 25.5 (B1–B3) | Phase 10 imagery — placeholder decision + B&A composites + AI-gen lifestyle shots | B1 needs your call: accept placeholders pre-launch? |
| 25.34 | CMS admin UI walk-through field-by-field | Manual, no code |
| 25.22 | Phase R — R3 Treatments Bucket detail | Needs sign-off before starting |
| 25.37 | WhatsApp deep-link test from real phone | User action (tap on device) |
| 25.10 | N0 mobile UX visual-quality pass | Deferred 2026-05-25 by user |
| 25.11 | Phase 9 i18n EN ⇄ ID | Post-launch acceptable |

### 🚫 Blocked indefinitely

| # | Item | Blocker |
|---|---|---|
| 25.6 | Figma MCP pipeline | Figma file not shared with MCP user |
