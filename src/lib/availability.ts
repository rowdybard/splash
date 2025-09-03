import { zonedTimeToUtc, utcToZonedTime, format } from 'date-fns-tz'
import { addMinutes, isSunday, isAfter, isBefore, parseISO } from 'date-fns'

const TIMEZONE = process.env.TIMEZONE || 'America/Detroit'

// Bookings allowed 7 days/week – no Sunday restriction
const BUFFER_MINUTES = 45 // Minimum buffer between events
const BUSINESS_START_HOUR = 9 // 9 AM
const BUSINESS_END_HOUR = 18 // 6 PM

export type AvailabilityCheck = {
  date: Date
  startTime: string // HH:mm format
  durationMin: number
  existingEvents: Array<{
    startAt: Date
    endAt: Date
  }>
  blocks: Array<{
    startAt: Date
    endAt: Date
    reason: string
  }>
}

export type TimeSlot = {
  time: string // HH:mm format
  available: boolean
  date: Date
  reason?: string
}

export type AvailabilityResult = {
  isAvailable: boolean
  reason?: string
}

export async function checkAvailability(check: AvailabilityCheck): Promise<AvailabilityResult> {
  const { date, startTime, durationMin, existingEvents, blocks } = check

  // Build a timezone-aware start datetime based on the provided date and time (America/Detroit)
  const [hours, minutes] = startTime.split(':').map(Number)
  const dateString = date.toISOString().slice(0, 10)
  const localIso = `${dateString}T${startTime}:00`
  // Treat localIso as time in Detroit and convert to UTC for comparisons
  const zonedStart = zonedTimeToUtc(localIso, TIMEZONE)
  const zonedEnd = addMinutes(zonedStart, durationMin)
  // Local time instance for day-of-week checks
  const localStart = utcToZonedTime(zonedStart, TIMEZONE)

  // Check business hours
  if (hours < BUSINESS_START_HOUR || hours >= BUSINESS_END_HOUR) {
    return {
      isAvailable: false,
      reason: 'Outside business hours (9 AM - 6 PM)'
    }
  }

  // No Sunday closure – operate 7 days/week

  // Check against existing events with buffer first (bookings take precedence)
  for (const event of existingEvents) {
    const eventStartWithBuffer = addMinutes(event.startAt, -BUFFER_MINUTES)
    const eventEndWithBuffer = addMinutes(event.endAt, BUFFER_MINUTES)

    // Overlap or within buffer
    if (zonedStart < eventEndWithBuffer && zonedEnd > eventStartWithBuffer) {
      const isDirectOverlap = zonedStart < event.endAt && zonedEnd > event.startAt
      return {
        isAvailable: false,
        reason: isDirectOverlap
          ? 'Time slot overlaps with existing booking'
          : 'Too close to existing booking (requires 45-minute buffer)'
      }
    }
  }

  // Check against maintenance blocks
  for (const block of blocks) {
    if (
      (isAfter(zonedStart, block.startAt) && isBefore(zonedStart, block.endAt)) ||
      (isAfter(zonedEnd, block.startAt) && isBefore(zonedEnd, block.endAt)) ||
      (isBefore(zonedStart, block.startAt) && isAfter(zonedEnd, block.endAt))
    ) {
      return {
        isAvailable: false,
        reason: `Unavailable due to ${block.reason.toLowerCase()}`
      }
    }
  }

  return { isAvailable: true }
}

export async function getAvailableSlots(
  date: Date,
  durationMin: number,
  existingEvents: Array<{ startAt: Date; endAt: Date }>,
  blocks: Array<{ startAt: Date; endAt: Date; reason: string }>
): Promise<TimeSlot[]> {
  const slots: TimeSlot[] = []

  // No Sunday closure – operate 7 days/week

  // Generate slots every 30 minutes during business hours
  for (let hour = BUSINESS_START_HOUR; hour < BUSINESS_END_HOUR; hour++) {
    for (let minute of [0, 30]) {
      // Don't create slots that would extend past business hours
      const slotEndHour = hour + Math.floor((minute + durationMin) / 60)
      const slotEndMinute = (minute + durationMin) % 60
      
      if (slotEndHour > BUSINESS_END_HOUR || (slotEndHour === BUSINESS_END_HOUR && slotEndMinute > 0)) {
        continue
      }

      const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
      // Build a local time string for the date in Detroit timezone and convert to UTC
      const dateString = date.toISOString().slice(0, 10)
      const localIso = `${dateString}T${timeString}:00`
      const slotUtc = zonedTimeToUtc(localIso, TIMEZONE)

      const slot: TimeSlot = {
        time: timeString,
        available: true,
        date: slotUtc
      }

      // Check if this slot is available
      const available = isTimeSlotAvailable(slot, durationMin, existingEvents, blocks)
      
      slot.available = available
      
      if (!available) {
        const checkResult = await checkAvailability({
          date,
          startTime: timeString,
          durationMin,
          existingEvents,
          blocks
        })
        slot.reason = checkResult.reason
      }

      slots.push(slot)
    }
  }

  return slots
}

export function isTimeSlotAvailable(
  slot: TimeSlot,
  durationMin: number,
  existingEvents: Array<{ startAt: Date; endAt: Date }>,
  blocks: Array<{ startAt: Date; endAt: Date; reason: string }>
): boolean {
  const slotEnd = addMinutes(slot.date, durationMin)

  // Check against blocks
  for (const block of blocks) {
    if (
      (isAfter(slot.date, block.startAt) && isBefore(slot.date, block.endAt)) ||
      (isAfter(slotEnd, block.startAt) && isBefore(slotEnd, block.endAt)) ||
      (isBefore(slot.date, block.startAt) && isAfter(slotEnd, block.endAt))
    ) {
      return false
    }
  }

  // Check against existing events with buffer
  for (const event of existingEvents) {
    const eventStartWithBuffer = addMinutes(event.startAt, -BUFFER_MINUTES)
    const eventEndWithBuffer = addMinutes(event.endAt, BUFFER_MINUTES)

    if (slot.date < eventEndWithBuffer && slotEnd > eventStartWithBuffer) {
      return false
    }
  }

  return true
}
