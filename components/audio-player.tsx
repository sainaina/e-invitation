'use client'

import { useEffect, useRef, useState } from 'react'
import { Music, Pause, Play, Volume2, VolumeX, UploadCloud } from 'lucide-react'

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [songTitle, setSongTitle] = useState('Canon In D • Harp')
  const [hasCustomSong, setHasCustomSong] = useState(false)

  const mediaRef = useRef<HTMLVideoElement | HTMLAudioElement | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const audioCtxRef = useRef<AudioContext | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const noteIndexRef = useRef(0)

  // Romantic wedding progression in D major / Canon in D style (Fallback)
  const notes = [
    293.66, 369.99, 440.0, 587.33,
    220.0, 277.18, 329.63, 440.0,
    246.94, 293.66, 369.99, 493.88,
    185.0, 220.0, 277.18, 369.99,
    196.0, 246.94, 293.66, 392.0,
    146.83, 185.0, 220.0, 293.66,
    196.0, 246.94, 293.66, 392.0,
    220.0, 277.18, 329.63, 440.0,
  ]

  const playHarpNote = (freq: number) => {
    if (!audioCtxRef.current || isMuted) return
    const ctx = audioCtxRef.current
    if (ctx.state === 'suspended') {
      ctx.resume()
    }

    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    const filter = ctx.createBiquadFilter()

    osc.type = 'sine'
    osc.frequency.setValueAtTime(freq, ctx.currentTime)

    filter.type = 'lowpass'
    filter.frequency.setValueAtTime(1400, ctx.currentTime)

    gain.gain.setValueAtTime(0.001, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.18, ctx.currentTime + 0.04)
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.8)

    osc.connect(filter)
    filter.connect(gain)
    gain.connect(ctx.destination)

    osc.start(ctx.currentTime)
    osc.stop(ctx.currentTime + 1.9)
  }

  const startFallbackHarp = () => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      audioCtxRef.current = new AudioCtx()
    }

    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume()
    }

    setIsPlaying(true)
    if (intervalRef.current) clearInterval(intervalRef.current)

    intervalRef.current = setInterval(() => {
      const freq = notes[noteIndexRef.current % notes.length]
      playHarpNote(freq)
      noteIndexRef.current = (noteIndexRef.current + 1) % notes.length
    }, 450)
  }

  const stopFallbackHarp = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }

  const startMusic = async () => {
    if (hasCustomSong && mediaRef.current) {
      try {
        mediaRef.current.muted = isMuted
        await mediaRef.current.play()
        setIsPlaying(true)
        stopFallbackHarp()
        return
      } catch (err) {
        console.warn('Custom song playback failed, falling back to harp:', err)
      }
    }

    // Default or fallback to romantic harp
    startFallbackHarp()
  }

  const stopMusic = () => {
    setIsPlaying(false)
    if (mediaRef.current) {
      mediaRef.current.pause()
    }
    stopFallbackHarp()
  }

  const togglePlay = () => {
    if (isPlaying) {
      stopMusic()
    } else {
      startMusic()
    }
  }

  const toggleMute = () => {
    const nextMute = !isMuted
    setIsMuted(nextMute)
    if (mediaRef.current) {
      mediaRef.current.muted = nextMute
    }
  }

  // Handle manual file selection of MP4/MP3 from user's computer or device
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const objectUrl = URL.createObjectURL(file)
    if (mediaRef.current) {
      mediaRef.current.src = objectUrl
      mediaRef.current.load()
      mediaRef.current.play().then(() => {
        setIsPlaying(true)
        stopFallbackHarp()
      }).catch(console.warn)
    }

    setHasCustomSong(true)
    // Clean display title without extension
    const cleanName = file.name.replace(/\.[^/.]+$/, '')
    setSongTitle(cleanName.length > 22 ? cleanName.slice(0, 20) + '...' : cleanName)
  }

  // Check on mount if public/song.mp4 or public/wedding-song.mp4 exists
  useEffect(() => {
    const checkDefaultSong = async () => {
      const candidates = ['/song.mp4', '/wedding-song.mp4', '/song.mp3', '/wedding-song.mp3']
      for (const path of candidates) {
        try {
          const res = await fetch(path, { method: 'HEAD' })
          if (res.ok && res.status !== 404) {
            if (mediaRef.current) {
              mediaRef.current.src = path
              mediaRef.current.load()
              setHasCustomSong(true)
              setSongTitle(path.includes('wedding') ? 'Wedding Song' : 'Our Song (MP4)')
              break
            }
          }
        } catch {
          // Continue to next candidate
        }
      }
    }

    checkDefaultSong()
  }, [])

  // Auto-play trigger when envelope opens
  useEffect(() => {
    const handleStartMusic = () => {
      startMusic()
    }
    window.addEventListener('play-wedding-music', handleStartMusic)

    return () => {
      window.removeEventListener('play-wedding-music', handleStartMusic)
      stopFallbackHarp()
      if (audioCtxRef.current) audioCtxRef.current.close()
    }
  }, [hasCustomSong])

  return (
    <>
      {/* Hidden media element that plays the user's MP4 video or audio song */}
      <video
        ref={(el) => {
          mediaRef.current = el
        }}
        loop
        playsInline
        preload="auto"
        className="hidden"
        onEnded={() => {
          if (mediaRef.current) {
            mediaRef.current.currentTime = 0
            mediaRef.current.play().catch(console.warn)
          }
        }}
      />

      {/* Hidden file input for uploading .mp4 or .mp3 */}
      <input
        type="file"
        ref={fileInputRef}
        accept="video/mp4,video/*,audio/mp4,audio/mp3,audio/*,.mp4,.mp3,.m4a"
        className="hidden"
        onChange={handleFileSelect}
      />

      <div className="fixed bottom-4 right-4 z-40 flex items-center gap-1.5 sm:gap-2">
        {/* Floating music status pill */}
        <button
          onClick={togglePlay}
          className={`group flex items-center gap-2 rounded-full border border-[#330404]/60 bg-[#FAF7F2]/95 px-3 py-1.5 shadow-lg backdrop-blur transition-all duration-300 hover:scale-105 hover:border-[#330404] ${isPlaying ? 'ring-2 ring-[#330404]/30' : ''
            }`}
          aria-label={isPlaying ? 'Pause wedding song' : 'Play wedding song'}
        >
          {/* Spinning Vinyl Record */}
          <div className="relative flex h-8 w-8 items-center justify-center">
            <div
              className={`h-8 w-8 rounded-full border-2 border-[#330404] bg-gradient-to-tr from-[#5f682a] to-[#330404] shadow-sm ${isPlaying ? 'animate-spin' : ''
                }`}
              style={{ animationDuration: '4s' }}
            >
              <div className="absolute inset-1.5 rounded-full border border-[#330404]/40 bg-[#FAF7F2] flex items-center justify-center">
                <div className="h-2 w-2 rounded-full bg-[#330404]" />
              </div>
            </div>
            {isPlaying && (
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#330404] opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#330404]" />
              </span>
            )}
          </div>

          {/* Text and Song indicator */}
          <div className="text-left leading-tight pr-1">
            <p className="font-great-vibes text-sm font-bold text-[#330404]">
              {isPlaying ? 'Playing Wedding Song' : 'Play Wedding Song'}
            </p>
            <p className="font-cinzel text-[8px] uppercase tracking-wider text-[#5f682a] truncate max-w-[130px]">
              {songTitle}
            </p>
          </div>

          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#330404] text-white">
            {isPlaying ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3 ml-0.5 fill-current" />}
          </div>
        </button>

        {/* Change / Add MP4 Song Button */}
        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex h-8 items-center gap-1 rounded-full border border-[#330404]/40 bg-[#FAF7F2]/90 px-2.5 text-[#330404] shadow backdrop-blur transition hover:scale-105 hover:bg-[#330404] hover:text-white"
          title="ជ្រើសរើសចម្រៀង MP4 / Choose MP4 Song"
          aria-label="Upload custom MP4 or audio file"
        >
          <UploadCloud className="h-3.5 w-3.5" />
          <span className="font-cinzel text-[9px] font-bold tracking-wider hidden sm:inline">
            {hasCustomSong ? 'CHANGE MP4' : 'ADD MP4'}
          </span>
        </button>

        {/* Mute button */}
        {isPlaying && (
          <button
            onClick={toggleMute}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-[#330404]/40 bg-[#FAF7F2]/90 text-[#5f682a] shadow backdrop-blur hover:text-[#330404]"
            aria-label={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
          </button>
        )}
      </div>
    </>
  )
}
