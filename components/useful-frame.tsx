'use client'

import { useState, useEffect } from 'react'
import { ArrowUp, Mail } from 'lucide-react'

interface UsefulFrameProps {
  children: React.ReactNode
  onReopenEnvelope: () => void
  showActions?: boolean
}

export default function UsefulFrame({ children, onReopenEnvelope, showActions = true }: UsefulFrameProps) {
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
    <div className="relative mx-auto w-full min-h-screen px-0 sm:px-6 md:px-8 lg:px-12 py-0 sm:py-6 lg:py-10 max-w-5xl lg:max-w-6xl xl:max-w-7xl">
      {/* 
        Main Royal Invitation Card Container 
        Full-screen edge-to-edge on mobile phone, expansive luxury framed stationery on tablet/desktop.
        Curated colors: Primary #4A171B (Deep Wine) and #5f682a (Matcha Green)
        Seamless transparent background matching open invitation cover
      */}
      <div className="relative w-full min-h-screen overflow-hidden rounded-none sm:rounded-[36px] lg:rounded-[44px] shadow-none sm:shadow-[0_20px_60px_-15px_rgba(74,23,27,0.25)] border-0 sm:border-2 sm:border-[#4A171B]/40 bg-transparent ring-0 sm:ring-2 sm:ring-[#5f682a]/25">

        {/* Corner Filigree Accents in #5f682a */}
        <div className="pointer-events-none absolute top-3 sm:top-5 left-3 sm:left-5 z-30 font-cinzel text-xs sm:text-sm text-[#5f682a] select-none">❧</div>
        <div className="pointer-events-none absolute top-3 sm:top-5 right-3 sm:right-5 z-30 font-cinzel text-xs sm:text-sm text-[#5f682a] select-none scale-x-[-1]">❧</div>
        <div className="pointer-events-none absolute bottom-3 sm:bottom-5 left-3 sm:left-5 z-30 font-cinzel text-xs sm:text-sm text-[#5f682a] select-none scale-y-[-1]">❧</div>
        <div className="pointer-events-none absolute bottom-3 sm:bottom-5 right-3 sm:right-5 z-30 font-cinzel text-xs sm:text-sm text-[#5f682a] select-none rotate-180">❧</div>

        {/* Double inner matcha & wine border */}
        <div className="pointer-events-none absolute inset-2 sm:inset-3 lg:inset-4 z-20 rounded-none sm:rounded-[28px] lg:rounded-[36px] border border-[#4A171B]/25" />
        <div className="pointer-events-none absolute inset-3 sm:inset-4.5 lg:inset-6 z-20 rounded-none sm:rounded-[24px] lg:rounded-[32px] border border-[#5f682a]/25" />

        {/* Invitation Content Layer */}
        <div className="relative z-10 font-moulpali">
          {children}
        </div>
      </div>

      {/* Floating Re-Open Envelope Action Button (Discreet at bottom-left, only shown when fully open) */}
      {showActions && (
        <button
          onClick={onReopenEnvelope}
          className="fixed bottom-4 left-4 z-40 flex items-center gap-2 rounded-full border-2 border-[#5f682a]/70 bg-[#FAF7F2]/95 backdrop-blur-md px-3.5 py-1.5 text-xs font-moulpali text-[#4A171B] shadow-[0_8px_20px_rgba(74,23,27,0.2)] transition-all duration-500 hover:scale-105 hover:bg-[#4A171B] hover:text-white hover:border-[#4A171B]"
          title="បត់លិខិតអញ្ជើញឡើងវិញ"
          aria-label="Re-fold envelope"
        >
          <Mail className="h-3.5 w-3.5 text-[#5f682a] group-hover:text-white" />
          <span className="text-[11px]">បើកស្រោមសំបុត្រឡើងវិញ</span>
        </button>
      )}

      {/* Back to Top Floating Button */}
      {showActions && showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-16 right-4 z-40 flex h-9 w-9 items-center justify-center rounded-full border border-[#4A171B]/60 bg-[#FAF7F2]/95 backdrop-blur-md text-[#4A171B] shadow-md transition-all hover:scale-110 hover:bg-[#4A171B] hover:text-white"
          aria-label="Back to top"
        >
          <ArrowUp className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}