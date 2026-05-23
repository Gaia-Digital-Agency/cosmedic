import React, { useState, useEffect } from 'react'
import { PageShell } from '@/components/shell/PageShell'
import { CmsExtraBlocks } from '@/components/CmsExtraBlocks'
import { ChapterOpener } from '@/components/primitives/ChapterOpener'
import { IMG } from '@/content/seed'
import { buildDays, TIMEZONES, type Day } from './data'
import { WhatToExpect } from './WhatToExpect'
import { BookingForm } from './BookingForm'
import { BookingConfirmation } from './BookingConfirmation'

export const VideoConsultPage: React.FC = () => {
  // Defer client-side state (date/URL) to useEffect to avoid SSR hydration drift
  const [days, setDays] = useState<Day[]>([])
  const [prefillProc, setPrefillProc] = useState('')
  const [selectedDay, setSelectedDay] = useState<Day | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [tz, setTz] = useState(TIMEZONES[0])
  const [topic, setTopic] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    setDays(buildDays())
    const params = new URLSearchParams(window.location.search)
    const proc = params.get('procedure') || ''
    setPrefillProc(proc)
    if (proc) setTopic('Not sure yet')
  }, [])

  const canSubmit = Boolean(selectedDay && selectedTime && name && email)

  return (
    <PageShell activePage="contact" hideCTA>
      <ChapterOpener
        chapter="Chapter VIII — Video Consult"
        title={['Twenty quiet', 'minutes.']}
        lede={
          prefillProc
            ? `A complimentary 20-minute video call about ${prefillProc}. Speak with a coordinator who will brief the right surgeon afterwards. No card required, no obligation.`
            : 'A complimentary 20-minute video call with a patient coordinator. We listen, answer, and brief the right surgeon for you afterwards. No card required, no obligation.'
        }
        image={IMG.reception}
        imageHue={2}
        imageLabel="VIDEO CONSULT"
        breadcrumbs={[
          { label: 'BIMC CosMedic', href: '/' },
          { label: 'Plan Your Journey', href: '/contact' },
          { label: 'Video Consult' },
        ]}
      />

      <section className="page-section">
        <div className="vc-layout">
          {submitted ? (
            <BookingConfirmation
              name={name}
              email={email}
              selectedDay={selectedDay}
              selectedTime={selectedTime}
              tz={tz}
            />
          ) : (
            <div className="vc-grid">
              <WhatToExpect />
              <BookingForm
                days={days}
                selectedDay={selectedDay}
                setSelectedDay={setSelectedDay}
                selectedTime={selectedTime}
                setSelectedTime={setSelectedTime}
                tz={tz}
                setTz={setTz}
                topic={topic}
                setTopic={setTopic}
                name={name}
                setName={setName}
                email={email}
                setEmail={setEmail}
                prefillProc={prefillProc}
                canSubmit={canSubmit}
                onSubmit={() => setSubmitted(true)}
              />
            </div>
          )}
        </div>
      </section>
      <CmsExtraBlocks slug="video-consult" />
    </PageShell>
  )
}
