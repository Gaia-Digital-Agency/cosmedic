/**
 * Email adapter for Payload — Path B refactor (gaiadaweb-style).
 *
 * Switched from manual `nodemailer.createTransport(...)` + `transport:`
 * to Payload's `transportOptions:` API. Payload builds the transport
 * itself, which removes the explicit nodemailer dependency and lets us
 * drop the JSON-transport fallback branch (~20 LOC delete vs prior).
 *
 * `skipVerify: true` prevents Payload from TCP-probing SMTP at boot,
 * so a misconfigured / unreachable SMTP host doesn't hang `pm2 start`.
 *
 * Configure via packages/cms/.env:
 *   SMTP_HOST=smtp.postmarkapp.com           (or SES / clinic relay)
 *   SMTP_PORT=587                            (TLS) or 465 (SSL)
 *   SMTP_SECURE=false                        (true if port 465)
 *   SMTP_USER=<provider login or API key>
 *   SMTP_PASS=<provider password or token>
 *   MAIL_FROM="BIMC CosMedic <no-reply@cosmedic.gaiada.online>"
 *   MAIL_CLINIC_TO=cosmedic@bimcbali.com   (fallback when Settings.clinicEnquiryEmail empty)
 *
 * With no SMTP_* set: nodemailer falls back to its built-in localhost
 * SMTP behavior. Outbound delivery requires a real provider — no JSON
 * sink anymore.
 */

import { nodemailerAdapter } from '@payloadcms/email-nodemailer'

const MAIL_FROM = process.env.MAIL_FROM || 'BIMC CosMedic <no-reply@cosmedic.gaiada.online>'
const fromAddress = MAIL_FROM.includes('<')
  ? (MAIL_FROM.match(/<([^>]+)>/)?.[1] || 'no-reply@cosmedic.gaiada.online')
  : MAIL_FROM
const fromName = MAIL_FROM.includes('<')
  ? (MAIL_FROM.split('<')[0]?.trim().replace(/"/g, '') || 'BIMC CosMedic')
  : 'BIMC CosMedic'

const smtpPort = Number(process.env.SMTP_PORT || 587)
const smtpAuth =
  process.env.SMTP_USER && process.env.SMTP_PASS
    ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
    : undefined

export const emailAdapter = nodemailerAdapter({
  defaultFromAddress: fromAddress,
  defaultFromName: fromName,
  skipVerify: true,
  transportOptions: {
    host: process.env.SMTP_HOST || '127.0.0.1',
    port: smtpPort,
    secure: process.env.SMTP_SECURE === 'true' || smtpPort === 465,
    auth: smtpAuth,
  },
})

// Fallback inbox when Settings.clinicEnquiryEmail is empty. The
// enquiry-emails.ts pipeline prefers the Settings-global value so the
// clinic can change destination without dev / .env edits.
export const CLINIC_TO_FALLBACK = process.env.MAIL_CLINIC_TO || 'cosmedic@bimcbali.com'
