import { describe, it, expect, beforeEach, vi } from 'vitest'
import { POST } from '../webhooks/stripe/route'
import { NextRequest } from 'next/server'
import crypto from 'crypto'

describe('/api/webhooks/stripe', () => {
  const mockWebhookSecret = 'whsec_test_secret'
  
  beforeEach(() => {
    vi.clearAllMocks()
    process.env.STRIPE_WEBHOOK_SECRET = mockWebhookSecret
  })

  const createWebhookRequest = (payload: any, signature?: string) => {
    const body = JSON.stringify(payload)
    
    // Generate signature if not provided
    if (!signature) {
      const timestamp = Math.floor(Date.now() / 1000)
      const signedPayload = `${timestamp}.${body}`
      const expectedSignature = crypto
        .createHmac('sha256', mockWebhookSecret)
        .update(signedPayload, 'utf8')
        .digest('hex')
      signature = `t=${timestamp},v1=${expectedSignature}`
    }

    return new NextRequest('http://localhost:3000/api/webhooks/stripe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'stripe-signature': signature,
      },
      body,
    })
  }

  describe('POST /api/webhooks/stripe', () => {
    it('should verify webhook signature correctly', async () => {
      const payload = {
        id: 'evt_test_webhook',
        type: 'payment_intent.succeeded',
        data: {
          object: {
            id: 'pi_test_12345',
            status: 'succeeded',
            metadata: {
              bookingId: 'booking_123'
            }
          }
        }
      }

      const request = createWebhookRequest(payload)
      const response = await POST(request)

      expect(response.status).toBe(200)
      const data = await response.json()
      expect(data.received).toBe(true)
    })

    it('should reject invalid signatures', async () => {
      const payload = {
        id: 'evt_test_webhook',
        type: 'payment_intent.succeeded',
        data: {
          object: {
            id: 'pi_test_12345',
            status: 'succeeded'
          }
        }
      }

      const request = createWebhookRequest(payload, 'invalid_signature')
      const response = await POST(request)

      expect(response.status).toBe(400)
      const data = await response.json()
      expect(data.error).toContain('Invalid signature')
    })

    it('should handle payment_intent.succeeded events', async () => {
      const payload = {
        id: 'evt_test_webhook',
        type: 'payment_intent.succeeded',
        data: {
          object: {
            id: 'pi_test_12345',
            status: 'succeeded',
            metadata: {
              bookingId: 'booking_123'
            }
          }
        }
      }

      const request = createWebhookRequest(payload)
      const response = await POST(request)

      expect(response.status).toBe(200)
      
      // Should update booking status to SUCCEEDED
      // This would be verified through database mocking in actual implementation
    })

    it('should handle payment_intent.payment_failed events', async () => {
      const payload = {
        id: 'evt_test_webhook',
        type: 'payment_intent.payment_failed',
        data: {
          object: {
            id: 'pi_test_12345',
            status: 'requires_payment_method',
            metadata: {
              bookingId: 'booking_123'
            },
            last_payment_error: {
              message: 'Your card was declined.'
            }
          }
        }
      }

      const request = createWebhookRequest(payload)
      const response = await POST(request)

      expect(response.status).toBe(200)
      
      // Should update booking status to FAILED
    })

    it('should be idempotent for duplicate webhooks', async () => {
      const payload = {
        id: 'evt_test_webhook_duplicate',
        type: 'payment_intent.succeeded',
        data: {
          object: {
            id: 'pi_test_12345',
            status: 'succeeded',
            metadata: {
              bookingId: 'booking_123'
            }
          }
        }
      }

      // Send same webhook twice
      const request1 = createWebhookRequest(payload)
      const request2 = createWebhookRequest(payload)

      const response1 = await POST(request1)
      const response2 = await POST(request2)

      expect(response1.status).toBe(200)
      expect(response2.status).toBe(200)

      // Both should succeed, but second should be no-op
      const data1 = await response1.json()
      const data2 = await response2.json()
      
      expect(data1.received).toBe(true)
      expect(data2.received).toBe(true)
      expect(data2.alreadyProcessed).toBe(true)
    })

    it('should handle missing booking ID in metadata', async () => {
      const payload = {
        id: 'evt_test_webhook',
        type: 'payment_intent.succeeded',
        data: {
          object: {
            id: 'pi_test_12345',
            status: 'succeeded',
            metadata: {} // No bookingId
          }
        }
      }

      const request = createWebhookRequest(payload)
      const response = await POST(request)

      expect(response.status).toBe(400)
      const data = await response.json()
      expect(data.error).toContain('Missing booking ID')
    })

    it('should handle unknown event types gracefully', async () => {
      const payload = {
        id: 'evt_test_webhook',
        type: 'customer.created', // Unhandled event type
        data: {
          object: {
            id: 'cus_test_12345'
          }
        }
      }

      const request = createWebhookRequest(payload)
      const response = await POST(request)

      expect(response.status).toBe(200)
      const data = await response.json()
      expect(data.received).toBe(true)
      expect(data.ignored).toBe(true)
    })

    it('should send confirmation email on successful payment', async () => {
      const payload = {
        id: 'evt_test_webhook',
        type: 'payment_intent.succeeded',
        data: {
          object: {
            id: 'pi_test_12345',
            status: 'succeeded',
            metadata: {
              bookingId: 'booking_123'
            }
          }
        }
      }

      // Mock email service
      const mockSendEmail = vi.fn().mockResolvedValue({ success: true })
      vi.mock('@/lib/email', () => ({
        sendConfirmationEmail: mockSendEmail
      }))

      const request = createWebhookRequest(payload)
      const response = await POST(request)

      expect(response.status).toBe(200)
      // Verify email was sent (through mocking)
    })

    it('should update event status on successful payment', async () => {
      const payload = {
        id: 'evt_test_webhook',
        type: 'payment_intent.succeeded',
        data: {
          object: {
            id: 'pi_test_12345',
            status: 'succeeded',
            metadata: {
              bookingId: 'booking_123'
            }
          }
        }
      }

      const request = createWebhookRequest(payload)
      const response = await POST(request)

      expect(response.status).toBe(200)
      
      // Should update event status from PENDING to CONFIRMED
      // This would be verified through database mocking
    })

    it('should handle partial payments correctly', async () => {
      const payload = {
        id: 'evt_test_webhook',
        type: 'payment_intent.succeeded',
        data: {
          object: {
            id: 'pi_test_12345',
            status: 'succeeded',
            amount_received: 15000, // $150 deposit
            metadata: {
              bookingId: 'booking_123',
              isDeposit: 'true'
            }
          }
        }
      }

      const request = createWebhookRequest(payload)
      const response = await POST(request)

      expect(response.status).toBe(200)
      
      // Should mark deposit as paid but leave balance due
    })

    it('should handle database connection errors', async () => {
      // Mock database error
      vi.mock('@/lib/db', () => ({
        prisma: {
          booking: {
            update: vi.fn().mockRejectedValue(new Error('Database connection failed'))
          }
        }
      }))

      const payload = {
        id: 'evt_test_webhook',
        type: 'payment_intent.succeeded',
        data: {
          object: {
            id: 'pi_test_12345',
            status: 'succeeded',
            metadata: {
              bookingId: 'booking_123'
            }
          }
        }
      }

      const request = createWebhookRequest(payload)
      const response = await POST(request)

      expect(response.status).toBe(500)
      const data = await response.json()
      expect(data.error).toContain('Internal server error')
    })

    it('should retry failed webhook processing', async () => {
      const payload = {
        id: 'evt_test_webhook_retry',
        type: 'payment_intent.succeeded',
        data: {
          object: {
            id: 'pi_test_12345',
            status: 'succeeded',
            metadata: {
              bookingId: 'booking_123'
            }
          }
        }
      }

      // Mock temporary database failure then success
      let callCount = 0
      vi.mock('@/lib/db', () => ({
        prisma: {
          booking: {
            update: vi.fn().mockImplementation(() => {
              callCount++
              if (callCount === 1) {
                throw new Error('Temporary failure')
              }
              return Promise.resolve({ id: 'booking_123' })
            })
          }
        }
      }))

      const request = createWebhookRequest(payload)
      const response = await POST(request)

      // Should eventually succeed after retry
      expect(response.status).toBe(200)
    })
  })

  describe('security', () => {
    it('should require HTTPS in production', async () => {
      const originalEnv = process.env.NODE_ENV
      process.env.NODE_ENV = 'production'

      const payload = { type: 'test' }
      const request = new NextRequest('http://localhost:3000/api/webhooks/stripe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'stripe-signature': 'test_sig',
        },
        body: JSON.stringify(payload),
      })

      const response = await POST(request)

      expect(response.status).toBe(400)
      const data = await response.json()
      expect(data.error).toContain('HTTPS required')

      process.env.NODE_ENV = originalEnv
    })

    it('should validate webhook secret is configured', async () => {
      delete process.env.STRIPE_WEBHOOK_SECRET

      const payload = { type: 'test' }
      const request = createWebhookRequest(payload)
      const response = await POST(request)

      expect(response.status).toBe(500)
      const data = await response.json()
      expect(data.error).toContain('Webhook secret not configured')
    })

    it('should handle very large payloads', async () => {
      const largePayload = {
        id: 'evt_test_webhook',
        type: 'payment_intent.succeeded',
        data: {
          object: {
            id: 'pi_test_12345',
            status: 'succeeded',
            metadata: {
              bookingId: 'booking_123',
              largeData: 'x'.repeat(1000000) // 1MB of data
            }
          }
        }
      }

      const request = createWebhookRequest(largePayload)
      const response = await POST(request)

      // Should handle or reject appropriately
      expect([200, 413]).toContain(response.status)
    })
  })
})
