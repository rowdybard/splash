import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/db'
import { calculatePricing } from '@/lib/pricing'
import { validateAddress, geocodeAddress, calculateDistance, isWithinServiceArea } from '@/lib/geo'

const quoteSchema = z.object({
  packageId: z.string(),
  addonIds: z.array(z.string()).default([]),
  address: z.object({
    street: z.string().min(1, 'Street is required'),
    city: z.string().min(1, 'City is required'),
    state: z.string().length(2, 'State must be 2 characters'),
    zip: z.string().min(5, 'Zip code is required')
  }),
  eventDate: z.string(),
  isGlowNight: z.boolean().default(false)
})

// Business location (Detroit area)
const BUSINESS_LOCATION = { lat: 42.3314, lng: -83.0458 }

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate request body
    const parseResult = quoteSchema.safeParse(body)
    if (!parseResult.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parseResult.error.errors },
        { status: 400 }
      )
    }

    const { packageId, addonIds, address, eventDate, isGlowNight } = parseResult.data

    // Validate address
    const addressValidation = validateAddress(address)
    if (!addressValidation.isValid) {
      return NextResponse.json(
        { error: 'Invalid address', details: addressValidation.errors },
        { status: 400 }
      )
    }

    // Get package from database
    const packageData = await prisma.package.findUnique({
      where: { id: packageId, isActive: true }
    })

    if (!packageData) {
      return NextResponse.json({ error: 'Package not found' }, { status: 404 })
    }

    // Get add-ons from database
    const addons = await prisma.addon.findMany({
      where: { id: { in: addonIds }, isActive: true }
    })

    // Check if all requested add-ons were found
    if (addons.length !== addonIds.length) {
      const foundIds = addons.map(a => a.id)
      const missingIds = addonIds.filter(id => !foundIds.includes(id))
      return NextResponse.json(
        { error: 'Add-on not found', missingIds },
        { status: 404 }
      )
    }

    // Geocode address to get coordinates
    const geocodeResult = await geocodeAddress(address)
    if (!geocodeResult.success || !geocodeResult.location) {
      return NextResponse.json(
        { error: 'Failed to geocode address' },
        { status: 400 }
      )
    }

    // Calculate distance and check service area
    const distance = calculateDistance(BUSINESS_LOCATION, geocodeResult.location)
    const serviceAreaCheck = isWithinServiceArea(BUSINESS_LOCATION, geocodeResult.location)
    
    if (!serviceAreaCheck.withinArea) {
      return NextResponse.json(
        { error: `Address is outside service area (${distance.toFixed(1)} miles away, maximum 50 miles)` },
        { status: 400 }
      )
    }

    // Calculate pricing
    const pricingInput = {
      package: {
        id: packageData.id,
        name: packageData.name,
        basePrice: packageData.basePrice,
        durationMin: packageData.durationMin,
        maxGuests: packageData.maxGuests
      },
      addons: addons.map(addon => ({
        id: addon.id,
        name: addon.name,
        price: addon.price
      })),
      distanceMiles: distance,
      isGlowNight
    }

    const pricing = calculatePricing(pricingInput)

    return NextResponse.json({
      ...pricing,
      distance: distance,
      serviceArea: serviceAreaCheck.withinArea,
      address: geocodeResult.location
    })

  } catch (error) {
    console.error('Quote API error:', error)
    
    if (error instanceof SyntaxError) {
      return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
    }
    
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
