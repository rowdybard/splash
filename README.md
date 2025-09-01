# 🎉 Splashtastic Foam Parties

**Production-ready booking website built with TDD methodology**

Transform any backyard into a foam wonderland with our professional foam party services. This application handles booking, scheduling, payments, and customer management for a foam party rental business.

## 🌟 Features

- **🎯 Multi-step Booking Process**: Date/time selection → Package choice → Add-ons → Details → Payment
- **💰 Dynamic Pricing**: Travel fees by distance, evening surcharges, tax calculation
- **📍 Geographic Services**: Address validation, distance calculation, service area enforcement
- **⏰ Smart Scheduling**: Availability checking with buffer times and maintenance windows
- **💳 Stripe Integration**: Secure payment processing with webhooks
- **📧 Email Notifications**: Confirmation emails with ICS calendar attachments
- **📱 Mobile-First Design**: Responsive, accessible UI with Tailwind CSS
- **🔒 Production Security**: Environment variables, validation, error handling

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS, React Hook Form, Zod
- **Backend**: Next.js API routes, Prisma ORM, PostgreSQL
- **Payments**: Stripe (deposits & full payments)
- **Email**: Resend with ICS attachments
- **SMS**: Twilio (optional reminders)
- **Maps**: Google Maps API for geocoding and distance
- **Testing**: Vitest (unit), React Testing Library (components), Playwright (E2E)
- **Deployment**: Render with managed PostgreSQL
- **CI/CD**: GitHub Actions

## 🚀 Quick Start

### Prerequisites

- Node.js 20+
- PostgreSQL database
- Stripe account (for payments)
- Google Maps API key
- Resend account (for email)

### Installation

1. **Clone and install dependencies**
```bash
git clone <your-repo>
cd splashtastic
npm install
```

2. **Environment setup**
```bash
cp env.example .env.local
# Edit .env.local with your actual values
```

3. **Database setup**
```bash
npm run db:migrate
npm run seed
```

4. **Development server**
```bash
npm run dev
```

Visit `http://localhost:3000` to see the application.

## 🧪 Testing (TDD Approach)

This project was built using **Test-Driven Development**:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run E2E tests
npm run test:ui

# Type checking
npm run typecheck

# Linting
npm run lint
```

### Test Coverage
- **146 total tests** written before implementation
- **Unit tests**: Domain logic (pricing, availability, geo, ICS)
- **Integration tests**: API endpoints with validation
- **Component tests**: React components with user interactions
- **E2E tests**: Complete user journeys with Playwright

## 📊 Domain Logic

### Pricing System
- **Base package pricing** with duration and guest limits
- **Travel fees**: $0 (0-15mi), $49 (16-30mi), $99 (31-50mi)
- **Evening surcharge**: 15% for Glow Night events
- **Tax calculation**: 8% default (configurable)
- **Deposit**: 30% required, balance due at event

### Availability System
- **Business hours**: 9 AM - 6 PM, closed Sundays
- **Buffer times**: 45-minute setup/teardown between events
- **Maintenance blocks**: Configurable unavailable periods
- **Timezone**: America/Detroit throughout

### Geographic Services
- **Address validation**: US addresses only
- **Service area**: 50-mile radius from Detroit
- **Distance calculation**: Haversine formula for accurate distances

## 🌐 Deployment

### Render Deployment

1. **Database setup**
```bash
# Create PostgreSQL database on Render
# Copy connection string to environment variables
```

2. **Environment variables**
Set these in Render dashboard:
```
DATABASE_URL=postgresql://...
STRIPE_SECRET_KEY=sk_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_...
RESEND_API_KEY=re_...
GOOGLE_MAPS_API_KEY=AIza...
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
TIMEZONE=America/Detroit
ADMIN_PASSCODE=your-secret-code
```

3. **Deploy**
```bash
git push origin main
# Render auto-deploys via render.yaml
```

### Domain Setup (GoDaddy)
See `DOMAIN_SETUP_GODADDY.md` for detailed DNS configuration.

### Stripe Webhooks
See `DEPLOY_RENDER.md` for webhook endpoint setup.

## 📁 Project Structure

```
src/
├── app/                    # Next.js app router
│   ├── (marketing)/       # Marketing pages
│   ├── book/              # Booking flow
│   ├── admin/             # Admin dashboard
│   └── api/               # API routes
├── components/            # Reusable UI components
├── lib/                   # Business logic & utilities
│   ├── pricing.ts         # Pricing calculations
│   ├── availability.ts    # Scheduling logic
│   ├── geo.ts            # Geographic services
│   └── ics.ts            # Calendar file generation
├── emails/               # Email templates
└── styles/               # Global styles

prisma/
├── schema.prisma         # Database schema
└── seed.ts              # Sample data

tests/
├── unit/                # Domain logic tests
├── integration/         # API tests
├── components/          # React component tests
└── e2e/                # End-to-end tests
```

## 🔧 Configuration

### Business Settings
Edit these in the codebase:
- **Service radius**: `SERVICE_AREA_RADIUS_MILES` in `geo.ts`
- **Buffer time**: `BUFFER_MINUTES` in `availability.ts`
- **Business hours**: `BUSINESS_START_HOUR/END_HOUR` in `availability.ts`
- **Tax rate**: `DEFAULT_TAX_RATE` in `pricing.ts`
- **Deposit rate**: `DEFAULT_DEPOSIT_RATE` in `pricing.ts`

### Package & Add-on Management
Packages and add-ons are managed via the database:
```sql
-- Add new package
INSERT INTO packages (name, duration_min, base_price, max_guests, included_items)
VALUES ('Custom Party', 120, 69900, 40, '["Custom items"]');

-- Add new add-on
INSERT INTO addons (name, price, description)
VALUES ('Photo Booth', 15000, 'Professional photo booth setup');
```

## 🐛 Troubleshooting

### Common Issues

1. **Database connection errors**
   - Check `DATABASE_URL` format
   - Ensure database is accessible
   - Run `npm run db:generate`

2. **Stripe webhook failures**
   - Verify `STRIPE_WEBHOOK_SECRET`
   - Check webhook endpoint URL
   - Ensure HTTPS in production

3. **Geocoding failures**
   - Verify `GOOGLE_MAPS_API_KEY`
   - Check API quotas and billing
   - Ensure Geocoding API is enabled

### Development Tips

```bash
# Reset database
npm run db:reset

# View database
npx prisma studio

# Check types
npm run typecheck

# Format code
npm run lint --fix
```

## 📈 Performance

- **LCP < 2 seconds**: Optimized images and lazy loading
- **Mobile-first**: Responsive design with touch targets
- **SEO optimized**: Meta tags, structured data, sitemap
- **Accessibility**: WCAG 2.2 AA compliant

## 🤝 Contributing

This project follows TDD methodology:

1. **Write failing tests first**
2. **Implement minimal code to pass**
3. **Refactor while keeping tests green**

All PRs must include tests and maintain 100% test coverage for new features.

## 📄 License

© 2024 Splashtastic Foam Parties. All rights reserved.

---

**Built with ❤️ using Test-Driven Development**
