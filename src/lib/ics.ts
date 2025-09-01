import { format } from 'date-fns-tz'

export type EventDetails = {
  id: string
  title: string
  startDateTime: Date
  endDateTime: Date
  location: {
    street: string
    city: string
    state: string
    zip: string
  }
  description?: string
  organizerEmail: string
  attendeeEmail: string
  url: string
}

export type ICSValidationResult = {
  isValid: boolean
  errors: string[]
}

const TIMEZONE = process.env.TIMEZONE || 'America/Detroit'

export function generateICS(eventDetails: EventDetails): string {
  const {
    id,
    title,
    startDateTime,
    endDateTime,
    location,
    description = '',
    organizerEmail,
    attendeeEmail,
    url
  } = eventDetails

  const now = new Date()
  const uid = `${id}@splashtastic.com`
  const dtstamp = formatICSDateTime(now)
  const created = formatICSDateTime(now)
  const lastModified = formatICSDateTime(now)
  const dtstart = formatICSDateTime(startDateTime, TIMEZONE)
  const dtend = formatICSDateTime(endDateTime, TIMEZONE)
  
  const locationString = `${location.street}, ${location.city}, ${location.state} ${location.zip}`
  
  // Escape special characters in text fields
  const escapedTitle = escapeICSText(title)
  const escapedDescription = escapeICSText(description)
  const escapedLocation = escapeICSText(locationString)

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Splashtastic//Booking System//EN',
    'CALSCALE:GREGORIAN',
    generateTimezoneComponent(),
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${dtstamp}`,
    `CREATED:${created}`,
    `LAST-MODIFIED:${lastModified}`,
    `DTSTART:${dtstart}`,
    `DTEND:${dtend}`,
    `SUMMARY:${escapedTitle}`,
    ...(description ? [`DESCRIPTION:${escapedDescription}`] : []),
    `LOCATION:${escapedLocation}`,
    `ORGANIZER:mailto:${organizerEmail}`,
    `ATTENDEE:mailto:${attendeeEmail}`,
    `URL:${url}`,
    'STATUS:CONFIRMED',
    'TRANSP:OPAQUE',
    'END:VEVENT',
    'END:VCALENDAR'
  ]

  return foldLines(icsContent.join('\r\n'))
}

export function formatICSDateTime(date: Date, timezone?: string): string {
  if (timezone) {
    const formatted = format(date, 'yyyyMMdd\'T\'HHmmss', { timeZone: timezone })
    return `TZID=${timezone}:${formatted}`
  } else {
    // UTC format
    return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')
  }
}

export function validateICSContent(icsContent: string): ICSValidationResult {
  const errors: string[] = []
  const lines = icsContent.split(/\r?\n/)

  // Check for required BEGIN/END tags
  if (!icsContent.includes('BEGIN:VCALENDAR')) {
    errors.push('Missing BEGIN:VCALENDAR')
  }

  if (!icsContent.includes('END:VCALENDAR')) {
    errors.push('Missing END:VCALENDAR')
  }

  if (!icsContent.includes('BEGIN:VEVENT')) {
    errors.push('Missing BEGIN:VEVENT')
  }

  if (!icsContent.includes('END:VEVENT')) {
    errors.push('Missing END:VEVENT')
  }

  // Check for required properties
  const requiredProperties = ['DTSTART', 'DTEND', 'SUMMARY', 'UID']
  for (const prop of requiredProperties) {
    if (!icsContent.includes(`${prop}:`)) {
      errors.push(`Missing required ${prop}`)
    }
  }

  // Validate datetime formats
  const dtstartMatch = icsContent.match(/DTSTART[^:]*:(.+)/)
  const dtendMatch = icsContent.match(/DTEND[^:]*:(.+)/)

  if (dtstartMatch) {
    const dtstartValue = dtstartMatch[1].replace(/\r?\n\s+/g, '') // Handle line folding
    if (!isValidICSDateTime(dtstartValue)) {
      errors.push('Invalid DTSTART format')
    }
  }

  if (dtendMatch) {
    const dtendValue = dtendMatch[1].replace(/\r?\n\s+/g, '') // Handle line folding
    if (!isValidICSDateTime(dtendValue)) {
      errors.push('Invalid DTEND format')
    }
  }

  // Check that end time is after start time
  if (dtstartMatch && dtendMatch) {
    try {
      const startDate = parseICSDateTime(dtstartMatch[1].replace(/\r?\n\s+/g, ''))
      const endDate = parseICSDateTime(dtendMatch[1].replace(/\r?\n\s+/g, ''))
      
      if (endDate <= startDate) {
        errors.push('End time must be after start time')
      }
    } catch (e) {
      // DateTime parsing errors are already caught above
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}

function generateTimezoneComponent(): string {
  // Generate timezone component for America/Detroit
  return [
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
    'END:VTIMEZONE'
  ].join('\r\n')
}

function escapeICSText(text: string): string {
  return text
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"')
    .replace(/\n/g, '\\n')
    .replace(/,/g, '\\,')
    .replace(/;/g, '\\;')
}

function foldLines(content: string): string {
  // ICS lines should not exceed 75 characters, fold longer lines
  const lines = content.split('\r\n')
  const foldedLines: string[] = []

  for (const line of lines) {
    if (line.length <= 75) {
      foldedLines.push(line)
    } else {
      let remainingLine = line
      let isFirst = true
      
      while (remainingLine.length > 0) {
        if (isFirst) {
          foldedLines.push(remainingLine.substring(0, 75))
          remainingLine = remainingLine.substring(75)
          isFirst = false
        } else {
          foldedLines.push(' ' + remainingLine.substring(0, 74))
          remainingLine = remainingLine.substring(74)
        }
      }
    }
  }

  return foldedLines.join('\r\n')
}

function isValidICSDateTime(dateTimeString: string): boolean {
  // Remove TZID prefix if present
  const cleanDateTime = dateTimeString.replace(/^TZID=[^:]+:/, '')
  
  // Check for basic format: YYYYMMDDTHHMMSS or YYYYMMDDTHHMMSSZ
  const basicFormat = /^\d{8}T\d{6}Z?$/
  return basicFormat.test(cleanDateTime)
}

function parseICSDateTime(dateTimeString: string): Date {
  // Remove TZID prefix if present and clean up line folding
  const cleanDateTime = dateTimeString.replace(/^TZID=[^:]+:/, '').replace(/\r?\n\s+/g, '')
  
  // Parse YYYYMMDDTHHMMSS format
  const year = parseInt(cleanDateTime.substring(0, 4))
  const month = parseInt(cleanDateTime.substring(4, 6)) - 1 // JS months are 0-based
  const day = parseInt(cleanDateTime.substring(6, 8))
  const hour = parseInt(cleanDateTime.substring(9, 11))
  const minute = parseInt(cleanDateTime.substring(11, 13))
  const second = parseInt(cleanDateTime.substring(13, 15))

  return new Date(year, month, day, hour, minute, second)
}
