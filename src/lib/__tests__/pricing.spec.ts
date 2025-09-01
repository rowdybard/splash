import { describe, it, expect, beforeEach } from 'vitest'
import { 
  calculatePricing, 
  calculateTravelFee, 
  calculateTax, 
  calculateDeposit,
  type PricingInput,
  type PricingResult
} from '../pricing'

describe('Pricing Service', () => {
  const mockPackage = {
    id: 'pkg_1',
    name: 'Starter Party',
    basePrice: 29900, // $299.00
    durationMin: 60,
    maxGuests: 15
  }

  const mockAddons = [
    {
      id: 'addon_1',
      name: 'Extra 30 Minutes',
      price: 9900 // $99.00
    },
    {
      id: 'addon_2', 
      name: 'Neon Foam Upgrade',
      price: 7500 // $75.00
    }
  ]

  describe('calculatePricing', () => {
    it('should compute subtotal from package + addons', () => {
      const input: PricingInput = {
        package: mockPackage,
        addons: mockAddons,
        distanceMiles: 10,
        isGlowNight: false
      }

      const result = calculatePricing(input)

      expect(result.packagePrice).toBe(29900)
      expect(result.addonsPrice).toBe(17400) // 9900 + 7500
      expect(result.subtotal).toBe(47300) // package + addons
    })

    it('should apply evening surcharge for Glow Night package only', () => {
      const glowPackage = {
        ...mockPackage,
        name: 'Glow Night Spectacular',
        basePrice: 59900
      }

      const input: PricingInput = {
        package: glowPackage,
        addons: [],
        distanceMiles: 10,
        isGlowNight: true
      }

      const result = calculatePricing(input)
      
      // Evening surcharge should be applied (let's say 15%)
      expect(result.eveningSurcharge).toBeGreaterThan(0)
      expect(result.subtotal).toBeGreaterThan(glowPackage.basePrice)
    })

    it('should not apply evening surcharge for non-Glow packages', () => {
      const input: PricingInput = {
        package: mockPackage,
        addons: [],
        distanceMiles: 10,
        isGlowNight: false
      }

      const result = calculatePricing(input)
      
      expect(result.eveningSurcharge).toBe(0)
      expect(result.subtotal).toBe(mockPackage.basePrice)
    })
  })

  describe('calculateTravelFee', () => {
    it('should return $0 for distances 0-15 miles', () => {
      expect(calculateTravelFee(0)).toBe(0)
      expect(calculateTravelFee(10)).toBe(0)
      expect(calculateTravelFee(15)).toBe(0)
    })

    it('should return $49 for distances 16-30 miles', () => {
      expect(calculateTravelFee(16)).toBe(4900) // $49.00
      expect(calculateTravelFee(25)).toBe(4900)
      expect(calculateTravelFee(30)).toBe(4900)
    })

    it('should return $99 for distances 31-50 miles', () => {
      expect(calculateTravelFee(31)).toBe(9900) // $99.00
      expect(calculateTravelFee(40)).toBe(9900)
      expect(calculateTravelFee(50)).toBe(9900)
    })

    it('should throw error for distances beyond 50 miles', () => {
      expect(() => calculateTravelFee(51)).toThrow('Distance beyond service area')
      expect(() => calculateTravelFee(100)).toThrow('Distance beyond service area')
    })
  })

  describe('calculateTax', () => {
    it('should calculate tax at configurable percentage', () => {
      const subtotal = 50000 // $500.00
      const taxRate = 0.08 // 8%
      
      const tax = calculateTax(subtotal, taxRate)
      
      expect(tax).toBe(4000) // $40.00
    })

    it('should default to 8% tax rate when not provided', () => {
      const subtotal = 50000 // $500.00
      
      const tax = calculateTax(subtotal)
      
      expect(tax).toBe(4000) // 8% of $500.00
    })

    it('should handle fractional cents correctly', () => {
      const subtotal = 29900 // $299.00
      const taxRate = 0.08 // 8%
      
      const tax = calculateTax(subtotal, taxRate)
      
      expect(tax).toBe(2392) // $23.92, rounded
    })
  })

  describe('calculateDeposit', () => {
    it('should calculate deposit at configurable percentage', () => {
      const total = 50000 // $500.00
      const depositRate = 0.3 // 30%
      
      const deposit = calculateDeposit(total, depositRate)
      
      expect(deposit).toBe(15000) // $150.00
    })

    it('should default to 30% deposit rate when not provided', () => {
      const total = 50000 // $500.00
      
      const deposit = calculateDeposit(total)
      
      expect(deposit).toBe(15000) // 30% of $500.00
    })

    it('should handle fractional cents correctly', () => {
      const total = 32292 // $322.92
      const depositRate = 0.3 // 30%
      
      const deposit = calculateDeposit(total, depositRate)
      
      expect(deposit).toBe(9688) // $96.88, rounded up
    })
  })

  describe('full pricing calculation', () => {
    it('should provide complete pricing breakdown', () => {
      const input: PricingInput = {
        package: mockPackage,
        addons: [mockAddons[0]], // just extra 30 min
        distanceMiles: 25, // should incur $49 travel fee
        isGlowNight: false
      }

      const result = calculatePricing(input)

      expect(result.packagePrice).toBe(29900)
      expect(result.addonsPrice).toBe(9900)
      expect(result.subtotal).toBe(39800) // package + addons
      expect(result.travelFee).toBe(4900) // $49 for 25 miles
      expect(result.tax).toBe(3576) // 8% of (subtotal + travel)
      expect(result.total).toBe(48276) // subtotal + travel + tax
      expect(result.depositAmount).toBe(14483) // 30% of total, rounded up
      expect(result.balanceAmount).toBe(33793) // total - deposit
    })
  })
})
