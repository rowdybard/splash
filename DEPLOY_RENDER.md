# 🚀 Render Deployment Guide

Complete guide for deploying Splashtastic to Render.com with managed PostgreSQL.

## 📋 Prerequisites

- Render account (render.com)
- GitHub repository with your code
- Environment variables ready
- Stripe account for webhook setup

## 🗄️ Database Setup

### 1. Create PostgreSQL Database

1. Go to Render Dashboard → "New" → "PostgreSQL"
2. Configure database:
   - **Name**: `splashtastic-db`
   - **Region**: `Oregon` (or closest to users)
   - **Plan**: `Starter` ($7/month)
3. Click "Create Database"
4. Wait for database to be ready (2-3 minutes)
5. Copy the **External Database URL** for environment variables

## 🌐 Web Service Setup

### 1. Create Web Service

1. Go to Render Dashboard → "New" → "Web Service"
2. Connect your GitHub repository
3. Configure service:
   - **Name**: `splashtastic-web`
   - **Region**: `Oregon` (same as database)
   - **Branch**: `main`
   - **Runtime**: `Node`
   - **Build Command**: `npm install --frozen-lockfile && npx prisma generate && npm run build`
   - **Start Command**: `npm start`

### 2. Environment Variables

Add these environment variables in the Render dashboard:

#### Required Variables
```bash
# Database (auto-filled from database connection)
DATABASE_URL=postgresql://...

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://your-app-name.onrender.com
TIMEZONE=America/Detroit

# Stripe (get from Stripe dashboard)
STRIPE_SECRET_KEY=sk_live_... # or sk_test_... for testing
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_... # or pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_... # Set up after deployment

# Email (get from Resend)
RESEND_API_KEY=re_...

# Maps (get from Google Cloud Console)
GOOGLE_MAPS_API_KEY=AIza...

# Admin Access
ADMIN_PASSCODE=your-secure-password

# Optional: SMS (get from Twilio)
TWILIO_ACCOUNT_SID=AC...
TWILIO_AUTH_TOKEN=...
TWILIO_MESSAGING_SERVICE_SID=MG...
```

#### Connecting Database
1. In Environment Variables section, add:
   - **Key**: `DATABASE_URL`
   - **Value**: Select "From Database" → Choose your `splashtastic-db`

### 3. Deploy

1. Click "Create Web Service"
2. Render will automatically deploy from your `render.yaml` file
3. Wait for deployment (5-10 minutes for first deploy)
4. Check deployment logs for any errors

## 🔗 Stripe Webhook Setup

### 1. Create Webhook Endpoint

1. Go to Stripe Dashboard → "Developers" → "Webhooks"
2. Click "Add endpoint"
3. Configure webhook:
   - **Endpoint URL**: `https://your-app-name.onrender.com/api/webhooks/stripe`
   - **Events to send**: 
     - `payment_intent.succeeded`
     - `payment_intent.payment_failed`
4. Click "Add endpoint"

### 2. Configure Webhook Secret

1. Copy the **Signing secret** from the webhook details
2. Go back to Render → Your web service → Environment
3. Add environment variable:
   - **Key**: `STRIPE_WEBHOOK_SECRET`
   - **Value**: `whsec_...` (the signing secret)
4. Deploy the updated service

### 3. Test Webhooks

```bash
# Use Stripe CLI to test webhooks locally first
stripe listen --forward-to localhost:3000/api/webhooks/stripe

# Create test payment to verify webhook
stripe payment_intents create --amount=2000 --currency=usd --automatic-payment-methods[enabled]=true
```

## 🌍 Custom Domain Setup

### 1. Add Domain in Render

1. Go to your web service → "Settings" → "Custom Domains"
2. Click "Add Custom Domain"
3. Enter your domain: `splashtastic.com`
4. Render will provide DNS records

### 2. Configure DNS (See DOMAIN_SETUP_GODADDY.md)

Follow the domain setup guide for detailed DNS configuration.

### 3. Update Environment Variables

Once domain is active:
```bash
NEXT_PUBLIC_SITE_URL=https://splashtastic.com
```

## 📊 Database Migration & Seeding

### Automatic (via render.yaml)

The `postDeployCommand` automatically runs:
```bash
npx prisma migrate deploy && npx prisma db seed
```

### Manual (if needed)

Connect to your database via Render dashboard and run:
```sql
-- Check if tables exist
\dt

-- Check seed data
SELECT * FROM packages;
SELECT * FROM addons;
```

## 🔍 Monitoring & Logs

### Application Logs
1. Go to your web service → "Logs"
2. Monitor for errors during startup and requests
3. Look for successful Prisma connections

### Database Monitoring
1. Go to your database → "Metrics"
2. Monitor connections, query performance
3. Set up alerts for high usage

### Key Metrics to Watch
- **Response time**: Should be < 500ms for most requests
- **Error rate**: Should be < 1%
- **Database connections**: Should stay under limit
- **Memory usage**: Monitor for memory leaks

## 🚨 Troubleshooting

### Common Deployment Issues

#### 1. Build Failures
```bash
# Check these in logs:
Error: Cannot find module '@prisma/client'
# Solution: Ensure prisma generate runs in build command

Error: Environment variable not found: DATABASE_URL
# Solution: Check environment variables are set correctly
```

#### 2. Database Connection Issues
```bash
# Check database URL format:
DATABASE_URL=postgresql://user:password@host:port/database?sslmode=require

# Test connection:
npx prisma db push
```

#### 3. Stripe Webhook Issues
```bash
# Check webhook signature verification:
curl -X POST https://your-app.onrender.com/api/webhooks/stripe \
  -H "stripe-signature: invalid" \
  -d '{"type": "test"}'

# Should return 400 Bad Request
```

### Performance Optimization

#### 1. Database Performance
```sql
-- Add indexes for common queries
CREATE INDEX idx_events_date ON events(date);
CREATE INDEX idx_bookings_status ON bookings(stripe_payment_status);
```

#### 2. Enable Database Connection Pooling
In your DATABASE_URL, add:
```
?connection_limit=5&pool_timeout=20
```

#### 3. Monitor Memory Usage
- Enable "Auto-Deploy" for critical fixes
- Set up health checks
- Monitor error rates

## 🔄 Deployment Pipeline

### Automatic Deployments
Render automatically deploys when you push to the main branch:

```bash
git add .
git commit -m "feat: add new feature"
git push origin main
# Render will automatically deploy
```

### Manual Deployments
1. Go to your web service → "Manual Deploy"
2. Click "Deploy latest commit"
3. Monitor logs for deployment progress

### Rollback Strategy
1. Go to "Deploys" tab
2. Find the last working deployment
3. Click "Redeploy" on that version

## 📈 Scaling

### Vertical Scaling
Upgrade service plan in Render dashboard:
- **Starter**: $7/month - Good for testing
- **Standard**: $25/month - Production ready
- **Pro**: $85/month - High traffic

### Database Scaling
- **Starter**: 256MB RAM, 1GB storage
- **Standard**: 1GB RAM, 10GB storage
- **Pro**: 4GB RAM, 100GB storage

### Monitoring Growth
Set up alerts for:
- High CPU usage (>80%)
- High memory usage (>80%)
- Database connection limits
- Response time degradation

## ✅ Post-Deployment Checklist

- [ ] Application loads successfully
- [ ] Database connection working
- [ ] Stripe payments processing
- [ ] Webhooks receiving events
- [ ] Email notifications sending
- [ ] Admin panel accessible
- [ ] All API endpoints responding
- [ ] SSL certificate active
- [ ] Custom domain working
- [ ] Monitoring set up

## 📞 Support

### Render Support
- Documentation: render.com/docs
- Community: community.render.com
- Support tickets via dashboard

### Application Issues
- Check application logs first
- Verify environment variables
- Test locally with same data
- Review database queries

---

**Your Splashtastic application should now be live and processing bookings! 🎉**
