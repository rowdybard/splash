export type PricingInput = {
  package: {
    id: string
    name: string
    basePrice: number // in cents
    durationMin: number
    maxGuests: number
  }
  addons: Array<{
    id: string
    name: string
    price: number // in cents
  }>
  distanceMiles: number
  isGlowNight: boolean
}

export type PricingResult = {
  packagePrice: number
  addonsPrice: number
  subtotal: number
  eveningSurcharge: number
  travelFee: number
  tax: number
  total: number
  depositAmount: number
  balanceAmount: number
  lineItems: Array<{
    name: string
    price: number
    type: 'package' | 'addon' | 'surcharge' | 'travel' | 'tax'
  }>
}

const TRAVEL_FEE_TIERS = [
  { minDistance: 0, maxDistance: 15, fee: 0 },
  { minDistance: 16, maxDistance: 30, fee: 4900 }, // $49.00
  { minDistance: 31, maxDistance: 50, fee: 9900 }, // $99.00
]

const DEFAULT_TAX_RATE = 0.08 // 8%
const DEFAULT_DEPOSIT_RATE = 0.3 // 30%
const EVENING_SURCHARGE_RATE = 0.15 // 15% for Glow Night events

export function calculatePricing(input: PricingInput): PricingResult {
  const { package: pkg, addons, distanceMiles, isGlowNight } = input

  // Calculate base pricing
  const packagePrice = pkg.basePrice
  const addonsPrice = addons.reduce((sum, addon) => sum + addon.price, 0)
  
  // Calculate evening surcharge (only for Glow Night packages)
  const eveningSurcharge = isGlowNight && pkg.name.includes('Glow Night')
    ? Math.round(packagePrice * EVENING_SURCHARGE_RATE)
    : 0

  const subtotal = packagePrice + addonsPrice + eveningSurcharge

  // Calculate travel fee
  const travelFee = calculateTravelFee(distanceMiles)

  // Calculate tax on subtotal + travel fee
  const tax = calculateTax(subtotal + travelFee)

  // Calculate total
  const total = subtotal + travelFee + tax

  // Calculate deposit and balance
  const depositAmount = calculateDeposit(total)
  const balanceAmount = total - depositAmount

  // Build line items
  const lineItems = [
    {
      name: pkg.name,
      price: packagePrice,
      type: 'package' as const
    },
    ...addons.map(addon => ({
      name: addon.name,
      price: addon.price,
      type: 'addon' as const
    })),
    ...(eveningSurcharge > 0 ? [{
      name: 'Evening Surcharge',
      price: eveningSurcharge,
      type: 'surcharge' as const
    }] : []),
    ...(travelFee > 0 ? [{
      name: 'Travel Fee',
      price: travelFee,
      type: 'travel' as const
    }] : []),
    {
      name: 'Tax',
      price: tax,
      type: 'tax' as const
    }
  ]

  return {
    packagePrice,
    addonsPrice,
    subtotal,
    eveningSurcharge,
    travelFee,
    tax,
    total,
    depositAmount,
    balanceAmount,
    lineItems
  }
}

export function calculateTravelFee(distanceMiles: number): number {
  if (distanceMiles > 50) {
    throw new Error('Distance beyond service area (maximum 50 miles)')
  }

  const tier = TRAVEL_FEE_TIERS.find(
    tier => distanceMiles >= tier.minDistance && distanceMiles <= tier.maxDistance
  )

  return tier?.fee ?? 0
}

export function calculateTax(subtotal: number, taxRate: number = DEFAULT_TAX_RATE): number {
  return Math.round(subtotal * taxRate)
}

export function calculateDeposit(total: number, depositRate: number = DEFAULT_DEPOSIT_RATE): number {
  return Math.ceil(total * depositRate) // Round up to ensure we don't under-collect
}
