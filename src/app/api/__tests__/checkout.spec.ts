import { describe, it, expect } from 'vitest'
import { NextRequest } from 'next/server'
import { POST } from '../checkout/route'

const createRequest = (body: any) =>
  new NextRequest('http://localhost:3000/api/checkout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

describe('/api/checkout', () => {
  it('should create a Stripe checkout session for a deposit', async () => {
    const request = createRequest({
      bookingId: 'booking_123',
      mode: 'deposit',
      amountCents: 5000,
      successUrl: 'http://localhost:3000/success',
      cancelUrl: 'http://localhost:3000/cancel',
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.session).toBeDefined()
    expect(data.session.id).toMatch(/^cs_test_/)
    expect(data.session.url).toContain('stripe')
    expect(data.session.mode).toBe('deposit')
  })

  it('should validate request body', async () => {
    const request = createRequest({
      // Missing bookingId
      mode: 'full',
      amountCents: 12000,
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.error.toLowerCase()).toContain('booking')
  })

  it('should create a Stripe checkout session for pay-in-full', async () => {
    const request = createRequest({
      bookingId: 'booking_456',
      mode: 'full',
      amountCents: 25000,
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.session).toBeDefined()
    expect(data.session.mode).toBe('full')
  })

  it('should surface Stripe errors gracefully (mocked)', async () => {
    const request = createRequest({
      bookingId: 'booking_789',
      mode: 'full',
      amountCents: 1000,
      mockStripeError: true,
    })

    const response = await POST(request)
    const data = await response.json()

    expect([400, 500]).toContain(response.status)
    expect(String(data.error || '').toLowerCase()).toContain('stripe')
  })
})


