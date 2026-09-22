import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET() {
  try {
    const generatedMatchaSeal = 'C:\\Users\\chims\\.gemini\\antigravity-ide\\brain\\66c14de0-ba7f-4998-a12b-835c15455cf9\\wax_seal_matcha_1790070190008.jpg'
    const publicDest = path.join(process.cwd(), 'public', 'images', 'wax_seal_matcha.jpg')

    try {
      if (fs.existsSync(generatedMatchaSeal)) {
        fs.copyFileSync(generatedMatchaSeal, publicDest)
      }
    } catch (err) {
      console.error('Failed to copy matcha wax seal to public:', err)
    }

    if (fs.existsSync(generatedMatchaSeal)) {
      const fileBuffer = fs.readFileSync(generatedMatchaSeal)
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

    return new NextResponse('Wax seal image not found', { status: 404 })
  } catch (error) {
    return new NextResponse('Internal error', { status: 500 })
  }
}
