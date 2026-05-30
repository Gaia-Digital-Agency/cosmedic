# Cosmedic — Hardcoded Strings Not in CMS

> Visible text on the frontend that has NO corresponding CMS field.
> These cannot be changed by editors — only by a developer editing the source files.
> Last audited: 2026-05-30 (session 2).
>
> Source files: `packages/web/src/components/` and `packages/web/src/routes/`

---

## Header / Nav

| String | Location | File |
|---|---|---|
| "Procedures" | Mobile menu accordion heading | `Header.tsx:259` |
| "Experts" | Mobile menu accordion heading | `Header.tsx:306` |
| "Results" | Desktop + mobile nav link label | `Header.tsx:189` |
| "Pricing" | Desktop + mobile nav link label | `Header.tsx:191` |
| "Your Journey" | Desktop + mobile nav link label | `Header.tsx:194` |
| "Contact" | Desktop + mobile nav link label | `Header.tsx:197` |
| "All procedures →" | Mobile submenu first link | `Header.tsx:265` |
| "All doctors →" | Mobile submenu first link | `Header.tsx:312` |
| "Surgical Doctors" | Desktop dropdown column heading | `Header.tsx:87` |
| "Aesthetic Doctors" | Desktop dropdown column heading | `Header.tsx:87` |

---

## Footer

| String | Location | File |
|---|---|---|
| "About" | Footer column heading (second column) | `Footer.tsx` |
| "Connect" | Footer column heading (third column) | `Footer.tsx` |
| "PT Trisaka Reksa Waluya" | Legal entity in copyright line | `Footer.tsx` |
| "Designed in Bali" | Credit line in footer bottom | `Footer.tsx` |

---

## Pricing Page (`/pricing`)

| String | Location | File |
|---|---|---|
| "Clinic" | Pricing table section eyebrow (CLINIC section) | `PricingPage.tsx` |
| "Wellness" | Pricing table section eyebrow (WELLNESS section) | `PricingPage.tsx` |
| "Consultation policy" | Section heading above the consultation fee row | `PricingPage.tsx` |
| "What to expect" | Section eyebrow for the pricing intro | `PricingPage.tsx` |

---

## Results / Gallery Pages (`/results`, `/gallery`, `/`)

| String | Location | File |
|---|---|---|
| "Before" | Label on before/after composite card (left side) | `ResultsPage.tsx`, `GalleryPage.tsx`, `Gallery.tsx` |
| "After" | Label on before/after composite card (right side) | `ResultsPage.tsx`, `GalleryPage.tsx`, `Gallery.tsx` |

---

## Recovery Stays / Journey Pages

| String | Location | File |
|---|---|---|
| "Drive to clinic" | Metadata label on villa card | `RecoveryStaysPage.tsx` |
| "Nursing" | Metadata label on villa card | `RecoveryStaysPage.tsx` |
| "From" | Price prefix on villa card | `RecoveryStaysPage.tsx` |
| "Coordinated by" | Credit line on journey step cards | `JourneyPage.tsx` |
| "Time zone" | Label on video consult page | `VideoConsultPage.tsx` |

---

## i18n strings (translated via `id.json` / `en.json` — not in CMS)

These are UI strings managed in `packages/web/src/i18n/` — editable by dev only,
not via the CMS admin.

| Key | EN | ID |
|---|---|---|
| `nav.treatments` | Treatments | Perawatan |
| `nav.surgeons` | Surgeons | Dokter Bedah |
| `nav.journey` | Your Journey | Perjalanan Anda |
| `nav.gallery` | Gallery | Galeri |
| `nav.stories` | Stories | Cerita |
| `nav.contact` | Contact | Kontak |
| `cta.planYourTreatment` | Plan your treatment | Rencanakan perawatan Anda |
| `cta.speakWithConcierge` | Speak with a Concierge | Hubungi Konsultan |
| `cta.beginYourJourney` | Begin your journey | Mulai perjalanan Anda |
| `cta.sendEnquiry` | Send enquiry | Kirim pertanyaan |
| `cta.viewAll` | View all | Lihat semua |
| `cta.readMore` | Read more | Selengkapnya |
| `form.name` | Your name | Nama Anda |
| `form.email` | Email | Email |
| `form.sending` | Sending… | Mengirim… |
| `form.sent` | Sent — thank you | Terkirim — terima kasih |
| `form.errorGeneric` | Something went wrong… | Terjadi kesalahan… |
| `pricing.fromAud` | from | dari |
| `pricing.complimentary` | complimentary | gratis |
| `pricing.included` | included | termasuk |
| `footer.copyright` | BIMC CosMedic. Managed by BIMC Hospital. | BIMC CosMedic. Dikelola oleh Rumah Sakit BIMC. |
