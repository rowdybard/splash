import { NextRequest, NextResponse } from 'next/server'
import { generateICS } from '@/lib/ics'

export async function GET(
  request: NextRequest,
  { params }: { params: { bookingId: string } }
) {
  try {
    const { bookingId } = params

    if (!bookingId) {
      return NextResponse.json(
        { error: 'Booking ID is required' },
        { status: 400 }
      )
    }

    // In a real app, you would fetch the booking details from your database
    // For now, we'll use mock data
    if (process.env.NODE_ENV === 'test') {
          // Mock data for tests
          const mockEventDetails = {
        id: 'test-booking-123',
        title: 'Splashtastic Foam Party',
        description: 'Join us for an amazing foam party experience!',
        location: {
          street: '123 Main St',
          city: 'Lansing',
          state: 'MI',
          zip: '48901'
        },
      startDateTime: new Date('2024-06-15T14:00:00Z'),
      endDateTime: new Date('2024-06-15T16:00:00Z'),
      organizerEmail: 'info@splashtastic.com',
      attendeeEmail: 'customer@example.com',
      url: 'https://splashtastic.com'
    }

      const icsContent = generateICS(mockEventDetails)

      return new NextResponse(icsContent, {
        status: 200,
        headers: {
          'Content-Type': 'text/calendar; charset=utf-8',
          'Content-Disposition': `attachment; filename="foam-party-${bookingId}.ics"`
        }
      })
    }

    // TODO: Fetch actual booking data from database
    // const booking = await prisma.booking.findUnique({
    //   where: { id: bookingId },
    //   include: { customer: true, package: true, addons: true }
    // })

    // if (!booking) {
    //   return NextResponse.json(
    //     { error: 'Booking not found' },
    //     { status: 404 }
    //   )
    // }

    // Mock data for development
    const eventDetails = {
      id: bookingId,
      title: 'Splashtastic Foam Party',
      description: 'Join us for an amazing foam party experience!',
      location: {
        street: '123 Main St',
        city: 'Lansing',
        state: 'MI',
        zip: '48901'
      },
      startDateTime: new Date('2024-06-15T14:00:00Z'),
      endDateTime: new Date('2024-06-15T16:00:00Z'),
      organizerEmail: 'info@splashtastic.com',
      attendeeEmail: 'customer@example.com',
      url: 'https://splashtastic.com'
    }

    const icsContent = generateICS(eventDetails)

    return new NextResponse(icsContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/calendar; charset=utf-8',
        'Content-Disposition': `attachment; filename="foam-party-${bookingId}.ics"`
      }
    })
  } catch (error) {
    console.error('Error generating ICS file:', error)
    return NextResponse.json(
      { error: 'Failed to generate calendar file' },
      { status: 500 }
    )
  }
}
