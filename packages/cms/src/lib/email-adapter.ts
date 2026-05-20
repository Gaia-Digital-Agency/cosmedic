/**
 * Email adapter for Payload + transport factory.
 *
 * Picks transport based on env:
 *  - If SMTP_HOST + SMTP_PORT + SMTP_USER + SMTP_PASS are set → real SMTP
 *  - Otherwise → JSON transport (logs payload to stdout, never sends).
 *    Useful for dev + for production smoke tests before SMTP is provisioned.
 *
 * Configure via .env:
 *   SMTP_HOST=smtp.postmarkapp.com
 *   SMTP_PORT=587
 *   SMTP_SECURE=false
 *   SMTP_USER=<postmark server token>
 *   SMTP_PASS=<same as user for Postmark>
 *   MAIL_FROM="Cosmedic CMS <no-reply@cosmedic.gaiada.online>"
 *   MAIL_CLINIC_TO=cosmedic@bimcbali.com
 */

import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import nodemailer from 'nodemailer'

const MAIL_FROM = process.env.MAIL_FROM || 'Cosmedic CMS <no-reply@cosmedic.gaiada.online>'

function makeTransport() {
  const host = process.env.SMTP_HOST
  const port = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : undefined
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS
  if (host && port && user && pass) {
    return nodemailer.createTransport({
      host,
      port,
      secure: process.env.SMTP_SECURE === 'true' || port === 465,
      auth: { user, pass },
    })
  }
  // JSON transport — never actually sends; logs the full message to stdout
  // so the clinic can verify content during the SMTP-pending window.
  return nodemailer.createTransport({ jsonTransport: true })
}

export const emailAdapter = nodemailerAdapter({
  defaultFromAddress: MAIL_FROM.includes('<')
    ? (MAIL_FROM.match(/<([^>]+)>/)?.[1] || 'no-reply@cosmedic.gaiada.online')
    : MAIL_FROM,
  defaultFromName: MAIL_FROM.includes('<')
    ? (MAIL_FROM.split('<')[0]?.trim().replace(/"/g, '') || 'Cosmedic CMS')
    : 'Cosmedic CMS',
  transport: makeTransport(),
})

export const CLINIC_TO = process.env.MAIL_CLINIC_TO || 'cosmedic@bimcbali.com'
