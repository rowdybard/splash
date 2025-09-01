import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Splashtastic Foam Parties - Backyard Magic in Minutes',
  description: 'Professional foam parties for birthdays, events, and celebrations. Safe, biodegradable foam with full setup and cleanup. Serving the Detroit metro area.',
  keywords: 'foam party, birthday party, Detroit, foam machine, party rental, kids party',
  openGraph: {
    title: 'Splashtastic Foam Parties',
    description: 'Backyard magic, in minutes.',
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: 'Splashtastic',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Splashtastic Foam Party',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Splashtastic Foam Parties',
    description: 'Backyard magic, in minutes.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
