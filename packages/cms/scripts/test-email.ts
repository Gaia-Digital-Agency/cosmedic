/**
 * One-shot SMTP smoke test (gaiadaweb pattern, adapted to Cosmedic).
 *
 * Boots Payload via the real config (so the configured email adapter and
 * env-driven SMTP transport are exercised end-to-end), sends a single
 * HTML email to MAIL_FROM (or SMTP_USER if MAIL_FROM unset), then exits.
 *
 * Use after provisioning a new SMTP provider, or to debug why enquiry
 * emails aren't landing. Far faster than submitting a real enquiry form.
 *
 * Run:
 *   pnpm --filter @cosmedic/cms exec tsx scripts/test-email.ts
 *
 * Optional env override (one-off target without editing .env):
 *   TEST_EMAIL_TO=ai@gaiada.com pnpm --filter @cosmedic/cms exec tsx scripts/test-email.ts
 */

import 'dotenv/config'

async function main() {
  if (!process.env.PAYLOAD_SECRET) {
    console.error('❌ PAYLOAD_SECRET not in .env — refusing to boot Payload')
    process.exit(1)
  }

  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.warn('⚠️  SMTP_HOST / SMTP_USER / SMTP_PASS not all set — email-adapter will use defaults (127.0.0.1:587). Delivery will likely fail.')
  }

  const { getPayload } = await import('payload')
  const configModule = await import('../src/payload.config')
  const config = configModule.default

  console.log('Booting Payload …')
  const payload = await getPayload({ config })

  const mailFromAddr =
    (process.env.MAIL_FROM || '').match(/<([^>]+)>/)?.[1] ||
    process.env.MAIL_FROM ||
    process.env.SMTP_USER ||
    'no-reply@cosmedic.gaiada.online'

  const to = process.env.TEST_EMAIL_TO || mailFromAddr
  const now = new Date()
  const stamp = now.toLocaleString('en-AU', { timeZone: 'Asia/Singapore' })

  console.log(`Sending test email to ${to} …`)

  try {
    await payload.sendEmail({
      to,
      subject: `Cosmedic SMTP smoke test — ${stamp}`,
      html: `
        <div style="font-family: 'Inter', sans-serif; padding: 24px; max-width: 540px; margin: 0 auto; border: 1px solid #E6DCC8; border-radius: 4px; background: #F4EFE6; color: #1F1B16;">
          <h1 style="font-family: 'Cormorant Garamond', serif; font-size: 26px; font-weight: 500; color: #533E27; margin: 0 0 16px;">SMTP connection live</h1>
          <p style="margin: 0 0 12px;">This message proves the BIMC CosMedic CMS can deliver mail via the currently-configured SMTP transport.</p>
          <p style="margin: 0 0 12px; font-size: 13px; color: #6b6356;">Server time: ${stamp}<br/>From: ${mailFromAddr}<br/>To: ${to}</p>
          <hr style="border: none; border-top: 1px solid #E6DCC8; margin: 20px 0;" />
          <p style="font-family: 'JetBrains Mono', monospace; font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; color: #A67C52; margin: 0;">BIMC COSMEDIC — Cosmedic CMS</p>
        </div>
      `,
    })
    console.log('✅ Email sent (per Payload sendEmail). Check the inbox.')
    console.log('   If using JSON transport (no SMTP env), the message body printed above to CMS stdout.')
  } catch (err) {
    console.error('❌ Send failed:', err)
    process.exit(1)
  }
  process.exit(0)
}

main().catch((err) => {
  console.error('❌ test-email crashed:', err)
  process.exit(1)
})
