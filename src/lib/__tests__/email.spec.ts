import { describe, it, expect, vi, beforeEach } from 'vitest'

// Mock Resend
const mockSend = vi.fn()
vi.mock('resend', () => ({
  Resend: vi.fn(() => ({
    emails: { send: mockSend }
  }))
}))

// Mock environment variables
process.env.RESEND_API_KEY = 'test-key'

// Import after mocking
import { sendBookingConfirmation, sendReminderEmail, sendCancellationEmail } from '../email'

describe('Email Service', () => {
  const mockEmailData = {
    to: 'test@example.com',
    customerName: 'John Doe',
    eventDate: new Date('2024-06-15T14:00:00Z'),
    eventTime: '2:00 PM',
    eventAddress: '123 Main St, Detroit, MI 48201',
    packageName: 'Starter Party',
    addons: ['Extra Foam', 'Music System'],
    totalPrice: 299.00,
    depositAmount: 89.70,
    bookingId: 'booking_123',
    isDeposit: true
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('sendBookingConfirmation', () => {
    it('should send booking confirmation email successfully', async () => {
      mockSend.mockResolvedValue({ id: 'email_123' })

      const result = await sendBookingConfirmation(mockEmailData)

      expect(result).toBe(true)
      expect(mockSend).toHaveBeenCalledWith({
        from: 'Splashtastic Foam Parties <noreply@splashtastic.com>',
        to: ['test@example.com'],
        subject: '🎉 Your Foam Party is Confirmed! - Saturday, June 15th, 2024',
        html: expect.stringContaining('John Doe'),
        attachments: [
          {
            filename: 'foam-party-booking_123.ics',
            content: expect.stringContaining('BEGIN:VCALENDAR')
          }
        ]
      })
    })

    it('should handle missing RESEND_API_KEY gracefully', async () => {
      const originalKey = process.env.RESEND_API_KEY
      process.env.RESEND_API_KEY = ''

      const result = await sendBookingConfirmation(mockEmailData)

      expect(result).toBe(false)
      
      // Restore the original value
      process.env.RESEND_API_KEY = originalKey
    })

    it('should generate ICS with correct event details', async () => {
      mockSend.mockResolvedValue({ id: 'email_123' })

      await sendBookingConfirmation(mockEmailData)

      const callArgs = mockSend.mock.calls[0][0]
      const icsContent = callArgs.attachments[0].content

      expect(icsContent).toContain('BEGIN:VCALENDAR')
      expect(icsContent).toContain('VERSION:2.0')
      expect(icsContent).toContain('TZID:America/Detroit')
      expect(icsContent).toContain('SUMMARY:Splashtastic Foam Party - Starter Party')
      expect(icsContent).toContain('ORGANIZER:mailto:info@splashtastic.com')
      expect(icsContent).toContain('ATTENDEE:mailto:test@example.com')
    })
  })

  describe('sendReminderEmail', () => {
    it('should send reminder email successfully', async () => {
      mockSend.mockResolvedValue({ id: 'email_123' })

      const result = await sendReminderEmail(mockEmailData)

      expect(result).toBe(true)
      expect(mockSend).toHaveBeenCalledWith({
        from: 'Splashtastic Foam Parties <noreply@splashtastic.com>',
        to: ['test@example.com'],
        subject: '🫧 Tomorrow: Your Foam Party is Ready!',
        html: expect.stringContaining('John Doe')
      })
    })
  })

  describe('sendCancellationEmail', () => {
    it('should send cancellation email successfully', async () => {
      mockSend.mockResolvedValue({ id: 'email_123' })

      const result = await sendCancellationEmail(mockEmailData)

      expect(result).toBe(true)
      expect(mockSend).toHaveBeenCalledWith({
        from: 'Splashtastic Foam Parties <noreply@splashtastic.com>',
        to: ['test@example.com'],
        subject: '❌ Your Foam Party Has Been Cancelled',
        html: expect.stringContaining('John Doe')
      })
    })
  })
})
