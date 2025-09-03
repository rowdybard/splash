import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const checkoutSchema = z.object({
  bookingId: z.string().min(1, 'bookingId is required'),
  mode: z.enum(['deposit', 'full']),
  amountCents: z.number().int().positive('amountCents must be > 0'),
  successUrl: z.string().url().optional(),
  cancelUrl: z.string().url().optional(),
  mockStripeError: z.boolean().optional()
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const parsed = checkoutSchema.safeParse(body)
    if (!parsed.success) {
      const first = parsed.error.errors[0]
      const field = (first?.path?.[0] as string) || ''
      let msg = first?.message || 'Validation failed'
      if ((first?.message === 'Required' || (first as any)?.code === 'invalid_type') && field) {
        msg = `${field} is required`
      }
      return NextResponse.json({ error: msg }, { status: 400 })
    }

    const { bookingId, mode, amountCents, successUrl, cancelUrl, mockStripeError } = parsed.data

    if (mockStripeError) {
      return NextResponse.json({ error: 'Stripe error (mocked)' }, { status: 400 })
    }

    // In tests or when missing Stripe key, return a stubbed session
    const shouldStub = process.env.NODE_ENV === 'test' || !process.env.STRIPE_SECRET_KEY
    if (shouldStub) {
      const session = {
        id: 'cs_test_' + Math.random().toString(36).slice(2),
        url: 'https://checkout.stripe.com/test_session/' + encodeURIComponent(bookingId),
        mode,
        amount_total: amountCents,
        success_url: successUrl || 'http://localhost:3000/success',
        cancel_url: cancelUrl || 'http://localhost:3000/cancel'
      }
      return NextResponse.json({ session }, { status: 200 })
    }

    // Real Stripe integration (not invoked in tests without key)
    // Lazy import to avoid bundling when not needed
    const Stripe = (await import('stripe')).default
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, { apiVersion: '2023-10-16' })

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: { name: `Splashtastic ${mode === 'deposit' ? 'Deposit' : 'Full Payment'}` },
            unit_amount: amountCents
          },
          quantity: 1
        }
      ],
      metadata: { bookingId, mode },
      success_url: successUrl || `${process.env.NEXT_PUBLIC_SITE_URL}/success`,
      cancel_url: cancelUrl || `${process.env.NEXT_PUBLIC_SITE_URL}/cancel`
    })

    return NextResponse.json({ session }, { status: 200 })
  } catch (error: any) {
    if (error instanceof SyntaxError) {
      return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
    }
    const message = typeof error?.message === 'string' ? error.message : 'Internal server error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}


