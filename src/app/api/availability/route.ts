import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/db'
import { getAvailableSlots } from '@/lib/availability'
import { parseISO, isBefore } from 'date-fns'
import { isSunday } from 'date-fns'

const availabilitySchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format (YYYY-MM-DD)'),
  durationMin: z.number().min(30, 'Duration must be at least 30 minutes'),
  addonIds: z.array(z.string()).optional()
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate request body
    const parseResult = availabilitySchema.safeParse(body)
    if (!parseResult.success) {
      return NextResponse.json(
        { error: parseResult.error.errors[0].message },
        { status: 400 }
      )
    }

    const { date, durationMin, addonIds = [] } = parseResult.data

    // Parse and validate date
    let requestDate: Date
    try {
      requestDate = parseISO(date)
    } catch (error) {
      return NextResponse.json({ error: 'Invalid date format' }, { status: 400 })
    }

    // Check if date is in the past
    const now = new Date()
    if (isBefore(requestDate, now)) {
      return NextResponse.json({ error: 'Cannot book in the past' }, { status: 400 })
    }

    // Check if it's Sunday (closed)
    if (isSunday(requestDate)) {
      return NextResponse.json({
        slots: [],
        message: 'We are closed on Sundays',
        timezone: 'America/Detroit'
      })
    }

    // Get existing events for the date
    const existingEvents = await prisma.event.findMany({
      where: {
        date: {
          gte: new Date(requestDate.getFullYear(), requestDate.getMonth(), requestDate.getDate()),
          lt: new Date(requestDate.getFullYear(), requestDate.getMonth(), requestDate.getDate() + 1)
        }
      },
      select: {
        startAt: true,
        endAt: true
      }
    })

    // Get maintenance blocks for the date
    const blocks = await prisma.block.findMany({
      where: {
        startAt: {
          lte: new Date(requestDate.getFullYear(), requestDate.getMonth(), requestDate.getDate() + 1)
        },
        endAt: {
          gte: new Date(requestDate.getFullYear(), requestDate.getMonth(), requestDate.getDate())
        }
      }
    })

    // Get available slots
    const slots = await getAvailableSlots(requestDate, durationMin, existingEvents, blocks)

    return NextResponse.json({
      slots,
      timezone: 'America/Detroit',
      date: requestDate.toISOString()
    })

  } catch (error) {
    console.error('Availability API error:', error)
    
    if (error instanceof SyntaxError) {
      return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
    }
    
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
