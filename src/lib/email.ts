import { Resend } from 'resend'
import { generateICS } from './ics'
import { format } from 'date-fns-tz'

// Types for email data
export interface EmailData {
  to: string
  customerName: string
  eventDate: Date
  eventTime: string
  eventAddress: string
  packageName: string
  addons: string[]
  totalPrice: number
  depositAmount: number
  bookingId: string
  isDeposit: boolean
}

export interface EmailTemplateData {
  customerName: string
  eventDate: string
  eventTime: string
  eventAddress: string
  packageName: string
  addons: string[]
  totalPrice: string
  depositAmount: string
  remainingAmount: string
  bookingId: string
  isDeposit: boolean
}

// Initialize Resend client
const resend = new Resend(process.env.RESEND_API_KEY)

// Generate simple ICS calendar content
function generateSimpleICS(data: {
  summary: string
  description: string
  location: string
  startTime: Date
  endTime: Date
  organizerEmail: string
  attendeeEmail: string
}): string {
  const now = new Date()
  const uid = `foam-party-${Date.now()}@splashtastic.com`
  const dtstamp = now.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')
  const created = dtstamp
  const lastModified = dtstamp
  
  // Format dates for ICS (America/Detroit timezone)
  const formatDate = (date: Date) => {
    const detroitDate = new Date(date.toLocaleString('en-US', { timeZone: 'America/Detroit' }))
    return detroitDate.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')
  }
  
  const dtstart = formatDate(data.startTime)
  const dtend = formatDate(data.endTime)
  
  // Escape special characters
  const escapeText = (text: string) => text
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"')
    .replace(/\n/g, '\\n')
    .replace(/,/g, '\\,')
    .replace(/;/g, '\\;')
  
  const escapedSummary = escapeText(data.summary)
  const escapedDescription = escapeText(data.description)
  const escapedLocation = escapeText(data.location)
  
  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Splashtastic//Booking System//EN',
    'CALSCALE:GREGORIAN',
    'BEGIN:VTIMEZONE',
    'TZID:America/Detroit',
    'BEGIN:STANDARD',
    'DTSTART:20071104T020000',
    'RRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU',
    'TZNAME:EST',
    'TZOFFSETFROM:-0400',
    'TZOFFSETTO:-0500',
    'END:STANDARD',
    'BEGIN:DAYLIGHT',
    'DTSTART:20070311T020000',
    'RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU',
    'TZNAME:EDT',
    'TZOFFSETFROM:-0500',
    'TZOFFSETTO:-0400',
    'END:DAYLIGHT',
    'END:VTIMEZONE',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${dtstamp}`,
    `CREATED:${created}`,
    `LAST-MODIFIED:${lastModified}`,
    `DTSTART:${dtstart}`,
    `DTEND:${dtend}`,
    `SUMMARY:${escapedSummary}`,
    `DESCRIPTION:${escapedDescription}`,
    `LOCATION:${escapedLocation}`,
    `ORGANIZER:mailto:${data.organizerEmail}`,
    `ATTENDEE:mailto:${data.attendeeEmail}`,
    'STATUS:CONFIRMED',
    'TRANSP:OPAQUE',
    'END:VEVENT',
    'END:VCALENDAR'
  ]
  
  return icsContent.join('\r\n')
}

// Send booking confirmation email
export async function sendBookingConfirmation(data: EmailData): Promise<boolean> {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.warn('RESEND_API_KEY not set, skipping email send')
      return false
    }

    // Format data for email template
    const templateData: EmailTemplateData = {
      customerName: data.customerName,
      eventDate: format(data.eventDate, 'EEEE, MMMM do, yyyy', { timeZone: 'America/Detroit' }),
      eventTime: data.eventTime,
      eventAddress: data.eventAddress,
      packageName: data.packageName,
      addons: data.addons,
      totalPrice: `$${data.totalPrice.toFixed(2)}`,
      depositAmount: `$${data.depositAmount.toFixed(2)}`,
      remainingAmount: `$${(data.totalPrice - data.depositAmount).toFixed(2)}`,
      bookingId: data.bookingId,
      isDeposit: data.isDeposit
    }

    // Generate ICS calendar attachment
    const icsContent = generateSimpleICS({
      summary: `Splashtastic Foam Party - ${data.packageName}`,
      description: `Your foam party is confirmed! Package: ${data.packageName}${data.addons.length > 0 ? `\nAdd-ons: ${data.addons.join(', ')}` : ''}`,
      location: data.eventAddress,
      startTime: data.eventDate,
      endTime: new Date(data.eventDate.getTime() + 3 * 60 * 60 * 1000), // 3 hours duration
      organizerEmail: 'info@splashtastic.com',
      attendeeEmail: data.to
    })

    // Send email with attachment
    const result = await resend.emails.send({
      from: 'Splashtastic Foam Parties <noreply@splashtastic.com>',
      to: [data.to],
      subject: `🎉 Your Foam Party is Confirmed! - ${templateData.eventDate}`,
      html: generateEmailHTML(templateData),
      attachments: [
        {
          filename: `foam-party-${data.bookingId}.ics`,
          content: icsContent
        }
      ]
    })

    console.log('Email sent successfully:', result)
    return true
  } catch (error) {
    console.error('Failed to send email:', error)
    return false
  }
}

// Generate HTML email content
function generateEmailHTML(data: EmailTemplateData): string {
  const addonsList = data.addons.length > 0 
    ? `<li>${data.addons.join('</li><li>')}</li>`
    : '<li>No add-ons selected</li>'

  const paymentInfo = data.isDeposit
    ? `
      <div class="payment-info">
        <h3>Payment Summary</h3>
        <p><strong>Deposit Paid:</strong> ${data.depositAmount}</p>
        <p><strong>Remaining Balance:</strong> ${data.remainingAmount}</p>
        <p><em>Final payment due 7 days before your event</em></p>
      </div>
    `
    : `
      <div class="payment-info">
        <h3>Payment Complete</h3>
        <p><strong>Total Amount Paid:</strong> ${data.totalPrice}</p>
        <p><em>Your booking is fully confirmed!</em></p>
      </div>
    `

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Booking Confirmation - Splashtastic Foam Parties</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #3B82F6, #10B981); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .booking-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .payment-info { background: #e8f5e8; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
        .cta { background: #3B82F6; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 20px 0; }
        .highlight { background: #fff3cd; padding: 15px; border-radius: 5px; border-left: 4px solid #ffc107; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎉 Booking Confirmed!</h1>
          <p>Your foam party is officially scheduled!</p>
        </div>
        
        <div class="content">
          <p>Hi ${data.customerName},</p>
          
          <p>Thank you for choosing Splashtastic Foam Parties! Your booking has been confirmed and we're excited to make your event unforgettable.</p>
          
          <div class="booking-details">
            <h2>Event Details</h2>
            <p><strong>Date:</strong> ${data.eventDate}</p>
            <p><strong>Time:</strong> ${data.eventTime}</p>
            <p><strong>Location:</strong> ${data.eventAddress}</p>
            <p><strong>Package:</strong> ${data.packageName}</p>
            <p><strong>Add-ons:</strong></p>
            <ul>${addonsList}</ul>
          </div>
          
          ${paymentInfo}
          
          <div class="highlight">
            <h3>📅 Calendar Invite</h3>
            <p>We've attached a calendar invite to this email. Add it to your calendar to never miss your foam party!</p>
          </div>
          
          <div class="highlight">
            <h3>📞 Next Steps</h3>
            <p>Our team will contact you within 24 hours to confirm final details and answer any questions.</p>
            <p>Setup instructions will be sent 48 hours before your event.</p>
          </div>
          
          <a href="/book" class="cta">Book Another Party</a>
          
          <p>If you have any questions, please don't hesitate to contact us:</p>
          <ul>
            <li>📧 Email: info@splashtastic.com</li>
            <li>📱 Phone: (555) 123-4567</li>
            <li>🌐 Website: www.splashtastic.com</li>
          </ul>
        </div>
        
        <div class="footer">
          <p>Splashtastic Foam Parties</p>
          <p>Making memories one bubble at a time! 🫧</p>
        </div>
      </div>
    </body>
    </html>
  `
}

// Send reminder email (48 hours before event)
export async function sendReminderEmail(data: EmailData): Promise<boolean> {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.warn('RESEND_API_KEY not set, skipping reminder email')
      return false
    }

    const templateData: EmailTemplateData = {
      customerName: data.customerName,
      eventDate: format(data.eventDate, 'EEEE, MMMM do, yyyy', { timeZone: 'America/Detroit' }),
      eventTime: data.eventTime,
      eventAddress: data.eventAddress,
      packageName: data.packageName,
      addons: data.addons,
      totalPrice: `$${data.totalPrice.toFixed(2)}`,
      depositAmount: `$${data.depositAmount.toFixed(2)}`,
      remainingAmount: `$${(data.totalPrice - data.depositAmount).toFixed(2)}`,
      bookingId: data.bookingId,
      isDeposit: data.isDeposit
    }

    const reminderHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Event Reminder - Splashtastic Foam Parties</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #10B981, #3B82F6); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .reminder { background: #fff3cd; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ffc107; }
          .setup { background: #e8f5e8; padding: 20px; border-radius: 8px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🫧 Event Reminder</h1>
            <p>Your foam party is tomorrow!</p>
          </div>
          
          <div class="content">
            <p>Hi ${templateData.customerName},</p>
            
            <p>This is your 48-hour reminder for your upcoming foam party!</p>
            
            <div class="reminder">
              <h2>📅 Event Details</h2>
              <p><strong>Date:</strong> ${templateData.eventDate}</p>
              <p><strong>Time:</strong> ${templateData.eventTime}</p>
              <p><strong>Location:</strong> ${templateData.eventAddress}</p>
              <p><strong>Package:</strong> ${templateData.packageName}</p>
            </div>
            
            <div class="setup">
              <h2>🏠 Setup Instructions</h2>
              <p>Please ensure the following is ready for our arrival:</p>
              <ul>
                <li>Clear access to your backyard/event area</li>
                <li>Water source available (hose connection)</li>
                <li>Electrical outlet within 50 feet</li>
                <li>Clear area of at least 20x20 feet</li>
                <li>Remove any valuable items from the area</li>
              </ul>
            </div>
            
            <p>Our team will arrive 30 minutes before your scheduled time to set up.</p>
            
            <p>If you need to make any changes or have questions, please contact us immediately:</p>
            <ul>
              <li>📧 Email: info@splashtastic.com</li>
              <li>📱 Phone: (555) 123-4567</li>
            </ul>
            
            <p>We can't wait to make your foam party amazing! 🎉</p>
          </div>
        </div>
      </body>
      </html>
    `

    const result = await resend.emails.send({
      from: 'Splashtastic Foam Parties <noreply@splashtastic.com>',
      to: [data.to],
      subject: `🫧 Tomorrow: Your Foam Party is Ready!`,
      html: reminderHTML
    })

    console.log('Reminder email sent successfully:', result)
    return true
  } catch (error) {
    console.error('Failed to send reminder email:', error)
    return false
  }
}

// Send cancellation email
export async function sendCancellationEmail(data: EmailData, reason?: string): Promise<boolean> {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.warn('RESEND_API_KEY not set, skipping cancellation email')
      return false
    }

    const templateData: EmailTemplateData = {
      customerName: data.customerName,
      eventDate: format(data.eventDate, 'EEEE, MMMM do, yyyy', { timeZone: 'America/Detroit' }),
      eventTime: data.eventTime,
      eventAddress: data.eventAddress,
      packageName: data.packageName,
      addons: data.addons,
      totalPrice: `$${data.totalPrice.toFixed(2)}`,
      depositAmount: `$${data.depositAmount.toFixed(2)}`,
      remainingAmount: `$${(data.totalPrice - data.depositAmount).toFixed(2)}`,
      bookingId: data.bookingId,
      isDeposit: data.isDeposit
    }

    const cancellationHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Booking Cancelled - Splashtastic Foam Parties</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #EF4444, #DC2626); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .cancellation { background: #fee2e2; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ef4444; }
          .refund { background: #e8f5e8; padding: 20px; border-radius: 8px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>❌ Booking Cancelled</h1>
            <p>Your foam party has been cancelled</p>
          </div>
          
          <div class="content">
            <p>Hi ${templateData.customerName},</p>
            
            <p>We're sorry to inform you that your foam party booking has been cancelled.</p>
            
            <div class="cancellation">
              <h2>📅 Cancelled Event</h2>
              <p><strong>Date:</strong> ${templateData.eventDate}</p>
              <p><strong>Time:</strong> ${templateData.eventTime}</p>
              <p><strong>Location:</strong> ${templateData.eventAddress}</p>
              <p><strong>Package:</strong> ${templateData.packageName}</p>
              ${reason ? `<p><strong>Reason:</strong> ${reason}</p>` : ''}
            </div>
            
            <div class="refund">
              <h2>💰 Refund Information</h2>
              <p>If you paid a deposit or full amount, a refund will be processed within 5-7 business days.</p>
              <p>You will receive a separate email confirmation once the refund is processed.</p>
            </div>
            
            <p>If you'd like to reschedule or have any questions, please contact us:</p>
            <ul>
              <li>📧 Email: info@splashtastic.com</li>
              <li>📱 Phone: (555) 123-4567</li>
            </ul>
            
            <p>We hope to serve you again in the future!</p>
          </div>
        </div>
      </body>
      </html>
    `

    const result = await resend.emails.send({
      from: 'Splashtastic Foam Parties <noreply@splashtastic.com>',
      to: [data.to],
      subject: `❌ Your Foam Party Has Been Cancelled`,
      html: cancellationHTML
    })

    console.log('Cancellation email sent successfully:', result)
    return true
  } catch (error) {
    console.error('Failed to send cancellation email:', error)
    return false
  }
}
