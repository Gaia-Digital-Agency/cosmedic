import React from 'react'
import { PageShell } from '@/components/shell/PageShell'
import { CmsExtraBlocks } from '@/components/CmsExtraBlocks'
import { ChapterOpener } from '@/components/primitives/ChapterOpener'
import { Reveal } from '@/components/primitives/Reveal'
import { Img } from '@/components/primitives/Img'
import { Mono } from '@/components/primitives/Mono'
import { IMG } from '@/content/seed'

const STEPS = [
  {
    n: '01',
    t: 'Enquiry',
    img: IMG.reception,
    hue: 0,
    body:
      'From the moment you write to us, your concierge takes on your case. Within twenty-four hours, you will hear back — by email, WhatsApp, or whichever channel you prefer — with a private link to schedule your first consultation. There is no form to fill, no commitment to make. We treat first contact the way we treat first appointments: quietly, and with care.',
    list: [
      ['A', 'Concierge assigned within 24h'],
      ['B', 'Private booking link'],
      ['C', 'All major languages'],
      ['D', 'Held in confidence'],
    ] as [string, string][],
  },
  {
    n: '02',
    t: 'Consult',
    img: IMG.clinic,
    hue: 1,
    body:
      'A private video consultation, typically forty-five minutes, with the surgeon best suited to your concerns. We will discuss your hopes, your medical history, and your timeline; we will look at photographs you send in advance; and we will tell you, with great honesty, what we recommend — and what we do not. Most enquiries do not lead to surgery, and that is exactly as it should be.',
    list: [
      ['A', '45-minute video consult'],
      ['B', 'Specialist surgeon, not a coordinator'],
      ['C', 'Treatment plan within 48 hours'],
      ['D', 'No obligation'],
    ] as [string, string][],
  },
  {
    n: '03',
    t: 'Plan',
    img: IMG.texture,
    hue: 2,
    body:
      'Within forty-eight hours of your consultation, we send a written treatment plan: the procedure, the surgeon, the dates, the recovery, the costs, and the small things — meals, transport, follow-up. We will refine it together until it feels right. Most plans are finalised after one or two iterations.',
    list: [
      ['A', 'Written plan within 48h'],
      ['B', 'All-inclusive pricing'],
      ['C', 'Procedure + recovery + stay'],
      ['D', 'Refined together'],
    ] as [string, string][],
  },
  {
    n: '04',
    t: 'Arrive',
    img: IMG.bali,
    hue: 3,
    body:
      'We meet every patient personally at Ngurah Rai International Airport. Your concierge greets you by name; our driver takes you directly to your villa or hotel; we will not let you sort out a SIM card or a coffee before we have you settled. Pre-operative scans, if needed, happen the next morning at the hospital — and only the next morning.',
    list: [
      ['A', 'Met at airport gate'],
      ['B', 'Black-car transfer'],
      ['C', 'Villa welcome & provisioning'],
      ['D', 'Pre-op scan day after arrival'],
    ] as [string, string][],
  },
  {
    n: '05',
    t: 'Procedure',
    img: '/assets/treatments/surgical.webp',
    hue: 4,
    body:
      'Procedures are performed at BIMC Hospital Nusa Dua — Indonesia\'s first ACHSI-accredited international hospital, and our home since 1998. You will meet your anaesthetist the morning of your procedure, your surgeon will see you immediately before and immediately after, and your concierge stays with you from admission to discharge.',
    list: [
      ['A', 'ACHSI-accredited theatres'],
      ['B', 'Australian-standard anaesthesia'],
      ['C', 'Concierge with you throughout'],
      ['D', 'Discharge to villa, not hospital'],
    ] as [string, string][],
  },
  {
    n: '06',
    t: 'Recover',
    img: IMG.recovery,
    hue: 5,
    body:
      'You recover in a private villa, never in a hospital ward. A registered nurse visits every morning for the first seven days; your surgeon sees you twice in the first week; your concierge handles meals, transport, paperwork, and any small kindness you might need. Most patients describe this part of the journey as the most surprising — that recovery, here, feels less medical and more like rest.',
    list: [
      ['A', 'Private villa, not hospital'],
      ['B', 'Daily nursing visits'],
      ['C', 'Surgeon reviews x2 in week one'],
      ['D', 'Family welcome, no extra cost'],
    ] as [string, string][],
  },
  {
    n: '07',
    t: 'Homecoming',
    img: IMG.concierge,
    hue: 0,
    body:
      "We see you off the same way we welcomed you — driven to the airport, bags handled, a quiet farewell. The next twelve months are organised: video reviews at one week, one month, three months, six months, and twelve months. Many of our patients keep their concierge's WhatsApp on speed dial for years afterwards. We rather like that.",
    list: [
      ['A', 'Black-car to airport'],
      ['B', '5 video follow-ups in year one'],
      ['C', 'Unlimited WhatsApp messaging'],
      ['D', 'Onward referrals if needed'],
    ] as [string, string][],
  },
]

export const JourneyPage: React.FC = () => (
  <PageShell activePage="journey">
    <ChapterOpener
      chapter="Chapter V — Your Journey"
      title={['From enquiry,', 'to homecoming.']}
      lede="Seven steps, designed to feel less like medical tourism and more like being looked after by family. We hold your hand from first email to twelfth-month follow-up."
      image={IMG.bali}
      imageHue={4}
      imageLabel="THE JOURNEY"
      breadcrumbs={[{ label: 'BIMC CosMedic', href: '/' }, { label: 'Your Journey' }]}
    />

    <div className="journey-full">
      {STEPS.map((s, i) => (
        <Reveal key={i} delay={0} y={32}>
          <div className="journey-full-step">
            <div className="jfs-meta">
              <div className="jfs-num">{s.n}</div>
              <h2>{s.t}</h2>
              <p>{s.body}</p>
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
              <Img src={s.img} fallbackLabel={s.t.toUpperCase()} fallbackHue={s.hue} alt="" />
            </div>
          </div>
        </Reveal>
      ))}
    </div>

    <div className="stats-row">
      <Reveal>
        <div className="stat-block">
          <span className="stat-num">24h</span>
          <span className="stat-label">Reply to first enquiry</span>
        </div>
      </Reveal>
      <Reveal delay={80}>
        <div className="stat-block">
          <span className="stat-num">45min</span>
          <span className="stat-label">Initial consultation</span>
        </div>
      </Reveal>
      <Reveal delay={160}>
        <div className="stat-block">
          <span className="stat-num">12mo</span>
          <span className="stat-label">Follow-up programme</span>
        </div>
      </Reveal>
    </div>
    <CmsExtraBlocks slug="journey" />
  </PageShell>
)
