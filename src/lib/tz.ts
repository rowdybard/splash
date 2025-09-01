import { zonedTimeToUtc, utcToZonedTime, format } from 'date-fns-tz'

const TIMEZONE = process.env.TIMEZONE || 'America/Detroit'

export function toDetroitTime(date: Date): Date {
  return utcToZonedTime(date, TIMEZONE)
}

export function fromDetroitTime(date: Date): Date {
  return zonedTimeToUtc(date, TIMEZONE)
}

export function formatInDetroitTime(date: Date, formatString: string): string {
  return format(date, formatString, { timeZone: TIMEZONE })
}

export function getCurrentDetroitTime(): Date {
  return toDetroitTime(new Date())
}

export { TIMEZONE }
