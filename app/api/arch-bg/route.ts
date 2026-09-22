import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET() {
  try {
    const userVerticalArchSrc = 'C:\\Users\\chims\\.gemini\\antigravity-ide\\brain\\66c14de0-ba7f-4998-a12b-835c15455cf9\\.user_uploaded\\media_1790059394217.jpg'
    const publicDest = path.join(process.cwd(), 'public', 'images', 'arch_background.jpg')
    const publicDestVertical = path.join(process.cwd(), 'public', 'images', 'vertical_arch_background.jpg')

    try {
      if (fs.existsSync(userVerticalArchSrc)) {
        fs.copyFileSync(userVerticalArchSrc, publicDest)
        fs.copyFileSync(userVerticalArchSrc, publicDestVertical)
      }
    } catch (err) {
      console.error('Failed to copy vertical arch to public:', err)
    }

    if (fs.existsSync(userVerticalArchSrc)) {
      const fileBuffer = fs.readFileSync(userVerticalArchSrc)
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

    return new NextResponse('Arch image not found', { status: 404 })
  } catch (error) {
    return new NextResponse('Internal error', { status: 500 })
  }
}
