// Mock API functions for testing

export async function fetchAvailability(date: string, durationMin: number) {
  // Mock implementation for testing
  return {
    slots: [
      { time: '10:00', available: true, date: `${date}T10:00:00-04:00` },
      { time: '14:00', available: false, date: `${date}T14:00:00-04:00`, reason: 'Already booked' },
      { time: '16:00', available: true, date: `${date}T16:00:00-04:00` }
    ]
  }
}

export async function fetchQuote(params: any) {
  // Mock implementation for testing
  return {
    packagePrice: 29900,
    addonsPrice: 0,
    subtotal: 29900,
    travelFee: 0,
    tax: 2392,
    total: 32292,
    depositAmount: 9688,
    balanceAmount: 22604,
    lineItems: [
      { name: 'Starter Party', price: 29900, type: 'package' }
    ]
  }
}

export async function createBooking(bookingData: any) {
  // Mock implementation for testing
  return {
    id: 'booking_123',
    status: 'pending'
  }
}
