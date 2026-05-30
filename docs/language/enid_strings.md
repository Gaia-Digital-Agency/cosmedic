# EN → ID Translation Worksheet (`enid_strings.md`)
**For:** 25.11 i18n · **Created:** 2026-05-29 · Fill the **ID** column, then enter per-record in the CMS (`id` locale) once Payload localization (Phase A) is live.

> Two parts: **(1) discrete short strings** below (titles, subtitles, taglines, ledes, UI chrome) — translate here. **(2) bulk rich-text** (bios, overviews, procedure descriptions, blog/story bodies) — translate directly in the CMS editor per record; counts at the bottom.

---

## A. UI chrome strings (already in `web/src/i18n/`)
`en.json` + `id.json` already hold **49 keys** (nav, CTA, form, footer, pricing labels). ID side exists — **needs a native-speaker review pass**, not first-draft translation.
Keys: nav(treatments, surgeons, journey, gallery, stories, contact, more, close, menu…) · cta(planYourTreatment, speakWithConcierge, beginYourJourney, sendEnquiry, viewAll, readMore, chat, whatsapp) · form(name, email, phone, country, areaOfInterest, message, required, optional, sending, sent, thankYou, error×3) · pricing(fromAud, perTreatment, asQuoted, complimentary, included) · footer(treatments, surgeons, information, copyright)

## B. Discipline cards — `/procedures/{slug}`
| Field | EN | ID |
|-------|----|----|
| surgical · title | Surgical |  |
| reconstructive · title | Reconstructive Surgery |  |
| non-surgical · title | Non-surgical |  |
| hair · title | Hair Restoration |  |
| dental · title | Dental Aesthetics |  |
| weight-loss · title | Weight Loss |  |
| surgical · subtitle | Face · Breast · Body |  |
| reconstructive · subtitle | Breast · Trauma · Craniofacial |  |
| non-surgical · subtitle | Injectables · Laser & Resurfacing · Skin Health |  |
| hair · subtitle | FUE & Follicle Therapy |  |
| dental · subtitle | Veneers · Alignment · Whitening |  |
| weight-loss · subtitle | Medical · Endoscopic · Bariatric |  |

## C. Sub-category taglines — `/procedures/{disc}/{slug}`
| Sub-cat | EN tagline | ID |
|---------|-----------|----|
| face-neck | Quiet work for the most considered part of the body. |  |
| surgical-body | Contouring with the same restraint as our facial work. |  |
| surgical-breast | Conservative work, proportioned to your anatomy. |  |
| surgical-eyelid | Delicate eyelid surgery that refreshes the eyes while keeping your natural expression. |  |
| surgical-arm | Removing the loose skin that lingers after weight change, for a firmer upper arm. |  |
| rhinoplasty | Reshaping the nose in harmony with the rest of the face — and, where needed, improving how you breathe. |  |
| surgical-others | A range of focused procedures that refine a single feature or restore comfort and confidence. |  |
| reconstructive-breast | Restoration after mastectomy, with proportion and symmetry in mind. |  |
| reconstructive-trauma | Reconstruction after injury, burn, or unsatisfactory prior surgery. |  |
| reconstructive-craniofacial | Complex facial reconstruction by craniomaxillofacial subspecialists. |  |
| injectable | Less product, less heat, less everything you might expect. |  |
| non-injectable | Gold-standard platforms, dialled to the minimum effective dose. |  |
| nonsurgical-others | Medical facials and structured skin protocols. |  |
| hair-fue | Single-follicle transplantation, designed to never be detected. |  |
| hair-therapy | Therapy first; surgery only when therapy can't. |  |
| dental-veneers | Porcelain or composite, paced to suit your visit. |  |
| dental-alignment | Clear aligners and lingual alternatives, planned around your travel. |  |
| dental-whitening | Professional whitening protocols — for natural-looking results, not Hollywood ones. |  |
| weight-loss-medical | Pharmacological pathways, supported by nutrition and behaviour. |  |
| weight-loss-endoscopic | Non-incisional procedures performed through the mouth, no scars. |  |
| weight-loss-surgical | Laparoscopic surgical pathways for serious weight loss. |  |

> Sub-category **ledes** (1–3 sentence intros, 21 of them) are longer — extracted in the DB; translate them in-CMS alongside the overview body for context.

## D. Page hero / section chrome (CMS globals — currently English hardcoded fallbacks)
These render from CMS globals; many have English fallback literals in code. Translate the CMS value (not the code).
| Where | EN | ID |
|-------|----|----|
| Home hero title.a / .b | "Plastic surgery" / "in Bali, by ISAPS surgeons." |  |
| Home hero CTA primary | Plan Your Treatment |  |
| Home hero CTA secondary | View Pricing |  |
| Contact hero | "Begin, when" / "you are ready." |  |
| Contact · Direct lines | Direct lines |  |
| Contact · Find us in | Find us in / Nusa Dua. |  |
| Contact · Hours labels | Hours · Clinic / Hours · Concierge |  |
| Journey hero | "From enquiry," / "to homecoming." |  |
| Pricing hero | "Every treatment," / "every price." |  |
| Lead magnet | Free Guide / Send Guide |  |
| 404 | Error · 404 |  |
| (chapter eyebrows) | Chapter II–XI … |  |

---

## E. Bulk rich-text — translate IN CMS per record (not here)
| Content | Records | Notes |
|---------|--------:|-------|
| Procedure descriptions | 84 | Largest block — many short, some 1 para |
| Sub-category overview + intro | 21 | Long-form body per sub-cat |
| Surgeon bios | 8 | Long-form, clinical tone |
| Discipline overviews | 6 | Long-form |
| Blog post bodies | 7 | Full articles — biggest per-item |
| Story bodies | 8 | Patient testimonials |
| Plus: FAQs (disc + subcat + procedure), section blocks, SEO meta (title/desc per record) | many | |

**Translation volume estimate:** discrete strings (B–D) ≈ 90 strings; bulk rich-text ≈ 134 records + FAQs/sections/SEO. This is the schedule long pole — start a translator on E in parallel with engineering.

> ⚠️ Noticed during extraction (not i18n, flag only): discipline `tagline` chapter numbering has a duplicate — `reconstructive` and `non-surgical` both read "Chapter II.02". Worth a separate fix.
