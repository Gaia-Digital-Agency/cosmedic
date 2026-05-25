/**
 * Email composer + sender for new enquiries.
 *
 * Two emails fire on Enquiries create:
 *   1. Clinic notification → MAIL_CLINIC_TO with the lead details
 *   2. Autoresponder      → submitter email confirming receipt
 *
 * Templates source their copy from the `EmailTemplates` global so the
 * clinic can edit subject/body via /admin. Placeholders {{name}}, {{email}},
 * {{phone}}, {{country}}, {{procedure}}, {{preferredDate}}, {{message}},
 * {{sourcePage}} get substituted. Spam submissions are stored but no
 * emails are sent.
 */

import type { Payload } from 'payload'
import { CLINIC_TO_FALLBACK } from './email-adapter'

/**
 * Resolve where clinic-notify emails should land:
 *   1. Settings.clinicEnquiryEmail (clinic-editable in admin) — preferred
 *   2. MAIL_CLINIC_TO env (dev-set) — fallback
 *   3. Hardcoded default in CLINIC_TO_FALLBACK
 */
async function resolveClinicEmail(payload: Payload): Promise<string> {
  try {
    /* eslint-disable @typescript-eslint/no-explicit-any */
    const settings = await (payload as any).findGlobal({ slug: 'settings', depth: 0 })
    const fromSettings = (settings?.clinicEnquiryEmail as string | undefined)?.trim()
    if (fromSettings) return fromSettings
    /* eslint-enable @typescript-eslint/no-explicit-any */
  } catch (err) {
    payload.logger.warn(`[enquiry-emails] could not load Settings.clinicEnquiryEmail: ${(err as Error).message}`)
  }
  return CLINIC_TO_FALLBACK
}

type EnquiryDoc = {
  id: string | number
  name?: string | null
  email?: string | null
  phone?: string | null
  country?: string | null
  treatmentInterestText?: string | null
  treatmentInterest?: string | number | { name?: string } | null
  preferredDate?: string | null
  message?: string | null
  sourcePage?: string | null
  sourceCta?: string | null
  status?: string | null
}

function substitute(template: string, vars: Record<string, string>): string {
  return template.replace(/\{\{(\w+)\}\}/g, (_, k: string) => vars[k] ?? '')
}

type Template = { id: string; subject: string; bodyMjml: string; locale?: string }

async function loadTemplate(payload: Payload, id: string): Promise<Template | undefined> {
  try {
    /* eslint-disable @typescript-eslint/no-explicit-any */
    const tpl = await (payload as any).findGlobal({ slug: 'email-templates', depth: 0 })
    const list: Template[] = tpl?.templates ?? []
    return list.find((t) => t.id === id)
    /* eslint-enable @typescript-eslint/no-explicit-any */
  } catch (err) {
    payload.logger.warn(`[enquiry-emails] could not load template ${id}: ${(err as Error).message}`)
    return undefined
  }
}

export async function sendEnquiryEmails(doc: EnquiryDoc, payload: Payload): Promise<void> {
  if (doc.status === 'spam') {
    payload.logger.info(`[enquiry-emails] skipping spam submission ${doc.id}`)
    return
  }

  const proc =
    typeof doc.treatmentInterest === 'object' && doc.treatmentInterest
      ? doc.treatmentInterest.name || ''
      : ''
  const vars: Record<string, string> = {
    name: doc.name || '',
    email: doc.email || '',
    phone: doc.phone || '—',
    country: doc.country || '—',
    procedure: proc || doc.treatmentInterestText || '—',
    preferredDate: doc.preferredDate ? new Date(doc.preferredDate).toLocaleDateString('en-GB') : '—',
    message: doc.message || '—',
    sourcePage: doc.sourcePage || '—',
  }

  const clinic = await loadTemplate(payload, 'enquiry-clinic-notify')
  const auto = await loadTemplate(payload, 'enquiry-autoresponder')
  const clinicTo = await resolveClinicEmail(payload)

  // Clinic notify
  if (clinic && doc.email) {
    try {
      await payload.sendEmail({
        to: clinicTo,
        subject: substitute(clinic.subject, vars),
        text: substitute(clinic.bodyMjml, vars),
      })
      payload.logger.info(`[enquiry-emails] clinic notify sent to ${clinicTo} for enquiry ${doc.id}`)
    } catch (err) {
      payload.logger.warn(`[enquiry-emails] clinic-notify failed: ${(err as Error).message}`)
    }
  }

  // Autoresponder
  if (auto && doc.email) {
    try {
      await payload.sendEmail({
        to: doc.email,
        subject: substitute(auto.subject, vars),
        text: substitute(auto.bodyMjml, vars),
      })
      payload.logger.info(`[enquiry-emails] autoresponder sent to ${doc.email} for enquiry ${doc.id}`)
    } catch (err) {
      payload.logger.warn(`[enquiry-emails] autoresponder failed: ${(err as Error).message}`)
    }
  }
}
