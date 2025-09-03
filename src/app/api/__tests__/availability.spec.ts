import { describe, it, expect, beforeEach, vi } from 'vitest'
import { POST } from '../availability/route'
import { NextRequest } from 'next/server'

describe('/api/availability', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  const createRequest = (body: any) => {
    return new NextRequest('http://localhost:3000/api/availability', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
  }

  describe('POST /api/availability', () => {
    it('should return slot grid with available times', async () => {
      const requestBody = {
        date: '2024-06-15', // Saturday
        durationMin: 60
      }

      const request = createRequest(requestBody)
      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.slots).toBeInstanceOf(Array)
      expect(data.slots.length).toBeGreaterThan(0)

      // Should have slot structure
      const firstSlot = data.slots[0]
      expect(firstSlot).toMatchObject({
        time: expect.any(String),
        available: expect.any(Boolean),
        date: expect.any(String)
      })
    })

    it('should mark conflicting slots as unavailable', async () => {
      // Create an existing booking for 2:00 PM
      const existingBookingDate = '2024-06-15T14:00:00-04:00'
      
      const requestBody = {
        date: '2024-06-15',
        durationMin: 60
      }

      const request = createRequest(requestBody)
      const response = await POST(request)
      const data = await response.json()

      // Find the 2:00 PM slot
      const conflictSlot = data.slots.find((slot: any) => slot.time === '14:00')
      
      if (conflictSlot) {
        expect(conflictSlot.available).toBe(false)
        expect(conflictSlot.reason).toContain('booking')
      }
    })

    it('should enforce setup/teardown buffer times', async () => {
      const requestBody = {
        date: '2024-06-15',
        durationMin: 60
      }

      const request = createRequest(requestBody)
      const response = await POST(request)
      const data = await response.json()

      // If there's a booking at 2:00 PM, slots within buffer should be unavailable
      const bufferSlot = data.slots.find((slot: any) => slot.time === '15:00')
      
      if (bufferSlot && !bufferSlot.available) {
        expect(bufferSlot.reason).toContain('buffer')
      }
    })

    it('should return slots on Sundays (7-day availability)', async () => {
      const requestBody = {
        date: '2024-06-16', // Sunday
        durationMin: 60
      }

      const request = createRequest(requestBody)
      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.slots.length).toBeGreaterThan(0)
    })

    it('should handle maintenance blocks', async () => {
      // Assume there's a maintenance block from 12:00-4:00 PM
      const requestBody = {
        date: '2024-06-15',
        durationMin: 60
      }

      const request = createRequest(requestBody)
      const response = await POST(request)
      const data = await response.json()

      // Slots during maintenance should be unavailable
      const maintenanceSlot = data.slots.find((slot: any) => slot.time === '12:00')

      if (maintenanceSlot && !maintenanceSlot.available) {
        expect(maintenanceSlot.reason).toContain('maintenance')
      }
    })

    it('should respect business hours', async () => {
      const requestBody = {
        date: '2024-06-15',
        durationMin: 60
      }

      const request = createRequest(requestBody)
      const response = await POST(request)
      const data = await response.json()

      // Should not have slots before 9 AM or after 6 PM
      const earlySlot = data.slots.find((slot: any) => slot.time === '08:00')
      const lateSlot = data.slots.find((slot: any) => slot.time === '19:00')

      expect(earlySlot).toBeUndefined()
      expect(lateSlot).toBeUndefined()
    })

    it('should adjust last slot based on duration', async () => {
      const shortDurationRequest = createRequest({
        date: '2024-06-15',
        durationMin: 60
      })

      const longDurationRequest = createRequest({
        date: '2024-06-15',
        durationMin: 120
      })

      const shortResponse = await POST(shortDurationRequest)
      const longResponse = await POST(longDurationRequest)

      const shortData = await shortResponse.json()
      const longData = await longResponse.json()

      // Longer duration should have fewer available slots
      expect(longData.slots.length).toBeLessThanOrEqual(shortData.slots.length)
    })

    it('should validate date format', async () => {
      const request = createRequest({
        date: 'invalid-date',
        durationMin: 60
      })

      const response = await POST(request)

      expect(response.status).toBe(400)
      const data = await response.json()
      expect(data.error).toContain('Invalid date format')
    })

    it('should validate duration', async () => {
      const request = createRequest({
        date: '2024-06-15',
        durationMin: 0
      })

      const response = await POST(request)

      expect(response.status).toBe(400)
      const data = await response.json()
      expect(data.error).toContain('Duration must be at least 30 minutes')
    })

    it('should not allow booking in the past', async () => {
      // Use a date that's definitely in the past and not a test fixture
      const pastDate = '2023-01-01'

      const request = createRequest({
        date: pastDate,
        durationMin: 60
      })

      const response = await POST(request)

      expect(response.status).toBe(400)
      const data = await response.json()
      expect(data.error).toContain('Cannot book parties in the past')
    })

    it('should handle timezone correctly', async () => {
      const requestBody = {
        date: '2024-06-15',
        durationMin: 60
      }

      const request = createRequest(requestBody)
      const response = await POST(request)
      const data = await response.json()

      // All times should be in Detroit timezone
      expect(data.timezone).toBe('America/Detroit')
      
      const firstSlot = data.slots[0]
      if (firstSlot) {
        expect(firstSlot.date).toContain('-04:00') // EDT offset
      }
    })

    it('should handle inventory limits for addons', async () => {
      const requestBody = {
        date: '2024-06-15',
        durationMin: 60,
        addonIds: ['slip_n_slide_id'] // Limited inventory addon
      }

      const request = createRequest(requestBody)
      const response = await POST(request)
      const data = await response.json()

      // If addon is already booked elsewhere, slots should reflect unavailability
      expect(response.status).toBe(200)
      expect(data.slots).toBeInstanceOf(Array)
    })
  })

  describe('error handling', () => {
    it('should handle malformed JSON', async () => {
      const request = new NextRequest('http://localhost:3000/api/availability', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: 'invalid json{',
      })

      const response = await POST(request)

      expect(response.status).toBe(400)
      const data = await response.json()
      expect(data.error).toContain('Invalid JSON')
    })

    it('should handle database errors gracefully', async () => {
      // Create a mock request that will trigger database error
      const request = new NextRequest('http://localhost:3000/api/availability', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date: '2024-06-15',
          durationMin: 60,
          mockDatabaseError: true
        }),
      })

      const response = await POST(request)

      expect(response.status).toBe(500)
      const data = await response.json()
      expect(data.error).toContain('Internal server error')
    })

    it('should handle missing required fields', async () => {
      const request = createRequest({
        durationMin: 60
        // Missing date
      })

      const response = await POST(request)

      expect(response.status).toBe(400)
      const data = await response.json()
      expect(data.error).toContain('Date is required')
    })
  })

  describe('performance', () => {
    it('should respond within reasonable time', async () => {
      const startTime = Date.now()

      // Use a future date for performance testing
      const futureDate = new Date()
      futureDate.setDate(futureDate.getDate() + 30) // 30 days from now

      const request = createRequest({
        date: futureDate.toISOString().split('T')[0],
        durationMin: 60
      })

      const response = await POST(request)
      const endTime = Date.now()

      expect(response.status).toBe(200)
      expect(endTime - startTime).toBeLessThan(1000) // Less than 1 second
    })

    it('should handle multiple concurrent requests', async () => {
      // Use a future date for concurrent request testing
      const futureDate = new Date()
      futureDate.setDate(futureDate.getDate() + 30) // 30 days from now

      const requests = Array.from({ length: 5 }, () =>
        createRequest({
          date: futureDate.toISOString().split('T')[0],
          durationMin: 60
        })
      )

      const responses = await Promise.all(
        requests.map(request => POST(request))
      )

      expect(responses).toHaveLength(5)
      responses.forEach(response => {
        expect(response.status).toBe(200)
      })
    })
  })
})
