import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import fs from 'fs'
import path from 'path'
import './globals.css'

// Ensure user original arch_background.jpg is preserved for vertical_arch_background.jpg
try {
  const origArch = path.join(process.cwd(), 'public', 'images', 'arch_background.jpg')
  const verticalArch = path.join(process.cwd(), 'public', 'images', 'vertical_arch_background.jpg')
  if (fs.existsSync(origArch)) {
    fs.copyFileSync(origArch, verticalArch)
  }
} catch (e) {
  // Ignore serverless write errors
}

// Dynamically resolve site domain for Vercel production, preview branches, and custom domains
const defaultSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL.replace(/^https?:\/\//, '')}`
    : 'https://e-invitation-pheakdey-munineath.vercel.app')

const cleanSiteUrl = defaultSiteUrl.replace(/\/+$/, '')

export const metadata: Metadata = {
  metadataBase: new URL(cleanSiteUrl),

  title: 'Pheakdey & Munineath | Royal Wedding E-Invitation (លិខិតអញ្ជើញអាពាហ៍ពិពាហ៍)',

  description:
    'You are cordially invited to celebrate the royal wedding of Pheakdey and Munineath on March 18th, 2027 at The Premier Sensok Center (The Grand Orchid), Phnom Penh. សូមគោរពអញ្ជើញចូលរួមពិធីអាពាហ៍ពិពាហ៍ ភក្តី & មុនីនាថ។',

  keywords: [
    'Wedding',
    'E-Invitation',
    'Pheakdey & Munineath',
    'ភក្តី និង មុនីនាថ',
    'អាពាហ៍ពិពាហ៍',
    'Phnom Penh',
    'The Premier Sensok Center',
    'Premier Centre Sen Sok',
    'Cambodian Wedding',
  ],

  openGraph: {
    title: 'The Wedding of Pheakdey & Munineath | អាពាហ៍ពិពាហ៍ ភក្តី & មុនីនាថ',
    description:
      'You are cordially invited to celebrate our wedding on March 18, 2027 at The Premier Sensok Center. សូមគោរពអញ្ជើញចូលរួមពិធីមង្គលការរបស់យើងខ្ញុំ។',
    url: cleanSiteUrl,
    siteName: 'Pheakdey & Munineath Wedding',
    locale: 'km_KH',
    alternateLocale: ['en_US'],
    type: 'website',
    images: [
      {
        url: `${cleanSiteUrl}/api/og`,
        secureUrl: `${cleanSiteUrl}/api/og`,
        width: 1200,
        height: 630,
        type: 'image/jpeg',
        alt: 'The Wedding of Pheakdey & Munineath',
      },
      {
        url: `${cleanSiteUrl}/images/image1.png`,
        secureUrl: `${cleanSiteUrl}/images/image1.png`,
        width: 1200,
        height: 800,
        type: 'image/png',
        alt: 'Pheakdey & Munineath Romantic Portrait',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'The Wedding of Pheakdey & Munineath | អាពាហ៍ពិពាហ៍ ភក្តី & មុនីនាថ',
    description:
      'You are cordially invited to celebrate our royal wedding on March 18, 2027 at The Premier Sensok Center.',
    images: [`${cleanSiteUrl}/api/og`],
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
    <html lang="km" className="scroll-smooth">
      <head>
        {/* Instant Universal OpenGraph & Twitter Meta Tags for Telegram, Messenger, WhatsApp, Facebook, iMessage */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Pheakdey & Munineath Wedding" />
        <meta
          property="og:title"
          content="The Wedding of Pheakdey & Munineath | អាពាហ៍ពិពាហ៍ ភក្តី & មុនីនាថ"
        />
        <meta
          property="og:description"
          content="You are cordially invited to celebrate our wedding on March 18, 2027 at The Premier Sensok Center. សូមគោរពអញ្ជើញចូលរួមពិធីមង្គលការរបស់យើងខ្ញុំ។"
        />
        <meta property="og:url" content={cleanSiteUrl} />
        <meta property="og:image" content={`${cleanSiteUrl}/api/og`} />
        <meta property="og:image:secure_url" content={`${cleanSiteUrl}/api/og`} />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="The Wedding of Pheakdey & Munineath" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="The Wedding of Pheakdey & Munineath | អាពាហ៍ពិពាហ៍ ភក្តី & មុនីនាថ"
        />
        <meta
          name="twitter:description"
          content="You are cordially invited to celebrate our wedding on March 18, 2027 at The Premier Sensok Center."
        />
        <meta name="twitter:image" content={`${cleanSiteUrl}/api/og`} />

        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        <link
          href="https://fonts.googleapis.com/css2?family=Great+Vibes&family=Alex+Brush&family=Pinyon+Script&display=swap"
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