import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { MarkerWidget } from '@/components/MarkerWidget'
import SchemaJsonLd from '@/components/SchemaJsonLd'
import { about, attorney, authorProfiles, contact, siteConfig } from '@/data/siteData'
import './globals.css'
import '@/themes/v1/variables.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '500', '600', '700', '800'],
})

const SITE_URL =
  siteConfig.podcastUrl?.replace(/\/$/, '') ||
  contact.website?.replace(/\/$/, '') ||
  'https://podcast-fortworthcaraccidentlawyer.vercel.app'
const TITLE = siteConfig.podcastName
const DESCRIPTION = about.description
const hostProfile = Object.values(authorProfiles)[0]
const HOST_NAME = hostProfile?.name || attorney.name
const FIRM_NAME = attorney.firm

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: `%s | ${TITLE}`,
  },
  description: DESCRIPTION,
  applicationName: TITLE,
  authors: [{ name: HOST_NAME, url: contact.website || SITE_URL }],
  keywords: [
    TITLE,
    HOST_NAME,
    FIRM_NAME,
    '1800 The Wolf attorney',
    'Fort Worth car accident lawyer',
    'Fort Worth truck accident attorney',
    'Fort Worth personal injury lawyer',
    'Euless car accident lawyer',
    'Houston car accident attorney',
    'Houston truck accident lawyer',
    'DFW accident attorney',
    'Texas truck accident lawyer',
    'Texas personal injury podcast',
    '18 wheeler accident lawyer Texas',
    'Uber accident lawyer Texas',
    'traumatic brain injury lawyer Texas',
    'wrongful death attorney DFW',
    'Mid-Cities personal injury lawyer',
    'abogado de accidentes Fort Worth',
    'abogado de accidentes Houston',
  ],
  category: 'Legal Podcast',
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'website',
    siteName: TITLE,
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    locale: 'en_US',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: `${TITLE} — hosted by ${HOST_NAME}, ${FIRM_NAME}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: ['/opengraph-image'],
  },
  // Next's file-convention `app/icon.tsx` + `app/apple-icon.tsx` auto-wire
  // `<link rel="icon" href="/icon">` and `<link rel="apple-touch-icon" href="/apple-icon">`.
  // Don't add an explicit `icons` block here — it overrides the auto-detection
  // with paths that don't exist (e.g. /icon.svg).
  manifest: '/manifest.webmanifest',
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#0E0E0E' },
    { media: '(prefers-color-scheme: dark)', color: '#0E0E0E' },
  ],
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <SchemaJsonLd />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
        <MarkerWidget />
      </body>
    </html>
  )
}
