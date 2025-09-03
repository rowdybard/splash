import { describe, it, expect, vi, beforeEach } from 'vitest'
import { NextRequest } from 'next/server'

// Mock the ICS library
vi.mock('@/lib/ics', () => ({
  generateICS: vi.fn()
}))

// Mock environment
process.env.NODE_ENV = 'test'

// Import after mocking
import { GET } from '../ics/[bookingId]/route'
import { generateICS } from '@/lib/ics'

const mockGenerateICS = vi.mocked(generateICS)

describe('/api/ics/[bookingId]', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockGenerateICS.mockReturnValue('BEGIN:VCALENDAR\nVERSION:2.0\nEND:VCALENDAR')
  })

  it('should generate ICS file for valid booking ID', async () => {
    const request = new NextRequest('http://localhost:3000/api/ics/booking-123')
    const params = { bookingId: 'booking-123' }

    const response = await GET(request, { params })

    expect(response.status).toBe(200)
    expect(response.headers.get('Content-Type')).toBe('text/calendar; charset=utf-8')
    expect(response.headers.get('Content-Disposition')).toBe('attachment; filename="foam-party-booking-123.ics"')
    
    const content = await response.text()
    expect(content).toContain('BEGIN:VCALENDAR')
    expect(content).toContain('END:VCALENDAR')
  })

  it('should return 400 for missing booking ID', async () => {
    const request = new NextRequest('http://localhost:3000/api/ics/')
    const params = { bookingId: '' }

    const response = await GET(request, { params })

    expect(response.status).toBe(400)
    const data = await response.json()
    expect(data.error).toBe('Booking ID is required')
  })

  it('should use mock data in test environment', async () => {
    const request = new NextRequest('http://localhost:3000/api/ics/test-booking')
    const params = { bookingId: 'test-booking' }

    await GET(request, { params })

    expect(mockGenerateICS).toHaveBeenCalledWith({
      id: 'test-booking-123',
      title: 'Splashtastic Foam Party',
      description: 'Join us for an amazing foam party experience!',
      location: {
        street: '123 Main St',
        city: 'Detroit',
        state: 'MI',
        zip: '48201'
      },
      startDateTime: expect.any(Date),
      endDateTime: expect.any(Date),
      organizerEmail: 'info@splashtastic.com',
      attendeeEmail: 'customer@example.com',
      url: 'https://splashtastic.com'
    })
  })

  it('should handle errors gracefully', async () => {
    mockGenerateICS.mockImplementation(() => {
      throw new Error('ICS generation failed')
    })

    const request = new NextRequest('http://localhost:3000/api/ics/booking-123')
    const params = { bookingId: 'booking-123' }

    const response = await GET(request, { params })

    expect(response.status).toBe(500)
    const data = await response.json()
    expect(data.error).toBe('Failed to generate calendar file')
  })

  it('should generate proper ICS content structure', async () => {
    const mockICSContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Splashtastic//Booking System//EN',
      'BEGIN:VEVENT',
      'UID:test-booking-123@splashtastic.com',
      'SUMMARY:Splashtastic Foam Party',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n')

    mockGenerateICS.mockReturnValue(mockICSContent)

    const request = new NextRequest('http://localhost:3000/api/ics/booking-123')
    const params = { bookingId: 'booking-123' }

    const response = await GET(request, { params })

    expect(response.status).toBe(200)
    const content = await response.text()
    expect(content).toContain('BEGIN:VCALENDAR')
    expect(content).toContain('VERSION:2.0')
    expect(content).toContain('BEGIN:VEVENT')
    expect(content).toContain('END:VEVENT')
    expect(content).toContain('END:VCALENDAR')
  })

  it('should set correct filename in Content-Disposition header', async () => {
    const request = new NextRequest('http://localhost:3000/api/ics/unique-booking-id')
    const params = { bookingId: 'unique-booking-id' }

    const response = await GET(request, { params })

    expect(response.headers.get('Content-Disposition')).toBe('attachment; filename="foam-party-unique-booking-id.ics"')
  })
})
