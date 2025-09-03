import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Clear existing data in reverse dependency order
  await prisma.booking.deleteMany()
  await prisma.event.deleteMany()
  await prisma.customer.deleteMany()
  await prisma.package.deleteMany()
  await prisma.addon.deleteMany()
  await prisma.block.deleteMany()

  // Seed packages
  const starterPackage = await prisma.package.create({
    data: {
      name: 'Starter Party',
      durationMin: 60,
      basePrice: 29900, // $299.00
      maxGuests: 15,
      includedItems: [
        'Professional foam machine',
        'Biodegradable foam solution',
        'Setup and breakdown',
        'Basic safety briefing'
      ]
    }
  })

  const megaPackage = await prisma.package.create({
    data: {
      name: 'Mega Splash',
      durationMin: 90,
      basePrice: 44900, // $449.00
      maxGuests: 25,
      includedItems: [
        'Professional foam machine',
        'Biodegradable foam solution',
        'Setup and breakdown',
        'Safety briefing and supervision',
        'Fun props and games',
        'Photo opportunities'
      ]
    }
  })

  const glowPackage = await prisma.package.create({
    data: {
      name: 'Glow Night Spectacular',
      durationMin: 90,
      basePrice: 59900, // $599.00
      maxGuests: 30,
      includedItems: [
        'Professional foam machine',
        'Glow-in-the-dark foam solution',
        'UV lighting setup',
        'Setup and breakdown',
        'Evening safety supervision',
        'Glow accessories',
        'Music coordination'
      ]
    }
  })

  // Seed add-ons
  await prisma.addon.createMany({
    data: [
      {
        name: 'Extra 30 Minutes',
        price: 9900, // $99.00
        description: 'Extend your foam party fun for an additional 30 minutes'
      },
      {
        name: 'Neon Foam Upgrade',
        price: 7500, // $75.00
        description: 'Upgrade to our vibrant neon-colored foam (safe, biodegradable)',
        requiresEvening: false
      },
      {
        name: 'Premium Sound System',
        price: 12500, // $125.00
        description: 'Professional Bluetooth speaker system with microphone',
        inventoryCount: 3
      },
      {
        name: 'Portable Generator',
        price: 8500, // $85.00
        description: 'On-site power generation for locations without outlets',
        inventoryCount: 2
      },
      {
        name: 'Slip-n-Slide Combo',
        price: 15000, // $150.00
        description: '25ft slip-n-slide with foam integration',
        inventoryCount: 1
      }
    ]
  })

  // Seed some maintenance blocks
  const now = new Date()
  await prisma.block.createMany({
    data: [
      {
        startAt: new Date(now.getFullYear(), 11, 25, 0, 0), // Christmas Day
        endAt: new Date(now.getFullYear(), 11, 25, 23, 59),
        reason: 'Holiday - Christmas Day'
      },
      {
        startAt: new Date(now.getFullYear() + 1, 0, 1, 0, 0), // New Year's Day
        endAt: new Date(now.getFullYear() + 1, 0, 1, 23, 59),
        reason: 'Holiday - New Year\'s Day'
      }
    ]
  })

  // Seed test customer and event for development
  if (process.env.NODE_ENV === 'development') {
    const testCustomer = await prisma.customer.create({
      data: {
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '555-123-4567',
        marketingOptIn: true
      }
    })

    const testEvent = await prisma.event.create({
      data: {
        customerId: testCustomer.id,
        date: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        startAt: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000),
        endAt: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000 + 60 * 60 * 1000), // +1 hour
        street: '123 Test Street',
        city: 'Lansing',
        state: 'MI',
        zip: '48201',
        lat: 42.3314,
        lng: -83.0458,
        eventType: 'Birthday Party',
        surface: 'Grass',
        notes: 'Test event for development',
        status: 'PENDING'
      }
    })

    await prisma.booking.create({
      data: {
        eventId: testEvent.id,
        packageId: starterPackage.id,
        addons: [],
        subtotal: 29900,
        travelFee: 0,
        tax: 2392, // 8% tax
        depositAmount: 8987, // 30% deposit
        stripePaymentStatus: 'PENDING'
      }
    })
  }

  console.log('✅ Database seeded successfully!')
  console.log(`📦 Created ${await prisma.package.count()} packages`)
  console.log(`🔧 Created ${await prisma.addon.count()} add-ons`)
  console.log(`🚫 Created ${await prisma.block.count()} blocked time periods`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
