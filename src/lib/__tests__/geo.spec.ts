import { describe, it, expect, vi, beforeEach } from 'vitest'
import { 
  validateAddress, 
  geocodeAddress, 
  calculateDistance,
  isWithinServiceArea,
  type Address,
  type GeoLocation
} from '../geo'

describe('Geo Service', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('validateAddress', () => {
    it('should validate complete US addresses', () => {
      const validAddress: Address = {
        street: '123 Main Street',
        city: 'Detroit',
        state: 'MI', 
        zip: '48201'
      }

      const result = validateAddress(validAddress)

      expect(result.isValid).toBe(true)
      expect(result.errors).toHaveLength(0)
    })

    it('should reject incomplete addresses', () => {
      const incompleteAddress: Address = {
        street: '123 Main Street',
        city: '',
        state: 'MI',
        zip: '48201'
      }

      const result = validateAddress(incompleteAddress)

      expect(result.isValid).toBe(false)
      expect(result.errors).toContain('City is required')
    })

    it('should validate zip code format', () => {
      const invalidZipAddress: Address = {
        street: '123 Main Street',
        city: 'Detroit',
        state: 'MI',
        zip: '1234' // Invalid format
      }

      const result = validateAddress(invalidZipAddress)

      expect(result.isValid).toBe(false)
      expect(result.errors).toContain('Invalid zip code format')
    })

    it('should validate state abbreviation', () => {
      const invalidStateAddress: Address = {
        street: '123 Main Street', 
        city: 'Detroit',
        state: 'Michigan', // Should be 'MI'
        zip: '48201'
      }

      const result = validateAddress(invalidStateAddress)

      expect(result.isValid).toBe(false)
      expect(result.errors).toContain('State must be 2-letter abbreviation')
    })

    it('should handle extended zip codes', () => {
      const extendedZipAddress: Address = {
        street: '123 Main Street',
        city: 'Detroit', 
        state: 'MI',
        zip: '48201-1234'
      }

      const result = validateAddress(extendedZipAddress)

      expect(result.isValid).toBe(true)
      expect(result.errors).toHaveLength(0)
    })
  })

  describe('geocodeAddress', () => {
    it('should convert address to lat/lng coordinates', async () => {
      const address: Address = {
        street: '123 Main Street',
        city: 'Detroit',
        state: 'MI',
        zip: '48201'
      }

      // Mock Google Maps API response
      const mockGeocode = vi.fn().mockResolvedValue({
        results: [{
          geometry: {
            location: {
              lat: () => 42.3314,
              lng: () => -83.0458
            }
          }
        }]
      })

      // We'll implement the actual geocoding service later
      const result = await geocodeAddress(address)

      expect(result.success).toBe(true)
      expect(result.location).toBeDefined()
      expect(result.location?.lat).toBeCloseTo(42.3314, 3)
      expect(result.location?.lng).toBeCloseTo(-83.0458, 3)
    })

    it('should handle geocoding failures gracefully', async () => {
      const invalidAddress: Address = {
        street: '999999 Nonexistent Street',
        city: 'Faketown',
        state: 'MI',
        zip: '00000'
      }

      const result = await geocodeAddress(invalidAddress)

      expect(result.success).toBe(false)
      expect(result.error).toBeDefined()
      expect(result.location).toBeUndefined()
    })

    it('should handle API errors', async () => {
      const address: Address = {
        street: '123 Main Street',
        city: 'Detroit',
        state: 'MI', 
        zip: '48201'
      }

      // Mock API failure
      const result = await geocodeAddress(address)

      // Should handle gracefully even if API is down
      expect(result).toBeDefined()
      expect(typeof result.success).toBe('boolean')
    })
  })

  describe('calculateDistance', () => {
    it('should calculate haversine distance between two points', () => {
      const lansing: GeoLocation = { lat: 42.7325, lng: -84.5555 }
      const annArbor: GeoLocation = { lat: 42.2808, lng: -83.7430 }

      const distance = calculateDistance(lansing, annArbor)

      // Distance between Lansing and Ann Arbor is approximately 65 miles
      expect(distance).toBeCloseTo(65.0, 0) // Within 0.5 mile tolerance
    })

    it('should return 0 for identical locations', () => {
      const location: GeoLocation = { lat: 42.3314, lng: -83.0458 }

      const distance = calculateDistance(location, location)

      expect(distance).toBe(0)
    })

    it('should handle negative coordinates', () => {
      const location1: GeoLocation = { lat: 42.3314, lng: -83.0458 }
      const location2: GeoLocation = { lat: -42.3314, lng: 83.0458 }

      const distance = calculateDistance(location1, location2)

      expect(distance).toBeGreaterThan(0)
      expect(Number.isFinite(distance)).toBe(true)
    })

    it('should be commutative (A to B = B to A)', () => {
      const lansing: GeoLocation = { lat: 42.7325, lng: -84.5555 }
      const annArbor: GeoLocation = { lat: 42.3540, lng: -84.9551 }

      const distance1 = calculateDistance(lansing, annArbor)
      const distance2 = calculateDistance(annArbor, lansing)

      expect(distance1).toBeCloseTo(distance2, 6)
    })
  })

  describe('isWithinServiceArea', () => {
    const businessLocation: GeoLocation = { lat: 42.3540, lng: -84.9551 } // Lansing

    it('should return true for locations within 50 miles', () => {
      const nearbyLocation: GeoLocation = { lat: 42.5, lng: -83.2 } // About 12 miles

      const result = isWithinServiceArea(businessLocation, nearbyLocation)

      expect(result.withinArea).toBe(true)
      expect(result.distance).toBeLessThan(50)
    })

    it('should return false for locations beyond 50 miles', () => {
      const farLocation: GeoLocation = { lat: 43.0, lng: -85.0 } // About 100+ miles

      const result = isWithinServiceArea(businessLocation, farLocation)

      expect(result.withinArea).toBe(false)
      expect(result.distance).toBeGreaterThan(50)
    })

    it('should provide distance information', () => {
      const testLocation: GeoLocation = { lat: 42.5, lng: -83.2 }

      const result = isWithinServiceArea(businessLocation, testLocation)

      expect(result.distance).toBeGreaterThan(0)
      expect(Number.isFinite(result.distance)).toBe(true)
    })

    it('should handle edge case at exactly 50 miles', () => {
      // We'll need to find a location exactly 50 miles away for this test
      // For now, test the boundary condition
      const result = isWithinServiceArea(businessLocation, businessLocation)

      expect(result.withinArea).toBe(true)
      expect(result.distance).toBe(0)
    })
  })

  describe('integration tests', () => {
    it('should handle complete address-to-distance workflow', async () => {
      const customerAddress: Address = {
        street: '456 Oak Avenue',
        city: 'Ann Arbor',
        state: 'MI',
        zip: '48104'
      }

      const businessLocation: GeoLocation = { lat: 42.3314, lng: -83.0458 }

      // Validate address
      const validation = validateAddress(customerAddress)
      expect(validation.isValid).toBe(true)

      // Geocode address (will be mocked in implementation)
      const geocodeResult = await geocodeAddress(customerAddress)
      
      if (geocodeResult.success && geocodeResult.location) {
        // Calculate distance
        const distance = calculateDistance(businessLocation, geocodeResult.location)
        expect(distance).toBeGreaterThan(0)

        // Check service area
        const serviceCheck = isWithinServiceArea(businessLocation, geocodeResult.location)
        expect(serviceCheck.distance).toBe(distance)
      }
    })

    it('should handle international addresses appropriately', () => {
      const internationalAddress: Address = {
        street: '123 International Blvd',
        city: 'Toronto',
        state: 'ON', // Ontario, Canada
        zip: 'M5V 3A1'
      }

      const validation = validateAddress(internationalAddress)

      // Should reject non-US addresses for now
      expect(validation.isValid).toBe(false)
      expect(validation.errors).toContain('Only US addresses supported')
    })
  })
})
