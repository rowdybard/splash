'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

export default function SuccessPage() {
  const searchParams = useSearchParams()
  const [bookingDetails, setBookingDetails] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const sessionId = searchParams.get('session_id')
    if (sessionId) {
      // In a real app, you'd verify the session with Stripe
      // For now, we'll simulate success
      setBookingDetails({
        id: 'booking_' + Math.random().toString(36).slice(2),
        status: 'confirmed',
        amount: searchParams.get('amount') || '$0.00'
      })
      setLoading(false)
    }
  }, [searchParams])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Processing your payment...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
          <p className="text-gray-600">Your foam party booking has been confirmed</p>
        </div>

        {bookingDetails && (
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Booking Details</h2>
            <div className="space-y-3 text-left">
              <div className="flex justify-between">
                <span className="text-gray-600">Booking ID:</span>
                <span className="font-mono text-sm">{bookingDetails.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                <span className="text-green-600 font-semibold capitalize">{bookingDetails.status}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Amount Paid:</span>
                <span className="font-semibold">{bookingDetails.amount}</span>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2">What's Next?</h3>
            <ul className="text-blue-800 text-sm space-y-1">
              <li>• You'll receive a confirmation email shortly</li>
              <li>• Our team will contact you within 24 hours</li>
              <li>• We'll send setup instructions 48 hours before your event</li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/book" 
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Book Another Party
            </Link>
            <Link 
              href="/" 
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Return Home
            </Link>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Questions? Contact us at{' '}
            <a href="mailto:info@splashtastic.com" className="text-blue-600 hover:underline">
              info@splashtastic.com
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
