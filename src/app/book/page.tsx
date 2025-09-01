import { BookingStepper } from '@/components/BookingStepper'

export default function BookPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Book Your Foam Party</h1>
            <p className="text-gray-600 mt-2">Follow the steps below to book your amazing foam party experience</p>
          </div>
          
          <BookingStepper />
        </div>
      </div>
    </div>
  )
}
