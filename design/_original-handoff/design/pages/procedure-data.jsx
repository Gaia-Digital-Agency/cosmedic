/* global window */
// Per-procedure editorial data. Each entry has the same 7-block shape:
//   parent       — slug of parent discipline (surgical, non-surgical, hair, dental, recovery, concierge)
//   title        — display name (also used in [...].title)
//   slug         — used as URL: procedure-<slug>.html
//   tagline      — italic subtitle
//   short        — one-line summary used on cards / index rows
//   priceFrom    — "AUD X,XXX" string; primary number for IDR conversion
//   procedureCategory — UPPERCASE chapter label
//   chapterTitle — array of 2 strings used as the editorial hero h1
//   sections     — { id, t, body }[] — Overview / Consultation / Approach / Theatre / Recovery
//   pricing      — three-tier card data
//   faqs         — { q, a }[]

window.PROCEDURE_DATA = {
  // ============================================================
  // SURGICAL (parent: surgical)
  // ============================================================
  rhinoplasty: {
    parent: "surgical", slug: "rhinoplasty", title: "Rhinoplasty",
    tagline: "The face's quiet centre.",
    short: "Open or closed approach to refine the nasal profile, balance, and breathing — performed under general anaesthetic.",
    priceFrom: "AUD 8,500",
    chapterTitle: ["The face's", "quiet centre."],
    sections: [
      { id: "overview", t: "Overview", body: "Rhinoplasty reshapes the nose for either aesthetic balance or improved breathing — often both. Our surgeons favour a conservative, structure-preserving approach: the goal is a nose that looks like yours, refined, rather than a nose that announces it has been operated on. Most patients are between three and six months from surgery before the result fully settles." },
      { id: "consultation", t: "The consultation", body: "Every rhinoplasty journey begins with a private video consultation. We will review your concerns from three angles, take a careful airway history, and discuss whether your breathing — septal deviation, valve collapse, turbinate hypertrophy — should be addressed at the same time. Most consultations take forty-five minutes; many do not lead to surgery, and we are at peace with that." },
      { id: "approach", t: "Our approach", body: "We perform both open (with a small columellar incision) and closed (entirely intra-nasal) rhinoplasty. The choice depends on what your nose needs — not on a surgeon's preference. We use cartilage-preserving techniques, and we shape rather than reduce wherever possible. Tissue once removed cannot be returned." },
      { id: "theatre", t: "The procedure", body: "A primary rhinoplasty takes between three and four hours, performed under general anaesthetic in our ACHSI-accredited theatres. You will spend a single night in the hospital under nursing observation, then move to your private recovery villa the following morning." },
      { id: "recovery", t: "Recovery", body: "An external splint stays for seven days; mild bruising under the eyes resolves within ten to fourteen. We ask you to remain on the island for fourteen days post-procedure, with daily nursing visits in the first week. Final shape settles between six and twelve months." },
    ],
    pricing: [
      { tier: "Targeted", italic: "Tip refinement only", amount: "6,800", from: "AUD · from", small: "Hour-long, single-area", items: ["Tip-only refinement", "Local with sedation", "7 days on island", "Daily dressings", "12-month follow-up"], cta: "Plan a consult" },
      { tier: "Primary", italic: "Most patients begin here", amount: "8,500", from: "AUD · from", small: "Full primary rhinoplasty", items: ["Open or closed approach", "Theatre, anaesthetic & overnight obs", "5 nights in private villa", "Daily nursing visits", "Splint removal at day 7", "12-month follow-up"], cta: "Plan your journey", featured: true },
      { tier: "Functional", italic: "With septal & airway work", amount: "11,200", from: "AUD · from", small: "Aesthetic + breathing", items: ["Rhinoplasty + septoplasty", "Turbinate reduction if needed", "Theatre & anaesthetic", "7 nights in private villa", "Two surgeon reviews", "12-month follow-up"], cta: "Plan your journey" },
    ],
    faqs: [
      { q: "How long until I look 'normal'?", a: "Most patients are happy to be seen in public after seven to ten days, once the splint is off and major bruising has resolved. The final result — particularly tip definition — continues refining for six to twelve months." },
      { q: "Open or closed — which is better?", a: "Neither, in isolation. Closed leaves no external scar but limits visibility; open allows greater precision for complex tip work. Your surgeon will recommend based on what your nose needs, not their preference." },
      { q: "Will my breathing improve or get worse?", a: "If the airway is addressed alongside aesthetic work — septoplasty, valve reconstruction — most patients breathe noticeably better. Cosmetic-only work that ignores existing airway problems can sometimes worsen breathing, which is why we ask carefully about it." },
      { q: "Can I have a revision if I don't like it?", a: "Yes, but not for at least twelve months — the nose continues to change for almost a year. Revision rhinoplasty is technically more demanding; our quote includes a complimentary revision review at twelve months." },
      { q: "What about ethnic preservation?", a: "We work with all ethnic anatomies and prioritise preserving the character of your face. We are uncomfortable with the homogenised result, and we will tell you if a request would erase rather than refine your features." },
    ],
  },

  "breast-augmentation": {
    parent: "surgical", slug: "breast-augmentation", title: "Breast Augmentation",
    tagline: "Considered, conservative, your own.",
    short: "Sub-muscular or sub-glandular implant placement using FDA-approved devices, sized in consultation with the result in mind.",
    priceFrom: "AUD 9,800",
    chapterTitle: ["Considered,", "your own."],
    sections: [
      { id: "overview", t: "Overview", body: "Breast augmentation increases breast size and refines shape using FDA-approved silicone or saline implants. Our surgeons emphasise proportion above volume — the most natural, longest-lasting result almost always comes from a smaller implant well-placed, rather than a larger one fighting your anatomy." },
      { id: "consultation", t: "The consultation", body: "We take careful measurements of breast width, projection, and skin envelope, then size implants to match — not a number you've seen elsewhere. We use 3D simulation where helpful and rice-bag try-ins so you can see and feel the proposed result. Many patients leave their consultation choosing a smaller implant than they arrived expecting." },
      { id: "approach", t: "Our approach", body: "We place implants either sub-muscular (under the pectoralis major) or sub-glandular (under the breast tissue). Sub-muscular generally gives a more natural upper-pole slope and reduces visible rippling; sub-glandular is sometimes appropriate for athletic patients with adequate soft-tissue cover. We use round, smooth, silicone implants for nearly all patients." },
      { id: "theatre", t: "The procedure", body: "Performed under general anaesthetic, the procedure takes between ninety minutes and two hours. You will spend a single night in the hospital under nursing observation, then move to your private recovery villa the following morning." },
      { id: "recovery", t: "Recovery", body: "Soreness and chest tightness for the first three to five days, easing significantly by day seven. We ask you to remain on the island for ten to fourteen days. No upper-body exercise for six weeks. Implants settle into final position over six months." },
    ],
    pricing: [
      { tier: "Saline", italic: "Functional, conservative", amount: "9,200", from: "AUD · from", small: "FDA-approved saline", items: ["Saline implants (FDA)", "Theatre, anaesthetic & overnight obs", "5 nights in private villa", "Daily nursing visits", "Sports bra & garment", "12-month follow-up"], cta: "Plan a consult" },
      { tier: "Silicone", italic: "Most patients choose this", amount: "9,800", from: "AUD · from", small: "Cohesive silicone gel", items: ["Cohesive silicone implants (FDA)", "Theatre, anaesthetic & overnight obs", "7 nights in private villa", "Daily nursing visits", "Compression garment & support bra", "12-month follow-up"], cta: "Plan your journey", featured: true },
      { tier: "With Mastopexy", italic: "Augmentation with a lift", amount: "13,400", from: "AUD · from", small: "When skin envelope needs addressing", items: ["Augmentation + breast lift", "Theatre & anaesthetic", "10 nights in private villa", "Daily nursing & physiotherapy", "Lymphatic drainage sessions", "12-month follow-up"], cta: "Plan your journey" },
    ],
    faqs: [
      { q: "What size implant should I choose?", a: "The right size is the one your anatomy can comfortably support. We size in millilitres rather than cup sizes, and almost always recommend conservative — patients who size up later have many fewer regrets than patients who size up first." },
      { q: "Silicone or saline?", a: "Silicone (cohesive gel) feels more natural and shows fewer ripples. Saline is slightly cheaper and any rupture is immediately obvious. We recommend silicone for most patients." },
      { q: "Will I be able to breastfeed?", a: "Most augmented patients breastfeed without difficulty. Inframammary (under-breast) and trans-axillary (underarm) approaches preserve glandular function better than peri-areolar incisions, which we generally avoid." },
      { q: "How long do implants last?", a: "Modern implants are warranted indefinitely against rupture but realistically may need replacement at fifteen to twenty years. They are not lifetime devices." },
      { q: "What about capsular contracture?", a: "Our rates are below 5% at two years — we use textured pockets, antibiotic irrigation, and Keller funnel insertion. We monitor every patient at the one-year mark and beyond." },
      { q: "Can I combine with abdominoplasty?", a: "Yes — 'mommy makeover' combined cases are common, but we are conservative about combining long procedures. We will discuss whether one or two visits is safer in your case." },
    ],
  },

  "breast-reduction": {
    parent: "surgical", slug: "breast-reduction", title: "Breast Reduction",
    tagline: "Lighter, in proportion.",
    short: "Reduction mammaplasty for breast size that causes back, neck, or shoulder discomfort — restoring proportion and comfort.",
    priceFrom: "AUD 10,400",
    chapterTitle: ["Lighter,", "in proportion."],
    sections: [
      { id: "overview", t: "Overview", body: "Breast reduction (reduction mammaplasty) removes excess glandular tissue, fat, and skin to bring the breast into comfortable proportion with the rest of your body. Most patients describe the result less as cosmetic and more as restoration — pain that has been there for years, gone." },
      { id: "consultation", t: "The consultation", body: "We assess breast size relative to torso, shoulder strain, and skin quality. We will discuss the trade-offs honestly: the surgery leaves visible scars, which fade significantly over twelve months but never entirely disappear. For most patients, that trade is well worth it." },
      { id: "approach", t: "Our approach", body: "We use either a vertical (lollipop) or anchor (Wise pattern) incision depending on the volume to be removed. Both preserve nipple sensation and (in most cases) breastfeeding capability. We are conservative about how much we remove — significant reduction can be done in two stages if anatomy demands it." },
      { id: "theatre", t: "The procedure", body: "Performed under general anaesthetic, a typical reduction takes three to four hours. You will spend one or two nights in hospital depending on volume removed, then transfer to your private recovery villa." },
      { id: "recovery", t: "Recovery", body: "Drains for two to four days, garment for six weeks. We ask you to remain on the island for fourteen days. Most patients describe the relief from the chronic pain as immediate; the cosmetic result settles over six months." },
    ],
    pricing: [
      { tier: "Moderate reduction", italic: "Up to 500g per side", amount: "10,400", from: "AUD · from", small: "Vertical pattern", items: ["Vertical scar reduction", "Theatre, anaesthetic & overnight obs", "7 nights in private villa", "Daily nursing visits", "Compression garment", "12-month follow-up"], cta: "Plan a consult" },
      { tier: "Standard reduction", italic: "Most patients begin here", amount: "11,200", from: "AUD · from", small: "Anchor pattern, with lift", items: ["Wise-pattern reduction", "Theatre, anaesthetic & overnight obs", "10 nights in private villa", "Daily nursing & physiotherapy", "Lymphatic drainage sessions", "12-month follow-up"], cta: "Plan your journey", featured: true },
      { tier: "Major reduction", italic: ">800g per side", amount: "13,800", from: "AUD · from", small: "Two-stage where required", items: ["Major-volume reduction", "Theatre, anaesthetic & 2 nights obs", "14 nights in private villa", "Daily nursing & physiotherapy", "Six lymphatic drainage sessions", "12-month follow-up"], cta: "Plan your journey" },
    ],
    faqs: [
      { q: "Will my insurance cover this?", a: "Where reduction is medically necessary — documented back, neck, or shoulder pain — some private insurers cover part of the cost. We provide all documentation needed for claims." },
      { q: "Will I be able to breastfeed afterwards?", a: "Most patients retain breastfeeding capability with our techniques. We will discuss this carefully if it matters to your future plans — rare cases require a different approach to preserve function." },
      { q: "How visible are the scars?", a: "Anchor scars are extensive but extremely well-placed — under the breast and around the areola. Most fade significantly over twelve months. We provide our six-month scar therapy programme as part of every reduction." },
      { q: "Will my breasts droop again over time?", a: "Some settling is normal. Significant re-drooping is uncommon if the result is proportional and skin quality is good. Maintaining a stable weight helps." },
      { q: "How much can be removed?", a: "There's no hard upper limit, but very large reductions (>1kg per side) often work better in two stages, six months apart, for safer healing and a more reliable result." },
    ],
  },

  mastopexy: {
    parent: "surgical", slug: "mastopexy", title: "Mastopexy (Breast Lift)",
    tagline: "Restored, not enlarged.",
    short: "Breast lift to reposition the nipple-areola complex and tighten the skin envelope — with or without an implant.",
    priceFrom: "AUD 11,200",
    chapterTitle: ["Restored,", "not enlarged."],
    sections: [
      { id: "overview", t: "Overview", body: "Mastopexy lifts and reshapes breasts that have descended due to age, weight change, or pregnancy. The volume isn't usually the problem — the position and skin envelope are. Lift can be done alone or paired with augmentation when both volume and position need addressing." },
      { id: "consultation", t: "The consultation", body: "We assess ptosis (the degree of droop) using the standard Regnault grading. We will tell you honestly whether a lift alone is enough, or whether an implant alongside the lift is needed to restore upper-pole fullness." },
      { id: "approach", t: "Our approach", body: "Vertical (lollipop) for moderate ptosis; anchor (Wise pattern) for greater descent. We avoid peri-areolar-only lifts in most patients — they tend to produce wide, flat areolae that age poorly. Our incisions follow natural shadow lines and fade well over twelve months." },
      { id: "theatre", t: "The procedure", body: "Two to three hours under general anaesthetic. You will spend one night in hospital under nursing observation, then move to your recovery villa." },
      { id: "recovery", t: "Recovery", body: "Soreness for five to seven days; surgical bra for six weeks. We ask you to remain on the island for ten to fourteen days. Final shape settles over six months as the tissues redistribute." },
    ],
    pricing: [
      { tier: "Lift only", italic: "Vertical pattern", amount: "11,200", from: "AUD · from", small: "Without augmentation", items: ["Vertical-pattern mastopexy", "Theatre, anaesthetic & overnight obs", "7 nights in private villa", "Daily nursing visits", "Compression garment", "12-month follow-up"], cta: "Plan a consult" },
      { tier: "Lift + augmentation", italic: "Most patients choose this", amount: "13,400", from: "AUD · from", small: "Combined procedure", items: ["Mastopexy + augmentation", "FDA-approved cohesive silicone", "Theatre, anaesthetic & overnight obs", "10 nights in private villa", "Daily nursing & physiotherapy", "12-month follow-up"], cta: "Plan your journey", featured: true },
      { tier: "Anchor pattern", italic: "For significant ptosis", amount: "12,800", from: "AUD · from", small: "Wise pattern, no implant", items: ["Wise-pattern mastopexy", "Theatre, anaesthetic & overnight obs", "10 nights in private villa", "Daily nursing & physiotherapy", "Lymphatic drainage sessions", "12-month follow-up"], cta: "Plan your journey" },
    ],
    faqs: [
      { q: "Do I need an implant alongside the lift?", a: "Many patients don't — if you have adequate volume, a lift alone restores shape. Add an implant only if upper-pole fullness needs restoring, not because more volume is being suggested." },
      { q: "How long do results last?", a: "A well-executed lift typically holds for ten to fifteen years before any meaningful re-drooping. Stable weight and a properly fitted bra extend this significantly." },
      { q: "What about scars?", a: "Vertical mastopexy leaves a circular scar around the areola and a vertical line below; anchor adds a horizontal line in the inframammary fold. All fade well by twelve months and are entirely concealed by clothing and most swimwear." },
      { q: "Can I breastfeed afterwards?", a: "Most patients retain function. We preserve the central pedicle (which carries blood supply, nerves, and ducts to the nipple) in nearly all cases." },
      { q: "Will my nipples have feeling?", a: "Most patients retain normal sensation; some experience temporary numbness that resolves over six to twelve months. Permanent loss is uncommon (under 5%) but possible." },
    ],
  },

  liposculpture: {
    parent: "surgical", slug: "liposculpture", title: "Liposculpture",
    tagline: "Refined, not removed.",
    short: "Tumescent or VASER liposculpture for body contouring — single or multiple areas, performed under local or general anaesthetic.",
    priceFrom: "AUD 6,800",
    chapterTitle: ["Refined,", "not removed."],
    sections: [
      { id: "overview", t: "Overview", body: "Liposculpture is precise body contouring — not weight loss. We work to refine areas that resist diet and exercise: flanks, abdomen, inner thighs, upper arms, neck. The goal is improved proportion in a stable-weight body, not transformation." },
      { id: "consultation", t: "The consultation", body: "We assess skin quality, fat distribution, and the underlying muscle. Liposuction without good skin retraction can leave looseness; we will tell you if your skin needs supportive treatment (RF tightening, or in some cases an excisional procedure)." },
      { id: "approach", t: "Our approach", body: "We use tumescent technique (local anaesthetic infiltration) for most cases, sometimes with VASER (ultrasound-assisted) for fibrous areas. Both produce precise, even results with minimal trauma. We are conservative about volumes — over-aggressive removal can leave permanent contour irregularities." },
      { id: "theatre", t: "The procedure", body: "One to three hours depending on areas treated. Local sedation for single areas, general anaesthetic for multiple or large-volume cases. Most patients are day-stay; high-volume cases require overnight observation." },
      { id: "recovery", t: "Recovery", body: "Compression garment for six weeks, soreness for ten to fourteen days. We ask you to remain on the island for seven days. Lymphatic drainage starts day five. Final result settles at three to four months as swelling fully resolves." },
    ],
    pricing: [
      { tier: "Single area", italic: "Targeted contouring", amount: "6,800", from: "AUD · from", small: "Local anaesthetic", items: ["Single area (e.g. submentum, flanks)", "Local with sedation", "Day-stay procedure", "5 nights in private villa", "Compression garment", "12-month follow-up"], cta: "Plan a consult" },
      { tier: "Two to three areas", italic: "Most patients begin here", amount: "9,400", from: "AUD · from", small: "Multi-area sculpting", items: ["Two to three areas", "Tumescent or VASER technique", "Theatre & anaesthetic", "7 nights in private villa", "Three lymphatic drainage sessions", "12-month follow-up"], cta: "Plan your journey", featured: true },
      { tier: "Full body", italic: "Comprehensive contouring", amount: "13,800", from: "AUD · from", small: "High-definition liposculpture", items: ["Four+ areas in single visit", "VASER-assisted", "Theatre, anaesthetic & overnight obs", "10 nights in private villa", "Six lymphatic drainage sessions", "12-month follow-up"], cta: "Plan your journey" },
    ],
    faqs: [
      { q: "Will the fat come back?", a: "Treated fat cells are permanently removed. New weight gain redistributes to untreated areas — the contour you've created largely stays, but the body's overall fat percentage will shift if you gain weight." },
      { q: "Will my skin retract?", a: "Skin quality at the time of surgery matters enormously. Younger skin retracts well; mature or stretch-marked skin retracts incompletely. We will tell you honestly what to expect, and may recommend RF tightening alongside if appropriate." },
      { q: "Is it painful?", a: "Soreness, like a heavy gym workout, for ten to fourteen days. The first three days are the worst. Pain medication is provided; most patients are off it by day five." },
      { q: "When can I exercise?", a: "Walking from day one. Light cardio at three weeks. Weight training and high-intensity at six weeks." },
      { q: "What's the difference between liposuction and liposculpture?", a: "Liposuction removes; liposculpture shapes. We use the term liposculpture because we're working to a contour, not a volume target. The technique is essentially the same — the philosophy differs." },
      { q: "Can it treat cellulite?", a: "Liposculpture doesn't directly treat cellulite. Cellulite responds better to dedicated cellulite treatments — collagen induction, RF, or specialised release procedures. We can combine these if relevant." },
    ],
  },

  abdominoplasty: {
    parent: "surgical", slug: "abdominoplasty", title: "Abdominoplasty (Tummy Tuck)",
    tagline: "Quietly returned.",
    short: "Mini, full, or extended abdominoplasty — restoring the abdomen after pregnancy or significant weight loss.",
    priceFrom: "AUD 12,400",
    chapterTitle: ["Quietly", "returned."],
    sections: [
      { id: "overview", t: "Overview", body: "Abdominoplasty restores the abdominal wall after the stretch of pregnancy or weight loss. Skin is removed; the rectus muscles are tightened (when separated by diastasis); the navel is repositioned. Most patients describe the result as getting their pre-pregnancy body back, with a single low scar." },
      { id: "consultation", t: "The consultation", body: "We assess skin laxity, muscle separation (diastasis recti), and the position of your existing scars (caesarean, appendix). The plan is tailored: a mini for laxity below the navel only; a full for laxity throughout the abdomen; an extended (fleur-de-lis) for very loose skin after major weight loss." },
      { id: "approach", t: "Our approach", body: "We place the incision low — concealed by underwear and most swimwear — and close in multiple layers with absorbable sutures. We routinely include muscle plication where there is diastasis. Drains are used in most cases for two to four days." },
      { id: "theatre", t: "The procedure", body: "Three to five hours under general anaesthetic. One to two nights in hospital under nursing observation, then transfer to your private recovery villa with drains in place." },
      { id: "recovery", t: "Recovery", body: "Walking bent forward for the first week. Drains out at days two to four. Compression garment for eight weeks. We ask you to remain on the island for fourteen days. No abdominal exercise for eight weeks; final result settles at six months." },
    ],
    pricing: [
      { tier: "Mini", italic: "Below-navel only", amount: "9,800", from: "AUD · from", small: "Limited dissection", items: ["Mini abdominoplasty", "Theatre, anaesthetic & overnight obs", "7 nights in private villa", "Daily nursing visits", "Compression garment", "12-month follow-up"], cta: "Plan a consult" },
      { tier: "Full", italic: "Most patients begin here", amount: "12,400", from: "AUD · from", small: "Standard procedure", items: ["Full abdominoplasty", "Muscle plication included", "Theatre, anaesthetic & overnight obs", "10 nights in private villa", "Daily nursing & physiotherapy", "Six lymphatic drainage sessions", "12-month follow-up"], cta: "Plan your journey", featured: true },
      { tier: "Extended", italic: "Post weight loss", amount: "16,400", from: "AUD · from", small: "Fleur-de-lis pattern", items: ["Extended abdominoplasty", "Vertical incision included", "Theatre, anaesthetic & 2 nights obs", "14 nights in private villa", "Daily nursing & physiotherapy", "Comprehensive drainage programme", "12-month follow-up"], cta: "Plan your journey" },
    ],
    faqs: [
      { q: "Mini, full, or extended — which do I need?", a: "We assess this in consultation. Generally: mini if you have a tiny amount of below-navel laxity; full if there is laxity throughout the abdomen and/or muscle separation; extended (fleur-de-lis) only after significant weight loss with vertical excess." },
      { q: "How visible is the scar?", a: "Low and concealed by underwear and most swimwear. It fades from red to pale over twelve months. Our six-month scar therapy programme is included." },
      { q: "Can I have more children afterwards?", a: "Yes — but the muscle plication and skin tightening will be undone by another pregnancy. Most surgeons recommend completing your family before abdominoplasty." },
      { q: "Will I be flat afterwards?", a: "You will be much flatter, but flatness depends on what's underneath the abdominal wall. Visceral fat (deep belly fat) is unaffected by abdominoplasty — diet and exercise affect that." },
      { q: "Can I combine with breast surgery?", a: "Yes, but cautiously. Combined 'mommy makeover' procedures lasting more than five hours have higher risks. We may recommend two visits, six months apart, for very long combined cases." },
      { q: "What about the belly button?", a: "We reposition (rather than remove) the navel to a natural location. The technique we use creates a vertical, slightly recessed shape rather than a flat circle — much more natural." },
    ],
  },

  facelift: {
    parent: "surgical", slug: "facelift", title: "Facelift",
    tagline: "Quieter, never tighter.",
    short: "Deep-plane or SMAS facelift to reposition the structures of the lower face and neck — often paired with eyelid work.",
    priceFrom: "AUD 14,800",
    chapterTitle: ["Quieter,", "never tighter."],
    sections: [
      { id: "overview", t: "Overview", body: "A facelift addresses the lower face and neck — jowls, the jawline, the platysmal bands of the neck — by repositioning, not just tightening, the deeper structures. Done well, it should look like rest, not surgery: a quieter, more rested version of your face, never the windswept look." },
      { id: "consultation", t: "The consultation", body: "We assess the layers of your face individually: skin quality, deeper fat compartments, ligamentous attachments, and platysma. We will discuss whether a facelift alone is the right tool, or whether eyelid surgery, brow positioning, or facial fat grafting should be considered alongside." },
      { id: "approach", t: "Our approach", body: "We work with both deep-plane and SMAS techniques. Deep-plane releases the SMAS-platysma layer for a more durable lift; SMAS plication is appropriate for less advanced ageing. We are conservative about pull direction — vertical lift looks natural; lateral pull does not." },
      { id: "theatre", t: "The procedure", body: "Four to six hours under general anaesthetic. One to two nights in hospital under nursing observation; transfer to your recovery villa once swelling and any drains are managed." },
      { id: "recovery", t: "Recovery", body: "Bandages for forty-eight hours, sutures out at days seven to ten. Significant bruising for two weeks, complete resolution at four to six weeks. We ask you to remain on the island for fourteen to twenty-one days. Final shape settles over six months." },
    ],
    pricing: [
      { tier: "SMAS lift", italic: "Mid-stage ageing", amount: "12,400", from: "AUD · from", small: "Lower face + neck", items: ["SMAS plication", "Theatre, anaesthetic & overnight obs", "10 nights in private villa", "Daily nursing visits", "Suture removal at day 7", "12-month follow-up"], cta: "Plan a consult" },
      { tier: "Deep-plane", italic: "Most patients choose this", amount: "14,800", from: "AUD · from", small: "Most durable lift", items: ["Deep-plane facelift", "Platysmaplasty included", "Theatre, anaesthetic & overnight obs", "14 nights in private villa", "Daily nursing & lymphatic drainage", "12-month follow-up"], cta: "Plan your journey", featured: true },
      { tier: "Facelift + eyelids", italic: "Comprehensive rejuvenation", amount: "18,400", from: "AUD · from", small: "Often the best plan", items: ["Deep-plane facelift", "Upper & lower blepharoplasty", "Theatre, anaesthetic & 2 nights obs", "18 nights in private villa", "Daily nursing & comprehensive drainage", "12-month follow-up"], cta: "Plan your journey" },
    ],
    faqs: [
      { q: "How long do results last?", a: "A well-executed deep-plane lift typically gives ten to fifteen years before another formal procedure is considered. The face continues to age; the lift sets the clock back rather than stopping it." },
      { q: "Will it look pulled or windswept?", a: "Not when done well. Pull direction matters — vertical and posterior lift, never lateral. We tighten the deep structures and redrape the skin without tension. The skin should never look stretched." },
      { q: "What about scars?", a: "Concealed in front of and behind the ear, and in the hairline. Visible to a hairdresser; invisible to anyone else within three months." },
      { q: "When can I be seen in public?", a: "Most patients go out comfortably at three weeks; subtle bruising can be covered with makeup at two. Significant social events are best planned at six weeks or later." },
      { q: "Should I have my eyelids done at the same time?", a: "Often yes — the eyelids age earlier than the lower face, and adding blepharoplasty to a facelift is the single most effective way to refresh the upper face. We will assess this in consultation." },
      { q: "Will I lose hair?", a: "Temporary thinning at the incision sites is normal and recovers over six months. Permanent hair loss is rare (<2%) with careful incision placement." },
    ],
  },

  "eyelid-surgery": {
    parent: "surgical", slug: "eyelid-surgery", title: "Eyelid Surgery (Blepharoplasty)",
    tagline: "Awake, not different.",
    short: "Upper, lower, or both — to refresh the eye area without changing the eye's character.",
    priceFrom: "AUD 5,400",
    chapterTitle: ["Awake,", "not different."],
    sections: [
      { id: "overview", t: "Overview", body: "Blepharoplasty addresses excess skin and herniated fat around the eyes — the things that make a rested face look tired. The most common feedback we hear is 'people keep asking if I've been on holiday.' That's exactly the result we aim for." },
      { id: "consultation", t: "The consultation", body: "We assess upper-lid skin redundancy, brow position, lower-lid laxity, fat compartments, and any underlying eye-shape concerns. We are very careful with patients who have prominent eyes (proptosis) or lower-lid laxity — over-aggressive lower-lid surgery can permanently change the eye's shape, which we never want." },
      { id: "approach", t: "Our approach", body: "Upper blepharoplasty: skin and a small strip of muscle removed via a hidden lid-crease incision. Lower blepharoplasty: trans-conjunctival approach (no external scar) for fat repositioning, with skin pinch only when truly needed. We almost never use the older external approach for lower lids — recovery is longer and the risk of lower-lid retraction is real." },
      { id: "theatre", t: "The procedure", body: "Forty-five minutes to ninety minutes under local with sedation, or general anaesthetic if combined with other work. Day-stay procedure for most patients." },
      { id: "recovery", t: "Recovery", body: "Bruising for seven to ten days; significant swelling for the first three. Sutures out at days five to seven. We ask you to remain on the island for ten days. Final result at three months as scars fade." },
    ],
    pricing: [
      { tier: "Upper lids only", italic: "Most common request", amount: "5,400", from: "AUD · from", small: "Hour-long procedure", items: ["Upper blepharoplasty", "Local with sedation", "Day-stay procedure", "5 nights in private villa", "Suture removal at day 7", "12-month follow-up"], cta: "Plan a consult" },
      { tier: "Upper + Lower", italic: "Most patients choose this", amount: "8,800", from: "AUD · from", small: "Comprehensive eye rejuvenation", items: ["Upper & lower blepharoplasty", "Trans-conjunctival lower approach", "Local with sedation or general", "7 nights in private villa", "Daily nursing visits", "12-month follow-up"], cta: "Plan your journey", featured: true },
      { tier: "With brow lift", italic: "When brow position contributes", amount: "11,800", from: "AUD · from", small: "Eyelids + endoscopic brow", items: ["Upper & lower blepharoplasty", "Endoscopic brow lift", "Theatre & anaesthetic", "10 nights in private villa", "Daily nursing visits", "12-month follow-up"], cta: "Plan your journey" },
    ],
    faqs: [
      { q: "Will I look different — like a different person?", a: "No. Done well, blepharoplasty refreshes without changing the character of your eyes. People say you look rested, never that you look different." },
      { q: "What about Asian double-eyelid surgery?", a: "We perform double-eyelid (Asian blepharoplasty) using techniques that respect the natural lid anatomy. We are conservative about crease height — too high creates an unnatural Western look that our patients rarely want." },
      { q: "Will my vision be affected?", a: "Temporary blurring for a few days from swelling and ointment. Permanent vision change is extraordinarily rare. If anything, upper blepharoplasty often improves peripheral vision in patients whose lids had become heavy." },
      { q: "How visible are the scars?", a: "Upper-lid scars sit in the natural crease and are essentially invisible by three months. Lower-lid trans-conjunctival approach leaves no external scar at all." },
      { q: "When can I wear makeup again?", a: "Eye makeup at two weeks. Contact lenses at three weeks. Most patients are comfortable in public at ten days." },
      { q: "Can it be combined with a facelift?", a: "Yes — and often it should be. The eyelids age earlier than the lower face; combining the two gives a much more harmonious result than either alone." },
    ],
  },

  brachioplasty: {
    parent: "surgical", slug: "brachioplasty", title: "Brachioplasty (Arm Lift)",
    tagline: "Restored, after the work.",
    short: "Upper-arm contouring, most often after significant weight loss — to address skin that liposuction cannot.",
    priceFrom: "AUD 8,200",
    chapterTitle: ["Restored,", "after the work."],
    sections: [
      { id: "overview", t: "Overview", body: "Brachioplasty removes excess upper-arm skin and fat, most commonly after significant weight loss has left the skin envelope larger than the underlying tissue. It leaves a scar — a real trade — but for the right patient it restores function and proportion that nothing else can." },
      { id: "consultation", t: "The consultation", body: "We assess skin laxity from elbow to axilla, fat distribution, and your weight stability. We will be honest about the scar: brachioplasty leaves a long inner-arm line, which fades meaningfully over twelve months but never disappears. For patients with mild laxity, we may recommend liposuction with RF tightening instead." },
      { id: "approach", t: "Our approach", body: "Standard brachioplasty places the scar along the inner upper arm; mini-brachioplasty is limited to the axilla for milder cases. We routinely combine with light liposuction in the same session for the most refined contour." },
      { id: "theatre", t: "The procedure", body: "Two to three hours under general anaesthetic. Day-stay procedure for most patients; overnight observation if combined with other work." },
      { id: "recovery", t: "Recovery", body: "Compression sleeves for six weeks. Sutures out at days seven to fourteen. We ask you to remain on the island for ten days. Final result at six months as scars fade." },
    ],
    pricing: [
      { tier: "Mini brachioplasty", italic: "Axillary only", amount: "6,400", from: "AUD · from", small: "Limited dissection", items: ["Mini brachioplasty", "Theatre, anaesthetic & day-stay", "5 nights in private villa", "Daily nursing visits", "Compression sleeves", "12-month follow-up"], cta: "Plan a consult" },
      { tier: "Standard", italic: "Most common", amount: "8,200", from: "AUD · from", small: "Full inner-arm", items: ["Standard brachioplasty", "Light liposculpture included", "Theatre & anaesthetic", "7 nights in private villa", "Daily nursing visits", "12-month follow-up"], cta: "Plan your journey", featured: true },
      { tier: "Extended", italic: "Major weight-loss patients", amount: "9,800", from: "AUD · from", small: "Includes lateral chest", items: ["Extended brachioplasty", "Lateral chest extension", "Theatre, anaesthetic & overnight obs", "10 nights in private villa", "Daily nursing & lymphatic drainage", "12-month follow-up"], cta: "Plan your journey" },
    ],
    faqs: [
      { q: "How visible are the scars?", a: "The standard brachioplasty scar runs along the inner upper arm — concealed when arms are at your sides, visible when raised. It fades from red to pale over twelve months, with our six-month scar therapy programme included." },
      { q: "Liposuction or brachioplasty — which do I need?", a: "Liposuction alone if you have good skin quality. Brachioplasty if you have significant skin excess. We will recommend honestly — and frequently the answer for milder cases is liposuction with RF tightening, not brachioplasty." },
      { q: "Will I be able to wear sleeveless tops?", a: "Yes. The scar is concealed when arms are down. Most patients find the trade — visible scar for restored proportion — eminently worthwhile, and the scar fades remarkably over twelve months." },
      { q: "How long is recovery?", a: "Light activity at one week, normal arm use at three weeks, full strength training at six weeks. Sleeves stay on for six weeks." },
      { q: "Can I combine with body contouring?", a: "Yes — brachioplasty pairs well with abdominoplasty or thigh lift in major weight-loss patients. We may recommend staging if total surgical time becomes long." },
    ],
  },

  "thigh-lift": {
    parent: "surgical", slug: "thigh-lift", title: "Thigh Lift",
    tagline: "Smooth, after the work.",
    short: "Inner thigh contouring after weight loss — restoring the upper-leg silhouette that liposuction alone cannot.",
    priceFrom: "AUD 9,400",
    chapterTitle: ["Smooth,", "after the work."],
    sections: [
      { id: "overview", t: "Overview", body: "Thigh lift removes excess inner-thigh skin after weight loss has left the skin envelope larger than the underlying tissue. As with brachioplasty, it leaves a scar — but it restores walking comfort, reduces chafing, and brings the leg silhouette back into proportion." },
      { id: "consultation", t: "The consultation", body: "We assess skin laxity from groin to knee. Most patients are post weight-loss; some have congenital laxity. We will discuss whether a vertical (medial) thigh lift, or a horizontal (groin) lift, or both, suits your anatomy. The scar trade-off is significant — we want you to understand it fully before deciding." },
      { id: "approach", t: "Our approach", body: "Most commonly a horizontal lift placed in the groin crease (concealed in underwear). For greater laxity, a vertical extension along the inner thigh is added. We routinely combine with light liposuction for the most refined contour." },
      { id: "theatre", t: "The procedure", body: "Two to four hours under general anaesthetic. One night in hospital under nursing observation, then transfer to your recovery villa." },
      { id: "recovery", t: "Recovery", body: "Compression garment for eight weeks; walking only for the first week. Sutures out at days fourteen. We ask you to remain on the island for fourteen days. Final result at six months as scars fade." },
    ],
    pricing: [
      { tier: "Horizontal", italic: "Groin-crease only", amount: "9,400", from: "AUD · from", small: "Concealed scar", items: ["Horizontal thigh lift", "Theatre, anaesthetic & overnight obs", "10 nights in private villa", "Daily nursing visits", "Compression garment", "12-month follow-up"], cta: "Plan a consult" },
      { tier: "Vertical", italic: "Most weight-loss patients", amount: "10,800", from: "AUD · from", small: "Inner-thigh extension", items: ["Vertical thigh lift", "Light liposculpture included", "Theatre, anaesthetic & overnight obs", "12 nights in private villa", "Daily nursing & physiotherapy", "12-month follow-up"], cta: "Plan your journey", featured: true },
      { tier: "Combined", italic: "With body contouring", amount: "14,400", from: "AUD · from", small: "With abdominoplasty", items: ["Thigh lift + abdominoplasty", "Theatre, anaesthetic & 2 nights obs", "18 nights in private villa", "Comprehensive nursing & drainage", "12-month follow-up"], cta: "Plan your journey" },
    ],
    faqs: [
      { q: "Where is the scar?", a: "Horizontal lift: groin crease, concealed in underwear and most swimwear. Vertical lift: along the inner thigh, visible when wearing shorts but well-hidden in trousers and skirts." },
      { q: "Liposuction or thigh lift?", a: "Liposuction alone for fatty thighs with good skin. Thigh lift if there's significant skin excess after weight loss. We are conservative about combining — staging is sometimes safer for very loose skin." },
      { q: "Will my walking be affected?", a: "Short term, yes — limited mobility for the first week. Long term, most patients walk more comfortably than before, particularly if chafing was a problem." },
      { q: "Can the scar widen?", a: "It can, particularly with the horizontal-only approach where gravity pulls down. Our technique anchors to the deep fascia to minimise this — but some widening is possible. We provide our six-month scar therapy programme." },
      { q: "How long should I wait after weight loss?", a: "We recommend twelve months at a stable weight before any body-contouring surgery. Operating during ongoing weight loss leads to disappointing results as the body keeps changing." },
    ],
  },

  // ============================================================
  // NON-SURGICAL (parent: non-surgical)
  // ============================================================
  "botulinum-toxin": {
    parent: "non-surgical", slug: "botulinum-toxin", title: "Botulinum Toxin",
    tagline: "The smallest possible refinement.",
    short: "Forehead, glabella, and periorbital — fifteen-minute appointment, results within ten days.",
    priceFrom: "AUD 380",
    chapterTitle: ["The smallest", "refinement."],
    sections: [
      { id: "overview", t: "Overview", body: "Botulinum toxin (Botox, Dysport, Xeomin) softens the muscles of facial expression that create dynamic lines — forehead lines, frown lines, crow's-feet. The intent is movement that is softer, never absent. We use less than most clinics, and we expect you to still look like yourself when you smile." },
      { id: "consultation", t: "The consultation", body: "We assess your resting and animated expressions, the depth of any static lines, and discuss what you want softened. We will tell you when more is not better — over-treatment creates the frozen look, which our patients almost never want." },
      { id: "approach", t: "Our approach", body: "We use only TGA- and Health-Canada-approved neuromodulators — Allergan Botox and Galderma Dysport. We dilute conservatively, inject precisely, and place fewer units than reflex would suggest. Many patients say they look the same; only the lines are gone." },
      { id: "theatre", t: "The procedure", body: "Fifteen-minute appointment in our private treatment rooms, performed by a medical injector — never a technician. No anaesthetic required; ice or topical numbing on request." },
      { id: "recovery", t: "Recovery", body: "Mild redness for thirty minutes; small bruises possible at injection sites and resolve in a few days. No exercise, sauna, or lying down for four hours. Results visible at three to five days, peak at ten to fourteen days." },
    ],
    pricing: [
      { tier: "Single area", italic: "Targeted refinement", amount: "380", from: "AUD · from", small: "Forehead, glabella, OR crow's-feet", items: ["Single anatomical area", "Allergan or Galderma product", "Medical injector", "Two-week review", "Touch-up included if needed"], cta: "Book a refresh" },
      { tier: "Three areas", italic: "Most patients begin here", amount: "780", from: "AUD · from", small: "Full upper-face refresh", items: ["Forehead + glabella + crow's-feet", "Allergan or Galderma product", "Medical injector", "Two-week review", "Comprehensive consult"], cta: "Book a refresh", featured: true },
      { tier: "Full face", italic: "Comprehensive treatment", amount: "1,200", from: "AUD · from", small: "Upper face + jawline", items: ["Upper face + masseters or jawline", "Allergan or Galderma product", "Medical injector", "Two-week review", "Skin protocol included"], cta: "Plan a session" },
    ],
    faqs: [
      { q: "How long does it last?", a: "Three to four months for most patients. Effect builds with repeated treatments — by the third or fourth round, many patients can extend the interval to five months." },
      { q: "Will I look frozen?", a: "Not from us. We use less product than most clinics and place it precisely. Movement should be softened, not eliminated. If you've felt frozen elsewhere, tell us — we will under-treat your first session and build from there." },
      { q: "What's the difference between Botox, Dysport, and Xeomin?", a: "All three are neuromodulators with different unit-to-effect ratios. Dysport diffuses slightly more; Xeomin has no carrier protein. For most patients the choice is unimportant; your injector will pick what's right for your anatomy." },
      { q: "Can I exercise after?", a: "Wait four hours. Avoid lying down, hot environments, or high-intensity exercise for the rest of the day. Normal activity from the next morning." },
      { q: "Will my lines come back stronger?", a: "No — the opposite. Repeated treatments train the muscle to relax; static lines etched by years of expression often fade with consistent treatment." },
      { q: "Can I have it before flying?", a: "Yes, but ideally not the same day. We ask for a 24-hour buffer before flying to allow product to settle." },
    ],
  },

  "dermal-fillers": {
    parent: "non-surgical", slug: "dermal-fillers", title: "Dermal Fillers",
    tagline: "Volume, in the right places.",
    short: "Cheeks, lips, mid-face, jawline — using only HA-based, FDA-approved Q-Med and Allergan products.",
    priceFrom: "AUD 580",
    chapterTitle: ["Volume,", "well placed."],
    sections: [
      { id: "overview", t: "Overview", body: "Dermal fillers replace volume lost to ageing, augment proportions, and refine contours. We work exclusively with hyaluronic-acid (HA) fillers — they are reversible (with hyaluronidase) and integrate naturally into tissue. We never use permanent fillers." },
      { id: "consultation", t: "The consultation", body: "We assess your facial structure as a whole — not isolated areas. Often the right answer is to add volume to the cheek to lift the mid-face, rather than chasing the line directly. We will tell you when less is more, and we will sometimes refuse requests that would cause harm." },
      { id: "approach", t: "Our approach", body: "We use Restylane (Q-Med), Juvederm (Allergan), and Teosyal — choosing product by area: firmer fillers (Restylane Lyft, Juvederm Volux) for deep cheek and jaw; softer fillers (Restylane Kysse, Volbella) for lips and tear troughs. We use cannula or needle depending on safety and precision." },
      { id: "theatre", t: "The procedure", body: "Forty-five-minute appointment, performed by a medical injector. Topical anaesthetic plus the lidocaine in the filler itself. Discomfort is minimal; most patients find the procedure comfortable." },
      { id: "recovery", t: "Recovery", body: "Mild swelling for one to three days; bruising possible (more so with needle than cannula). No exercise, alcohol, or sauna for 24 hours. Final integration at two weeks." },
    ],
    pricing: [
      { tier: "Single syringe", italic: "Targeted area", amount: "580", from: "AUD · from", small: "Lips, tear troughs, or one cheek area", items: ["1 ml HA filler (Q-Med or Allergan)", "Medical injector", "Topical anaesthetic", "Two-week review", "Touch-up if minor"], cta: "Book a session" },
      { tier: "Comprehensive", italic: "Most patients begin here", amount: "1,800", from: "AUD · from", small: "3 ml across multiple areas", items: ["3 ml HA filler", "Q-Med or Allergan products", "Medical injector", "Two-week review", "Skin protocol consult"], cta: "Plan a session", featured: true },
      { tier: "Full face", italic: "Structural rebalance", amount: "3,200", from: "AUD · from", small: "5 ml — staged where needed", items: ["5 ml HA filler", "Cheek, mid-face, jawline, lips", "Cannula approach where appropriate", "Two-week review", "Six-month maintenance plan"], cta: "Plan a session" },
    ],
    faqs: [
      { q: "How long do fillers last?", a: "Nine months to eighteen months depending on product and area. Lips and high-movement areas metabolise fastest; cheeks and jawline last longest. Some structural fillers (Volux) last over two years." },
      { q: "Will I look filled or done?", a: "Not from us. We use less than reflex would suggest, and we work to your face's natural proportion rather than fashion-driven extremes. Done well, fillers should be invisible — only that you look better." },
      { q: "Can it be reversed?", a: "Yes — HA fillers can be dissolved with hyaluronidase if you don't like the result. This is a major reason we use HA exclusively." },
      { q: "What about under-eye filler?", a: "Tear-trough filler is technically demanding and not appropriate for everyone. We assess underlying anatomy carefully — some patients are better served by mid-face support, blepharoplasty, or simply leaving it alone." },
      { q: "Will it migrate?", a: "Properly placed in the right plane, no. Lip filler that has 'travelled' above the lip line is almost always over-filled, not poorly placed. We use less, more precisely, to avoid this." },
      { q: "Are there risks I should know about?", a: "Vascular occlusion is the major risk — rare with experienced injectors using cannulae but always discussed in consultation. We carry hyaluronidase on-site for immediate management if needed." },
    ],
  },

  profhilo: {
    parent: "non-surgical", slug: "profhilo", title: "Profhilo",
    tagline: "Skin quality, restored.",
    short: "Bio-remodelling injectable that improves skin hydration, firmness, and elasticity — two sessions, one month apart.",
    priceFrom: "AUD 720",
    chapterTitle: ["Skin quality,", "restored."],
    sections: [
      { id: "overview", t: "Overview", body: "Profhilo is a hybrid hyaluronic-acid injectable that doesn't add volume — it remodels the skin from within, stimulating collagen, elastin, and fibroblast activity. Best for patients who want the look of better skin, not changed proportions." },
      { id: "consultation", t: "The consultation", body: "We assess skin quality, hydration, and laxity across the face, neck, and (where relevant) hands. Profhilo suits skin that has lost firmness without yet needing volume restoration. We will tell you if you are too early — or too late — for it to be the right tool." },
      { id: "approach", t: "Our approach", body: "Standard Profhilo protocol: ten injection points on each side of the face (the BAP technique), repeated four weeks later. We can extend to neck, décolletage, or hands. The product spreads beneath the skin in a way that other fillers do not." },
      { id: "theatre", t: "The procedure", body: "Twenty-minute appointment per session, performed by a medical injector. Topical anaesthetic optional; most patients tolerate without." },
      { id: "recovery", t: "Recovery", body: "Small bumps at injection sites for six to twelve hours, then completely flat. Results visible at six weeks, full effect at four months. Lasts six to nine months; we maintain twice yearly." },
    ],
    pricing: [
      { tier: "Single area", italic: "Face only", amount: "720", from: "AUD · from", small: "Per session", items: ["Standard BAP protocol", "Medical injector", "Topical anaesthetic on request", "One-month review"], cta: "Book a session" },
      { tier: "Two-session protocol", italic: "Most patients begin here", amount: "1,300", from: "AUD · from", small: "Face, two sessions month apart", items: ["Two BAP-protocol sessions", "Four weeks apart", "Six-week post-treatment review", "Maintenance plan"], cta: "Plan a course", featured: true },
      { tier: "Face + neck", italic: "Comprehensive bio-remodelling", amount: "1,800", from: "AUD · from", small: "Two sessions, both areas", items: ["Face + neck/décolletage", "Two sessions month apart", "Maintenance plan", "Topical skincare regimen"], cta: "Plan a course" },
    ],
    faqs: [
      { q: "Is Profhilo a filler?", a: "Technically yes — it's HA-based — but it doesn't behave like a volumising filler. It spreads beneath the skin to stimulate quality, rather than sitting in one place to add volume." },
      { q: "Will I see immediate results?", a: "No. Profhilo is a slow worker. The injection bumps disappear within a day; visible improvement starts at four to six weeks and peaks at three to four months." },
      { q: "How is it different from skin boosters?", a: "Skin boosters (Restylane Vital, Juvederm Volite) hydrate and improve texture but don't remodel collagen as actively. Profhilo's high molecular weight HA stimulates fibroblasts in a way standard boosters don't." },
      { q: "Can I combine with other treatments?", a: "Yes — Profhilo pairs particularly well with botulinum toxin (different mechanism, complementary outcome). We typically space treatments two weeks apart." },
      { q: "How often should I have it?", a: "Two-session protocol every six to nine months for maintenance. Some patients with mature skin do better on a quarterly single-session protocol." },
    ],
  },

  polynucleotides: {
    parent: "non-surgical", slug: "polynucleotides", title: "Polynucleotides",
    tagline: "Tissue regeneration, gently.",
    short: "Salmon-DNA-derived injectables for tissue repair — particularly suited to under-eyes, neck, and damaged skin.",
    priceFrom: "AUD 680",
    chapterTitle: ["Tissue,", "regenerated."],
    sections: [
      { id: "overview", t: "Overview", body: "Polynucleotides are short-chain DNA fragments (derived from purified salmon DNA) that stimulate tissue regeneration — fibroblast activation, anti-inflammatory action, and improved skin quality. They are best for tired, thin, or damaged skin rather than for adding volume." },
      { id: "consultation", t: "The consultation", body: "We assess the area: most commonly the under-eye region, neck, and skin damaged by sun, scarring, or thinning. We will tell you if you would be better served by other technologies (filler, Profhilo, laser) — polynucleotides have a specific niche, and over-using them in the wrong place is wasteful." },
      { id: "approach", t: "Our approach", body: "We use Plinest, Newest, and Pronova for face, neck, and intimate areas respectively. Microinjections placed in a grid pattern; three sessions, two weeks apart, is the standard protocol." },
      { id: "theatre", t: "The procedure", body: "Twenty- to thirty-minute appointment per session. Topical anaesthetic; cannula or needle depending on area." },
      { id: "recovery", t: "Recovery", body: "Mild redness and small bumps for a few hours. No restrictions on activity. Results visible at four weeks, full effect at three months." },
    ],
    pricing: [
      { tier: "Single session", italic: "Targeted treatment", amount: "680", from: "AUD · from", small: "One area", items: ["Plinest, Newest or Pronova", "Single area", "Medical injector", "Two-week review"], cta: "Book a session" },
      { tier: "Three-session protocol", italic: "Most patients begin here", amount: "1,800", from: "AUD · from", small: "Standard course", items: ["Three sessions, 2 weeks apart", "One area (face or neck)", "Topical anaesthetic on request", "Six-week review", "Maintenance plan"], cta: "Plan a course", featured: true },
      { tier: "Combined", italic: "Multi-area regeneration", amount: "2,800", from: "AUD · from", small: "Three areas, three sessions each", items: ["Three sessions per area", "Under-eyes + neck + décolletage", "Comprehensive consult", "Six-week review", "Maintenance plan"], cta: "Plan a course" },
    ],
    faqs: [
      { q: "Are polynucleotides safe — they're from fish?", a: "Yes. The DNA is highly purified and free of any protein components that could cause allergy. They've been used in regenerative medicine for thirty years; cosmetic use is more recent." },
      { q: "How are they different from PRP?", a: "PRP uses your own platelets; polynucleotides use a standardised, purified salmon DNA extract. The mechanism (regenerative stimulation) is similar, but polynucleotides give more consistent dosing and effect." },
      { q: "Best uses?", a: "Under-eye area is the standout: thin, damaged skin that doesn't respond well to filler. Also excellent for sun-damaged necks, atrophic scars, and post-cancer skin." },
      { q: "Can I have it with botulinum toxin or filler?", a: "Yes — they complement well. We typically space two weeks apart to manage swelling individually." },
      { q: "How long does it last?", a: "Effects build over three sessions and last six to nine months. Maintenance every six months keeps the result going." },
    ],
  },

  "fractional-laser": {
    parent: "non-surgical", slug: "fractional-laser", title: "Fractional CO₂ Laser",
    tagline: "Resurfaced, considered.",
    short: "Fractional ablative resurfacing for fine lines, sun damage, and texture — five to seven days of recovery.",
    priceFrom: "AUD 1,200",
    chapterTitle: ["Resurfaced,", "considered."],
    sections: [
      { id: "overview", t: "Overview", body: "Fractional CO₂ laser creates microscopic columns of controlled tissue injury through the skin. Healing stimulates collagen and replaces sun-damaged, finely-lined skin with newer, smoother tissue. It's the most powerful single resurfacing tool we have — and accordingly the one with most recovery." },
      { id: "consultation", t: "The consultation", body: "We assess skin type (Fitzpatrick), pigment, and the depth of concern. Patients with darker skin types require careful settings to avoid post-inflammatory hyperpigmentation; we may pre-condition with a topical regimen for two to four weeks." },
      { id: "approach", t: "Our approach", body: "Standard treatment uses 25-30% surface coverage at moderate depth — meaningful results without extreme downtime. For deeper concerns we may stage two passes; for darker skin types we use lower densities and may use Q-switched alternatives." },
      { id: "theatre", t: "The procedure", body: "Forty-five minutes, performed under topical anaesthetic and (if needed) nerve blocks. Day-stay procedure in our laser suite." },
      { id: "recovery", t: "Recovery", body: "Open wound for three days, crusting through day five to seven. Sun avoidance for four weeks. We recommend remaining on the island for seven days post-procedure. Final result at three to four months as collagen remodels." },
    ],
    pricing: [
      { tier: "Single pass", italic: "Mild to moderate concerns", amount: "1,200", from: "AUD · from", small: "Standard density", items: ["Single fractional CO₂ pass", "Topical anaesthesia", "Recovery skincare regimen", "Six-week review"], cta: "Plan a session" },
      { tier: "Standard", italic: "Most patients begin here", amount: "1,800", from: "AUD · from", small: "Two passes, mid-density", items: ["Two-pass protocol", "Topical + nerve blocks", "Comprehensive recovery skincare", "5 nights in private accommodation", "Six-week & three-month reviews"], cta: "Plan a session", featured: true },
      { tier: "Comprehensive", italic: "Significant resurfacing", amount: "2,800", from: "AUD · from", small: "Deep peel-equivalent", items: ["Deep fractional CO₂ resurfacing", "Topical + nerve blocks", "5 nights in private accommodation", "In-villa nursing visits", "Three- and six-month reviews"], cta: "Plan a session" },
    ],
    faqs: [
      { q: "How is it different from microneedling or RF microneedling?", a: "CO₂ laser ablates skin — energy at the surface that vapourises a fraction of the tissue. RF microneedling delivers energy below the surface with minimal damage at the top. CO₂ gives more dramatic surface improvement; RF gives less downtime." },
      { q: "What's the recovery actually like?", a: "Day 0-2: oozing, pink, swollen. Day 3-5: dry crusting. Day 5-7: crusts shed, fresh skin underneath. Day 7-14: pink, like a sunburn fading. Make-up acceptable from day seven." },
      { q: "Can I have it on darker skin?", a: "With caution. Patients with Fitzpatrick IV-VI need lower densities, careful pre-conditioning, and aggressive sun protection — we may also recommend Q-switched alternatives. We will assess this honestly." },
      { q: "How long do results last?", a: "Collagen stimulation lasts years; the surface improvement is permanent (until new sun damage occurs). Maintenance every two to three years keeps results fresh." },
      { q: "When can I fly?", a: "We ask you to remain on the island for seven days post-procedure. Flying earlier risks dehydration and prolonged inflammation." },
      { q: "Can I combine with other treatments?", a: "Botulinum toxin one to two weeks before; injectable filler typically four to six weeks after. Skincare regimen begins immediately to support healing." },
    ],
  },

  "ipl-photofacial": {
    parent: "non-surgical", slug: "ipl-photofacial", title: "IPL Photofacial",
    tagline: "Pigment, vessels, evened.",
    short: "Intense pulsed light to address sun damage, vascular concerns, and rosacea — no downtime.",
    priceFrom: "AUD 480",
    chapterTitle: ["Pigment,", "evened."],
    sections: [
      { id: "overview", t: "Overview", body: "IPL is broad-spectrum light that targets pigment (sun spots, freckles) and vascular concerns (rosacea, telangiectasia). It does not resurface; it works selectively at the chromophore level. Done well, it gives clearer, more even-toned skin without downtime." },
      { id: "consultation", t: "The consultation", body: "We assess pigment depth, vascular extent, and skin type. IPL is suited to lighter skin types (Fitzpatrick I-III); patients with darker skin require alternative technologies. We will not treat tanned skin — sun protection for four weeks before treatment is required." },
      { id: "approach", t: "Our approach", body: "We use the Lumenis M22 platform — the gold standard for IPL. Settings are tailored per session and per concern. Pigment lesions darken first (the 'coffee grounds' effect) then exfoliate over a week." },
      { id: "theatre", t: "The procedure", body: "Twenty- to thirty-minute appointment in our laser suite. No anaesthetic for most patients; the sensation is mild, like a warm rubber band." },
      { id: "recovery", t: "Recovery", body: "Mild pinkness for a few hours. Pigment lesions darken for five to seven days, then exfoliate. No restrictions other than aggressive sun protection." },
    ],
    pricing: [
      { tier: "Single area", italic: "Targeted treatment", amount: "480", from: "AUD · from", small: "Face, neck, OR décolletage", items: ["Single area, single session", "Lumenis M22 platform", "Six-week review"], cta: "Book a session" },
      { tier: "Three-session course", italic: "Most patients begin here", amount: "1,200", from: "AUD · from", small: "Face — full programme", items: ["Three sessions, four weeks apart", "Full face", "Skin protocol included", "Six-week & three-month reviews"], cta: "Plan a course", featured: true },
      { tier: "Comprehensive", italic: "Multi-area programme", amount: "2,200", from: "AUD · from", small: "Face + neck + chest, three sessions", items: ["Three sessions per area", "Face + neck + décolletage", "Pigment & vascular settings", "Comprehensive skin programme"], cta: "Plan a course" },
    ],
    faqs: [
      { q: "How many sessions will I need?", a: "Three is standard for most pigment and vascular concerns. Severe sun damage may need five. Maintenance once or twice yearly thereafter." },
      { q: "Is it safe on my skin type?", a: "IPL is best on lighter skin (Fitzpatrick I-III). Patients with Fitzpatrick IV-VI risk hypopigmentation; we use Q-switched lasers instead for those skin types." },
      { q: "What does the recovery look like?", a: "Treated pigment darkens significantly for five to seven days then flakes away naturally. Vascular concerns may bruise mildly. No social downtime." },
      { q: "Can I have it before flying?", a: "Yes, but we ask you not to sun-tan before or for four weeks after. The flight itself is fine." },
      { q: "Does it help rosacea?", a: "Yes, particularly the diffuse redness component. It does not eliminate rosacea but can reduce visible vessels and overall flush significantly." },
    ],
  },

  "chemical-peel": {
    parent: "non-surgical", slug: "chemical-peel", title: "Chemical Peel",
    tagline: "Refreshed, beneath.",
    short: "Light to medium-depth chemical peels for brightening, texture, and pigment — three to five days of flaking.",
    priceFrom: "AUD 320",
    chapterTitle: ["Refreshed,", "beneath."],
    sections: [
      { id: "overview", t: "Overview", body: "Chemical peels use controlled exfoliating acids to remove the upper layers of skin and stimulate fresh growth. Light peels (glycolic, mandelic) brighten with no downtime; medium peels (TCA) address pigment and fine lines with three to five days of flaking; deep peels we generally don't perform — laser does it better with more control." },
      { id: "consultation", t: "The consultation", body: "We assess concern, skin type, and lifestyle. We pre-condition with a four-week skincare programme (vitamin C, retinoid) before any medium-depth peel — this gives a much better result and reduces complication risk." },
      { id: "approach", t: "Our approach", body: "Light peels in series of three to six. Medium peels (Jessner+TCA combination) as a single deeper treatment. We sometimes pair light peels with HydraFacial in the same appointment for combined surface and deeper work." },
      { id: "theatre", t: "The procedure", body: "Twenty- to thirty-minute appointment. Light peels: no anaesthetic; mild tingling. Medium peels: numbing required, with cooling fans for comfort." },
      { id: "recovery", t: "Recovery", body: "Light peel: mild redness, no downtime. Medium peel: visible flaking for three to five days; bronze appearance for a week. Sun avoidance for four weeks. Final result two weeks after flaking completes." },
    ],
    pricing: [
      { tier: "Light peel", italic: "Maintenance brightening", amount: "320", from: "AUD · from", small: "Glycolic or mandelic, no downtime", items: ["Single light-peel session", "Pre-treatment skincare consult", "Two-week review"], cta: "Book a session" },
      { tier: "Three-session course", italic: "Most patients begin here", amount: "850", from: "AUD · from", small: "Light peels, three sessions", items: ["Three light peels, two weeks apart", "Skincare regimen included", "Maintenance plan", "Reviews after each session"], cta: "Plan a course", featured: true },
      { tier: "Medium peel", italic: "Significant correction", amount: "1,400", from: "AUD · from", small: "Jessner + TCA, single session", items: ["Single medium-depth peel", "Four-week skin pre-conditioning", "5-night villa stay during flaking", "In-villa skincare regimen", "Six-week and three-month reviews"], cta: "Plan a session" },
    ],
    faqs: [
      { q: "Is it painful?", a: "Light peels: mild tingling and warmth, easily tolerated. Medium peels: noticeable burning sensation that subsides within minutes; we use cooling fans throughout." },
      { q: "Will my skin actually peel?", a: "Light peels: usually no visible peeling, just freshness. Medium peels: visible flaking for three to five days that you must not pick — let it shed naturally." },
      { q: "What about hyperpigmentation?", a: "Patients with darker skin require careful peel selection — we typically avoid TCA and use mandelic or salicylic peels at lower concentrations. Pre-conditioning with hydroquinone or cysteamine for four weeks reduces post-peel pigmentation risk." },
      { q: "When can I wear makeup?", a: "Light peel: same day. Medium peel: not until flaking completes (typically day five to seven)." },
      { q: "Combined with laser or microneedling?", a: "We don't combine medium peels with laser in the same session — recovery becomes too aggressive. Light peels can be paired with microneedling four weeks after RF or laser treatments." },
    ],
  },

  "rf-microneedling": {
    parent: "non-surgical", slug: "rf-microneedling", title: "RF Microneedling",
    tagline: "Tightened, beneath.",
    short: "Radiofrequency-assisted microneedling for skin tightening, texture, and acne scars — a series of three sessions.",
    priceFrom: "AUD 880",
    chapterTitle: ["Tightened,", "beneath."],
    sections: [
      { id: "overview", t: "Overview", body: "RF microneedling delivers energy through tiny insulated needles into the dermis, stimulating collagen and tightening the skin from beneath. It improves skin texture, addresses acne scars, and provides moderate tightening — without removing the surface layer that fractional CO₂ does." },
      { id: "consultation", t: "The consultation", body: "We assess skin laxity, scar depth, and skin type. RF microneedling is safe across all Fitzpatrick types — its appeal for darker-skinned patients (vs CO₂) is significant. We discuss whether RF microneedling alone is enough, or whether you would benefit from a combined approach with surgical work." },
      { id: "approach", t: "Our approach", body: "We use Morpheus8 and Sylfirm X (both gold-standard RF microneedling devices). Settings vary by depth and concern — three sessions, four weeks apart, is the standard protocol. We also offer Morpheus8 Body for off-face indications." },
      { id: "theatre", t: "The procedure", body: "Forty-five-minute appointment with topical anaesthetic. The sensation during treatment is mild, dull pressure rather than sharp pain." },
      { id: "recovery", t: "Recovery", body: "Mild redness and pinpoint marks for 24 to 48 hours. Sun avoidance for two weeks. No major restrictions. Results build over three months as collagen remodels." },
    ],
    pricing: [
      { tier: "Single session", italic: "Targeted treatment", amount: "880", from: "AUD · from", small: "Face only", items: ["Single Morpheus8 or Sylfirm session", "Topical anaesthetic", "Two-week review"], cta: "Book a session" },
      { tier: "Three-session course", italic: "Most patients begin here", amount: "2,400", from: "AUD · from", small: "Face — standard protocol", items: ["Three sessions, four weeks apart", "Topical anaesthesia", "Skincare regimen included", "Reviews at each session"], cta: "Plan a course", featured: true },
      { tier: "Face + neck", italic: "Comprehensive tightening", amount: "3,400", from: "AUD · from", small: "Three sessions, both areas", items: ["Three sessions per area", "Face + neck/décolletage", "Topical anaesthesia", "Comprehensive consult & follow-up"], cta: "Plan a course" },
    ],
    faqs: [
      { q: "How is it different from regular microneedling?", a: "Regular microneedling creates fine channels for product penetration and surface collagen stimulation. RF microneedling adds heat at depth — significantly more skin tightening and volumetric collagen build." },
      { q: "Can I have it on darker skin?", a: "Yes — RF energy is colour-blind and bypasses melanin entirely. RF microneedling is one of the safest energy-based treatments across all skin types." },
      { q: "What about acne scars?", a: "RF microneedling is excellent for atrophic acne scars, particularly when combined with subcision (releasing the tethered base of the scar). We may recommend this combined protocol over multiple sessions." },
      { q: "How long do results last?", a: "Collagen build is gradual and lasts years; the result of three sessions typically holds for two to three years before maintenance becomes worthwhile." },
      { q: "Combined with other treatments?", a: "Pairs well with botulinum toxin (different mechanism) and laser (typically separated by two to four weeks). Often the centrepiece of a non-surgical rejuvenation programme." },
    ],
  },

  hydrafacial: {
    parent: "non-surgical", slug: "hydrafacial", title: "HydraFacial",
    tagline: "Cleanse, exfoliate, hydrate.",
    short: "Three-step skin treatment combining cleansing, exfoliation, and hydration — no downtime, ideal day-of-event.",
    priceFrom: "AUD 280",
    chapterTitle: ["Cleansed,", "hydrated."],
    sections: [
      { id: "overview", t: "Overview", body: "HydraFacial is a vacuum-based three-step treatment: cleanse and peel, painless extractions, and infusion of hydrating and antioxidant serums. It produces an immediate glow and improvement in skin texture without any downtime — ideal as a day-of-event treatment." },
      { id: "consultation", t: "The consultation", body: "We assess skin condition and tailor the booster protocol — brightening, hydrating, anti-acne, or peptide-rich. HydraFacial is suitable for almost all skin types, including sensitive skin." },
      { id: "approach", t: "Our approach", body: "Standard three-step protocol with bespoke booster selection. We frequently combine with LED therapy or a brief skin-booster injection for amplified results, in the same appointment." },
      { id: "theatre", t: "The procedure", body: "Forty-five-minute appointment in our treatment rooms. Comfortable throughout — most patients describe it as pleasant." },
      { id: "recovery", t: "Recovery", body: "None. Mild flush at most for thirty minutes. Makeup the same day. Results visible immediately and last seven to ten days." },
    ],
    pricing: [
      { tier: "Standard", italic: "The classic", amount: "280", from: "AUD · from", small: "Three-step facial", items: ["Three-step HydraFacial", "Bespoke booster", "Skincare consultation"], cta: "Book a session" },
      { tier: "Deluxe", italic: "Most patients choose this", amount: "380", from: "AUD · from", small: "With LED therapy", items: ["Three-step HydraFacial", "LED light therapy (15 min)", "Two boosters", "Skincare consultation"], cta: "Book a session", featured: true },
      { tier: "Platinum", italic: "Pre-event ritual", amount: "480", from: "AUD · from", small: "Full ritual", items: ["Three-step HydraFacial", "LED therapy", "Lymphatic massage", "Three premium boosters", "Take-home skincare"], cta: "Book a session" },
    ],
    faqs: [
      { q: "How often should I have it?", a: "Monthly maintenance suits most patients. Pre-event treatments three to seven days before look photo-perfect." },
      { q: "Is it appropriate before laser or peel?", a: "Yes — frequently used as a 'prep' treatment before more aggressive work. We typically recommend HydraFacial in the week before a chemical peel or laser." },
      { q: "Does it help acne?", a: "Yes — the extraction phase clears congestion and the salicylic-acid booster reduces breakout activity. Results are visible immediately and improve with consistent monthly treatments." },
      { q: "Can I have it before a flight?", a: "Ideal pre-flight treatment — leaves skin hydrated and clean for long-haul travel." },
      { q: "Combined with injectables?", a: "Typically separated by 24 hours from injectable treatments to avoid disturbing fresh injection sites. The order matters less; the spacing matters more." },
    ],
  },

  "prp-skin": {
    parent: "non-surgical", slug: "prp-skin", title: "PRP for Skin",
    tagline: "Your own, regenerated.",
    short: "Platelet-rich plasma microinjections — three sessions, one month apart, for skin quality and brightness.",
    priceFrom: "AUD 680",
    chapterTitle: ["Your own,", "regenerated."],
    sections: [
      { id: "overview", t: "Overview", body: "PRP — platelet-rich plasma — is a concentration of growth factors derived from your own blood. Injected into the skin in microdoses, it stimulates fibroblast activity and improves skin quality without introducing any foreign material." },
      { id: "consultation", t: "The consultation", body: "We assess skin texture, tone, and your concerns. PRP suits patients with thin, dull, or generally tired skin. We will discuss whether PRP alone is enough, or whether you would benefit from combining it with RF microneedling or polynucleotides." },
      { id: "approach", t: "Our approach", body: "Standard double-spin centrifugation produces a higher-concentration PRP than single-spin. We microinject across the face in a grid pattern; three sessions, four weeks apart, is the standard protocol. We also offer PRP for hair restoration as a separate treatment." },
      { id: "theatre", t: "The procedure", body: "Sixty-minute appointment including blood draw, centrifugation, and injection. Topical anaesthetic for the injection phase." },
      { id: "recovery", t: "Recovery", body: "Mild redness for several hours. Pinpoint marks possible at injection sites for 24 hours. No downtime. Results build over three months." },
    ],
    pricing: [
      { tier: "Single session", italic: "Trial treatment", amount: "680", from: "AUD · from", small: "Face", items: ["Single PRP session", "Double-spin centrifugation", "Topical anaesthetic", "Two-week review"], cta: "Book a session" },
      { tier: "Three-session course", italic: "Most patients begin here", amount: "1,800", from: "AUD · from", small: "Standard protocol", items: ["Three sessions, four weeks apart", "Double-spin technique", "Topical anaesthetic", "Reviews at each session"], cta: "Plan a course", featured: true },
      { tier: "PRP + RF microneedling", italic: "Combined regeneration", amount: "3,200", from: "AUD · from", small: "Three sessions, combined", items: ["Three combined sessions", "RF microneedling + PRP", "Topical anaesthesia", "Six-week & three-month reviews"], cta: "Plan a course" },
    ],
    faqs: [
      { q: "How is it different from polynucleotides?", a: "PRP uses your own platelets; polynucleotides use purified salmon DNA. PRP is highly individualised (your platelets, your concentration); polynucleotides are standardised. Both stimulate regeneration; we sometimes alternate them." },
      { q: "Does it actually work?", a: "Evidence is reasonable but not overwhelming. Most patients describe a subtle 'better skin' feeling rather than dramatic change. Best for skin-quality concerns rather than wrinkles or volume loss." },
      { q: "Is it safe?", a: "Very. It's your own blood, so allergic reaction is essentially impossible. The most common side effect is mild bruising." },
      { q: "Combined with other treatments?", a: "Often paired with RF microneedling for amplified collagen build, or with topical applications during HydraFacial. Spaces out from injectables by 24 hours." },
      { q: "How long do results last?", a: "Six to nine months typically. Annual maintenance recommended." },
    ],
  },

  "skin-boosters": {
    parent: "non-surgical", slug: "skin-boosters", title: "Skin Boosters",
    tagline: "Hydration, restored.",
    short: "Hydrating microinjections that improve skin elasticity and dewiness — two- to three-session protocols.",
    priceFrom: "AUD 480",
    chapterTitle: ["Hydration,", "restored."],
    sections: [
      { id: "overview", t: "Overview", body: "Skin boosters are low-density hyaluronic-acid injectables placed superficially across the skin to improve hydration, elasticity, and dewiness. They don't add volume; they improve the quality of the canvas." },
      { id: "consultation", t: "The consultation", body: "We assess skin texture and hydration. Skin boosters suit patients who feel their skin looks tired but don't yet need volume restoration. We use Restylane Vital, Juvederm Volite, and Teosyal Redensity depending on concern." },
      { id: "approach", t: "Our approach", body: "Microinjection grid across face, neck, hands, or décolletage. Two to three sessions, four weeks apart, is standard. Maintenance once or twice yearly." },
      { id: "theatre", t: "The procedure", body: "Thirty-minute appointment per session. Topical anaesthetic; mild discomfort during injection." },
      { id: "recovery", t: "Recovery", body: "Small bumps at injection sites for two to twelve hours, then completely flat. No downtime. Results visible at two weeks." },
    ],
    pricing: [
      { tier: "Single session", italic: "Trial treatment", amount: "480", from: "AUD · from", small: "Face", items: ["Single skin-booster session", "Restylane Vital, Volite, or Redensity", "Medical injector", "Two-week review"], cta: "Book a session" },
      { tier: "Two-session course", italic: "Most patients begin here", amount: "880", from: "AUD · from", small: "Standard protocol", items: ["Two sessions, four weeks apart", "Skincare consultation", "Reviews after each"], cta: "Plan a course", featured: true },
      { tier: "Multi-area", italic: "Comprehensive bio-hydration", amount: "1,400", from: "AUD · from", small: "Two sessions, multiple areas", items: ["Face + neck + hands", "Two sessions four weeks apart", "Comprehensive consult", "Six-month maintenance plan"], cta: "Plan a course" },
    ],
    faqs: [
      { q: "How are they different from filler or Profhilo?", a: "Filler adds volume; skin boosters and Profhilo improve quality. Profhilo is a higher-molecular-weight, slower-acting bio-remodeller; skin boosters give faster, more superficial hydration. Both have a place." },
      { q: "How often should I have them?", a: "Initial two-session course, then maintenance every six months. Some patients prefer quarterly single sessions for sustained effect." },
      { q: "Does it help fine lines?", a: "Marginally. Skin boosters improve quality and reflectivity, which makes lines less visible — but they don't actually fill the lines. For specific lines, filler or laser is more direct." },
      { q: "Combined with other treatments?", a: "Pairs beautifully with botulinum toxin (different mechanism). We typically space two weeks apart." },
      { q: "Can I have it on hands?", a: "Yes — hand boosters give a noticeable improvement in skin quality and reduce visible vessels. A three- to five-week course works well." },
    ],
  },

  "medical-grade-facial": {
    parent: "non-surgical", slug: "medical-grade-facial", title: "Medical-Grade Facial",
    tagline: "The bespoke facial.",
    short: "Bespoke facial with prescription-grade products and active ingredients — excellent maintenance.",
    priceFrom: "AUD 220",
    chapterTitle: ["The bespoke", "facial."],
    sections: [
      { id: "overview", t: "Overview", body: "A medical-grade facial uses prescription-strength acids, vitamin C, retinoids, and active ingredients tailored to your specific skin condition. It is the most effective form of regular skincare — a step beyond conventional facials and an excellent maintenance protocol between more aggressive treatments." },
      { id: "consultation", t: "The consultation", body: "We assess your skin in detail — Fitzpatrick type, concerns, sensitivity, lifestyle. The facial is then bespoke: a different protocol for an oily, congested patient versus a dry, mature patient." },
      { id: "approach", t: "Our approach", body: "We use Skinceuticals, Obagi, ZO Skin Health, and Environ as core lines. Most facials include a light enzyme exfoliation, a gentle peel, extraction (if needed), LED therapy, and a custom mask. Take-home product is part of the protocol." },
      { id: "theatre", t: "The procedure", body: "Sixty- to seventy-five-minute appointment. Comfortable throughout; most patients fall asleep." },
      { id: "recovery", t: "Recovery", body: "None. Mild glow for 24 hours. Take-home regimen begins immediately." },
    ],
    pricing: [
      { tier: "Single facial", italic: "Maintenance", amount: "220", from: "AUD · from", small: "Bespoke 60-min facial", items: ["Bespoke 60-min facial", "Prescription-grade products", "Take-home product sample", "Skincare consultation"], cta: "Book a session" },
      { tier: "Six-session pass", italic: "Most patients begin here", amount: "1,200", from: "AUD · from", small: "Monthly facials", items: ["Six monthly facials", "Bespoke each session", "Adjusted as skin improves", "Comprehensive skincare regimen"], cta: "Plan a course", featured: true },
      { tier: "Twelve-session pass", italic: "Annual programme", amount: "2,200", from: "AUD · from", small: "Year-long programme", items: ["Twelve monthly facials", "Bespoke each session", "Quarterly skin reviews", "Premium skincare line included"], cta: "Plan a programme" },
    ],
    faqs: [
      { q: "How is it different from a regular facial?", a: "Medical-grade facials use prescription-strength actives — concentrations that aren't available in retail spas. The diagnosis is more careful, the product more targeted, the result more consistent." },
      { q: "How often?", a: "Monthly is standard maintenance. Some patients with active concerns (acne, pigmentation) prefer fortnightly for the first three months." },
      { q: "Does it actually do anything long term?", a: "Yes — combined with the take-home regimen, monthly facials give cumulative improvement in tone, texture, and resilience." },
      { q: "Combined with other treatments?", a: "Excellent base layer between injectable, laser, and microneedling sessions. We schedule facials in the weeks where no procedure is happening." },
      { q: "Can men have them?", a: "Of course. Many of our male patients have monthly facials as the centrepiece of their skincare routine." },
    ],
  },

  // ============================================================
  // HAIR (parent: hair)
  // ============================================================
  "sapphire-fue": {
    parent: "hair", slug: "sapphire-fue", title: "Sapphire FUE",
    tagline: "Returned, follicle by follicle.",
    short: "Follicular unit extraction with sapphire blades — most common hair-restoration procedure.",
    priceFrom: "AUD 4,800",
    chapterTitle: ["Returned,", "quietly."],
    sections: [
      { id: "overview", t: "Overview", body: "Sapphire FUE harvests individual hair follicles from the donor area (back and sides of the scalp) using a tiny, sapphire-bladed punch, then implants them one at a time into thinning areas. It leaves no linear scar and produces an entirely natural result when designed well." },
      { id: "consultation", t: "The consultation", body: "We perform trichoscopy — high-resolution scalp examination — to assess donor density, recipient demand, and miniaturisation. We also discuss your family history. Hair loss is progressive in most patients; the design accounts for what your hair will look like in twenty years, not just five." },
      { id: "approach", t: "Our approach", body: "Sapphire blades create smaller, smoother recipient sites than steel — better graft survival and healing. We design hairlines that respect what your face has always done; the most common error in hair restoration is a too-low or too-straight hairline that ages poorly." },
      { id: "theatre", t: "The procedure", body: "Seven to nine hours under local anaesthetic in our hair-restoration suite. Breaks for meals; many patients listen to music, take calls, or sleep. Two thousand to three thousand grafts in a single day; larger cases are staged across two consecutive days." },
      { id: "recovery", t: "Recovery", body: "Mild crusting for three to five days; donor area heals at ten days. We ask you to remain on the island for seven days. First growth at three to four months; final density at twelve to fifteen months." },
    ],
    pricing: [
      { tier: "Targeted", italic: "Hairline or crown", amount: "4,800", from: "AUD · from", small: "Up to 2,000 grafts", items: ["Trichoscopy & design", "Up to 2,000 sapphire FUE grafts", "Three days at clinic", "PRP follow-up included", "Twelve-month topical plan"], cta: "Book a consult" },
      { tier: "Full restoration", italic: "Most patients begin here", amount: "8,400", from: "AUD · from", small: "Up to 3,500 grafts", items: ["Trichoscopy & design", "Up to 3,500 grafts", "Five days in private villa", "Daily nursing follow-up", "Three-session PRP", "Twelve-month topical plan"], cta: "Plan your journey", featured: true },
      { tier: "Staged", italic: "Larger restorations", amount: "12,800", from: "AUD · from", small: "Two visits, six months apart", items: ["First visit: 3,500 grafts", "Second visit: 2,000 grafts", "Two recovery villa stays", "Year-long PRP & topical", "All travel coordination"], cta: "Plan your journey" },
    ],
    faqs: [
      { q: "How many grafts will I need?", a: "A typical hairline restoration is 1,800-3,000 grafts; full-pattern restoration may require 4,000-5,500, often staged. We give you a precise estimate after trichoscopy." },
      { q: "Is the result permanent?", a: "The transplanted follicles are taken from areas that don't lose hair — they're permanent. But the hair you weren't transplanted may continue to thin; we typically pair surgery with a maintenance medication regimen." },
      { q: "Will the scars be visible?", a: "Sapphire FUE leaves no linear scar. The donor area will show tiny dot scars under very close inspection (closer than 5mm) but is invisible at conversational distance, even with very short hair." },
      { q: "How long until I see results?", a: "Initial growth at three to four months; substantial density at six to nine months; final result at twelve to fifteen months. The transplanted hairs first shed (normal, expected) before regrowing." },
      { q: "Can women have it?", a: "Yes — women with patterned thinning are increasingly good candidates. We are careful about donor area density in women, who typically have less reserve than men." },
      { q: "Will it look natural?", a: "Yes — when designed well. Our lead trichologist personally designs every hairline. We will show you the design, on your face, before we make a single incision." },
    ],
  },

  "dhi-choi": {
    parent: "hair", slug: "dhi-choi", title: "DHI Choi Implanter",
    tagline: "Placed, one by one.",
    short: "Direct hair implantation — higher density, suited to crown and frontotemporal restorations.",
    priceFrom: "AUD 6,200",
    chapterTitle: ["Placed,", "one by one."],
    sections: [
      { id: "overview", t: "Overview", body: "DHI (Direct Hair Implantation) uses a Choi implanter pen — a hollow needle that holds the follicle and places it in a single motion, without first creating recipient sites. The result: tighter angles, higher density, and shorter time-out-of-body for each follicle." },
      { id: "consultation", t: "The consultation", body: "We assess whether DHI suits your case. It excels at high-density work and tight angles (frontotemporal, crown), and works well with patients who have shorter existing hair (less need to shave the recipient area). Sapphire FUE remains the right choice for most large hairline cases." },
      { id: "approach", t: "Our approach", body: "Choi implanters allow simultaneous extraction and implantation by trained technicians, reducing the time follicles spend out-of-body. This improves graft survival in challenging areas like the crown." },
      { id: "theatre", t: "The procedure", body: "Eight to ten hours under local anaesthetic. As with sapphire FUE, breaks for meals; total grafts up to 3,000 in a single day." },
      { id: "recovery", t: "Recovery", body: "Identical to sapphire FUE: three to five days of crusting, donor area healed at ten days, results at twelve months." },
    ],
    pricing: [
      { tier: "Crown only", italic: "Targeted DHI", amount: "6,200", from: "AUD · from", small: "Up to 1,800 grafts", items: ["DHI Choi technique", "Up to 1,800 grafts", "Three days at clinic", "PRP follow-up", "Twelve-month topical plan"], cta: "Book a consult" },
      { tier: "Frontal + crown", italic: "Most DHI patients", amount: "9,400", from: "AUD · from", small: "Up to 2,800 grafts", items: ["DHI Choi technique", "Frontal + crown coverage", "Five nights in private villa", "Daily nursing follow-up", "Three-session PRP", "Twelve-month topical plan"], cta: "Plan your journey", featured: true },
      { tier: "Combined approach", italic: "DHI + sapphire FUE", amount: "11,800", from: "AUD · from", small: "Mixed technique for best result", items: ["DHI for crown / tight angles", "Sapphire FUE for body of restoration", "Five nights in private villa", "Comprehensive nursing follow-up", "Twelve-month maintenance"], cta: "Plan your journey" },
    ],
    faqs: [
      { q: "DHI or sapphire FUE — which is better?", a: "Neither in isolation. DHI excels at high-density and tight-angle work (crown, frontotemporal); sapphire FUE remains the workhorse for large-scale hairline restoration. We frequently combine both in a single session." },
      { q: "Does it cost more?", a: "Yes — DHI is more time-intensive per graft. The premium is justified for patients whose anatomy specifically benefits; otherwise sapphire FUE is the better-value choice." },
      { q: "Will the donor area look any different?", a: "No — donor harvesting is the same as standard FUE; only the implantation differs." },
      { q: "How is it for women?", a: "Particularly good for women, because the recipient area doesn't need to be shaved as aggressively as with sapphire FUE — DHI accommodates longer existing hair." },
      { q: "Recovery any different?", a: "Identical to sapphire FUE." },
    ],
  },

  "prp-scalp": {
    parent: "hair", slug: "prp-scalp", title: "PRP Scalp Therapy",
    tagline: "Stimulated, supported.",
    short: "Platelet-rich plasma microinjections to support follicular health — three-session protocol.",
    priceFrom: "AUD 680",
    chapterTitle: ["Stimulated,", "supported."],
    sections: [
      { id: "overview", t: "Overview", body: "PRP scalp therapy uses growth factors from your own blood, microinjected into the scalp to stimulate follicular activity. It works best as a supportive treatment for early thinning, or alongside transplantation to enhance graft survival and existing-hair preservation." },
      { id: "consultation", t: "The consultation", body: "We assess donor density, miniaturisation, and your history. PRP is most useful for patients with active follicles that are weakening — not for completely bald areas, where transplantation is the only solution." },
      { id: "approach", t: "Our approach", body: "Double-spin PRP injected across the scalp on a fine grid. Three sessions, one month apart, is the standard protocol. We typically combine with a topical regimen (minoxidil) and oral support (finasteride for men) where appropriate." },
      { id: "theatre", t: "The procedure", body: "Sixty-minute appointment per session. Topical anaesthetic; mild scalp tingling during injection." },
      { id: "recovery", t: "Recovery", body: "Mild redness for several hours. Wash hair the next morning. No restrictions. Results — slowed shedding, regrowth of weakened hairs — over three to six months." },
    ],
    pricing: [
      { tier: "Single session", italic: "Trial treatment", amount: "680", from: "AUD · from", small: "One session", items: ["Single PRP scalp session", "Double-spin technique", "Topical anaesthesia", "Six-week review"], cta: "Book a session" },
      { tier: "Three-session course", italic: "Standard protocol", amount: "1,800", from: "AUD · from", small: "Three sessions month apart", items: ["Three sessions, one month apart", "Double-spin PRP", "Take-home minoxidil", "Reviews at each session"], cta: "Plan a course", featured: true },
      { tier: "Annual programme", italic: "Sustained support", amount: "3,200", from: "AUD · from", small: "Six sessions over twelve months", items: ["Six PRP sessions", "Quarterly trichoscopy reviews", "Topical and oral support included", "Twelve-month outcome tracking"], cta: "Plan a programme" },
    ],
    faqs: [
      { q: "Will I see hair growth?", a: "PRP works best at slowing loss and improving the quality of existing hair, rather than creating new follicles. Some early-stage thinning patients see modest regrowth; advanced loss usually doesn't respond to PRP alone." },
      { q: "Is it a substitute for hair transplant?", a: "Sometimes — for patients in early thinning. For more established loss, PRP is best as a supportive therapy alongside transplantation, not a replacement." },
      { q: "Is it painful?", a: "Mild discomfort during injection, manageable with topical anaesthetic. Most patients tolerate it well." },
      { q: "Combined with medication?", a: "Yes — typically with topical minoxidil (Rogaine) and oral finasteride for men. The combination significantly outperforms PRP alone." },
      { q: "How long do results last?", a: "Effects build over three sessions and last six to nine months. Maintenance every six months is standard." },
    ],
  },

  // ============================================================
  // DENTAL (parent: dental)
  // ============================================================
  "porcelain-veneers": {
    parent: "dental", slug: "porcelain-veneers", title: "Porcelain Veneers",
    tagline: "Refined, never replaced.",
    short: "Pressed lithium disilicate veneers — placed individually over three visits, fourteen days.",
    priceFrom: "AUD 980",
    chapterTitle: ["Refined,", "never replaced."],
    sections: [
      { id: "overview", t: "Overview", body: "Porcelain veneers are thin shells of pressed ceramic bonded to the front surface of the teeth. They reshape, brighten, and refine the smile while preserving the natural tooth structure beneath. Done well, they look indistinguishable from natural teeth." },
      { id: "consultation", t: "The consultation", body: "We begin with a smile design consult: 3D scan, photography, and a discussion of what you would like to keep and what to refine. We produce a digital preview within 48 hours, then a wax-up that we translate into your mouth via a temporary 'mock-up' you can live with for a day before committing." },
      { id: "approach", t: "Our approach", body: "We work in pressed lithium disilicate (e.max) and feldspathic porcelain, with our ceramicist on-site to refine shade and translucency. Veneer thickness is minimal — between 0.3 and 0.5 mm — preserving as much natural tooth as possible. We place veneers individually, never in a 'snap-on' arch." },
      { id: "theatre", t: "The procedure", body: "Three visits over fourteen days: scan and prep, try-in, and final placement. Local anaesthetic; comfortable throughout." },
      { id: "recovery", t: "Recovery", body: "Mild gum tenderness for one to two days. No diet restrictions after twenty-four hours. Final adjustments at the two-week review." },
    ],
    pricing: [
      { tier: "Per tooth", italic: "Pricing per veneer", amount: "980", from: "AUD · from", small: "Pressed lithium disilicate", items: ["One pressed-porcelain veneer", "Smile design consult", "Try-in appointment", "Five-year warranty"], cta: "Book a consult" },
      { tier: "Smile design (8)", italic: "Most patients begin here", amount: "9,800", from: "AUD · from", small: "Eight veneers", items: ["Eight veneers across smile line", "Smile design & wax-up", "On-site ceramicist refinement", "Three visits over 14 days", "Five-year warranty"], cta: "Plan your smile", featured: true },
      { tier: "Comprehensive (12)", italic: "Full smile transformation", amount: "13,800", from: "AUD · from", small: "Twelve veneers", items: ["Twelve veneers", "Comprehensive smile design", "On-site ceramicist refinement", "Whitening of remaining teeth", "Five-year warranty"], cta: "Plan your smile" },
    ],
    faqs: [
      { q: "How many veneers will I need?", a: "Most patients require six to ten veneers across the visible smile line. We recommend the minimum that achieves a natural, balanced result. Less is more." },
      { q: "Will my veneers look natural?", a: "Yes. Our ceramicist refines shade and translucency on-site. We always do a try-in appointment before final placement, so you can see the smile in your face before we commit." },
      { q: "How long do they last?", a: "Pressed porcelain veneers, well-maintained, last fifteen to twenty years. We provide a five-year warranty against fracture or de-bond." },
      { q: "Will my teeth be filed down?", a: "Yes — minimally. Between 0.3 and 0.5 mm of enamel is removed to make room for the veneer. This is irreversible, which is why we are conservative about who needs them." },
      { q: "Can I have them removed later?", a: "Veneers themselves can be removed, but the underlying tooth has been prepped — you cannot return to fully-natural teeth. Plan accordingly." },
      { q: "What if one chips?", a: "Single veneers can be replaced. Our five-year warranty covers fracture or de-bond from manufacturing or placement issues." },
    ],
  },

  "composite-veneers": {
    parent: "dental", slug: "composite-veneers", title: "Composite Veneers",
    tagline: "Same-day, considered.",
    short: "Direct composite veneers — placed in a single appointment, ideal for minor corrections.",
    priceFrom: "AUD 480",
    chapterTitle: ["Same-day,", "considered."],
    sections: [
      { id: "overview", t: "Overview", body: "Composite veneers are tooth-coloured resin sculpted directly onto the front of the tooth in a single appointment. Less durable than porcelain but reversible and quicker — a good fit for minor corrections, younger patients, or those wanting to test a change before committing to porcelain." },
      { id: "consultation", t: "The consultation", body: "Smile design with photographs and 3D scan, similar to porcelain. The result is more sculptural and less reflective than porcelain — beautiful in the right hands, less suited to high-shine perfectionists." },
      { id: "approach", t: "Our approach", body: "Layered composite technique with multiple shades to mimic the depth and translucency of natural teeth. Hand-sculpted by Dr. Kusuma personally; finishing and polishing follow on the same day." },
      { id: "theatre", t: "The procedure", body: "Two- to three-hour appointment per arch. Local anaesthetic for sensitive patients; not strictly required as no enamel is typically removed." },
      { id: "recovery", t: "Recovery", body: "None. Eat normally from one hour post-treatment. Avoid staining foods (red wine, coffee, turmeric) for the first 24 hours." },
    ],
    pricing: [
      { tier: "Per tooth", italic: "Targeted correction", amount: "480", from: "AUD · from", small: "Single composite veneer", items: ["One composite veneer", "Hand-layered technique", "Same-day completion", "Two-year warranty"], cta: "Book a consult" },
      { tier: "Smile (8)", italic: "Most patients", amount: "3,400", from: "AUD · from", small: "Eight composite veneers", items: ["Eight composite veneers", "Smile design consult", "Same-day completion", "Two-year warranty", "Whitening of remaining teeth"], cta: "Plan your smile", featured: true },
      { tier: "Full upper smile", italic: "Twelve veneers", amount: "4,800", from: "AUD · from", small: "Comprehensive composite", items: ["Twelve composite veneers", "Smile design consult", "Same-day completion", "Two-year warranty"], cta: "Plan your smile" },
    ],
    faqs: [
      { q: "Composite or porcelain — which is right?", a: "Composite for minor corrections, younger patients, or those who want to test a change. Porcelain for durability, perfection, and patients who can invest in a longer-term solution." },
      { q: "How long do composite veneers last?", a: "Five to seven years, then typically need refinishing or replacement. Porcelain lasts twice as long but costs more upfront." },
      { q: "Do they stain?", a: "Yes, more than porcelain. Avoid heavy red wine and coffee where possible; we provide a polishing maintenance protocol every twelve months." },
      { q: "Can I have them removed?", a: "Yes — composite is fully reversible. Unlike porcelain, no enamel is typically removed, so your natural teeth remain underneath." },
      { q: "Same-day completion really?", a: "Yes — sculpted directly in your mouth in a single appointment. No lab work, no temporaries." },
    ],
  },

  "clear-alignment": {
    parent: "dental", slug: "clear-alignment", title: "Clear Alignment",
    tagline: "Aligned, invisibly.",
    short: "Bespoke clear aligner therapy for mild-to-moderate alignment concerns — six to nine months.",
    priceFrom: "AUD 4,800",
    chapterTitle: ["Aligned,", "invisibly."],
    sections: [
      { id: "overview", t: "Overview", body: "Clear aligners (Invisalign and equivalents) are removable, transparent trays that progressively reposition the teeth. They suit mild-to-moderate alignment concerns and are nearly invisible in wear — ideal for adults who don't want traditional braces." },
      { id: "consultation", t: "The consultation", body: "Comprehensive scan, X-rays, and digital treatment plan. We will show you a 3D simulation of what your teeth will look like at the end of the programme. Most adult cases complete within six to nine months; complex cases may take twelve." },
      { id: "approach", t: "Our approach", body: "Invisalign and bespoke clear-aligner systems. We typically design with attachments — small tooth-coloured bumps bonded to the teeth that help the aligner grip — and IPR (interproximal reduction) where space is needed. Aligners are changed every one to two weeks." },
      { id: "theatre", t: "The procedure", body: "Initial fitting appointment (one hour), then six- to eight-week reviews. Most reviews can be done remotely after the initial fitting." },
      { id: "recovery", t: "Recovery", body: "Mild discomfort for two to three days each time you change to a new aligner. No diet restrictions (aligners are removed for eating). Final retainers worn nightly for life." },
    ],
    pricing: [
      { tier: "Mild correction", italic: "Limited movement", amount: "4,800", from: "AUD · from", small: "Up to 14 aligners", items: ["Up to 14 aligner trays", "Initial scan & treatment plan", "Comprehensive consult", "Final retainers included"], cta: "Book a consult" },
      { tier: "Standard", italic: "Most patients", amount: "6,400", from: "AUD · from", small: "Up to 28 aligners", items: ["Up to 28 aligner trays", "Comprehensive treatment plan", "Six- to nine-month duration", "Remote reviews between visits", "Final retainers included"], cta: "Plan a programme", featured: true },
      { tier: "Comprehensive", italic: "Significant movement", amount: "8,400", from: "AUD · from", small: "Up to 50 aligners", items: ["Full alignment programme", "Up to 50 aligner trays", "12-month duration", "Comprehensive support", "Final retainers and review included"], cta: "Plan a programme" },
    ],
    faqs: [
      { q: "How long does treatment take?", a: "Six to nine months for most adult cases; up to twelve for more complex cases. Compliance matters — aligners must be worn 22 hours a day to stay on schedule." },
      { q: "Can I have it remotely after the initial fitting?", a: "Yes — most of the work is at home. We require an initial in-person fitting and can review remotely thereafter, with one in-person check at the end." },
      { q: "Will I have a lisp?", a: "Some patients experience a brief lisp for the first few days while adapting to the aligners. It resolves quickly — most are unaffected." },
      { q: "Can I eat with them in?", a: "No — aligners are removed for eating and drinking (anything other than water). Brush and replace after meals." },
      { q: "What about retention?", a: "Final retainers worn nightly for life. Without retention, teeth slowly drift back. We provide retainers as part of every alignment programme." },
    ],
  },

  "professional-whitening": {
    parent: "dental", slug: "professional-whitening", title: "Professional Whitening",
    tagline: "Brightened, considered.",
    short: "In-chair whitening with take-home maintenance trays — single afternoon, lasting result.",
    priceFrom: "AUD 580",
    chapterTitle: ["Brightened,", "considered."],
    sections: [
      { id: "overview", t: "Overview", body: "Professional whitening combines a single in-chair high-strength treatment with take-home trays for graduated maintenance. The result is brighter teeth in a single afternoon, with a controlled programme to reach your goal shade over a fortnight." },
      { id: "consultation", t: "The consultation", body: "We assess existing shade, dental health, and any restorations (which won't whiten). Patients with sensitive teeth may pre-condition with desensitising toothpaste for two weeks before treatment." },
      { id: "approach", t: "Our approach", body: "Hydrogen peroxide gel applied in-chair under careful gum protection, activated by light. Take-home trays with carbamide peroxide are then provided for nightly use over the following week to two weeks." },
      { id: "theatre", t: "The procedure", body: "Ninety-minute in-chair appointment plus tray fitting. Comfortable; some patients experience temporary mild sensitivity that resolves within 48 hours." },
      { id: "recovery", t: "Recovery", body: "No restrictions other than avoiding deeply staining foods (red wine, coffee, turmeric) for 48 hours after each treatment. Final shade settles two weeks after completing the take-home programme." },
    ],
    pricing: [
      { tier: "Take-home only", italic: "Gradual approach", amount: "320", from: "AUD · from", small: "Custom trays + 14 days", items: ["Custom impression trays", "14-day carbamide peroxide gel", "Pre-treatment consult", "Two-week review"], cta: "Book a session" },
      { tier: "In-chair + take-home", italic: "Most patients", amount: "580", from: "AUD · from", small: "Single afternoon + 14 days", items: ["In-chair professional whitening", "Custom take-home trays", "14 days of maintenance gel", "Two-week review"], cta: "Book a session", featured: true },
      { tier: "Smile prep package", italic: "Before veneer or alignment", amount: "880", from: "AUD · from", small: "With cleaning + polish", items: ["Pre-treatment scale & polish", "In-chair whitening", "Take-home trays + 28 days gel", "Comprehensive review"], cta: "Book a session" },
    ],
    faqs: [
      { q: "How white will I get?", a: "Most patients lighten by four to six shades. We can show you on a shade chart what's realistic for your starting point." },
      { q: "Does it damage my enamel?", a: "Professional whitening at correct concentrations doesn't damage enamel. We control the gel under the gum line carefully and never exceed safe peroxide concentrations." },
      { q: "How long does it last?", a: "Two to three years typically, with maintenance gel touch-ups every six months. Smoking, heavy coffee, and red wine reduce longevity significantly." },
      { q: "Will my fillings or crowns whiten too?", a: "No — only natural tooth structure responds. Patients with visible restorations may want to plan whitening before any new restorations are placed, so they can be matched to the new shade." },
      { q: "Sensitive teeth — can I still have it?", a: "Yes — with pre-conditioning. Two weeks of desensitising toothpaste (Sensodyne, Colgate Sensitive Pro-Relief) before treatment significantly reduces post-whitening sensitivity." },
    ],
  },

  "smile-design-consult": {
    parent: "dental", slug: "smile-design-consult", title: "Smile Design Consult",
    tagline: "Considered, before committing.",
    short: "3D scan, photography, and digital preview within 48 hours — before you commit to any work.",
    priceFrom: "AUD 280",
    chapterTitle: ["Considered,", "before."],
    sections: [
      { id: "overview", t: "Overview", body: "Smile design is the planning phase that should always precede aesthetic dental work. It produces a digital preview of the proposed smile, lets you live with it (via temporary mock-ups) before committing, and ensures the final result is harmonious with your face — not just your teeth." },
      { id: "consultation", t: "The consultation", body: "A standalone consultation session with no obligation to proceed. We perform a comprehensive scan, take photographs from multiple angles, and discuss what you would refine and what you would preserve." },
      { id: "approach", t: "Our approach", body: "Digital Smile Design protocol: photographs analysed against facial proportions, 3D scan converted to a wax-up, and a digital preview produced within 48 hours. We can also produce a temporary mock-up directly on your teeth for you to live with for a day." },
      { id: "theatre", t: "The procedure", body: "Sixty-minute consultation. The deliverable — the digital preview and treatment plan — arrives by email within two days." },
      { id: "recovery", t: "Recovery", body: "None — this is consultation only." },
    ],
    pricing: [
      { tier: "Digital consult", italic: "Plan only", amount: "280", from: "AUD · from", small: "Scan, photos, digital preview", items: ["3D intraoral scan", "Comprehensive photography", "Digital preview within 48 hours", "Written treatment plan"], cta: "Book a consult" },
      { tier: "With mock-up", italic: "See it on your teeth", amount: "480", from: "AUD · from", small: "With temporary preview", items: ["Everything in digital consult", "Temporary mock-up in your mouth", "Photographs of mock-up", "Live with it for a day"], cta: "Book a consult", featured: true },
      { tier: "Comprehensive", italic: "For complex cases", amount: "780", from: "AUD · from", small: "Multi-disciplinary plan", items: ["Smile design + ortho assessment", "Multi-modality plan", "Mock-up included", "Two follow-up consultations"], cta: "Book a consult" },
    ],
    faqs: [
      { q: "Is the consultation cost deducted from the final treatment?", a: "Yes — if you proceed with treatment within twelve months, the consultation fee is credited against the work." },
      { q: "How long does the mock-up last?", a: "We make it removable so you can take it off and live with it on and off for a day. It's a try-on, not a temporary." },
      { q: "Can I get just the consult, no treatment?", a: "Yes. Many patients use the consultation to make decisions about whether and when to proceed. We don't pressure for follow-on treatment." },
      { q: "What does the digital preview look like?", a: "A photograph of your face with the proposed smile rendered in place, alongside before/after comparisons. We share it as a PDF and a video walkthrough." },
      { q: "Combined with other treatments?", a: "The smile design consult is the ideal starting point for any dental aesthetic work — veneers, alignment, whitening, or combinations." },
    ],
  },

  // ============================================================
  // RECOVERY & WELLNESS (parent: recovery)
  // ============================================================
  "recovery-villa-stays": {
    parent: "recovery", slug: "recovery-villa-stays", title: "Recovery Villa Stays",
    tagline: "A retreat, not a ward.",
    short: "Hand-selected private villas in Nusa Dua, Ubud, Sanur, and Jimbaran — fully provisioned, daily nursing available.",
    priceFrom: "AUD 280 / night",
    chapterTitle: ["A retreat,", "not a ward."],
    sections: [
      { id: "overview", t: "Overview", body: "Most of our patients recover not in hospital, but in a private villa or resort suite that we have hand-selected and provisioned for healing. The change in environment — from clinical to domestic, from bright to soft, from busy to quiet — makes a real difference to how recovery feels." },
      { id: "consultation", t: "The consultation", body: "Your concierge selects the right villa for your case: location (proximity to clinic, beach access, climate), bedrooms (solo, couple, family), and amenities (private pool, full kitchen, in-villa spa). The villa is provisioned before your arrival." },
      { id: "approach", t: "Our approach", body: "We work with a small portfolio of properties we know well. Every villa is inspected quarterly by our concierge team. We provision groceries, linens, and any specific requests so the villa is ready the moment you arrive." },
      { id: "theatre", t: "The arrival", body: "Met at the airport, driven directly to the villa. Welcome by your concierge; nursing schedule confirmed. We do not ask you to make any decisions on the day of arrival." },
      { id: "recovery", t: "During the stay", body: "Daily nursing visits in the first week, every-second-day from week two. Drivers on call for follow-up appointments. Your concierge is reachable on WhatsApp 24/7 — meals, prescriptions, paperwork, anything." },
    ],
    pricing: [
      { tier: "Five-night villa", italic: "Non-surgical / short surgical", amount: "1,800", from: "AUD · from", small: "Villa + 3 nursing visits", items: ["Five nights private villa", "Three nursing visits", "Welcome provisioning", "Driver on call", "Twelve-month follow-up"], cta: "Add to plan" },
      { tier: "Ten-night programme", italic: "Most surgical patients", amount: "3,400", from: "AUD · from", small: "Villa + nursing + wellness", items: ["Ten nights private villa", "Seven nursing visits", "Three lymphatic drainage", "Post-op nutrition plan", "Family accommodation included"], cta: "Plan a stay", featured: true },
      { tier: "Two-week retreat", italic: "Larger surgery, slower recovery", amount: "4,800", from: "AUD · from", small: "14-night programme", items: ["Fourteen nights private villa", "Daily nursing", "Six lymphatic drainage", "Daily nutrition plan", "Three physiotherapy sessions", "Concierge throughout"], cta: "Plan a retreat" },
    ],
    faqs: [
      { q: "Do I need a villa, or can I stay in a hotel?", a: "Hotels work for non-surgical and very short recoveries. For surgical recovery, villas are strongly preferred — privacy, quiet, and proximity to nursing matter more than amenities." },
      { q: "Can my family stay with me?", a: "Yes, and we encourage it. Most of our villas have two to four bedrooms and accommodate partners, children, or carers at no additional cost beyond meal provisioning." },
      { q: "What about food?", a: "Our nutritionist prepares a post-operative meal plan, prepared in-villa daily. Raw food, alcohol, and inflammatory ingredients avoided in the first ten days; everything else is up to you." },
      { q: "Is there a pool?", a: "Almost every villa we work with has a private pool. We restrict swimming until cleared by your surgeon — typically two weeks for surgical patients." },
      { q: "Internet?", a: "Yes — full wifi and a local SIM with data are provided. Most patients work remotely (gently) from week two onwards." },
    ],
  },

  "in-villa-nursing": {
    parent: "recovery", slug: "in-villa-nursing", title: "In-Villa Nursing",
    tagline: "Quietly, daily.",
    short: "Registered nurse visits to your villa for dressings, observations, and gentle physiotherapy — daily for the first week.",
    priceFrom: "AUD 180 / visit",
    chapterTitle: ["Quietly,", "daily."],
    sections: [
      { id: "overview", t: "Overview", body: "A registered nurse visits your villa each morning during the early recovery phase: dressings, observations, gentle physiotherapy where appropriate, and a quiet check-in. Most surgical recoveries do not require hospital readmission — but they do require careful, daily clinical attention, which is what this gives." },
      { id: "consultation", t: "The consultation", body: "Schedule confirmed at admission. Daily visits in week one for surgical patients; alternate days from week two. We adjust based on progress and surgeon recommendation." },
      { id: "approach", t: "Our approach", body: "Our nurses are BIMC-trained and English-fluent (with Bahasa, Mandarin, and Japanese available). They carry a full kit — sterile dressings, observation equipment, anti-emetics, basic analgesia. Anything more, your concierge coordinates with your surgeon directly." },
      { id: "theatre", t: "The visits", body: "Each visit is 45-60 minutes — dressings, observations, conversation, a brief gentle physiotherapy session if appropriate. Always in the morning so the rest of your day is yours." },
      { id: "recovery", t: "Continuing care", body: "Once you fly home, our care continues by video — five scheduled follow-ups in the twelve months that follow, plus unlimited WhatsApp." },
    ],
    pricing: [
      { tier: "Single visit", italic: "Drop-in care", amount: "180", from: "AUD · from", small: "Per visit", items: ["Single nursing visit", "Up to 60 minutes", "Dressings and observations", "Notes shared with surgeon"], cta: "Add to plan" },
      { tier: "Week one", italic: "Most surgical patients", amount: "1,200", from: "AUD · from", small: "Daily for 7 days", items: ["Seven daily nursing visits", "Up to 60 minutes each", "Surgeon liaison included", "Schedule adjustments as needed"], cta: "Add to plan", featured: true },
      { tier: "Two-week programme", italic: "Comprehensive care", amount: "2,000", from: "AUD · from", small: "14-day programme", items: ["Daily visits in week one", "Alternate-day visits in week two", "Lymphatic drainage included", "Surgeon liaison and reviews"], cta: "Add to plan" },
    ],
    faqs: [
      { q: "Are nursing visits included in surgical packages?", a: "Yes — every surgical package includes the standard nursing programme. The pricing here applies if you wish to add visits beyond the standard, or to a non-surgical stay." },
      { q: "Do nurses speak English?", a: "All of our nurses are English-fluent. Bahasa, Mandarin, and Japanese are available on request." },
      { q: "What if I need urgent care between visits?", a: "Your concierge is reachable on WhatsApp 24/7. We can have a nurse at your villa within thirty minutes for anything urgent — and your surgeon within an hour." },
      { q: "What does a nurse actually do during a visit?", a: "Removes and replaces dressings, takes observations (BP, temperature, oxygen), checks wound healing, provides medication if prescribed, and does any gentle physiotherapy your surgeon has recommended." },
      { q: "Can the nurse run errands or go shopping?", a: "Nurses do not provide non-clinical concierge services. Your concierge handles errands, prescriptions, and shopping separately." },
    ],
  },

  "lymphatic-drainage": {
    parent: "recovery", slug: "lymphatic-drainage", title: "Manual Lymphatic Drainage",
    tagline: "The quietest gain.",
    short: "Specialist post-operative therapy to reduce swelling and accelerate healing — three to six sessions.",
    priceFrom: "AUD 140 / session",
    chapterTitle: ["The quietest", "gain."],
    sections: [
      { id: "overview", t: "Overview", body: "Manual lymphatic drainage (MLD) is a specialised gentle massage technique that supports the lymphatic system in clearing post-operative swelling, reducing bruising, and accelerating healing. It's most useful in the first three weeks after surgery — particularly for body-contouring patients." },
      { id: "consultation", t: "The consultation", body: "Sessions begin from day three to five post-procedure (depending on surgery type and surgeon recommendation). We adjust pressure, technique, and frequency based on your specific case." },
      { id: "approach", t: "Our approach", body: "Our therapists are certified in Vodder and Leduc methods. Sessions take 60-75 minutes and are performed in your villa, which means no driving and no waiting room." },
      { id: "theatre", t: "The session", body: "Light, rhythmic strokes that move lymph toward functioning nodes. Many patients describe a deep relaxation; some fall asleep. The work is therapeutic, not vigorous." },
      { id: "recovery", t: "After", body: "No restrictions; the gentle nature of MLD means no recovery is needed from the session itself. Most patients schedule three to six sessions over their first three weeks." },
    ],
    pricing: [
      { tier: "Single session", italic: "Trial therapy", amount: "140", from: "AUD · from", small: "Per session", items: ["Single 60-min session", "Vodder or Leduc method", "Performed in your villa"], cta: "Add to plan" },
      { tier: "Three-session course", italic: "Standard protocol", amount: "380", from: "AUD · from", small: "Three sessions", items: ["Three sessions", "Performed in your villa", "Coordinated with nursing visits", "Surgeon liaison"], cta: "Add to plan", featured: true },
      { tier: "Six-session programme", italic: "Body contouring patients", amount: "720", from: "AUD · from", small: "Comprehensive support", items: ["Six 60-75 minute sessions", "Comprehensive recovery support", "Performed in your villa", "Adjusted pressure as healing progresses"], cta: "Add to plan" },
    ],
    faqs: [
      { q: "Is MLD really worth it after surgery?", a: "For body contouring (liposculpture, abdominoplasty, thigh lift), yes — patients with MLD have measurably less swelling and faster recovery than those without. For breast and facial procedures the benefit is more modest." },
      { q: "When can I start?", a: "Day three to five post-surgery in most cases. Earlier is too soon (active inflammation needs to settle); later than two weeks reduces benefit." },
      { q: "How many sessions do I need?", a: "Three is standard for most procedures; six for body contouring. Beyond six, marginal benefit drops." },
      { q: "Is it painful?", a: "No — MLD is light and rhythmic. Most patients describe deep relaxation. If a therapist is using significant pressure, it isn't MLD." },
      { q: "Can my partner watch a session and learn?", a: "Yes, and we encourage it. We can teach simple maintenance techniques you can continue at home." },
    ],
  },

  "post-op-nutrition": {
    parent: "recovery", slug: "post-op-nutrition", title: "Post-Op Nutrition",
    tagline: "Healing, considered.",
    short: "Bespoke meal plan prepared in-villa daily — anti-inflammatory, protein-rich, healing-supportive.",
    priceFrom: "AUD 80 / day",
    chapterTitle: ["Healing,", "considered."],
    sections: [
      { id: "overview", t: "Overview", body: "What you eat after surgery materially affects how you heal. Our nutritionist designs a daily meal plan based on your procedure, dietary restrictions, and preferences — anti-inflammatory, protein-rich, and tailored to support tissue repair." },
      { id: "consultation", t: "The consultation", body: "We discuss preferences, allergies, and any specific requirements (vegetarian, vegan, halal, kosher, gluten-free) at intake. The plan is updated as healing progresses." },
      { id: "approach", t: "Our approach", body: "First ten days: anti-inflammatory protocol with high protein, omega-3s, vitamin C, and zinc. Avoiding raw food, alcohol, and processed sugars. From day eleven: gradual return to a broader diet, with continued emphasis on collagen-supporting nutrition." },
      { id: "theatre", t: "Delivery", body: "Meals prepared in your villa daily by an in-house chef coordinated through our nutrition team. Fresh ingredients sourced locally; menus rotate daily." },
      { id: "recovery", t: "Continuing", body: "Take-home guidelines and a four-week recipe book ensure your home recovery continues to support healing once you fly home." },
    ],
    pricing: [
      { tier: "Daily nutrition", italic: "Per day", amount: "80", from: "AUD · from", small: "All meals + snacks", items: ["Three meals + two snacks daily", "Bespoke meal plan", "Local ingredients", "Updated as healing progresses"], cta: "Add to plan" },
      { tier: "Ten-day programme", italic: "Most patients", amount: "750", from: "AUD · from", small: "Standard recovery period", items: ["Ten days of bespoke nutrition", "Initial nutrition consult", "Healing-phase protocol", "Take-home recipe book"], cta: "Add to plan", featured: true },
      { tier: "Two-week programme", italic: "Extended recovery", amount: "1,000", from: "AUD · from", small: "14-day programme", items: ["Fourteen days of bespoke nutrition", "Two nutrition consults", "Phased protocol (recovery → return)", "Take-home recipe book and follow-up call"], cta: "Add to plan" },
    ],
    faqs: [
      { q: "Why does post-op nutrition matter?", a: "Surgery is metabolically demanding. Protein supports tissue repair; vitamin C and zinc support collagen formation; omega-3s reduce inflammation. The right nutrition shortens recovery and improves outcomes." },
      { q: "Vegetarian / vegan / halal / kosher?", a: "All accommodated. Plant-based protein protocols work well — our nutritionist designs accordingly." },
      { q: "Do I have to follow it strictly?", a: "Recommend yes for the first ten days; flexible thereafter. Most patients find the meals delicious and naturally stick with the plan." },
      { q: "What about alcohol?", a: "We strongly discourage alcohol for the first ten days. It impairs healing and interacts with most pain medications." },
      { q: "Is it included in surgical packages?", a: "Provisioning and basic nutrition is included in surgical villa stays. The dedicated bespoke nutrition programme — daily chef-prepared meals — is an add-on." },
    ],
  },

  "gentle-physiotherapy": {
    parent: "recovery", slug: "gentle-physiotherapy", title: "Gentle Physiotherapy",
    tagline: "Returning, gradually.",
    short: "From day three — physiotherapy tailored to your specific procedure and progress.",
    priceFrom: "AUD 160 / session",
    chapterTitle: ["Returning,", "gradually."],
    sections: [
      { id: "overview", t: "Overview", body: "Light physiotherapy from day three of recovery prevents stiffness, supports lymphatic flow, and helps return you to normal movement safely. Our physiotherapists work with our surgeons on every patient's plan." },
      { id: "consultation", t: "The consultation", body: "We tailor the protocol to your specific procedure: facelift patients work on neck mobility; abdominoplasty patients on gentle abdominal awareness; body-contouring patients on overall mobility and posture." },
      { id: "approach", t: "Our approach", body: "Sessions take 45 minutes, performed in your villa or in our therapy room. Slow, supported movement; never pushing. We coordinate closely with your surgeon's restrictions." },
      { id: "theatre", t: "The session", body: "Assessment, gentle mobilisation, light stretching, breathing work where relevant. Patients often combine with lymphatic drainage in adjacent appointments." },
      { id: "recovery", t: "After", body: "Take-home routines for between sessions. Gradual progression as recovery permits — most patients return to light gym work at six weeks, full activity at twelve." },
    ],
    pricing: [
      { tier: "Single session", italic: "Targeted help", amount: "160", from: "AUD · from", small: "Per session", items: ["Single 45-min session", "Performed in villa or studio", "Coordinated with surgeon"], cta: "Add to plan" },
      { tier: "Three-session course", italic: "Most patients", amount: "440", from: "AUD · from", small: "Three sessions", items: ["Three sessions over recovery", "Take-home routines", "Surgeon liaison"], cta: "Add to plan", featured: true },
      { tier: "Six-session programme", italic: "Comprehensive return", amount: "840", from: "AUD · from", small: "Through full recovery", items: ["Six sessions through recovery", "Phased progression", "Take-home routines and follow-up call", "Coordinated with surgeon"], cta: "Add to plan" },
    ],
    faqs: [
      { q: "How early can I start?", a: "Day three for most procedures; earlier is too soon. Some patients (rhinoplasty, eyelids) don't need physiotherapy at all; we will tell you honestly." },
      { q: "Is it painful?", a: "Should be gentle and supported. Some discomfort with movement is normal in the first weeks; sharp or significant pain means we stop and reassess." },
      { q: "Can I do my own physio at home?", a: "Yes — we'll give you take-home routines. Most patients still benefit from one or two supervised sessions to ensure technique and pacing are right." },
      { q: "When can I exercise normally?", a: "Walking from day one. Light cardio at three weeks. Weight training and high-intensity at six to eight weeks for most procedures (longer for body-contouring)." },
      { q: "Do you work with my home physiotherapist after I fly back?", a: "Yes — we share notes and a protocol with any practitioner you nominate." },
    ],
  },

  "aftercare-followup": {
    parent: "recovery", slug: "aftercare-followup", title: "Aftercare Follow-up",
    tagline: "Twelve months, considered.",
    short: "Five scheduled video reviews and unlimited messaging — included with every surgical package.",
    priceFrom: "Included",
    chapterTitle: ["Twelve months,", "considered."],
    sections: [
      { id: "overview", t: "Overview", body: "Surgery is a journey that doesn't end at the airport. Our aftercare programme includes five scheduled video follow-ups in the twelve months after your procedure — and unlimited WhatsApp access to your concierge throughout. It is included as standard with every surgical package." },
      { id: "consultation", t: "The consultation", body: "Schedule confirmed at discharge: one-week, one-month, three-month, six-month, and twelve-month video reviews. Additional video calls available on request without charge." },
      { id: "approach", t: "Our approach", body: "Each review is a structured 30-minute video call with your surgeon: progress photographs, healing assessment, scar review, and conversation. We document everything; you receive notes after each call." },
      { id: "theatre", t: "Between reviews", body: "Your concierge is reachable on WhatsApp 24/7. Photographs of healing progress, questions about wound care, requests for prescription refills — all handled directly." },
      { id: "recovery", t: "Beyond twelve months", body: "Many of our patients keep their concierge's WhatsApp on speed dial for years. We don't formally end the relationship at twelve months — we just stop scheduling reviews." },
    ],
    pricing: [
      { tier: "Standard", italic: "With every surgical package", amount: "0", from: "Included", small: "Twelve-month programme", items: ["Five scheduled video follow-ups", "Unlimited WhatsApp access", "Photograph reviews", "Onward referrals if needed"], cta: "Begin enquiry" },
      { tier: "Extended", italic: "Five-year programme", amount: "880", from: "AUD · from", small: "Beyond standard year", items: ["Annual video reviews for 5 years", "Unlimited WhatsApp throughout", "Returning-patient priority", "Always the same concierge"], cta: "Add to plan", featured: true },
      { tier: "Lifetime", italic: "For combined-treatment patients", amount: "On request", from: "By referral", small: "Bespoke", items: ["Open-ended access", "Same concierge for life", "Annual photograph reviews", "Onward care coordination globally"], cta: "Discuss privately" },
    ],
    faqs: [
      { q: "Does the standard programme cover everything?", a: "Yes — the included programme covers every typical follow-up. Patients with complex cases or multiple procedures may benefit from extending." },
      { q: "Can I see a different surgeon than the one who operated?", a: "Yes if needed — but we strongly prefer the same surgeon throughout. Continuity matters." },
      { q: "What if I have a complication after I fly home?", a: "Reach out immediately on WhatsApp. We coordinate any onward care needed at your local hospital, share notes, and arrange revision visits if required." },
      { q: "Do you charge for additional consultations?", a: "Within twelve months: no. Beyond twelve months: only if extended care is needed beyond standard follow-up scope." },
      { q: "What about photographs?", a: "We take comprehensive before and after photographs as part of every procedure. Reviews include comparing photographs at each milestone." },
    ],
  },

  // ============================================================
  // CONCIERGE (parent: concierge)
  // ============================================================
  "airport-transfers": {
    parent: "concierge", slug: "airport-transfers", title: "Airport Transfers",
    tagline: "Met, by name.",
    short: "Black-car service to villa or hotel — your concierge is at the gate.",
    priceFrom: "Included",
    chapterTitle: ["Met,", "by name."],
    sections: [
      { id: "overview", t: "Overview", body: "Every patient is met personally at Ngurah Rai International Airport by their concierge, with a black-car driver. We handle baggage, immigration questions, currency, anything that needs handling. You will not need to think about logistics on the day you arrive." },
      { id: "consultation", t: "The consultation", body: "Flight details shared at booking. We meet you at arrivals — concierge holding a discrete card with your name; driver waiting in the secure pickup area." },
      { id: "approach", t: "Our approach", body: "Black-car service via vetted partner drivers. English- and Bahasa-fluent. Vehicles are air-conditioned, comfortable for post-procedure travel where relevant, and equipped with water and small refreshments." },
      { id: "theatre", t: "The journey", body: "Direct to your villa or hotel — typically twelve to forty-five minutes from the airport depending on your stay location. We do not stop unless you ask us to." },
      { id: "recovery", t: "Departure", body: "We collect you with sufficient buffer for international check-in. Help with luggage, escort to the gate area where appropriate." },
    ],
    pricing: [
      { tier: "Standard", italic: "With every surgical package", amount: "0", from: "Included", small: "Two-way transfers", items: ["Arrival meet & greet", "Black-car to villa or hotel", "Departure pickup with buffer", "English- and Bahasa-fluent driver"], cta: "Begin enquiry" },
      { tier: "Family transfer", italic: "Multi-passenger", amount: "180", from: "AUD · from", small: "For larger groups", items: ["Larger vehicle for 4+ passengers", "Arrival and departure", "Concierge escort"], cta: "Add to plan", featured: true },
      { tier: "Bespoke", italic: "VIP arrivals", amount: "On request", from: "By arrangement", small: "Private terminal, helicopter", items: ["VIP terminal access", "Helicopter transfer if requested", "Multi-vehicle convoy", "Airport-to-villa with photo or media discretion"], cta: "Discuss privately" },
    ],
    faqs: [
      { q: "Is this really included?", a: "Yes — for all surgical packages and most non-surgical packages. Single-treatment day visits may have a small transfer fee; we'll specify in your quote." },
      { q: "What if my flight is delayed?", a: "We track your flight in real-time. The driver and concierge wait — no rebooking required." },
      { q: "Can family travel with me?", a: "Yes — at no additional cost for up to three travelling companions in the same vehicle." },
      { q: "Will the concierge speak my language?", a: "English fluently always; Bahasa, Mandarin, or Japanese on advance request." },
      { q: "What about returning at the end of the trip?", a: "Same service in reverse: concierge collects from villa, driver to airport, escort through check-in if helpful." },
    ],
  },

  "visa-coordination": {
    parent: "concierge", slug: "visa-coordination", title: "Visa Coordination",
    tagline: "Smoothed, before you fly.",
    short: "Letters of support and visa-on-arrival assistance — included with every surgical package.",
    priceFrom: "Included",
    chapterTitle: ["Smoothed,", "before you fly."],
    sections: [
      { id: "overview", t: "Overview", body: "Most international patients enter Indonesia on visa-on-arrival or e-visa, which is straightforward — but not in every case. We provide letters of support and assistance with visa applications where useful, and we monitor regulatory changes that could affect your travel." },
      { id: "consultation", t: "The consultation", body: "Your concierge confirms visa requirements based on your nationality, intended stay length, and procedure type. We provide official letters of support from BIMC Hospital where the visa class requires it." },
      { id: "approach", t: "Our approach", body: "Most countries — Australia, NZ, UK, EU, US, Canada, Singapore, Japan, Korea — use visa-on-arrival or e-visa for stays under thirty days. Longer stays, or stays from countries without VOA agreements, require advance applications which we support." },
      { id: "theatre", t: "Arrival immigration", body: "Your concierge meets you airside before immigration where possible (some terminals don't permit), and is in radio contact with you throughout immigration if any questions arise." },
      { id: "recovery", t: "Extending if needed", body: "If recovery requires you to stay longer than your visa allows, we coordinate extensions or onward visa applications through Indonesian immigration." },
    ],
    pricing: [
      { tier: "Standard", italic: "With every package", amount: "0", from: "Included", small: "Letters of support", items: ["Letter of support from BIMC", "Visa-class advice", "Application support if needed", "Airside meet at immigration"], cta: "Begin enquiry" },
      { tier: "Extended-stay coordination", italic: "Beyond 30 days", amount: "180", from: "AUD · from", small: "For longer recoveries", items: ["Extended-stay visa application", "Indonesian immigration liaison", "Renewal coordination if needed"], cta: "Discuss with concierge", featured: true },
      { tier: "Bespoke", italic: "Complex cases", amount: "On request", from: "By arrangement", small: "Multi-country, family", items: ["Multi-country visa coordination", "Family member visas", "Long-stay residence options"], cta: "Discuss privately" },
    ],
    faqs: [
      { q: "Do I need a visa for Bali?", a: "Most nationalities can use visa-on-arrival or e-visa for stays up to 30 days. We confirm requirements based on your specific case at booking." },
      { q: "What about my passport?", a: "Six months' validity on entry is required. If yours is closer than that, renew before travel." },
      { q: "Will the visa be a problem if I look 'recovered'?", a: "Visa-on-arrival and e-visa are tourism categories. We don't recommend declaring medical purpose unless specifically asked, and we provide guidance at intake." },
      { q: "What if I'm refused entry?", a: "Extremely rare with our preparation, but if it happens, we manage the situation directly — we have hospital and immigration contacts to resolve quickly." },
      { q: "Do you handle visa for family members?", a: "Yes — included for up to three accompanying family members on the same itinerary." },
    ],
  },

  "translation-services": {
    parent: "concierge", slug: "translation-services", title: "Translation Services",
    tagline: "In your language.",
    short: "Bahasa, Mandarin, Japanese, Korean, French, Russian — at no extra charge during clinical appointments.",
    priceFrom: "Included",
    chapterTitle: ["In your", "language."],
    sections: [
      { id: "overview", t: "Overview", body: "All clinical conversations — consultations, pre-op, post-op, follow-ups — are available in Bahasa, Mandarin, Japanese, Korean, French, and Russian, in addition to English. We make sure clinical detail is never lost in translation." },
      { id: "consultation", t: "The consultation", body: "Preferred language confirmed at intake. Your concierge is matched to your language where possible; we bring in dedicated medical translators for clinical appointments where the concierge isn't fluent." },
      { id: "approach", t: "Our approach", body: "Medical translators (not general translators) for clinical content. Documents — consent forms, treatment plans, post-op instructions — translated into your preferred language. Family or non-clinical conversations in whichever language is comfortable." },
      { id: "theatre", t: "During visits", body: "Translator present at every clinical appointment. Discharge instructions provided in writing in your preferred language. Phone calls between translator and family if helpful." },
      { id: "recovery", t: "Beyond clinic", body: "WhatsApp contact with your concierge in your preferred language. Take-home materials translated where useful. Onward referrals coordinated in any language we share with the receiving practitioner." },
    ],
    pricing: [
      { tier: "Standard", italic: "Major languages", amount: "0", from: "Included", small: "EN, ID, ZH, JP, KO, FR, RU", items: ["Translation in clinical appointments", "Translated consent forms and discharge", "Concierge in your language where possible", "Medical translator for clinic visits"], cta: "Begin enquiry" },
      { tier: "Specialist languages", italic: "On request", amount: "On request", from: "By arrangement", small: "Less common languages", items: ["Translator for less-common languages", "Booked in advance", "Medical-grade interpretation", "Document translation"], cta: "Discuss with concierge", featured: true },
      { tier: "Family communication", italic: "Coordinating with carers", amount: "Included", from: "Included", small: "Family liaison", items: ["Family member updates in preferred language", "Three-way calls with home practitioners", "Translation of medical correspondence"], cta: "Discuss with concierge" },
    ],
    faqs: [
      { q: "What languages are covered as standard?", a: "English, Bahasa Indonesia, Mandarin Chinese, Japanese, Korean, French, and Russian are covered without extra charge." },
      { q: "What if I speak a less common language?", a: "We arrange dedicated translators on request. Most languages are available with one to two weeks' notice." },
      { q: "Do you translate written documents?", a: "Yes — consent forms, treatment plans, and discharge instructions in any of the standard languages without extra charge." },
      { q: "Is the translator present in surgery?", a: "Translator is present for the consent conversation immediately before surgery, and at the bedside as you wake up. They are not in the operating theatre itself." },
      { q: "Can my family back home receive updates in our language?", a: "Yes — your concierge can call or message family members during the procedure and recovery in any of our standard languages." },
    ],
  },

  "family-accommodation": {
    parent: "concierge", slug: "family-accommodation", title: "Family Accommodation",
    tagline: "Together, throughout.",
    short: "Coordination of accommodation, drivers, and meals for travelling partners or carers.",
    priceFrom: "From AUD 180 / night",
    chapterTitle: ["Together,", "throughout."],
    sections: [
      { id: "overview", t: "Overview", body: "Most of our villas accommodate two to four bedrooms — partners, parents, and children stay with you at no extra accommodation cost beyond catering. Where you would prefer a separate hotel or villa nearby, we coordinate that too." },
      { id: "consultation", t: "The consultation", body: "We confirm who is travelling at booking and adjust villa selection, provisioning, and meal planning accordingly. Family members can be quietly looked after without becoming the focus." },
      { id: "approach", t: "Our approach", body: "Our concierge coordinates: airport transfers for non-patients, drivers for excursions, restaurant bookings, activity recommendations. Family members can do as much or as little Bali tourism as suits the recovery — we adjust." },
      { id: "theatre", t: "During the stay", body: "Drivers available for non-patient excursions while the patient rests. Family-friendly activities recommended (Ubud temples, beach clubs, cooking classes). All discrete — your privacy is maintained." },
      { id: "recovery", t: "Bringing children", body: "We accommodate families with young children — extra beds, child-safe villa selection, paediatric care if needed. Some villas are better-suited than others." },
    ],
    pricing: [
      { tier: "Standard family stay", italic: "Same villa", amount: "180", from: "AUD · from / night", small: "Per additional guest, meals only", items: ["Same villa accommodation", "Daily provisioning per person", "Driver shared with patient", "Concierge support"], cta: "Add to plan" },
      { tier: "Separate accommodation", italic: "Hotel or adjacent villa", amount: "On request", from: "By arrangement", small: "Hotel coordination", items: ["Adjacent villa or hotel suite", "Dedicated driver if requested", "Booking and coordination handled", "Activities planning"], cta: "Discuss with concierge", featured: true },
      { tier: "Family programme", italic: "Bespoke for larger groups", amount: "On request", from: "By arrangement", small: "Multi-room, multi-driver", items: ["Multi-room villa or compound", "Multiple drivers", "Family activities curated", "Children's care if needed"], cta: "Discuss privately" },
    ],
    faqs: [
      { q: "Can my partner stay in the same villa?", a: "Yes — most of our villas have two or more bedrooms and easily accommodate a partner or parent at no extra accommodation cost." },
      { q: "What about children?", a: "Yes — we accommodate children of all ages, with paediatric support available if needed. Some villas are better suited to families; your concierge will recommend." },
      { q: "Can family members go on day trips while I'm in the clinic?", a: "Absolutely — we recommend it. Drivers, activity recommendations, and bookings are all coordinated by your concierge." },
      { q: "What if family wants their own privacy?", a: "We can arrange a separate adjacent villa or hotel suite. Many couples prefer the same villa; multi-generational families often prefer adjacent accommodations." },
      { q: "Is there a discount for family travel?", a: "We don't formally discount — but in practice, having family in the same villa shares the patient's already-paid villa cost, so the marginal cost is just provisioning." },
    ],
  },

  "twelve-month-telehealth": {
    parent: "concierge", slug: "twelve-month-telehealth", title: "Twelve-Month Telehealth",
    tagline: "We don't disappear.",
    short: "Five scheduled follow-up calls; unlimited WhatsApp messaging — for twelve months after you fly home.",
    priceFrom: "Included",
    chapterTitle: ["We don't", "disappear."],
    sections: [
      { id: "overview", t: "Overview", body: "Once you've flown home, our care continues for twelve months: five scheduled video reviews with your surgeon (one week, one month, three months, six months, twelve months), and unlimited WhatsApp messaging with your concierge throughout. It is included as standard with every surgical and most non-surgical packages." },
      { id: "consultation", t: "The consultation", body: "Schedule confirmed at discharge. Reviews are 30 minutes; we send calendar invitations across time-zones. Photographs requested ahead of each review for documented progress." },
      { id: "approach", t: "Our approach", body: "Reviews are with your operating surgeon, not a junior. Concierge available between reviews on WhatsApp 24/7 for any question — wound care, prescription refills, or just reassurance about whether what you're seeing is normal." },
      { id: "theatre", t: "During reviews", body: "Photographs reviewed; surgeon checks healing, scar quality, function, and any concerns you raise. Notes documented and shared with you afterwards. Onward referrals if needed (e.g. a local plastic surgeon for revision touch-ups)." },
      { id: "recovery", t: "Beyond twelve months", body: "Many of our patients keep WhatsApp contact for years. We don't formally end the relationship — we just stop scheduling reviews. Returning patients have priority access for new procedures." },
    ],
    pricing: [
      { tier: "Standard", italic: "Included", amount: "0", from: "Included", small: "12-month programme", items: ["Five scheduled video reviews", "Unlimited WhatsApp", "Photograph reviews", "Onward referrals if needed"], cta: "Begin enquiry" },
      { tier: "Five-year extended", italic: "Long-term care", amount: "880", from: "AUD · from", small: "Annual reviews to year five", items: ["Annual video reviews for five years", "Unlimited WhatsApp throughout", "Returning-patient priority", "Same concierge throughout"], cta: "Add to plan", featured: true },
      { tier: "Lifetime", italic: "Bespoke for combined-treatment patients", amount: "On request", from: "By referral", small: "Open-ended", items: ["Open-ended access", "Annual reviews", "Returning-patient priority", "Onward care globally"], cta: "Discuss privately" },
    ],
    faqs: [
      { q: "Why is this included?", a: "Because it should be. Cosmetic surgery is a year-long journey, not a procedure. Charging extra for follow-up incentivises rushing patients out the door, which we don't believe in." },
      { q: "What can I message about?", a: "Anything. Wound care, scar progress, returning to exercise, prescription questions, what's normal, what isn't. We'd rather you ask than worry." },
      { q: "What if I have a complication after I fly home?", a: "Reach out immediately. We coordinate with your local hospital, share notes, and arrange revision visits if required." },
      { q: "Same concierge throughout?", a: "Yes — your concierge stays with your case for at least the first twelve months, and usually much longer. Continuity is central to good care." },
      { q: "Onward care if I need it?", a: "Yes — we maintain a small network of trusted plastic surgeons and dermatologists in major cities globally and coordinate referrals at no charge." },
    ],
  },
};
