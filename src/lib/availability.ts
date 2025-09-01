import { zonedTimeToUtc, utcToZonedTime, format } from 'date-fns-tz'
import { addMinutes, isSunday, isAfter, isBefore, parseISO } from 'date-fns'

const TIMEZONE = process.env.TIMEZONE || 'America/Detroit'
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

  // Parse the requested start time in Detroit timezone
  const [hours, minutes] = startTime.split(':').map(Number)
  const requestedStart = new Date(date)
  requestedStart.setHours(hours, minutes, 0, 0)
  
  // Convert to UTC for comparison with existing events
  const zonedStart = zonedTimeToUtc(requestedStart, TIMEZONE)
  const zonedEnd = addMinutes(zonedStart, durationMin)
  
  // Use local time for business hour and Sunday checks
  const localStart = requestedStart

  // Check business hours
  if (hours < BUSINESS_START_HOUR || hours >= BUSINESS_END_HOUR) {
    return {
      isAvailable: false,
      reason: 'Outside business hours (9 AM - 6 PM)'
    }
  }

  // Check if it's Sunday (closed) - use local date
  if (isSunday(localStart)) {
    return {
      isAvailable: false,
      reason: 'We are closed on Sundays'
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

  // Check against existing events with buffer
  for (const event of existingEvents) {
    const eventStartWithBuffer = addMinutes(event.startAt, -BUFFER_MINUTES)
    const eventEndWithBuffer = addMinutes(event.endAt, BUFFER_MINUTES)

    // Check for overlaps or buffer conflicts
    if (
      (zonedStart < eventEndWithBuffer && zonedEnd > eventStartWithBuffer)
    ) {
      const isDirectOverlap = 
        (zonedStart < event.endAt && zonedEnd > event.startAt)

      return {
        isAvailable: false,
        reason: isDirectOverlap ? 'Time slot overlaps with existing booking' : 'Too close to existing booking (requires 45-minute buffer)'
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

  // Don't return slots for Sundays - check the local date
  const localDate = new Date(date)
  if (isSunday(localDate)) {
    return slots
  }

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
      const slotDate = new Date(date)
      slotDate.setHours(hour, minute, 0, 0)
      
      const slot: TimeSlot = {
        time: timeString,
        available: true,
        date: zonedTimeToUtc(slotDate, TIMEZONE)
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
