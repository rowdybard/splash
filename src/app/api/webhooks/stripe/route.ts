import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { prisma } from '@/lib/db'
import crypto from 'crypto'

const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET

// Track processed events to ensure idempotency
const processedEvents = new Set<string>()

export async function POST(request: NextRequest) {
  try {
    // Check if webhook secret is configured
    if (!WEBHOOK_SECRET) {
      return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 })
    }

    // Check HTTPS in production
    if (process.env.NODE_ENV === 'production' && !request.url.startsWith('https://')) {
      return NextResponse.json({ error: 'HTTPS required in production' }, { status: 400 })
    }

    const body = await request.text()
    const headersList = headers()
    const signature = headersList.get('stripe-signature')

    if (!signature) {
      return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 })
    }

    // Verify webhook signature
    const isValidSignature = verifyStripeSignature(body, signature, WEBHOOK_SECRET)
    if (!isValidSignature) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
    }

    const event = JSON.parse(body)

    // Check for idempotency
    if (processedEvents.has(event.id)) {
      return NextResponse.json({ received: true, alreadyProcessed: true })
    }

    // Process the event
    switch (event.type) {
      case 'payment_intent.succeeded':
        await handlePaymentSucceeded(event.data.object)
        break
      case 'payment_intent.payment_failed':
        await handlePaymentFailed(event.data.object)
        break
      default:
        // Ignore unknown event types
        return NextResponse.json({ received: true, ignored: true })
    }

    // Mark event as processed
    processedEvents.add(event.id)

    return NextResponse.json({ received: true })

  } catch (error) {
    console.error('Webhook error:', error)
    
    if (error instanceof SyntaxError) {
      return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
    }
    
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

function verifyStripeSignature(body: string, signature: string, secret: string): boolean {
  try {
    const elements = signature.split(',')
    let timestamp: string | undefined
    let v1: string | undefined

    for (const element of elements) {
      const [key, value] = element.split('=')
      if (key === 't') timestamp = value
      if (key === 'v1') v1 = value
    }

    if (!timestamp || !v1) return false

    const signedPayload = `${timestamp}.${body}`
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(signedPayload, 'utf8')
      .digest('hex')

    return crypto.timingSafeEqual(
      Buffer.from(v1, 'hex'),
      Buffer.from(expectedSignature, 'hex')
    )
  } catch (error) {
    return false
  }
}

async function handlePaymentSucceeded(paymentIntent: any) {
  const bookingId = paymentIntent.metadata?.bookingId
  if (!bookingId) {
    throw new Error('Missing booking ID in payment intent metadata')
  }

  // Update booking status
  await prisma.booking.update({
    where: { id: bookingId },
    data: {
      stripePaymentStatus: 'SUCCEEDED',
      stripePaymentIntentId: paymentIntent.id
    }
  })

  // Update event status to confirmed
  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
    include: { event: true }
  })

  if (booking) {
    await prisma.event.update({
      where: { id: booking.eventId },
      data: { status: 'CONFIRMED' }
    })
  }

  // TODO: Send confirmation email
  console.log(`Payment succeeded for booking ${bookingId}`)
}

async function handlePaymentFailed(paymentIntent: any) {
  const bookingId = paymentIntent.metadata?.bookingId
  if (!bookingId) {
    throw new Error('Missing booking ID in payment intent metadata')
  }

  // Update booking status
  await prisma.booking.update({
    where: { id: bookingId },
    data: {
      stripePaymentStatus: 'FAILED',
      stripePaymentIntentId: paymentIntent.id
    }
  })

  console.log(`Payment failed for booking ${bookingId}`)
}
