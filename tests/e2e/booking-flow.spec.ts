import { test, expect } from '@playwright/test'

test.describe('Booking Flow E2E', () => {
  test.beforeEach(async ({ page }) => {
    // Start from home page
    await page.goto('/')
  })

  test('complete booking flow with Stripe test card', async ({ page }) => {
    // Home page interaction
    await expect(page.getByText('Backyard magic, in minutes.')).toBeVisible()
    await page.getByRole('button', { name: 'Check Availability' }).click()

    // Should navigate to booking page
    await expect(page).toHaveURL('/book')
    await expect(page.getByText('Select Date & Time')).toBeVisible()

    // Step 1: Select date and time
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    const tomorrowStr = tomorrow.toISOString().split('T')[0]

    // Open calendar and select tomorrow
    await page.getByRole('button', { name: /calendar/i }).click()
    await page.getByLabel(tomorrowStr).click()

    // Wait for time slots to load
    await expect(page.getByText('Available Times')).toBeVisible()
    
    // Select first available time slot
    await page.getByRole('button', { name: /10:00/i }).first().click()
    await page.getByRole('button', { name: 'Next' }).click()

    // Step 2: Select package
    await expect(page.getByText('Select Package')).toBeVisible()
    await page.getByTestId('package-starter').click()
    await page.getByRole('button', { name: 'Next' }).click()

    // Step 3: Add-ons (optional, skip)
    await expect(page.getByText('Add-ons')).toBeVisible()
    await page.getByRole('button', { name: 'Next' }).click()

    // Step 4: Event details
    await expect(page.getByText('Event Details')).toBeVisible()
    
    // Fill customer information
    await page.getByLabel(/name/i).fill('John Doe')
    await page.getByLabel(/email/i).fill('john.doe@example.com')
    await page.getByLabel(/phone/i).fill('555-123-4567')

    // Fill address
    await page.getByLabel(/street address/i).fill('123 Test Street')
    await page.getByLabel(/city/i).fill('Lansing')
    await page.getByLabel(/state/i).selectOption('MI')
    await page.getByLabel(/zip code/i).fill('48901')

    // Wait for address validation
    await expect(page.getByText(/within service area/i)).toBeVisible()

    // Fill event details
    await page.getByLabel(/event type/i).fill('Birthday Party')
    await page.getByLabel(/surface/i).selectOption('Grass')
    await page.getByLabel(/notes/i).fill('Kids birthday party in backyard')

    await page.getByRole('button', { name: 'Next' }).click()

    // Step 5: Review and payment
    await expect(page.getByText('Review & Pay')).toBeVisible()
    
    // Verify booking summary
    await expect(page.getByText('Starter Party')).toBeVisible()
    await expect(page.getByText('$299.00')).toBeVisible()

    // Accept waiver
    await page.getByLabel(/waiver/i).check()

    // Choose deposit option
    await page.getByRole('button', { name: /pay deposit/i }).click()

    // Stripe payment form should appear
    await expect(page.frameLocator('iframe').first()).toBeVisible()

    // Fill in Stripe test card details
    const stripeFrame = page.frameLocator('iframe[name*="card-number"]')
    await stripeFrame.locator('input[name="cardnumber"]').fill('4242424242424242')
    
    const expiryFrame = page.frameLocator('iframe[name*="card-expiry"]')
    await expiryFrame.locator('input[name="exp-date"]').fill('12/34')
    
    const cvcFrame = page.frameLocator('iframe[name*="card-cvc"]')
    await cvcFrame.locator('input[name="cvc"]').fill('123')

    // Submit payment
    await page.getByRole('button', { name: /pay now/i }).click()

    // Should show success page
    await expect(page.getByText('Booking Confirmed!')).toBeVisible()
    await expect(page.getByText('Your foam party is booked')).toBeVisible()
    
    // Should display booking confirmation details
    await expect(page.getByText('Booking #')).toBeVisible()
    await expect(page.getByText('Confirmation email sent')).toBeVisible()
  })

  test('booking flow handles validation errors', async ({ page }) => {
    await page.getByRole('button', { name: 'Check Availability' }).click()

    // Try to proceed without selecting date/time
    await page.getByRole('button', { name: 'Next' }).click()
    await expect(page.getByText('Please select a date')).toBeVisible()
    await expect(page.getByText('Please select a time')).toBeVisible()

    // Select date and time to proceed
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    const tomorrowStr = tomorrow.toISOString().split('T')[0]

    await page.getByRole('button', { name: /calendar/i }).click()
    await page.getByLabel(tomorrowStr).click()
    await page.getByRole('button', { name: /10:00/i }).first().click()
    await page.getByRole('button', { name: 'Next' }).click()

    // Try to proceed without selecting package
    await page.getByRole('button', { name: 'Next' }).click()
    await expect(page.getByText('Please select a package')).toBeVisible()

    // Select package to proceed
    await page.getByTestId('package-starter').click()
    await page.getByRole('button', { name: 'Next' }).click()
    await page.getByRole('button', { name: 'Next' }).click() // Skip add-ons

    // Try to proceed without filling required fields
    await page.getByRole('button', { name: 'Next' }).click()
    await expect(page.getByText('Name is required')).toBeVisible()
    await expect(page.getByText('Email is required')).toBeVisible()
    await expect(page.getByText('Phone is required')).toBeVisible()

    // Test invalid email format
    await page.getByLabel(/email/i).fill('invalid-email')
    await page.getByLabel(/name/i).click() // Trigger validation
    await expect(page.getByText('Please enter a valid email')).toBeVisible()
  })

  test('address outside service area shows error', async ({ page }) => {
    await page.getByRole('button', { name: 'Check Availability' }).click()

    // Complete steps 1-3 quickly
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    const tomorrowStr = tomorrow.toISOString().split('T')[0]

    await page.getByRole('button', { name: /calendar/i }).click()
    await page.getByLabel(tomorrowStr).click()
    await page.getByRole('button', { name: /10:00/i }).first().click()
    await page.getByRole('button', { name: 'Next' }).click()

    await page.getByTestId('package-starter').click()
    await page.getByRole('button', { name: 'Next' }).click()
    await page.getByRole('button', { name: 'Next' }).click()

    // Fill valid customer info
    await page.getByLabel(/name/i).fill('John Doe')
    await page.getByLabel(/email/i).fill('john.doe@example.com')
    await page.getByLabel(/phone/i).fill('555-123-4567')

    // Fill address outside service area
    await page.getByLabel(/street address/i).fill('123 Far Street')
    await page.getByLabel(/city/i).fill('Chicago')
    await page.getByLabel(/state/i).selectOption('IL')
    await page.getByLabel(/zip code/i).fill('60601')

    // Should show service area error
    await expect(page.getByText(/outside service area/i)).toBeVisible()
    await expect(page.getByRole('button', { name: 'Next' })).toBeDisabled()
  })

  test('payment failure handling', async ({ page }) => {
    // Complete booking flow up to payment
    await page.getByRole('button', { name: 'Check Availability' }).click()

    // Quick completion of steps 1-4
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    const tomorrowStr = tomorrow.toISOString().split('T')[0]

    await page.getByRole('button', { name: /calendar/i }).click()
    await page.getByLabel(tomorrowStr).click()
    await page.getByRole('button', { name: /10:00/i }).first().click()
    await page.getByRole('button', { name: 'Next' }).click()

    await page.getByTestId('package-starter').click()
    await page.getByRole('button', { name: 'Next' }).click()
    await page.getByRole('button', { name: 'Next' }).click()

    await page.getByLabel(/name/i).fill('John Doe')
    await page.getByLabel(/email/i).fill('john.doe@example.com')
    await page.getByLabel(/phone/i).fill('555-123-4567')
    await page.getByLabel(/street address/i).fill('123 Test Street')
    await page.getByLabel(/city/i).fill('Lansing')
    await page.getByLabel(/state/i).selectOption('MI')
    await page.getByLabel(/zip code/i).fill('48901')
    await page.getByRole('button', { name: 'Next' }).click()

    // Accept waiver and try payment with declined card
    await page.getByLabel(/waiver/i).check()
    await page.getByRole('button', { name: /pay deposit/i }).click()

    // Use Stripe test card that will be declined
    const stripeFrame = page.frameLocator('iframe[name*="card-number"]')
    await stripeFrame.locator('input[name="cardnumber"]').fill('4000000000000002') // Declined card

    const expiryFrame = page.frameLocator('iframe[name*="card-expiry"]')
    await expiryFrame.locator('input[name="exp-date"]').fill('12/34')

    const cvcFrame = page.frameLocator('iframe[name*="card-cvc"]')
    await cvcFrame.locator('input[name="cvc"]').fill('123')

    await page.getByRole('button', { name: /pay now/i }).click()

    // Should show payment error
    await expect(page.getByText(/payment failed/i)).toBeVisible()
    await expect(page.getByText(/try again/i)).toBeVisible()
  })

  test('admin page shows booking after webhook', async ({ page }) => {
    // First complete a booking
    await page.getByRole('button', { name: 'Check Availability' }).click()

    // Quick booking completion (abbreviated for test)
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    const tomorrowStr = tomorrow.toISOString().split('T')[0]

    await page.getByRole('button', { name: /calendar/i }).click()
    await page.getByLabel(tomorrowStr).click()
    await page.getByRole('button', { name: /10:00/i }).first().click()
    await page.getByRole('button', { name: 'Next' }).click()

    await page.getByTestId('package-starter').click()
    await page.getByRole('button', { name: 'Next' }).click()
    await page.getByRole('button', { name: 'Next' }).click()

    await page.getByLabel(/name/i).fill('John Doe')
    await page.getByLabel(/email/i).fill('john.doe@example.com')
    await page.getByLabel(/phone/i).fill('555-123-4567')
    await page.getByLabel(/street address/i).fill('123 Test Street')
    await page.getByLabel(/city/i).fill('Lansing')
    await page.getByLabel(/state/i).selectOption('MI')
    await page.getByLabel(/zip code/i).fill('48901')
    await page.getByRole('button', { name: 'Next' }).click()

    await page.getByLabel(/waiver/i).check()
    await page.getByRole('button', { name: /pay deposit/i }).click()

    // Complete payment with valid test card
    const stripeFrame = page.frameLocator('iframe[name*="card-number"]')
    await stripeFrame.locator('input[name="cardnumber"]').fill('4242424242424242')
    
    const expiryFrame = page.frameLocator('iframe[name*="card-expiry"]')
    await expiryFrame.locator('input[name="exp-date"]').fill('12/34')
    
    const cvcFrame = page.frameLocator('iframe[name*="card-cvc"]')
    await cvcFrame.locator('input[name="cvc"]').fill('123')

    await page.getByRole('button', { name: /pay now/i }).click()

    // Wait for booking confirmation
    await expect(page.getByText('Booking Confirmed!')).toBeVisible()

    // Extract booking ID for verification
    const bookingId = await page.locator('[data-testid="booking-id"]').textContent()

    // Navigate to admin page
    await page.goto('/admin')
    
    // Should require passcode
    await page.getByLabel(/passcode/i).fill(process.env.ADMIN_PASSCODE || 'test-passcode')
    await page.getByRole('button', { name: /login/i }).click()

    // Should see booking list
    await expect(page.getByText('Recent Bookings')).toBeVisible()
    
    // Should find the booking we just created
    if (bookingId) {
      await expect(page.getByText(bookingId)).toBeVisible()
    }
    
    await expect(page.getByText('John Doe')).toBeVisible()
    await expect(page.getByText('Starter Party')).toBeVisible()
  })

  test('accessibility checks pass', async ({ page }) => {
    await page.goto('/')
    
    // Run accessibility scan on home page
    const accessibilityScanResult = await page.evaluate(() => {
      // This would integrate with axe-core or similar
      // For now, we'll check basic accessibility features
      const hasMainHeading = document.querySelector('h1') !== null
      const hasNavigation = document.querySelector('nav') !== null
      const imagesHaveAlt = Array.from(document.querySelectorAll('img')).every(img => 
        img.hasAttribute('alt')
      )
      
      return {
        hasMainHeading,
        hasNavigation,
        imagesHaveAlt
      }
    })

    expect(accessibilityScanResult.hasMainHeading).toBe(true)
    expect(accessibilityScanResult.hasNavigation).toBe(true)
    expect(accessibilityScanResult.imagesHaveAlt).toBe(true)

    // Test keyboard navigation
    await page.keyboard.press('Tab')
    await expect(page.locator(':focus')).toBeVisible()

    // Test booking form accessibility
    await page.getByRole('button', { name: 'Check Availability' }).click()
    
    // All form fields should be properly labeled
    await expect(page.getByLabel(/date/i)).toBeVisible()
    await expect(page.getByLabel(/time/i)).toBeVisible()
  })

  test('mobile responsive design', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')

    // Hero should be visible and readable on mobile
    await expect(page.getByText('Backyard magic, in minutes.')).toBeVisible()
    
    // Navigation should work on mobile
    await page.getByRole('button', { name: /menu/i }).click()
    await expect(page.getByRole('link', { name: 'Packages' })).toBeVisible()

    // Booking flow should work on mobile
    await page.getByRole('button', { name: 'Check Availability' }).click()
    await expect(page.getByText('Select Date & Time')).toBeVisible()

    // Form inputs should be appropriately sized
    const nameInput = page.getByLabel(/name/i)
    await expect(nameInput).toBeVisible()
    
    const inputBox = await nameInput.boundingBox()
    expect(inputBox?.height).toBeGreaterThan(40) // Minimum touch target
  })

  test('performance checks', async ({ page }) => {
    // Start timing
    const startTime = Date.now()
    
    await page.goto('/')
    
    // Wait for page to be fully loaded
    await page.waitForLoadState('networkidle')
    
    const loadTime = Date.now() - startTime
    
    // LCP should be under 2 seconds
    expect(loadTime).toBeLessThan(2000)

    // Check for core web vitals
    const webVitals = await page.evaluate(() => {
      return new Promise((resolve) => {
        new PerformanceObserver((list) => {
          const entries = list.getEntries()
          const lcpEntry = entries.find(entry => entry.entryType === 'largest-contentful-paint')
          
          if (lcpEntry) {
            resolve({ lcp: lcpEntry.startTime })
          }
        }).observe({ entryTypes: ['largest-contentful-paint'] })
        
        // Fallback timeout
        setTimeout(() => resolve({ lcp: null }), 3000)
      })
    })

    if (webVitals.lcp) {
      expect(webVitals.lcp).toBeLessThan(2000) // 2 second LCP target
    }
  })
})
