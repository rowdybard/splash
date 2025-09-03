import { describe, it, expect, beforeEach, vi } from 'vitest'
import { 
  checkAvailability, 
  getAvailableSlots,
  isTimeSlotAvailable,
  type AvailabilityCheck,
  type TimeSlot
} from '../availability'

describe('Availability Service', () => {
  const mockDate = new Date('2024-06-15T10:00:00-04:00') // Saturday in Detroit timezone

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('checkAvailability', () => {
    it('should prevent double-booking for overlapping events', async () => {
      const existingEvent = {
        startAt: new Date('2024-06-15T14:00:00-04:00'), // 2:00 PM
        endAt: new Date('2024-06-15T15:00:00-04:00'),   // 3:00 PM
      }

      const newEventCheck: AvailabilityCheck = {
        date: new Date('2024-06-15'),
        startTime: '14:30', // 2:30 PM - overlaps!
        durationMin: 60,
        existingEvents: [existingEvent],
        blocks: []
      }

      const result = await checkAvailability(newEventCheck)

      expect(result.isAvailable).toBe(false)
      expect(result.reason).toContain('overlaps')
    })

    it('should enforce setup/teardown buffer time', async () => {
      const existingEvent = {
        startAt: new Date('2024-06-15T14:00:00-04:00'), // 2:00 PM
        endAt: new Date('2024-06-15T15:00:00-04:00'),   // 3:00 PM
      }

      // Try to book 30 minutes after existing event ends (within buffer)
      const newEventCheck: AvailabilityCheck = {
        date: new Date('2024-06-15'),
        startTime: '15:30', // 3:30 PM - within 45-60min buffer
        durationMin: 60,
        existingEvents: [existingEvent],
        blocks: []
      }

      const result = await checkAvailability(newEventCheck)

      expect(result.isAvailable).toBe(false)
      expect(result.reason).toContain('buffer')
    })

    it('should allow booking with sufficient buffer time', async () => {
      const existingEvent = {
        startAt: new Date('2024-06-15T14:00:00-04:00'), // 2:00 PM
        endAt: new Date('2024-06-15T15:00:00-04:00'),   // 3:00 PM
      }

      // Book 90 minutes after existing event ends (outside buffer)
      const newEventCheck: AvailabilityCheck = {
        date: new Date('2024-06-15'),
        startTime: '16:30', // 4:30 PM - sufficient buffer
        durationMin: 60,
        existingEvents: [existingEvent],
        blocks: []
      }

      const result = await checkAvailability(newEventCheck)

      expect(result.isAvailable).toBe(true)
      expect(result.reason).toBeUndefined()
    })

    it('should block during maintenance windows', async () => {
      const maintenanceBlock = {
        startAt: new Date('2024-06-15T12:00:00-04:00'), // 12:00 PM
        endAt: new Date('2024-06-15T16:00:00-04:00'),   // 4:00 PM
        reason: 'Equipment maintenance'
      }

      const newEventCheck: AvailabilityCheck = {
        date: new Date('2024-06-15'),
        startTime: '14:00', // 2:00 PM - during maintenance
        durationMin: 60,
        existingEvents: [],
        blocks: [maintenanceBlock]
      }

      const result = await checkAvailability(newEventCheck)

      expect(result.isAvailable).toBe(false)
      expect(result.reason).toContain('maintenance')
    })

    it('should reject bookings outside business hours', async () => {
      const newEventCheck: AvailabilityCheck = {
        date: new Date('2024-06-15'),
        startTime: '07:00', // 7:00 AM - too early
        durationMin: 60,
        existingEvents: [],
        blocks: []
      }

      const result = await checkAvailability(newEventCheck)

      expect(result.isAvailable).toBe(false)
      expect(result.reason).toContain('business hours')
    })
  })

  describe('getAvailableSlots', () => {
    it('should return available time slots for a given date', async () => {
      const date = new Date('2024-06-15') // Saturday
      const durationMin = 60

      const slots = await getAvailableSlots(date, durationMin, [], [])

      expect(slots).toBeInstanceOf(Array)
      expect(slots.length).toBeGreaterThan(0)
      
      // Should include typical business hours
      const morningSlot = slots.find(slot => slot.time === '10:00')
      const afternoonSlot = slots.find(slot => slot.time === '14:00')
      
      expect(morningSlot).toBeDefined()
      expect(afternoonSlot).toBeDefined()
      expect(morningSlot?.available).toBe(true)
      expect(afternoonSlot?.available).toBe(true)
    })

    it('should mark conflicting slots as unavailable', async () => {
      const date = new Date('2024-06-15')
      const durationMin = 60
      
      const existingEvent = {
        startAt: new Date('2024-06-15T14:00:00-04:00'), // 2:00 PM
        endAt: new Date('2024-06-15T15:00:00-04:00'),   // 3:00 PM
      }

      const slots = await getAvailableSlots(date, durationMin, [existingEvent], [])

      const conflictingSlot = slots.find(slot => slot.time === '14:00')
      const bufferSlot = slots.find(slot => slot.time === '15:00')
      
      expect(conflictingSlot?.available).toBe(false)
      expect(bufferSlot?.available).toBe(false) // Within buffer time
    })

    it('should return slots on Sundays (7-day availability)', async () => {
      const sunday = new Date('2024-06-16') // Sunday
      const durationMin = 60

      const slots = await getAvailableSlots(sunday, durationMin, [], [])

      expect(slots.length).toBeGreaterThan(0)
    })

    it('should limit slots based on package duration', async () => {
      const date = new Date('2024-06-15')
      const longDuration = 120 // 2 hours

      const slots = await getAvailableSlots(date, longDuration, [], [])

      // Last possible slot should be earlier for longer events
      const latestSlot = slots[slots.length - 1]
      expect(latestSlot.time).not.toBe('18:00') // Shouldn't allow start at 6 PM for 2-hour event
    })
  })

  describe('isTimeSlotAvailable', () => {
    it('should validate individual time slots correctly', () => {
      const slot: TimeSlot = {
        time: '14:00',
        available: true,
        date: new Date('2024-06-15T14:00:00-04:00')
      }

      const existingEvent = {
        startAt: new Date('2024-06-15T15:00:00-04:00'), // 3:00 PM
        endAt: new Date('2024-06-15T16:00:00-04:00'),   // 4:00 PM
      }

      const result = isTimeSlotAvailable(slot, 60, [existingEvent], [])

      expect(result).toBe(false) // Should conflict due to buffer time
    })

    it('should handle timezone conversions correctly', () => {
      const slot: TimeSlot = {
        time: '14:00',
        available: true,
        date: new Date('2024-06-15T14:00:00-04:00') // EDT
      }

      const result = isTimeSlotAvailable(slot, 60, [], [])

      expect(result).toBe(true)
    })
  })

  describe('edge cases', () => {
    it('should handle events spanning midnight', async () => {
      const lateEvent = {
        startAt: new Date('2024-06-15T23:00:00-04:00'), // 11:00 PM
        endAt: new Date('2024-06-16T01:00:00-04:00'),   // 1:00 AM next day
      }

      const newEventCheck: AvailabilityCheck = {
        date: new Date('2024-06-16'), // Next day
        startTime: '00:30', // 12:30 AM - should conflict
        durationMin: 60,
        existingEvents: [lateEvent],
        blocks: []
      }

      const result = await checkAvailability(newEventCheck)

      expect(result.isAvailable).toBe(false)
    })

    it('should handle daylight saving time transitions', async () => {
      // Test during DST transition dates if applicable
      const dstDate = new Date('2024-03-10') // Spring DST transition
      const slots = await getAvailableSlots(dstDate, 60, [], [])

      expect(slots).toBeDefined()
      expect(slots.length).toBeGreaterThan(0)
    })
  })
})
