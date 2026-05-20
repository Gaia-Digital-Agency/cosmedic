/* global React */
const { useState } = React;
const {
  Reveal, Img, Mono, Eyebrow, Btn, PageShell, ChapterOpener,
  IMG, TREATMENT_LIST, SURGEON_LIST
} = window;

// Format an AUD integer into "Rp X..." + "≈ AUD X..." (matches site convention).
// Accepts: number (AUD), or string "included" / "complimentary" — returns label only.
const formatPrice = (val) => {
  if (val === "included" || val === "complimentary") {
    return { idr: null, aud: null, label: val.charAt(0).toUpperCase() + val.slice(1) };
  }
  const aud = typeof val === "number" ? val : parseInt(val, 10);
  if (!aud || isNaN(aud)) return { idr: null, aud: null, label: null };
  const idr = "Rp " + (Math.round(aud * 10500 / 50000) * 50000).toLocaleString("de-DE");
  return { idr, aud: "AUD " + aud.toLocaleString("en-AU"), label: null };
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

const TreatmentRow = ({ t, subTitle }) => {
  const [open, setOpen] = useState(false);
  const price = formatPrice(t.priceFromAud);
  const procParam = encodeURIComponent(`${subTitle} — ${t.name}`);

  return (
    <div
      style={{
        borderBottom: "1px solid var(--ink-20)",
        background: open ? "rgba(166,124,82,0.04)" : "transparent",
        transition: "background .25s ease",
      }}
    >
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        style={{
          width: "100%", background: "transparent", border: "none", padding: "26px 28px",
          cursor: "pointer", textAlign: "left", display: "grid",
          gridTemplateColumns: "1.1fr 1.6fr 180px 28px", gap: 28, alignItems: "center",
        }}
      >
        <h4 style={{
          fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: 24,
          margin: 0, letterSpacing: "-0.01em", color: "var(--ink-100)",
        }}>{t.name}</h4>
        <p style={{
          margin: 0, fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 400,
          fontSize: 15, color: "var(--ink-80)", lineHeight: 1.55,
        }}>{t.short}</p>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 3 }}>
          {price.label ? (
            <span style={{
              fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.18em",
              color: "var(--accent-deep)", textTransform: "uppercase", whiteSpace: "nowrap",
            }}>{price.label}</span>
          ) : (
            <>
              <span style={{
                fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.18em",
                color: "var(--accent-deep)", whiteSpace: "nowrap",
              }}>{price.idr}</span>
              <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: 13, color: "var(--ink-60)" }}>≈ {price.aud}</span>
            </>
          )}
        </div>
        <span style={{
          fontFamily: "var(--font-serif)", fontSize: 26, color: "var(--accent-deep)",
          textAlign: "right", transition: "transform .3s ease",
          transform: open ? "rotate(45deg)" : "rotate(0deg)", lineHeight: 1,
        }}>+</span>
      </button>

      <div style={{
        maxHeight: open ? 1200 : 0,
        overflow: "hidden",
        transition: "max-height .45s cubic-bezier(.2,.7,.2,1)",
      }}>
        <div style={{ padding: "4px 28px 32px", display: "flex", flexDirection: "column", gap: 20 }}>
          <p style={{ margin: 0, paddingRight: 24, fontSize: 16, color: "var(--ink-80)", lineHeight: 1.65 }}>{t.detail.description}</p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, paddingTop: 16, borderTop: "1px solid var(--ink-20)" }}>
            <div>
              <Mono style={{ color: "var(--accent-deep)" }}>Duration</Mono>
              <p style={{ margin: "6px 0 0", fontFamily: "var(--font-serif)", fontSize: 16, lineHeight: 1.5 }}>{t.detail.duration}</p>
            </div>
            <div>
              <Mono style={{ color: "var(--accent-deep)" }}>Recovery</Mono>
              <p style={{ margin: "6px 0 0", fontFamily: "var(--font-serif)", fontSize: 16, lineHeight: 1.5 }}>{t.detail.recovery}</p>
            </div>
          </div>

          <div>
            <Mono style={{ color: "var(--accent-deep)" }}>What's included</Mono>
            <ul style={{ listStyle: "none", padding: 0, margin: "12px 0 0", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 24px" }}>
              {t.detail.included.map((it, i) => (
                <li key={i} style={{
                  fontFamily: "var(--font-serif)", fontSize: 15, color: "var(--ink-80)",
                  paddingLeft: 18, position: "relative", lineHeight: 1.5,
                }}>
                  <span style={{ position: "absolute", left: 0, top: 9, width: 10, height: 1, background: "var(--accent)" }} />
                  {it}
                </li>
              ))}
            </ul>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12, paddingTop: 18, borderTop: "1px solid var(--ink-20)", alignItems: "flex-end" }}>
            <a href={`contact.html?intent=estimate&procedure=${procParam}`}
              className="btn btn-accent" style={{ width: 280 }}>
              <span>Plan your journey</span><span className="btn-arrow">→</span>
            </a>
            <a href={`video-consult.html?procedure=${procParam}`}
              className="btn btn-ghost" style={{ width: 280 }}>
              <span>Book a video consult</span><span className="btn-arrow">→</span>
            </a>
            <a href={`https://wa.me/6281339001911?text=${encodeURIComponent("Hello — I'd like to ask about " + t.name + ".")}`}
              target="_blank" rel="noopener"
              className="btn btn-ghost" style={{ width: 280 }}>
              <span>WhatsApp concierge</span><span className="btn-arrow">→</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

window.SubCategoryPage = ({ slug }) => {
  const s = window.SUBCATEGORY_DATA[slug];
  if (!s) return <div style={{ padding: 80 }}>Sub-category not found.</div>;

  const parent = TREATMENT_LIST.find(t => t.slug === s.parent);
  const surgeon = SURGEON_LIST.find(x => x.slug === s.leadSurgeon);
  const heroImg = parent?.heroImg || IMG.hero;

  return (
    <PageShell activePage={`treatment-${s.parent}`}>
      <ChapterOpener
        chapter={`${parent?.t || "Treatment"} · ${s.title}`}
        title={s.chapterTitle}
        lede={s.lede}
        image={heroImg}
        imageHue={parent?.hue || 0}
        imageLabel={s.title.toUpperCase()}
        breadcrumbs={[
          { label: "BIMC CosMedic", href: "index.html" },
          { label: "Treatments", href: "treatments.html" },
          { label: parent?.t || "Treatments", href: `treatment-${s.parent}.html` },
          { label: s.title },
        ]}
      />

      <div className="detail-layout">
        <aside className="detail-toc">
          <Mono>On this page</Mono>
          <ol>
            <li><a href="#overview">Overview</a></li>
            {s.sections.map(sec => <li key={sec.id}><a href={`#${sec.id}`}>{sec.t}</a></li>)}
            <li><a href="#treatments">Treatments</a></li>
            <li><a href="#faqs">FAQs</a></li>
          </ol>

          {/* Local CTAs */}
          <div style={{ marginTop: 32, paddingTop: 28, borderTop: "1px solid var(--ink-20)", display: "flex", flexDirection: "column", gap: 12 }}>
            <Mono style={{ color: "var(--accent-deep)" }}>Take a step</Mono>
            <a href={`video-consult.html?procedure=${encodeURIComponent(s.title)}`}
              style={{ display: "block", padding: "14px 16px", background: "var(--accent)", color: "var(--paper)", fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", textAlign: "center", textDecoration: "none" }}>
              Book a video consult →
            </a>
            <a href={`contact.html?intent=estimate&procedure=${encodeURIComponent(s.title)}`}
              style={{ display: "block", padding: "14px 16px", border: "1px solid var(--ink-100)", color: "var(--ink-100)", fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", textAlign: "center", textDecoration: "none" }}>
              Get a written estimate →
            </a>
            <a href={`https://wa.me/6281339001911?text=${encodeURIComponent("Hello — I'd like to ask about " + s.title + ".")}`}
              target="_blank" rel="noopener"
              style={{ display: "block", padding: "14px 16px", border: "1px solid var(--ink-20)", color: "var(--ink-80)", fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", textAlign: "center", textDecoration: "none" }}>
              WhatsApp the concierge →
            </a>
            <p style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: 13, color: "var(--ink-60)", margin: "8px 0 0", lineHeight: 1.45 }}>
              Replies within 24 hours. No obligation.
            </p>
          </div>
        </aside>

        <div className="detail-body">
          {/* Overview + lead surgeon */}
          <section id="overview">
            <Reveal>
              <h2>Overview</h2>
              <p className="lede" style={{ fontSize: 18 }}>{s.overview}</p>
            </Reveal>
            {surgeon && (
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
            )}
          </section>

          {/* Editorial sections */}
          {s.sections.map(sec => (
            <section key={sec.id} id={sec.id}>
              <Reveal>
                <h2>{sec.t}</h2>
                <p>{sec.body}</p>
              </Reveal>
            </section>
          ))}

          {/* Treatments accordion */}
          <section id="treatments">
            <Reveal>
              <h2>Treatments</h2>
              <p>The full list, with our typical price-from. Tap any treatment to expand details. Final quote is tailored after consultation.</p>
            </Reveal>
            <div style={{ marginTop: 32, borderTop: "1px solid var(--ink-20)" }}>
              {s.treatments.map((t, i) => (
                <Reveal key={i} delay={i * 30}>
                  <TreatmentRow t={t} subTitle={s.title} />
                </Reveal>
              ))}
            </div>
          </section>

          {/* FAQs */}
          {s.faqs && s.faqs.length > 0 && (
            <section id="faqs">
              <Reveal><h2>Frequently asked</h2></Reveal>
              <div className="faq-list">
                {s.faqs.map((f, i) => <FAQItem key={i} q={f.q} a={f.a} />)}
              </div>
            </section>
          )}
        </div>
      </div>
    </PageShell>
  );
};
