import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const publicDir = path.join(process.cwd(), 'public')
    const ogCachePath = path.join(publicDir, 'og-image.jpg')

    // 1. If pre-generated og-image.jpg exists, serve it immediately with immutable cache
    if (fs.existsSync(ogCachePath)) {
      const buffer = fs.readFileSync(ogCachePath)
      return new NextResponse(buffer, {
        headers: {
          'Content-Type': 'image/jpeg',
          'Content-Length': buffer.length.toString(),
          'Cache-Control': 'public, max-age=31536000, immutable',
        },
      })
    }

    // 2. Select best candidate image to produce an optimal 1200x630 OpenGraph JPEG
    const candidateSources = [
      path.join(publicDir, 'images', 'image1.png'),
      path.join(publicDir, 'images', 'image.png'),
      path.join(publicDir, 'images', 'wedding_floral_bg.jpg'),
    ]

    const existingSrc = candidateSources.find((p) => fs.existsSync(p))

    if (existingSrc) {
      try {
        // Use sharp (available in Next.js node_modules) to create a perfect 1200x630 OpenGraph JPEG under 200KB
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const sharp = require('sharp')
        const buffer = await sharp(existingSrc)
          .resize(1200, 630, {
            fit: 'cover',
            position: 'center',
          })
          .jpeg({ quality: 85, progressive: true })
          .toBuffer()

        // Cache file in public directory for zero-latency subsequent static requests
        try {
          fs.writeFileSync(ogCachePath, buffer)
        } catch (_) {}

        return new NextResponse(buffer, {
          headers: {
            'Content-Type': 'image/jpeg',
            'Content-Length': buffer.length.toString(),
            'Cache-Control': 'public, max-age=31536000, immutable',
          },
        })
      } catch (sharpErr) {
        console.error('Sharp processing error, falling back:', sharpErr)
      }

      // If sharp is unavailable, serve existing image directly with correct mime type
      const fallbackBuffer = fs.readFileSync(existingSrc)
      const isPng = existingSrc.endsWith('.png')
      return new NextResponse(fallbackBuffer, {
        headers: {
          'Content-Type': isPng ? 'image/png' : 'image/jpeg',
          'Content-Length': fallbackBuffer.length.toString(),
          'Cache-Control': 'public, max-age=86400',
        },
      })
    }

    return new NextResponse('OG Image not found', { status: 404 })
  } catch (err) {
    console.error('Error generating OG image:', err)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
