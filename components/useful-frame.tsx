'use client'

import { useState, useEffect } from 'react'
import { ArrowUp, Mail } from 'lucide-react'

interface UsefulFrameProps {
  children: React.ReactNode
  onReopenEnvelope: () => void
}

export default function UsefulFrame({ children, onReopenEnvelope }: UsefulFrameProps) {
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 350)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="relative mx-auto w-full min-h-screen sm:min-h-0 sm:max-w-xl md:max-w-2xl lg:max-w-3xl px-0 sm:px-4 sm:py-8">
      {/* 
        Main Royal Invitation Card Container 
        Full-screen edge-to-edge on phone, luxury framed stationery on tablet/desktop.
        Curated colors: Primary #330404 (Deep Red Wine) and #5f682a (Matcha Green)
      */}
      <div className="relative w-full min-h-screen sm:min-h-0 overflow-hidden rounded-none sm:rounded-[40px] shadow-none sm:shadow-[0_30px_90px_-15px_rgba(25,5,5,0.85)] border-0 sm:border-2 sm:border-[#330404]/50 bg-[#FAF7F2]/60 ring-4 ring-[#c5a059]/35">

        {/* Corner Filigree Accents in #330404 */}
      <div className="pointer-events-none absolute top-3 left-3 z-30 font-cinzel text-xs text-[#330404]/60 select-none">❧</div>
      <div className="pointer-events-none absolute top-3 right-3 z-30 font-cinzel text-xs text-[#330404]/60 select-none scale-x-[-1]">❧</div>
      <div className="pointer-events-none absolute bottom-3 left-3 z-30 font-cinzel text-xs text-[#330404]/60 select-none scale-y-[-1]">❧</div>
      <div className="pointer-events-none absolute bottom-3 right-3 z-30 font-cinzel text-xs text-[#330404]/60 select-none rotate-180">❧</div>

      {/* Double inner gold & crimson border */}
      <div className="pointer-events-none absolute inset-2 sm:inset-2.5 z-20 rounded-none sm:rounded-[32px] border border-[#330404]/35" />
      <div className="pointer-events-none absolute inset-3 sm:inset-3.5 z-20 rounded-none sm:rounded-[28px] border border-[#5f682a]/35" />

      {/* Invitation Content Layer */}
      <div className="relative z-10 font-moulpali">
        {children}
      </div>
    </div>

      {/* Floating Re-Open Envelope Action Button (Discreet at bottom-left) */}
      <button
        onClick={onReopenEnvelope}
        className="fixed bottom-4 left-4 z-40 flex items-center gap-1.5 rounded-full border border-[#330404] bg-[#FAF7F2]/95 px-3 py-1.5 text-xs font-moulpali text-[#330404] shadow-lg backdrop-blur transition-all hover:scale-105 hover:bg-[#330404] hover:text-white"
        title="បត់លិខិតអញ្ជើញឡើងវិញ"
        aria-label="Re-fold envelope"
      >
        <Mail className="h-3.5 w-3.5" />
        <span className="text-[11px]">បើកស្រោមសំបុត្រឡើងវិញ</span>
      </button>

      {/* Back to Top Floating Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-16 right-4 z-40 flex h-9 w-9 items-center justify-center rounded-full border border-[#330404]/60 bg-[#FAF7F2]/95 text-[#330404] shadow-md backdrop-blur transition-all hover:scale-110 hover:bg-[#330404] hover:text-white"
          aria-label="Back to top"
        >
          <ArrowUp className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}