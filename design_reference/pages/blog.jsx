/* global React */
const { Reveal, Img, Mono, Eyebrow, Btn, PageShell, ChapterOpener, IMG } = window;

const POSTS = [
  {
    slug: "the-quiet-rhinoplasty",
    title: "The quiet rhinoplasty",
    dek: "Why the most flattering nose is the one no one notices. On restraint, structure, and the small shifts that change a face.",
    author: "dr. I Made Suka Adnyana",
    role: "Plastic, Reconstructive & Aesthetic Surgery",
    date: "April 2026",
    read: "8 min read",
    category: "Surgical",
    img: IMG.surgical,
    hue: 0,
    featured: true,
  },
  {
    slug: "before-you-fly",
    title: "Before you fly: a six-week pre-op letter.",
    dek: "What to stop, what to start, what to bring — and why the week before surgery is more important than the day of.",
    author: "Ms. Made Wirati",
    role: "Patient Concierge Lead",
    date: "March 2026",
    read: "6 min read",
    category: "Journey",
    img: IMG.concierge,
    hue: 1,
  },
  {
    slug: "the-villa-protocol",
    title: "The villa protocol.",
    dek: "Seven mornings of nursing, three of stillness, and the architectural reason recovery in Bali feels different.",
    author: "Ms. Putu Lestari",
    role: "Director of Recovery Stays",
    date: "March 2026",
    read: "9 min read",
    category: "Recovery",
    img: IMG.villa2,
    hue: 2,
  },
  {
    slug: "fillers-restraint",
    title: "On fillers, restraint, and the long view.",
    dek: "An aesthetic physician's case for doing less, slower — and the patient conversations that follow.",
    author: "dr. Rosalina Silvia Dewi",
    role: "Aesthetic & Anti-Aging Medicine",
    date: "February 2026",
    read: "7 min read",
    category: "Non-surgical",
    img: IMG.injectables,
    hue: 3,
  },
  {
    slug: "achsi-what-it-means",
    title: "What ACHSI accreditation actually means.",
    dek: "Twelve years inside the audit cycle, in plain English. What it tests, what it doesn't, and why we keep doing it.",
    author: "Dr. Craig Beavis",
    role: "Medical Director, BIMC Hospital",
    date: "January 2026",
    read: "10 min read",
    category: "Standards",
    img: IMG.clinic,
    hue: 4,
  },
  {
    slug: "crani-bali",
    title: "Craniomaxillofacial surgery in Bali, in 2026.",
    dek: "A subspecialist on what's changed in the last decade — fellowship pathways, imaging, and patient expectations.",
    author: "dr. Gede Wara Samsarga",
    role: "Plastic Surgery — Craniomaxillofacial",
    date: "December 2025",
    read: "11 min read",
    category: "Surgical",
    img: IMG.surgical,
    hue: 5,
  },
  {
    slug: "dental-veneers-honesty",
    title: "Veneers: what we say no to.",
    dek: "Why we turn down roughly one in three veneer consultations — and the questions we ask first.",
    author: "dr. Theresia Indri Indrawati Setiadi",
    role: "Dermatology, Venereology & Aesthetics",
    date: "December 2025",
    read: "6 min read",
    category: "Dental",
    img: IMG.dental,
    hue: 0,
  },
];

const CATEGORIES = ["All", "Surgical", "Non-surgical", "Recovery", "Journey", "Standards", "Dental"];

const PostCard = ({ p, i }) => (
  <Reveal delay={i * 60}>
    <a href={`blog-${p.slug}.html`} className="blog-card">
      <div className="blog-card-img">
        <Img src={p.img} fallbackLabel={p.category.toUpperCase()} fallbackHue={p.hue} alt="" />
      </div>
      <div className="blog-card-meta">
        <div className="blog-card-mono">
          <Mono>{p.category}</Mono>
          <span className="blog-card-dot">·</span>
          <Mono>{p.date}</Mono>
        </div>
        <h3 className="blog-card-title">{p.title}</h3>
        <p className="blog-card-dek">{p.dek}</p>
        <div className="blog-card-author">
          <span className="blog-card-author-name">{p.author}</span>
          <span className="blog-card-author-role">{p.role}</span>
        </div>
      </div>
    </a>
  </Reveal>
);

const Page = () => {
  const featured = POSTS.find(p => p.featured) || POSTS[0];
  const rest = POSTS.filter(p => p.slug !== featured.slug);
  const [filter, setFilter] = React.useState("All");
  const shown = filter === "All" ? rest : rest.filter(p => p.category === filter);

  return (
    <PageShell activePage="blog">
      <ChapterOpener
        chapter="Chapter X — Journal"
        title={["Notes from", "the practice."]}
        lede="Quarterly dispatches from our surgeons, aestheticians, and concierge — on technique, recovery, restraint, and the small decisions that add up to a good result."
        image={IMG.texture}
        imageHue={2}
        imageLabel="JOURNAL"
        breadcrumbs={[{ label: "BIMC CosMedic", href: "index.html" }, { label: "Journal" }]}
      />

      {/* Featured post */}
      <section className="page-section">
        <Reveal><Eyebrow>This issue</Eyebrow></Reveal>
        <Reveal delay={120}>
          <a href={`blog-${featured.slug}.html`} className="blog-feature">
            <div className="blog-feature-img">
              <Img src={featured.img} fallbackLabel={featured.category.toUpperCase()} fallbackHue={featured.hue} alt="" />
            </div>
            <div className="blog-feature-body">
              <div className="blog-card-mono">
                <Mono>{featured.category}</Mono>
                <span className="blog-card-dot">·</span>
                <Mono>{featured.date}</Mono>
                <span className="blog-card-dot">·</span>
                <Mono>{featured.read}</Mono>
              </div>
              <h2 className="blog-feature-title">
                <span className="italic">{featured.title.split(" ").slice(0, 2).join(" ")}</span>{" "}
                {featured.title.split(" ").slice(2).join(" ")}
              </h2>
              <p className="blog-feature-dek">{featured.dek}</p>
              <div className="blog-feature-author">
                <span className="blog-feature-author-name">{featured.author}</span>
                <span className="blog-feature-author-role">{featured.role}</span>
              </div>
              <span className="blog-feature-read">Read the essay →</span>
            </div>
          </a>
        </Reveal>
      </section>

      {/* All posts */}
      <section className="page-section tinted">
        <Reveal>
          <div className="section-head">
            <Eyebrow>The archive</Eyebrow>
            <div>
              <h2 className="section-title">Recent <span className="italic">writing.</span></h2>
              <p className="section-lede">Filter by discipline, or read down. New essays go out with the quarterly journal — subscribe at the foot of any page.</p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="blog-filters">
            {CATEGORIES.map(c => (
              <button
                key={c}
                type="button"
                className={`blog-filter ${filter === c ? "active" : ""}`}
                onClick={() => setFilter(c)}
              >{c}</button>
            ))}
          </div>
        </Reveal>

        <div className="blog-grid">
          {shown.map((p, i) => <PostCard key={p.slug} p={p} i={i} />)}
        </div>

        {shown.length === 0 && (
          <Reveal>
            <p style={{ textAlign: "center", padding: "60px 0", color: "var(--ink-60)", fontStyle: "italic", fontFamily: "var(--font-serif)", fontSize: 22 }}>
              No posts in this category yet.
            </p>
          </Reveal>
        )}
      </section>
    </PageShell>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Page />);
