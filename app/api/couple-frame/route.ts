import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET() {
  try {
    // High-resolution luxury royal wedding frame with rococo filigree, gold accents, and crimson satin bow
    const luxurySrc = 'C:\\Users\\chims\\.gemini\\antigravity-ide\\brain\\66c14de0-ba7f-4998-a12b-835c15455cf9\\luxury_wedding_frame_1790058867474.jpg'
    const fallbackSrc = 'C:\\Users\\chims\\.gemini\\antigravity-ide\\brain\\66c14de0-ba7f-4998-a12b-835c15455cf9\\.user_uploaded\\media_1790058053275.jpg'
    const publicDest = path.join(process.cwd(), 'public', 'images', 'couple_ribbon_frame.jpg')

    const activeSrc = fs.existsSync(luxurySrc) ? luxurySrc : fallbackSrc

    try {
      if (fs.existsSync(activeSrc)) {
        fs.copyFileSync(activeSrc, publicDest)
      }
      const verticalArchSrc = 'C:\\Users\\chims\\.gemini\\antigravity-ide\\brain\\66c14de0-ba7f-4998-a12b-835c15455cf9\\.user_uploaded\\media_1790059394217.jpg'
      const archDest = path.join(process.cwd(), 'public', 'images', 'arch_background.jpg')
      if (fs.existsSync(verticalArchSrc)) {
        fs.copyFileSync(verticalArchSrc, archDest)
      }
    } catch (err) {
      console.error('Failed to copy to public:', err)
    }

    if (fs.existsSync(activeSrc)) {
      const fileBuffer = fs.readFileSync(activeSrc)
      return new NextResponse(fileBuffer, {
        headers: {
          'Content-Type': 'image/jpeg',
          'Cache-Control': 'public, max-age=31536000, immutable',
        },
      })
    } else if (fs.existsSync(publicDest)) {
      const fileBuffer = fs.readFileSync(publicDest)
      return new NextResponse(fileBuffer, {
        headers: {
          'Content-Type': 'image/jpeg',
          'Cache-Control': 'public, max-age=31536000, immutable',
        },
      })
    }

    return new NextResponse('Frame image not found', { status: 404 })
  } catch (error) {
    return new NextResponse('Internal error', { status: 500 })
  }
}
