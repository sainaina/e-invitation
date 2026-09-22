'use client'

import { useEffect, useRef, useState } from 'react'
import { Sparkles } from 'lucide-react'

interface Petal {
  x: number
  y: number
  size: number
  speedY: number
  speedX: number
  rotation: number
  rotationSpeed: number
  opacity: number
  type: 'rose' | 'matcha' | 'sparkle'
}

export default function FloatingPetals() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [enabled, setEnabled] = useState(true)

  useEffect(() => {
    if (!enabled) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)

    // Generate balanced petals: pink rose petals, matcha leaves, and gold sparkles
    const count = window.innerWidth < 768 ? 22 : 38
    const petals: Petal[] = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 10 + 8,
      speedY: Math.random() * 0.8 + 0.5,
      speedX: (Math.random() - 0.5) * 0.7,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 1.5,
      opacity: Math.random() * 0.4 + 0.35,
      type: Math.random() > 0.55 ? 'rose' : Math.random() > 0.25 ? 'matcha' : 'sparkle',
    }))

    const render = () => {
      ctx.clearRect(0, 0, width, height)

      for (const p of petals) {
        p.y += p.speedY
        p.x += Math.sin(p.y * 0.008) * 0.6 + p.speedX
        p.rotation += p.rotationSpeed

        if (p.y > height + 20) {
          p.y = -20
          p.x = Math.random() * width
        }
        if (p.x > width + 20) p.x = -20
        if (p.x < -20) p.x = width + 20

        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate((p.rotation * Math.PI) / 180)
        ctx.globalAlpha = p.opacity

        if (p.type === 'rose') {
          // Soft pink/crimson rose petal
          ctx.beginPath()
          ctx.fillStyle = '#E89CA8'
          ctx.ellipse(0, 0, p.size * 0.7, p.size * 1.1, 0, 0, Math.PI * 2)
          ctx.fill()
          // Inner gradient vein
          ctx.beginPath()
          ctx.fillStyle = 'rgba(180, 50, 70, 0.25)'
          ctx.ellipse(0, 0, p.size * 0.4, p.size * 0.8, 0, 0, Math.PI * 2)
          ctx.fill()
        } else if (p.type === 'matcha') {
          // Matcha green leaf
          ctx.beginPath()
          ctx.fillStyle = '#7A9A70'
          ctx.moveTo(0, -p.size)
          ctx.quadraticCurveTo(p.size * 0.8, 0, 0, p.size)
          ctx.quadraticCurveTo(-p.size * 0.8, 0, 0, -p.size)
          ctx.fill()
          // Leaf vein
          ctx.strokeStyle = 'rgba(46, 68, 42, 0.35)'
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.moveTo(0, -p.size * 0.8)
          ctx.lineTo(0, p.size * 0.8)
          ctx.stroke()
        } else {
          // Gilded gold sparkle
          ctx.fillStyle = '#E6C975'
          ctx.beginPath()
          ctx.arc(0, 0, p.size * 0.25, 0, Math.PI * 2)
          ctx.fill()
        }

        ctx.restore()
      }

      animationId = requestAnimationFrame(render)
    }

    animationId = requestAnimationFrame(render)

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationId)
    }
  }, [enabled])

  return (
    <>
      {enabled && (
        <canvas
          ref={canvasRef}
          className="pointer-events-none fixed inset-0 z-20 h-full w-full"
          aria-hidden="true"
        />
      )}
      <button
        onClick={() => setEnabled(!enabled)}
        title={enabled ? 'Pause floating petals' : 'Play floating petals'}
        className="fixed bottom-4 left-4 z-40 flex h-9 w-9 items-center justify-center rounded-full border border-[#D4AF37]/50 bg-[#FAF7F2]/90 text-[#4E6B47] shadow-md backdrop-blur transition-all hover:scale-110 hover:border-[#8E2134] hover:text-[#8E2134]"
        aria-label="Toggle floating petals"
      >
        <Sparkles className={`h-4 w-4 ${enabled ? 'text-[#8E2134]' : 'opacity-40'}`} />
      </button>
    </>
  )
}
