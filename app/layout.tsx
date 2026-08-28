import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import LenisProvider from '@/components/providers/LenisProvider'
import Cursor from '@/components/ui/Cursor'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const SITE_URL = 'https://muhammaddhiyaulhaq.vercel.app'

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Muhammad Dhiya Ulhaq',
  url: `${SITE_URL}/`,
  jobTitle: 'Full-Stack Developer & AI Engineer',
  description:
    'Informatics student at President University. Full-Stack Developer specializing in React, Next.js, Flutter, Golang, and AI/ML.',
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'President University',
  },
  sameAs: [
    'https://github.com/muhammaddhiya',
    'https://www.linkedin.com/in/muhammaddhiyaulhaq---',
    'https://www.instagram.com/muhammaddhiya._/',
  ],
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      'Muhammad Dhiya Ulhaq | Informatics Student at President University | Full-Stack Developer & AI Engineer',
    template: '%s | Muhammad Dhiya Ulhaq',
  },
  description:
    'Muhammad Dhiya Ulhaq — Informatics student at President University and Full-Stack Developer passionate about AI/ML. Experienced with React, Next.js, Flutter, Golang, and Machine Learning. Building at the intersection of intelligence and interface.',
  keywords: [
    'Muhammad Dhiya Ulhaq',
    'Dhiya Ulhaq',
    'Full-Stack Developer',
    'AI Engineer',
    'Informatics Student',
    'President University',
    'React',
    'Next.js',
    'Flutter',
    'Golang',
    'Machine Learning',
    'AI/ML',
    'Portfolio',
  ],
  authors: [{ name: 'Muhammad Dhiya Ulhaq' }],
  creator: 'Muhammad Dhiya Ulhaq',
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: 'Muhammad Dhiya Ulhaq',
    title: 'Muhammad Dhiya Ulhaq | Full-Stack Developer & AI Engineer',
    description:
      'Informatics student at President University building at the intersection of AI and the web.',
    images: [
      {
        url: '/photos/front.png',
        width: 2048,
        height: 1844,
        alt: 'Muhammad Dhiya Ulhaq — Full-Stack Developer & AI Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Muhammad Dhiya Ulhaq | Full-Stack Developer & AI Engineer',
    description:
      'Informatics student at President University building at the intersection of AI and the web.',
    images: ['/photos/front.png'],
  },
  icons: {
    icon: '/icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={inter.variable} suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <LenisProvider>
          <Cursor />
          {children}
        </LenisProvider>
      </body>
    </html>
  )
}
