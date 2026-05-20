/* global window */
// Sub-category data. Each entry maps a discipline → sub-category to a list
// of inline treatments displayed as accordion rows on the sub-category page.
//
// Schema:
//   parent       — slug of parent discipline (e.g. "surgical")
//   slug         — full slug, used in URL: treatment-{slug}.html
//   title        — display name of sub-category (e.g. "Breast")
//   chapterTitle — [string, string] used as editorial hero h1
//   tagline      — italic strap under chapter
//   lede         — single paragraph below hero
//   intro        — optional longer intro shown above the list
//   leadSurgeon  — slug of surgeon to mini-card on the page
//   treatments   — Array of treatments. Each:
//     { name, short, priceFromAud, detail: { description, duration, recovery, included[] } }

window.SUBCATEGORY_DATA = {
  "surgical-breast": {
    parent: "surgical",
    slug: "surgical-breast",
    title: "Breast",
    chapterTitle: ["Considered,", "your own."],
    tagline: "Conservative work, proportioned to your anatomy.",
    lede:
      "A complete repertoire of breast surgery — implant-based augmentation, lifting, reduction, and refinement — performed in our ACHSI-accredited theatres by ISAPS-member plastic surgeons. We size for proportion and longevity, not volume.",
    intro:
      "Every plan begins with a private consultation, careful measurements of breast width and skin envelope, and an honest conversation about whether surgery is the right answer. Many patients leave their consult choosing a smaller intervention than they arrived expecting.",
    overview:
      "Breast surgery, in our view, is anatomical work first and aesthetic work second. We size implants in millilitres rather than cup sizes, plan incisions around lifestyle and lactation goals, and prefer the smaller intervention every time we can defend it. Recovery is supervised — daily nursing visits in a private villa, two scheduled surgeon reviews, and twelve months of telehealth follow-up after you fly home.",
    sections: [
      {
        id: "consultation",
        t: "The consultation",
        body: "Every breast surgery begins with a forty-five minute private consultation, in person or by video. We take careful measurements — breast width, projection, skin envelope, soft-tissue coverage — and discuss your goals against your anatomy. Where helpful we use 3D simulation and rice-bag try-ins to make the projected result tangible. Many patients leave their consultation choosing a smaller implant than they arrived expecting; we are at peace with that.",
      },
      {
        id: "approach",
        t: "Our approach",
        body: "We favour conservative, structure-preserving surgery: smaller implants placed well, lifts that preserve sensation, reductions that protect lactation potential where possible. We use FDA-approved devices exclusively, irrigate pockets with antibiotic solution, and insert with the Keller funnel technique to minimise contamination. Our capsular contracture rate sits below 5% at two years.",
      },
      {
        id: "theatre",
        t: "The procedure",
        body: "All breast surgery is performed under general anaesthetic in our ACHSI-accredited theatres, with overnight observation under nursing care. Most patients move to a private recovery villa the following morning. Theatre time ranges from ninety minutes (straightforward augmentation) to four hours (combined procedures or complex revisions).",
      },
      {
        id: "recovery",
        t: "Recovery",
        body: "Five to ten nights on the island depending on the procedure, with daily nursing visits in your villa for the first week. We schedule lymphatic drainage sessions from day three to support healing and a soft surgical bra at all times for six weeks. Scars are managed actively with silicone protocols beginning at week three.",
      },
    ],
    faqs: [
      { q: "How do you decide implant size?",
        a: "By measuring your breast width, skin envelope, and soft-tissue cover, then sizing in millilitres. We almost always recommend the smaller of two viable options — patients who size up later have far fewer regrets than patients who size up first." },
      { q: "Can I breastfeed afterwards?",
        a: "Most augmented and lifted patients breastfeed without difficulty. We avoid peri-areolar incisions where possible and preserve glandular structure during lifts. Reduction is the procedure most likely to affect lactation; we discuss the trade-off carefully when relevant." },
      { q: "How long until I can fly home?",
        a: "Five to fourteen days depending on the procedure. We will not authorise an earlier flight for safety reasons — DVT risk and pressure changes both matter — and we will not encourage you to stay longer than you need to." },
      { q: "What about combined procedures?",
        a: "Common and often the safer plan — one anaesthetic, one recovery, one cost. We are conservative about combining very long procedures and will sometimes recommend splitting across two visits where total theatre time would exceed five hours." },
    ],
    leadSurgeon: "suka",
    treatments: [
      {
        name: "Silicone implants",
        short: "Cohesive-gel, FDA-approved implants. The most natural feel; our default choice.",
        priceFromAud: 9800,
        detail: {
          description:
            "Cohesive silicone gel implants placed sub-muscular or sub-glandular. We use round, smooth, fifth-generation implants from manufacturers with thirty-year warranties. The result feels closest to natural breast tissue, particularly in patients with limited soft-tissue cover.",
          duration: "90 minutes – 2 hours · General anaesthetic",
          recovery: "5–7 days on-island recovery, ten to fourteen days total downtime",
          included: [
            "Pre-op imaging and rice-bag try-ins",
            "Theatre, anaesthetic & overnight hospital observation",
            "5–7 nights in private recovery villa",
            "Daily nursing visits",
            "Compression garment and support bra",
            "12-month telehealth follow-up",
          ],
        },
      },
      {
        name: "Saline implants",
        short: "Functional, conservative; rupture immediately detectable. Best for select cases.",
        priceFromAud: 9200,
        detail: {
          description:
            "Saline-filled implants placed sub-muscular. Slightly firmer feel than silicone and more prone to visible rippling in thin-tissue patients — but any rupture is instantly obvious, and saline poses no concerns if it does occur. Suited to patients who prioritise that peace of mind.",
          duration: "90 minutes · General anaesthetic",
          recovery: "5–7 days on-island recovery",
          included: [
            "Pre-op imaging and rice-bag try-ins",
            "Theatre, anaesthetic & overnight observation",
            "5 nights in private recovery villa",
            "Daily nursing visits",
            "Compression garment and support bra",
            "12-month telehealth follow-up",
          ],
        },
      },
      {
        name: "Breast lift (Mastopexy)",
        short: "Reshaping without implants — for patients whose volume is sufficient but position has changed.",
        priceFromAud: 11200,
        detail: {
          description:
            "Vertical or anchor incision pattern selected to your anatomy. We reposition the breast tissue and nipple-areola complex on the chest wall, removing redundant skin. Volume is preserved; only shape and position change.",
          duration: "2.5 – 3 hours · General anaesthetic",
          recovery: "7 nights in private villa; ten to fourteen days total",
          included: [
            "Theatre, anaesthetic & overnight observation",
            "7 nights in private recovery villa",
            "Daily nursing visits",
            "Two lymphatic drainage sessions",
            "Surgical bra and scar protocol",
            "12-month telehealth follow-up",
          ],
        },
      },
      {
        name: "Lift with implants",
        short: "Augmentation paired with mastopexy — for patients who want both more volume and restored position.",
        priceFromAud: 13400,
        detail: {
          description:
            "A combined procedure: lift to address skin envelope, implants to add or restore upper-pole fullness. Technically more demanding than either alone; we plan it as a single staged operation where appropriate, or occasionally split across two visits for safety in complex cases.",
          duration: "3 – 4 hours · General anaesthetic",
          recovery: "10 nights on-island recovery",
          included: [
            "Theatre, anaesthetic & overnight observation",
            "10 nights in private recovery villa",
            "Daily nursing and physiotherapy",
            "Three lymphatic drainage sessions",
            "Cohesive-gel implants included",
            "12-month telehealth follow-up",
          ],
        },
      },
      {
        name: "Breast reduction",
        short: "Reduction mammaplasty for patients with discomfort from breast size and weight.",
        priceFromAud: 10400,
        detail: {
          description:
            "Inferior-pedicle or vertical-scar reduction, removing breast tissue while preserving nipple sensation and lactation potential where possible. Often covered partially by health insurance in your home country — we provide full surgical documentation for claims.",
          duration: "3 – 4 hours · General anaesthetic",
          recovery: "7–10 nights on-island recovery",
          included: [
            "Theatre, anaesthetic & overnight observation",
            "7 nights in private recovery villa",
            "Daily nursing visits",
            "Three lymphatic drainage sessions",
            "Surgical bra and scar protocol",
            "Insurance documentation pack",
            "12-month telehealth follow-up",
          ],
        },
      },
      {
        name: "Nipple refinement",
        short: "Areolar reduction, nipple projection correction, or inverted nipple repair — often as a standalone procedure.",
        priceFromAud: 4200,
        detail: {
          description:
            "Refinements to the nipple-areola complex performed under local anaesthetic with sedation. May correct inversion, oversized areolae, or asymmetry. Often combined with another breast procedure; available as a standalone in twenty-four hours.",
          duration: "60 – 90 minutes · Local anaesthetic + sedation",
          recovery: "3 days on-island; minimal downtime",
          included: [
            "Theatre and local anaesthetic",
            "3 nights in private villa",
            "Two nursing check-ins",
            "Scar protocol",
            "12-month telehealth follow-up",
          ],
        },
      },
      {
        name: "Implant revision",
        short: "Replacement or removal of existing implants, with or without capsule work.",
        priceFromAud: 12800,
        detail: {
          description:
            "Implant exchange, removal, capsulectomy, or pocket revision. We review your original surgical records before quoting and plan revisions conservatively — revision surgery is technically demanding, and not every revision results in a meaningful improvement.",
          duration: "2 – 4 hours · General anaesthetic",
          recovery: "7 nights on-island recovery",
          included: [
            "Pre-op imaging and surgical review",
            "Theatre, anaesthetic & overnight observation",
            "7 nights in private recovery villa",
            "Daily nursing visits",
            "Two lymphatic drainage sessions",
            "12-month telehealth follow-up",
          ],
        },
      },
    ],
  },
};

// ============================================================
// SURGICAL — FACE & BODY
// ============================================================

window.SUBCATEGORY_DATA["surgical-face"] = {
  parent: "surgical", slug: "surgical-face", title: "Face",
  chapterTitle: ["The face,", "refined."],
  tagline: "Quiet work for the most considered part of the body.",
  lede: "Rhinoplasty, facelift, eyelid surgery, and the subtler refinements — performed in our ACHSI-accredited theatres with a structure-preserving, conservative approach.",
  intro: "Face surgery is anatomy first and aesthetics second. Our surgeons trained in Korea, Japan, and Singapore — three of the most demanding markets in the world for natural-looking facial work — and they bring that conservative sensibility to every consultation.",
  overview: "We approach facial surgery as long-term investment in your face, not a single intervention. A well-judged rhinoplasty looks better at year five than year one. A deep-plane facelift outlasts a SMAS by a decade. We prefer the operation that earns its keep over time — and we will tell you when surgery is the wrong answer.",
  sections: [
    { id: "consultation", t: "The consultation", body: "We review your concerns from three angles, take a careful airway and functional history where relevant, and discuss conservation vs. transformation. Many patients leave their consultation choosing a smaller intervention than they arrived expecting." },
    { id: "approach", t: "Our approach", body: "Structure-preserving, conservative, and slow. We use open or closed rhinoplasty as the nose dictates, deep-plane or SMAS lifts based on tissue quality, and combined eyelid+brow procedures where they reinforce each other. We avoid the homogenised result." },
    { id: "recovery", t: "Recovery", body: "Five to fourteen nights on-island depending on the procedure. Daily nursing visits in the first week, splint or dressing removal at day seven, and two scheduled surgeon reviews. Final results settle between six and twelve months." },
  ],
  faqs: [
    { q: "Open or closed rhinoplasty — which is better?", a: "Neither in isolation. Closed leaves no external scar but limits visibility; open allows greater precision for complex tip work. We recommend based on what your nose needs, not on surgeon preference." },
    { q: "How long until I look normal in public?", a: "Most patients are happy to be seen at seven to ten days for rhinoplasty (splint off, bruising down), twelve to fourteen days for facelift, and seven for eyelid surgery." },
    { q: "Will my breathing change after rhinoplasty?", a: "If airway concerns are addressed alongside the aesthetic work, most patients breathe noticeably better. Cosmetic-only work that ignores existing airway issues can sometimes worsen breathing — which is why we ask carefully." },
  ],
  leadSurgeon: "suka",
  treatments: [
    { name: "Rhinoplasty", short: "Open or closed approach to refine profile, balance, and breathing.", priceFromAud: 8500,
      detail: { description: "Structure-preserving rhinoplasty with optional functional septoplasty. We favour cartilage-preserving techniques and shape rather than reduce wherever possible. Tissue once removed cannot be returned.", duration: "3 – 4 hours · General anaesthetic", recovery: "14 nights on-island; splint at day 7",
        included: ["Theatre, anaesthetic & overnight observation", "5–7 nights in private recovery villa", "Daily nursing visits", "Splint removal at day 7", "Two surgeon reviews", "12-month telehealth follow-up"] } },
    { name: "Facelift (deep-plane or SMAS)", short: "Lifting the underlying structures, not just the skin. Most durable refresh available.", priceFromAud: 14800,
      detail: { description: "Deep-plane facelift for advanced laxity; SMAS plication for earlier or mid-stage ageing. Both preserve sensation and avoid the stretched look. Often paired with eyelid surgery or fat repositioning for a balanced result.", duration: "4 – 5 hours · General anaesthetic", recovery: "14 nights on-island recovery",
        included: ["Theatre, anaesthetic & overnight observation", "10–12 nights in private recovery villa", "Daily nursing visits", "Three lymphatic drainage sessions", "Two surgeon reviews", "12-month telehealth follow-up"] } },
    { name: "Eyelid surgery (Blepharoplasty)", short: "Upper, lower, or both. Local anaesthetic, hour-long procedure, seven-day recovery.", priceFromAud: 5400,
      detail: { description: "Removal of excess skin and orbital fat (upper) or repositioning of fat with skin tightening (lower). Often the highest-impact facial procedure relative to its size — and frequently combined with brow lift or facelift.", duration: "60 – 90 minutes · Local + sedation", recovery: "7 nights on-island; sutures at day 5",
        included: ["Theatre and anaesthetic", "5 nights in private villa", "Daily dressings", "Suture removal at day 5", "12-month telehealth follow-up"] } },
    { name: "Brow lift", short: "Endoscopic or temporal lift to reposition the brow without changing expression.", priceFromAud: 7200,
      detail: { description: "Endoscopic lift through three small incisions in the hairline, or temporal lift for lateral brow only. Often combined with upper blepharoplasty where both contribute to the heavy-upper-eyelid look.", duration: "2 hours · General anaesthetic", recovery: "10 nights on-island",
        included: ["Theatre, anaesthetic & overnight observation", "7 nights in private recovery villa", "Daily nursing visits", "Suture removal at day 7", "12-month telehealth follow-up"] } },
    { name: "Neck lift", short: "Platysmaplasty and lateral skin tightening — often the missing piece of facial rejuvenation.", priceFromAud: 9800,
      detail: { description: "Tightening of the platysmal bands and removal of submental fat. Can be performed alone for younger patients with isolated neck laxity, or as part of a deep-plane facelift.", duration: "2.5 – 3 hours · General anaesthetic", recovery: "10 nights on-island",
        included: ["Theatre, anaesthetic & overnight observation", "7 nights in private recovery villa", "Daily nursing visits", "Compression garment", "12-month telehealth follow-up"] } },
    { name: "Lip lift", short: "Subnasal lift to shorten the philtrum and increase upper-lip show.", priceFromAud: 4200,
      detail: { description: "Bullhorn or subnasal incision to remove a small strip of skin beneath the nose. Permanent, subtle, and one of the most under-appreciated procedures in facial aesthetics.", duration: "60 minutes · Local anaesthetic", recovery: "5 nights on-island",
        included: ["Theatre and local anaesthetic", "3 nights in private villa", "Suture removal at day 5", "12-month telehealth follow-up"] } },
  ],
};

window.SUBCATEGORY_DATA["surgical-body"] = {
  parent: "surgical", slug: "surgical-body", title: "Body",
  chapterTitle: ["Body,", "in proportion."],
  tagline: "Contouring with the same restraint as our facial work.",
  lede: "Liposculpture, abdominoplasty, and post-pregnancy or post-weight-loss restoration — performed under our highest safety thresholds, with surgeon-supervised recovery.",
  intro: "Body contouring is the most safety-sensitive work we do. We are conservative about combining procedures, careful about volume removed, and we never compromise on cardiac monitoring or DVT prophylaxis. Some surgeons elsewhere will offer more in less time; we will not.",
  overview: "Body work is rewarding when it suits your anatomy and your life — and ill-advised when it doesn't. We will quote you for what we believe is safe and sensible, sometimes less than you came in expecting. Our consultations include a frank conversation about non-surgical alternatives where they might serve you better.",
  sections: [
    { id: "consultation", t: "The consultation", body: "We assess body type, skin quality, weight stability, and lifestyle. Body contouring works best for patients within fifteen percent of their stable weight; we will say so honestly if you would benefit from delaying surgery." },
    { id: "approach", t: "Our approach", body: "Tumescent or VASER-assisted liposculpture; mini, full, or extended abdominoplasty based on what your anatomy needs. We avoid the long-list of areas in a single visit — fewer areas done thoughtfully consistently outperforms more areas done aggressively." },
    { id: "recovery", t: "Recovery", body: "Seven to twenty-one nights on-island depending on the procedure. Compression garments, daily nursing, lymphatic drainage sessions, and a graded return to movement. We do not authorise flights home until we are comfortable with your DVT risk." },
  ],
  faqs: [
    { q: "Can I combine multiple procedures?", a: "Combined procedures (e.g. tummy tuck + liposuction) are common and often safer than two visits. We are conservative about combining very long procedures and will sometimes recommend splitting if total theatre time exceeds five hours." },
    { q: "Will I have scars?", a: "Yes. Body contouring is scar-trade work — you accept a fine, well-placed scar in exchange for changed shape. We place scars where they can be hidden by underwear or swimwear, and we manage them actively for twelve months." },
    { q: "How long until I can fly home?", a: "Seven to fourteen days minimum. Abdominoplasty and combined cases need the full two weeks for DVT risk and incision healing. We do not authorise earlier flights." },
  ],
  leadSurgeon: "suka",
  treatments: [
    { name: "Liposculpture", short: "Tumescent or VASER liposuction. Single or multiple areas.", priceFromAud: 6800,
      detail: { description: "Targeted removal of subcutaneous fat using tumescent or ultrasound-assisted technique. Best results come from patients within fifteen percent of their stable weight. Compression garment required for six weeks.", duration: "2 – 3 hours · General anaesthetic", recovery: "7 nights on-island; compression 6 weeks",
        included: ["Theatre, anaesthetic & overnight observation", "5 nights in private recovery villa", "Daily nursing visits", "Compression garment", "Two lymphatic drainage sessions", "12-month telehealth follow-up"] } },
    { name: "Abdominoplasty (Tummy tuck)", short: "Mini, full, or extended. Restores abdomen after pregnancy or weight loss.", priceFromAud: 12400,
      detail: { description: "Removal of excess skin and tightening of the abdominal wall (muscle plication where indicated). Often combined with liposuction of the flanks for a refined waistline. Insurance documentation provided where reconstruction is indicated.", duration: "3 – 4 hours · General anaesthetic", recovery: "14 nights on-island; compression 8 weeks",
        included: ["Theatre, anaesthetic & overnight observation", "10 nights in private recovery villa", "Daily nursing visits and physiotherapy", "Compression garment", "Three lymphatic drainage sessions", "12-month telehealth follow-up"] } },
    { name: "Brachioplasty (Arm lift)", short: "Removal of excess upper-arm skin after weight loss or with age.", priceFromAud: 8800,
      detail: { description: "Inner-arm or T-incision pattern depending on skin quality. Scar is the trade-off — well-placed but always present. Best for patients who prioritise contour over scar-aversion.", duration: "2.5 – 3 hours · General anaesthetic", recovery: "10 nights on-island",
        included: ["Theatre, anaesthetic & overnight observation", "7 nights in private recovery villa", "Daily nursing visits", "Compression sleeves", "12-month telehealth follow-up"] } },
    { name: "Thigh lift", short: "Inner-thigh skin removal after weight loss; restores contour and reduces chafing.", priceFromAud: 9400,
      detail: { description: "Medial-thigh incision pattern with or without extension to the knee. Often combined with liposculpture of the lateral thigh. Compression garment essential for full eight weeks.", duration: "3 hours · General anaesthetic", recovery: "10 nights on-island; compression 8 weeks",
        included: ["Theatre, anaesthetic & overnight observation", "7 nights in private recovery villa", "Daily nursing visits", "Compression garment", "Two lymphatic drainage sessions", "12-month telehealth follow-up"] } },
    { name: "Body contouring after weight loss", short: "Combined procedures for patients post-bariatric surgery or major weight loss.", priceFromAud: 18400,
      detail: { description: "Staged or combined abdominoplasty, brachioplasty, and thigh lift — sequenced based on safety, recovery, and what each procedure can deliver. We often plan across two visits twelve months apart.", duration: "5 – 7 hours · General anaesthetic", recovery: "21 nights on-island recovery",
        included: ["Theatre, anaesthetic & two-night observation", "14 nights in private recovery villa", "Daily nursing and physiotherapy", "Six lymphatic drainage sessions", "Compression garments × 2", "12-month telehealth follow-up"] } },
  ],
};

// ============================================================
// NON-SURGICAL — INJECTABLES, LASER, SKIN
// ============================================================

window.SUBCATEGORY_DATA["non-surgical-injectables"] = {
  parent: "non-surgical", slug: "non-surgical-injectables", title: "Injectables",
  chapterTitle: ["Quiet hands,", "small refinements."],
  tagline: "Less product, less heat, less everything you might expect.",
  lede: "Botulinum toxin, dermal fillers, bio-remodelling and skin-quality injectables — performed by medical injectors, never technicians, with a deliberately conservative protocol.",
  intro: "Injectables, done well, are the kind of work nobody sees. We use the minimum effective dose, the slowest technique, and we will tell you when more would be too much. Many of our patients come for one treatment and leave with a plan to do less than they had originally booked.",
  overview: "We work to a single principle: that the best injectable work is the kind that nobody sees. Health Canada and TGA-approved products only; medical injectors only; private treatment rooms only. We never run promotional pricing on injectables, because it changes the conversation in a way we are not comfortable with.",
  sections: [
    { id: "consultation", t: "The consultation", body: "A thirty-minute review of facial dynamics, skin quality, and your goals. We use mirror-side conversation and minimal sales pressure — and we will recommend less product than most clinics suggest." },
    { id: "approach", t: "Our approach", body: "Slow injection, small aliquots, conservative dosing. We favour cannula over needle for fillers where safety improves; we prefer multiple small sessions over one large one; we ask you to come back at two weeks before we add more." },
    { id: "treatment-day", t: "A treatment day", body: "Most injectable appointments are completed in under ninety minutes including consultation. Topical anaesthetic where helpful; you can return to normal activities the same day. We ask for a forty-eight-hour buffer before flying." },
  ],
  faqs: [
    { q: "How long do results last?", a: "Botulinum toxin: three to four months. Dermal fillers: nine to eighteen months depending on product and area. Profhilo: six to nine months. Polynucleotides: six months." },
    { q: "Will I look frozen?", a: "Not if we judge it correctly. We dose to maintain expression — the goal is rested, not blank. If you've had a frozen result elsewhere, tell us; we will dose accordingly." },
    { q: "Can I combine treatments in one visit?", a: "Yes — botulinum toxin and fillers commonly combine. We are careful about combining large volumes of filler in one session; sometimes two visits a fortnight apart serves you better." },
  ],
  leadSurgeon: "sissy",
  treatments: [
    { name: "Botulinum toxin", short: "Forehead, glabella, periorbital. Fifteen-minute appointment; results in ten days.", priceFromAud: 380,
      detail: { description: "Allergan Botox or Galderma Dysport, dosed conservatively for the area. We treat the muscles that age the face — glabella, forehead, crow's feet — and avoid the over-treated look. Maintenance every three to four months.", duration: "15 – 20 minutes · No anaesthetic", recovery: "No downtime; results at day 10",
        included: ["Medical injector consultation", "Topical anaesthetic on request", "Two-week review appointment", "12-month maintenance plan"] } },
    { name: "Dermal fillers", short: "HA-based, cheeks, lips, mid-face, jawline. Q-Med and Allergan only.", priceFromAud: 580,
      detail: { description: "Hyaluronic-acid filler in single-ml increments. We use cannula over needle where it improves safety and prefer multiple small sessions to one large one. Topical anaesthetic; mild bruising possible.", duration: "30 – 45 minutes · Topical anaesthetic", recovery: "24 hours minor swelling; results at 2 weeks",
        included: ["Medical injector consultation", "Topical anaesthetic", "Two-week review appointment", "Reversal agent on standby"] } },
    { name: "Profhilo", short: "Hybrid bio-remodelling injectable for overall skin quality. Two-session protocol.", priceFromAud: 720,
      detail: { description: "Standard BAP technique: ten injection points per side, repeated four weeks later. Improves skin firmness, hydration, and laxity without volumising. Suited to skin that has lost firmness rather than volume.", duration: "20 minutes per session · Topical optional", recovery: "Small bumps for 6–12 hours; results at 6 weeks",
        included: ["Two BAP-protocol sessions", "Four weeks apart", "Topical anaesthetic on request", "Skin assessment at six weeks"] } },
    { name: "Polynucleotides", short: "Tissue regeneration. Particularly suited to under-eyes and neck.", priceFromAud: 680,
      detail: { description: "Plinest, Newest, or Pronova polynucleotide injection in microgrid pattern. Particularly effective in delicate areas — under-eye, neck, intimate. Three-session protocol two weeks apart.", duration: "20 – 30 minutes · Topical anaesthetic", recovery: "Mild redness for a few hours",
        included: ["Three sessions over six weeks", "Topical anaesthetic", "Cannula or needle technique", "Six-week review"] } },
    { name: "Skin boosters", short: "Microinjection of hyaluronic acid for skin hydration and quality.", priceFromAud: 480,
      detail: { description: "Restylane Vital or Juvéderm Volite distributed across face, neck, hands or décolletage. Two to three sessions four weeks apart. Improves texture and hydration without adding visible volume.", duration: "30 minutes · Topical anaesthetic", recovery: "Small bumps for hours; results at 2 weeks",
        included: ["Three sessions over twelve weeks", "Topical anaesthetic", "Take-home protocol"] } },
    { name: "PRP for skin", short: "Platelet-rich plasma microinjection for skin quality and tone.", priceFromAud: 580,
      detail: { description: "Double-spin PRP harvested from your own blood, injected across the face or paired with microneedling. Three-session course one month apart. Often the gentlest entry-point into skin medicine.", duration: "60 minutes · Topical anaesthetic", recovery: "Minor redness for hours",
        included: ["Three sessions over twelve weeks", "Double-spin PRP", "Topical anaesthetic", "Microneedling combination available"] } },
  ],
};

window.SUBCATEGORY_DATA["non-surgical-laser"] = {
  parent: "non-surgical", slug: "non-surgical-laser", title: "Laser & Resurfacing",
  chapterTitle: ["Light,", "with restraint."],
  tagline: "Gold-standard platforms, dialled to the minimum effective dose.",
  lede: "Fractional laser, IPL, chemical peels, and RF microneedling — used precisely, scheduled around your visit, and always with conservative settings.",
  intro: "Laser is the most setting-dependent work we do. The same platform can give a beautiful result or a disappointing one based on settings, sequencing, and aftercare. We use less power across more sessions; we sequence treatments around your travel; and we will never push a result that costs your skin barrier.",
  overview: "Our laser suite uses Lumenis, Sciton, and Sylfirm — three of the most respected platforms in the world for fractional, IPL, and RF microneedling respectively. Settings are tailored per session, per skin type, and per season. Aggressive single-session treatments are not how we practice.",
  sections: [
    { id: "consultation", t: "The consultation", body: "We assess Fitzpatrick type, sun history, and your skin's current resilience. Some treatments are contraindicated immediately post-flight or in the wet season; we will sequence accordingly." },
    { id: "approach", t: "Our approach", body: "Lower power across more sessions; combination protocols where they reinforce each other; aggressive sun protection between visits. We will not run a deep peel on a patient who is two days from flying home." },
    { id: "treatment-day", t: "A treatment day", body: "Twenty- to forty-five-minute appointments. Topical anaesthetic for most treatments; cool packs and recovery cream provided. Most patients return to social activity within twenty-four to seventy-two hours." },
  ],
  faqs: [
    { q: "Can I have laser if I have darker skin?", a: "IPL is restricted to Fitzpatrick I-III; fractional and RF microneedling are safe across all skin types with adjusted settings. We will tell you what's suitable at consultation." },
    { q: "Can I sun-bathe after laser?", a: "Not for at least four weeks. Aggressive sun protection (SPF 50+, hat, shade) is essential for the full result and for safety. We provide a recovery sunscreen as part of the protocol." },
    { q: "How many sessions will I need?", a: "Most protocols are three sessions four weeks apart, with maintenance once or twice a year. Single-session results are visible but the multi-session approach is more durable." },
  ],
  leadSurgeon: "sissy",
  treatments: [
    { name: "Fractional laser", short: "Sciton or Lumenis fractional CO₂ for resurfacing, scar revision, pigmentation.", priceFromAud: 980,
      detail: { description: "Ablative fractional laser at conservative settings. One to three sessions depending on goals. Genuine downtime — three to five days of pinkness and flaking — but the highest-impact non-surgical resurfacing we offer.", duration: "45 minutes · Topical anaesthetic", recovery: "3–5 days; redness and flaking",
        included: ["Single fractional CO₂ session", "Topical anaesthetic", "Take-home recovery kit", "Two follow-up reviews"] } },
    { name: "IPL Photofacial", short: "Broad-spectrum light for pigment, vessels, rosacea.", priceFromAud: 480,
      detail: { description: "Lumenis M22 platform for IPL, targeting sun damage and vascular lesions. Three-session course four weeks apart for full results. Suited to Fitzpatrick I-III only.", duration: "30 minutes · No anaesthetic", recovery: "Mild redness; pigment darkens for 5–7 days then exfoliates",
        included: ["Single IPL session", "Cool packs and recovery cream", "Skin assessment", "Maintenance plan"] } },
    { name: "Chemical peel", short: "Glycolic, salicylic, TCA. From light refresh to medium-depth resurfacing.", priceFromAud: 380,
      detail: { description: "Single-agent or combination peels at depths matched to your skin. Light peels for a single-visit refresh; medium-depth TCA peels for serious resurfacing with three to seven days of recovery.", duration: "45 minutes · Topical anaesthetic optional", recovery: "Minimal (light) to 7 days (medium)",
        included: ["Single peel session", "Topical anaesthetic where appropriate", "Take-home recovery kit", "Two-week review"] } },
    { name: "RF Microneedling", short: "Morpheus8 or Sylfirm — tightening and remodelling without surface ablation.", priceFromAud: 880,
      detail: { description: "Radiofrequency energy delivered through microneedles, treating dermis without disrupting epidermis. Three-session course four weeks apart. Excellent for jawline definition and skin laxity that doesn't yet warrant surgery.", duration: "60 minutes · Topical anaesthetic", recovery: "2–3 days mild redness",
        included: ["Single RF microneedling session", "Topical anaesthetic", "Cool packs and recovery cream", "Skin assessment"] } },
    { name: "HydraFacial", short: "Hydradermabrasion treatment combining exfoliation, extraction, and serum infusion.", priceFromAud: 280,
      detail: { description: "Three-step protocol: cleanse and exfoliate, painless extraction, antioxidant infusion. No downtime, immediately visible improvement. Excellent pre-event treatment or part of a maintenance routine.", duration: "45 minutes · No anaesthetic", recovery: "None — return to activity immediately",
        included: ["Three-step HydraFacial", "LED light therapy add-on", "Take-home protocol", "Skin assessment"] } },
  ],
};

window.SUBCATEGORY_DATA["non-surgical-skin"] = {
  parent: "non-surgical", slug: "non-surgical-skin", title: "Skin Health",
  chapterTitle: ["Skin,", "considered."],
  tagline: "Medical facials and structured skin protocols.",
  lede: "Medical-grade facials, peels, and structured at-home skin protocols — designed for skin that needs more than maintenance but less than intervention.",
  intro: "Skin health is the foundation everything else sits on. A great injectable result on neglected skin still looks neglected. We treat the underlying canvas first, then layer interventions on top — the inverse of how most aesthetic clinics sequence work.",
  overview: "Our medical facials use cosmeceutical-grade product (SkinCeuticals, ZO Skin Health, Obagi) and are delivered by trained skin therapists working alongside the medical team. Every protocol begins with skin diagnosis, ends with a take-home plan, and includes review at six weeks.",
  sections: [
    { id: "diagnosis", t: "Skin diagnosis", body: "We use Visia imaging where helpful and a fifteen-minute clinical assessment to identify the underlying drivers — sun damage, barrier compromise, hormonal patterns, oil-water balance. Most patients have never been told what is actually happening to their skin." },
    { id: "protocols", t: "Our protocols", body: "Three-step ritual or full medical facial in clinic, paired with a daily home routine. We are agnostic about brand; we use what your skin needs, and we will tell you when an expensive product is not earning its keep." },
    { id: "homework", t: "The home routine", body: "Skin work is 80% home, 20% clinic. We send you home with a written morning and evening routine, a sun-protection protocol, and a six-week check-in by video." },
  ],
  faqs: [
    { q: "How is this different from a regular facial?", a: "Medical-grade product strength, clinical diagnosis, and structured outcomes. A regular facial is relaxation; a medical facial is treatment with a measurable goal." },
    { q: "How often should I have these?", a: "Most patients benefit from a medical facial every six to eight weeks for the first three sessions, then quarterly. We will design a cadence at consultation." },
    { q: "Can I combine with injectables or laser?", a: "Yes — and we usually do. We sequence skin work two to four weeks before injectables for optimal results." },
  ],
  leadSurgeon: "sissy",
  treatments: [
    { name: "Medical-grade facial", short: "60-minute clinical facial with diagnosis, extraction, and active product.", priceFromAud: 220,
      detail: { description: "Cleanse, exfoliate, treat (mask or peel), infuse (active product), protect. Delivered by trained skin therapists with medical oversight. Pre-event or part of a structured course.", duration: "60 minutes · No anaesthetic", recovery: "None",
        included: ["60-minute facial", "Visia skin imaging", "Take-home routine", "Six-week review"] } },
    { name: "Three-session skin programme", short: "Course of three medical facials over twelve weeks, with home routine.", priceFromAud: 580,
      detail: { description: "Three escalating facial sessions paced four weeks apart, paired with a daily home routine and a six-week and twelve-week review. The minimum structured commitment we recommend for visible change.", duration: "60 minutes per session · 12 weeks total", recovery: "None between sessions",
        included: ["Three medical facials", "Take-home product kit", "Visia imaging at start and end", "Twelve-week skin coaching"] } },
    { name: "Pre-event facial", short: "Single-session 'event prep' — 48 to 72 hours before a date that matters.", priceFromAud: 280,
      detail: { description: "Calibrated for visible improvement in under three days. No aggressive extraction, no peels — just hydration, infusion, and gentle resurfacing. Excellent before a wedding, photo shoot, or homecoming.", duration: "75 minutes", recovery: "Glow visible immediately",
        included: ["Pre-event consultation", "Hydration-focused facial", "LED light therapy", "Take-home product samples"] } },
    { name: "Acne & barrier protocol", short: "Structured medical programme for active acne and barrier compromise.", priceFromAud: 980,
      detail: { description: "Eight-week medical programme: prescription-grade home routine, three in-clinic sessions, and dermatologist review at week four. For active acne and patients who have plateaued on over-the-counter care.", duration: "Eight weeks · Three clinic visits", recovery: "Mild purge in week one",
        included: ["Dermatologist consultation", "Three in-clinic sessions", "Prescription home routine", "Weekly check-ins by video"] } },
  ],
};

// ============================================================
// HAIR RESTORATION — FUE & FOLLICLE THERAPY
// ============================================================

window.SUBCATEGORY_DATA["hair-fue"] = {
  parent: "hair", slug: "hair-fue", title: "FUE Surgical",
  chapterTitle: ["Returning,", "quietly."],
  tagline: "Single-follicle transplantation, designed to never be detected.",
  lede: "Sapphire FUE and DHI implantation — for hair restoration that respects what your face has always done, and that the world will never identify as transplanted.",
  intro: "Hair restoration done well is impossible to detect. We design hairlines that honour your facial proportions, place follicles one at a time, and sequence donor work conservatively over your lifetime — not all in one over-densified session.",
  overview: "We perform between two and four FUE cases per day, capped deliberately. Each case has one dedicated lead surgeon and a team of three certified technicians. Single follicles in the hairline, two- and three-hair units behind. Single-day or staged depending on graft count.",
  sections: [
    { id: "consultation", t: "The consultation", body: "We assess donor density, recipient need, and pattern of loss. Many patients are better served by therapy first, surgery later; others are ready for surgery now. We will tell you honestly." },
    { id: "approach", t: "Our approach", body: "Sapphire-blade FUE for slit creation; manual or DHI implantation depending on density goals. Hairline design follows facial proportion, not trend. We will not place a forty-year-old man's hairline at twenty-two years of age." },
    { id: "recovery", t: "Recovery", body: "Three days of swelling, ten days of scab healing, four months until visible new growth. Final result at twelve to fifteen months. We schedule remote check-ins at one, three, six, nine, and twelve months." },
  ],
  faqs: [
    { q: "How many grafts will I need?", a: "Depends on pattern, density goals, and donor supply. We typically recommend conservative graft counts that preserve donor for future work — most patients benefit from sequencing over their lifetime." },
    { q: "Will it look like a transplant?", a: "Not if it is designed and executed correctly. Single-hair follicles in the hairline, careful angulation, and conservative density create a result indistinguishable from natural hair." },
    { q: "Can I combine with therapy?", a: "Yes — and we usually do. PRP and minoxidil-supported protocols both support the transplanted follicles and improve the surrounding native hair." },
  ],
  leadSurgeon: "suka",
  treatments: [
    { name: "Sapphire FUE", short: "Follicular unit extraction with sapphire blades. Most common procedure.", priceFromAud: 4800,
      detail: { description: "Up to 2,500 grafts in a single day. Sapphire blades for cleaner channel creation and finer healing. Local anaesthetic only; you remain awake throughout.", duration: "8 hours · Local anaesthetic", recovery: "10 days on-island; scabs at day 7",
        included: ["Up to 2,500 grafts", "Local anaesthetic", "Recovery villa for 7 nights", "Post-op kit", "12-month telehealth follow-up"] } },
    { name: "DHI Choi Implanter", short: "Direct hair implantation. Higher density; suited to crown and frontotemporal.", priceFromAud: 6200,
      detail: { description: "Implanter-pen technique placing follicles directly without prior channel creation. Higher density per square centimetre and faster healing — suited to dense recipient areas.", duration: "8 hours · Local anaesthetic", recovery: "7 days on-island",
        included: ["Up to 2,000 grafts", "DHI implanter technique", "Recovery villa for 5 nights", "Post-op kit", "12-month telehealth follow-up"] } },
    { name: "Combined FUE + DHI", short: "Sapphire FUE for hairline, DHI for crown — best of both protocols.", priceFromAud: 7800,
      detail: { description: "Sapphire-blade FUE for the hairline (where natural angulation matters most) combined with DHI for the crown (where density matters most). Single-day procedure, up to 3,500 grafts.", duration: "9 – 10 hours · Local anaesthetic", recovery: "10 days on-island",
        included: ["Up to 3,500 grafts combined", "Recovery villa for 7 nights", "Post-op kit", "Two surgeon reviews", "12-month telehealth follow-up"] } },
    { name: "Eyebrow restoration", short: "Single-follicle FUE to rebuild thinned, over-plucked, or sparse brows.", priceFromAud: 3200,
      detail: { description: "Two- to four-hour procedure using single-hair follicles harvested from the nape. Angulation is critical — every follicle is placed individually to follow natural growth direction.", duration: "2 – 4 hours · Local anaesthetic", recovery: "5 days on-island; tiny scabs",
        included: ["Up to 300 single-hair follicles", "Local anaesthetic", "3 nights in villa", "Post-op kit"] } },
    { name: "Beard restoration", short: "FUE into beard region for thinning, scarring, or congenital sparseness.", priceFromAud: 4400,
      detail: { description: "Single- and two-hair follicles placed in beard region following natural angulation. Particularly effective for filling scar tissue or augmenting genetic sparseness.", duration: "5 – 6 hours · Local anaesthetic", recovery: "7 days on-island",
        included: ["Up to 1,500 grafts", "Local anaesthetic", "5 nights in villa", "Post-op kit"] } },
  ],
};

window.SUBCATEGORY_DATA["hair-therapy"] = {
  parent: "hair", slug: "hair-therapy", title: "Follicle Therapy",
  chapterTitle: ["Strengthening,", "before surgery."],
  tagline: "Therapy first; surgery only when therapy can't.",
  lede: "PRP, polynucleotides, and topical protocols — for patients with active follicles that are weakening, where transplant would be premature.",
  intro: "A meaningful proportion of patients who arrive expecting transplant leave with a therapy plan instead. PRP, polynucleotides, and topical Minoxidil work together to slow miniaturisation and strengthen native follicles — often deferring or eliminating the need for surgery.",
  overview: "Therapy is best suited to patients whose follicles are still active but weakening. We assess miniaturisation, donor density, and your timeline; then design a programme that gives therapy a fair trial before considering surgery.",
  sections: [
    { id: "assessment", t: "Hair assessment", body: "A trichoscopy assessment to measure miniaturisation, donor density, and active growth phase. Most useful for patients in their twenties or thirties with early- to mid-stage thinning." },
    { id: "protocols", t: "Our protocols", body: "PRP three-session course is the foundation. Polynucleotides for patients with thinning at the temple or crown. Topical Minoxidil prescribed where indicated. We coordinate everything in a single programme." },
    { id: "outcome", t: "What to expect", body: "Slowed shedding within six to eight weeks; regrowth of weakened hairs over three to six months. Therapy is rarely permanent — it requires maintenance — but it can defer transplant for years." },
  ],
  faqs: [
    { q: "How often do I need PRP?", a: "Initial protocol is three sessions one month apart, followed by maintenance every six to twelve months. We coordinate around your travel pattern." },
    { q: "Will therapy work for me?", a: "Best results are in patients with early- to mid-stage thinning where follicles are weakening but not dead. We will tell you honestly if therapy alone is unlikely to deliver." },
    { q: "Can I do therapy and then surgery?", a: "Absolutely — and often the best plan. Therapy strengthens donor follicles before harvest and supports the recipient site after transplant." },
  ],
  leadSurgeon: "suka",
  treatments: [
    { name: "PRP scalp therapy", short: "Three-session double-spin PRP protocol for slowed shedding and regrowth.", priceFromAud: 1400,
      detail: { description: "Double-spin platelet-rich plasma injected across the scalp on a fine grid. Three sessions one month apart, with maintenance every six months. Coordinated with topical protocols.", duration: "60 minutes per session", recovery: "None; mild scalp tingling",
        included: ["Three sessions over twelve weeks", "Topical anaesthetic", "Topical protocol prescribed", "Six-month review"] } },
    { name: "Polynucleotides (scalp)", short: "Tissue regeneration for temple, crown, and frontotemporal thinning.", priceFromAud: 1100,
      detail: { description: "Polynucleotide injection in microgrid pattern across thinning regions. Three sessions two weeks apart. Often layered with PRP across the same programme.", duration: "30 minutes per session", recovery: "Mild redness",
        included: ["Three sessions over six weeks", "Topical anaesthetic", "Combined with PRP where indicated"] } },
    { name: "Topical maintenance protocol", short: "Prescription Minoxidil or Finasteride routine; quarterly review.", priceFromAud: 380,
      detail: { description: "Twelve-week prescription protocol for active thinning. Telehealth review at week four, eight, and twelve. Coordinated with in-clinic therapy where appropriate.", duration: "Twelve weeks", recovery: "Daily home routine",
        included: ["Prescription protocol", "Three telehealth reviews", "Coordinated with in-clinic therapy"] } },
    { name: "Combined therapy programme", short: "PRP + polynucleotides + topical — the full programme for serious thinning.", priceFromAud: 2400,
      detail: { description: "Three months of intensive combined therapy: PRP, polynucleotides, and prescription topical, with monthly reviews. The most aggressive non-surgical approach we offer.", duration: "Twelve weeks · Multiple clinic visits", recovery: "Daily home routine",
        included: ["Three PRP sessions", "Three polynucleotide sessions", "Prescription topical", "Monthly reviews"] } },
  ],
};

// ============================================================
// DENTAL AESTHETICS — VENEERS, ALIGNMENT, WHITENING
// ============================================================

window.SUBCATEGORY_DATA["dental-veneers"] = {
  parent: "dental", slug: "dental-veneers", title: "Veneers",
  chapterTitle: ["The smile,", "rebuilt."],
  tagline: "Porcelain or composite, paced to suit your visit.",
  lede: "Porcelain veneers, composite veneers, and complete smile makeovers — designed in collaboration with our on-staff ceramicist over three visits and fourteen days.",
  intro: "Veneers are the highest-impact dental work we do. We approach them as facial work that happens to involve teeth — the goal is a smile that looks like yours, only at its best. Conservative preparation, conservative shading, and a try-in stage that lets you live with the result before it becomes permanent.",
  overview: "Our dental studio is small — two surgeries, one ceramicist on staff, conservative practice. We prefer minimal-prep veneers where the case allows, and we always include a try-in stage so you can see and feel the result before final placement.",
  sections: [
    { id: "consultation", t: "Smile design consult", body: "Forty-five minutes with the dentist and the ceramicist together. We photograph, model, and design the proposed smile digitally — then often refine again after a try-in stage." },
    { id: "approach", t: "Our approach", body: "Minimal-prep where the case allows; conventional preparation only where minimal-prep would compromise the result. Pressed lithium disilicate (E.max) for most cases; feldspathic for the most demanding aesthetics." },
    { id: "timeline", t: "Treatment timeline", body: "Three visits over fourteen days: scan and prep, try-in, final placement. We refine shade twice — once between try-in and final placement, once after you've lived with the smile for a day." },
  ],
  faqs: [
    { q: "Porcelain or composite?", a: "Porcelain for longevity and depth of colour (15+ years); composite for budget or single-tooth corrections (5–7 years). We will recommend based on your case and timeline." },
    { q: "How many teeth do I need?", a: "Anywhere from two (single-arch front teeth) to ten (full smile makeover). Most patients choose six to eight upper teeth." },
    { q: "Will my veneers look fake?", a: "Not in our hands. We collaborate with our ceramicist on shade, translucency, and surface texture per tooth — and we refine after a try-in stage." },
  ],
  leadSurgeon: "astri",
  treatments: [
    { name: "Porcelain veneers (per tooth)", short: "Pressed lithium disilicate. Three-visit protocol over 14 days.", priceFromAud: 980,
      detail: { description: "E.max pressed porcelain veneers, ceramicist-shaded. Minimal preparation where possible. Try-in stage at day seven before final placement on day fourteen.", duration: "Three visits over 14 days", recovery: "No downtime",
        included: ["Smile design consultation", "Digital scan and mock-up", "Try-in appointment", "Final placement", "Bite review"] } },
    { name: "Composite veneers (per tooth)", short: "Same-day placement. Excellent for minor corrections or single teeth.", priceFromAud: 480,
      detail: { description: "Composite resin built up directly on the tooth in a single visit. Less durable than porcelain (5–7 years vs 15+) but reversible and excellent for minor corrections.", duration: "60 – 90 minutes per tooth", recovery: "No downtime",
        included: ["Smile design consultation", "Single-visit placement", "Polish appointment at 2 weeks"] } },
    { name: "Minimal-prep veneers", short: "No-prep or ultra-thin porcelain — for additive cases only.", priceFromAud: 1080,
      detail: { description: "Ultra-thin porcelain bonded to minimally prepared or unprepared enamel. Suitable only for additive cases (adding to small teeth or correcting gaps). Reversible.", duration: "Three visits over 10 days", recovery: "No downtime",
        included: ["Smile design consultation", "Digital scan", "Try-in appointment", "Final placement"] } },
    { name: "Full smile makeover (8–10 teeth)", short: "Complete upper-arch design with ceramicist collaboration.", priceFromAud: 7800,
      detail: { description: "Eight to ten upper veneers designed as a single composition. Includes orthodontic alignment check, gum reshaping if indicated, and two try-in stages.", duration: "Three to four visits over 14–18 days", recovery: "No downtime",
        included: ["Full smile design with ceramicist", "Eight to ten porcelain veneers", "Two try-in appointments", "Bite review and polish"] } },
  ],
};

window.SUBCATEGORY_DATA["dental-alignment"] = {
  parent: "dental", slug: "dental-alignment", title: "Alignment",
  chapterTitle: ["Aligned,", "quietly."],
  tagline: "Clear aligners and lingual alternatives, planned around your travel.",
  lede: "Clear alignment and discrete orthodontic options for adults — scanned, planned, and started during a single Bali visit, then maintained remotely.",
  intro: "Adult orthodontics has changed completely in the last decade. Most patients can be treated invisibly, with aligners worn at home and reviews by video. We do the scanning, planning, and first aligner fitting during your visit; the rest happens remotely.",
  overview: "We use Invisalign, ClearCorrect, and a Korean-Japanese lingual system for cases where aligners aren't suitable. Treatment ranges from six to eighteen months depending on complexity. Remote reviews quarterly; in-person review when convenient.",
  sections: [
    { id: "consultation", t: "Smile design and scan", body: "Forty-five minutes: digital scan, X-rays, photographs, and bite analysis. We model the projected outcome digitally so you can see the end-state before committing." },
    { id: "approach", t: "Our approach", body: "We choose the simplest system that delivers the outcome. Clear aligners for ninety percent of cases; lingual orthodontics where aligners can't deliver. We never recommend traditional metal braces to an adult patient." },
    { id: "remote", t: "Remote care", body: "After the in-person scan and first fitting, treatment continues at home with new aligners shipped every two weeks. Quarterly video reviews; in-person review on your next visit." },
  ],
  faqs: [
    { q: "How long does treatment take?", a: "Six to eighteen months. Simple cases (minor crowding, small spaces) at the shorter end; comprehensive cases at the longer." },
    { q: "Do I need to fly back?", a: "Most cases are managed remotely after the initial scan. We will ask you to return only if a refinement scan is needed." },
    { q: "Can I have veneers afterwards?", a: "Often the best plan — align first, then veneer. The combined treatment delivers the most lasting aesthetic result." },
  ],
  leadSurgeon: "astri",
  treatments: [
    { name: "Clear alignment (Invisalign / ClearCorrect)", short: "Comprehensive removable aligner therapy. Six to eighteen months.", priceFromAud: 3800,
      detail: { description: "Full Invisalign or ClearCorrect course including all aligners, attachments, refinements, and final retainers. Treatment managed primarily remotely after initial scan.", duration: "6 – 18 months · Remote care", recovery: "No downtime; aligners worn 22 hrs/day",
        included: ["Digital scan and full treatment plan", "All aligners shipped to you", "Quarterly video reviews", "Final retainers"] } },
    { name: "Express clear alignment", short: "Short-course aligners for minor corrections. 3–6 months.", priceFromAud: 2200,
      detail: { description: "Limited-course aligners for minor crowding, small spaces, or single-tooth corrections. Faster and lower cost than comprehensive treatment.", duration: "3 – 6 months · Remote care", recovery: "No downtime",
        included: ["Digital scan and limited plan", "All aligners shipped", "Two video reviews", "Final retainers"] } },
    { name: "Lingual alignment", short: "Invisible braces fixed to the inside of teeth. For cases aligners can't manage.", priceFromAud: 8400,
      detail: { description: "Custom lingual orthodontic system fixed to the inside of the teeth — invisible from the outside. For complex cases or rotations where aligners struggle.", duration: "12 – 24 months · Periodic visits required", recovery: "Adjustment period of 1–2 weeks",
        included: ["Digital plan", "Custom brackets and wires", "Quarterly adjustment visits", "Final retainers"] } },
    { name: "Retainer programme", short: "Custom retainers, day and night, with monitoring.", priceFromAud: 580,
      detail: { description: "Vivera or Essix retainers shipped in pairs, with monitoring at three, six, and twelve months. The forgotten part of orthodontics — and where most patients lose their results.", duration: "12 months programme", recovery: "Worn nightly",
        included: ["Three pairs of retainers", "Three remote reviews", "Replacement at 12 months"] } },
  ],
};

window.SUBCATEGORY_DATA["dental-whitening"] = {
  parent: "dental", slug: "dental-whitening", title: "Whitening",
  chapterTitle: ["Brighter,", "without overdoing it."],
  tagline: "Professional whitening protocols — for natural-looking results, not Hollywood ones.",
  lede: "In-chair professional whitening, take-home protocols, and combined approaches — calibrated for natural-looking brightness rather than aggressive shade changes.",
  intro: "Whitening is the most over-promised dental service in the world. We aim for two to three shades of improvement — enough to be noticeable, not enough to look unnatural. Aggressive whitening damages enamel and rarely looks better; we will tell you when you have reached the point of diminishing return.",
  overview: "We use Zoom and Opalescence — two of the most respected professional protocols. In-chair sessions deliver immediate change; take-home trays deliver more durable change over two weeks. The combined approach is most patients' best option.",
  sections: [
    { id: "consultation", t: "Assessment", body: "Twenty-minute appointment: shade matching, enamel quality assessment, and sensitivity history. Not all patients are good candidates for in-chair whitening; we will say so." },
    { id: "approach", t: "Our approach", body: "Conservative shade targets, sensitivity protocols where needed, and a maintenance plan to keep results. We won't sell you what your enamel can't safely take." },
    { id: "maintenance", t: "Maintenance", body: "A bi-annual take-home top-up keeps results indefinitely. We provide take-home trays after every protocol; ongoing whitening gel is available by post or on subsequent visits." },
  ],
  faqs: [
    { q: "How much whiter will I get?", a: "Two to four shades typically; sometimes more depending on starting point. We aim for natural improvement, not Hollywood whitening." },
    { q: "Will I have sensitivity?", a: "Mild sensitivity for 24–48 hours is common. We use desensitising agents in our protocols and provide take-home gel for sensitivity." },
    { q: "Does it work on veneers?", a: "No — porcelain doesn't whiten. If you have veneers, we whiten the natural teeth around them to match." },
  ],
  leadSurgeon: "astri",
  treatments: [
    { name: "Professional in-chair whitening", short: "Single-session Zoom or Opalescence protocol. Immediate result.", priceFromAud: 580,
      detail: { description: "Three twenty-minute cycles of professional-grade gel with desensitising rinse between. Two to four shades of improvement in a single 90-minute appointment.", duration: "90 minutes", recovery: "24–48 hours mild sensitivity",
        included: ["Pre-treatment cleaning", "Three whitening cycles", "Desensitising rinse", "Take-home gel for 7 days"] } },
    { name: "Take-home whitening kit", short: "Custom trays and professional gel — three weeks of nightly use.", priceFromAud: 380,
      detail: { description: "Custom-fitted trays with professional carbamide peroxide gel. Worn for two hours nightly for three weeks. More gradual but more durable result than in-chair.", duration: "Three weeks of home use", recovery: "Mild sensitivity in first week",
        included: ["Custom-fit trays", "Three weeks of professional gel", "Desensitising gel", "Final shade review"] } },
    { name: "Combined in-chair + take-home", short: "Single in-chair session followed by two weeks of home trays. Maximum result.", priceFromAud: 780,
      detail: { description: "Best of both protocols — immediate change in chair, durability built in by take-home. The combined approach gives the most reliable, lasting result.", duration: "90 mins clinic + 2 weeks home", recovery: "Mild sensitivity 48 hours",
        included: ["In-chair whitening session", "Custom-fit trays", "Two weeks of professional gel", "Maintenance protocol"] } },
    { name: "Dental scale and polish", short: "Professional cleaning and polish — often included pre-whitening.", priceFromAud: 180,
      detail: { description: "Forty-five minute scale, polish, and review. We recommend this either standalone or as a precursor to any whitening protocol.", duration: "45 minutes", recovery: "None",
        included: ["Full-mouth scale", "Polish", "Fluoride application", "Oral health review"] } },
  ],
};

// ============================================================
// RECOVERY & WELLNESS — VILLA STAYS & RECOVERY THERAPIES
// ============================================================

window.SUBCATEGORY_DATA["recovery-villas"] = {
  parent: "recovery", slug: "recovery-villas", title: "Villa Stays",
  chapterTitle: ["Quiet places,", "to come back to."],
  tagline: "Hand-selected villas, fully provisioned, with daily nursing.",
  lede: "Private recovery villas in Nusa Dua, Jimbaran, and Ubud — selected for privacy, comfort, and proximity to the clinic. Every villa is inspected quarterly by our concierge team.",
  intro: "Recovery is half of the work. We have spent twenty-eight years learning what makes recovery in Bali so different from recovery elsewhere — and we have built a programme that turns the worst part of surgery into something quieter, gentler, almost restorative.",
  overview: "Our villa portfolio is small and deliberately curated. Every property has a private pool, twenty-four-hour security, a chef on call, and is within fifteen minutes of the hospital. We provision them ourselves — pharmacy, food, dressings, ice packs — so you walk in ready.",
  sections: [
    { id: "selection", t: "Villa selection", body: "We match villa to procedure, not just patient. A facelift patient needs different ground-floor accessibility than a hair-restoration patient. The concierge will propose two or three options and walk you through the trade-offs." },
    { id: "provisioning", t: "Provisioning", body: "Every villa is provisioned before your arrival: pharmacy, food, recovery basics, a Wi-Fi extender, a phone with local SIM. The chef stocks the kitchen with anti-inflammatory food matched to your procedure." },
    { id: "support", t: "On-site support", body: "Daily nursing visits, twenty-four-hour on-call, and a dedicated concierge phone you can call any time. Most patients see their nurse twice in the first week and once in the second." },
  ],
  faqs: [
    { q: "How long should I stay?", a: "Five nights for most non-surgical work; seven to fourteen for surgical; twenty-one for major body contouring. We will not authorise an earlier departure for medical safety." },
    { q: "Can family stay with me?", a: "Yes — most villas have two to four bedrooms. We have family-friendly options and can match villa to your travel party." },
    { q: "Are the villas private?", a: "Entirely. Every villa is single-tenancy, gated, and staffed for privacy. No other guests, no shared spaces." },
  ],
  leadSurgeon: "suka",
  treatments: [
    { name: "Standard recovery villa", short: "Single-bedroom villa with pool. Suited to solo patients or couples.", priceFromAud: 280,
      detail: { description: "One- or two-bedroom villa with private pool, full kitchen, dedicated parking. Daily housekeeping. Located in Nusa Dua, fifteen minutes from the hospital. Per night.", duration: "Per night · Min 5 nights", recovery: "—",
        included: ["Private pool and garden", "Daily housekeeping", "Full kitchen and stocked pantry", "Wi-Fi and local SIM", "24-hour security"] } },
    { name: "Premium recovery villa", short: "Two- or three-bedroom villa with chef. Suited to extended stays.", priceFromAud: 480,
      detail: { description: "Larger villa with two to three bedrooms, private chef daily, dedicated houseman, and concierge driver. For longer recoveries or patients travelling with family.", duration: "Per night · Min 7 nights", recovery: "—",
        included: ["Two to three bedrooms", "Chef and daily menu", "Houseman service", "Dedicated driver", "Wi-Fi and local SIM"] } },
    { name: "Family-friendly villa", short: "Three- or four-bedroom villa with family amenities.", priceFromAud: 580,
      detail: { description: "Larger property with extra bedrooms, children's amenities, and longer driveway for safer access. Located near family-friendly Nusa Dua amenities including beaches and gardens.", duration: "Per night · Min 7 nights", recovery: "—",
        included: ["Three to four bedrooms", "Family amenities", "Chef and houseman", "Children's items on request", "Driver included"] } },
    { name: "Extended recovery (14+ nights)", short: "Discounted longer stays in the same villas; staffing reshaped for the duration.", priceFromAud: 240,
      detail: { description: "Extended-stay rate for stays of fourteen nights or longer. Same properties, same staff, but reshaped programming and a per-night discount of fifteen to twenty-five percent.", duration: "Per night · Min 14 nights", recovery: "—",
        included: ["Same villas as standard", "Reshaped staffing", "Weekly menu rotation", "Local-area orientation"] } },
  ],
};

window.SUBCATEGORY_DATA["recovery-therapies"] = {
  parent: "recovery", slug: "recovery-therapies", title: "Recovery Therapies",
  chapterTitle: ["Healing,", "supported."],
  tagline: "Daily nursing, drainage, physio, and nutrition — included in most surgical packages.",
  lede: "In-villa nursing, manual lymphatic drainage, gentle physiotherapy, and post-op nutrition — the small kindnesses that turn medical recovery into something closer to a retreat.",
  intro: "Recovery is rewarded by support, not solitude. Patients who follow our drainage and physiotherapy protocols heal faster, more comfortably, and with less swelling than patients who decline them. We include them in every surgical package by default, and offer them as standalone services for non-surgical visits.",
  overview: "Our recovery team is small and consistent — most patients see the same nurse, the same drainage therapist, and the same physiotherapist across their stay. We coordinate everything: timing, in-villa visits, surgeon liaison, and your daily schedule. You do not need to manage logistics; the concierge does.",
  sections: [
    { id: "nursing", t: "Daily nursing", body: "Registered nurses visit your villa once or twice a day for dressing changes, vital signs, and surgeon liaison. Twenty-four-hour on-call for the first week of any surgical recovery." },
    { id: "drainage", t: "Lymphatic drainage", body: "Manual lymphatic drainage from day three accelerates healing, reduces swelling, and improves contour outcomes for body and facial work. Most surgical patients have three to six sessions during their stay." },
    { id: "physio", t: "Physiotherapy and nutrition", body: "Gentle return-to-movement protocols for body surgery; nutritional support to optimise healing across all procedures. Coordinated with your surgeon for safety." },
  ],
  faqs: [
    { q: "Do I really need lymphatic drainage?", a: "Strongly recommended for facial and body surgery. Outcomes are measurably better with drainage than without — most patients are surprised by how much swelling is shifted by a single session." },
    { q: "What does daily nursing actually do?", a: "Dressing changes, vitals, wound monitoring, medication management, and direct liaison with your surgeon. We catch complications early." },
    { q: "Can I add these to a non-surgical visit?", a: "Yes — drainage, physiotherapy, and nutrition coaching are available standalone. Many patients combine non-surgical aesthetics with a wellness focus during their stay." },
  ],
  leadSurgeon: "suka",
  treatments: [
    { name: "Daily in-villa nursing", short: "Registered nurse visit; 24-hour on-call. Per visit.", priceFromAud: 180,
      detail: { description: "Registered nurse visits your villa for dressing changes, vital signs, medication management, and surgeon liaison. Twenty-four-hour on-call line for questions or concerns.", duration: "30 – 60 minutes per visit", recovery: "—",
        included: ["RN home visit", "Dressing change and wound check", "Vitals and pain assessment", "Surgeon liaison", "24-hour on-call"] } },
    { name: "Manual lymphatic drainage", short: "Sixty-minute session, Vodder or Leduc method. From day 3 post-op.", priceFromAud: 140,
      detail: { description: "Manual lymphatic drainage performed in your villa. Vodder or Leduc method depending on procedure. Accelerates healing, reduces swelling, improves final contour.", duration: "60 minutes per session", recovery: "—",
        included: ["In-villa session", "Vodder or Leduc method", "Coordination with nursing team", "Three-session package available"] } },
    { name: "Gentle physiotherapy", short: "Return-to-movement programme for body procedures.", priceFromAud: 160,
      detail: { description: "Forty-five minute session focusing on graded return to movement after body surgery. Often combined with drainage on alternate days. Take-home routines for ongoing recovery.", duration: "45 minutes per session", recovery: "—",
        included: ["In-villa or clinic session", "Take-home routine", "Coordination with surgeon", "Progress tracking"] } },
    { name: "Post-op nutrition consult", short: "Anti-inflammatory nutrition planning for optimal healing.", priceFromAud: 240,
      detail: { description: "Sixty-minute consultation with our nutritionist to plan an anti-inflammatory eating protocol for your recovery. Chef receives the brief; villa pantry stocked accordingly.", duration: "60-minute consult + meal planning", recovery: "—",
        included: ["Initial consultation", "Three-week meal plan", "Chef brief and pantry stocking", "Two follow-up reviews"] } },
    { name: "Three-session drainage course", short: "Discounted package — three lymphatic drainage sessions over a week.", priceFromAud: 380,
      detail: { description: "Three lymphatic drainage sessions, typically delivered on days 3, 5, and 7 post-procedure. The minimum protocol we recommend for any surgical recovery.", duration: "Three sessions over a week", recovery: "—",
        included: ["Three 60-minute sessions", "In-villa delivery", "Coordinated with nursing", "Progress monitoring"] } },
  ],
};

// ============================================================
// CONCIERGE — TRAVEL, STAY, AFTERCARE
// ============================================================

window.SUBCATEGORY_DATA["concierge-travel"] = {
  parent: "concierge", slug: "concierge-travel", title: "Travel",
  chapterTitle: ["From your", "first call."],
  tagline: "Coordination across visa, transfers, translation, and onward travel.",
  lede: "Airport transfers, visa coordination, translation services, and onward travel planning — handled before you leave home, met at the gate when you arrive.",
  intro: "Travel is the most under-appreciated part of medical tourism. Patients who arrive jet-lagged, confused, or unprepared have measurably worse recoveries. Our concierge handles the logistics so you arrive rested, oriented, and ready to focus on what you came for.",
  overview: "Our concierge is not a customer-service team. They are a small group of trained coordinators with backgrounds in nursing or hospitality, who take on a case from first enquiry and stay with it through your year of follow-up. Most travel services are included in your treatment package.",
  sections: [
    { id: "pre-arrival", t: "Pre-arrival coordination", body: "We help with visa documentation (visa-on-arrival is straightforward for most nationalities), insurance liaison, and a pre-flight checklist matched to your procedure. We confirm everything two weeks before you fly." },
    { id: "arrival", t: "Arrival and transfers", body: "Met at the Ngurah Rai International gate by name. Black-car transfer to villa or hotel. Bag handling, local SIM activation, and a welcome briefing the next morning." },
    { id: "during", t: "During your stay", body: "Dedicated concierge driver throughout. Translation services where needed. Onward travel coordination, restaurant reservations, and anything else that arises. You don't manage logistics; we do." },
  ],
  faqs: [
    { q: "Is the concierge included?", a: "Yes — for all surgical packages and most non-surgical treatments. Standalone concierge service is available for patients combining BIMC with other Bali plans." },
    { q: "What about visas?", a: "Most nationalities receive visa-on-arrival for thirty days. For longer stays we provide a Letter of Support for visa extensions, which is processed locally." },
    { q: "Do you speak my language?", a: "English and Bahasa Indonesia in-house. Translation services for Mandarin, Japanese, Korean, Arabic, French, and German on a same-day basis." },
  ],
  leadSurgeon: "suka",
  treatments: [
    { name: "Airport transfers", short: "Black-car service. Met at gate; bag handling included.", priceFromAud: "included",
      detail: { description: "Round-trip airport transfers in air-conditioned black car, met at the international gate by name. Bag handling and welcome basket included. Included in all surgical packages.", duration: "60 – 90 minutes each way", recovery: "—",
        included: ["Black-car arrival transfer", "Black-car departure transfer", "Bag handling", "Welcome basket", "Concierge driver"] } },
    { name: "Visa coordination", short: "Visa-on-arrival support, Letter of Support, and extension where needed.", priceFromAud: "included",
      detail: { description: "We provide a Letter of Support for visa-on-arrival, coordinate any extensions locally, and prepare documentation for nationalities that need pre-arrival visas. All included with your treatment package.", duration: "Pre-arrival coordination", recovery: "—",
        included: ["Letter of Support", "Visa-on-arrival guidance", "Extension processing where needed", "Documentation preparation"] } },
    { name: "Translation services", short: "Same-day translation for non-English-speaking patients.", priceFromAud: "included",
      detail: { description: "In-house translators for Mandarin, Japanese, Korean, Arabic, French, and German. Same-day availability for consultations, surgeries, and post-op visits. Included with all treatments.", duration: "Per appointment as needed", recovery: "—",
        included: ["In-house translators", "Multiple language coverage", "Consultation and surgery support", "Document translation"] } },
    { name: "Onward travel planning", short: "Restaurant reservations, day trips, family activities, departure logistics.", priceFromAud: "included",
      detail: { description: "Our concierge plans the parts of your stay that aren't medical: restaurants, beach days for family members, Ubud excursions, departure-day logistics. Included with all treatments.", duration: "Throughout your stay", recovery: "—",
        included: ["Restaurant reservations", "Day-trip planning", "Family activities", "Departure-day coordination"] } },
    { name: "Travel insurance liaison", short: "Documentation and claims support for your travel and medical insurance.", priceFromAud: "included",
      detail: { description: "Full documentation pack (surgical reports, itemised invoices) for your insurance claims. We work directly with two specialist medical-travel insurers and can refer you if needed.", duration: "Pre- and post-arrival", recovery: "—",
        included: ["Surgical and medical documentation", "Itemised invoicing", "Direct insurer liaison", "Claim support"] } },
  ],
};

window.SUBCATEGORY_DATA["concierge-stay"] = {
  parent: "concierge", slug: "concierge-stay", title: "Stay",
  chapterTitle: ["The stay,", "made simple."],
  tagline: "Villa selection, family accommodation, provisioning, and connectivity.",
  lede: "From villa selection to family rooms, daily provisioning to local SIMs — your stay is coordinated as a single piece, not assembled from parts.",
  intro: "Most medical-tourism patients spend more time outside the clinic than inside it. The stay should be effortless: the right villa, the right provisions, the right connectivity, all in place when you arrive. Our concierge handles every element.",
  overview: "We coordinate stays across our villa portfolio, partner resorts, and recommended hotels — depending on your procedure, party size, and budget. Family accommodation is offered alongside patient accommodation; our team makes sure both are aligned.",
  sections: [
    { id: "selection", t: "Villa and accommodation selection", body: "We propose two to three options based on your procedure, party size, and proximity needs. You choose; we book; the villa is provisioned and staffed before you arrive." },
    { id: "family", t: "Family accommodation", body: "Many surgical patients travel with a partner, parent, or close friend. We accommodate companions in the same villa (most have multiple bedrooms) or in adjacent properties — and we orient them on Bali while you recover." },
    { id: "provisioning", t: "Daily provisioning", body: "Pantry stocking, pharmacy, recovery basics, chef briefs, and a local SIM card with data. Everything is in place when you walk through the door." },
  ],
  faqs: [
    { q: "What if I want to stay somewhere else?", a: "Many patients combine BIMC with a partner resort or boutique hotel. We coordinate stays across multiple properties and can transfer you between them as needed." },
    { q: "Can my whole family come?", a: "Yes. Many patients travel with three or four family members. We accommodate everyone and orient the non-patient travellers on what Bali offers during their stay." },
    { q: "Will I have Wi-Fi?", a: "Every villa has Wi-Fi. We also provide a local SIM with data on arrival, in case you need connectivity outside the villa." },
  ],
  leadSurgeon: "suka",
  treatments: [
    { name: "Villa selection and booking", short: "Two- to three-option proposal matched to procedure and party size.", priceFromAud: "included",
      detail: { description: "We propose villas based on your procedure (e.g. ground-floor needs after body surgery), party size, and budget. Booking, provisioning, and check-in coordinated by us.", duration: "Pre-arrival coordination", recovery: "—",
        included: ["Two to three villa options", "Booking and payment coordination", "Pre-arrival provisioning", "Check-in coordination"] } },
    { name: "Family accommodation", short: "Coordinated stays for partners, parents, or companions.", priceFromAud: "included",
      detail: { description: "We accommodate companions in the same villa where space allows (most have multiple bedrooms) or in adjacent properties. We also orient them on Bali during your recovery.", duration: "Throughout your stay", recovery: "—",
        included: ["Companion accommodation", "Family-friendly villa options", "Companion orientation", "Family activity planning"] } },
    { name: "Daily provisioning", short: "Pantry stocking, pharmacy, recovery basics, chef briefs.", priceFromAud: "included",
      detail: { description: "Daily villa provisioning: groceries delivered, pharmacy stocked, chef briefed on your dietary requirements, recovery basics (ice packs, dressings) on hand. Restocked through your stay.", duration: "Daily through stay", recovery: "—",
        included: ["Pantry stocking", "Pharmacy delivery", "Chef brief and menu", "Recovery basics on hand"] } },
    { name: "Local SIM and connectivity", short: "Local SIM with data, Wi-Fi extender, technical support.", priceFromAud: "included",
      detail: { description: "Local SIM card with data plan delivered on arrival. Wi-Fi extender if villa coverage is patchy. Technical support if anything stops working.", duration: "Throughout stay", recovery: "—",
        included: ["Local SIM with data", "Wi-Fi extender if needed", "Phone support", "International calling setup"] } },
  ],
};

window.SUBCATEGORY_DATA["concierge-aftercare"] = {
  parent: "concierge", slug: "concierge-aftercare", title: "Aftercare",
  chapterTitle: ["Twelve months,", "of follow-up."],
  tagline: "The year after surgery is part of the work.",
  lede: "Twelve-month telehealth follow-up, insurance documentation, local-care coordination, and ongoing support — built into every surgical package and most non-surgical treatments.",
  intro: "Care doesn't end at the airport gate. We follow every surgical patient for twelve months by video, coordinate with local doctors in your home country where helpful, and stay reachable on your anniversary. This isn't a service we add; it's part of how we practice.",
  overview: "Our aftercare programme is structured: video reviews at one week, one month, three months, six months, and twelve months for every surgical patient. Non-surgical patients receive a six-week and six-month review. All your concierge contact remains the same person.",
  sections: [
    { id: "schedule", t: "Follow-up schedule", body: "Five scheduled video reviews across the year, more if anything arises. Each review is a forty-five-minute conversation with your surgeon — photographs reviewed, healing assessed, ongoing care advised." },
    { id: "documentation", t: "Documentation", body: "Full surgical documentation pack on departure, insurance liaison, and any documents your home-country doctor needs. We can deliver records to any specialist worldwide." },
    { id: "ongoing", t: "Ongoing support", body: "Your concierge remains your contact through the year. If you need a referral to a local doctor at home, we coordinate. If you have a question at month six, we answer. If you book a top-up at month nine, we plan it." },
  ],
  faqs: [
    { q: "Is aftercare included?", a: "Yes — for every surgical package and most non-surgical treatments. We don't charge separately for follow-up reviews or documentation." },
    { q: "What if I need to see a local doctor?", a: "We coordinate with local specialists in your home country where helpful. We've placed referrals on six continents and maintain relationships with specialists in the major medical-tourism markets." },
    { q: "Do you market afterwards?", a: "Never. Once your case is closed at twelve months, you'll hear from us only on the anniversary of your surgery, and only if you opt in." },
  ],
  leadSurgeon: "suka",
  treatments: [
    { name: "12-month telehealth follow-up", short: "Five scheduled video reviews with your surgeon over the year.", priceFromAud: "included",
      detail: { description: "Scheduled reviews at one week, one month, three months, six months, and twelve months. Each is a 45-minute video appointment with your surgeon, with photo review and ongoing care guidance.", duration: "Five appointments over 12 months", recovery: "—",
        included: ["Five video reviews", "Photo review at each", "Direct surgeon access", "Coordination with local doctors"] } },
    { name: "Insurance & claim documentation", short: "Full documentation pack for your travel and medical insurance.", priceFromAud: "included",
      detail: { description: "Surgical report, anaesthetic record, itemised invoice, and any specialist documentation your insurer requires. Delivered in your insurer's preferred format.", duration: "Documentation on departure", recovery: "—",
        included: ["Surgical report", "Anaesthetic record", "Itemised invoice", "Specialist documentation"] } },
    { name: "Local-care coordination", short: "Referrals and handover to specialists in your home country.", priceFromAud: "included",
      detail: { description: "Where helpful, we coordinate handover to local doctors in your home country — for dressing changes, scar management, or specialist follow-up. We maintain relationships across major markets.", duration: "As needed through year", recovery: "—",
        included: ["Specialist referral", "Direct doctor-to-doctor liaison", "Records transfer", "Follow-up coordination"] } },
    { name: "Anniversary check-in", short: "Twelve-month surgical anniversary review with your surgeon.", priceFromAud: "included",
      detail: { description: "Forty-five minutes with your surgeon at the twelve-month mark to assess final result, review long-term care, and (if appropriate) discuss any complementary work.", duration: "45 minutes at 12 months", recovery: "—",
        included: ["12-month video appointment", "Final photo review", "Long-term care plan", "Optional onward planning"] } },
    { name: "Onward referral", short: "Referral to specialists for ongoing or complementary work.", priceFromAud: "included",
      detail: { description: "Where your case calls for specialty input we cannot provide ourselves — dermatology, cardiology, mental health — we make referrals to vetted specialists in your area.", duration: "As needed", recovery: "—",
        included: ["Specialist referral", "Records and report transfer", "Direct introduction where appropriate"] } },
  ],
};


// ============================================================
// WEIGHT LOSS — MEDICAL, ENDOSCOPIC, BARIATRIC
// ============================================================

window.SUBCATEGORY_DATA["weight-loss-medical"] = {
  parent: "recovery", slug: "weight-loss-medical", title: "Medical",
  chapterTitle: ["Medical weight", "loss."],
  tagline: "Pharmacological pathways, supported by nutrition and behaviour.",
  lede: "GLP-1 medications, structured dietitian programmes, and prescription protocols — for patients seeking sustained weight loss without surgery, with monthly monitoring and lifestyle support.",
  intro: "Medical weight loss has changed completely in the last three years. Modern GLP-1 receptor agonists deliver outcomes that previously required surgery — when paired with the right nutritional, behavioural and metabolic context. Our programme begins with a thirty-minute consultation, baseline bloods, and an honest conversation about which pathway suits your body.",
  overview: "Our medical pathway is led by a consultant endocrinologist working alongside our dietitian and behavioural-health team. We prescribe TGA- and FDA-approved medications only, monitor monthly, and step down or transition to maintenance once your target is reached. We will not prescribe without ongoing supervision.",
  sections: [
    { id: "consultation", t: "The consultation", body: "Initial sixty-minute consult with the endocrinologist: baseline bloods, body composition, weight history, and clear discussion of pathway options. We will tell you honestly if medical weight loss is unlikely to deliver — some patients are better served by endoscopic or surgical routes from the outset." },
    { id: "approach", t: "Our approach", body: "GLP-1 receptor agonists (semaglutide, tirzepatide) prescribed in titrated doses, paired with a structured eating protocol and weekly check-ins for the first month. Monthly monitoring thereafter for at least twelve months. We coordinate refills and shipping to your home country." },
    { id: "outcomes", t: "What to expect", body: "Most patients lose 12–20% of body weight over 12–18 months on GLP-1 therapy when paired with nutrition coaching. Plateau is normal at month 9–12; we adjust protocol accordingly. Maintenance dosing typically continues for at least twelve months after target weight is reached." },
  ],
  faqs: [
    { q: "How long do I need to take the medication?", a: "Most patients stay on therapeutic doses for 12–18 months, then transition to maintenance for at least another 12. Stopping abruptly usually leads to rebound; we taper carefully." },
    { q: "Can I get prescriptions back home?", a: "Yes — we coordinate refills via international compounding pharmacies or partner clinics in your home country. Monthly video reviews continue regardless of where you are." },
    { q: "What are the side effects?", a: "Nausea and reduced appetite are the most common, typically resolving within 4–6 weeks. We start at the lowest dose and titrate slowly — far slower than most clinics — to minimise this." },
  ],
  leadSurgeon: "sissy",
  treatments: [
    { name: "GLP-1 consultation & initiation", short: "60-minute endocrinologist consult, baseline bloods, and first prescription.", priceFromAud: 580,
      detail: { description: "Initial consultation, full metabolic panel (HbA1c, lipids, liver, thyroid, kidney), body composition analysis, and decision on pathway. First month's prescription included.", duration: "60 minutes · single visit", recovery: "—",
        included: ["Endocrinologist consultation", "Full metabolic panel", "Body composition analysis", "First prescription", "Initial dietitian session"] } },
    { name: "Semaglutide (Wegovy) programme", short: "Monthly GLP-1 programme with titration, monitoring, and dietitian support.", priceFromAud: 1180,
      detail: { description: "Monthly programme: medication, monthly video review with the endocrinologist, monthly dietitian session, and 24/7 messaging support. Titration over 12 weeks to therapeutic dose.", duration: "Monthly · 12 months minimum", recovery: "—",
        included: ["Monthly medication", "Monthly endocrinologist video review", "Monthly dietitian session", "Behavioural support", "Body composition tracking"] } },
    { name: "Tirzepatide (Mounjaro) programme", short: "Dual-agonist GLP-1/GIP medication; for patients with larger weight goals or metabolic complexity.", priceFromAud: 1480,
      detail: { description: "Tirzepatide is a newer dual receptor agonist with stronger weight-loss outcomes than semaglutide in head-to-head trials. We prescribe where appropriate after metabolic assessment. Monthly programme as above.", duration: "Monthly · 12 months minimum", recovery: "—",
        included: ["Monthly medication", "Monthly endocrinologist video review", "Monthly dietitian session", "Behavioural support", "Body composition tracking"] } },
    { name: "Dietitian-led programme", short: "Structured nutrition and behaviour change without medication. Twelve-week intensive then maintenance.", priceFromAud: 980,
      detail: { description: "Twelve-week intensive dietitian-led programme: weekly sessions, food diary review, behavioural coaching, and body composition tracking. For patients who prefer non-pharmacological approaches or as preparation for surgery.", duration: "Twelve weeks intensive + maintenance", recovery: "—",
        included: ["Initial consultation", "Twelve weekly sessions", "Food diary review", "Body composition tracking", "Six-month follow-up"] } },
    { name: "Maintenance programme", short: "Quarterly review and prescription continuation after reaching target weight.", priceFromAud: 380,
      detail: { description: "Quarterly review programme for patients on stable maintenance dose. Endocrinologist review, dietitian check-in, and prescription continuation. Coordinated with your home-country pharmacy.", duration: "Quarterly · indefinite", recovery: "—",
        included: ["Quarterly endocrinologist review", "Quarterly dietitian check-in", "Prescription continuation", "Annual bloods"] } },
  ],
};

window.SUBCATEGORY_DATA["weight-loss-endoscopic"] = {
  parent: "recovery", slug: "weight-loss-endoscopic", title: "Endoscopic",
  chapterTitle: ["Endoscopic", "weight loss."],
  tagline: "Non-incisional procedures performed through the mouth, no scars.",
  lede: "Intragastric balloons and endoscopic sleeve gastroplasty (ESG) — performed under sedation through the mouth, with no incisions and same-week recovery.",
  intro: "Endoscopic procedures sit between medication and surgery. Performed under sedation via the mouth — no incisions, no scars, no overnight stay — they deliver meaningful weight loss for patients who haven't responded to medication alone but aren't ready for full surgery. We perform in our ACHSI-accredited theatres with a bariatric anaesthetist on every case.",
  overview: "Endoscopic procedures are performed by our consultant gastroenterologist, with full bariatric multidisciplinary support: dietitian, behavioural health, and exercise physiology. Recovery is days, not weeks; outcomes are weeks, not minutes.",
  sections: [
    { id: "consultation", t: "The consultation", body: "Initial sixty-minute consult with the gastroenterologist and dietitian: medical history, weight history, BMI assessment, and pathway selection. We require a minimum BMI threshold and a stable mental-health history before proceeding." },
    { id: "approach", t: "Our approach", body: "Intragastric balloon for patients with BMI 27–35 looking for a shorter-term intervention; endoscopic sleeve gastroplasty for patients with BMI 30–40 who want longer-lasting volumetric restriction without surgery. All procedures include twelve months of multidisciplinary follow-up." },
    { id: "recovery", t: "Recovery", body: "Same-day discharge. Three to five days of liquid then soft diet at home; back to normal activity within a week. We require seven nights on the island for follow-up imaging and the first dietitian review." },
  ],
  faqs: [
    { q: "How long does the balloon stay in?", a: "Six months for Orbera, twelve months for Spatz. Removed endoscopically with the same procedure used to place it." },
    { q: "Is ESG reversible?", a: "Partially — the gastroplasty sutures dissolve over time, and the stomach can stretch back. It is more durable than a balloon (5+ years) but less permanent than surgery." },
    { q: "How much weight will I lose?", a: "Average is 12–18% of body weight over the first year. Outcomes plateau after 12–18 months without ongoing protocol support." },
  ],
  leadSurgeon: "suka",
  treatments: [
    { name: "Intragastric balloon (Orbera, 6 months)", short: "Saline-filled balloon placed under sedation; remains for six months then removed.", priceFromAud: 6800,
      detail: { description: "Saline-filled silicone balloon placed in the stomach via endoscopy under sedation. Stays in for six months, then removed by the same technique. Significantly reduces stomach capacity and meal volumes.", duration: "30 minutes · sedation · day case", recovery: "3–5 days liquid/soft diet; 7 nights on-island",
        included: ["Pre-op consultation and bloods", "Endoscopic balloon placement", "Six months of dietitian support", "Removal procedure at six months", "Twelve-month behavioural programme"] } },
    { name: "Intragastric balloon (Spatz, 12 months)", short: "Adjustable saline balloon for twelve months; volume can be increased mid-treatment.", priceFromAud: 8400,
      detail: { description: "Adjustable saline balloon — placement is the same as Orbera but the device allows volume adjustment after three months if you've adapted. Twelve-month duration. Best for patients seeking longer non-surgical pathway.", duration: "30 minutes · sedation · day case", recovery: "3–5 days liquid/soft diet; 7 nights on-island",
        included: ["Pre-op consultation and bloods", "Endoscopic balloon placement", "Twelve months of dietitian support", "One volume adjustment (if indicated)", "Removal at twelve months"] } },
    { name: "Endoscopic Sleeve Gastroplasty (ESG)", short: "Stomach reshaped from inside using sutures via endoscopy — no incisions, durable result.", priceFromAud: 14800,
      detail: { description: "Endoscopic sutures placed to fold the stomach into a tube, reducing capacity by 70–80%. Performed under general anaesthetic via endoscopy — no abdominal incisions. More durable than a balloon; less invasive than surgery.", duration: "90 minutes · general anaesthetic · day case", recovery: "1 week soft diet; 10 nights on-island",
        included: ["Pre-op consultation and bloods", "Endoscopic procedure", "Overnight observation", "5 nights private villa", "Twelve months of follow-up", "Dietitian programme"] } },
    { name: "Endoscopic revision", short: "Re-suturing or re-balloon for patients who have regained weight after a prior endoscopic procedure.", priceFromAud: 9800,
      detail: { description: "For patients with prior balloon or ESG who have regained weight, we offer endoscopic revision — either re-balloon or additional sutures depending on anatomy. Outcomes are typically less than primary procedure but meaningful.", duration: "60–90 minutes · sedation · day case", recovery: "1 week soft diet; 7 nights on-island",
        included: ["Pre-op consultation and bloods", "Endoscopic procedure", "5 nights private villa", "Six months of dietitian support", "Programme tailored to revision context"] } },
  ],
};

window.SUBCATEGORY_DATA["weight-loss-surgical"] = {
  parent: "recovery", slug: "weight-loss-surgical", title: "Bariatric Surgery",
  chapterTitle: ["Bariatric", "surgery."],
  tagline: "Laparoscopic surgical pathways for serious weight loss.",
  lede: "Sleeve gastrectomy, gastric bypass, and revision bariatric surgery — performed laparoscopically by our consultant bariatric surgeon in our ACHSI-accredited theatres, with structured multidisciplinary support before and after.",
  intro: "Bariatric surgery is the most effective intervention for severe obesity — and the most demanding to prepare for. Our pathway is deliberately slower than most. We require a twelve-week pre-surgery programme: nutrition, psychological assessment, and behavioural coaching. Patients who skip this preparation have higher complication rates and poorer outcomes.",
  overview: "Performed by a consultant bariatric surgeon with international fellowship training and over 1,500 cases. All procedures are laparoscopic (keyhole) with same-day mobilisation. We are conservative about combining bariatric surgery with body-contouring work — the latter is best deferred until weight has been stable for twelve months.",
  sections: [
    { id: "consultation", t: "The consultation", body: "Initial sixty-minute consult with the bariatric surgeon, followed by a multidisciplinary review (dietitian, psychologist, anaesthetist). We require a minimum BMI threshold and demonstrated commitment to a twelve-week pre-surgery programme before booking." },
    { id: "approach", t: "Our approach", body: "Sleeve gastrectomy for most primary cases — simpler, lower complication rate, excellent outcomes. Roux-en-Y gastric bypass for patients with severe reflux, type-2 diabetes, or higher BMI categories where the bypass's metabolic effect matters. Mini-gastric bypass for select revision cases." },
    { id: "recovery", t: "Recovery", body: "Two nights in hospital, then ten nights in our recovery villa with daily nursing visits and dietitian-supervised graduated diet. We require fourteen nights on-island minimum, twenty-one for higher-BMI patients or revision cases. Full recovery to activity takes four to six weeks." },
  ],
  faqs: [
    { q: "Sleeve or bypass — which is right for me?", a: "Sleeve for most patients — simpler, fewer complications, excellent durable weight loss. Bypass when severe reflux, type-2 diabetes, or BMI 50+ make its metabolic effects more compelling. Decision is made in MDT consultation." },
    { q: "What weight loss can I expect?", a: "Average is 60–70% of excess body weight at year one for sleeve; 70–80% for bypass. Maintained at year five in ~70% of patients who adhere to follow-up programme." },
    { q: "How long until I can fly home?", a: "Fourteen days minimum for sleeve, sixteen for bypass. We do not authorise earlier flights — DVT risk and anastomotic leak risk both remain elevated in the first two weeks." },
  ],
  leadSurgeon: "suka",
  treatments: [
    { name: "Sleeve gastrectomy", short: "Most common bariatric procedure — 75% of the stomach removed laparoscopically.", priceFromAud: 14800,
      detail: { description: "Laparoscopic removal of approximately 75% of the stomach, leaving a banana-shaped tube. Reduces stomach capacity and metabolic appetite signals. The most common bariatric procedure worldwide and our most-recommended primary operation.", duration: "60–90 minutes · general anaesthetic", recovery: "14 nights on-island; 4–6 weeks to full activity",
        included: ["Twelve-week pre-surgery programme", "Theatre, anaesthetic & two-night observation", "10 nights in private recovery villa", "Daily nursing", "Dietitian-supervised diet progression", "12-month telehealth follow-up"] } },
    { name: "Roux-en-Y gastric bypass", short: "Stomach divided and small bowel rerouted — strongest metabolic effect; for severe cases.", priceFromAud: 18400,
      detail: { description: "Stomach divided into a small upper pouch and connected directly to the lower small bowel — bypassing the rest of the stomach and upper bowel. Stronger metabolic and weight-loss effect than sleeve, particularly for patients with type-2 diabetes or severe reflux.", duration: "2–3 hours · general anaesthetic", recovery: "16 nights on-island; 6 weeks to full activity",
        included: ["Twelve-week pre-surgery programme", "Theatre, anaesthetic & three-night observation", "12 nights in private recovery villa", "Daily nursing", "Dietitian-supervised diet progression", "Vitamin & supplement programme", "12-month telehealth follow-up"] } },
    { name: "Mini-gastric bypass (OAGB)", short: "Single-anastomosis bypass; shorter operating time, comparable outcomes.", priceFromAud: 17400,
      detail: { description: "One-anastomosis gastric bypass — a longer stomach pouch and single connection to the small bowel. Shorter operating time than Roux-en-Y; comparable outcomes; slightly higher reflux risk. We offer for select revision cases and primary cases by patient preference.", duration: "90 minutes · general anaesthetic", recovery: "14 nights on-island; 6 weeks to full activity",
        included: ["Twelve-week pre-surgery programme", "Theatre, anaesthetic & two-night observation", "10 nights in private recovery villa", "Daily nursing", "Dietitian-supervised diet progression", "Vitamin & supplement programme", "12-month telehealth follow-up"] } },
    { name: "Revision bariatric surgery", short: "Converting sleeve to bypass, or revising a prior bariatric procedure that has failed.", priceFromAud: 22400,
      detail: { description: "Conversion or revision of a prior bariatric procedure. Most common is sleeve-to-bypass for patients with weight regain or severe reflux. Technically demanding; we review original surgical records before quoting.", duration: "3–4 hours · general anaesthetic", recovery: "21 nights on-island; 8 weeks to full activity",
        included: ["Pre-surgery review of prior records", "Theatre, anaesthetic & three-night observation", "14 nights in private recovery villa", "Daily nursing", "Dietitian-supervised diet progression", "Vitamin & supplement programme", "12-month telehealth follow-up"] } },
  ],
};

// ============================================================
// RECONSTRUCTIVE SURGERY — BREAST, TRAUMA, CRANIOFACIAL
// ============================================================

window.SUBCATEGORY_DATA["reconstructive-breast"] = {
  parent: "reconstructive", slug: "reconstructive-breast", title: "Breast Reconstruction",
  chapterTitle: ["Breast", "reconstruction."],
  tagline: "Restoration after mastectomy, with proportion and symmetry in mind.",
  lede: "Implant-based and autologous (DIEP, TRAM) breast reconstruction after mastectomy — performed by ISAPS-credentialed reconstructive surgeons, often in coordination with oncology teams in your home country.",
  intro: "Reconstruction after breast cancer is one of the most demanding pieces of plastic surgery we perform — and one of the most rewarding. We work with your oncology team in your home country, coordinate timing with chemotherapy or radiotherapy, and plan reconstruction as a journey rather than a single operation. Most full reconstructions take two to three stages over twelve to eighteen months.",
  overview: "Our reconstructive practice is a small subset of our overall surgical volume — by design. We perform DIEP, TRAM, and implant-based reconstructions; we coordinate with international oncologists via your concierge; and we provide full surgical documentation for insurance claims, which often cover reconstruction in part or whole.",
  sections: [
    { id: "consultation", t: "The consultation", body: "A ninety-minute video consultation with the reconstructive surgeon, with full review of your oncology history, mastectomy reports, and imaging. We will work with your oncology team to schedule reconstruction at the right point in your treatment timeline." },
    { id: "approach", t: "Our approach", body: "Implant-based reconstruction (one- or two-stage with expander) for most patients; autologous (using your own tissue from the abdomen — DIEP or TRAM) for patients seeking the most natural result, with adequate donor tissue. We discuss honestly what each approach can and cannot deliver." },
    { id: "recovery", t: "Recovery", body: "Two nights in hospital, then ten to fourteen nights in our recovery villa with daily nursing. Autologous reconstruction requires longer recovery (fourteen+ nights) and graduated return to activity over eight weeks." },
  ],
  faqs: [
    { q: "Will my insurance cover this?", a: "Often partially or fully — reconstruction after cancer is recognised by most insurers as medically necessary. We provide full surgical documentation, oncology coordination notes, and itemised invoicing in your insurer's preferred format." },
    { q: "Can I have reconstruction at the same time as mastectomy?", a: "Immediate reconstruction (at the time of mastectomy) is possible for some patients, but most international patients have delayed reconstruction performed after their oncology treatment is complete." },
    { q: "DIEP or implants — which lasts longer?", a: "DIEP uses your own tissue and lasts a lifetime; implant-based may need replacement at 15–20 years. DIEP is technically more demanding and has longer recovery; implants are simpler initially. We choose based on your anatomy, oncology context, and life goals." },
  ],
  leadSurgeon: "wara",
  treatments: [
    { name: "Implant-based reconstruction (one-stage)", short: "Direct-to-implant reconstruction for select patients with adequate skin and minimal radiation history.", priceFromAud: 14800,
      detail: { description: "Implant placed at the same operation as mastectomy or as a single-stage delayed reconstruction. Best for patients with adequate skin envelope and no significant radiation damage. Includes acellular dermal matrix where indicated.", duration: "2–3 hours · general anaesthetic", recovery: "10 nights on-island recovery",
        included: ["Pre-op imaging and oncology coordination", "Theatre, anaesthetic & overnight observation", "7 nights in private recovery villa", "Daily nursing visits", "Two surgeon reviews", "Insurance documentation pack", "12-month telehealth follow-up"] } },
    { name: "Implant-based reconstruction (two-stage)", short: "Expander placed first, exchanged for permanent implant in a second operation.", priceFromAud: 18400,
      detail: { description: "Tissue expander placed at first operation, gradually inflated over 8–12 weeks to stretch skin, then exchanged for the permanent implant. Standard pathway for patients with radiation history or limited skin envelope. Total programme spans 4–6 months across two visits.", duration: "Stage 1: 2 hours · Stage 2: 90 minutes", recovery: "10 + 7 nights on-island across two visits",
        included: ["Both surgical stages", "Theatre, anaesthetic & observation", "Recovery villa for both stages", "Daily nursing visits", "Expansion appointments", "Insurance documentation pack", "12-month telehealth follow-up"] } },
    { name: "DIEP flap reconstruction", short: "Reconstruction using your own abdominal tissue — most natural result, longest recovery.", priceFromAud: 28400,
      detail: { description: "Deep Inferior Epigastric Perforator flap — abdominal skin and fat (no muscle) transplanted to reconstruct the breast, with microsurgical reconnection of blood vessels. Most natural feel and appearance; lasts a lifetime. Technically demanding; requires microsurgical expertise.", duration: "6–8 hours · general anaesthetic", recovery: "21 nights on-island; 8 weeks to full activity",
        included: ["Microsurgical theatre time", "Theatre, anaesthetic & two-night observation", "14 nights in private recovery villa", "Daily nursing and physiotherapy", "Lymphatic drainage sessions", "Insurance documentation pack", "12-month telehealth follow-up"] } },
    { name: "TRAM flap reconstruction", short: "Alternative autologous reconstruction using abdominal tissue with muscle.", priceFromAud: 24400,
      detail: { description: "Transverse Rectus Abdominis Myocutaneous flap — uses abdominal tissue including rectus muscle for reconstruction. Used where DIEP is not technically feasible. Reliable result; longer abdominal recovery than DIEP due to muscle harvesting.", duration: "5–7 hours · general anaesthetic", recovery: "21 nights on-island; 10 weeks to full activity",
        included: ["Theatre, anaesthetic & two-night observation", "14 nights in private recovery villa", "Daily nursing and physiotherapy", "Lymphatic drainage sessions", "Insurance documentation pack", "12-month telehealth follow-up"] } },
    { name: "Nipple-areola reconstruction", short: "Final stage of breast reconstruction — local flap and tattooing for natural appearance.", priceFromAud: 4800,
      detail: { description: "Local skin flap to recreate nipple projection, with 3D medical tattooing for areolar pigmentation. Typically performed 3–6 months after main reconstruction. Local anaesthetic; same-day procedure.", duration: "60–90 minutes · local + sedation", recovery: "5 nights on-island",
        included: ["Surgical nipple reconstruction", "3D medical tattooing", "Two follow-up reviews", "Touch-up tattoo session (if needed)"] } },
    { name: "Symmetrising procedure (opposite breast)", short: "Lift, augmentation, or reduction of the opposite breast to match the reconstructed side.", priceFromAud: 9800,
      detail: { description: "Where reconstruction has produced asymmetry, we offer mastopexy, augmentation, or reduction of the contralateral breast to match. Often medically indicated and insurance-covered as part of the reconstruction journey.", duration: "2–3 hours · general anaesthetic", recovery: "10 nights on-island",
        included: ["Theatre, anaesthetic & overnight observation", "7 nights in private recovery villa", "Daily nursing visits", "Insurance documentation if applicable", "12-month telehealth follow-up"] } },
  ],
};

window.SUBCATEGORY_DATA["reconstructive-trauma"] = {
  parent: "reconstructive", slug: "reconstructive-trauma", title: "Trauma & Scar",
  chapterTitle: ["Trauma &", "scar repair."],
  tagline: "Reconstruction after injury, burn, or unsatisfactory prior surgery.",
  lede: "Scar revision, burn reconstruction, skin grafts, and complex flap repair — for patients seeking refinement after trauma, surgery, or burn injury.",
  intro: "Scars and post-traumatic deformity are among the most life-affecting conditions in plastic surgery — and among the most under-resourced. Many patients live with results from emergency surgery that prioritised wound closure over aesthetic outcome. We offer scar revision, flap reconstruction, and burn-care expertise to give those patients a second chance at a result they can live with.",
  overview: "Our reconstructive team includes a fellowship-trained burn and trauma reconstructive surgeon. We offer everything from minor scar revision under local anaesthetic to complex multi-stage flap reconstruction. We will not promise scar erasure — no surgeon honestly can — but we can almost always improve.",
  sections: [
    { id: "consultation", t: "The consultation", body: "Sixty-minute consultation with the reconstructive surgeon, with photography in standardised lighting and a frank discussion of what is and is not achievable. For burn or complex trauma cases, we review original surgical records before consultation." },
    { id: "approach", t: "Our approach", body: "We sequence reconstruction in stages where helpful — most scars improve more from two refined operations spaced six months apart than from one ambitious operation. Local flap, Z-plasty, dermal substitute, and fat grafting are all part of our toolbox; we choose based on what the tissue needs." },
    { id: "recovery", t: "Recovery", body: "Most scar revision is day-case with local anaesthetic; recovery is days. Burn reconstruction and major flap surgery require general anaesthetic and ten to twenty-one nights on-island with daily nursing." },
  ],
  faqs: [
    { q: "Can scars be completely removed?", a: "No. We can almost always improve a scar's appearance — colour, texture, direction, and prominence — but a scar is by definition permanent. Honest expectation-setting is part of our consultation." },
    { q: "How long after injury should I wait?", a: "Most scars are best revised after twelve months — by which point they have fully matured. Earlier revision is sometimes appropriate for functional issues (e.g. contracture) but rarely for purely aesthetic improvement." },
    { q: "Will insurance cover this?", a: "Sometimes — particularly for functional reconstruction after trauma or burn. Cosmetic scar revision is rarely covered. We provide documentation either way." },
  ],
  leadSurgeon: "indra",
  treatments: [
    { name: "Scar revision (minor)", short: "Excision and re-closure of small scars under local anaesthetic.", priceFromAud: 1800,
      detail: { description: "Excision of an unsightly scar and meticulous re-closure with fine sutures. Often combined with Z-plasty to change direction. Day-case under local anaesthetic.", duration: "60–90 minutes · local anaesthetic", recovery: "3 nights on-island; sutures at day 7",
        included: ["Theatre and local anaesthetic", "Suture removal at day 7", "Scar protocol kit", "Three-month review"] } },
    { name: "Scar revision (major)", short: "Larger scar reconstruction with local flap, Z-plasty, or staged repair.", priceFromAud: 4800,
      detail: { description: "Complex scar revision using local flaps, multiple Z-plasties, or staged repair. May be combined with fat grafting or dermal substitute to improve underlying tissue quality. General anaesthetic.", duration: "2–3 hours · general anaesthetic", recovery: "10 nights on-island",
        included: ["Theatre, anaesthetic & overnight observation", "7 nights in private recovery villa", "Daily nursing visits", "Scar protocol kit", "12-month follow-up"] } },
    { name: "Burn reconstruction", short: "Multi-stage reconstruction for burn deformity, contracture, or functional impairment.", priceFromAud: 14800,
      detail: { description: "Burn reconstruction is staged and patient-specific. May include skin grafting, dermal substitute, contracture release, tissue expansion, or flap reconstruction. We plan across two to four operations spaced 4–6 months apart.", duration: "Per stage: 3–5 hours", recovery: "Per stage: 14–21 nights on-island",
        included: ["Full pre-op review", "Staged surgical plan", "Theatre and anaesthetic per stage", "Recovery villa", "Daily nursing and physiotherapy", "Scar protocol throughout", "Insurance documentation where applicable"] } },
    { name: "Skin grafts & dermal substitute", short: "Coverage of skin defects using split-thickness graft or dermal substitute matrix.", priceFromAud: 8800,
      detail: { description: "Skin graft (taken from thigh) or Integra dermal substitute to cover defects from trauma, burn, or prior surgery. Donor-site management is part of the procedure. Two-stage if dermal substitute is used.", duration: "2–3 hours · general anaesthetic", recovery: "14 nights on-island",
        included: ["Theatre, anaesthetic & overnight observation", "10 nights in private recovery villa", "Daily nursing for donor and recipient sites", "Dressing changes and graft monitoring", "12-month follow-up"] } },
    { name: "Keloid scar management", short: "Surgical excision combined with intralesional steroid for keloid scars.", priceFromAud: 2400,
      detail: { description: "Keloid scars are notoriously difficult — we combine careful surgical excision with intralesional steroid injection, silicone protocol, and pressure therapy. Recurrence rate is reduced but not eliminated; we monitor closely for twelve months.", duration: "60 minutes · local anaesthetic", recovery: "5 nights on-island",
        included: ["Theatre and local anaesthetic", "Initial steroid injection", "Six-month injection schedule", "Silicone gel kit", "12-month follow-up"] } },
  ],
};

window.SUBCATEGORY_DATA["reconstructive-craniofacial"] = {
  parent: "reconstructive", slug: "reconstructive-craniofacial", title: "Craniofacial",
  chapterTitle: ["Craniofacial &", "reconstructive."],
  tagline: "Complex facial reconstruction by craniomaxillofacial subspecialists.",
  lede: "Cleft lip and palate, maxillofacial trauma, orbital reconstruction, and microtia ear reconstruction — performed by our craniomaxillofacial-credentialed surgeon with international fellowship training.",
  intro: "Craniofacial work is at the most technically demanding end of plastic surgery — anatomically complex, often staged over years, and dependent on a tightly coordinated multidisciplinary team. Our lead craniofacial surgeon is fellowship-trained in maxillofacial and craniomaxillofacial surgery, with international training experience in advanced aesthetic and reconstructive techniques.",
  overview: "We treat congenital craniofacial conditions, post-traumatic deformities, and complex acquired conditions of the face, skull, and jaw. Many of our craniofacial patients are referred through international charity and aid networks; we maintain a small pro-bono pathway alongside our private practice.",
  sections: [
    { id: "consultation", t: "The consultation", body: "Comprehensive consultation includes 3D imaging where appropriate, photographic documentation, and multidisciplinary review with orthodontics, speech therapy, and ENT depending on case. Treatment plans for congenital cases often span multiple operations across years of growth." },
    { id: "approach", t: "Our approach", body: "We follow international protocols for cleft repair (Millard or Mohler for lip; two-flap palatoplasty for palate). For trauma we restore anatomy first; refine aesthetics later. For microtia, we offer rib-graft and Medpor approaches depending on age and anatomy." },
    { id: "team", t: "The team", body: "Craniofacial work requires a multidisciplinary team. Our network includes orthodontists for cleft and orthognathic, speech therapists for cleft palate, paediatric anaesthetists for paediatric cases, and ENT for microtia. Travel patients are coordinated by a senior concierge with paediatric or complex-care background." },
  ],
  faqs: [
    { q: "Are children welcome?", a: "Yes — we have paediatric anaesthesia, paediatric nursing, and family-friendly recovery accommodation. Cleft repair is one of our most experienced pathways for paediatric patients." },
    { q: "How many operations will be needed?", a: "Cleft repair: typically 2–4 over the first decade, plus orthodontic and possible orthognathic work in adolescence. Trauma: highly variable. Microtia: typically 2–3 operations over 6–12 months." },
    { q: "Do you offer pro-bono care?", a: "Yes, in coordination with international aid organisations. We maintain a small pro-bono pathway for craniofacial congenital cases each year. Please write to the concierge for details." },
  ],
  leadSurgeon: "wara",
  treatments: [
    { name: "Cleft lip repair", short: "Primary repair of unilateral or bilateral cleft lip in infants.", priceFromAud: 6800,
      detail: { description: "Millard or Mohler rotation-advancement flap for unilateral cleft; modified Mulliken for bilateral. Performed in infancy (3–6 months for primary lip repair). Includes anaesthesia review and paediatric nursing.", duration: "2 hours · general anaesthetic", recovery: "5 nights on-island",
        included: ["Theatre, anaesthetic & overnight observation", "Paediatric nursing", "5 nights in family-friendly villa", "Suture removal at day 7", "Long-term follow-up coordination"] } },
    { name: "Cleft palate repair", short: "Primary palate repair, typically at 9–18 months of age.", priceFromAud: 8400,
      detail: { description: "Two-flap palatoplasty for primary palate repair. Coordinated with speech therapy assessment and follow-up. Critical for normal speech development; timing is important.", duration: "2.5 hours · general anaesthetic", recovery: "7 nights on-island",
        included: ["Theatre, anaesthetic & overnight observation", "Paediatric nursing", "Speech therapy assessment", "5 nights in family-friendly villa", "Follow-up coordination"] } },
    { name: "Cleft revision (older children)", short: "Secondary revision for adolescents and adults — lip, palate, or nasal asymmetry.", priceFromAud: 9800,
      detail: { description: "Revision of prior cleft repair for residual asymmetry, scar, lip notch, or nasal deformity. Often combined with rhinoplasty (cleft rhinoplasty) for older children and adults.", duration: "3 hours · general anaesthetic", recovery: "10 nights on-island",
        included: ["Theatre, anaesthetic & overnight observation", "7 nights in family-friendly villa", "Daily nursing", "Scar protocol", "12-month follow-up"] } },
    { name: "Maxillofacial trauma reconstruction", short: "Reconstruction after facial fractures, soft-tissue injury, or post-traumatic deformity.", priceFromAud: 12400,
      detail: { description: "Fracture reduction, plating, soft-tissue reconstruction, or scar revision after facial trauma. Often staged: acute repair in your home country, refinement and reconstruction with us. We review original surgical records before quoting.", duration: "3–5 hours · general anaesthetic", recovery: "14 nights on-island",
        included: ["Pre-op imaging and surgical review", "Theatre, anaesthetic & overnight observation", "10 nights in private recovery villa", "Daily nursing", "Insurance documentation where applicable"] } },
    { name: "Orbital reconstruction", short: "Floor or rim reconstruction after trauma or congenital deformity.", priceFromAud: 11400,
      detail: { description: "Orbital floor or rim reconstruction using patient-specific titanium mesh or autologous bone graft. For post-traumatic enophthalmos, hypoglobus, or congenital orbital deformity. Coordinated with ophthalmology where appropriate.", duration: "3–4 hours · general anaesthetic", recovery: "10 nights on-island",
        included: ["Theatre, anaesthetic & overnight observation", "7 nights in private recovery villa", "Daily nursing visits", "Ophthalmology coordination", "12-month follow-up"] } },
    { name: "Microtia ear reconstruction", short: "Reconstruction of underdeveloped or absent external ear using rib graft or Medpor.", priceFromAud: 18400,
      detail: { description: "Two- or three-stage reconstruction of the external ear using either rib cartilage graft (Brent or Nagata technique) or porous polyethylene framework. Suitable from age 8–10 for rib-graft technique. Two operations over 6–12 months.", duration: "5 hours per stage · general anaesthetic", recovery: "Per stage: 14 nights on-island",
        included: ["Theatre, anaesthetic & overnight observation per stage", "10 nights in family-friendly villa per stage", "Daily nursing", "12-month follow-up across both stages"] } },
  ],
};
