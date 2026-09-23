'use client'

import { useEffect, useRef, useState } from 'react'
import { Pause, Play, Volume2, VolumeX } from 'lucide-react'

interface AudioPlayerProps {
  isOpen?: boolean
}

export default function AudioPlayer({ isOpen = true }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
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
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
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
    if (audioRef.current) {
      try {
        audioRef.current.muted = isMuted
        await audioRef.current.play()
        setIsPlaying(true)
        stopFallbackHarp()
        return
      } catch (err) {
        console.warn('Audio play failed, falling back to harp:', err)
      }
    }

    // Fallback to romantic harp if audio fails
    startFallbackHarp()
  }

  const stopMusic = () => {
    setIsPlaying(false)
    if (audioRef.current) {
      audioRef.current.pause()
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
    if (audioRef.current) {
      audioRef.current.muted = nextMute
    }
  }

  // Pre-load wedding music from API
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = '/api/wedding-music'
      audioRef.current.load()
    }
  }, [])

  // Auto-play listener when envelope opens
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
  }, [isMuted])

  return (
    <>
      {/* HTML5 Audio element loading the user's MP3 from /public/music */}
      <audio
        ref={audioRef}
        loop
        preload="auto"
        className="hidden"
        onEnded={() => {
          if (audioRef.current) {
            audioRef.current.currentTime = 0
            audioRef.current.play().catch(console.warn)
          }
        }}
      />

      {isOpen && (
        <div className="fixed bottom-4 right-4 z-40 flex items-center gap-1.5 sm:gap-2">
          {/* Minimal Luxury Floating Music Controller (NO TEXT TITLE) */}
          <div className="flex items-center gap-1.5 rounded-full border border-[#330404]/50 bg-[#FAF7F2]/95 p-1.5 shadow-xl backdrop-blur-md transition-all hover:border-[#330404] ring-1 ring-[#5f682a]/30">
            {/* Play/Pause Button with Spinning Vinyl */}
            <button
              onClick={togglePlay}
              className="group flex items-center gap-2 rounded-full p-1 transition-all hover:bg-[#330404]/5"
              aria-label={isPlaying ? 'Pause music' : 'Play music'}
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {/* Spinning Vinyl Record */}
              <div className="relative flex h-8 w-8 items-center justify-center">
                <div
                  className={`h-8 w-8 rounded-full border-2 border-[#330404] bg-gradient-to-tr from-[#5f682a] to-[#330404] shadow-sm ${
                    isPlaying ? 'animate-spin' : ''
                  }`}
                  style={{ animationDuration: '3.5s' }}
                >
                  <div className="absolute inset-1.5 rounded-full border border-[#330404]/40 bg-[#FAF7F2] flex items-center justify-center">
                    <div className="h-1.5 w-1.5 rounded-full bg-[#330404]" />
                  </div>
                </div>
                {isPlaying && (
                  <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#330404] opacity-75" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#330404]" />
                  </span>
                )}
              </div>

              {/* Play/Pause Icon Badge */}
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#330404] text-white shadow-sm transition-transform group-hover:scale-110">
                {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5 ml-0.5 fill-current" />}
              </div>
            </button>

            {/* Mute/Unmute Button */}
            <button
              onClick={toggleMute}
              className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full border border-[#330404]/30 bg-white text-[#5f682a] shadow-xs transition hover:scale-110 hover:text-[#330404]"
              aria-label={isMuted ? 'Unmute' : 'Mute'}
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-red-700" /> : <Volume2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />}
            </button>
          </div>
        </div>
      )}
    </>
  )
}
