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
        <div className="fixed bottom-4 right-4 z-40">
          {/* Single Luxury Floating Play/Pause Button */}
          <button
            onClick={togglePlay}
            className={`group relative flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 ${
              isPlaying
                ? 'bg-[#330404] text-white border-2 border-[#5f682a] ring-2 ring-[#5f682a]/50 shadow-[0_4px_20px_rgba(51,4,4,0.4)]'
                : 'bg-[#FAF7F2]/95 text-[#330404] border-2 border-[#330404]/70 backdrop-blur-md ring-2 ring-[#5f682a]/30 hover:border-[#330404] shadow-lg'
            }`}
            aria-label={isPlaying ? 'ផ្អាកតន្ត្រី (Pause music)' : 'ចាក់តន្ត្រី (Play music)'}
            title={isPlaying ? 'Pause music' : 'Play music'}
          >
            {/* Spinning Matcha Accent Ring When Playing */}
            {isPlaying && (
              <span
                className="pointer-events-none absolute -inset-1 rounded-full border border-dashed border-[#5f682a]/70 animate-spin"
                style={{ animationDuration: '6s' }}
              />
            )}

            {/* Glowing Active Audio Pulse */}
            {isPlaying && (
              <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#5f682a] opacity-75" />
                <span className="relative inline-flex h-3 w-3 rounded-full border border-[#330404] bg-[#5f682a]" />
              </span>
            )}

            {/* Icon */}
            {isPlaying ? (
              <Pause className="h-4 w-4 sm:h-5 sm:w-5 fill-current text-[#a4b248] transition-transform group-hover:scale-110" />
            ) : (
              <Play className="h-4 w-4 sm:h-5 sm:w-5 ml-0.5 fill-current text-[#330404] transition-transform group-hover:scale-110" />
            )}
          </button>
        </div>
      )}
    </>
  )
}
