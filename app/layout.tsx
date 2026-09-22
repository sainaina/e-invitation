import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Rithy & Nihyun | Royal Wedding E-Invitation',
  description:
    'You are cordially invited to celebrate the royal wedding of Rithy and Nihyun on December 17th – 18th, 2025 at The Premier Sensok Center, Phnom Penh.',
  keywords: ['Wedding', 'E-Invitation', 'Rithy & Nihyun', 'Phnom Penh', 'Premier Sensok Center', 'Cambodian Wedding'],
  openGraph: {
    title: 'The Wedding of Rithy & Nihyun',
    description: 'We cordially invite you to celebrate our special day with us.',
    images: ['/images/couple_hero_portrait_1790042546264.jpg'],
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#5f682a',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Moulpali&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Moul&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased selection:bg-[#330404] selection:text-white">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
