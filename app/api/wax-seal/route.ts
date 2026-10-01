import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET() {
  try {
    const publicDest = path.join(process.cwd(), 'public', 'images', 'wax_seal_pm.jpg')

    if (fs.existsSync(publicDest)) {
      const fileBuffer = fs.readFileSync(publicDest)
      return new NextResponse(fileBuffer, {
        headers: {
          'Content-Type': 'image/jpeg',
          'Cache-Control': 'public, max-age=31536000, immutable',
        },
      })
    }

    return new NextResponse('Wax seal image not found', { status: 404 })
  } catch (error) {
    return new NextResponse('Internal error', { status: 500 })
  }
}
