import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://YOUR-DOMAIN.com'),

  title: 'Pheakdey & Munineath | Royal Wedding E-Invitation',

  description:
    'You are cordially invited to celebrate the royal wedding of Pheakdey and Munineath on March 18th, 2027 at The Premier Sensok Center, Phnom Penh.',

  keywords: [
    'Wedding',
    'E-Invitation',
    'Pheakdey & Munineath',
    'Phnom Penh',
    'Premier Sensok Center',
    'Cambodian Wedding',
  ],

  openGraph: {
    title: 'The Wedding of Pheakdey & Munineath',
    description:
      'We cordially invite you to celebrate our special day with us.',
    url: 'https://e-invitation-pheakdey-munineath.vercel.app/',
    siteName: 'Pheakdey & Munineath Wedding',
    type: 'website',
    images: [
      {
        url: '/images/image.png',
        width: 1200,
        height: 630,
        alt: 'The Wedding of Pheakdey & Munineath',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'The Wedding of Pheakdey & Munineath',
    description:
      'We cordially invite you to celebrate our special day with us.',
    images: ['/images/image.png'],
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#4A171B',
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
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        <link
          href="https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap"
          rel="stylesheet"
        />

        <link
          href="https://fonts.googleapis.com/css2?family=Moulpali&display=swap"
          rel="stylesheet"
        />

        <link
          href="https://fonts.googleapis.com/css2?family=Moul&display=swap"
          rel="stylesheet"
        />

        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&display=swap"
          rel="stylesheet"
        />

        <link
          href="https://fonts.googleapis.com/css2?family=Kantumruy+Pro:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap"
          rel="stylesheet"
        />

        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>

      <body className="antialiased selection:bg-[#4A171B] selection:text-white">
        {children}

        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}