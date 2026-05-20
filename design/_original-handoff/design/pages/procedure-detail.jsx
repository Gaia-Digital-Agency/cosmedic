/* global React */
const { useState } = React;
const { Reveal, Img, Mono, Eyebrow, Btn, PageShell, ChapterOpener, IMG, TREATMENT_LIST, SURGEON_LIST, placeholder, PROCEDURE_DATA } = window;

// Map parent discipline to the lead surgeon (matches treatment-detail leadSurgeon assignments)
const PARENT_TO_LEAD = {
  surgical: "suka",
  "non-surgical": "sissy",
  hair: "suka",
  dental: "astri",
  recovery: "suka",
  concierge: "suka",
};

// Hero image keyword per parent (uses Unsplash IDs already in window.IMG)
const HERO_IMAGE_BY_PARENT = {
  surgical: "surgical",
  "non-surgical": "injectables",
  hair: "hair",
  dental: "dental",
  recovery: "recovery",
  concierge: "concierge",
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

window.ProcedureDetailPage = ({ slug }) => {
  const p = PROCEDURE_DATA[slug];
  if (!p) return <div style={{ padding: 80, fontFamily: "var(--font-serif)" }}>Procedure not found.</div>;

  const parent = TREATMENT_LIST.find(t => t.slug === p.parent);
  const surgeonSlug = PARENT_TO_LEAD[p.parent];
  const surgeon = SURGEON_LIST.find(s => s.slug === surgeonSlug);
  const heroImg = IMG[HERO_IMAGE_BY_PARENT[p.parent]] || IMG.hero;

  // Related: other procedures in the same discipline
  const related = Object.values(PROCEDURE_DATA)
    .filter(x => x.parent === p.parent && x.slug !== p.slug)
    .slice(0, 3);

  return (
    <PageShell activePage={`treatment-${p.parent}`}>
      <ChapterOpener
        chapter={`${parent?.t || "Procedure"} · ${p.title}`}
        title={p.chapterTitle}
        lede={p.short}
        image={heroImg}
        imageHue={parent?.hue || 0}
        imageLabel={p.title.toUpperCase()}
        breadcrumbs={[
          { label: "BIMC CosMedic", href: "index.html" },
          { label: "Treatments", href: "treatments.html" },
          { label: parent?.t || "Treatments", href: `treatment-${p.parent}.html` },
          { label: p.title },
        ]}
      />

      <div className="detail-layout">
        <aside className="detail-toc">
          <Mono>On this page</Mono>
          <ol>
            {p.sections.map(s => (
              <li key={s.id}><a href={`#${s.id}`}>{s.t}</a></li>
            ))}
            <li><a href="#pricing">Pricing</a></li>
            <li><a href="#faqs">FAQs</a></li>
          </ol>
        </aside>

        <div className="detail-body">
          {p.sections.map((s, i) => (
            <section key={s.id} id={s.id}>
              <Reveal>
                {i === 0
                  ? <Mono style={{ display: "block", marginBottom: 12 }}>I — {s.t}</Mono>
                  : <h2>{s.t}</h2>}
                {i === 0 ? <p className="lede">{s.body}</p> : <p>{s.body}</p>}
              </Reveal>
              {/* Drop the surgeon mini-card after the first section */}
              {i === 0 && surgeon && (
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
          ))}

          <section id="pricing">
            <Reveal><h2>Pricing</h2></Reveal>
            <Reveal delay={100}><p>Indicative packages, in Australian dollars and Indonesian rupiah. Every plan is priced individually after consultation.</p></Reveal>
            <div className="pricing-grid" style={{ marginTop: 40 }}>
              {p.pricing.map((t, i) => {
                const numericAmount = parseInt((t.amount || "").replace(/,/g, ""), 10);
                const showPair = !isNaN(numericAmount) && numericAmount > 0;
                const idr = showPair ? "Rp " + (Math.round(numericAmount * 10500 / 50000) * 50000).toLocaleString("de-DE") : null;
                const aud = showPair ? "AUD " + numericAmount.toLocaleString("en-AU") : null;
                return (
                  <Reveal key={i} delay={i * 80}>
                    <div className={`pricing-card ${t.featured ? "featured" : ""}`}>
                      {t.featured && <div className="pricing-badge">Most chosen</div>}
                      <Mono>{t.tier}</Mono>
                      <div className="price-tier">{t.italic}</div>
                      <div className="price-amount">
                        {showPair ? (
                          <>
                            <span style={{ display: "block", fontSize: 38, lineHeight: 1, letterSpacing: "-0.01em" }}>{idr}</span>
                            <span style={{ display: "block", fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: 17, color: t.featured ? "rgba(255,255,255,0.7)" : "var(--ink-60)", marginTop: 8, fontWeight: 400, letterSpacing: 0 }}>≈ {aud}</span>
                          </>
                        ) : (
                          <span>{t.amount}</span>
                        )}
                        <small>{t.from}{t.small ? " · " + t.small : ""}</small>
                      </div>
                      <ul className="price-list">
                        {t.items.map((it, j) => <li key={j}>{it}</li>)}
                      </ul>
                      <Btn kind={t.featured ? "accent" : "ghost"} as="a" href="contact.html" full>{t.cta}</Btn>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </section>

          <section id="faqs">
            <Reveal><h2>Frequently asked</h2></Reveal>
            <div className="faq-list">
              {p.faqs.map((f, i) => (
                <FAQItem key={i} q={f.q} a={f.a} />
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="page-section tinted">
          <Reveal>
            <div className="section-head">
              <Eyebrow>Related</Eyebrow>
              <div>
                <h2 className="section-title">Other <span className="italic">{(parent?.t || "treatment").toLowerCase()} procedures.</span></h2>
                <p className="section-lede">Patients considering {p.title.toLowerCase()} often also explore these.</p>
              </div>
            </div>
          </Reveal>
          <div className="related-grid">
            {related.map((rel, i) => (
              <Reveal key={rel.slug} delay={i * 80}>
                <a href={`procedure-${rel.slug}.html`} className="related-card" style={{ color: "inherit" }}>
                  <div className="related-card-img">
                    <Img src={IMG[HERO_IMAGE_BY_PARENT[rel.parent]] || IMG.hero} fallbackLabel={rel.title.toUpperCase()} fallbackHue={parent?.hue || 0} alt="" />
                  </div>
                  <Mono>{(parent?.t || "").toUpperCase()}</Mono>
                  <h4>{rel.title}</h4>
                  <p>{rel.tagline}</p>
                </a>
              </Reveal>
            ))}
          </div>
        </section>
      )}
    </PageShell>
  );
};
