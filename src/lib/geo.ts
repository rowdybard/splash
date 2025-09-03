export type Address = {
  street: string
  city: string
  state: string
  zip: string
}

export type GeoLocation = {
  lat: number
  lng: number
}

export type AddressValidationResult = {
  isValid: boolean
  errors: string[]
}

export type GeocodeResult = {
  success: boolean
  location?: GeoLocation
  error?: string
}

export type ServiceAreaResult = {
  withinArea: boolean
  distance: number
}

const US_STATES = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
]

const SERVICE_AREA_RADIUS_MILES = 50

export function validateAddress(address: Address): AddressValidationResult {
  const errors: string[] = []

  // Check required fields
  if (!address.street.trim()) {
    errors.push('Street address is required')
  }

  if (!address.city.trim()) {
    errors.push('City is required')
  }

  if (!address.state.trim()) {
    errors.push('State is required')
  }

  if (!address.zip.trim()) {
    errors.push('Zip code is required')
  }

  // Validate state format
  if (address.state.length !== 2) {
    errors.push('State must be 2-letter abbreviation')
  } else if (!US_STATES.includes(address.state.toUpperCase())) {
    errors.push('Only US addresses supported')
  }

  // Validate zip code format
  const zipRegex = /^\d{5}(-\d{4})?$/
  if (address.zip && !zipRegex.test(address.zip)) {
    errors.push('Invalid zip code format')
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}

export async function geocodeAddress(address: Address): Promise<GeocodeResult> {
  try {
    // First validate the address
    const validation = validateAddress(address)
    if (!validation.isValid) {
      return {
        success: false,
        error: `Invalid address: ${validation.errors.join(', ')}`
      }
    }

    // In a real implementation, this would call Google Maps API
    // For now, we'll use a mock implementation for testing
    if (process.env.NODE_ENV === 'test') {
      return mockGeocodeForTesting(address)
    }

    const apiKey = process.env.GOOGLE_MAPS_API_KEY
    if (!apiKey) {
      return {
        success: false,
        error: 'Google Maps API key not configured'
      }
    }

    const addressString = `${address.street}, ${address.city}, ${address.state} ${address.zip}`
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(addressString)}&key=${apiKey}`

    const response = await fetch(url)
    const data = await response.json()

    if (data.status === 'OK' && data.results.length > 0) {
      const location = data.results[0].geometry.location
      return {
        success: true,
        location: {
          lat: location.lat,
          lng: location.lng
        }
      }
    } else {
      return {
        success: false,
        error: `Geocoding failed: ${data.status}`
      }
    }
  } catch (error) {
    return {
      success: false,
      error: `Geocoding error: ${error instanceof Error ? error.message : 'Unknown error'}`
    }
  }
}

function mockGeocodeForTesting(address: Address): GeocodeResult {
  // Mock geocoding for testing - return different coordinates based on city
  const mockLocations: Record<string, GeoLocation> = {
    'Lansing': { lat: 42.7325, lng: -84.5555 },
    'Ann Arbor': { lat: 42.2808, lng: -83.7430 },

    'Chicago': { lat: 41.8781, lng: -87.6298 },
    'Faketown': { lat: 0, lng: 0 } // Invalid location for testing
  }

  const mockLocation = mockLocations[address.city]
  
  if (!mockLocation || (mockLocation.lat === 0 && mockLocation.lng === 0)) {
    return {
      success: false,
      error: 'Address not found'
    }
  }

  return {
    success: true,
    location: mockLocation
  }
}

export function calculateDistance(from: GeoLocation, to: GeoLocation): number {
  // Haversine formula for calculating distance between two points on Earth
  const R = 3959 // Earth's radius in miles
  const dLat = toRadians(to.lat - from.lat)
  const dLng = toRadians(to.lng - from.lng)
  
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(from.lat)) * Math.cos(toRadians(to.lat)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2)
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const distance = R * c

  return Math.round(distance * 100) / 100 // Round to 2 decimal places
}

export function isWithinServiceArea(businessLocation: GeoLocation, customerLocation: GeoLocation): ServiceAreaResult {
  const distance = calculateDistance(businessLocation, customerLocation)
  
  return {
    withinArea: distance <= SERVICE_AREA_RADIUS_MILES,
    distance
  }
}

function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180)
}
