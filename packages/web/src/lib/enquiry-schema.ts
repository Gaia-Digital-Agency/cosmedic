import { z } from 'zod'

/**
 * Validation schema for the public enquiry form.
 *
 * - All visible fields required except `phone`, `country`, `preferredDate`
 * - `treatmentInterestText` is a free-text fallback when the user types a
 *   procedure that doesn't map to a known Procedures slug
 * - `honeypot` is a hidden field; if non-empty, the request is silently
 *   accepted (returns 200) but the record is marked `status: 'spam'`
 * - `sourcePage` + `sourceCta` are auto-populated by the form
 */
export const enquirySchema = z.object({
  name: z.string().trim().min(1, 'Required').max(120),
  email: z.string().trim().email('Invalid email').max(160),
  phone: z.string().trim().max(40).optional().or(z.literal('')),
  country: z.string().trim().max(80).optional().or(z.literal('')),
  treatmentInterestSlug: z.string().trim().max(80).optional().or(z.literal('')),
  treatmentInterestText: z.string().trim().max(160).optional().or(z.literal('')),
  preferredDate: z.string().trim().max(40).optional().or(z.literal('')),
  message: z.string().trim().max(4000).optional().or(z.literal('')),
  sourcePage: z.string().trim().max(200).optional().or(z.literal('')),
  sourceCta: z.string().trim().max(80).optional().or(z.literal('')),
  honeypot: z.string().optional().or(z.literal('')),
})

export type EnquiryInput = z.infer<typeof enquirySchema>

export type EnquiryResponse =
  | { ok: true }
  | { ok: false; error: 'validation'; issues: Array<{ path: string; message: string }> }
  | { ok: false; error: 'rate-limit'; retryAfterSeconds: number }
  | { ok: false; error: 'internal' }
