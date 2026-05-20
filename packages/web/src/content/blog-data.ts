/**
 * Blog data — ported from `design/pages/blog.jsx` (index list) and
 * `design/pages/blog-post.jsx` (single post body).
 * Phase 6 migrates this to the BlogPosts collection.
 */

import { IMG } from './seed'

export type BlogPostMeta = {
  slug: string
  title: string
  dek: string
  author: string
  role: string
  date: string
  read: string
  category: string
  img: string
  hue: number
  featured?: boolean
}

export const BLOG_POSTS: BlogPostMeta[] = [
  {
    slug: 'the-quiet-rhinoplasty',
    title: 'The quiet rhinoplasty',
    dek: 'Why the most flattering nose is the one no one notices. On restraint, structure, and the small shifts that change a face.',
    author: 'dr. I Made Suka Adnyana',
    role: 'Plastic, Reconstructive & Aesthetic Surgery',
    date: 'April 2026',
    read: '8 min read',
    category: 'Surgical',
    img: IMG.surgical,
    hue: 0,
    featured: true,
  },
  {
    slug: 'before-you-fly',
    title: 'Before you fly: a six-week pre-op letter.',
    dek: 'What to stop, what to start, what to bring — and why the week before surgery is more important than the day of.',
    author: 'Ms. Made Wirati',
    role: 'Patient Concierge Lead',
    date: 'March 2026',
    read: '6 min read',
    category: 'Journey',
    img: IMG.concierge,
    hue: 1,
  },
  {
    slug: 'the-villa-protocol',
    title: 'The villa protocol.',
    dek: 'Seven mornings of nursing, three of stillness, and the architectural reason recovery in Bali feels different.',
    author: 'Ms. Putu Lestari',
    role: 'Director of Recovery Stays',
    date: 'March 2026',
    read: '9 min read',
    category: 'Recovery',
    img: IMG.villa2,
    hue: 2,
  },
  {
    slug: 'fillers-restraint',
    title: 'On fillers, restraint, and the long view.',
    dek: "An aesthetic physician's case for doing less, slower — and the patient conversations that follow.",
    author: 'dr. Rosalina Silvia Dewi',
    role: 'Aesthetic & Anti-Aging Medicine',
    date: 'February 2026',
    read: '7 min read',
    category: 'Non-surgical',
    img: IMG.injectables,
    hue: 3,
  },
  {
    slug: 'achsi-what-it-means',
    title: 'What ACHSI accreditation actually means.',
    dek: "Twelve years inside the audit cycle, in plain English. What it tests, what it doesn't, and why we keep doing it.",
    author: 'Dr. Craig Beavis',
    role: 'Medical Director, BIMC Hospital',
    date: 'January 2026',
    read: '10 min read',
    category: 'Standards',
    img: IMG.clinic,
    hue: 4,
  },
  {
    slug: 'crani-bali',
    title: 'Craniomaxillofacial surgery in Bali, in 2026.',
    dek: "A subspecialist on what's changed in the last decade — fellowship pathways, imaging, and patient expectations.",
    author: 'dr. Gede Wara Samsarga',
    role: 'Plastic Surgery — Craniomaxillofacial',
    date: 'December 2025',
    read: '11 min read',
    category: 'Surgical',
    img: IMG.surgical,
    hue: 5,
  },
  {
    slug: 'dental-veneers-honesty',
    title: 'Veneers: what we say no to.',
    dek: 'Why we turn down roughly one in three veneer consultations — and the questions we ask first.',
    author: 'dr. Theresia Indri Indrawati Setiadi',
    role: 'Dermatology, Venereology & Aesthetics',
    date: 'December 2025',
    read: '6 min read',
    category: 'Dental',
    img: IMG.dental,
    hue: 0,
  },
]

export const BLOG_CATEGORIES = [
  'All',
  'Surgical',
  'Non-surgical',
  'Recovery',
  'Journey',
  'Standards',
  'Dental',
] as const

export type BlogBlock =
  | { kind: 'p'; text: string }
  | { kind: 'h'; text: string }
  | { kind: 'pull'; text: string }
  | { kind: 'list'; items: string[] }

export type BlogPostFull = {
  slug: string
  title: string
  dek: string
  category: string
  date: string
  read: string
  img: string
  hue: number
  authorSlug: string
  body: BlogBlock[]
  related: string[]
}

export const BLOG_POST_BODIES: Record<string, BlogPostFull> = {
  'the-quiet-rhinoplasty': {
    slug: 'the-quiet-rhinoplasty',
    title: 'The quiet rhinoplasty',
    dek: 'Why the most flattering nose is the one no one notices. On restraint, structure, and the small shifts that change a face.',
    category: 'Surgical',
    date: 'April 2026',
    read: '8 min read',
    img: IMG.surgical,
    hue: 0,
    authorSlug: 'suka',
    body: [
      {
        kind: 'p',
        text: 'A patient brought me a photograph of her sister last month — taken twenty years ago, before either of them had given a thought to their faces — and asked, very quietly, whether I could give her back what she had then. I told her, also quietly, that we would not be trying to. Her face has done twenty more years of living, and trying to undo that is a job for cosmetics, not surgery.',
      },
      {
        kind: 'p',
        text: "What we could do — and what most of my work as a rhinoplasty surgeon really is — is something much smaller. We can take three or four millimetres off the dorsum, soften the supratip break, and lift the tip by the width of a fingernail. The total volume of tissue moved would not fill a teaspoon. And yet the result, when it is right, is that her sister, and her mother, and her oldest friend will all look at her and say only, 'You look well. Have you been on holiday?'",
      },
      { kind: 'h', text: 'What restraint actually looks like' },
      {
        kind: 'p',
        text: "The fashion for dramatic, ski-jump rhinoplasty results — the kind of nose that announces itself across a room — has been over for at least a decade in the centres where I trained. It has been replaced, slowly, by what is sometimes called the 'preservation rhinoplasty' movement: a school of technique that aims to leave the underlying nasal structure as intact as possible, and to make corrections by repositioning rather than by removing.",
      },
      {
        kind: 'p',
        text: 'In practice this means lifting the cartilaginous dorsum off the bony pyramid as a single unit, taking a small wedge of bone from beneath it, and lowering the whole structure as a hinge. The skin envelope, the tip, and the lining are barely disturbed. Patients heal faster. Their results look like the noses they were always supposed to have.',
      },
      {
        kind: 'pull',
        text: "The total volume of tissue moved would not fill a teaspoon. And yet — her sister, her mother, her oldest friend will say only, 'You look well.'",
      },
      { kind: 'h', text: 'The conversation before the surgery' },
      {
        kind: 'p',
        text: "I spend more time talking patients out of operations than into them. About one rhinoplasty consultation in four leaves my room without an operation booked — usually because the change the patient wants is smaller than they realised, and is best achieved with two or three carefully placed filler appointments, or with nothing at all. The ethical line, for me, is this: if a patient's nose is doing its job, and the person looking back at them in the mirror is in fact themselves, the bar for cutting into it should be very high.",
      },
      {
        kind: 'p',
        text: "When we do operate, the conversation in the weeks beforehand matters as much as the surgery itself. We look at photographs together — not of celebrities, but of the patient herself across ten or fifteen years. We trace, in pencil, what we are going to change and what we are explicitly not. We agree on the things that will stay: the bump that her father had, the slight asymmetry that she has decided to keep. None of these are written in the operative notes, but all of them shape the procedure.",
      },
      { kind: 'h', text: 'Recovery, in three weeks' },
      {
        kind: 'p',
        text: 'Surgery itself takes about two and a half hours under general anaesthetic. Patients stay in the hospital for one night and move to a private villa the following morning. We see them every day for the first week, three times in the second, and once before they fly home in the third. The cast comes off at day seven; visible bruising fades by day ten; the swelling that the patient herself can feel — particularly around the tip — settles over six to twelve months.',
      },
      {
        kind: 'p',
        text: 'The thing I tell every patient before they go home: do not judge the result at six weeks, or at three months. Judge it next April, when you happen to catch yourself in a window and forget for a moment that you ever had it done.',
      },
      { kind: 'h', text: 'A short note on technique' },
      {
        kind: 'list',
        items: [
          'Preservation dorsal hump reduction (subdorsal Cottle).',
          'Lateral and intermediate crural sutures, never grafts where suturing will do.',
          'Caudal septal extension only when the existing caudal septum is short.',
          'No tip grafts on primary cases unless the tip projection is structurally inadequate.',
          'Closed approach by default; open approach only for revision and for severe deviation.',
        ],
      },
      {
        kind: 'p',
        text: 'None of this is unique to me, and none of it is new. It is the standard of care at every ISAPS centre I have visited in Japan, Korea, and Singapore over the last decade. The only thing we add, in Bali, is the time — and the villa, the nursing, the quiet — to let the result settle into the patient\'s life before she flies back into hers.',
      },
      { kind: 'h', text: 'What to ask, on your consultation' },
      {
        kind: 'list',
        items: [
          'What, specifically, are you not going to change?',
          'Show me a photograph of myself, from any age, that you would aim towards.',
          'What is the smallest version of this operation that would solve the thing I came in for?',
          'What does your revision rate look like, over five years?',
        ],
      },
      {
        kind: 'p',
        text: "If your surgeon does not have answers to those four questions, ready to hand, find another surgeon. There is no shortage of us. There is, however, a quiet shortage of the kind who will say 'no' to you, or 'less than you asked', and that is the kind to look for.",
      },
    ],
    related: ['before-you-fly', 'fillers-restraint', 'crani-bali'],
  },
}
