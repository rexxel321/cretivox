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

export const metadata: Metadata = {
  title: 'Muhammad Dhiya Ulhaq — Full-Stack Developer & AI Engineer',
  description:
    'Informatics major at President University. Full-Stack Developer with expertise in React, Next.js, Flutter, Golang, and AI/ML. Building at the intersection of intelligence and interface.',
  keywords: [
    'Muhammad Dhiya Ulhaq',
    'Full-Stack Developer',
    'AI Engineer',
    'React',
    'Next.js',
    'Flutter',
    'President University',
  ],
  openGraph: {
    title: 'Muhammad Dhiya Ulhaq — Full-Stack Developer & AI Engineer',
    description: 'Building innovative technology solutions at the intersection of AI and web development.',
    type: 'website',
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
        <LenisProvider>
          <Cursor />
          {children}
        </LenisProvider>
      </body>
    </html>
  )
}
