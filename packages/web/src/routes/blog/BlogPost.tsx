import React from 'react'
import { PageShell } from '@/components/shell/PageShell'
import { ChapterOpener } from '@/components/primitives/ChapterOpener'
import { Reveal } from '@/components/primitives/Reveal'
import { Img } from '@/components/primitives/Img'
import { Mono, Eyebrow } from '@/components/primitives/Mono'
import { Btn } from '@/components/primitives/Btn'
import { SURGEON_LIST, SURGEON_IMG } from '@/content/seed'
import { BLOG_POST_BODIES, BLOG_POSTS } from '@/content/blog-data'
import { useCms } from '@/lib/cms-context'

type Props = { slug: string }

function splitTitle(title: string): [string, string] {
  const words = title.split(' ')
  const mid = Math.ceil(words.length / 2)
  return [words.slice(0, mid).join(' '), words.slice(mid).join(' ')]
}

export const BlogPost: React.FC<Props> = ({ slug }) => {
  const post = BLOG_POST_BODIES[slug]
  if (!post) return null
  const author = SURGEON_LIST.find((s) => s.slug === post.authorSlug)
  if (!author) return null

  // Resolve any matching CMS Author record (by name match) so we can surface
  // the Authors.surgeonProfile relation — e.g. when a clinician-author has a
  // surgeon profile, badge the byline with a "View clinician profile" link.
  const cms = useCms()
  const matchedAuthor = cms?.authors.find(
    (a) => a.name.toLowerCase().includes(author.common.toLowerCase()) ||
      author.name.toLowerCase().includes(a.name.toLowerCase()),
  )
  const surgeonProfile = matchedAuthor?.surgeonProfile
  const linkedSurgeonSlug =
    surgeonProfile && typeof surgeonProfile !== 'number' ? surgeonProfile.slug : null
  const linkedSurgeonLabel =
    surgeonProfile && typeof surgeonProfile !== 'number'
      ? `${surgeonProfile.commonName || surgeonProfile.name || 'Surgeon profile'}`
      : null

  // R8.B — chrome strings shared across every /blog/<slug> page.
  const tpl = cms?.blogPostTemplate || {}
  const byline = tpl.byline || {}
  const aboutSec = tpl.aboutTheAuthor || {}
  const moreSec = tpl.moreFromTheJournal || {}
  const writtenByLabel = byline.writtenByLabel || 'Written by'
  const publishedLabel = byline.publishedLabel || 'Published'
  const lengthLabel = byline.lengthLabel || 'Length'
  const filedUnderLabel = byline.filedUnderLabel || 'Filed under'
  const aboutEyebrow = aboutSec.eyebrowLabel || 'About the author'
  const readFullProfileCta = aboutSec.readFullProfileCta || 'Read full profile'
  const bookConsultationCta = aboutSec.bookConsultationCta || 'Book a consultation'
  const moreEyebrow = moreSec.eyebrow || 'More from the journal'
  const moreHeadingPre = moreSec.headingPre || 'Read '
  const moreHeadingItalic = moreSec.headingItalic || 'on.'
  const backToJournalCta = moreSec.backToJournalCta || 'Back to the journal'

  return (
    <PageShell activePage="blog">
      <ChapterOpener
        chapter={`Chapter X — Journal · ${post.category}`}
        title={splitTitle(post.title)}
        lede={post.dek}
        image={post.img}
        imageHue={post.hue}
        imageLabel={post.category.toUpperCase()}
        breadcrumbs={[
          { label: 'BIMC CosMedic', href: '/' },
          { label: 'Journal', href: '/blog' },
          { label: post.title },
        ]}
      />

      <section className="blog-byline">
        <Reveal>
          <div className="blog-byline-inner">
            <div className="blog-byline-author">
              <a
                href={`/experts/${author.slug}`}
                className="blog-byline-portrait"
                data-surgeon={author.slug}
              >
                <Img
                  src={SURGEON_IMG(author.slug)}
                  fallbackLabel={`DR. ${author.common.toUpperCase()}`}
                  fallbackHue={author.hue}
                  alt=""
                />
              </a>
              <div>
                <Mono>{writtenByLabel}</Mono>
                <div className="blog-byline-name">
                  {author.title} {author.name}
                </div>
                <span className="blog-byline-role">{author.group}</span>
                {linkedSurgeonSlug ? (
                  <a
                    href={`/experts/${linkedSurgeonSlug}`}
                    style={{
                      display: 'inline-block',
                      marginTop: 6,
                      fontFamily: 'var(--font-mono)',
                      fontSize: 10,
                      letterSpacing: '0.18em',
                      textTransform: 'uppercase',
                      color: 'var(--accent-deep)',
                      textDecoration: 'none',
                      borderBottom: '1px solid var(--accent)',
                      paddingBottom: 2,
                    }}
                  >
                    View clinician profile · {linkedSurgeonLabel} →
                  </a>
                ) : null}
              </div>
            </div>
            <div className="blog-byline-meta">
              <div>
                <Mono>{publishedLabel}</Mono>
                <span>{post.date}</span>
              </div>
              <div>
                <Mono>{lengthLabel}</Mono>
                <span>{post.read}</span>
              </div>
              <div>
                <Mono>{filedUnderLabel}</Mono>
                <span>{post.category}</span>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="page-section blog-body">
        <article className="blog-article">
          {post.body.map((block, i) => {
            if (block.kind === 'p')
              return (
                <Reveal key={i} delay={Math.min(i, 6) * 40}>
                  <p className="blog-p">{block.text}</p>
                </Reveal>
              )
            if (block.kind === 'h')
              return (
                <Reveal key={i} delay={80}>
                  <h3 className="blog-h">{block.text}</h3>
                </Reveal>
              )
            if (block.kind === 'pull')
              return (
                <Reveal key={i} delay={80}>
                  <blockquote className="blog-pull">{block.text}</blockquote>
                </Reveal>
              )
            if (block.kind === 'list')
              return (
                <Reveal key={i} delay={80}>
                  <ul className="blog-list">
                    {block.items.map((it, j) => (
                      <li key={j}>{it}</li>
                    ))}
                  </ul>
                </Reveal>
              )
            return null
          })}
        </article>
      </section>

      <section className="page-section tinted">
        <Reveal>
          <div className="blog-author-callout">
            <a
              href={`/experts/${author.slug}`}
              className="blog-author-portrait"
              data-surgeon={author.slug}
            >
              <Img
                src={SURGEON_IMG(author.slug)}
                fallbackLabel={`DR. ${author.common.toUpperCase()}`}
                fallbackHue={author.hue}
                alt=""
              />
            </a>
            <div className="blog-author-body">
              <Mono>{aboutEyebrow}</Mono>
              <h3 className="blog-author-name">
                <span>
                  {author.title} {author.name.split(' ').slice(0, -1).join(' ')}
                </span>{' '}
                <span className="italic">{author.name.split(' ').slice(-1)[0]}</span>
              </h3>
              <p className="blog-author-cred">{author.cred}</p>
              <p className="blog-author-bio">{author.bio}</p>
              <div style={{ display: 'flex', gap: 16, marginTop: 20, flexWrap: 'wrap' }}>
                <Btn kind="primary" as="a" href={`/experts/${author.slug}`}>
                  {readFullProfileCta}
                </Btn>
                <Btn kind="ghost" as="a" href="/contact">
                  {bookConsultationCta}
                </Btn>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="page-section">
        <Reveal>
          <div className="section-head">
            <Eyebrow>{moreEyebrow}</Eyebrow>
            <div>
              <h2 className="section-title">
                {moreHeadingPre}
                <span className="italic">{moreHeadingItalic}</span>
              </h2>
            </div>
          </div>
        </Reveal>
        <div className="blog-grid">
          {post.related.map((relSlug, i) => {
            const r = BLOG_POSTS.find((p) => p.slug === relSlug)
            if (!r) return null
            return (
              <Reveal key={relSlug} delay={i * 80}>
                <a href={`/blog/${relSlug}`} className="blog-card">
                  <div className="blog-card-img">
                    <Img
                      src={r.img}
                      fallbackLabel={r.category.toUpperCase()}
                      fallbackHue={r.hue}
                      alt=""
                    />
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
            )
          })}
        </div>
        <Reveal>
          <div style={{ marginTop: 60, textAlign: 'center' }}>
            <Btn kind="ghost" as="a" href="/blog">
              {backToJournalCta}
            </Btn>
          </div>
        </Reveal>
      </section>
    </PageShell>
  )
}
