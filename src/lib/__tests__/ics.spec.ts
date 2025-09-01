import { describe, it, expect } from 'vitest'
import { 
  generateICS,
  formatICSDateTime,
  validateICSContent,
  type EventDetails
} from '../ics'

describe('ICS Calendar Service', () => {
  const mockEventDetails: EventDetails = {
    id: 'booking_123',
    title: 'Splashtastic Foam Party - Birthday Bash',
    startDateTime: new Date('2024-06-15T14:00:00-04:00'), // 2:00 PM EDT
    endDateTime: new Date('2024-06-15T15:00:00-04:00'),   // 3:00 PM EDT
    location: {
      street: '123 Party Lane',
      city: 'Detroit',
      state: 'MI',
      zip: '48201'
    },
    description: 'Get ready for an amazing foam party experience! Our professional team will transform your backyard into a foam wonderland.',
    organizerEmail: 'events@splashtastic.com',
    attendeeEmail: 'customer@example.com',
    url: 'https://splashtastic.com/booking/booking_123'
  }

  describe('generateICS', () => {
    it('should generate valid ICS content', () => {
      const icsContent = generateICS(mockEventDetails)

      expect(icsContent).toContain('BEGIN:VCALENDAR')
      expect(icsContent).toContain('END:VCALENDAR')
      expect(icsContent).toContain('BEGIN:VEVENT')
      expect(icsContent).toContain('END:VEVENT')
      expect(icsContent).toContain('VERSION:2.0')
      expect(icsContent).toContain('PRODID:-//Splashtastic//Booking System//EN')
    })

    it('should include event summary', () => {
      const icsContent = generateICS(mockEventDetails)

      expect(icsContent).toContain(`SUMMARY:${mockEventDetails.title}`)
    })

    it('should include event description', () => {
      const icsContent = generateICS(mockEventDetails)

      expect(icsContent).toContain('DESCRIPTION:Get ready for an amazing foam party experience!')
    })

    it('should include formatted location', () => {
      const icsContent = generateICS(mockEventDetails)

      expect(icsContent).toContain('LOCATION:123 Party Lane\\, Detroit\\, MI 48201')
    })

    it('should include organizer information', () => {
      const icsContent = generateICS(mockEventDetails)

      expect(icsContent).toContain(`ORGANIZER:mailto:${mockEventDetails.organizerEmail}`)
    })

    it('should include attendee information', () => {
      const icsContent = generateICS(mockEventDetails)

      expect(icsContent).toContain(`ATTENDEE:mailto:${mockEventDetails.attendeeEmail}`)
    })

    it('should include event URL', () => {
      const icsContent = generateICS(mockEventDetails)

      expect(icsContent).toContain(`URL:${mockEventDetails.url}`)
    })

    it('should use Detroit timezone', () => {
      const icsContent = generateICS(mockEventDetails)

      // Should include timezone definition for America/Detroit
      expect(icsContent).toContain('TZID:America/Detroit')
      expect(icsContent).toContain('BEGIN:VTIMEZONE')
      expect(icsContent).toContain('END:VTIMEZONE')
    })

    it('should generate unique UID for each event', () => {
      const icsContent1 = generateICS(mockEventDetails)
      const icsContent2 = generateICS({ ...mockEventDetails, id: 'booking_456' })

      const uid1Match = icsContent1.match(/UID:(.+)/)
      const uid2Match = icsContent2.match(/UID:(.+)/)

      expect(uid1Match).toBeTruthy()
      expect(uid2Match).toBeTruthy()
      expect(uid1Match![1]).not.toBe(uid2Match![1])
    })

    it('should include created and last modified timestamps', () => {
      const icsContent = generateICS(mockEventDetails)

      expect(icsContent).toContain('CREATED:')
      expect(icsContent).toContain('LAST-MODIFIED:')
      expect(icsContent).toContain('DTSTAMP:')
    })

    it('should handle special characters in content', () => {
      const eventWithSpecialChars: EventDetails = {
        ...mockEventDetails,
        title: 'Birthday Party with "Quotes" & Symbols!',
        description: 'Event with line\nbreaks and special chars: ,;'
      }

      const icsContent = generateICS(eventWithSpecialChars)

      // Special characters should be properly escaped
      expect(icsContent).toContain('SUMMARY:Birthday Party with \\"Quotes\\" & Symbols!')
      expect(icsContent).toContain('line\\nbreaks')
    })
  })

  describe('formatICSDateTime', () => {
    it('should format datetime in ICS format with timezone', () => {
      const dateTime = new Date('2024-06-15T14:00:00-04:00')
      
      const formatted = formatICSDateTime(dateTime, 'America/Detroit')

      expect(formatted).toMatch(/TZID=America\/Detroit:\d{8}T\d{6}/)
    })

    it('should format datetime in UTC when no timezone specified', () => {
      const dateTime = new Date('2024-06-15T18:00:00Z') // UTC
      
      const formatted = formatICSDateTime(dateTime)

      expect(formatted).toMatch(/\d{8}T\d{6}Z/)
    })

    it('should handle daylight saving time correctly', () => {
      const summerDate = new Date('2024-07-15T14:00:00-04:00') // EDT
      const winterDate = new Date('2024-01-15T14:00:00-05:00') // EST

      const summerFormatted = formatICSDateTime(summerDate, 'America/Detroit')
      const winterFormatted = formatICSDateTime(winterDate, 'America/Detroit')

      expect(summerFormatted).toContain('TZID=America/Detroit:')
      expect(winterFormatted).toContain('TZID=America/Detroit:')
    })
  })

  describe('validateICSContent', () => {
    it('should validate correct ICS content', () => {
      const validICS = generateICS(mockEventDetails)
      
      const validation = validateICSContent(validICS)

      expect(validation.isValid).toBe(true)
      expect(validation.errors).toHaveLength(0)
    })

    it('should reject ICS without required BEGIN/END tags', () => {
      const invalidICS = 'SUMMARY:Test Event\nDTSTART:20240615T140000'
      
      const validation = validateICSContent(invalidICS)

      expect(validation.isValid).toBe(false)
      expect(validation.errors).toContain('Missing BEGIN:VCALENDAR')
    })

    it('should require essential event properties', () => {
      const incompleteICS = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Test//Test//EN
BEGIN:VEVENT
SUMMARY:Test Event
END:VEVENT
END:VCALENDAR`
      
      const validation = validateICSContent(incompleteICS)

      expect(validation.isValid).toBe(false)
      expect(validation.errors).toContain('Missing required DTSTART')
    })

    it('should validate datetime format', () => {
      const invalidDateTimeICS = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
DTSTART:invalid-date
DTEND:invalid-date
SUMMARY:Test
UID:test-123
END:VEVENT
END:VCALENDAR`
      
      const validation = validateICSContent(invalidDateTimeICS)

      expect(validation.isValid).toBe(false)
      expect(validation.errors).toContain('Invalid DTSTART format')
    })

    it('should validate that end time is after start time', () => {
      const backwardsTimeICS = generateICS({
        ...mockEventDetails,
        startDateTime: new Date('2024-06-15T15:00:00-04:00'),
        endDateTime: new Date('2024-06-15T14:00:00-04:00') // Before start!
      })
      
      const validation = validateICSContent(backwardsTimeICS)

      expect(validation.isValid).toBe(false)
      expect(validation.errors).toContain('End time must be after start time')
    })
  })

  describe('timezone handling', () => {
    it('should handle timezone transitions correctly', () => {
      // Test during DST transition
      const dstTransition = new Date('2024-03-10T07:00:00-05:00') // Spring forward
      
      const eventDetails: EventDetails = {
        ...mockEventDetails,
        startDateTime: dstTransition,
        endDateTime: new Date(dstTransition.getTime() + 60 * 60 * 1000) // +1 hour
      }

      const icsContent = generateICS(eventDetails)

      expect(icsContent).toContain('TZID:America/Detroit')
      expect(icsContent).toContain('BEGIN:VTIMEZONE')
    })

    it('should include timezone definition', () => {
      const icsContent = generateICS(mockEventDetails)

      // Should include both standard and daylight time rules
      expect(icsContent).toContain('BEGIN:STANDARD')
      expect(icsContent).toContain('BEGIN:DAYLIGHT')
      expect(icsContent).toContain('TZOFFSETFROM')
      expect(icsContent).toContain('TZOFFSETTO')
    })
  })

  describe('edge cases', () => {
    it('should handle very long descriptions', () => {
      const longDescription = 'A'.repeat(1000) // Very long description
      
      const eventDetails: EventDetails = {
        ...mockEventDetails,
        description: longDescription
      }

      const icsContent = generateICS(eventDetails)

      // Should handle line folding for long lines
      expect(icsContent).toContain('DESCRIPTION:')
      expect(icsContent.split('\r\n').every(line => line.length <= 75)).toBe(true)
    })

    it('should handle empty optional fields', () => {
      const minimalEventDetails: EventDetails = {
        id: 'minimal_123',
        title: 'Minimal Event',
        startDateTime: new Date('2024-06-15T14:00:00-04:00'),
        endDateTime: new Date('2024-06-15T15:00:00-04:00'),
        location: {
          street: '123 Street',
          city: 'City',
          state: 'MI',
          zip: '12345'
        },
        organizerEmail: 'test@test.com',
        attendeeEmail: 'customer@test.com',
        url: 'https://test.com'
      }

      const icsContent = generateICS(minimalEventDetails)

      expect(icsContent).toContain('BEGIN:VCALENDAR')
      expect(icsContent).toContain('SUMMARY:Minimal Event')
    })
  })
})
