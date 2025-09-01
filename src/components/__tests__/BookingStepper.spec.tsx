import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BookingStepper } from '../BookingStepper'

// Mock Next.js router
const mockPush = vi.fn()
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}))

// Mock API calls
vi.mock('@/lib/api', () => ({
  fetchAvailability: vi.fn(),
  fetchQuote: vi.fn(),
  createBooking: vi.fn(),
}))

describe('BookingStepper', () => {
  const user = userEvent.setup()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Step 1: Date/Time Selection', () => {
    it('should render date picker and time slots', () => {
      render(<BookingStepper />)

      expect(screen.getByText('Select Date & Time')).toBeInTheDocument()
      expect(screen.getByText('Choose your event date')).toBeInTheDocument()
      
      // Should show calendar component
      expect(screen.getByRole('button', { name: /calendar/i })).toBeInTheDocument()
    })

    it('should disable past dates', () => {
      render(<BookingStepper />)

      const yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)
      
      // Past dates should be disabled in calendar
      // This would need to be tested based on actual calendar implementation
    })

    it('should load available time slots when date is selected', async () => {
      const mockAvailability = {
        slots: [
          { time: '10:00', available: true, date: '2024-06-15T10:00:00-04:00' },
          { time: '14:00', available: false, date: '2024-06-15T14:00:00-04:00' },
          { time: '16:00', available: true, date: '2024-06-15T16:00:00-04:00' }
        ]
      }

      const { fetchAvailability } = await import('@/lib/api')
      vi.mocked(fetchAvailability).mockResolvedValue(mockAvailability)

      render(<BookingStepper />)

      // Select a date
      const dateButton = screen.getByRole('button', { name: /calendar/i })
      await user.click(dateButton)
      
      // This would depend on the actual calendar component implementation
      // For now, we'll assume the date selection triggers the API call
      
      await waitFor(() => {
        expect(fetchAvailability).toHaveBeenCalled()
      })
    })

    it('should show available and unavailable time slots', async () => {
      const mockAvailability = {
        slots: [
          { time: '10:00', available: true, date: '2024-06-15T10:00:00-04:00' },
          { time: '14:00', available: false, date: '2024-06-15T14:00:00-04:00', reason: 'Already booked' }
        ]
      }

      const { fetchAvailability } = await import('@/lib/api')
      vi.mocked(fetchAvailability).mockResolvedValue(mockAvailability)

      render(<BookingStepper />)

      // Simulate date selection and slot loading
      // Available slot should be clickable
      await waitFor(() => {
        const availableSlot = screen.getByRole('button', { name: /10:00/ })
        expect(availableSlot).toBeEnabled()
      })

      // Unavailable slot should be disabled
      const unavailableSlot = screen.getByRole('button', { name: /14:00/ })
      expect(unavailableSlot).toBeDisabled()
    })

    it('should advance to next step when date and time are selected', async () => {
      render(<BookingStepper />)

      // Select date and time (mocked)
      // This would involve actual calendar and time slot interactions
      
      const nextButton = screen.getByRole('button', { name: /next/i })
      await user.click(nextButton)

      expect(screen.getByText('Select Package')).toBeInTheDocument()
    })

    it('should prevent advancement without selections', () => {
      render(<BookingStepper />)

      const nextButton = screen.getByRole('button', { name: /next/i })
      expect(nextButton).toBeDisabled()
    })
  })

  describe('Step 2: Package Selection', () => {
    beforeEach(() => {
      // Mock being on step 2
      render(<BookingStepper initialStep={2} />)
    })

    it('should render package options', () => {
      expect(screen.getByText('Select Package')).toBeInTheDocument()
      expect(screen.getByText('Choose your foam party package')).toBeInTheDocument()
      
      // Should show package cards
      expect(screen.getByText('Starter Party')).toBeInTheDocument()
      expect(screen.getByText('Mega Splash')).toBeInTheDocument()
      expect(screen.getByText('Glow Night Spectacular')).toBeInTheDocument()
    })

    it('should display package details and pricing', () => {
      const starterPackage = screen.getByTestId('package-starter')
      
      expect(starterPackage).toHaveTextContent('$299')
      expect(starterPackage).toHaveTextContent('60 minutes')
      expect(starterPackage).toHaveTextContent('Up to 15 guests')
    })

    it('should allow package selection', async () => {
      const starterPackage = screen.getByTestId('package-starter')
      await user.click(starterPackage)

      expect(starterPackage).toHaveClass('selected')
      
      const nextButton = screen.getByRole('button', { name: /next/i })
      expect(nextButton).toBeEnabled()
    })

    it('should show package inclusions', () => {
      const starterPackage = screen.getByTestId('package-starter')
      
      expect(starterPackage).toHaveTextContent('Professional foam machine')
      expect(starterPackage).toHaveTextContent('Biodegradable foam solution')
      expect(starterPackage).toHaveTextContent('Setup and breakdown')
    })
  })

  describe('Step 3: Add-ons Selection', () => {
    beforeEach(() => {
      render(<BookingStepper initialStep={3} />)
    })

    it('should render available add-ons', () => {
      expect(screen.getByText('Add-ons')).toBeInTheDocument()
      expect(screen.getByText('Extra 30 Minutes')).toBeInTheDocument()
      expect(screen.getByText('Neon Foam Upgrade')).toBeInTheDocument()
      expect(screen.getByText('Premium Sound System')).toBeInTheDocument()
    })

    it('should allow multiple add-on selections', async () => {
      const extraTimeAddon = screen.getByTestId('addon-extra-time')
      const neonFoamAddon = screen.getByTestId('addon-neon-foam')

      await user.click(extraTimeAddon)
      await user.click(neonFoamAddon)

      expect(extraTimeAddon).toHaveClass('selected')
      expect(neonFoamAddon).toHaveClass('selected')
    })

    it('should show add-on pricing', () => {
      const extraTimeAddon = screen.getByTestId('addon-extra-time')
      expect(extraTimeAddon).toHaveTextContent('$99')
    })

    it('should handle inventory limits', () => {
      const slipNSlideAddon = screen.getByTestId('addon-slip-n-slide')
      
      // If inventory is limited and unavailable for selected date
      if (slipNSlideAddon.getAttribute('data-available') === 'false') {
        expect(slipNSlideAddon).toBeDisabled()
        expect(slipNSlideAddon).toHaveTextContent('Unavailable')
      }
    })

    it('should allow proceeding without add-ons', async () => {
      const nextButton = screen.getByRole('button', { name: /next/i })
      expect(nextButton).toBeEnabled()
      
      await user.click(nextButton)
      expect(screen.getByText('Event Details')).toBeInTheDocument()
    })
  })

  describe('Step 4: Event Details', () => {
    beforeEach(() => {
      render(<BookingStepper initialStep={4} />)
    })

    it('should render customer information form', () => {
      expect(screen.getByText('Event Details')).toBeInTheDocument()
      expect(screen.getByLabelText(/name/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/phone/i)).toBeInTheDocument()
    })

    it('should render address form', () => {
      expect(screen.getByLabelText(/street address/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/city/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/state/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/zip code/i)).toBeInTheDocument()
    })

    it('should validate form inputs', async () => {
      const nameInput = screen.getByLabelText(/name/i)
      const emailInput = screen.getByLabelText(/email/i)
      
      // Test invalid email
      await user.type(emailInput, 'invalid-email')
      await user.tab()
      
      expect(screen.getByText('Please enter a valid email')).toBeInTheDocument()

      // Test required fields
      const nextButton = screen.getByRole('button', { name: /next/i })
      await user.click(nextButton)
      
      expect(screen.getByText('Name is required')).toBeInTheDocument()
    })

    it('should validate address and calculate distance', async () => {
      const streetInput = screen.getByLabelText(/street address/i)
      const cityInput = screen.getByLabelText(/city/i)
      const stateInput = screen.getByLabelText(/state/i)
      const zipInput = screen.getByLabelText(/zip code/i)

      await user.type(streetInput, '123 Test Street')
      await user.type(cityInput, 'Detroit')
      await user.type(stateInput, 'MI')
      await user.type(zipInput, '48201')

      // Should trigger address validation and distance calculation
      await waitFor(() => {
        expect(screen.getByText(/within service area/i)).toBeInTheDocument()
      })
    })

    it('should show error for addresses outside service area', async () => {
      const streetInput = screen.getByLabelText(/street address/i)
      const cityInput = screen.getByLabelText(/city/i)
      const stateInput = screen.getByLabelText(/state/i)
      const zipInput = screen.getByLabelText(/zip code/i)

      await user.type(streetInput, '123 Far Street')
      await user.type(cityInput, 'Chicago')
      await user.type(stateInput, 'IL')
      await user.type(zipInput, '60601')

      await waitFor(() => {
        expect(screen.getByText(/outside service area/i)).toBeInTheDocument()
      })
    })
  })

  describe('Step 5: Review & Payment', () => {
    beforeEach(() => {
      render(<BookingStepper initialStep={5} />)
    })

    it('should display booking summary', () => {
      expect(screen.getByText('Review & Pay')).toBeInTheDocument()
      expect(screen.getByText('Booking Summary')).toBeInTheDocument()
      
      // Should show selected package, add-ons, and pricing
      expect(screen.getByText('Starter Party')).toBeInTheDocument()
      expect(screen.getByText('Package')).toBeInTheDocument()
      expect(screen.getByText('$299.00')).toBeInTheDocument()
    })

    it('should show pricing breakdown', () => {
      expect(screen.getByText('Subtotal')).toBeInTheDocument()
      expect(screen.getByText('Travel Fee')).toBeInTheDocument()
      expect(screen.getByText('Tax')).toBeInTheDocument()
      expect(screen.getByText('Total')).toBeInTheDocument()
    })

    it('should offer deposit and pay-in-full options', () => {
      expect(screen.getByText('Pay Deposit (30%)')).toBeInTheDocument()
      expect(screen.getByText('Pay in Full')).toBeInTheDocument()
    })

    it('should integrate with Stripe payment', async () => {
      const payDepositButton = screen.getByRole('button', { name: /pay deposit/i })
      await user.click(payDepositButton)

      // Should show Stripe payment form
      expect(screen.getByText('Card Information')).toBeInTheDocument()
    })

    it('should validate waiver acceptance', async () => {
      const payButton = screen.getByRole('button', { name: /pay/i })
      await user.click(payButton)

      expect(screen.getByText('Please accept the waiver')).toBeInTheDocument()

      const waiverCheckbox = screen.getByLabelText(/waiver/i)
      await user.click(waiverCheckbox)

      expect(payButton).toBeEnabled()
    })
  })

  describe('Navigation and State Persistence', () => {
    it('should persist state when navigating between steps', async () => {
      render(<BookingStepper />)

      // Select options in step 1 and move to step 2
      // Simulate selections...
      
      const nextButton = screen.getByRole('button', { name: /next/i })
      await user.click(nextButton)

      // Go back to step 1
      const backButton = screen.getByRole('button', { name: /back/i })
      await user.click(backButton)

      // Previously selected options should still be selected
      // This would need to be verified based on actual implementation
    })

    it('should show progress indicator', () => {
      render(<BookingStepper />)

      const progressIndicator = screen.getByTestId('progress-indicator')
      expect(progressIndicator).toBeInTheDocument()
      
      // Should show current step
      expect(progressIndicator).toHaveTextContent('Step 1 of 5')
    })

    it('should allow jumping to completed steps', async () => {
      render(<BookingStepper initialStep={3} completedSteps={[1, 2]} />)

      const step1Button = screen.getByTestId('step-1-button')
      await user.click(step1Button)

      expect(screen.getByText('Select Date & Time')).toBeInTheDocument()
    })

    it('should prevent jumping to incomplete steps', () => {
      render(<BookingStepper initialStep={2} completedSteps={[1]} />)

      const step4Button = screen.getByTestId('step-4-button')
      expect(step4Button).toBeDisabled()
    })
  })

  describe('Form Validation with Zod', () => {
    it('should validate step 1 form', async () => {
      render(<BookingStepper />)

      const nextButton = screen.getByRole('button', { name: /next/i })
      await user.click(nextButton)

      // Should show validation errors for missing date/time
      expect(screen.getByText('Please select a date')).toBeInTheDocument()
      expect(screen.getByText('Please select a time')).toBeInTheDocument()
    })

    it('should validate step 4 form with Zod schema', async () => {
      render(<BookingStepper initialStep={4} />)

      const nextButton = screen.getByRole('button', { name: /next/i })
      await user.click(nextButton)

      // Should show Zod validation errors
      expect(screen.getByText('Name is required')).toBeInTheDocument()
      expect(screen.getByText('Email is required')).toBeInTheDocument()
      expect(screen.getByText('Phone is required')).toBeInTheDocument()
    })

    it('should validate phone number format', async () => {
      render(<BookingStepper initialStep={4} />)

      const phoneInput = screen.getByLabelText(/phone/i)
      await user.type(phoneInput, '123')
      await user.tab()

      expect(screen.getByText('Please enter a valid phone number')).toBeInTheDocument()
    })
  })

  describe('Error Handling', () => {
    it('should handle API errors gracefully', async () => {
      const { fetchAvailability } = await import('@/lib/api')
      vi.mocked(fetchAvailability).mockRejectedValue(new Error('API Error'))

      render(<BookingStepper />)

      // Trigger API call
      // Should show error message
      await waitFor(() => {
        expect(screen.getByText('Unable to load availability')).toBeInTheDocument()
      })
    })

    it('should handle payment errors', async () => {
      render(<BookingStepper initialStep={5} />)

      // Simulate payment failure
      // Should show error message and allow retry
      expect(screen.getByText('Payment failed')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /try again/i })).toBeInTheDocument()
    })
  })
})
