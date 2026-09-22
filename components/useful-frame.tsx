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
    <div className="relative mx-auto w-full max-w-[530px] px-2 sm:px-3 py-6">
      {/* 
        Main Royal Invitation Card Container 
        Curated colors: Primary #330404 (Deep Red) and #5f682a (Matcha Green)
      */}
      <div className="relative overflow-hidden rounded-[32px] shadow-[0_30px_90px_-15px_rgba(25,5,5,0.8)] border-2 border-[#330404] bg-[#FAF7F2]">
        
        {/* Corner Filigree Accents in #330404 */}
        <div className="pointer-events-none absolute top-3 left-3 z-30 font-cinzel text-xs text-[#330404]/60 select-none">❧</div>
        <div className="pointer-events-none absolute top-3 right-3 z-30 font-cinzel text-xs text-[#330404]/60 select-none scale-x-[-1]">❧</div>
        <div className="pointer-events-none absolute bottom-3 left-3 z-30 font-cinzel text-xs text-[#330404]/60 select-none scale-y-[-1]">❧</div>
        <div className="pointer-events-none absolute bottom-3 right-3 z-30 font-cinzel text-xs text-[#330404]/60 select-none rotate-180">❧</div>

        {/* Double inner gold & crimson border */}
        <div className="pointer-events-none absolute inset-2.5 z-20 rounded-[24px] border border-[#330404]/35" />
        <div className="pointer-events-none absolute inset-3.5 z-20 rounded-[20px] border border-[#5f682a]/35" />

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
