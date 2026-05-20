/* global React */
const { useState } = React;
const { Reveal, Img, Mono, Eyebrow, Btn, PageShell, ChapterOpener, IMG, TREATMENT_LIST, SURGEON_LIST, placeholder } = window;

// Per-treatment editorial content. Lives here so detail pages stay simple.
window.TREATMENT_CONTENT = {
  surgical: {
    chapter: "Chapter II.01 — Surgical",
    title: ["The art of", "refinement."],
    lede: "Considered surgical work performed in our ACHSI-accredited theatres — from rhinoplasty and facial rejuvenation to breast and body contouring.",
    leadSurgeon: "suka",
    subcategories: [
      { slug: "surgical-face", title: "Face", short: "Rhinoplasty, facelift, eyelid surgery — refinements that look like you, at your best.", available: true },
      { slug: "surgical-body", title: "Body", short: "Liposculpture, abdominoplasty, brachioplasty, thigh lift — body contouring with proportion in mind.", available: true },
      { slug: "surgical-breast", title: "Breast", short: "Augmentation, lift, reduction, and refinement — sized for proportion and longevity.", available: true },
    ],
    overview:
      "Surgery, in our view, is a quiet conversation. We begin not with what we can do but with what your face and body already do well — and we make our recommendations from there. Our plastic surgeons hold ISAPS and FICS credentials, with fellowship training in Korea, Japan, and Singapore; they perform between three and four cases a day, never more, in theatres that meet international accreditation standards.",
    sections: [
      { id: "consultation", t: "The consultation",
        body: "Every surgical journey at BIMC CosMedic begins with a private video consultation, typically lasting forty-five minutes. We will discuss your concerns, take a careful medical history, and — when appropriate — ask for high-resolution photographs from three angles. There is no obligation to proceed; many of our enquiries do not become procedures, and that is exactly as it should be." },
      { id: "approach", t: "Our approach",
        body: "We favour the smallest intervention that achieves the result. For some patients, that is an injectable; for others, a single surgical procedure; for a few, a staged plan over a year. We will tell you, before anything else, when surgery is not the answer." },
      { id: "theatre", t: "The theatre",
        body: "Procedures are performed at BIMC Hospital Nusa Dua — Indonesia's first ACHSI-accredited international hospital, and our home since 1998. Our surgical suites meet the same standards as those in Sydney or Singapore, and we are equipped for full general anaesthetic, day-stay, and overnight observation as required." },
      { id: "recovery", t: "Recovery",
        body: "Most surgical patients move directly to a private recovery villa for between five and fourteen days, depending on the procedure. Our nursing team visits daily, our surgeons see you twice in the first week, and our concierge handles everything else — meals, transport, paperwork, and the small kindnesses that make recovery feel less clinical." },
    ],
    procedures: [
      { n: "Rhinoplasty", d: "Open or closed approach. Three- to four-hour procedure under general anaesthetic; ten to fourteen days of recovery on island.", priceFrom: "AUD 8,500" },
      { n: "Breast augmentation", d: "Sub-muscular or sub-glandular placement; FDA-approved implants. Five to seven days of recovery.", priceFrom: "AUD 9,800" },
      { n: "Mastopexy (breast lift)", d: "With or without augmentation. Vertical or anchor incision based on anatomy.", priceFrom: "AUD 11,200" },
      { n: "Liposculpture", d: "Tumescent or VASER. Single or multiple areas. Three to five days of compression.", priceFrom: "AUD 6,800" },
      { n: "Abdominoplasty", d: "Mini, full, or extended. Often combined with liposculpture. Ten to fourteen days recovery.", priceFrom: "AUD 12,400" },
      { n: "Facelift", d: "Deep plane or SMAS. Often paired with eyelid surgery. Twelve to fourteen days recovery.", priceFrom: "AUD 14,800" },
      { n: "Eyelid surgery", d: "Upper, lower, or both. Local anaesthetic, hour-long procedure, seven days of recovery.", priceFrom: "AUD 5,400" },
      { n: "Brachioplasty", d: "Upper-arm contouring. Often performed after significant weight loss.", priceFrom: "AUD 8,200" },
      { n: "Thigh lift", d: "Inner thigh contouring. Performed under general anaesthetic.", priceFrom: "AUD 9,400" },
    ],
    faqs: [
      { q: "Is surgery in Bali as safe as at home?",
        a: "BIMC Hospital Nusa Dua is the first hospital in Indonesia accredited by the Australian Council on Healthcare Standards International. Our surgeons hold credentials from FRACS, the Singapore Medical Council, and the University of Tokyo. Our anaesthetists, theatres, and recovery protocols meet Australian standards." },
      { q: "How long should I plan to stay?",
        a: "Most surgical procedures require a stay of ten to fourteen days. Larger procedures may require eighteen to twenty-one days. We will give you a precise plan during your consultation." },
      { q: "Can I combine procedures?",
        a: "Often, yes — but only when it is safe. We will discuss combined procedures during consultation. Our surgeons are conservative about combinations: we would rather you return for a second short visit than overextend a single one." },
      { q: "What about scars?",
        a: "Every procedure leaves a scar, however small. We place incisions with great care, in shadow lines and folds wherever possible. Our scar therapy programme — silicone, light therapy, and massage — runs for six months post-operatively." },
    ],
    pricing: [
      { tier: "Consult only", italic: "A first conversation", amount: "0", from: "Complimentary", small: "45-minute video consult", items: ["Private video consultation", "Treatment plan within 48 hours", "No obligation", "All major languages"], cta: "Book a consult" },
      { tier: "Single procedure", italic: "Most patients begin here", amount: "8,500", from: "AUD · from", small: "Surgery + 10-day recovery", items: ["Surgical fee", "Theatre & anaesthetic", "Five days in private villa", "Daily nursing visits", "Twelve-month follow-up"], cta: "Plan your journey", featured: true },
      { tier: "Combined plan", italic: "Multiple procedures, one visit", amount: "16,800", from: "AUD · from", small: "Surgery + 18-day recovery", items: ["Two combined procedures", "Theatre & anaesthetic", "Fourteen days in villa", "Daily nursing & physiotherapy", "Twelve-month follow-up", "Family accommodation included"], cta: "Plan your journey" },
    ],
  },
  "non-surgical": {
    chapter: "Chapter II.02 — Non-surgical",
    title: ["Quiet hands,", "everyday work."],
    lede: "Injectables, lasers, and skin medicine practiced with the same care as our surgical work — for the small, considered refinements between bigger decisions.",
    leadSurgeon: "sissy",
    subcategories: [
      { slug: "non-surgical-injectables", title: "Injectables", short: "Botulinum toxin, dermal fillers, Profhilo, polynucleotides — by medical injectors only.", available: true },
      { slug: "non-surgical-laser", title: "Laser & Resurfacing", short: "Fractional laser, IPL, RF microneedling, chemical peels — sequenced around your travel.", available: true },
      { slug: "non-surgical-skin", title: "Skin Health", short: "Medical-grade facials and structured skin protocols, with home routines.", available: true },
    ],
    overview:
      "Non-surgical aesthetics is, at its best, almost invisible work. Our protocols are conservative; our injectors are slow; our laser settings are dialled to the minimum effective dose. The result is the one no one notices — only that you look rested.",
    sections: [
      { id: "philosophy", t: "Philosophy", body: "We work to a single principle: that the best non-surgical work is the kind that nobody sees. We will use less product, less heat, less of everything than you might expect — and we will tell you when you have reached the point where more would be too much." },
      { id: "injectables", t: "Injectables", body: "We use only Health-Canada and TGA-approved neuromodulators and dermal fillers. Treatments are performed in private treatment rooms by our medical injectors, never by technicians. A single appointment lasts forty-five minutes; results are visible within ten to fourteen days." },
      { id: "skin", t: "Skin & laser", body: "Our laser suite includes fractional CO₂, Q-switched, IPL, and RF microneedling devices. We tailor every protocol to skin type, season, and your travel timeline. Most laser treatments are paired with a recovery skincare plan that we send home with you." },
      { id: "treatment-day", t: "A treatment day", body: "Most non-surgical treatments are completed in a single afternoon, with no downtime beyond minor redness or swelling. Many of our patients fly out the next morning; for laser and injectables we ask for a forty-eight-hour buffer before flying." },
    ],
    procedures: [
      { n: "Botulinum toxin", d: "Forehead, glabella, periorbital. Fifteen-minute appointment; results within ten days.", priceFrom: "AUD 380" },
      { n: "Dermal fillers", d: "Cheeks, lips, mid-face, jawline. HA-based, Q-Med and Allergan products only.", priceFrom: "AUD 580" },
      { n: "Profhilo", d: "Bio-remodelling injectable for skin quality. Two-session protocol, one month apart.", priceFrom: "AUD 720" },
      { n: "Polynucleotides", d: "Tissue regeneration. Particularly suited to under-eyes and neck.", priceFrom: "AUD 680" },
      { n: "Fractional CO₂ laser", d: "Resurfacing. Five to seven days of recovery; we recommend at clinic stay.", priceFrom: "AUD 1,200" },
      { n: "IPL photofacial", d: "Pigment and vascular concerns. No downtime; do not pair with sun exposure.", priceFrom: "AUD 480" },
      { n: "Chemical peel", d: "Light to medium. Brightening and texture. Three- to five-day flake.", priceFrom: "AUD 320" },
      { n: "RF microneedling", d: "Tightening and texture. Series of three, one month apart.", priceFrom: "AUD 880" },
      { n: "HydraFacial", d: "Cleanse, exfoliate, hydrate. No downtime; ideal day-of-event treatment.", priceFrom: "AUD 280" },
      { n: "PRP for skin", d: "Platelet-rich plasma microinjections. Three sessions, one month apart.", priceFrom: "AUD 680" },
      { n: "Skin boosters", d: "Hydrating microinjections. Two- to three-session protocols.", priceFrom: "AUD 480" },
      { n: "Medical-grade facial", d: "Bespoke facial with prescription products. Excellent maintenance.", priceFrom: "AUD 220" },
    ],
    faqs: [
      { q: "How long do results last?", a: "Botulinum toxin: three to four months. Dermal fillers: nine to eighteen months depending on product and area. Profhilo: six to nine months. Laser: results are progressive and lifelong with maintenance." },
      { q: "Is there a recovery period?", a: "Most non-surgical treatments have minimal downtime — a few hours of mild redness or swelling. Fractional CO₂ laser is the exception, requiring five to seven days of clinical recovery." },
      { q: "Can I treat multiple areas in one visit?", a: "Yes — we routinely combine injectables, laser, and skin treatments across a single afternoon. We will sequence them carefully to minimise inflammation and recovery." },
      { q: "What about flying after treatment?", a: "We ask for a forty-eight-hour buffer between injectables or laser and flying. For most patients on a one-week visit, this is no constraint." },
    ],
    pricing: [
      { tier: "Refresh", italic: "A maintenance visit", amount: "650", from: "AUD · from", small: "Injectables + facial", items: ["Botulinum toxin (one area)", "Medical-grade facial", "Skin consultation", "Take-home protocol"], cta: "Book a refresh" },
      { tier: "The Edit", italic: "A considered transformation", amount: "1,800", from: "AUD · from", small: "Multi-modality, single afternoon", items: ["Botulinum toxin (full face)", "Dermal filler (one area)", "Laser or RF microneedling", "HydraFacial finish", "Twelve-month skin plan"], cta: "Plan your edit", featured: true },
      { tier: "The Reset", italic: "A complete reset, paced over five days", amount: "3,800", from: "AUD · from", small: "Five-day protocol", items: ["Fractional CO₂ laser", "Profhilo (two sessions)", "Comprehensive injectables", "Five days in recovery villa", "Daily skincare consults"], cta: "Plan your reset" },
    ],
  },
  hair: {
    chapter: "Chapter II.03 — Hair Restoration",
    title: ["Returning,", "quietly."],
    lede: "Follicular unit extraction and PRP-based therapies, performed over considered single-day or staged sessions — to restore hairlines without ever announcing them.",
    leadSurgeon: "suka",
    subcategories: [
      { slug: "hair-fue", title: "FUE Surgical", short: "Sapphire FUE, DHI, eyebrow and beard restoration — single-follicle work, never detected.", available: true },
      { slug: "hair-therapy", title: "Follicle Therapy", short: "PRP, polynucleotides, and topical protocols — therapy before surgery where it can serve.", available: true },
    ],
    overview:
      "Hair restoration, done well, is impossible to detect. We work with sapphire FUE and DHI techniques, place follicles one at a time, and design hairlines that respect what your face has always done. A single graft, placed badly, is more visible than a thousand placed well.",
    sections: [
      { id: "consult", t: "The consultation", body: "Every hair restoration begins with a trichoscopy — a high-resolution scalp examination — and a discussion of your family history. We will assess donor density, recipient demand, and miniaturisation, then design a hairline that suits your face shape and ageing trajectory." },
      { id: "technique", t: "Technique", body: "We perform sapphire FUE for most patients, and DHI (direct hair implantation) for those requiring tighter angles or higher density. Both are minimally invasive, performed under local anaesthetic, and produce no linear scar." },
      { id: "the-day", t: "The procedure day", body: "A typical session lasts seven to nine hours, including breaks for meals. Most patients listen to music, take calls, or sleep. We aim for two thousand to three thousand grafts in a single day; larger cases may be staged over two consecutive days." },
      { id: "growth", t: "What to expect after", body: "Initial growth begins at three to four months; substantial density at six to nine months; final result at twelve to fifteen months. We support this with a twelve-month protocol of PRP, topical treatment, and oral support where appropriate." },
    ],
    procedures: [
      { n: "Sapphire FUE", d: "Follicular unit extraction with sapphire blades. Most common procedure; suits most patterns.", priceFrom: "AUD 4,800" },
      { n: "DHI Choi Implanter", d: "Direct hair implantation. Higher density; suited to crown and frontotemporal.", priceFrom: "AUD 6,200" },
      { n: "PRP scalp therapy", d: "Platelet-rich plasma. Standalone or supportive of FUE/DHI. Three-session protocol.", priceFrom: "AUD 680" },
    ],
    faqs: [
      { q: "How many grafts will I need?", a: "A typical hairline restoration is between 1,800 and 3,000 grafts; full-pattern restoration may require 4,000 to 5,500, often staged. We will give you a precise estimate after trichoscopy." },
      { q: "How long is recovery?", a: "Three to five days of crusting; ten days before the donor area is fully healed. We ask you to remain on the island for a minimum of seven days post-procedure." },
      { q: "Will it look natural?", a: "Yes — when designed well. Our lead trichologist personally designs every hairline. We will show you the design, on your face, before we make a single incision." },
    ],
    pricing: [
      { tier: "Targeted", italic: "Hairline or crown", amount: "4,800", from: "AUD · from", small: "Up to 2,000 grafts", items: ["Trichoscopy & design", "Sapphire FUE (≤ 2,000 grafts)", "Three days at clinic", "PRP follow-up included", "Twelve-month topical plan"], cta: "Book a consult" },
      { tier: "Full restoration", italic: "Most patients begin here", amount: "8,400", from: "AUD · from", small: "Up to 3,500 grafts", items: ["Trichoscopy & design", "Sapphire FUE or DHI", "Five days in private villa", "Daily nursing follow-up", "Three-session PRP", "Twelve-month topical plan"], cta: "Plan your journey", featured: true },
      { tier: "Staged", italic: "Larger restorations, paced", amount: "12,800", from: "AUD · from", small: "Two visits, six months apart", items: ["First visit: 3,500 grafts", "Second visit: 2,000 grafts", "Two recovery villa stays", "Year-long PRP & topical", "All travel coordination"], cta: "Plan your journey" },
    ],
  },
  dental: {
    chapter: "Chapter II.04 — Dental Aesthetics",
    title: ["The smile,", "refined."],
    lede: "Porcelain veneers, clear alignment, and considered whitening — paced to suit your visit, performed in a small dental studio attached to the clinic.",
    leadSurgeon: "astri",
    subcategories: [
      { slug: "dental-veneers", title: "Veneers", short: "Porcelain, composite, and minimal-prep veneers — designed with our ceramicist.", available: true },
      { slug: "dental-alignment", title: "Alignment", short: "Clear aligners, lingual alternatives, and retainer programmes — scanned in Bali, completed at home.", available: true },
      { slug: "dental-whitening", title: "Whitening", short: "Professional in-chair, take-home, and combined protocols — natural-looking shade improvement.", available: true },
    ],
    overview:
      "We approach a smile the way we approach a face: as something that should look like the person, only at their best. Our dental studio is small — two surgeries, one ceramicist on staff — and we sequence treatment over your visit so that the final smile is delivered in calm, considered stages.",
    sections: [
      { id: "consult", t: "Smile design consult", body: "Every dental visit begins with a smile design consult — a 3D scan, photography, and a discussion of what you would like to keep and what you would like to refine. We will produce a digital preview of the proposed smile within forty-eight hours." },
      { id: "veneers", t: "Veneers", body: "We work in pressed lithium disilicate and feldspathic porcelain. Both are placed by our lead surgeon personally, with our ceramicist refining shade and translucency on-site. We never place stock veneers." },
      { id: "alignment", t: "Alignment", body: "For patients with mild to moderate alignment concerns, we offer Invisalign and bespoke clear aligner systems. Most cases complete within six to nine months and may be reviewed remotely after the initial fitting." },
      { id: "timeline", t: "Treatment timeline", body: "A full veneer case typically requires three visits over fourteen days: scan and prep, try-in, and final placement. Whitening alone is a single afternoon. Alignment is a longer programme, supported between visits by remote monitoring." },
    ],
    procedures: [
      { n: "Porcelain veneers", d: "Per tooth. Pressed lithium disilicate. Three-visit protocol over 14 days.", priceFrom: "AUD 980" },
      { n: "Composite veneers", d: "Per tooth. Same-day placement. Excellent for minor corrections.", priceFrom: "AUD 480" },
      { n: "Clear alignment", d: "Full programme. Bespoke aligners; six- to nine-month duration.", priceFrom: "AUD 4,800" },
      { n: "Professional whitening", d: "In-chair whitening with take-home maintenance trays.", priceFrom: "AUD 580" },
      { n: "Smile design consult", d: "3D scan, photography, digital preview within 48 hours.", priceFrom: "AUD 280" },
    ],
    faqs: [
      { q: "How many veneers will I need?", a: "Most patients require between six and ten veneers across the smile line. We will recommend the minimum that achieves a natural, balanced result. Less is more." },
      { q: "Will my veneers look natural?", a: "Yes. Our ceramicist refines shade and translucency on-site, and we always do a try-in appointment before final placement so you can see the smile in your face before we commit." },
      { q: "How long do they last?", a: "Pressed porcelain veneers, well-maintained, last fifteen to twenty years. We provide a five-year warranty against fracture or de-bond." },
    ],
    pricing: [
      { tier: "Whitening & polish", italic: "A single afternoon", amount: "780", from: "AUD · from", small: "In-chair + take-home", items: ["In-chair professional whitening", "Take-home maintenance trays", "Polish & cleaning", "Twelve-month review"], cta: "Book a consult" },
      { tier: "Smile design", italic: "Most patients begin here", amount: "9,800", from: "AUD · from", small: "Eight veneers + finish", items: ["Smile design consult", "Eight pressed porcelain veneers", "On-site ceramicist refinement", "Three visits over 14 days", "Five-year warranty"], cta: "Plan your smile", featured: true },
      { tier: "Comprehensive", italic: "Veneers, alignment, finish", amount: "16,400", from: "AUD · from", small: "Staged over 9 months", items: ["Six- to nine-month alignment", "Ten porcelain veneers", "Whitening prior to placement", "Remote review between visits", "Five-year warranty"], cta: "Plan your journey" },
    ],
  },
  recovery: {
    chapter: "Chapter II.06 — Weight Loss",
    title: ["Weight loss,", "considered."],
    lede: "Medical, endoscopic, and bariatric pathways — paced by your goals and supported by nutrition, behavioural, and metabolic specialists from first consult through twelve months of follow-up.",
    leadSurgeon: "suka",
    subcategories: [
      { slug: "weight-loss-medical", title: "Medical", short: "GLP-1 medications, structured dietitian programmes, and prescription protocols — no surgery.", available: true },
      { slug: "weight-loss-endoscopic", title: "Endoscopic", short: "Gastric balloon and endoscopic sleeve gastroplasty — same-week recovery, no incisions.", available: true },
      { slug: "weight-loss-surgical", title: "Bariatric Surgery", short: "Sleeve gastrectomy, gastric bypass, and revision surgery — laparoscopic, with twelve months of follow-up.", available: true },
    ],
    overview:
      "Weight loss is one of the most multidisciplinary parts of our practice — and one where we move slowest. We require a structured pre-programme for any surgical or endoscopic pathway: nutrition, psychology, behavioural coaching. Patients who arrive expecting a fast intervention are typically directed first to medical pathways; surgical and endoscopic options follow only when supported by twelve weeks of preparation.",
    sections: [
      { id: "consultation", t: "The consultation", body: "Every weight-loss journey begins with a sixty-minute consultation with our endocrinologist or bariatric surgeon, depending on your stated goals. We assess medical history, weight history, body composition, baseline bloods, and the psychological and behavioural context. Pathway recommendation follows." },
      { id: "approach", t: "Our approach", body: "Medical first, always, where it can serve. We are conservative about surgical and endoscopic intervention — they are remarkable tools for the right patient, but they are not the right answer for everyone presenting with weight goals. We will tell you honestly which pathway suits your case." },
      { id: "team", t: "The team", body: "Our weight-loss team includes a consultant endocrinologist, consultant bariatric surgeon, consultant gastroenterologist (for endoscopic procedures), two clinical dietitians, and a behavioural-health psychologist. Every patient is presented at multidisciplinary review before a surgical or endoscopic plan is confirmed." },
      { id: "support", t: "Twelve-month follow-up", body: "Twelve months of structured follow-up after any procedure: monthly video reviews for the first six months, then quarterly, with dietitian and behavioural support throughout. We coordinate ongoing care with your home-country GP where helpful." },
    ],
    procedures: [
      { n: "Medical pathway", d: "GLP-1 medications, dietitian programmes, behavioural coaching.", priceFrom: "AUD 580" },
      { n: "Endoscopic pathway", d: "Gastric balloon or endoscopic sleeve gastroplasty (ESG).", priceFrom: "AUD 6,800" },
      { n: "Bariatric surgery", d: "Sleeve gastrectomy, Roux-en-Y bypass, or revision.", priceFrom: "AUD 14,800" },
    ],
    faqs: [
      { q: "How do I know which pathway is right for me?", a: "BMI is the starting point; medical history, behavioural readiness, and lifestyle constraints all matter. We recommend pathway in MDT consultation, never by phone or form alone." },
      { q: "Can you ship medications to my home country?", a: "Yes — we coordinate refills via international pharmacy partners. Monthly video reviews continue regardless of where you are." },
      { q: "Do you require a pre-surgery programme?", a: "Yes — twelve weeks minimum for any surgical or endoscopic pathway. Nutrition, psychology, exercise physiology. We do not skip this step." },
    ],
    pricing: [
      { tier: "Medical", italic: "Pharmacological pathways", amount: "1,180", from: "AUD · from / month", small: "12-month minimum", items: ["GLP-1 or tirzepatide", "Endocrinologist video review", "Monthly dietitian session", "Behavioural support", "Body composition tracking"], cta: "Plan medical pathway" },
      { tier: "Endoscopic", italic: "Most chosen non-surgical pathway", amount: "8,400", from: "AUD · from", small: "12-month balloon", items: ["Spatz adjustable balloon", "Endoscopic placement", "Twelve months of dietitian support", "Removal at 12 months", "Behavioural programme"], cta: "Plan endoscopic", featured: true },
      { tier: "Surgical", italic: "Bariatric surgery pathway", amount: "14,800", from: "AUD · from", small: "Sleeve gastrectomy", items: ["Twelve-week pre-programme", "Theatre, anaesthetic & two-night observation", "10 nights private villa", "Dietitian-supervised recovery", "12-month follow-up"], cta: "Plan bariatric" },
    ],
  },
  reconstructive: {
    chapter: "Chapter II.02 — Reconstructive Surgery",
    title: ["Reconstructive", "surgery."],
    lede: "Reconstruction after cancer, trauma, or congenital conditions — performed by ISAPS- and craniomaxillofacial-credentialed surgeons in our ACHSI-accredited theatres, often in coordination with oncology teams in your home country.",
    leadSurgeon: "wara",
    subcategories: [
      { slug: "reconstructive-breast", title: "Breast Reconstruction", short: "Implant-based and autologous (DIEP, TRAM) reconstruction after mastectomy.", available: true },
      { slug: "reconstructive-trauma", title: "Trauma & Scar", short: "Scar revision, burn reconstruction, skin grafts, and complex flap repair.", available: true },
      { slug: "reconstructive-craniofacial", title: "Craniofacial", short: "Cleft repair, maxillofacial trauma, orbital reconstruction, microtia.", available: true },
    ],
    overview:
      "Reconstructive plastic surgery sits at the technical and emotional centre of our practice. Many of our reconstructive patients are travelling for work that is unavailable, expensive, or rushed in their home country — breast reconstruction after cancer, scar revision after trauma, cleft repair where local expertise is limited. We work slowly, coordinate carefully with home-country teams, and provide full surgical documentation for insurance.",
    sections: [
      { id: "consultation", t: "The consultation", body: "Reconstructive consultations are longer than aesthetic — typically ninety minutes. We review imaging, original surgical records (where available), and oncology or trauma history. For many cases we coordinate directly with your home-country specialist before quoting." },
      { id: "approach", t: "Our approach", body: "Reconstruction is rarely a single operation. We plan in stages, sequence procedures around your medical context (oncology timing, trauma healing, growth), and treat each stage as part of a longer relationship. Some reconstructive work is also covered by insurance — we help with that where we can." },
      { id: "team", t: "The team", body: "Our reconstructive surgeons include a craniomaxillofacial subspecialist, an ISAPS member with breast-reconstruction fellowship training, and a research-active reconstructive trauma fellow. We also maintain a small pro-bono pathway each year for craniofacial congenital cases, coordinated through international aid organisations." },
      { id: "documentation", t: "Documentation & insurance", body: "Reconstruction after cancer, trauma, or congenital conditions is often recognised by insurers as medically necessary. We provide full surgical reports, anaesthetic records, and itemised invoicing in your insurer's preferred format. We have placed claims successfully with insurers across Australia, the UK, Singapore, and North America." },
    ],
    procedures: [
      { n: "Breast reconstruction", d: "Implant-based or DIEP/TRAM autologous reconstruction after mastectomy.", priceFrom: "AUD 14,800" },
      { n: "Scar revision", d: "From minor local-anaesthetic excision to complex multi-stage repair.", priceFrom: "AUD 1,800" },
      { n: "Burn reconstruction", d: "Staged reconstruction for burn deformity, contracture, or functional impairment.", priceFrom: "AUD 14,800" },
      { n: "Cleft lip & palate", d: "Primary and secondary repair, paediatric or adolescent.", priceFrom: "AUD 6,800" },
      { n: "Maxillofacial trauma", d: "Reconstruction after facial fractures or post-traumatic deformity.", priceFrom: "AUD 12,400" },
      { n: "Microtia ear", d: "Rib-graft or Medpor reconstruction of the external ear.", priceFrom: "AUD 18,400" },
    ],
    faqs: [
      { q: "Will my insurance cover this?", a: "Reconstruction is often covered partially or fully where medically necessary. We provide documentation in your insurer's preferred format and coordinate with their case manager where helpful." },
      { q: "Can you coordinate with my oncology team at home?", a: "Yes — and we strongly encourage it. We've worked alongside oncology teams in Australia, the UK, Singapore, and North America. Your concierge handles the introduction." },
      { q: "Do you accept paediatric patients?", a: "Yes — particularly for cleft repair and microtia reconstruction. We have paediatric anaesthesia, paediatric nursing, and family-friendly recovery accommodation." },
      { q: "How long is the relationship?", a: "Most reconstructive cases span multiple operations over twelve to twenty-four months. Cleft repair can span a decade. We commit to the full relationship from first consultation." },
    ],
    pricing: [
      { tier: "Implant reconstruction", italic: "Direct-to-implant after mastectomy", amount: "14,800", from: "AUD · from", small: "Single-stage where suitable", items: ["Theatre, anaesthetic & overnight observation", "7 nights in private recovery villa", "Daily nursing", "Insurance documentation pack", "12-month telehealth follow-up"], cta: "Plan reconstruction" },
      { tier: "DIEP reconstruction", italic: "Autologous, most natural result", amount: "28,400", from: "AUD · from", small: "Microsurgical autologous", items: ["Microsurgical theatre time", "Two-night hospital observation", "14 nights in private villa", "Daily nursing & physiotherapy", "Lymphatic drainage", "Insurance documentation pack", "12-month telehealth follow-up"], cta: "Plan DIEP", featured: true },
      { tier: "Trauma & scar", italic: "Revision, burn, complex repair", amount: "1,800", from: "AUD · from", small: "Minor revision to major staged", items: ["Pre-op surgical review", "Theatre and anaesthetic per stage", "Recovery villa where indicated", "Scar protocol", "Insurance documentation"], cta: "Plan trauma reconstruction" },
    ],
  },
};

const FAQItem = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={`faq-item ${open ? "open" : ""}`}>
      <button className="faq-q" onClick={() => setOpen(o => !o)}>
        <span>{q}</span>
        <span className="plus">+</span>
      </button>
      <div className="faq-a">
        <div className="faq-a-inner">{a}</div>
      </div>
    </div>
  );
};

window.TreatmentDetailPage = ({ slug }) => {
  const t = TREATMENT_LIST.find(x => x.slug === slug);
  const c = window.TREATMENT_CONTENT[slug];
  const surgeon = SURGEON_LIST.find(s => s.slug === c.leadSurgeon);

  return (
    <PageShell activePage={`treatment-${slug}`}>
      <ChapterOpener
        chapter={c.chapter}
        title={c.title}
        lede={c.lede}
        image={t.heroImg}
        imageHue={t.hue}
        imageLabel={t.t.toUpperCase()}
        breadcrumbs={[
          { label: "BIMC CosMedic", href: "index.html" },
          { label: "Treatments", href: "treatments.html" },
          { label: t.t },
        ]}
      />

      <div className="detail-layout">
        <aside className="detail-toc">
          <Mono>On this page</Mono>
          <ol>
            <li><a href="#overview">Overview</a></li>
            {c.sections.map((s, i) => (
              <li key={s.id}><a href={`#${s.id}`}>{s.t}</a></li>
            ))}
            {c.subcategories
              ? <li><a href="#subcategories">Sub-categories</a></li>
              : <li><a href="#procedures">Procedures</a></li>}
            <li><a href="#faqs">FAQs</a></li>
          </ol>
        </aside>

        <div className="detail-body">
          <section id="overview">
            <Reveal>
              <h2>Overview</h2>
              <p className="lede" style={{ fontSize: 18 }}>{c.overview}</p>
            </Reveal>

            <Reveal delay={120}>
              <div className="surgeon-mini" data-surgeon={surgeon.slug}>
                <div className="surgeon-mini-img">
                  <Img src={surgeon.img} fallbackLabel={`DR. ${surgeon.common.toUpperCase()}`} fallbackHue={surgeon.hue} alt="" />
                </div>
                <div className="surgeon-mini-meta">
                  <Mono>{surgeon.lead ? "Lead Surgeon" : "Specialist"}</Mono>
                  <h4>{surgeon.title} {surgeon.name}</h4>
                  <span className="smm-spec">{surgeon.cred}</span>
                </div>
                <Btn kind="ghost" as="a" href={`surgeon-${surgeon.slug}.html`}>Read profile</Btn>
              </div>
            </Reveal>
          </section>

          {c.sections.map((s, i) => (
            <section key={s.id} id={s.id}>
              <Reveal>
                <h2>{s.t}</h2>
                <p>{s.body}</p>
              </Reveal>
            </section>
          ))}

          {c.subcategories && (
            <section id="subcategories">
              <Reveal>
                <h2>Choose a focus</h2>
                <p>This discipline is organised into {c.subcategories.length === 2 ? "two" : c.subcategories.length === 3 ? "three" : c.subcategories.length} areas. Each page lists every treatment we offer with its starting price.</p>
              </Reveal>
              <div style={{ marginTop: 40, borderTop: "1px solid var(--ink-20)" }}>
                {c.subcategories.map((sc, i) => {
                  const scData = window.SUBCATEGORY_DATA?.[sc.slug];
                  const firstThree = scData?.treatments?.slice(0, 3).map(x => x.name).join(" · ") || sc.short;
                  const inner = (
                    <div style={{
                      display: "grid",
                      gridTemplateColumns: "180px 1fr 36px",
                      gap: 32,
                      padding: "28px 0",
                      borderBottom: "1px solid var(--ink-20)",
                      alignItems: "center",
                      transition: "padding-left .25s ease, background .25s ease",
                    }}
                    onMouseEnter={e => {
                      if (!sc.available) return;
                      e.currentTarget.style.paddingLeft = "8px";
                      const a = e.currentTarget.querySelector(".sc-arrow");
                      if (a) a.style.transform = "translateX(6px)";
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.paddingLeft = "0";
                      const a = e.currentTarget.querySelector(".sc-arrow");
                      if (a) a.style.transform = "translateX(0)";
                    }}
                    >
                      <div style={{ aspectRatio: "4/3", overflow: "hidden", background: "var(--cream)" }}>
                        <Img src={t.img} fallbackLabel={sc.title.toUpperCase()} fallbackHue={(t.hue || 0) + i} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                        <h3 style={{
                          fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 400,
                          fontSize: 32, margin: 0, letterSpacing: "-0.01em", color: "var(--ink-100)",
                        }}>{sc.title}</h3>
                        <p style={{ margin: "4px 0 0", fontSize: 15, color: "var(--ink-80)", lineHeight: 1.55, maxWidth: 640 }}>{sc.short}</p>
                        <span style={{
                          marginTop: 6, fontFamily: "var(--font-mono)", fontSize: 10,
                          letterSpacing: "0.22em", textTransform: "uppercase",
                          color: sc.available ? "var(--accent-deep)" : "var(--ink-40)",
                        }}>{sc.available ? "Read more →" : "Coming v1.4"}</span>
                      </div>
                      <span className="sc-arrow" style={{
                        fontFamily: "var(--font-serif)", fontSize: 26, textAlign: "right",
                        color: sc.available ? "var(--accent-deep)" : "var(--ink-20)",
                        transition: "transform .25s ease",
                      }}>{sc.available ? "→" : ""}</span>
                    </div>
                  );
                  return (
                    <Reveal key={sc.slug} delay={i * 60} y={20}>
                      {sc.available ? (
                        <a href={`treatment-${sc.slug}.html`} style={{ color: "inherit", textDecoration: "none", display: "block" }}>{inner}</a>
                      ) : (
                        <div style={{ opacity: 0.55, cursor: "default" }}>{inner}</div>
                      )}
                    </Reveal>
                  );
                })}
              </div>
            </section>
          )}

          {!c.subcategories && (
          <section id="procedures">
            <Reveal>
              <h2>Procedures</h2>
              <p>The full list, with our typical price-from. We will give you a precise quote during consultation.</p>
            </Reveal>
            <div style={{ marginTop: 32, borderTop: "1px solid var(--ink-20)" }}>
              {c.procedures.map((p, i) => {
                // Map procedure name to slug. PROCEDURE_DATA keys are slugs;
                // we match by title (case-insensitive, ignoring suffixes like "(breast lift)").
                const procSlug = (() => {
                  const procData = window.PROCEDURE_DATA || {};
                  for (const [slug, data] of Object.entries(procData)) {
                    if (data.parent !== slug.split("-")[0] && data.parent !== c.parent) {
                      // Skip mismatched parents (defensive)
                    }
                    // Match by title with loose comparison
                    const procTitle = data.title.toLowerCase().replace(/\s*\(.*?\)/g, "").trim();
                    const rowName = p.n.toLowerCase().replace(/\s*\(.*?\)/g, "").trim();
                    if (procTitle === rowName) return slug;
                  }
                  return null;
                })();

                const rowContent = (
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 2fr 180px 36px",
                    gap: 24,
                    padding: "24px 0",
                    borderBottom: "1px solid var(--ink-20)",
                    alignItems: "center",
                    cursor: procSlug ? "pointer" : "default",
                    transition: "padding-left .25s ease",
                  }}
                  onMouseEnter={e => { if (procSlug) { e.currentTarget.style.paddingLeft = "8px"; const a = e.currentTarget.querySelector(".tdr-arrow"); if (a) a.style.transform = "translateX(6px)"; } }}
                  onMouseLeave={e => { e.currentTarget.style.paddingLeft = "0"; const a = e.currentTarget.querySelector(".tdr-arrow"); if (a) a.style.transform = "translateX(0)"; }}
                  >
                    <h4 style={{ fontFamily: "var(--font-serif)", fontSize: 22, fontWeight: 400, margin: 0, letterSpacing: "-0.005em" }}>
                      {p.n}
                    </h4>
                    <p style={{ margin: 0, fontSize: 15, color: "var(--ink-80)", lineHeight: 1.55 }}>{p.d}</p>
                    <window.PriceTag aud={p.priceFrom} align="right" />
                    <span className="tdr-arrow" style={{
                      display: "flex", alignItems: "center", justifyContent: "flex-end",
                      fontFamily: "var(--font-serif)", fontSize: 26, color: procSlug ? "var(--accent-deep)" : "var(--ink-20)",
                      transition: "transform .25s ease",
                    }}>{procSlug ? "→" : ""}</span>
                  </div>
                );

                return (
                  <Reveal key={i} delay={i * 30}>
                    {procSlug ? (
                      <a href={`procedure-${procSlug}.html`} style={{ color: "inherit", textDecoration: "none", display: "block" }}>
                        {rowContent}
                      </a>
                    ) : (
                      rowContent
                    )}
                  </Reveal>
                );
              })}
            </div>
          </section>
          )}

          <section id="faqs">
            <Reveal><h2>Frequently asked</h2></Reveal>
            <div className="faq-list">
              {c.faqs.map((f, i) => (
                <FAQItem key={i} q={f.q} a={f.a} />
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* Related */}
      <section className="page-section tinted">
        <Reveal>
          <div className="section-head">
            <Eyebrow>Related</Eyebrow>
            <div>
              <h2 className="section-title"><span className="italic">Often considered</span> alongside.</h2>
              <p className="section-lede">Many of our patients combine treatments across disciplines. These pair particularly well with {t.t.toLowerCase()}.</p>
            </div>
          </div>
        </Reveal>
        <div className="related-grid">
          {TREATMENT_LIST.filter(x => x.slug !== slug).slice(0, 3).map((rel, i) => (
            <Reveal key={rel.slug} delay={i * 80}>
              <a href={`treatment-${rel.slug}.html`} className="related-card" style={{ color: "inherit" }}>
                <div className="related-card-img">
                  <Img src={rel.img} fallbackLabel={rel.t.toUpperCase()} fallbackHue={rel.hue} alt="" />
                </div>
                <Mono>{rel.n}</Mono>
                <h4>{rel.t}</h4>
                <p>{rel.sub}</p>
              </a>
            </Reveal>
          ))}
        </div>
      </section>
    </PageShell>
  );
};
