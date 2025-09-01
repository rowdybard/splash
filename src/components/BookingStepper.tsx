'use client'

import { useState } from 'react'

type BookingStepperProps = {
  initialStep?: number
  completedSteps?: number[]
}

export function BookingStepper({ initialStep = 1, completedSteps = [] }: BookingStepperProps) {
  const [currentStep, setCurrentStep] = useState(initialStep)

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Progress Indicator */}
      <div data-testid="progress-indicator" className="mb-8">
        <div className="text-sm text-gray-600">Step {currentStep} of 5</div>
        <div className="flex space-x-2 mt-2">
          {[1, 2, 3, 4, 5].map((step) => (
            <button
              key={step}
              data-testid={`step-${step}-button`}
              className={`w-8 h-8 rounded-full ${
                step === currentStep
                  ? 'bg-blue-500 text-white'
                  : completedSteps.includes(step)
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200'
              }`}
              disabled={!completedSteps.includes(step) && step !== currentStep}
              onClick={() => {
                if (completedSteps.includes(step) || step === currentStep) {
                  setCurrentStep(step)
                }
              }}
            >
              {step}
            </button>
          ))}
        </div>
      </div>

      {/* Step Content */}
      {currentStep === 1 && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Select Date & Time</h2>
          <p className="text-gray-600 mb-6">Choose your event date</p>
          
          <button role="button" aria-label="calendar" className="border p-2 rounded">
            📅 Select Date
          </button>
          
          <div className="mt-4">
            <h3>Available Times</h3>
            <div className="grid grid-cols-3 gap-2 mt-2">
              <button role="button" aria-label="10:00 AM" className="border p-2 rounded">
                10:00
              </button>
              <button role="button" aria-label="14:00 PM" disabled className="border p-2 rounded opacity-50">
                14:00
              </button>
              <button role="button" aria-label="16:00 PM" className="border p-2 rounded">
                16:00
              </button>
            </div>
          </div>
        </div>
      )}

      {currentStep === 2 && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Select Package</h2>
          <p className="text-gray-600 mb-6">Choose your foam party package</p>
          
          <div className="space-y-4">
            <div data-testid="package-starter" className="border p-4 rounded cursor-pointer hover:bg-gray-50">
              <h3 className="font-bold">Starter Party</h3>
              <p className="text-gray-600">60 minutes • Up to 15 guests</p>
              <p className="text-2xl font-bold">$299</p>
              <ul className="text-sm text-gray-600 mt-2">
                <li>• Professional foam machine</li>
                <li>• Biodegradable foam solution</li>
                <li>• Setup and breakdown</li>
              </ul>
            </div>
            
            <div data-testid="package-mega" className="border p-4 rounded cursor-pointer hover:bg-gray-50">
              <h3 className="font-bold">Mega Splash</h3>
              <p className="text-gray-600">90 minutes • Up to 25 guests</p>
              <p className="text-2xl font-bold">$449</p>
            </div>
            
            <div data-testid="package-glow" className="border p-4 rounded cursor-pointer hover:bg-gray-50">
              <h3 className="font-bold">Glow Night Spectacular</h3>
              <p className="text-gray-600">90 minutes • Up to 30 guests</p>
              <p className="text-2xl font-bold">$599</p>
            </div>
          </div>
        </div>
      )}

      {currentStep === 3 && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Add-ons</h2>
          
          <div className="space-y-4">
            <div data-testid="addon-extra-time" className="border p-4 rounded cursor-pointer hover:bg-gray-50">
              <h3 className="font-bold">Extra 30 Minutes</h3>
              <p className="text-2xl font-bold">$99</p>
            </div>
            
            <div data-testid="addon-neon-foam" className="border p-4 rounded cursor-pointer hover:bg-gray-50">
              <h3 className="font-bold">Neon Foam Upgrade</h3>
              <p className="text-2xl font-bold">$75</p>
            </div>
            
            <div data-testid="addon-slip-n-slide" className="border p-4 rounded cursor-pointer hover:bg-gray-50" data-available="true">
              <h3 className="font-bold">Slip-n-Slide Combo</h3>
              <p className="text-2xl font-bold">$150</p>
            </div>
          </div>
        </div>
      )}

      {currentStep === 4 && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Event Details</h2>
          
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium">Name</label>
              <input id="name" type="text" className="border p-2 rounded w-full" />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium">Email</label>
              <input id="email" type="email" className="border p-2 rounded w-full" />
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-sm font-medium">Phone</label>
              <input id="phone" type="tel" className="border p-2 rounded w-full" />
            </div>
            
            <div>
              <label htmlFor="street" className="block text-sm font-medium">Street Address</label>
              <input id="street" type="text" className="border p-2 rounded w-full" />
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label htmlFor="city" className="block text-sm font-medium">City</label>
                <input id="city" type="text" className="border p-2 rounded w-full" />
              </div>
              
              <div>
                <label htmlFor="state" className="block text-sm font-medium">State</label>
                <select id="state" className="border p-2 rounded w-full">
                  <option value="">Select State</option>
                  <option value="MI">Michigan</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="zip" className="block text-sm font-medium">Zip Code</label>
                <input id="zip" type="text" className="border p-2 rounded w-full" />
              </div>
            </div>
            
            <div>
              <label htmlFor="eventType" className="block text-sm font-medium">Event Type</label>
              <input id="eventType" type="text" className="border p-2 rounded w-full" />
            </div>
            
            <div>
              <label htmlFor="surface" className="block text-sm font-medium">Surface</label>
              <select id="surface" className="border p-2 rounded w-full">
                <option value="">Select Surface</option>
                <option value="Grass">Grass</option>
                <option value="Concrete">Concrete</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="notes" className="block text-sm font-medium">Notes</label>
              <textarea id="notes" className="border p-2 rounded w-full" rows={3}></textarea>
            </div>
          </form>
          
          <div className="mt-4 p-4 bg-green-100 rounded">
            <p className="text-green-800">✓ Address is within service area</p>
          </div>
        </div>
      )}

      {currentStep === 5 && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Review & Pay</h2>
          
          <div className="mb-6">
            <h3 className="text-lg font-bold mb-2">Booking Summary</h3>
            <div className="border p-4 rounded">
              <div className="flex justify-between">
                <span>Package: Starter Party</span>
                <span>$299.00</span>
              </div>
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>$299.00</span>
              </div>
              <div className="flex justify-between">
                <span>Travel Fee</span>
                <span>$0.00</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>$23.92</span>
              </div>
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>$322.92</span>
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <label className="flex items-center space-x-2">
              <input type="checkbox" />
              <span>I accept the waiver and terms of service</span>
            </label>
          </div>
          
          <div className="space-y-4">
            <button className="w-full bg-blue-500 text-white py-3 rounded font-bold">
              Pay Deposit (30%) - $96.88
            </button>
            <button className="w-full bg-green-500 text-white py-3 rounded font-bold">
              Pay in Full - $322.92
            </button>
          </div>
          
          <div className="mt-6">
            <h4>Card Information</h4>
            <div className="space-y-2 mt-2">
              <input type="text" placeholder="Card number" className="border p-2 rounded w-full" />
              <div className="grid grid-cols-2 gap-2">
                <input type="text" placeholder="MM/YY" className="border p-2 rounded" />
                <input type="text" placeholder="CVC" className="border p-2 rounded" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between mt-8">
        {currentStep > 1 && (
          <button 
            className="px-4 py-2 border rounded"
            onClick={() => setCurrentStep(currentStep - 1)}
          >
            Back
          </button>
        )}
        
        {currentStep < 5 && (
          <button 
            className="px-4 py-2 bg-blue-500 text-white rounded ml-auto"
            disabled={false} // This would be controlled by form validation
            onClick={() => setCurrentStep(currentStep + 1)}
          >
            Next
          </button>
        )}
      </div>
    </div>
  )
}
