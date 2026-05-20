/* global React */
const { Reveal, Img, Mono, Eyebrow, Btn, PageShell, ChapterOpener, IMG, SURGEON_LIST } = window;

const POST = {
  title: "The quiet rhinoplasty",
  dek: "Why the most flattering nose is the one no one notices. On restraint, structure, and the small shifts that change a face.",
  category: "Surgical",
  date: "April 2026",
  read: "8 min read",
  img: IMG.surgical,
  hue: 0,
  authorSlug: "suka",
  body: [
    { kind: "p", text: "A patient brought me a photograph of her sister last month — taken twenty years ago, before either of them had given a thought to their faces — and asked, very quietly, whether I could give her back what she had then. I told her, also quietly, that we would not be trying to. Her face has done twenty more years of living, and trying to undo that is a job for cosmetics, not surgery." },
    { kind: "p", text: "What we could do — and what most of my work as a rhinoplasty surgeon really is — is something much smaller. We can take three or four millimetres off the dorsum, soften the supratip break, and lift the tip by the width of a fingernail. The total volume of tissue moved would not fill a teaspoon. And yet the result, when it is right, is that her sister, and her mother, and her oldest friend will all look at her and say only, 'You look well. Have you been on holiday?'" },
    { kind: "h", text: "What restraint actually looks like" },
    { kind: "p", text: "The fashion for dramatic, ski-jump rhinoplasty results — the kind of nose that announces itself across a room — has been over for at least a decade in the centres where I trained. It has been replaced, slowly, by what is sometimes called the 'preservation rhinoplasty' movement: a school of technique that aims to leave the underlying nasal structure as intact as possible, and to make corrections by repositioning rather than by removing." },
    { kind: "p", text: "In practice this means lifting the cartilaginous dorsum off the bony pyramid as a single unit, taking a small wedge of bone from beneath it, and lowering the whole structure as a hinge. The skin envelope, the tip, and the lining are barely disturbed. Patients heal faster. Their results look like the noses they were always supposed to have." },
    { kind: "pull", text: "The total volume of tissue moved would not fill a teaspoon. And yet — her sister, her mother, her oldest friend will say only, 'You look well.'" },
    { kind: "h", text: "The conversation before the surgery" },
    { kind: "p", text: "I spend more time talking patients out of operations than into them. About one rhinoplasty consultation in four leaves my room without an operation booked — usually because the change the patient wants is smaller than they realised, and is best achieved with two or three carefully placed filler appointments, or with nothing at all. The ethical line, for me, is this: if a patient's nose is doing its job, and the person looking back at them in the mirror is in fact themselves, the bar for cutting into it should be very high." },
    { kind: "p", text: "When we do operate, the conversation in the weeks beforehand matters as much as the surgery itself. We look at photographs together — not of celebrities, but of the patient herself across ten or fifteen years. We trace, in pencil, what we are going to change and what we are explicitly not. We agree on the things that will stay: the bump that her father had, the slight asymmetry that she has decided to keep. None of these are written in the operative notes, but all of them shape the procedure." },
    { kind: "h", text: "Recovery, in three weeks" },
    { kind: "p", text: "Surgery itself takes about two and a half hours under general anaesthetic. Patients stay in the hospital for one night and move to a private villa the following morning. We see them every day for the first week, three times in the second, and once before they fly home in the third. The cast comes off at day seven; visible bruising fades by day ten; the swelling that the patient herself can feel — particularly around the tip — settles over six to twelve months." },
    { kind: "p", text: "The thing I tell every patient before they go home: do not judge the result at six weeks, or at three months. Judge it next April, when you happen to catch yourself in a window and forget for a moment that you ever had it done." },
    { kind: "h", text: "A short note on technique" },
    { kind: "list", items: [
      "Preservation dorsal hump reduction (subdorsal Cottle).",
      "Lateral and intermediate crural sutures, never grafts where suturing will do.",
      "Caudal septal extension only when the existing caudal septum is short.",
      "No tip grafts on primary cases unless the tip projection is structurally inadequate.",
      "Closed approach by default; open approach only for revision and for severe deviation.",
    ]},
    { kind: "p", text: "None of this is unique to me, and none of it is new. It is the standard of care at every ISAPS centre I have visited in Japan, Korea, and Singapore over the last decade. The only thing we add, in Bali, is the time — and the villa, the nursing, the quiet — to let the result settle into the patient's life before she flies back into hers." },
    { kind: "h", text: "What to ask, on your consultation" },
    { kind: "list", items: [
      "What, specifically, are you not going to change?",
      "Show me a photograph of myself, from any age, that you would aim towards.",
      "What is the smallest version of this operation that would solve the thing I came in for?",
      "What does your revision rate look like, over five years?",
    ]},
    { kind: "p", text: "If your surgeon does not have answers to those four questions, ready to hand, find another surgeon. There is no shortage of us. There is, however, a quiet shortage of the kind who will say 'no' to you, or 'less than you asked', and that is the kind to look for." },
  ],
  related: ["before-you-fly", "fillers-restraint", "crani-bali"],
};

const RELATED_META = {
  "before-you-fly":    { title: "Before you fly: a six-week pre-op letter.", category: "Journey",     date: "March 2026",    img: IMG.concierge, hue: 1 },
  "the-villa-protocol":{ title: "The villa protocol.",                       category: "Recovery",    date: "March 2026",    img: IMG.villa2,    hue: 2 },
  "fillers-restraint": { title: "On fillers, restraint, and the long view.", category: "Non-surgical",date: "February 2026", img: IMG.injectables, hue: 3 },
  "crani-bali":        { title: "Craniomaxillofacial surgery in Bali, in 2026.", category: "Surgical", date: "December 2025", img: IMG.surgical,  hue: 5 },
};

const Page = () => {
  const author = SURGEON_LIST.find(s => s.slug === POST.authorSlug);

  return (
    <PageShell activePage="blog">
      <ChapterOpener
        chapter={`Chapter X — Journal · ${POST.category}`}
        title={POST.title.split(" ").reduce((acc, w, i, arr) => {
          // split title into two visual lines around middle
          const mid = Math.ceil(arr.length / 2);
          if (i === 0) acc[0] = w;
          else if (i < mid) acc[0] += " " + w;
          else if (i === mid) acc[1] = w;
          else acc[1] += " " + w;
          return acc;
        }, ["", ""])}
        lede={POST.dek}
        image={POST.img}
        imageHue={POST.hue}
        imageLabel={POST.category.toUpperCase()}
        breadcrumbs={[
          { label: "BIMC CosMedic", href: "index.html" },
          { label: "Journal", href: "blog.html" },
          { label: POST.title },
        ]}
      />

      {/* Byline strip */}
      <section className="blog-byline">
        <Reveal>
          <div className="blog-byline-inner">
            <div className="blog-byline-author">
              <a href={`surgeon-${author.slug}.html`} className="blog-byline-portrait" data-surgeon={author.slug}>
                <Img src={author.img} fallbackLabel={`DR. ${author.common.toUpperCase()}`} fallbackHue={author.hue} alt="" />
              </a>
              <div>
                <Mono>Written by</Mono>
                <div className="blog-byline-name">{author.title} {author.name}</div>
                <span className="blog-byline-role">{author.group}</span>
              </div>
            </div>
            <div className="blog-byline-meta">
              <div><Mono>Published</Mono><span>{POST.date}</span></div>
              <div><Mono>Length</Mono><span>{POST.read}</span></div>
              <div><Mono>Filed under</Mono><span>{POST.category}</span></div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Body */}
      <section className="page-section blog-body">
        <article className="blog-article">
          {POST.body.map((block, i) => {
            if (block.kind === "p") return (
              <Reveal key={i} delay={Math.min(i, 6) * 40}>
                <p className="blog-p">{block.text}</p>
              </Reveal>
            );
            if (block.kind === "h") return (
              <Reveal key={i} delay={80}>
                <h3 className="blog-h">{block.text}</h3>
              </Reveal>
            );
            if (block.kind === "pull") return (
              <Reveal key={i} delay={80}>
                <blockquote className="blog-pull">{block.text}</blockquote>
              </Reveal>
            );
            if (block.kind === "list") return (
              <Reveal key={i} delay={80}>
                <ul className="blog-list">
                  {block.items.map((it, j) => <li key={j}>{it}</li>)}
                </ul>
              </Reveal>
            );
            return null;
          })}
        </article>
      </section>

      {/* Author callout */}
      <section className="page-section tinted">
        <Reveal>
          <div className="blog-author-callout">
            <a href={`surgeon-${author.slug}.html`} className="blog-author-portrait" data-surgeon={author.slug}>
              <Img src={author.heroImg || author.img} fallbackLabel={`DR. ${author.common.toUpperCase()}`} fallbackHue={author.hue} alt="" />
            </a>
            <div className="blog-author-body">
              <Mono>About the author</Mono>
              <h3 className="blog-author-name">
                <span>{author.title} {author.name.split(" ").slice(0, -1).join(" ")}</span>{" "}
                <span className="italic">{author.name.split(" ").slice(-1)[0]}</span>
              </h3>
              <p className="blog-author-cred">{author.cred}</p>
              <p className="blog-author-bio">{author.bio.split(/(?<=[a-z]\.)\s+(?=[A-Z])/).slice(0, 2).join(" ")}</p>
              <div style={{ display: "flex", gap: 16, marginTop: 20, flexWrap: "wrap" }}>
                <Btn kind="primary" as="a" href={`surgeon-${author.slug}.html`}>Read full profile</Btn>
                <Btn kind="ghost" as="a" href="contact.html">Book a consultation</Btn>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Related */}
      <section className="page-section">
        <Reveal>
          <div className="section-head">
            <Eyebrow>More from the journal</Eyebrow>
            <div>
              <h2 className="section-title">Read <span className="italic">on.</span></h2>
            </div>
          </div>
        </Reveal>
        <div className="blog-grid">
          {POST.related.map((slug, i) => {
            const r = RELATED_META[slug];
            if (!r) return null;
            return (
              <Reveal key={slug} delay={i * 80}>
                <a href={`blog-${slug}.html`} className="blog-card">
                  <div className="blog-card-img">
                    <Img src={r.img} fallbackLabel={r.category.toUpperCase()} fallbackHue={r.hue} alt="" />
                  </div>
                  <div className="blog-card-meta">
                    <div className="blog-card-mono">
                      <Mono>{r.category}</Mono>
                      <span className="blog-card-dot">·</span>
                      <Mono>{r.date}</Mono>
                    </div>
                    <h3 className="blog-card-title">{r.title}</h3>
                  </div>
                </a>
              </Reveal>
            );
          })}
        </div>
        <Reveal>
          <div style={{ marginTop: 60, textAlign: "center" }}>
            <Btn kind="ghost" as="a" href="blog.html">Back to the journal</Btn>
          </div>
        </Reveal>
      </section>
    </PageShell>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Page />);
