import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET() {
  try {
    const archSrc = path.join(process.cwd(), 'public', 'images', 'arch_background.jpg')
    if (fs.existsSync(archSrc)) {
      const fileBuffer = fs.readFileSync(archSrc)
      return new NextResponse(fileBuffer, {
        headers: {
          'Content-Type': 'image/jpeg',
          'Cache-Control': 'public, max-age=31536000, immutable',
        },
      })
    }

    return new NextResponse('Arch image not found', { status: 404 })
  } catch (error) {
    return new NextResponse('Internal error', { status: 500 })
  }
}

