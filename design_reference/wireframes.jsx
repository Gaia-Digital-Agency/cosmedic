/* global React */
const { useState, useEffect, useRef } = React;

// ============================================================
// Sketchy primitives — placeholders, type, decorative scribbles
// ============================================================

const Box = ({ w = "100%", h = 80, label, ratio, style = {}, children, dashed = false, accent = false, tone = "neutral" }) => {
  const palette = {
    neutral: { bg: "rgba(0,0,0,0.035)", border: "var(--ink-60)" },
    warm: { bg: "rgba(166, 124, 82, 0.08)", border: "var(--accent)" },
    deep: { bg: "rgba(60, 56, 50, 0.06)", border: "var(--ink-80)" },
  }[tone];
  return (
    <div
      style={{
        width: w,
        height: h,
        background: accent ? "var(--accent-tint)" : palette.bg,
        border: `1.5px ${dashed ? "dashed" : "solid"} ${accent ? "var(--accent)" : palette.border}`,
        borderRadius: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        color: "var(--ink-60)",
        fontFamily: "var(--font-hand)",
        fontSize: 13,
        textAlign: "center",
        padding: 8,
        boxSizing: "border-box",
        overflow: "hidden",
        ...style,
      }}
    >
      {children || (
        <span style={{ opacity: 0.7, lineHeight: 1.3 }}>
          {label}
          {ratio && <div style={{ fontSize: 10, opacity: 0.6, marginTop: 2 }}>{ratio}</div>}
        </span>
      )}
      {/* Diagonal slash — placeholder image marker */}
      {label && !children && (
        <svg
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", opacity: 0.25 }}
          preserveAspectRatio="none"
        >
          <line x1="0" y1="0" x2="100%" y2="100%" stroke="currentColor" strokeWidth="0.8" />
          <line x1="100%" y1="0" x2="0" y2="100%" stroke="currentColor" strokeWidth="0.8" />
        </svg>
      )}
    </div>
  );
};

const Line = ({ w = "100%", weight = 1, dashed = false, color }) => (
  <div
    style={{
      width: w,
      borderTop: `${weight}px ${dashed ? "dashed" : "solid"} ${color || "var(--ink-40)"}`,
    }}
  />
);

const TextLine = ({ w = "60%", h = 6, opacity = 0.55 }) => (
  <div style={{ width: w, height: h, background: "var(--ink-80)", opacity, borderRadius: 1 }} />
);

const TextBlock = ({ lines = 3, widths }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
    {Array.from({ length: lines }).map((_, i) => (
      <TextLine key={i} w={widths ? widths[i] : `${85 - i * 8}%`} />
    ))}
  </div>
);

const Hand = ({ children, size = 14, weight = 400, style = {} }) => (
  <span style={{ fontFamily: "var(--font-hand)", fontSize: size, fontWeight: weight, color: "var(--ink-80)", ...style }}>
    {children}
  </span>
);

const Serif = ({ children, size = 32, weight = 400, italic = false, style = {} }) => (
  <span
    style={{
      fontFamily: "var(--font-serif)",
      fontSize: size,
      fontWeight: weight,
      fontStyle: italic ? "italic" : "normal",
      color: "var(--ink-100)",
      letterSpacing: "-0.01em",
      lineHeight: 1.05,
      ...style,
    }}
  >
    {children}
  </span>
);

const Mono = ({ children, size = 10, style = {} }) => (
  <span
    style={{
      fontFamily: "var(--font-mono)",
      fontSize: size,
      letterSpacing: "0.18em",
      textTransform: "uppercase",
      color: "var(--ink-60)",
      ...style,
    }}
  >
    {children}
  </span>
);

// Annotation callout (designer's note)
const Note = ({ children, side = "right", top = 0, style = {} }) => {
  if (!window.__SHOW_NOTES__) return null;
  return (
    <div
      data-note="true"
      style={{
        position: "absolute",
        [side]: -180,
        top,
        width: 160,
        fontFamily: "var(--font-hand)",
        fontSize: 12,
        color: "var(--accent-deep)",
        lineHeight: 1.35,
        ...style,
      }}
    >
      <span style={{ opacity: 0.7 }}>↳ </span>
      {children}
    </div>
  );
};

// Sketch arrow scribble
const Scribble = ({ style = {}, kind = "underline" }) => {
  if (kind === "underline") {
    return (
      <svg viewBox="0 0 200 12" style={{ width: "100%", height: 10, ...style }} preserveAspectRatio="none">
        <path
          d="M 2 7 Q 30 2, 60 6 T 120 7 T 198 5"
          stroke="var(--accent)"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  return null;
};

// Logo lockup placeholder
const Logo = ({ inverted = false }) => (
  <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
    <span
      style={{
        fontFamily: "var(--font-serif)",
        fontSize: 16,
        letterSpacing: "0.02em",
        color: inverted ? "white" : "var(--ink-100)",
        fontWeight: 500,
      }}
    >
      BIMC
    </span>
    <span
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: 8,
        letterSpacing: "0.4em",
        color: inverted ? "rgba(255,255,255,0.7)" : "var(--ink-60)",
        marginTop: 2,
      }}
    >
      COSMEDIC
    </span>
  </div>
);

// Generic top nav
const Nav = ({ inverted = false }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "20px 40px",
      borderBottom: inverted ? "1px solid rgba(255,255,255,0.15)" : "1px solid var(--ink-20)",
      color: inverted ? "white" : "var(--ink-100)",
    }}
  >
    <Logo inverted={inverted} />
    <div style={{ display: "flex", gap: 28, fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase" }}>
      <span>Treatments</span>
      <span>Surgeons</span>
      <span>Journey</span>
      <span>Gallery</span>
      <span>Journal</span>
      <span>Contact</span>
    </div>
    <div
      style={{
        padding: "8px 16px",
        border: `1px solid ${inverted ? "rgba(255,255,255,0.5)" : "var(--ink-100)"}`,
        fontFamily: "var(--font-mono)",
        fontSize: 9,
        letterSpacing: "0.2em",
        textTransform: "uppercase",
      }}
    >
      Plan Your Journey
    </div>
  </div>
);

// CTA button
const CTA = ({ children, accent = false, inverted = false, style = {} }) => (
  <div
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 12,
      padding: "14px 24px",
      border: `1px solid ${accent ? "var(--accent)" : inverted ? "white" : "var(--ink-100)"}`,
      background: accent ? "var(--accent)" : "transparent",
      color: accent ? "white" : inverted ? "white" : "var(--ink-100)",
      fontFamily: "var(--font-mono)",
      fontSize: 10,
      letterSpacing: "0.22em",
      textTransform: "uppercase",
      ...style,
    }}
  >
    {children}
    <span style={{ fontSize: 14 }}>→</span>
  </div>
);

// ============================================================
// VARIATION 1 — "Editorial Cinema"
// Full-bleed dark hero. Magazine-grid sections beneath.
// ============================================================

const V1_EditorialCinema = () => (
  <div style={{ width: 1280, background: "var(--paper)", color: "var(--ink-100)" }}>
    {/* HERO */}
    <div style={{ position: "relative", background: "var(--ink-100)", color: "white", height: 720 }}>
      <Nav inverted />
      <div style={{ position: "absolute", inset: "80px 40px 40px 40px", border: "1.5px dashed rgba(255,255,255,0.3)", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.6)", fontFamily: "var(--font-hand)", fontSize: 14 }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ marginBottom: 6, opacity: 0.6 }}>▶</div>
          full-bleed video — Bali clinic / surgeon / patient moments<br/>
          <span style={{ fontSize: 11, opacity: 0.7 }}>16:9, autoplay, muted, slow cuts</span>
        </div>
      </div>

      <div style={{ position: "absolute", left: 60, bottom: 80, maxWidth: 600, color: "white" }}>
        <Mono style={{ color: "rgba(255,255,255,0.65)" }}>Nusa Dua · Bali · Est. 1998</Mono>
        <div style={{ marginTop: 18 }}>
          <Serif size={68} italic style={{ color: "white" }}>The art of </Serif>
          <Serif size={68} style={{ color: "white" }}>refinement,</Serif><br />
          <Serif size={68} style={{ color: "white" }}>practiced in paradise.</Serif>
        </div>
        <div style={{ marginTop: 28, display: "flex", gap: 16 }}>
          <CTA accent>Plan Your Journey</CTA>
          <CTA inverted>Watch the film</CTA>
        </div>
      </div>

      <div style={{ position: "absolute", right: 40, bottom: 40, fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.2em", color: "rgba(255,255,255,0.5)", textAlign: "right" }}>
        ACHSI ACCREDITED<br />
        <span style={{ opacity: 0.7 }}>Medical Tourism Hospital of the Year · 2026</span>
      </div>
    </div>

    {/* INTRO BAND — editorial pull-quote */}
    <div style={{ padding: "120px 80px", borderBottom: "1px solid var(--ink-20)" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 80, alignItems: "start" }}>
        <Mono>I — A Sanctuary</Mono>
        <div>
          <Serif size={42} italic>"Aesthetic medicine, considered with the same care as the island that surrounds it."</Serif>
          <div style={{ marginTop: 32, display: "flex", gap: 60 }}>
            <div style={{ flex: 1 }}>
              <TextBlock lines={4} />
            </div>
            <div style={{ flex: 1 }}>
              <TextBlock lines={4} />
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* SIGNATURE TREATMENTS — asymmetric editorial grid */}
    <div style={{ padding: "100px 80px", borderBottom: "1px solid var(--ink-20)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 60 }}>
        <div>
          <Mono>II — Signature Treatments</Mono>
          <div style={{ marginTop: 12 }}>
            <Serif size={48}>A considered repertoire.</Serif>
          </div>
        </div>
        <Hand size={13} style={{ color: "var(--accent)" }}>view all 24 treatments →</Hand>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr 1fr", gap: 24 }}>
        <div style={{ position: "relative" }}>
          <Box h={520} label="Portrait — surgical" ratio="3:4" tone="warm" />
          <div style={{ marginTop: 16 }}>
            <Mono>01 / Surgical</Mono>
            <div style={{ marginTop: 6 }}><Serif size={24} italic>Rhinoplasty, Breast, Body</Serif></div>
            <div style={{ marginTop: 8 }}><TextBlock lines={2} /></div>
          </div>
        </div>
        <div>
          <Box h={360} label="Close-up — skin" ratio="3:4" />
          <div style={{ marginTop: 16 }}>
            <Mono>02 / Non-surgical</Mono>
            <div style={{ marginTop: 6 }}><Serif size={24} italic>Injectables & Skin</Serif></div>
            <div style={{ marginTop: 8 }}><TextBlock lines={2} /></div>
          </div>
          <div style={{ marginTop: 32 }}>
            <Mono>04 / Dental Aesthetics</Mono>
            <div style={{ marginTop: 6 }}><Serif size={24} italic>The smile, refined.</Serif></div>
          </div>
        </div>
        <div>
          <div style={{ marginBottom: 32 }}>
            <Mono>03 / Hair Restoration</Mono>
            <div style={{ marginTop: 6 }}><Serif size={24} italic>FUE & follicle therapy.</Serif></div>
            <div style={{ marginTop: 8 }}><TextBlock lines={2} /></div>
          </div>
          <Box h={400} label="Texture — material" ratio="3:4" />
        </div>
      </div>
    </div>

    {/* SURGEONS — horizontal masthead */}
    <div style={{ padding: "100px 80px", background: "var(--cream)", borderBottom: "1px solid var(--ink-20)" }}>
      <Mono>III — The Practitioners</Mono>
      <div style={{ marginTop: 12, marginBottom: 60, display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <Serif size={48}>Hands you can trust.</Serif>
        <Hand size={13} style={{ color: "var(--accent)" }}>meet all 7 surgeons →</Hand>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }}>
        {["Dr. A. Wijaya", "Dr. L. Putri", "Dr. M. Tanaka", "Dr. R. Hartono"].map((name, i) => (
          <div key={i}>
            <Box h={320} label="Portrait" ratio="3:4" />
            <div style={{ marginTop: 14 }}>
              <Serif size={20}>{name}</Serif>
              <div style={{ marginTop: 4 }}><Mono size={9}>{["Facial Surgery", "Body Contouring", "Reconstructive", "Aesthetic Med"][i]}</Mono></div>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* BEFORE / AFTER — horizontal scroll suggestion */}
    <div style={{ padding: "100px 80px", borderBottom: "1px solid var(--ink-20)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 60 }}>
        <div>
          <Mono>IV — Results</Mono>
          <div style={{ marginTop: 12 }}><Serif size={48}>Quietly transformative.</Serif></div>
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <Box w={44} h={44}><span>←</span></Box>
          <Box w={44} h={44}><span>→</span></Box>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
        {[1, 2, 3].map(i => (
          <div key={i}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4 }}>
              <Box h={280} label="Before" />
              <Box h={280} label="After" tone="warm" />
            </div>
            <div style={{ marginTop: 12, display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <Mono size={9}>Case {i.toString().padStart(3, "0")}</Mono>
              <Hand size={12}>Rhinoplasty · 6 mo</Hand>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* TESTIMONIAL — single quote, full-width */}
    <div style={{ padding: "140px 80px", textAlign: "center", borderBottom: "1px solid var(--ink-20)" }}>
      <Mono>V — Stories</Mono>
      <div style={{ marginTop: 32, maxWidth: 900, margin: "32px auto 0" }}>
        <Serif size={42} italic>
          "I came for a procedure. I left having had something closer to a retreat — handled, cared for, and quietly returned to myself."
        </Serif>
      </div>
      <div style={{ marginTop: 40 }}>
        <Mono>Sarah K. · Sydney · Rhinoplasty, 2025</Mono>
      </div>
      <div style={{ marginTop: 32, display: "flex", gap: 6, justifyContent: "center" }}>
        {[1, 2, 3, 4, 5].map(i => <div key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: i === 2 ? "var(--accent)" : "var(--ink-20)" }} />)}
      </div>
    </div>

    {/* CTA BAND */}
    <div style={{ padding: "120px 80px", background: "var(--ink-100)", color: "white", textAlign: "center" }}>
      <Serif size={56} italic style={{ color: "white" }}>Begin your journey.</Serif>
      <div style={{ marginTop: 16, color: "rgba(255,255,255,0.7)", fontFamily: "var(--font-serif)", fontSize: 18 }}>
        A private consultation, treatment plan, and stay — coordinated as one.
      </div>
      <div style={{ marginTop: 40, display: "flex", justifyContent: "center", gap: 16 }}>
        <CTA accent>Plan Your Journey</CTA>
        <CTA inverted>Speak with a Concierge</CTA>
      </div>
    </div>

    {/* FOOTER */}
    <div style={{ padding: "60px 80px", background: "var(--ink-100)", color: "rgba(255,255,255,0.7)", display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr", gap: 40 }}>
      <div>
        <Logo inverted />
        <div style={{ marginTop: 16, fontFamily: "var(--font-serif)", fontSize: 13, lineHeight: 1.6 }}>
          BIMC Hospital Nusa Dua<br />Kawasan ITDC Blok D, Bali
        </div>
      </div>
      {["Treatments", "About", "Journey", "Connect"].map(h => (
        <div key={h}>
          <Mono style={{ color: "rgba(255,255,255,0.5)" }}>{h}</Mono>
          <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 8 }}>
            {[1,2,3,4].map(i => <TextLine key={i} w={`${60 + i * 8}%`} opacity={0.3} />)}
          </div>
        </div>
      ))}
    </div>
  </div>
);

// ============================================================
// VARIATION 2 — "Quiet Atelier"
// Type-first. Generous white space. Off-white paper feel.
// ============================================================

const V2_QuietAtelier = () => (
  <div style={{ width: 1280, background: "var(--paper-warm)", color: "var(--ink-100)" }}>
    <Nav />

    {/* HERO — type-first, image as small inset */}
    <div style={{ padding: "120px 80px 100px", display: "grid", gridTemplateColumns: "2fr 1fr", gap: 80, alignItems: "end" }}>
      <div>
        <Mono>Est. 1998 · Nusa Dua, Bali</Mono>
        <div style={{ marginTop: 40 }}>
          <Serif size={120} italic style={{ display: "block", lineHeight: 0.95 }}>Considered</Serif>
          <Serif size={120} style={{ display: "block", lineHeight: 0.95, marginTop: 8 }}>aesthetic</Serif>
          <Serif size={120} italic style={{ display: "block", lineHeight: 0.95, marginTop: 8, color: "var(--accent-deep)" }}>medicine.</Serif>
        </div>
        <div style={{ marginTop: 60, display: "flex", gap: 80, alignItems: "start" }}>
          <div style={{ maxWidth: 380 }}>
            <Serif size={18} style={{ lineHeight: 1.55, color: "var(--ink-80)" }}>
              An ACHSI-accredited centre of cosmetic surgery, dental aesthetics, and recovery — set within Bali's most established international hospital.
            </Serif>
          </div>
          <CTA>Plan Your Journey</CTA>
        </div>
      </div>
      <div style={{ position: "relative" }}>
        <Box h={520} label="Single editorial portrait" ratio="3:4" tone="warm" />
        <div style={{ position: "absolute", bottom: -14, left: -14, padding: "8px 14px", background: "var(--paper-warm)", border: "1px solid var(--ink-100)" }}>
          <Mono size={9}>Plate I</Mono>
        </div>
      </div>
    </div>

    {/* TICKER — accreditations */}
    <div style={{ padding: "32px 80px", borderTop: "1px solid var(--ink-100)", borderBottom: "1px solid var(--ink-100)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <Mono>ACHSI Accredited</Mono>
      <Mono>Medical Tourism Hospital of the Year · 2026</Mono>
      <Mono>Healthcare Asia</Mono>
      <Mono>Member · IAPS</Mono>
      <Mono>Est. 1998</Mono>
    </div>

    {/* TREATMENTS — vertical list, table-of-contents feel */}
    <div style={{ padding: "120px 80px", display: "grid", gridTemplateColumns: "1fr 2fr", gap: 80 }}>
      <div style={{ position: "sticky", top: 40, alignSelf: "start" }}>
        <Mono>Section II</Mono>
        <div style={{ marginTop: 12 }}>
          <Serif size={56} italic>The repertoire.</Serif>
        </div>
        <div style={{ marginTop: 20, maxWidth: 280 }}>
          <Serif size={15} style={{ color: "var(--ink-60)", lineHeight: 1.55 }}>
            Six disciplines, practiced under one roof, sequenced into a single journey.
          </Serif>
        </div>
      </div>
      <div>
        {[
          { num: "01", title: "Surgical", italic: "Rhinoplasty · Breast · Body Contouring", count: "9 procedures" },
          { num: "02", title: "Non-surgical", italic: "Injectables · Laser · Skin", count: "12 protocols" },
          { num: "03", title: "Hair Restoration", italic: "FUE & follicle therapy", count: "3 protocols" },
          { num: "04", title: "Dental Aesthetics", italic: "Veneers · alignment · whitening", count: "5 services" },
          { num: "05", title: "Recovery & Wellness", italic: "Post-op villas, nutrition, rehab", count: "Curated stays" },
          { num: "06", title: "Concierge", italic: "Travel, accommodation, aftercare", count: "End-to-end" },
        ].map((t, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "60px 1fr 200px 60px", gap: 20, padding: "32px 0", borderTop: "1px solid var(--ink-40)", alignItems: "baseline" }}>
            <Mono>{t.num}</Mono>
            <div>
              <Serif size={32}>{t.title}</Serif>
              <div style={{ marginTop: 6 }}><Serif size={16} italic style={{ color: "var(--ink-60)" }}>{t.italic}</Serif></div>
            </div>
            <Mono>{t.count}</Mono>
            <span style={{ fontSize: 20, textAlign: "right", color: "var(--ink-60)" }}>→</span>
          </div>
        ))}
        <div style={{ borderTop: "1px solid var(--ink-40)" }} />
      </div>
    </div>

    {/* SURGEONS — single featured + grid */}
    <div style={{ padding: "120px 80px", borderTop: "1px solid var(--ink-20)" }}>
      <Mono>Section III · The Practitioners</Mono>
      <div style={{ marginTop: 60, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "start" }}>
        <div>
          <Box h={620} label="Lead surgeon — formal portrait" ratio="4:5" tone="warm" />
        </div>
        <div style={{ paddingTop: 40 }}>
          <Mono>Lead Surgeon</Mono>
          <div style={{ marginTop: 16 }}>
            <Serif size={56} italic>Dr. Anjani Wijaya</Serif>
          </div>
          <div style={{ marginTop: 8 }}>
            <Serif size={20} style={{ color: "var(--ink-60)" }}>FRACS · Facial & Reconstructive Surgery</Serif>
          </div>
          <div style={{ marginTop: 32, maxWidth: 440 }}>
            <TextBlock lines={6} />
          </div>
          <div style={{ marginTop: 32, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20, paddingTop: 32, borderTop: "1px solid var(--ink-40)" }}>
            <div><Mono size={9}>Trained</Mono><div style={{ marginTop: 6 }}><Serif size={15}>Sydney · Tokyo</Serif></div></div>
            <div><Mono size={9}>Specialty</Mono><div style={{ marginTop: 6 }}><Serif size={15}>Rhinoplasty</Serif></div></div>
            <div><Mono size={9}>Procedures</Mono><div style={{ marginTop: 6 }}><Serif size={15}>2,400+</Serif></div></div>
          </div>
          <div style={{ marginTop: 40 }}><CTA>Read the full profile</CTA></div>
        </div>
      </div>
      {/* secondary grid */}
      <div style={{ marginTop: 80, display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 16 }}>
        {[1,2,3,4,5,6].map(i => (
          <div key={i}>
            <Box h={180} label="Surgeon" ratio="3:4" />
            <div style={{ marginTop: 10 }}><Serif size={14}>Dr. Surname</Serif></div>
            <div style={{ marginTop: 2 }}><Mono size={8}>Specialty</Mono></div>
          </div>
        ))}
      </div>
    </div>

    {/* GALLERY — strip */}
    <div style={{ padding: "120px 80px", borderTop: "1px solid var(--ink-20)", background: "var(--cream)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 40 }}>
        <div>
          <Mono>Section IV · Before & After</Mono>
          <div style={{ marginTop: 12 }}><Serif size={48} italic>Quietly transformative.</Serif></div>
        </div>
        <Hand size={13} style={{ color: "var(--accent)" }}>browse 200+ cases →</Hand>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
        {[1,2,3,4].map(i => (
          <div key={i}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
              <Box h={220} label="Before" />
              <Box h={220} label="After" tone="warm" />
            </div>
            <div style={{ marginTop: 10, display: "flex", justifyContent: "space-between" }}>
              <Mono size={8}>Case {i.toString().padStart(3, "0")}</Mono>
              <Hand size={11}>Rhinoplasty</Hand>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* TESTIMONIALS — three columns */}
    <div style={{ padding: "120px 80px", borderTop: "1px solid var(--ink-20)" }}>
      <Mono>Section V · Stories</Mono>
      <div style={{ marginTop: 60, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 60 }}>
        {[1,2,3].map(i => (
          <div key={i}>
            <Serif size={20} italic style={{ lineHeight: 1.45 }}>"A few sentences of editorial-length testimonial, set in serif italic, with no quote marks shouting."</Serif>
            <div style={{ marginTop: 24, paddingTop: 16, borderTop: "1px solid var(--ink-40)" }}>
              <Mono>Patient Name · City</Mono>
              <div style={{ marginTop: 4 }}><Hand size={11}>Procedure · year</Hand></div>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* CTA */}
    <div style={{ padding: "140px 80px", textAlign: "center", borderTop: "1px solid var(--ink-100)" }}>
      <Mono>VI · Begin</Mono>
      <div style={{ marginTop: 24 }}><Serif size={88} italic>A private journey, by request.</Serif></div>
      <div style={{ marginTop: 40, display: "flex", justifyContent: "center", gap: 16 }}>
        <CTA accent>Request a private consultation</CTA>
      </div>
    </div>

    {/* FOOTER */}
    <div style={{ padding: "60px 80px", borderTop: "1px solid var(--ink-100)", display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr", gap: 40 }}>
      <div>
        <Logo />
        <div style={{ marginTop: 16, fontFamily: "var(--font-serif)", fontSize: 13, lineHeight: 1.6, color: "var(--ink-60)" }}>
          BIMC Hospital Nusa Dua<br />Kawasan ITDC Blok D, Bali
        </div>
      </div>
      {["Treatments", "About", "Journey", "Connect"].map(h => (
        <div key={h}>
          <Mono>{h}</Mono>
          <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 8 }}>
            {[1,2,3,4].map(i => <TextLine key={i} w={`${60 + i * 8}%`} />)}
          </div>
        </div>
      ))}
    </div>
  </div>
);

// ============================================================
// VARIATION 3 — "Sanctuary"
// Wellness-retreat feel. Soft. Imagery-led. Vertical pacing.
// ============================================================

const V3_Sanctuary = () => (
  <div style={{ width: 1280, background: "var(--paper)", color: "var(--ink-100)" }}>
    {/* HERO — split image + booking card */}
    <div style={{ position: "relative", height: 760, display: "grid", gridTemplateColumns: "1.4fr 1fr" }}>
      <div style={{ position: "relative", background: "var(--cream)" }}>
        <Box h="100%" label="Cinematic still — surgeon's hands, soft light" style={{ border: "none", borderRadius: 0 }} />
        <div style={{ position: "absolute", top: 32, left: 32, color: "white", mixBlendMode: "difference" }}>
          <Logo inverted />
        </div>
        <div style={{ position: "absolute", left: 60, bottom: 60, maxWidth: 480 }}>
          <Mono style={{ color: "var(--ink-80)" }}>A sanctuary in Nusa Dua</Mono>
          <div style={{ marginTop: 20 }}>
            <Serif size={64} italic style={{ color: "var(--ink-100)" }}>The care of medicine.</Serif><br />
            <Serif size={64} italic style={{ color: "var(--accent-deep)" }}>The grace of Bali.</Serif>
          </div>
        </div>
      </div>

      {/* Booking column */}
      <div style={{ background: "var(--paper-warm)", padding: "60px 50px", display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 24, fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ink-80)" }}>
          <span>Treatments</span>
          <span>Surgeons</span>
          <span>Journey</span>
          <span>EN ▾</span>
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", marginTop: 60 }}>
          <Mono>Plan Your Journey</Mono>
          <div style={{ marginTop: 16 }}>
            <Serif size={36} italic>Tell us a little about you.</Serif>
          </div>
          <div style={{ marginTop: 32, display: "flex", flexDirection: "column", gap: 20 }}>
            <div>
              <Mono size={9}>Area of interest</Mono>
              <div style={{ marginTop: 8, padding: "12px 0", borderBottom: "1px solid var(--ink-100)", fontFamily: "var(--font-serif)", fontSize: 16, color: "var(--ink-60)", display: "flex", justifyContent: "space-between" }}>
                <span>Select treatments…</span><span>▾</span>
              </div>
            </div>
            <div>
              <Mono size={9}>Approximate dates</Mono>
              <div style={{ marginTop: 8, padding: "12px 0", borderBottom: "1px solid var(--ink-100)", fontFamily: "var(--font-serif)", fontSize: 16, color: "var(--ink-60)" }}>—</div>
            </div>
            <div>
              <Mono size={9}>Travelling from</Mono>
              <div style={{ marginTop: 8, padding: "12px 0", borderBottom: "1px solid var(--ink-100)", fontFamily: "var(--font-serif)", fontSize: 16, color: "var(--ink-60)" }}>—</div>
            </div>
            <div style={{ marginTop: 16 }}>
              <CTA accent style={{ width: "100%", justifyContent: "space-between" }}>Begin enquiry</CTA>
            </div>
            <div style={{ marginTop: 8, fontFamily: "var(--font-serif)", fontSize: 12, color: "var(--ink-60)", textAlign: "center", fontStyle: "italic" }}>
              A concierge will reply within 24 hours.
            </div>
          </div>
        </div>
        <div style={{ paddingTop: 32, borderTop: "1px solid var(--ink-40)", display: "flex", justifyContent: "space-between" }}>
          <Mono size={9}>ACHSI Accredited</Mono>
          <Mono size={9}>Est. 1998</Mono>
        </div>
      </div>
    </div>

    {/* RIBBON — proof points */}
    <div style={{ padding: "60px 80px", background: "var(--ink-100)", color: "white", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 40 }}>
      {[
        ["28", "Years in Bali"],
        ["2,400+", "Procedures yearly"],
        ["7", "International surgeons"],
        ["96%", "Patient satisfaction"],
      ].map(([n, l], i) => (
        <div key={i}>
          <Serif size={56} italic style={{ color: "white" }}>{n}</Serif>
          <div style={{ marginTop: 8 }}><Mono style={{ color: "rgba(255,255,255,0.6)" }}>{l}</Mono></div>
        </div>
      ))}
    </div>

    {/* TREATMENTS — image-led grid, 6 tiles */}
    <div style={{ padding: "120px 80px" }}>
      <div style={{ textAlign: "center", marginBottom: 60 }}>
        <Mono>Our disciplines</Mono>
        <div style={{ marginTop: 16 }}><Serif size={56} italic>Six pathways. One sanctuary.</Serif></div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
        {[
          ["Surgical", "Rhinoplasty, breast, body"],
          ["Non-surgical", "Injectables & skin"],
          ["Hair Restoration", "FUE & therapy"],
          ["Dental Aesthetics", "Veneers & alignment"],
          ["Recovery & Wellness", "Post-op villas"],
          ["Concierge", "Travel & aftercare"],
        ].map(([t, sub], i) => (
          <div key={i} style={{ position: "relative" }}>
            <Box h={380} label={`Imagery — ${t.toLowerCase()}`} ratio="4:5" tone={i % 2 === 0 ? "warm" : "neutral"} />
            <div style={{ position: "absolute", left: 24, bottom: 24, color: "white", textShadow: "0 2px 12px rgba(0,0,0,0.5)" }}>
              <Mono size={9} style={{ color: "rgba(255,255,255,0.85)" }}>0{i + 1}</Mono>
              <div style={{ marginTop: 4 }}><Serif size={28} italic style={{ color: "white" }}>{t}</Serif></div>
              <div style={{ marginTop: 2 }}><Hand size={12} style={{ color: "rgba(255,255,255,0.85)" }}>{sub}</Hand></div>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* THE JOURNEY — illustrated horizontal flow */}
    <div style={{ padding: "120px 80px", background: "var(--cream)" }}>
      <div style={{ textAlign: "center", marginBottom: 80 }}>
        <Mono>Your Journey</Mono>
        <div style={{ marginTop: 16 }}><Serif size={56} italic>From enquiry to homecoming.</Serif></div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 24, alignItems: "start" }}>
        {[
          ["01", "Consult", "Virtual or in-person"],
          ["02", "Plan", "Treatment + stay"],
          ["03", "Arrive", "Met at airport"],
          ["04", "Procedure", "At BIMC Nusa Dua"],
          ["05", "Recover", "Villa & aftercare"],
        ].map(([n, t, sub], i) => (
          <div key={i} style={{ position: "relative" }}>
            {i < 4 && (
              <div style={{ position: "absolute", top: 24, right: -16, width: 32, color: "var(--accent)", fontFamily: "var(--font-hand)", fontSize: 18 }}>→</div>
            )}
            <Box w={48} h={48} style={{ borderRadius: "50%", marginBottom: 20 }}>
              <Mono>{n}</Mono>
            </Box>
            <Serif size={22} italic>{t}</Serif>
            <div style={{ marginTop: 6 }}><Hand size={12}>{sub}</Hand></div>
            <div style={{ marginTop: 14 }}><TextBlock lines={2} /></div>
          </div>
        ))}
      </div>
    </div>

    {/* SURGEONS — soft round portraits */}
    <div style={{ padding: "120px 80px" }}>
      <div style={{ textAlign: "center", marginBottom: 60 }}>
        <Mono>The Practitioners</Mono>
        <div style={{ marginTop: 16 }}><Serif size={56} italic>Held by experienced hands.</Serif></div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 32 }}>
        {[1,2,3,4].map(i => (
          <div key={i} style={{ textAlign: "center" }}>
            <Box w={220} h={220} style={{ borderRadius: "50%", margin: "0 auto" }} label="Portrait" />
            <div style={{ marginTop: 20 }}><Serif size={22} italic>Dr. Surname</Serif></div>
            <div style={{ marginTop: 6 }}><Mono size={9}>Specialty</Mono></div>
            <div style={{ marginTop: 12, padding: "0 20px" }}><TextBlock lines={2} /></div>
          </div>
        ))}
      </div>
    </div>

    {/* GALLERY — masonry */}
    <div style={{ padding: "120px 80px", background: "var(--cream)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 40 }}>
        <div>
          <Mono>Selected Results</Mono>
          <div style={{ marginTop: 12 }}><Serif size={48} italic>Before & after.</Serif></div>
        </div>
        <Hand size={13} style={{ color: "var(--accent)" }}>browse all →</Hand>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gridAutoRows: "180px", gap: 14 }}>
        <Box h="100%" label="Case · before" style={{ gridRow: "span 2" }} />
        <Box h="100%" label="Case · after" tone="warm" />
        <Box h="100%" label="Case" />
        <Box h="100%" label="Case" tone="warm" style={{ gridRow: "span 2" }} />
        <Box h="100%" label="Case" tone="warm" />
        <Box h="100%" label="Case" />
        <Box h="100%" label="Case · before" />
        <Box h="100%" label="Case · after" tone="warm" />
      </div>
    </div>

    {/* CTA */}
    <div style={{ padding: "140px 80px", textAlign: "center" }}>
      <div><Serif size={72} italic>Begin, when you are ready.</Serif></div>
      <div style={{ marginTop: 24, fontFamily: "var(--font-serif)", fontSize: 18, color: "var(--ink-60)" }}>A private consultation, treatment plan, and stay — coordinated as one.</div>
      <div style={{ marginTop: 40, display: "flex", justifyContent: "center", gap: 16 }}>
        <CTA accent>Plan Your Journey</CTA>
        <CTA>Speak with a Concierge</CTA>
      </div>
    </div>

    {/* FOOTER */}
    <div style={{ padding: "60px 80px", background: "var(--ink-100)", color: "rgba(255,255,255,0.7)", display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr", gap: 40 }}>
      <div>
        <Logo inverted />
        <div style={{ marginTop: 16, fontFamily: "var(--font-serif)", fontSize: 13, lineHeight: 1.6 }}>BIMC Hospital Nusa Dua<br />Kawasan ITDC Blok D, Bali</div>
      </div>
      {["Treatments", "About", "Journey", "Connect"].map(h => (
        <div key={h}>
          <Mono style={{ color: "rgba(255,255,255,0.5)" }}>{h}</Mono>
          <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 8 }}>
            {[1,2,3,4].map(i => <TextLine key={i} w={`${60 + i * 8}%`} opacity={0.3} />)}
          </div>
        </div>
      ))}
    </div>
  </div>
);

// ============================================================
// VARIATION 4 — "Asymmetric Editorial" (magazine cover)
// Bold modular grid. Index numbers. A bit more daring.
// ============================================================

const V4_AsymmetricEditorial = () => (
  <div style={{ width: 1280, background: "var(--paper)", color: "var(--ink-100)" }}>
    {/* HERO — magazine cover */}
    <div style={{ padding: "32px 40px 0", borderBottom: "1px solid var(--ink-100)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: 16, borderBottom: "1px solid var(--ink-100)" }}>
        <Mono>Vol. XXVIII · MMXXVI</Mono>
        <Logo />
        <Mono>Nusa Dua · Bali</Mono>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", padding: "16px 0", fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase" }}>
        <div style={{ display: "flex", gap: 24 }}>
          <span>Treatments</span><span>Surgeons</span><span>Journey</span><span>Gallery</span><span>Stories</span>
        </div>
        <span>Plan Your Journey →</span>
      </div>
    </div>

    {/* Cover grid */}
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr 1fr", gap: 0, borderBottom: "1px solid var(--ink-100)" }}>
      {/* LEFT column — index */}
      <div style={{ padding: "40px 32px", borderRight: "1px solid var(--ink-100)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <div>
          <Mono>In This Issue</Mono>
          <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 18 }}>
            {[
              ["I", "Treatments"],
              ["II", "The surgeons"],
              ["III", "Before & after"],
              ["IV", "Stories"],
              ["V", "The journey"],
              ["VI", "Bali, considered"],
            ].map(([n, t], i) => (
              <div key={i} style={{ display: "flex", gap: 16, alignItems: "baseline", borderBottom: "1px dotted var(--ink-40)", paddingBottom: 8 }}>
                <Mono style={{ minWidth: 24 }}>{n}</Mono>
                <Serif size={18} italic style={{ flex: 1 }}>{t}</Serif>
                <Mono size={9}>→</Mono>
              </div>
            ))}
          </div>
        </div>
        <div style={{ marginTop: 40 }}>
          <Mono>Accreditation</Mono>
          <div style={{ marginTop: 12 }}><Serif size={14} style={{ lineHeight: 1.5 }}>First Indonesian hospital to receive ACHSI accreditation. Medical Tourism Hospital of the Year, 2026.</Serif></div>
        </div>
      </div>

      {/* CENTER — cover image */}
      <div style={{ position: "relative", borderRight: "1px solid var(--ink-100)", minHeight: 760 }}>
        <Box h="100%" label="The cover image — full-bleed editorial portrait" style={{ border: "none", borderRadius: 0 }} tone="warm" />
        <div style={{ position: "absolute", top: 40, left: 40, color: "var(--ink-100)" }}>
          <Mono>The Edit · 01</Mono>
        </div>
        <div style={{ position: "absolute", bottom: 40, left: 40, right: 40 }}>
          <Serif size={84} style={{ display: "block", lineHeight: 0.95, color: "var(--ink-100)" }}>The Quiet</Serif>
          <Serif size={84} italic style={{ display: "block", lineHeight: 0.95, color: "var(--ink-100)", marginTop: 4 }}>Refinement</Serif>
          <Serif size={84} style={{ display: "block", lineHeight: 0.95, color: "var(--ink-100)", marginTop: 4 }}>Issue.</Serif>
        </div>
      </div>

      {/* RIGHT — sidebar features */}
      <div style={{ padding: "40px 32px", display: "flex", flexDirection: "column", gap: 32 }}>
        <div>
          <Mono>Featured</Mono>
          <div style={{ marginTop: 12 }}>
            <Serif size={28} italic>"A retreat with the rigour of a hospital."</Serif>
          </div>
          <div style={{ marginTop: 16 }}>
            <Hand size={12}>— Sarah K., AU · 2025</Hand>
          </div>
        </div>
        <Line />
        <div>
          <Mono>This Week</Mono>
          <div style={{ marginTop: 12 }}>
            <Box h={180} label="Editorial still" tone="warm" />
          </div>
          <div style={{ marginTop: 12 }}>
            <Serif size={20} italic>On rhinoplasty, with Dr. Wijaya.</Serif>
          </div>
        </div>
        <Line />
        <div>
          <Mono>Reserve</Mono>
          <div style={{ marginTop: 12, padding: "16px 0", border: "1px solid var(--ink-100)", textAlign: "center" }}>
            <Serif size={20} italic>Plan Your Journey</Serif>
            <div style={{ marginTop: 4 }}><Mono size={9}>24h reply</Mono></div>
          </div>
        </div>
      </div>
    </div>

    {/* MASTHEAD — tagline ribbon */}
    <div style={{ padding: "40px 40px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--ink-100)" }}>
      <Serif size={32} italic>"Bali's most accredited centre for cosmetic medicine."</Serif>
      <Mono>Healthcare Asia · 2026</Mono>
    </div>

    {/* TREATMENTS — modular blocks */}
    <div style={{ padding: "0", borderBottom: "1px solid var(--ink-100)" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", borderBottom: "1px solid var(--ink-100)" }}>
        {[
          ["I", "Surgical", "Rhinoplasty · Breast · Body Contouring", true],
          ["II", "Non-surgical", "Injectables · Laser · Skin", false],
          ["III", "Hair Restoration", "FUE & therapy", false],
        ].map(([n, t, sub, accent], i) => (
          <div key={i} style={{ padding: "60px 40px", borderRight: i < 2 ? "1px solid var(--ink-100)" : "none", background: accent ? "var(--accent-tint)" : "transparent" }}>
            <Mono>{n}</Mono>
            <div style={{ marginTop: 32 }}><Serif size={36}>{t}</Serif></div>
            <div style={{ marginTop: 8 }}><Serif size={14} italic style={{ color: "var(--ink-60)" }}>{sub}</Serif></div>
            <div style={{ marginTop: 32 }}><TextBlock lines={3} /></div>
            <div style={{ marginTop: 32 }}><Hand size={12} style={{ color: "var(--accent)" }}>read more →</Hand></div>
          </div>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr" }}>
        {[
          ["IV", "Dental Aesthetics", "Veneers · alignment", false],
          ["V", "Recovery & Wellness", "Post-op villas", true],
          ["VI", "Concierge", "Travel & aftercare", false],
        ].map(([n, t, sub, accent], i) => (
          <div key={i} style={{ padding: "60px 40px", borderRight: i < 2 ? "1px solid var(--ink-100)" : "none", background: accent ? "var(--accent-tint)" : "transparent" }}>
            <Mono>{n}</Mono>
            <div style={{ marginTop: 32 }}><Serif size={36}>{t}</Serif></div>
            <div style={{ marginTop: 8 }}><Serif size={14} italic style={{ color: "var(--ink-60)" }}>{sub}</Serif></div>
            <div style={{ marginTop: 32 }}><TextBlock lines={3} /></div>
            <div style={{ marginTop: 32 }}><Hand size={12} style={{ color: "var(--accent)" }}>read more →</Hand></div>
          </div>
        ))}
      </div>
    </div>

    {/* SURGEONS — bold spread */}
    <div style={{ padding: "80px 40px", borderBottom: "1px solid var(--ink-100)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 40 }}>
        <div>
          <Mono>Section II · The Practitioners</Mono>
          <div style={{ marginTop: 12 }}><Serif size={64}>Seven hands.</Serif></div>
        </div>
        <Hand size={13} style={{ color: "var(--accent)" }}>full directory →</Hand>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0, border: "1px solid var(--ink-100)" }}>
        {[
          ["A. Wijaya", "Facial"],
          ["L. Putri", "Body"],
          ["M. Tanaka", "Reconstructive"],
          ["R. Hartono", "Aesthetic Med"],
        ].map(([n, s], i) => (
          <div key={i} style={{ padding: 24, borderRight: i < 3 ? "1px solid var(--ink-100)" : "none" }}>
            <Box h={300} label="Portrait" ratio="3:4" />
            <div style={{ marginTop: 16 }}><Mono size={9}>0{i + 1}</Mono></div>
            <div style={{ marginTop: 4 }}><Serif size={22} italic>Dr. {n}</Serif></div>
            <div style={{ marginTop: 2 }}><Hand size={12}>{s}</Hand></div>
          </div>
        ))}
      </div>
    </div>

    {/* B&A + STORIES — split spread */}
    <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", borderBottom: "1px solid var(--ink-100)" }}>
      <div style={{ padding: "80px 40px", borderRight: "1px solid var(--ink-100)" }}>
        <Mono>Section III · Results</Mono>
        <div style={{ marginTop: 12, marginBottom: 40 }}><Serif size={48} italic>Quietly transformative.</Serif></div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
          {[1,2,3,4].map(i => (
            <div key={i}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
                <Box h={220} label="Before" />
                <Box h={220} label="After" tone="warm" />
              </div>
              <div style={{ marginTop: 8 }}><Mono size={9}>Case {i.toString().padStart(3, "0")} · Rhinoplasty</Mono></div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ padding: "80px 40px", background: "var(--cream)" }}>
        <Mono>Section IV · Stories</Mono>
        <div style={{ marginTop: 12, marginBottom: 40 }}><Serif size={48} italic>In their words.</Serif></div>
        <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
          {[1,2,3].map(i => (
            <div key={i} style={{ paddingBottom: 32, borderBottom: i < 3 ? "1px solid var(--ink-40)" : "none" }}>
              <Serif size={20} italic style={{ lineHeight: 1.45 }}>"A few sentences of editorial-length testimonial, set in serif italic, with grace and restraint."</Serif>
              <div style={{ marginTop: 16, display: "flex", justifyContent: "space-between" }}>
                <Mono size={9}>Patient · City</Mono>
                <Hand size={12}>Procedure · 2025</Hand>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* CTA — full-width black */}
    <div style={{ padding: "120px 40px", background: "var(--ink-100)", color: "white", display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 60, alignItems: "end" }}>
      <div>
        <Mono style={{ color: "rgba(255,255,255,0.6)" }}>Section VI · Begin</Mono>
        <div style={{ marginTop: 24 }}>
          <Serif size={88} style={{ color: "white" }}>The next page</Serif><br />
          <Serif size={88} italic style={{ color: "white" }}>is yours to write.</Serif>
        </div>
      </div>
      <div style={{ paddingBottom: 12 }}>
        <Serif size={16} style={{ color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>
          A private consultation, treatment plan, and stay — coordinated as one. A concierge will reply within 24 hours.
        </Serif>
        <div style={{ marginTop: 32, display: "flex", flexDirection: "column", gap: 12 }}>
          <CTA accent>Plan Your Journey</CTA>
          <CTA inverted>Speak with a Concierge</CTA>
        </div>
      </div>
    </div>

    {/* FOOTER */}
    <div style={{ padding: "40px", background: "var(--ink-100)", color: "rgba(255,255,255,0.6)", borderTop: "1px solid rgba(255,255,255,0.15)", display: "flex", justifyContent: "space-between" }}>
      <Mono>© BIMC CosMedic Centre · MMXXVI</Mono>
      <Mono>Nusa Dua · Bali · Indonesia</Mono>
      <Mono>Privacy · Terms · ACHSI</Mono>
    </div>
  </div>
);

// ============================================================
// CANVAS
// ============================================================

const App = () => {
  const [tweaks, setTweaks] = window.useTweaks(window.TWEAK_DEFAULTS);

  // expose notes flag globally for Note component
  useEffect(() => {
    window.__SHOW_NOTES__ = tweaks.showNotes;
    // re-render trick: set state on a dummy
    document.body.setAttribute("data-show-notes", tweaks.showNotes ? "1" : "0");
  }, [tweaks.showNotes]);

  // CSS variables for tweakable accent
  const accentStyle = {
    "--accent": tweaks.accent,
    "--accent-deep": tweaks.accentDeep,
    "--accent-tint": tweaks.accentTint,
  };

  return (
    <div style={accentStyle}>
      <window.DesignCanvas
        title="BIMC CosMedic — Homepage Wireframes"
        subtitle="Four directions, low-fi with brand hints. Pick a direction or mix-and-match sections."
      >
        <window.DCSection id="directions" title="Four Directions">
          <window.DCArtboard id="v1" label="01 — Editorial Cinema · video hero, magazine sections" width={1280} height={4400}>
            <V1_EditorialCinema />
          </window.DCArtboard>
          <window.DCArtboard id="v2" label="02 — Quiet Atelier · type-first, table-of-contents" width={1280} height={4800}>
            <V2_QuietAtelier />
          </window.DCArtboard>
          <window.DCArtboard id="v3" label="03 — Sanctuary · split hero w/ booking, wellness pacing" width={1280} height={4900}>
            <V3_Sanctuary />
          </window.DCArtboard>
          <window.DCArtboard id="v4" label="04 — Asymmetric Editorial · magazine cover, modular grid" width={1280} height={4600}>
            <V4_AsymmetricEditorial />
          </window.DCArtboard>
        </window.DCSection>
      </window.DesignCanvas>

      <window.TweaksPanel title="Tweaks">
        <window.TweakSection title="Annotations">
          <window.TweakToggle
            label="Show designer notes"
            value={tweaks.showNotes}
            onChange={v => setTweaks("showNotes", v)}
          />
        </window.TweakSection>
        <window.TweakSection title="Accent palette">
          <window.TweakRadio
            label="Accent"
            value={tweaks.accentName}
            onChange={v => {
              const palettes = {
                "Bronze": ["#A67C52", "#6B4A2B", "rgba(166,124,82,0.10)"],
                "Terracotta": ["#B5654A", "#7A3E2C", "rgba(181,101,74,0.10)"],
                "Sage": ["#7A8B6F", "#4A5742", "rgba(122,139,111,0.10)"],
                "Ink": ["#3C3832", "#1A1815", "rgba(60,56,50,0.08)"],
              };
              const [a, d, t] = palettes[v];
              setTweaks({ accentName: v, accent: a, accentDeep: d, accentTint: t });
            }}
            options={["Bronze", "Terracotta", "Sage", "Ink"]}
          />
        </window.TweakSection>
        <window.TweakSection title="Paper">
          <window.TweakRadio
            label="Background"
            value={tweaks.paperName}
            onChange={v => {
              const papers = {
                "Cream": ["#F5F1EA", "#EFE9DE", "#E8E0D0"],
                "Ivory": ["#FAF7F2", "#F2EDE3", "#EBE3D2"],
                "Cool": ["#F6F6F4", "#EFEFEC", "#E5E5E0"],
              };
              const [p, pw, c] = papers[v];
              setTweaks({ paperName: v, paper: p, paperWarm: pw, cream: c });
            }}
            options={["Cream", "Ivory", "Cool"]}
          />
        </window.TweakSection>
      </window.TweaksPanel>

      <style>{`
        :root {
          --paper: ${tweaks.paper};
          --paper-warm: ${tweaks.paperWarm};
          --cream: ${tweaks.cream};
          --ink-100: #1A1815;
          --ink-80: #3C3832;
          --ink-60: #6B6660;
          --ink-40: #B8B2A8;
          --ink-20: #D9D4C8;
        }
      `}</style>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
