/**
 * Shared constants + day-picker generator for the video-consult booking flow.
 */

export const SLOT_TIMES = ['09:00', '10:30', '13:00', '14:30', '16:00']
export const TIMEZONES = ['AEST (Sydney)', 'SGT (Singapore)', 'GMT (London)', 'WIB (Bali)']
export const TOPICS = [
  'Surgical · Face',
  'Surgical · Body',
  'Surgical · Breast',
  'Hair Restoration',
  'Non-surgical',
  'Dental',
  'Not sure yet',
]

export type Day = { key: string; day: number; mon: string; dow: string; isWeekend: boolean }

export function buildDays(): Day[] {
  const out: Day[] = []
  const start = new Date()
  start.setHours(0, 0, 0, 0)
  start.setDate(start.getDate() + 1)
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const dows = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  for (let i = 0; i < 14; i++) {
    const d = new Date(start)
    d.setDate(start.getDate() + i)
    out.push({
      key: d.toISOString().slice(0, 10),
      day: d.getDate(),
      mon: months[d.getMonth()],
      dow: dows[d.getDay()],
      isWeekend: d.getDay() === 0 || d.getDay() === 6,
    })
  }
  return out
}
