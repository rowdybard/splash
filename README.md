# Splashtastic Foam Parties - Booking Website

A production-ready, test-driven booking website for Splashtastic Foam Parties, built with Next.js 14, TypeScript, and modern web technologies.

## 🎯 Project Overview

Splashtastic Foam Parties is a professional foam party entertainment company serving the Detroit metropolitan area. This website provides a complete booking system for customers to schedule foam parties, manage their events, and access all necessary information about our services.

## ✨ Features

- **Multi-step Booking Process**: Intuitive stepper interface for easy party planning
- **Real-time Availability**: Check available dates and times instantly
- **Package Management**: Choose from various foam party packages and add-ons
- **Payment Integration**: Secure Stripe checkout with deposit and full payment options
- **Email Notifications**: Automated confirmation emails with ICS calendar attachments
- **Admin Dashboard**: Manage bookings, view analytics, and handle customer requests
- **Mobile-First Design**: Responsive design optimized for all devices
- **Accessibility**: WCAG 2.2 AA compliant for inclusive user experience

## 🏗️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Modern component library
- **React Hook Form** - Form management with validation
- **Zod** - Schema validation

### Backend & Database
- **Prisma** - Type-safe database ORM
- **PostgreSQL** - Primary database (Render managed)
- **Next.js API Routes** - Serverless API endpoints

### External Services
- **Stripe** - Payment processing and webhooks
- **Resend** - Email delivery service
- **Twilio** - SMS notifications (optional)
- **Google Maps API** - Distance calculation and geolocation

### Testing & Quality
- **Vitest** - Unit and integration testing
- **React Testing Library** - Component testing
- **Playwright** - End-to-end testing
- **GitHub Actions** - Continuous integration

### Deployment
- **Render** - Hosting and deployment platform
- **GoDaddy** - Domain management

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- PostgreSQL database (local or cloud)
- Stripe account
- Resend account

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd splash
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in your environment variables:
   ```env
   # Database
   DATABASE_URL="postgresql://user:password@localhost:5432/splashtastic"
   
   # Stripe
   STRIPE_SECRET_KEY="sk_test_..."
   STRIPE_WEBHOOK_SECRET="whsec_..."
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
   
   # Email
   RESEND_API_KEY="re_..."
   
   # Other services
   GOOGLE_MAPS_API_KEY="AIza..."
   TWILIO_ACCOUNT_SID="AC..."
   TWILIO_AUTH_TOKEN="..."
   ```

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   npx prisma db seed
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🧪 Testing

### Run all tests
```bash
npm test
```

### Run specific test suites
```bash
# Unit tests
npm test -- src/lib/__tests__/

# API tests
npm test -- src/app/api/__tests__/

# Component tests
npm test -- src/components/__tests__/

# E2E tests
npm run test:e2e
```

### Test coverage
```bash
npm run test:coverage
```

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API endpoints
│   ├── book/              # Booking page
│   ├── admin/             # Admin dashboard
│   └── ...                # Other pages
├── components/             # React components
│   ├── ui/                # shadcn/ui components
│   └── BookingStepper.tsx # Main booking component
├── lib/                    # Utility functions
│   ├── __tests__/         # Unit tests
│   ├── pricing.ts         # Pricing calculations
│   ├── availability.ts    # Availability logic
│   ├── geo.ts            # Geolocation services
│   ├── ics.ts            # Calendar generation
│   └── email.ts          # Email services
├── test/                   # Test setup and utilities
└── prisma/                 # Database schema and migrations
```

## 📱 Pages & Routes

- **`/`** - Home page with hero section and package overview
- **`/book`** - Multi-step booking process
- **`/packages`** - Detailed package information and pricing
- **`/add-ons`** - Available add-ons and enhancements
- **`/faq`** - Frequently asked questions
- **`/service-area`** - Coverage area and travel information
- **`/about`** - Company information and team
- **`/policies`** - Booking policies and terms
- **`/contact`** - Contact form and information
- **`/admin`** - Admin dashboard (protected)
- **`/success`** - Payment success page
- **`/cancel`** - Payment cancellation page

## 🔌 API Endpoints

- **`/api/quote`** - Generate pricing quotes
- **`/api/availability`** - Check date/time availability
- **`/api/checkout`** - Create Stripe checkout sessions
- **`/api/webhooks/stripe`** - Handle Stripe webhooks
- **`/api/ics/[bookingId]`** - Generate calendar files

## 💳 Payment Flow

1. **Quote Generation**: Customer selects package and add-ons
2. **Availability Check**: Verify requested date/time is available
3. **Checkout**: Create Stripe checkout session
4. **Payment Processing**: Handle deposit or full payment
5. **Confirmation**: Send email with ICS attachment
6. **Webhook Processing**: Update booking status and send notifications

## 🎨 Design System

### Color Palette
- **Primary**: Blue (#2563eb) - Trust and professionalism
- **Secondary**: Green (#16a34a) - Fun and excitement
- **Accent**: Purple (#9333ea) - Creativity and playfulness
- **Neutral**: Gray scale for text and backgrounds

### Typography
- **Headings**: Inter font family for modern, clean look
- **Body**: System fonts for optimal readability
- **Sizes**: Responsive typography scale from mobile to desktop

### Components
- **Buttons**: Multiple variants (primary, secondary, outline, ghost)
- **Cards**: Consistent spacing and shadow system
- **Forms**: Accessible form controls with validation
- **Navigation**: Mobile-first navigation with smooth transitions

## 🔒 Security Features

- **Input Validation**: Zod schemas for all user inputs
- **SQL Injection Protection**: Prisma ORM with parameterized queries
- **XSS Prevention**: Proper content sanitization
- **CSRF Protection**: Built-in Next.js security features
- **Environment Variables**: Secure configuration management
- **HTTPS Enforcement**: Secure connections in production

## 📊 Performance

### Core Web Vitals Targets
- **LCP**: < 2.5 seconds
- **FID**: < 100 milliseconds
- **CLS**: < 0.1

### Optimization Strategies
- **Static Generation**: Pre-render static pages
- **Image Optimization**: Next.js Image component
- **Code Splitting**: Automatic route-based splitting
- **Bundle Analysis**: Regular bundle size monitoring
- **Caching**: Strategic caching strategies

## 🌐 Deployment

### Render Deployment
1. Connect your GitHub repository
2. Configure environment variables
3. Set build command: `npm run build`
4. Set start command: `npm start`
5. Deploy automatically on push to main branch

### Environment Setup
- Production database connection
- Stripe live keys
- Email service configuration
- Domain and SSL setup

## 📈 Monitoring & Analytics

- **Error Tracking**: Monitor application errors
- **Performance Monitoring**: Track Core Web Vitals
- **User Analytics**: Understand user behavior
- **Business Metrics**: Track conversions and bookings

## 🤝 Contributing

### Development Workflow
1. Create feature branch from `main`
2. Write tests first (TDD approach)
3. Implement feature with tests
4. Ensure all tests pass
5. Submit pull request

### Code Standards
- **TypeScript**: Strict type checking enabled
- **ESLint**: Consistent code style
- **Prettier**: Automatic code formatting
- **Conventional Commits**: Standardized commit messages

## 📚 Documentation

- **API Documentation**: OpenAPI/Swagger specs
- **Component Library**: Storybook documentation
- **User Guides**: Customer and admin documentation
- **Deployment Guide**: Step-by-step deployment instructions

## 🐛 Troubleshooting

### Common Issues

**Database Connection Errors**
- Verify DATABASE_URL format
- Check database server status
- Ensure proper network access

**Stripe Integration Issues**
- Verify API keys are correct
- Check webhook endpoint configuration
- Monitor Stripe dashboard for errors

**Email Delivery Problems**
- Verify Resend API key
- Check email template syntax
- Monitor email delivery logs

### Debug Mode
Enable debug logging:
```bash
DEBUG=* npm run dev
```

## 📞 Support

- **Technical Issues**: Check GitHub issues
- **Business Questions**: Contact Splashtastic team
- **Emergency**: Use admin dashboard contact form

## 📄 License

This project is proprietary software owned by Splashtastic Foam Parties. All rights reserved.

## 🙏 Acknowledgments

- **Next.js Team** - Amazing React framework
- **Vercel** - Deployment and hosting platform
- **Stripe** - Payment processing infrastructure
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Beautiful component library

---

**Built with ❤️ by the Splashtastic development team**

*Making memories one bubble at a time! 🫧*
