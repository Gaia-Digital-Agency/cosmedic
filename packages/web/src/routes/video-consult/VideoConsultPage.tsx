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
  const [submitting, setSubmitting] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    setDays(buildDays())
    const params = new URLSearchParams(window.location.search)
    const proc = params.get('procedure') || ''
    setPrefillProc(proc)
    if (proc) setTopic('Not sure yet')
  }, [])

  const canSubmit = Boolean(selectedDay && selectedTime && name && email) && !submitting

  const handleBookingSubmit = async (): Promise<void> => {
    if (submitting) return
    setSubmitting(true)
    setErrorMsg('')
    const dayStr = selectedDay ? `${selectedDay.dow} ${selectedDay.day} ${selectedDay.mon}` : '(no date)'
    const timeStr = selectedTime || '(no time)'
    const lines = [
      `Video consult booking — ${dayStr} at ${timeStr} (${tz})`,
      topic ? `Topic: ${topic}` : '',
      prefillProc ? `Pre-filled procedure: ${prefillProc}` : '',
    ].filter(Boolean)
    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          treatmentInterestText: prefillProc || topic || '',
          message: lines.join('\n'),
          sourcePage: '/video-consult',
          sourceCta: 'video-consult-booking',
        }),
      })
      const body = await res.json()
      if (res.ok && body.ok) {
        setSubmitted(true)
      } else {
        setErrorMsg('Sorry — could not submit your booking. Please try again or email us directly.')
      }
    } catch {
      setErrorMsg('Sorry — could not reach the server. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

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
                onSubmit={handleBookingSubmit}
              />
              {errorMsg && (
                <p style={{ marginTop: 16, color: '#a04040', fontSize: 14, textAlign: 'center' }}>
                  {errorMsg}
                </p>
              )}
            </div>
          )}
        </div>
      </section>
      <CmsExtraBlocks slug="video-consult" />
    </PageShell>
  )
}
