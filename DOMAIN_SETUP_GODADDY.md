# GoDaddy Domain Setup for Splashtastic Foam Parties

Complete guide for configuring your GoDaddy domain to work with your Render-hosted Splashtastic website.

## 🎯 Overview

This guide walks you through:
1. Accessing your GoDaddy domain management
2. Configuring DNS records for Render
3. Setting up SSL certificates
4. Verifying domain configuration
5. Troubleshooting common issues

## 🔑 Prerequisites

Before starting, ensure you have:

- [ ] GoDaddy account with domain access
- [ ] Render web service deployed and running
- [ ] Custom domain added in Render dashboard
- [ ] Access to domain management panel

## 🌐 Step 1: Access GoDaddy Domain Management

### 1.1 Log into GoDaddy

1. **Go to GoDaddy.com**
   - Navigate to [godaddy.com](https://godaddy.com)
   - Click "Sign In" in the top right

2. **Access Domain Management**
   - After signing in, click "My Products"
   - Find your domain (e.g., `splashtastic.com`)
   - Click "Manage" next to your domain

3. **Navigate to DNS Settings**
   - In the domain management panel
   - Click "DNS" from the left sidebar
   - You'll see the DNS management interface

## 📝 Step 2: Configure DNS Records

### 2.1 Add CNAME Record for www

1. **Create CNAME Record**
   - Click "Add" or "+" button
   - Select "CNAME" from the record type dropdown

2. **Configure www Record**
   ```
   Type: CNAME
   Name: www
   Value: your-app-name.onrender.com
   TTL: 600 (or 1 hour)
   ```

3. **Save the Record**
   - Click "Save" or "Add Record"
   - Verify the record appears in your DNS list

### 2.2 Add CNAME Record for Root Domain

1. **Create Another CNAME Record**
   - Click "Add" or "+" button again
   - Select "CNAME" from the record type dropdown

2. **Configure Root Record**
   ```
   Type: CNAME
   Name: @ (or leave blank for root)
   Value: your-app-name.onrender.com
   TTL: 600 (or 1 hour)
   ```

3. **Save the Record**
   - Click "Save" or "Add Record"
   - You should now have two CNAME records

### 2.3 Verify DNS Records

Your DNS configuration should look like this:

```
Type    Name    Value                           TTL
CNAME   @       your-app-name.onrender.com     600
CNAME   www     your-app-name.onrender.com     600
```

## 🔒 Step 3: SSL Certificate Setup

### 3.1 Render SSL Provisioning

1. **Add Custom Domain in Render**
   - Go to your Render web service dashboard
   - Click "Settings" → "Custom Domains"
   - Add your domain: `splashtastic.com`

2. **SSL Certificate Generation**
   - Render automatically provisions SSL certificates
   - This process takes 5-15 minutes
   - You'll see "SSL Certificate" status in the domain settings

3. **Verify SSL Status**
   - Wait for "SSL Certificate" to show "Active"
   - The certificate covers both `www.splashtastic.com` and `splashtastic.com`

### 3.2 Force HTTPS (Optional)

1. **Enable HTTPS Enforcement**
   - In Render domain settings
   - Toggle "Force HTTPS" to enabled
   - This redirects all HTTP traffic to HTTPS

## ⏱️ Step 4: DNS Propagation

### 4.1 Understanding Propagation

DNS changes don't take effect immediately:
- **Typical time**: 15 minutes to 48 hours
- **Factors affecting speed**:
  - TTL (Time To Live) settings
  - ISP DNS caching
  - Geographic location

### 4.2 Check Propagation Status

1. **Use Online Tools**
   - [whatsmydns.net](https://whatsmydns.net)
   - [dnschecker.org](https://dnschecker.org)
   - Enter your domain and check CNAME records

2. **Command Line Check**
   ```bash
   # Check CNAME records
   nslookup www.splashtastic.com
   nslookup splashtastic.com
   
   # Should show your-app-name.onrender.com
   ```

3. **Expected Results**
   ```
   www.splashtastic.com -> your-app-name.onrender.com
   splashtastic.com -> your-app-name.onrender.com
   ```

## ✅ Step 5: Verification & Testing

### 5.1 Domain Accessibility

1. **Test Root Domain**
   - Open browser and go to `splashtastic.com`
   - Should redirect to `https://splashtastic.com`
   - Page should load your Splashtastic website

2. **Test www Subdomain**
   - Open browser and go to `www.splashtastic.com`
   - Should redirect to `https://www.splashtastic.com`
   - Page should load your Splashtastic website

3. **Check HTTPS**
   - Verify the lock icon in browser address bar
   - Should show "Secure" or padlock symbol

### 5.2 Functionality Testing

1. **Basic Website Functions**
   - Home page loads correctly
   - Navigation works properly
   - All pages accessible

2. **Booking System**
   - Booking form loads
   - Date/time selection works
   - Package selection functional

3. **Admin Panel**
   - Admin page accessible
   - Login functionality works
   - Dashboard displays correctly

## 🚨 Step 6: Troubleshooting

### 6.1 Common DNS Issues

#### Issue: Domain Not Resolving
```
Error: "This site can't be reached"
```

**Solutions:**
1. **Check DNS Records**
   - Verify CNAME records are correct
   - Ensure TTL values are reasonable (600 seconds)

2. **Wait for Propagation**
   - DNS changes can take up to 48 hours
   - Use online DNS checkers to verify

3. **Clear DNS Cache**
   ```bash
   # Windows
   ipconfig /flushdns
   
   # macOS
   sudo dscacheutil -flushcache
   
   # Linux
   sudo systemctl restart systemd-resolved
   ```

#### Issue: SSL Certificate Not Active
```
Error: "Your connection is not private"
```

**Solutions:**
1. **Check Render SSL Status**
   - Verify domain is added in Render
   - Wait for SSL certificate generation (5-15 minutes)

2. **Verify Domain Configuration**
   - Ensure DNS records point to Render
   - Check domain spelling in Render

3. **Force HTTPS Issues**
   - Temporarily disable "Force HTTPS"
   - Test with HTTP first, then enable HTTPS

### 6.2 GoDaddy-Specific Issues

#### Issue: CNAME for Root Domain Not Allowed
Some GoDaddy plans don't allow CNAME records for root domains.

**Solutions:**
1. **Use A Record Instead**
   ```
   Type: A
   Name: @
   Value: 76.76.19.36 (Render's IP)
   TTL: 600
   ```

2. **Contact GoDaddy Support**
   - Upgrade your domain plan
   - Request CNAME support for root domain

#### Issue: DNS Changes Not Saving
```
Error: "Unable to save DNS record"
```

**Solutions:**
1. **Check Permissions**
   - Ensure you have domain management access
   - Verify account status

2. **Clear Browser Cache**
   - Try different browser
   - Clear cookies and cache

3. **Contact Support**
   - GoDaddy support can help with technical issues

## 🔄 Step 7: Maintenance & Updates

### 7.1 Regular DNS Checks

1. **Monthly Verification**
   - Check DNS propagation status
   - Verify SSL certificate validity
   - Test domain accessibility

2. **After Render Updates**
   - Verify domain still works after deployments
   - Check for any DNS changes needed

### 7.2 SSL Certificate Renewal

1. **Automatic Renewal**
   - Render handles SSL certificate renewal
   - No manual intervention required
   - Certificates are valid for 90 days

2. **Monitor Certificate Status**
   - Check SSL status in Render dashboard
   - Look for any certificate warnings

## 📱 Step 8: Mobile & Email Configuration

### 8.1 Mobile Domain Testing

1. **Test on Mobile Devices**
   - Verify domain works on smartphones
   - Check mobile responsiveness
   - Test touch interactions

2. **Mobile DNS**
   - Mobile carriers may cache DNS differently
   - Test on multiple mobile networks

### 8.2 Email Configuration (Optional)

If you want email addresses like `info@splashtastic.com`:

1. **Add MX Records**
   ```
   Type: MX
   Name: @
   Value: your-email-provider.com
   Priority: 10
   TTL: 3600
   ```

2. **Email Service Providers**
   - Google Workspace
   - Microsoft 365
   - Zoho Mail
   - Custom email server

## 🎯 Best Practices

### 8.1 DNS Management

1. **Keep TTL Reasonable**
   - Use 600 seconds (10 minutes) for testing
   - Use 3600 seconds (1 hour) for production
   - Lower TTL = faster changes, higher TTL = better performance

2. **Document Changes**
   - Keep record of all DNS modifications
   - Note dates and reasons for changes
   - Document any special configurations

3. **Regular Backups**
   - Screenshot DNS configuration
   - Export DNS records if possible
   - Keep backup of domain settings

### 8.2 Security Considerations

1. **HTTPS Enforcement**
   - Always use HTTPS in production
   - Redirect HTTP to HTTPS
   - Monitor SSL certificate status

2. **DNS Security**
   - Use strong GoDaddy account passwords
   - Enable two-factor authentication
   - Monitor for unauthorized changes

## 📞 Support Resources

### 8.1 GoDaddy Support

- **Phone**: 1-866-938-1119
- **Live Chat**: Available in domain management panel
- **Help Center**: [help.godaddy.com](https://help.godaddy.com)
- **Community Forums**: [community.godaddy.com](https://community.godaddy.com)

### 8.2 Render Support

- **Documentation**: [render.com/docs](https://render.com/docs)
- **Community**: [community.render.com](https://community.render.com)
- **Support Tickets**: Via Render dashboard

### 8.3 External Tools

- **DNS Checkers**:
  - [whatsmydns.net](https://whatsmydns.net)
  - [dnschecker.org](https://dnschecker.org)
  - [mxtoolbox.com](https://mxtoolbox.com)

- **SSL Checkers**:
  - [ssllabs.com/ssltest](https://ssllabs.com/ssltest)
  - [sslshopper.com/ssl-checker](https://sslshopper.com/ssl-checker)

## ✅ Final Checklist

Before considering your domain setup complete:

- [ ] DNS records configured correctly
- [ ] SSL certificate active and valid
- [ ] Domain accessible via HTTPS
- [ ] www subdomain working
- [ ] All website functionality tested
- [ ] Mobile devices tested
- [ ] DNS propagation verified
- [ ] SSL certificate monitoring set up
- [ ] Documentation completed
- [ ] Support contacts noted

## 🎉 Success!

Once all items are checked off, your GoDaddy domain is successfully configured and pointing to your Render-hosted Splashtastic website!

**Your customers can now access your foam party booking website at:**
- `https://splashtastic.com`
- `https://www.splashtastic.com`

---

## 🚀 Quick Reference Commands

### DNS Verification
```bash
# Check CNAME records
nslookup www.splashtastic.com
nslookup splashtastic.com

# Check from different DNS servers
dig @8.8.8.8 www.splashtastic.com
dig @1.1.1.1 splashtastic.com
```

### SSL Verification
```bash
# Check SSL certificate
openssl s_client -connect splashtastic.com:443 -servername splashtastic.com

# Test HTTPS redirect
curl -I http://splashtastic.com
curl -I https://splashtastic.com
```

### Common TTL Values
- **Testing**: 300-600 seconds (5-10 minutes)
- **Production**: 3600 seconds (1 hour)
- **Stable**: 86400 seconds (24 hours)

---

**Happy Domain Configuring! 🌐**

*Your Splashtastic website will be accessible worldwide in no time! 🫧*
