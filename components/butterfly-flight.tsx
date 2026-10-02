'use client'

import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  alpha: number
  decay: number
}

export default function ButterflyFlight() {
  const b1Ref = useRef<HTMLDivElement | null>(null)
  const b2Ref = useRef<HTMLDivElement | null>(null)
  const b3Ref = useRef<HTMLDivElement | null>(null)
  const b4Ref = useRef<HTMLDivElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    // Respect user preference for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const canvas = canvasRef.current
    const b1 = b1Ref.current
    const b2 = b2Ref.current
    const b3 = b3Ref.current
    const b4 = b4Ref.current
    if (!b1 || !b2 || !b3 || !b4 || !canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)

    // Master continuous time phase
    let u = 0
    const speed = 0.28 // rad/sec - lively, active, brisk pace

    // Smooth heading angles
    let angle1 = 0
    let angle2 = 0
    let angle3 = 0
    let angle4 = 0

    // Subtle golden fairy dust sparkles
    const particles: Particle[] = []

    let animationId: number
    let lastTime = performance.now()

    const render = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.05)
      lastTime = now

      const isMobile = width < 768
      const cx = width * 0.5
      const cy = height * 0.48

      // Fluid bounding dimensions centered gracefully on the invitation card
      const rx = isMobile ? width * 0.38 : Math.min(width * 0.34, 330)
      const ry = isMobile ? height * 0.32 : Math.min(height * 0.28, 250)

      // Advance phase parameter continuously
      u += speed * dt

      // =========================================================================
      // DISTRIBUTED 4-ZONE LAYOUT ACROSS THE INVITATION
      // =========================================================================

      // ZONE 1: Top Royal Arch & Calligraphy (Butterfly 1 - Small)
      const cx1 = cx
      const cy1 = height * 0.22
      const rx1 = isMobile ? width * 0.32 : Math.min(width * 0.28, 280)
      const ry1 = isMobile ? height * 0.12 : Math.min(height * 0.12, 110)
      const x1 = cx1 + rx1 * Math.sin(u)
      const y1 = cy1 + ry1 * Math.cos(2 * u) * 0.6
      const dx1 = rx1 * Math.cos(u)
      const dy1 = -ry1 * 1.2 * Math.sin(2 * u)

      const targetAngle1 = (Math.atan2(dy1, dx1) * 180) / Math.PI + 90
      let diff1 = targetAngle1 - angle1
      while (diff1 > 180) diff1 -= 360
      while (diff1 < -180) diff1 += 360
      angle1 += diff1 * Math.min(dt * 7.5, 0.18)

      const scale1 = isMobile ? 0.48 : 0.56
      b1.style.transform = `translate3d(${x1}px, ${y1}px, 0) rotate(${angle1}deg) scale(${scale1})`

      // ZONE 2: Right Floral Margin (Butterfly 2 - A bit small)
      const cx2 = cx + (isMobile ? width * 0.27 : Math.min(width * 0.26, 260))
      const cy2 = height * 0.48
      const rx2 = isMobile ? width * 0.14 : Math.min(width * 0.12, 120)
      const ry2 = isMobile ? height * 0.22 : Math.min(height * 0.22, 200)
      const u2 = u * 1.08 + 1.2
      const x2 = cx2 + rx2 * Math.sin(2 * u2) * 0.7
      const y2 = cy2 + ry2 * Math.cos(u2)
      const dx2 = rx2 * 1.08 * 1.4 * Math.cos(2 * u2)
      const dy2 = -ry2 * 1.08 * Math.sin(u2)

      const targetAngle2 = (Math.atan2(dy2, dx2) * 180) / Math.PI + 90
      let diff2 = targetAngle2 - angle2
      while (diff2 > 180) diff2 -= 360
      while (diff2 < -180) diff2 += 360
      angle2 += diff2 * Math.min(dt * 7.5, 0.18)

      const scale2 = isMobile ? 0.38 : 0.43
      b2.style.transform = `translate3d(${x2}px, ${y2}px, 0) rotate(${angle2}deg) scale(${scale2})`

      // ZONE 3: Lower Invitation & Date Area (Butterfly 3 - Small)
      const cx3 = cx
      const cy3 = isMobile ? height * 0.74 : Math.min(height * 0.72, height - 160)
      const rx3 = isMobile ? width * 0.34 : Math.min(width * 0.30, 300)
      const ry3 = isMobile ? height * 0.11 : Math.min(height * 0.11, 100)
      const u3 = u * 0.95 + 2.5
      const x3 = cx3 + rx3 * Math.cos(u3)
      const y3 = cy3 + ry3 * Math.sin(2 * u3) * 0.55
      const dx3 = -rx3 * 0.95 * Math.sin(u3)
      const dy3 = ry3 * 0.95 * 1.1 * Math.cos(2 * u3)

      const targetAngle3 = (Math.atan2(dy3, dx3) * 180) / Math.PI + 90
      let diff3 = targetAngle3 - angle3
      while (diff3 > 180) diff3 -= 360
      while (diff3 < -180) diff3 += 360
      angle3 += diff3 * Math.min(dt * 7.5, 0.18)

      const scale3 = isMobile ? 0.45 : 0.52
      b3.style.transform = `translate3d(${x3}px, ${y3}px, 0) rotate(${angle3}deg) scale(${scale3})`

      // ZONE 4: Left Floral Margin (Butterfly 4 - A bit small)
      const cx4 = cx - (isMobile ? width * 0.27 : Math.min(width * 0.26, 260))
      const cy4 = height * 0.46
      const rx4 = isMobile ? width * 0.14 : Math.min(width * 0.12, 120)
      const ry4 = isMobile ? height * 0.22 : Math.min(height * 0.22, 200)
      const u4 = u * 1.04 + 3.8
      const x4 = cx4 + rx4 * Math.sin(2 * u4) * 0.7
      const y4 = cy4 + ry4 * Math.sin(u4)
      const dx4 = rx4 * 1.04 * 1.4 * Math.cos(2 * u4)
      const dy4 = ry4 * 1.04 * Math.cos(u4)

      const targetAngle4 = (Math.atan2(dy4, dx4) * 180) / Math.PI + 90
      let diff4 = targetAngle4 - angle4
      while (diff4 > 180) diff4 -= 360
      while (diff4 < -180) diff4 += 360
      angle4 += diff4 * Math.min(dt * 7.5, 0.18)

      const scale4 = isMobile ? 0.35 : 0.40
      b4.style.transform = `translate3d(${x4}px, ${y4}px, 0) rotate(${angle4}deg) scale(${scale4})`

      // =========================================================================
      // SUBTLE, NON-MESSY GOLDEN DUST (MINIMAL & GENTLE)
      // =========================================================================
      if (Math.random() < 0.20) {
        const pick = Math.floor(Math.random() * 4)
        const px = pick === 0 ? x1 : pick === 1 ? x2 : pick === 2 ? x3 : x4
        const py = pick === 0 ? y1 : pick === 1 ? y2 : pick === 2 ? y3 : y4
        const pAng = pick === 0 ? angle1 : pick === 1 ? angle2 : pick === 2 ? angle3 : angle4
        const rad = ((pAng + 90) * Math.PI) / 180

        particles.push({
          x: px + Math.cos(rad) * 6 + (Math.random() - 0.5) * 4,
          y: py + Math.sin(rad) * 6 + (Math.random() - 0.5) * 4,
          vx: (Math.random() - 0.5) * 0.25,
          vy: Math.random() * 0.2 + 0.1,
          size: Math.random() * 1.3 + 0.7,
          alpha: 0.7,
          decay: 0.015,
        })
      }

      ctx.clearRect(0, 0, width, height)

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy
        p.alpha -= p.decay

        if (p.alpha <= 0) {
          particles.splice(i, 1)
          continue
        }

        ctx.save()
        ctx.globalAlpha = p.alpha
        ctx.fillStyle = '#FFE082'
        ctx.shadowColor = 'rgba(212, 175, 55, 0.5)'
        ctx.shadowBlur = 3
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }

      animationId = requestAnimationFrame(render)
    }

    animationId = requestAnimationFrame(render)

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[60] overflow-hidden"
      aria-hidden="true"
    >
      {/* Subtle Stardust Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      {/* =================================================================== */}
      {/* BUTTERFLY 1: Small (Warm Champagne Gold & Royal Wine)               */}
      {/* =================================================================== */}
      <div
        ref={b1Ref}
        className="absolute top-0 left-0 -ml-6 -mt-6 h-12 w-12 will-change-transform"
        style={{ perspective: '800px', transformStyle: 'preserve-3d' }}
      >
        <div className="relative flex h-full w-full items-center justify-center">
          <div
            className="absolute right-1/2 top-0 h-12 w-8 origin-right"
            style={{
              animation: 'butterflyFlapLeft 0.22s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite',
              transformStyle: 'preserve-3d',
              backfaceVisibility: 'visible',
            }}
          >
            <svg viewBox="0 0 60 90" className="h-full w-full drop-shadow-[0_2px_4px_rgba(74,23,27,0.3)]" fill="none">
              <defs>
                <linearGradient id="wingGrad1" x1="100%" y1="20%" x2="0%" y2="80%">
                  <stop offset="0%" stopColor="#FFFDF6" stopOpacity="0.95" />
                  <stop offset="45%" stopColor="#F6E7C4" stopOpacity="0.9" />
                  <stop offset="80%" stopColor="#E2BD96" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#6D2026" stopOpacity="0.8" />
                </linearGradient>
                <linearGradient id="veinGrad1" x1="100%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#4A171B" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#5f682a" stopOpacity="0.6" />
                </linearGradient>
              </defs>
              <path d="M 58 45 C 50 25 35 6 12 3 C 2 2 1 12 4 22 C 7 32 15 42 28 50 C 40 57 52 52 58 45 Z" fill="url(#wingGrad1)" stroke="#4A171B" strokeWidth="1.2" />
              <path d="M 56 43 C 44 32 30 18 16 9 M 54 44 C 38 34 22 30 10 24 M 55 46 C 42 45 28 47 18 42" stroke="url(#veinGrad1)" strokeWidth="0.8" strokeLinecap="round" />
              <path d="M 56 46 C 48 54 38 68 28 78 C 22 84 15 88 18 90 C 22 91 30 87 38 80 C 48 71 54 58 56 46 Z" fill="url(#wingGrad1)" stroke="#5f682a" strokeWidth="1.0" />
              <circle cx="8" cy="7" r="1.2" fill="#FFE082" />
              <circle cx="20" cy="85" r="1.1" fill="#FFE082" />
            </svg>
          </div>

          <div className="relative z-10 h-10 w-2.5 flex items-center justify-center">
            <svg viewBox="0 0 20 80" className="h-full w-full drop-shadow-[0_1px_2px_rgba(0,0,0,0.35)]" fill="none">
              <path d="M 10 24 C 7 14 3 6 0 2 M 10 24 C 13 14 17 6 20 2" stroke="#4A171B" strokeWidth="1.3" strokeLinecap="round" />
              <circle cx="0.5" cy="2" r="1.3" fill="#FFE082" />
              <circle cx="19.5" cy="2" r="1.3" fill="#FFE082" />
              <ellipse cx="10" cy="25" rx="3.0" ry="3.0" fill="#4A171B" />
              <ellipse cx="10" cy="34" rx="3.4" ry="5.5" fill="#5f682a" stroke="#4A171B" strokeWidth="0.8" />
              <ellipse cx="10" cy="48" rx="2.6" ry="9.5" fill="#4A171B" />
            </svg>
          </div>

          <div
            className="absolute left-1/2 top-0 h-12 w-8 origin-left"
            style={{
              animation: 'butterflyFlapRight 0.22s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite',
              transformStyle: 'preserve-3d',
              backfaceVisibility: 'visible',
            }}
          >
            <svg viewBox="0 0 60 90" className="h-full w-full drop-shadow-[0_2px_4px_rgba(74,23,27,0.3)]" fill="none" style={{ transform: 'scaleX(-1)' }}>
              <path d="M 58 45 C 50 25 35 6 12 3 C 2 2 1 12 4 22 C 7 32 15 42 28 50 C 40 57 52 52 58 45 Z" fill="url(#wingGrad1)" stroke="#4A171B" strokeWidth="1.2" />
              <path d="M 56 43 C 44 32 30 18 16 9 M 54 44 C 38 34 22 30 10 24 M 55 46 C 42 45 28 47 18 42" stroke="url(#veinGrad1)" strokeWidth="0.8" strokeLinecap="round" />
              <path d="M 56 46 C 48 54 38 68 28 78 C 22 84 15 88 18 90 C 22 91 30 87 38 80 C 48 71 54 58 56 46 Z" fill="url(#wingGrad1)" stroke="#5f682a" strokeWidth="1.0" />
              <circle cx="8" cy="7" r="1.2" fill="#FFE082" />
              <circle cx="20" cy="85" r="1.1" fill="#FFE082" />
            </svg>
          </div>
        </div>
      </div>

      {/* =================================================================== */}
      {/* BUTTERFLY 2: A bit small (Soft Pearl Ivory & Matcha Gold)           */}
      {/* =================================================================== */}
      <div
        ref={b2Ref}
        className="absolute top-0 left-0 -ml-6 -mt-6 h-12 w-12 will-change-transform"
        style={{ perspective: '800px', transformStyle: 'preserve-3d' }}
      >
        <div className="relative flex h-full w-full items-center justify-center">
          <div
            className="absolute right-1/2 top-0 h-12 w-8 origin-right"
            style={{
              animation: 'butterflyFlapLeft 0.18s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite',
              transformStyle: 'preserve-3d',
              backfaceVisibility: 'visible',
            }}
          >
            <svg viewBox="0 0 60 90" className="h-full w-full drop-shadow-[0_2px_4px_rgba(74,23,27,0.25)]" fill="none">
              <defs>
                <linearGradient id="wingGrad2" x1="100%" y1="20%" x2="0%" y2="80%">
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
                  <stop offset="45%" stopColor="#FFF0D4" stopOpacity="0.9" />
                  <stop offset="80%" stopColor="#E6C88A" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#5f682a" stopOpacity="0.75" />
                </linearGradient>
                <linearGradient id="veinGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#4A171B" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#5f682a" stopOpacity="0.55" />
                </linearGradient>
              </defs>
              <path d="M 58 45 C 50 25 35 6 12 3 C 2 2 1 12 4 22 C 7 32 15 42 28 50 C 40 57 52 52 58 45 Z" fill="url(#wingGrad2)" stroke="#4A171B" strokeWidth="1.2" />
              <path d="M 56 43 C 44 32 30 18 16 9 M 54 44 C 38 34 22 30 10 24" stroke="url(#veinGrad2)" strokeWidth="0.8" strokeLinecap="round" />
              <path d="M 56 46 C 48 54 38 68 28 78 C 22 84 15 88 18 90 C 22 91 30 87 38 80 C 48 71 54 58 56 46 Z" fill="url(#wingGrad2)" stroke="#5f682a" strokeWidth="1.0" />
              <circle cx="8" cy="7" r="1.2" fill="#FFE082" />
              <circle cx="20" cy="85" r="1.1" fill="#FFE082" />
            </svg>
          </div>

          <div className="relative z-10 h-10 w-2.5 flex items-center justify-center">
            <svg viewBox="0 0 20 80" className="h-full w-full drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]" fill="none">
              <path d="M 10 24 C 7 14 3 6 0 2 M 10 24 C 13 14 17 6 20 2" stroke="#4A171B" strokeWidth="1.3" strokeLinecap="round" />
              <circle cx="0.5" cy="2" r="1.3" fill="#FFE082" />
              <circle cx="19.5" cy="2" r="1.3" fill="#FFE082" />
              <ellipse cx="10" cy="25" rx="3.0" ry="3.0" fill="#4A171B" />
              <ellipse cx="10" cy="34" rx="3.4" ry="5.5" fill="#5f682a" stroke="#4A171B" strokeWidth="0.8" />
              <ellipse cx="10" cy="48" rx="2.6" ry="9.5" fill="#4A171B" />
            </svg>
          </div>

          <div
            className="absolute left-1/2 top-0 h-12 w-8 origin-left"
            style={{
              animation: 'butterflyFlapRight 0.18s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite',
              transformStyle: 'preserve-3d',
              backfaceVisibility: 'visible',
            }}
          >
            <svg viewBox="0 0 60 90" className="h-full w-full drop-shadow-[0_2px_4px_rgba(74,23,27,0.25)]" fill="none" style={{ transform: 'scaleX(-1)' }}>
              <path d="M 58 45 C 50 25 35 6 12 3 C 2 2 1 12 4 22 C 7 32 15 42 28 50 C 40 57 52 52 58 45 Z" fill="url(#wingGrad2)" stroke="#4A171B" strokeWidth="1.2" />
              <path d="M 56 43 C 44 32 30 18 16 9 M 54 44 C 38 34 22 30 10 24" stroke="url(#veinGrad2)" strokeWidth="0.8" strokeLinecap="round" />
              <path d="M 56 46 C 48 54 38 68 28 78 C 22 84 15 88 18 90 C 22 91 30 87 38 80 C 48 71 54 58 56 46 Z" fill="url(#wingGrad2)" stroke="#5f682a" strokeWidth="1.0" />
              <circle cx="8" cy="7" r="1.2" fill="#FFE082" />
              <circle cx="20" cy="85" r="1.1" fill="#FFE082" />
            </svg>
          </div>
        </div>
      </div>

      {/* =================================================================== */}
      {/* BUTTERFLY 3: Small (Romantic Blush Rose & Champagne Gold)           */}
      {/* =================================================================== */}
      <div
        ref={b3Ref}
        className="absolute top-0 left-0 -ml-6 -mt-6 h-12 w-12 will-change-transform"
        style={{ perspective: '800px', transformStyle: 'preserve-3d' }}
      >
        <div className="relative flex h-full w-full items-center justify-center">
          <div
            className="absolute right-1/2 top-0 h-12 w-8 origin-right"
            style={{
              animation: 'butterflyFlapLeft 0.20s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite',
              transformStyle: 'preserve-3d',
              backfaceVisibility: 'visible',
            }}
          >
            <svg viewBox="0 0 60 90" className="h-full w-full drop-shadow-[0_2px_4px_rgba(74,23,27,0.28)]" fill="none">
              <defs>
                <linearGradient id="wingGrad3" x1="100%" y1="20%" x2="0%" y2="80%">
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
                  <stop offset="40%" stopColor="#FDE3E9" stopOpacity="0.9" />
                  <stop offset="75%" stopColor="#E6B4BE" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#9B2C38" stopOpacity="0.8" />
                </linearGradient>
                <linearGradient id="veinGrad3" x1="100%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#4A171B" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#5f682a" stopOpacity="0.5" />
                </linearGradient>
              </defs>
              <path d="M 58 45 C 50 25 35 6 12 3 C 2 2 1 12 4 22 C 7 32 15 42 28 50 C 40 57 52 52 58 45 Z" fill="url(#wingGrad3)" stroke="#4A171B" strokeWidth="1.2" />
              <path d="M 56 43 C 44 32 30 18 16 9 M 54 44 C 38 34 22 30 10 24 M 55 46 C 42 45 28 47 18 42" stroke="url(#veinGrad3)" strokeWidth="0.8" strokeLinecap="round" />
              <path d="M 56 46 C 48 54 38 68 28 78 C 22 84 15 88 18 90 C 22 91 30 87 38 80 C 48 71 54 58 56 46 Z" fill="url(#wingGrad3)" stroke="#5f682a" strokeWidth="1.0" />
              <circle cx="8" cy="7" r="1.2" fill="#FFE082" />
              <circle cx="20" cy="85" r="1.1" fill="#FFE082" />
            </svg>
          </div>

          <div className="relative z-10 h-10 w-2.5 flex items-center justify-center">
            <svg viewBox="0 0 20 80" className="h-full w-full drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]" fill="none">
              <path d="M 10 24 C 7 14 3 6 0 2 M 10 24 C 13 14 17 6 20 2" stroke="#4A171B" strokeWidth="1.3" strokeLinecap="round" />
              <circle cx="0.5" cy="2" r="1.3" fill="#FFE082" />
              <circle cx="19.5" cy="2" r="1.3" fill="#FFE082" />
              <ellipse cx="10" cy="25" rx="3.0" ry="3.0" fill="#4A171B" />
              <ellipse cx="10" cy="34" rx="3.4" ry="5.5" fill="#5f682a" stroke="#4A171B" strokeWidth="0.8" />
              <ellipse cx="10" cy="48" rx="2.6" ry="9.5" fill="#4A171B" />
            </svg>
          </div>

          <div
            className="absolute left-1/2 top-0 h-12 w-8 origin-left"
            style={{
              animation: 'butterflyFlapRight 0.20s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite',
              transformStyle: 'preserve-3d',
              backfaceVisibility: 'visible',
            }}
          >
            <svg viewBox="0 0 60 90" className="h-full w-full drop-shadow-[0_2px_4px_rgba(74,23,27,0.28)]" fill="none" style={{ transform: 'scaleX(-1)' }}>
              <path d="M 58 45 C 50 25 35 6 12 3 C 2 2 1 12 4 22 C 7 32 15 42 28 50 C 40 57 52 52 58 45 Z" fill="url(#wingGrad3)" stroke="#4A171B" strokeWidth="1.2" />
              <path d="M 56 43 C 44 32 30 18 16 9 M 54 44 C 38 34 22 30 10 24 M 55 46 C 42 45 28 47 18 42" stroke="url(#veinGrad3)" strokeWidth="0.8" strokeLinecap="round" />
              <path d="M 56 46 C 48 54 38 68 28 78 C 22 84 15 88 18 90 C 22 91 30 87 38 80 C 48 71 54 58 56 46 Z" fill="url(#wingGrad3)" stroke="#5f682a" strokeWidth="1.0" />
              <circle cx="8" cy="7" r="1.2" fill="#FFE082" />
              <circle cx="20" cy="85" r="1.1" fill="#FFE082" />
            </svg>
          </div>
        </div>
      </div>

      {/* =================================================================== */}
      {/* BUTTERFLY 4: A bit small (Luminous Honey Amber & Champagne)         */}
      {/* =================================================================== */}
      <div
        ref={b4Ref}
        className="absolute top-0 left-0 -ml-6 -mt-6 h-12 w-12 will-change-transform"
        style={{ perspective: '800px', transformStyle: 'preserve-3d' }}
      >
        <div className="relative flex h-full w-full items-center justify-center">
          <div
            className="absolute right-1/2 top-0 h-12 w-8 origin-right"
            style={{
              animation: 'butterflyFlapLeft 0.16s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite',
              transformStyle: 'preserve-3d',
              backfaceVisibility: 'visible',
            }}
          >
            <svg viewBox="0 0 60 90" className="h-full w-full drop-shadow-[0_2px_4px_rgba(74,23,27,0.22)]" fill="none">
              <defs>
                <linearGradient id="wingGrad4" x1="100%" y1="20%" x2="0%" y2="80%">
                  <stop offset="0%" stopColor="#FFFDF2" stopOpacity="0.95" />
                  <stop offset="45%" stopColor="#FDEAB8" stopOpacity="0.9" />
                  <stop offset="80%" stopColor="#ECC272" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#873528" stopOpacity="0.75" />
                </linearGradient>
                <linearGradient id="veinGrad4" x1="100%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#4A171B" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#5f682a" stopOpacity="0.5" />
                </linearGradient>
              </defs>
              <path d="M 58 45 C 50 25 35 6 12 3 C 2 2 1 12 4 22 C 7 32 15 42 28 50 C 40 57 52 52 58 45 Z" fill="url(#wingGrad4)" stroke="#4A171B" strokeWidth="1.2" />
              <path d="M 56 43 C 44 32 30 18 16 9 M 54 44 C 38 34 22 30 10 24" stroke="url(#veinGrad4)" strokeWidth="0.8" strokeLinecap="round" />
              <path d="M 56 46 C 48 54 38 68 28 78 C 22 84 15 88 18 90 C 22 91 30 87 38 80 C 48 71 54 58 56 46 Z" fill="url(#wingGrad4)" stroke="#5f682a" strokeWidth="1.0" />
              <circle cx="8" cy="7" r="1.2" fill="#FFE082" />
              <circle cx="20" cy="85" r="1.1" fill="#FFE082" />
            </svg>
          </div>

          <div className="relative z-10 h-10 w-2.5 flex items-center justify-center">
            <svg viewBox="0 0 20 80" className="h-full w-full drop-shadow-[0_1px_2px_rgba(0,0,0,0.25)]" fill="none">
              <path d="M 10 24 C 7 14 3 6 0 2 M 10 24 C 13 14 17 6 20 2" stroke="#4A171B" strokeWidth="1.3" strokeLinecap="round" />
              <circle cx="0.5" cy="2" r="1.3" fill="#FFE082" />
              <circle cx="19.5" cy="2" r="1.3" fill="#FFE082" />
              <ellipse cx="10" cy="25" rx="3.0" ry="3.0" fill="#4A171B" />
              <ellipse cx="10" cy="34" rx="3.4" ry="5.5" fill="#5f682a" stroke="#4A171B" strokeWidth="0.8" />
              <ellipse cx="10" cy="48" rx="2.6" ry="9.5" fill="#4A171B" />
            </svg>
          </div>

          <div
            className="absolute left-1/2 top-0 h-12 w-8 origin-left"
            style={{
              animation: 'butterflyFlapRight 0.16s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite',
              transformStyle: 'preserve-3d',
              backfaceVisibility: 'visible',
            }}
          >
            <svg viewBox="0 0 60 90" className="h-full w-full drop-shadow-[0_2px_4px_rgba(74,23,27,0.22)]" fill="none" style={{ transform: 'scaleX(-1)' }}>
              <path d="M 58 45 C 50 25 35 6 12 3 C 2 2 1 12 4 22 C 7 32 15 42 28 50 C 40 57 52 52 58 45 Z" fill="url(#wingGrad4)" stroke="#4A171B" strokeWidth="1.2" />
              <path d="M 56 43 C 44 32 30 18 16 9 M 54 44 C 38 34 22 30 10 24" stroke="url(#veinGrad4)" strokeWidth="0.8" strokeLinecap="round" />
              <path d="M 56 46 C 48 54 38 68 28 78 C 22 84 15 88 18 90 C 22 91 30 87 38 80 C 48 71 54 58 56 46 Z" fill="url(#wingGrad4)" stroke="#5f682a" strokeWidth="1.0" />
              <circle cx="8" cy="7" r="1.2" fill="#FFE082" />
              <circle cx="20" cy="85" r="1.1" fill="#FFE082" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}
