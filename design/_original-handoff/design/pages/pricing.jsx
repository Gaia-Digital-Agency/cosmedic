/* global React */
const { Reveal, Img, Mono, Eyebrow, Btn, PageShell, ChapterOpener, IMG, TREATMENT_LIST } = window;

const PACKAGES = [
  { tier: "The Refresh", italic: "A maintenance visit", amount: "650", from: "AUD · from", small: "1–2 days · single visit",
    items: ["Botulinum toxin (one area)", "Medical-grade facial", "Skin consultation with surgeon", "Take-home protocol", "Twelve-month maintenance plan"], cta: "Book a refresh" },
  { tier: "The Edit", italic: "Most patients begin here", amount: "8,500", from: "AUD · from", small: "10–14 days · single procedure",
    items: ["Single surgical procedure", "Theatre, anaesthetic & overnight obs", "5–7 nights in private villa", "Daily nursing visits", "Three lymphatic drainage sessions", "Twelve-month video follow-up", "Concierge throughout"], cta: "Plan your edit", featured: true },
  { tier: "The Composition", italic: "Combined procedures, one visit", amount: "16,800", from: "AUD · from", small: "18–21 days · multiple procedures",
    items: ["Two combined surgical procedures", "Theatre, anaesthetic & overnight obs", "14 nights in private villa", "Daily nursing & physiotherapy", "Six lymphatic drainage sessions", "Family accommodation included", "Twelve-month follow-up", "Dedicated senior concierge"], cta: "Plan your composition" },
];

const Page = () => (
  <PageShell activePage="pricing">
    <ChapterOpener
      chapter="Chapter X — Pricing & Insurance"
      title={["Considered,", "all-inclusive."]}
      lede="Three indicative packages. Every plan is priced individually after consultation; what we quote is what you pay. No hidden fees, no upgrade tiers in the recovery villa."
      image={IMG.texture}
      imageHue={2}
      imageLabel="PRICING"
      breadcrumbs={[{ label: "BIMC CosMedic", href: "index.html" }, { label: "Pricing & Insurance" }]}
    />

    {/* Pricing tier cards */}
    <section className="page-section">
      <Reveal>
        <div className="section-head-center">
          <Eyebrow>Indicative packages</Eyebrow>
          <h2 className="section-title">Three ways to <span className="italic">begin.</span></h2>
          <p className="section-lede">All packages include treatment, recovery, accommodation, nursing, transfers, and twelve months of follow-up. We will quote you precisely after your consultation.</p>
        </div>
      </Reveal>

      <div className="pricing-grid">
        {PACKAGES.map((p, i) => {
          const numericAmount = parseInt((p.amount || "").replace(/,/g, ""), 10);
          const showPair = !isNaN(numericAmount) && numericAmount > 0;
          const idr = showPair ? "Rp " + (Math.round(numericAmount * 10500 / 50000) * 50000).toLocaleString("de-DE") : null;
          const aud = showPair ? "AUD " + numericAmount.toLocaleString("en-AU") : null;
          return (
            <Reveal key={i} delay={i * 100}>
              <div className={`pricing-card ${p.featured ? "featured" : ""}`}>
                {p.featured && <div className="pricing-badge">Most chosen</div>}
                <Mono>{p.tier}</Mono>
                <div className="price-tier">{p.italic}</div>
                <div className="price-amount">
                  {showPair ? (
                    <>
                      <span style={{ display: "block", fontSize: 38, lineHeight: 1, letterSpacing: "-0.01em" }}>{idr}</span>
                      <span style={{ display: "block", fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: 17, color: p.featured ? "rgba(255,255,255,0.7)" : "var(--ink-60)", marginTop: 8, fontWeight: 400, letterSpacing: 0 }}>≈ {aud}</span>
                    </>
                  ) : (
                    <span>{p.amount}</span>
                  )}
                  <small>From · {p.small}</small>
                </div>
                <ul className="price-list">
                  {p.items.map((it, j) => <li key={j}>{it}</li>)}
                </ul>
                <Btn kind={p.featured ? "accent" : "ghost"} as="a" href="contact.html" full>{p.cta}</Btn>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>

    {/* Per-treatment pricing summary */}
    <section className="page-section tinted">
      <Reveal>
        <div className="section-head">
          <Eyebrow>By treatment</Eyebrow>
          <div>
            <h2 className="section-title">Indicative starting points.</h2>
            <p className="section-lede">A starting price for each discipline. Detailed pricing for individual procedures lives on each treatment page.</p>
          </div>
        </div>
      </Reveal>
      <div style={{ borderTop: "1px solid var(--ink-20)" }}>
        {[
          { t: "Surgical", from: "AUD 5,400", note: "Eyelid surgery — single procedure", slug: "surgical" },
          { t: "Non-surgical", from: "AUD 280", note: "Single HydraFacial appointment", slug: "non-surgical" },
          { t: "Hair Restoration", from: "AUD 4,800", note: "Up to 2,000 sapphire FUE grafts", slug: "hair" },
          { t: "Dental Aesthetics", from: "AUD 580", note: "Professional whitening", slug: "dental" },
          { t: "Recovery & Wellness", from: "AUD 280 / night", note: "Private villa with provisioning", slug: "recovery" },
          { t: "Concierge", from: "Included", note: "Always — never an add-on", slug: "concierge" },
        ].map((r, i) => (
          <Reveal key={i} delay={i * 40}>
            <a href={`treatment-${r.slug}.html`} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 220px 60px", gap: 32, padding: "32px 0", borderBottom: "1px solid var(--ink-20)", alignItems: "center", color: "inherit" }}>
              <h4 style={{ fontFamily: "var(--font-serif)", fontSize: 30, fontWeight: 400, margin: 0, letterSpacing: "-0.01em" }}>{r.t}</h4>
              <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: 18, color: "var(--ink-60)" }}>{r.note}</span>
              <window.PriceTag aud={r.from} align="right" />
              <span style={{ textAlign: "right", color: "var(--ink-60)" }}>→</span>
            </a>
          </Reveal>
        ))}
      </div>
    </section>

    {/* Insurance & finance */}
    <section className="page-section">
      <div className="two-col">
        <Reveal>
          <div>
            <Eyebrow>Insurance</Eyebrow>
            <h2 className="section-title" style={{ marginTop: 16, marginBottom: 24 }}>Working <span className="italic">with insurers.</span></h2>
            <p style={{ fontSize: 17, lineHeight: 1.65, color: "var(--ink-80)", margin: "0 0 16px" }}>
              Cosmetic surgery is rarely covered by health insurance. Reconstructive procedures may be — and where they are, we are happy to support your claim with full documentation, surgeon's reports, and itemised invoicing.
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.65, color: "var(--ink-80)", margin: "0 0 16px" }}>
              Travel insurance is recommended for every patient, and we work with two specialist medical-travel insurers — details supplied during consultation.
            </p>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <div>
            <Eyebrow>Payment</Eyebrow>
            <h2 className="section-title" style={{ marginTop: 16, marginBottom: 24 }}>Quiet, <span className="italic">considered terms.</span></h2>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, borderTop: "1px solid var(--ink-20)" }}>
              {[
                ["Deposit", "20% on confirmation"],
                ["Balance", "On admission, by transfer"],
                ["Currencies", "IDR, AUD, USD, EUR"],
                ["Cards", "Accepted, 1.8% surcharge"],
                ["Refunds", "Full, until 14 days before"],
                ["Finance", "Available via partner lender"],
              ].map(([k, v], i) => (
                <li key={i} style={{ display: "flex", justifyContent: "space-between", padding: "16px 0", borderBottom: "1px solid var(--ink-20)" }}>
                  <Mono>{k}</Mono>
                  <span style={{ fontFamily: "var(--font-serif)", fontSize: 17, color: "var(--ink-100)" }}>{v}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  </PageShell>
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Page />);
