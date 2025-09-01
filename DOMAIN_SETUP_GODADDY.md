# 🌐 GoDaddy Domain Setup Guide

Complete guide for configuring your GoDaddy domain to work with Render hosting.

## 📋 Prerequisites

- Domain purchased from GoDaddy
- Render web service deployed and running
- Access to both GoDaddy and Render dashboards

## 🎯 Overview

We'll configure DNS to point your domain (`splashtastic.com`) to your Render service, enabling HTTPS and professional email addresses.

## 🔧 Step 1: Add Custom Domain in Render

### 1. Access Domain Settings
1. Go to Render Dashboard
2. Select your `splashtastic-web` service
3. Navigate to "Settings" → "Custom Domains"

### 2. Add Your Domain
1. Click "Add Custom Domain"
2. Enter your domain: `splashtastic.com`
3. Click "Add Domain"

### 3. Get DNS Records
Render will display the required DNS records:

**For Root Domain (splashtastic.com):**
- **Type**: A Record or ALIAS
- **Value**: Render's IP address (e.g., `216.24.57.1`)

**For WWW Subdomain (www.splashtastic.com):**
- **Type**: CNAME
- **Value**: Your Render URL (e.g., `splashtastic-web.onrender.com`)

> ⚠️ **Important**: Copy these exact values - you'll need them for GoDaddy setup.

## 🏠 Step 2: Configure DNS in GoDaddy

### 1. Access DNS Management
1. Log into GoDaddy account
2. Go to "My Products" → "Domains"
3. Click "DNS" next to your domain
4. You'll see the DNS Management interface

### 2. Configure Root Domain (A Record)

1. **Find existing A record** pointing to `@` (root domain)
2. **Edit the A record**:
   - **Type**: A
   - **Name**: `@` (represents root domain)
   - **Value**: `216.24.57.1` (Render's IP from Step 1)
   - **TTL**: `600` (10 minutes) or leave default
3. **Save changes**

### 3. Configure WWW Subdomain (CNAME)

1. **Add new CNAME record**:
   - **Type**: CNAME
   - **Name**: `www`
   - **Value**: `splashtastic-web.onrender.com` (your Render URL)
   - **TTL**: `600` (10 minutes)
2. **Save changes**

### 4. Remove Conflicting Records

**Important**: Remove any conflicting records that might interfere:

1. **Delete old A records** for `@` (if they point elsewhere)
2. **Delete old CNAME records** for `www` (if they exist)
3. **Keep MX records** (for email) unless you're changing email providers

## ⚡ Step 3: Verify Domain Configuration

### 1. Check DNS Propagation
Use online tools to verify DNS changes:

```bash
# Check A record
nslookup splashtastic.com

# Check CNAME record  
nslookup www.splashtastic.com

# Or use online tools:
# - whatsmydns.net
# - dnschecker.org
```

### 2. Expected Results
You should see:
- `splashtastic.com` → Render's IP address
- `www.splashtastic.com` → `splashtastic-web.onrender.com`

## 🔒 Step 4: Enable HTTPS in Render

### 1. Verify Domain in Render
1. Go back to Render → Custom Domains
2. Wait for domain status to show "Verified" (can take 5-60 minutes)
3. Once verified, Render automatically provisions SSL certificate

### 2. Force HTTPS Redirects
Your Next.js app should automatically redirect HTTP to HTTPS. Verify by visiting:
- `http://splashtastic.com` → should redirect to `https://splashtastic.com`
- `http://www.splashtastic.com` → should redirect to `https://www.splashtastic.com`

## 🌍 Step 5: Update Application Configuration

### 1. Update Environment Variables
In Render dashboard, update:

```bash
NEXT_PUBLIC_SITE_URL=https://splashtastic.com
```

### 2. Update Stripe Webhooks
1. Go to Stripe Dashboard → Webhooks
2. Edit your webhook endpoint
3. Change URL to: `https://splashtastic.com/api/webhooks/stripe`
4. Test the webhook to ensure it's working

### 3. Update Social Media Links
Update any social media profiles, business listings, or marketing materials with your new domain.

## 📧 Step 6: Email Setup (Optional)

### Option A: Use GoDaddy Email
If you want `info@splashtastic.com`:

1. **Keep existing MX records** in GoDaddy DNS
2. **Purchase email plan** from GoDaddy
3. **Configure email accounts** in GoDaddy dashboard

### Option B: Use Google Workspace
For professional email with Gmail interface:

1. **Sign up for Google Workspace**
2. **Add MX records** provided by Google:
   ```
   MX 1 ASPMX.L.GOOGLE.COM
   MX 5 ALT1.ASPMX.L.GOOGLE.COM
   MX 5 ALT2.ASPMX.L.GOOGLE.COM
   MX 10 ALT3.ASPMX.L.GOOGLE.COM
   MX 10 ALT4.ASPMX.L.GOOGLE.COM
   ```
3. **Verify domain** in Google Workspace

### Option C: Use External Email Service
Keep email separate and just use domain for website.

## 🔍 Step 7: Testing & Verification

### 1. Website Functionality
Test all these URLs:
- ✅ `https://splashtastic.com`
- ✅ `https://www.splashtastic.com`
- ✅ `http://splashtastic.com` (should redirect to HTTPS)
- ✅ `http://www.splashtastic.com` (should redirect to HTTPS)

### 2. Application Features
Verify everything works:
- ✅ Home page loads
- ✅ Booking flow works
- ✅ Payment processing
- ✅ Admin panel accessible
- ✅ API endpoints responding

### 3. SSL Certificate
Check SSL status:
```bash
# Should show valid certificate
openssl s_client -connect splashtastic.com:443 -servername splashtastic.com
```

## 🚨 Troubleshooting

### Common Issues

#### 1. DNS Not Propagating
**Symptoms**: Domain still points to old location
**Solutions**:
- Wait 24-48 hours for full propagation
- Clear browser cache: `Ctrl+Shift+R`
- Try incognito/private browsing
- Check multiple DNS checker websites

#### 2. Mixed Content Warnings
**Symptoms**: HTTPS site loading HTTP resources
**Solutions**:
- Update `NEXT_PUBLIC_SITE_URL` to use HTTPS
- Check for hardcoded HTTP links in code
- Verify all external resources use HTTPS

#### 3. Redirect Loops
**Symptoms**: Site keeps redirecting
**Solutions**:
- Check for multiple redirect rules
- Verify Render configuration
- Clear browser cache and cookies

#### 4. SSL Certificate Issues
**Symptoms**: "Not secure" warning in browser
**Solutions**:
- Wait for Render to provision certificate (up to 24 hours)
- Verify domain is properly verified in Render
- Check for DNS configuration errors

### DNS Configuration Examples

**Correct GoDaddy DNS Records**:
```
Type    Name    Value                           TTL
A       @       216.24.57.1                    600
CNAME   www     splashtastic-web.onrender.com  600
MX      @       [your email provider records]  3600
```

**Common Mistakes to Avoid**:
- ❌ Multiple A records for root domain
- ❌ CNAME record for root domain (use A record)
- ❌ Incorrect Render URL in CNAME
- ❌ Forgetting to remove old conflicting records

## 📱 Step 8: Mobile & Performance Testing

### 1. Mobile Responsiveness
Test on various devices:
- Smartphone (iOS/Android)
- Tablet
- Different screen sizes

### 2. Performance Testing
Use tools to verify performance:
- Google PageSpeed Insights
- GTmetrix
- WebPageTest

Target metrics:
- **LCP**: < 2.5 seconds
- **FID**: < 100ms
- **CLS**: < 0.1

## 📊 Step 9: Analytics & Monitoring

### 1. Google Analytics (Optional)
1. Create Google Analytics account
2. Add tracking code to your Next.js app
3. Verify data collection

### 2. Google Search Console
1. Add property for `https://splashtastic.com`
2. Verify ownership via DNS TXT record
3. Submit sitemap: `https://splashtastic.com/sitemap.xml`

### 3. Uptime Monitoring
Set up monitoring with:
- UptimeRobot (free)
- Render's built-in monitoring
- Custom health checks

## ✅ Final Checklist

- [ ] Domain points to Render (A record)
- [ ] WWW subdomain works (CNAME)
- [ ] HTTPS is active and forced
- [ ] SSL certificate is valid
- [ ] All redirects work properly
- [ ] Application functions normally
- [ ] Environment variables updated
- [ ] Stripe webhooks updated
- [ ] Email configured (if needed)
- [ ] Performance is acceptable
- [ ] Mobile experience is good
- [ ] Analytics/monitoring set up

## 🎉 Success!

Your domain should now be fully configured and working! Users can access your foam party booking system at:

- **Primary**: `https://splashtastic.com`
- **Alternate**: `https://www.splashtastic.com`

Both URLs should load your application securely with a valid SSL certificate.

## 📞 Support Resources

### GoDaddy Support
- **DNS Help**: help.godaddy.com/help/680
- **Support Phone**: Available in your account dashboard
- **Live Chat**: Available during business hours

### Render Support
- **Documentation**: render.com/docs/custom-domains
- **Community**: community.render.com
- **Support Tickets**: Available in dashboard

### DNS Tools
- **DNS Checker**: dnschecker.org
- **What's My DNS**: whatsmydns.net
- **DNS Lookup**: nslookup.io

---

**Your professional domain is now live! 🚀**
