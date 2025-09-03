'use client'

import Link from 'next/link'

export default function CancelPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="mb-8">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Cancelled</h1>
          <p className="text-gray-600">Your payment was not completed</p>
        </div>

        <div className="space-y-6">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h3 className="font-semibold text-yellow-900 mb-2">Don't Worry!</h3>
            <p className="text-yellow-800 text-sm">
              Your booking information has been saved. You can complete your payment at any time.
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">What Happened?</h3>
            <ul className="text-gray-700 text-sm space-y-2 text-left">
              <li>• You can close this page and return later</li>
              <li>• Your booking details are still in your cart</li>
              <li>• No charges were made to your account</li>
              <li>• You can try again with a different payment method</li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/book" 
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Again
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
            Need help? Contact us at{' '}
            <a href="mailto:info@splashtastic.com" className="text-blue-600 hover:underline">
              info@splashtastic.com
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
