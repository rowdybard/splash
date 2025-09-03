# Deploying Splashtastic Foam Parties to Render

This guide walks you through deploying the Splashtastic booking website to Render, including database setup, environment configuration, and domain setup.

## 🚀 Prerequisites

Before starting deployment, ensure you have:

- [ ] GitHub repository with your code
- [ ] Render account (free tier available)
- [ ] Stripe account for payments
- [ ] Resend account for emails
- [ ] Google Maps API key
- [ ] GoDaddy domain (or other domain provider)

## 📊 Step 1: Database Setup

### 1.1 Create PostgreSQL Database

1. **Log into Render Dashboard**
   - Go to [dashboard.render.com](https://dashboard.render.com)
   - Sign in or create account

2. **Create New Database**
   - Click "New +" button
   - Select "PostgreSQL"
   - Choose "Free" plan (or paid for production)

3. **Configure Database**
   ```
   Name: splashtastic-db
   Database: splashtastic
   User: splashtastic_user
   Region: Choose closest to your users
   ```

4. **Save Connection Details**
   - Note down the connection string
   - Format: `postgresql://user:password@host:port/database`

### 1.2 Database Migration

1. **Connect to Database**
   ```bash
   # Install psql client if needed
   # macOS: brew install postgresql
   # Windows: Download from postgresql.org
   
   psql "postgresql://user:password@host:port/database"
   ```

2. **Run Prisma Migrations**
   ```bash
   # In your local project
   npx prisma db push
   npx prisma db seed
   ```

## 🌐 Step 2: Web Service Setup

### 2.1 Create Web Service

1. **New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the repository

2. **Configure Service**
   ```
   Name: splashtastic-website
   Region: Same as database
   Branch: main
   Root Directory: ./
   Runtime: Node
   Build Command: npm run build
   Start Command: npm start
   ```

### 2.2 Environment Variables

Set these environment variables in Render:

```env
# Database
DATABASE_URL=postgresql://user:password@host:port/database

# Stripe (Production Keys)
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...

# Email
RESEND_API_KEY=re_...

# Maps & Location
GOOGLE_MAPS_API_KEY=AIza...
TIMEZONE=America/Detroit

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
NODE_ENV=production

# Admin Access
ADMIN_PASSCODE=your-secure-passcode

# Optional Services
TWILIO_ACCOUNT_SID=AC...
TWILIO_AUTH_TOKEN=...
```

### 2.3 Advanced Settings

1. **Auto-Deploy**
   - Enable "Auto-Deploy from main branch"
   - This deploys automatically on every push

2. **Health Check Path**
   - Set to `/api/health` (create this endpoint)

3. **Environment**
   - Set to `production`

## 🔗 Step 3: Stripe Webhook Configuration

### 3.1 Create Webhook Endpoint

1. **Stripe Dashboard**
   - Go to [dashboard.stripe.com](https://dashboard.stripe.com)
   - Navigate to "Developers" → "Webhooks"

2. **Add Endpoint**
   ```
   Endpoint URL: https://yourdomain.com/api/webhooks/stripe
   Events to send:
   - checkout.session.completed
   - payment_intent.succeeded
   - payment_intent.payment_failed
   - invoice.payment_succeeded
   - invoice.payment_failed
   ```

3. **Get Webhook Secret**
   - Copy the webhook signing secret
   - Add to `STRIPE_WEBHOOK_SECRET` in Render

### 3.2 Test Webhooks

1. **Use Stripe CLI**
   ```bash
   # Install Stripe CLI
   # macOS: brew install stripe/stripe-cli/stripe
   # Windows: Download from github.com/stripe/stripe-cli
   
   # Login
   stripe login
   
   # Forward webhooks to local development
   stripe listen --forward-to localhost:3000/api/webhooks/stripe
   ```

2. **Test Events**
   - Create test payments in Stripe dashboard
   - Verify webhook delivery in logs

## 📧 Step 4: Email Service Setup

### 4.1 Resend Configuration

1. **Resend Dashboard**
   - Go to [resend.com](https://resend.com)
   - Create account and verify email

2. **API Key**
   - Generate new API key
   - Add to `RESEND_API_KEY` in Render

3. **Domain Verification**
   - Add your domain to Resend
   - Configure DNS records as instructed
   - Verify domain ownership

### 4.2 Email Templates

1. **Template Structure**
   ```
   src/lib/email.ts - Email service functions
   src/lib/email-templates/ - HTML email templates
   ```

2. **Test Emails**
   - Send test emails during development
   - Verify delivery and formatting

## 🗺️ Step 5: Google Maps Setup

### 5.1 API Key Configuration

1. **Google Cloud Console**
   - Go to [console.cloud.google.com](https://console.cloud.google.com)
   - Create new project or select existing

2. **Enable APIs**
   - Geocoding API
   - Distance Matrix API
   - Maps JavaScript API

3. **Create API Key**
   - Generate new API key
   - Restrict to your domain
   - Add to `GOOGLE_MAPS_API_KEY` in Render

### 5.2 Billing Setup

1. **Enable Billing**
   - Required for API usage
   - Set up billing account
   - Set usage limits and alerts

## 🔒 Step 6: Security Configuration

### 6.1 Environment Variables

1. **Never Commit Secrets**
   - Ensure `.env` is in `.gitignore`
   - Use Render environment variables
   - Rotate keys regularly

2. **Production Keys**
   - Use live Stripe keys (not test)
   - Use production database
   - Enable HTTPS enforcement

### 6.2 Domain Security

1. **HTTPS Enforcement**
   - Render provides free SSL certificates
   - Enable "Force HTTPS" in settings
   - Set secure headers

2. **CORS Configuration**
   - Restrict to your domain
   - Configure allowed origins

## 🌍 Step 7: Domain Configuration

### 7.1 GoDaddy DNS Setup

1. **Log into GoDaddy**
   - Go to [godaddy.com](https://godaddy.com)
   - Access your domain management

2. **Add DNS Records**
   ```
   Type: CNAME
   Name: www
   Value: your-app-name.onrender.com
   TTL: 600
   
   Type: CNAME
   Name: @
   Value: your-app-name.onrender.com
   TTL: 600
   ```

3. **Verify Domain**
   - Wait for DNS propagation (up to 48 hours)
   - Verify in Render dashboard

### 7.2 Custom Domain in Render

1. **Add Custom Domain**
   - Go to your web service in Render
   - Click "Settings" → "Custom Domains"
   - Add your domain

2. **SSL Certificate**
   - Render automatically provisions SSL
   - Wait for certificate generation
   - Verify HTTPS works

## 📱 Step 8: Mobile & Performance

### 8.1 Performance Optimization

1. **Core Web Vitals**
   - Monitor LCP, FID, CLS
   - Use Render's built-in monitoring
   - Set up performance alerts

2. **Image Optimization**
   - Use Next.js Image component
   - Implement lazy loading
   - Optimize image formats

### 8.2 Mobile Testing

1. **Responsive Design**
   - Test on various devices
   - Verify touch interactions
   - Check mobile performance

## 🔍 Step 9: Monitoring & Analytics

### 9.1 Render Monitoring

1. **Built-in Metrics**
   - Response times
   - Error rates
   - Resource usage

2. **Logs**
   - Access application logs
   - Monitor errors and warnings
   - Set up log aggregation

### 9.2 External Monitoring

1. **Uptime Monitoring**
   - Set up uptime checks
   - Configure alerting
   - Monitor response times

2. **Error Tracking**
   - Implement error logging
   - Set up error notifications
   - Track user experience

## 🚨 Step 10: Testing & Validation

### 10.1 Pre-Launch Checklist

- [ ] Database migrations completed
- [ ] Environment variables set
- [ ] Stripe webhooks configured
- [ ] Email service working
- [ ] Domain DNS configured
- [ ] SSL certificate active
- [ ] All tests passing
- [ ] Performance benchmarks met

### 10.2 Post-Launch Validation

1. **Functionality Tests**
   - Complete booking flow
   - Payment processing
   - Email delivery
   - Admin dashboard access

2. **Performance Tests**
   - Load testing
   - Mobile performance
   - Core Web Vitals
   - Database performance

## 🆘 Troubleshooting

### Common Issues

1. **Build Failures**
   ```bash
   # Check build logs in Render
   # Verify all dependencies in package.json
   # Check for TypeScript errors
   ```

2. **Database Connection**
   ```bash
   # Verify DATABASE_URL format
   # Check database accessibility
   # Verify network security groups
   ```

3. **Environment Variables**
   ```bash
   # Check all required variables are set
   # Verify no typos in variable names
   # Restart service after changes
   ```

4. **Domain Issues**
   ```bash
   # Check DNS propagation
   # Verify CNAME records
   # Check SSL certificate status
   ```

### Getting Help

1. **Render Support**
   - Check Render documentation
   - Use community forums
   - Contact support if needed

2. **Application Logs**
   - Check Render logs
   - Monitor error rates
   - Debug specific issues

## 📈 Next Steps

### Post-Deployment

1. **Performance Monitoring**
   - Set up monitoring dashboards
   - Configure alerting
   - Track business metrics

2. **Backup Strategy**
   - Database backups
   - Code repository backups
   - Disaster recovery plan

3. **Scaling Considerations**
   - Monitor resource usage
   - Plan for traffic growth
   - Consider paid plans

### Maintenance

1. **Regular Updates**
   - Keep dependencies updated
   - Monitor security advisories
   - Update SSL certificates

2. **Backup Verification**
   - Test backup restoration
   - Verify data integrity
   - Document procedures

---

## 🎯 Quick Reference

### Essential Commands
```bash
# Local development
npm run dev
npm test
npm run build

# Database
npx prisma db push
npx prisma db seed
npx prisma studio

# Deployment
git push origin main  # Auto-deploys to Render
```

### Key URLs
- **Render Dashboard**: [dashboard.render.com](https://dashboard.render.com)
- **Stripe Dashboard**: [dashboard.stripe.com](https://dashboard.stripe.com)
- **Resend Dashboard**: [resend.com](https://resend.com)
- **Google Cloud**: [console.cloud.google.com](https://console.cloud.google.com)

### Support Contacts
- **Render Support**: [render.com/docs](https://render.com/docs)
- **Stripe Support**: [support.stripe.com](https://support.stripe.com)
- **Resend Support**: [resend.com/support](https://resend.com/support)

---

**Happy Deploying! 🚀**

*Your Splashtastic website will be live and ready to book foam parties in no time! 🫧*
