'use client'

import { useEffect, useRef, useState } from 'react'
import { Music, Pause, Play, Volume2, VolumeX } from 'lucide-react'

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const audioCtxRef = useRef<AudioContext | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const noteIndexRef = useRef(0)

  // Romantic wedding progression in D major / Canon in D style
  const notes = [
    // D4, F#4, A4, D5
    293.66, 369.99, 440.0, 587.33,
    // A3, C#4, E4, A4
    220.0, 277.18, 329.63, 440.0,
    // B3, D4, F#4, B4
    246.94, 293.66, 369.99, 493.88,
    // F#3, A3, C#4, F#4
    185.0, 220.0, 277.18, 369.99,
    // G3, B3, D4, G4
    196.0, 246.94, 293.66, 392.0,
    // D3, F#3, A3, D4
    146.83, 185.0, 220.0, 293.66,
    // G3, B3, D4, G4
    196.0, 246.94, 293.66, 392.0,
    // A3, C#4, E4, A4
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

    // Soft warm filter for music box / harp acoustic tone
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

  const startMusic = () => {
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

  const stopMusic = () => {
    setIsPlaying(false)
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }

  const togglePlay = () => {
    if (isPlaying) {
      stopMusic()
    } else {
      startMusic()
    }
  }

  useEffect(() => {
    const handleStartMusic = () => {
      startMusic()
    }
    window.addEventListener('play-wedding-music', handleStartMusic)

    return () => {
      window.removeEventListener('play-wedding-music', handleStartMusic)
      if (intervalRef.current) clearInterval(intervalRef.current)
      if (audioCtxRef.current) audioCtxRef.current.close()
    }
  }, [])

  return (
    <div className="fixed bottom-4 right-4 z-40 flex items-center gap-2">
      {/* Floating music status pill */}
      <button
        onClick={togglePlay}
        className={`group flex items-center gap-2.5 rounded-full border border-[#330404]/60 bg-[#FAF7F2]/95 px-3 py-1.5 shadow-lg backdrop-blur transition-all duration-300 hover:scale-105 hover:border-[#330404] ${isPlaying ? 'ring-2 ring-[#330404]/30' : ''
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

        {/* Text and Play indicator */}
        <div className="text-left leading-tight pr-1">
          <p className="font-great-vibes text-sm font-bold text-[#330404]">
            {isPlaying ? 'Playing Wedding Song' : 'Play Romantic Music'}
          </p>
          <p className="font-cinzel text-[8px] uppercase tracking-wider text-[#5f682a]">Canon In D • Harp</p>
        </div>

        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#330404] text-white">
          {isPlaying ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3 ml-0.5 fill-current" />}
        </div>
      </button>

      {/* Mute button */}
      {isPlaying && (
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-[#330404]/40 bg-[#FAF7F2]/90 text-[#5f682a] shadow backdrop-blur hover:text-[#330404]"
          aria-label={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
        </button>
      )}
    </div>
  )
}
