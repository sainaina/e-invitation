import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET() {
  try {
    const musicDir = path.join(process.cwd(), 'public', 'music')
    if (fs.existsSync(musicDir)) {
      const files = fs.readdirSync(musicDir)
      const mp3File = files.find((f) => f.toLowerCase().endsWith('.mp3'))
      if (mp3File) {
        const filePath = path.join(musicDir, mp3File)
        const fileBuffer = fs.readFileSync(filePath)
        return new NextResponse(fileBuffer, {
          headers: {
            'Content-Type': 'audio/mpeg',
            'Accept-Ranges': 'bytes',
            'Cache-Control': 'public, max-age=31536000, immutable',
          },
        })
      }
    }

    // Check root public directory fallback
    const rootMusicPath = path.join(process.cwd(), 'public', 'song.mp3')
    if (fs.existsSync(rootMusicPath)) {
      const fileBuffer = fs.readFileSync(rootMusicPath)
      return new NextResponse(fileBuffer, {
        headers: {
          'Content-Type': 'audio/mpeg',
          'Accept-Ranges': 'bytes',
          'Cache-Control': 'public, max-age=31536000, immutable',
        },
      })
    }

    return new NextResponse('No music file found in public/music', { status: 404 })
  } catch (err) {
    console.error('Error serving wedding music:', err)
    return new NextResponse('Error loading music', { status: 500 })
  }
}
