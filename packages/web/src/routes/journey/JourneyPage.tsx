import React from 'react'
import { PageShell } from '@/components/shell/PageShell'
import { CmsExtraBlocks } from '@/components/CmsExtraBlocks'
import { ChapterOpener } from '@/components/primitives/ChapterOpener'
import { Reveal } from '@/components/primitives/Reveal'
import { Img } from '@/components/primitives/Img'
import { Mono } from '@/components/primitives/Mono'
import { IMG } from '@/content/seed'
import { useCms } from '@/lib/cms-context'
import { journeyStepsSorted } from '@/lib/cms-adapters'
import { lexicalToParagraphs, mediaUrl, type CmsMedia } from '@/lib/cms'

type Bullet = readonly [string, string]

type Step = {
  n: string
  t: string
  img: string
  hue: number
  bodyParagraphs: string[]
  list: Bullet[]
  media?: number | CmsMedia | null
}

const FALLBACK_STEPS: Step[] = [
  {
    n: '01',
    t: 'Enquiry',
    img: IMG.reception,
    hue: 0,
    bodyParagraphs: [
      'From the moment you write to us, your concierge takes on your case. Within twenty-four hours, you will hear back — by email, WhatsApp, or whichever channel you prefer — with a private link to schedule your first consultation. There is no form to fill, no commitment to make. We treat first contact the way we treat first appointments: quietly, and with care.',
    ],
    list: [
      ['A', 'Concierge assigned within 24h'],
      ['B', 'Private booking link'],
      ['C', 'All major languages'],
      ['D', 'Held in confidence'],
    ],
  },
  {
    n: '02',
    t: 'Consult',
    img: IMG.clinic,
    hue: 1,
    bodyParagraphs: [
      'A private video consultation, typically forty-five minutes, with the surgeon best suited to your concerns. We will discuss your hopes, your medical history, and your timeline; we will look at photographs you send in advance; and we will tell you, with great honesty, what we recommend — and what we do not. Most enquiries do not lead to surgery, and that is exactly as it should be.',
    ],
    list: [
      ['A', '45-minute video consult'],
      ['B', 'Specialist surgeon, not a coordinator'],
      ['C', 'Treatment plan within 48 hours'],
      ['D', 'No obligation'],
    ],
  },
  {
    n: '03',
    t: 'Plan',
    img: IMG.texture,
    hue: 2,
    bodyParagraphs: [
      'Within forty-eight hours of your consultation, we send a written treatment plan: the procedure, the surgeon, the dates, the recovery, the costs, and the small things — meals, transport, follow-up. We will refine it together until it feels right. Most plans are finalised after one or two iterations.',
    ],
    list: [
      ['A', 'Written plan within 48h'],
      ['B', 'All-inclusive pricing'],
      ['C', 'Procedure + recovery + stay'],
      ['D', 'Refined together'],
    ],
  },
  {
    n: '04',
    t: 'Arrive',
    img: IMG.bali,
    hue: 3,
    bodyParagraphs: [
      'We meet every patient personally at Ngurah Rai International Airport. Your concierge greets you by name; our driver takes you directly to your villa or hotel; we will not let you sort out a SIM card or a coffee before we have you settled. Pre-operative scans, if needed, happen the next morning at the hospital — and only the next morning.',
    ],
    list: [
      ['A', 'Met at airport gate'],
      ['B', 'Black-car transfer'],
      ['C', 'Villa welcome & provisioning'],
      ['D', 'Pre-op scan day after arrival'],
    ],
  },
  {
    n: '05',
    t: 'Procedure',
    img: '/assets/treatments/surgical.webp',
    hue: 4,
    bodyParagraphs: [
      "Procedures are performed at BIMC Hospital Nusa Dua — Indonesia's first ACHSI-accredited international hospital, and our home since 1998. You will meet your anaesthetist the morning of your procedure, your surgeon will see you immediately before and immediately after, and your concierge stays with you from admission to discharge.",
    ],
    list: [
      ['A', 'ACHSI-accredited theatres'],
      ['B', 'Australian-standard anaesthesia'],
      ['C', 'Concierge with you throughout'],
      ['D', 'Discharge to villa, not hospital'],
    ],
  },
  {
    n: '06',
    t: 'Recover',
    img: IMG.recovery,
    hue: 5,
    bodyParagraphs: [
      'You recover in a private villa, never in a hospital ward. A registered nurse visits every morning for the first seven days; your surgeon sees you twice in the first week; your concierge handles meals, transport, paperwork, and any small kindness you might need. Most patients describe this part of the journey as the most surprising — that recovery, here, feels less medical and more like rest.',
    ],
    list: [
      ['A', 'Private villa, not hospital'],
      ['B', 'Daily nursing visits'],
      ['C', 'Surgeon reviews x2 in week one'],
      ['D', 'Family welcome, no extra cost'],
    ],
  },
  {
    n: '07',
    t: 'Homecoming',
    img: IMG.concierge,
    hue: 0,
    bodyParagraphs: [
      "We see you off the same way we welcomed you — driven to the airport, bags handled, a quiet farewell. The next twelve months are organised: video reviews at one week, one month, three months, six months, and twelve months. Many of our patients keep their concierge's WhatsApp on speed dial for years afterwards. We rather like that.",
    ],
    list: [
      ['A', 'Black-car to airport'],
      ['B', '5 video follow-ups in year one'],
      ['C', 'Unlimited WhatsApp messaging'],
      ['D', 'Onward referrals if needed'],
    ],
  },
]

const FALLBACK_STATS: Array<{ number: string; label: string; italic?: boolean }> = [
  { number: '24h', label: 'Reply to first enquiry' },
  { number: '45min', label: 'Initial consultation' },
  { number: '12mo', label: 'Follow-up programme' },
]

const padNumber = (n: number | undefined, fallback: string): string => {
  if (n == null) return fallback
  return String(n).padStart(2, '0')
}

export const JourneyPage: React.FC = () => {
  const cms = useCms()

  // Steps — CMS rows mapped to the Step shape used by the renderer.
  const cmsSteps = cms ? journeyStepsSorted(cms) : []
  const steps: Step[] =
    cmsSteps.length > 0
      ? cmsSteps.map((s, i) => {
          const paragraphs = lexicalToParagraphs(s.body).filter(Boolean)
          const list: Bullet[] = (s.bullets || []).map(
            (b) => [b.letter || '·', b.text || ''] as Bullet,
          )
          const imageUrl = s.image ? mediaUrl(s.image, '') : ''
          const fallback = FALLBACK_STEPS[i]
          return {
            n: s.number || padNumber(s.order ?? i + 1, fallback?.n ?? '01'),
            t: s.title || fallback?.t || 'Step',
            img: imageUrl || fallback?.img || IMG.reception,
            hue: s.imageHue ?? fallback?.hue ?? 0,
            bodyParagraphs: paragraphs.length > 0 ? paragraphs : fallback?.bodyParagraphs ?? [],
            list: list.length > 0 ? list : fallback?.list ?? [],
            media: s.image,
          }
        })
      : FALLBACK_STEPS

  // Hero.
  const hero = cms?.journeyHero
  const chapter = hero?.chapter || 'Chapter V — Your Journey'
  const titleA = hero?.title?.a || 'From enquiry,'
  const titleB = hero?.title?.b || 'to homecoming.'
  const lede =
    hero?.lede ||
    'Seven steps, designed to feel less like medical tourism and more like being looked after by family. We hold your hand from first email to twelfth-month follow-up.'
  const heroImage = hero?.heroImage ? mediaUrl(hero.heroImage, '') : ''
  const heroImg = heroImage || IMG.bali
  const heroHue = hero?.imageHue ?? 4
  const heroLabel = hero?.imageLabel || 'THE JOURNEY'
  const breadcrumbLabel = hero?.breadcrumbLabel || 'Your Journey'

  // Stats.
  const statsRows =
    cms?.journeyStats?.stats && cms.journeyStats.stats.length > 0
      ? cms.journeyStats.stats
      : FALLBACK_STATS

  return (
    <PageShell activePage="journey">
      <ChapterOpener
        chapter={chapter}
        title={[titleA, titleB]}
        lede={lede}
        image={heroImg}
        imageHue={heroHue}
        imageLabel={heroLabel}
        breadcrumbs={[{ label: 'BIMC CosMedic', href: '/' }, { label: breadcrumbLabel }]}
      />

      <div className="journey-full">
        {steps.map((s, i) => (
          <Reveal key={i} delay={0} y={32}>
            <div className="journey-full-step">
              <div className="jfs-meta">
                <div className="jfs-num">{s.n}</div>
                <h2>{s.t}</h2>
                {s.bodyParagraphs.map((p, j) => (
                  <p key={j}>{p}</p>
                ))}
                <ul>
                  {s.list.map(([k, v], j) => (
                    <li key={j}>
                      <Mono>{k}.</Mono>
                      <span>{v}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="jfs-img">
                <Img media={s.media} src={s.img} fallbackLabel={s.t.toUpperCase()} fallbackHue={s.hue} alt="" />
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="stats-row">
        {statsRows.map((stat, i) => (
          <Reveal key={i} delay={i * 80}>
            <div className="stat-block">
              <span className={`stat-num${stat.italic ? ' italic' : ''}`}>{stat.number}</span>
              <span className="stat-label">{stat.label}</span>
            </div>
          </Reveal>
        ))}
      </div>
      <CmsExtraBlocks slug="journey" />
    </PageShell>
  )
}
