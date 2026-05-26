/**
 * IDR denomination sanity checks for Payload field validators.
 *
 * IDR amounts are large: expected range 10,000 – 2,000,000,000.
 * AUD amounts are small: expected range 1 – 200,000.
 *
 * If an editor accidentally enters an AUD value into an IDR field, this
 * validator surfaces a human-readable error at CMS save-time.
 */

export const IDR_MIN = 10_000
export const IDR_MAX = 2_000_000_000

/**
 * Payload field `validate` function for any IDR price field.
 * Returns an error string when the value fails the sanity check, `true` to pass.
 *
 * Usage in a collection/global field:
 *   { name: 'priceIdr2026', type: 'number', validate: validateIdrField }
 */
export function validateIdrField(val: number | null | undefined): string | true {
  if (val == null || val === 0) return true
  if (val < IDR_MIN) {
    return (
      `IDR ${val.toLocaleString()} looks suspiciously low (minimum expected: ${IDR_MIN.toLocaleString()}). ` +
      `Did you accidentally enter an AUD value? IDR prices are typically ≥ 100,000.`
    )
  }
  if (val > IDR_MAX) {
    return `IDR ${val.toLocaleString()} is suspiciously high (maximum expected: ${IDR_MAX.toLocaleString()}).`
  }
  return true
}
