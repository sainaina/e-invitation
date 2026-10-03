'use client'

import React, { useState, useEffect } from 'react'
import { Sparkles, ChevronRight } from 'lucide-react'

interface RoyalIntroShowcaseProps {
  isActive: boolean
  onBrowseToHome: () => void
  groomName?: string
  brideName?: string
  weddingDate?: string
}

export default function RoyalIntroShowcase({
  isActive,
  onBrowseToHome,
  groomName = 'Pheakdey',
  brideName = 'Munineath',
  weddingDate = '18TH MARCH 2027 • PHNOM PENH',
}: RoyalIntroShowcaseProps) {
  // Step 0: Background revealed upon gatefold separation
  // Step 1: Groom Name glides in slowly
  // Step 2: Ampersand blooms in slowly
  // Step 3: Bride Name glides in slowly
  // Step 4: Ornate Divider unfolds slowly
  // Step 5: Wedding Date reveals slowly
  // Step 6: All elements displayed in full harmony ("display for a second")
  // Step 7: Smoothly browse to home page
  const [animStep, setAnimStep] = useState(0)
  const [isFadingOut, setIsFadingOut] = useState(false)

  useEffect(() => {
    if (!isActive) {
      setAnimStep(0)
      setIsFadingOut(false)
      return
    }

    setAnimStep(0)

    // Step 1: Groom Name animates in slowly at 600ms
    const t1 = setTimeout(() => {
      setAnimStep(1)
    }, 600)

    // Step 2: Ampersand & animates in slowly at 1900ms
    const t2 = setTimeout(() => {
      setAnimStep(2)
    }, 1900)

    // Step 3: Bride Name animates in slowly at 2900ms
    const t3 = setTimeout(() => {
      setAnimStep(3)
    }, 2900)

    // Step 4: Ornate divider flourishes at 4000ms
    const t4 = setTimeout(() => {
      setAnimStep(4)
    }, 4000)

    // Step 5: Date reveals slowly at 4800ms
    const t5 = setTimeout(() => {
      setAnimStep(5)
    }, 4800)

    // Step 6: All done, display for ~1.8 seconds in full glory at 5600ms
    const t6 = setTimeout(() => {
      setAnimStep(6)
    }, 5600)

    // Step 7: Browse to home page of invitation at 7500ms
    const t7 = setTimeout(() => {
      handleComplete()
    }, 7500)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
      clearTimeout(t4)
      clearTimeout(t5)
      clearTimeout(t6)
      clearTimeout(t7)
    }
  }, [isActive])

  const handleComplete = () => {
    if (isFadingOut) return
    setIsFadingOut(true)
    onBrowseToHome()
  }

  if (!isActive) return null

  return (
    <div
      onClick={handleComplete}
      className={`fixed inset-0 z-40 w-full h-[100dvh] overflow-hidden select-none cursor-pointer transition-opacity duration-1000 ease-in-out ${isFadingOut
        ? 'opacity-0 pointer-events-none'
        : 'opacity-100'
        }`}
      aria-label="Click to browse to invitation home"
    >
      {/* ========================================================================= */}
      {/* ORIGINAL ARCH BACKGROUND (ARCH_BACKGROUND.JPG) - PIXEL IDENTICAL TO MAIN  */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <img
          src="/images/arch_background.jpg"
          alt="Royal Arch Background"
          className="w-full h-full object-cover object-center"
        />
        {/* Ambient overlay matching the site design exactly */}
        <div className="absolute inset-0 bg-black/5" />
        <div className="absolute inset-0 bg-white/20" />
      </div>

      {/* Floating subtle ambient golden sparkles */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-[#5f682a]/30 animate-floating-dust"
            style={{
              top: `${18 + (i * 8) % 65}%`,
              left: `${12 + (i * 11) % 76}%`,
              width: `${(i % 3) * 2 + 3}px`,
              height: `${(i % 3) * 2 + 3}px`,
              filter: 'blur(0.5px)',
              animationDelay: `${i * 0.4}s`,
              animationDuration: `${3.8 + (i % 3)}s`,
            }}
          />
        ))}
      </div>

      {/* ========================================================================= */}
      {/* CENTER ARCHWAY LAYER: SLOW ONE-BY-ONE NAME & DATE ANIMATION               */}
      {/* Uses the EXACT same fonts and colors as the invitation (Wine & Matcha)     */}
      {/* ========================================================================= */}
      <div className="relative z-10 w-full h-full flex flex-col justify-between items-center text-center px-4 py-8 sm:py-12 md:py-14">
        {/* Top Eyebrow (Modern Frosted Glass Badge) */}
        <div className="pt-2 sm:pt-4 transition-all duration-1000">
          <div
            className={`backdrop-blur-md bg-white/40 border border-white/60 rounded-full px-5 py-2 shadow-[0_6px_20px_rgba(74,23,27,0.06)] inline-flex flex-col items-center transition-all duration-1000 ease-out ${animStep >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
              }`}
          >
            <p className="font-cinzel text-[10px] sm:text-xs font-semibold tracking-[0.35em] text-[#5f682a]">
              ROYAL WEDDING INVITATION
            </p>
            <p className="font-moulpali text-sm sm:text-base text-[#4A171B] mt-0.5">
              សិរីសួស្តី អាពាហ៍ពិពាហ៍
            </p>
          </div>
        </div>

        {/* Center Names, Ampersand, Divider & Date */}
        <div className="my-auto w-full max-w-lg flex flex-col items-center justify-center py-2">

          {/* 1. GROOM NAME (Animates first, slowly and gracefully) */}
          <div className="relative overflow-visible min-h-[56px] sm:min-h-[72px] md:min-h-[88px] flex items-center justify-center">
            {animStep >= 1 && (
              <h1 className="font-great-vibes text-5xl sm:text-7xl md:text-8xl text-[#4A171B] leading-tight drop-shadow-[0_2px_12px_rgba(255,255,255,0.95)] animate-slow-name">
                {groomName}
              </h1>
            )}
          </div>

          {/* 2. AMPERSAND & (Animates second, slowly blooming) */}
          <div className="relative overflow-visible my-0.5 sm:my-1 min-h-[36px] sm:min-h-[46px] md:min-h-[54px] flex items-center justify-center">
            {animStep >= 2 && (
              <span className="font-great-vibes text-3xl sm:text-5xl text-[#5f682a] inline-block animate-slow-ampersand">
                &amp;
              </span>
            )}
          </div>

          {/* 3. BRIDE NAME (Animates third, slowly and gracefully) */}
          <div className="relative overflow-visible min-h-[56px] sm:min-h-[72px] md:min-h-[88px] flex items-center justify-center">
            {animStep >= 3 && (
              <h2 className="font-great-vibes text-5xl sm:text-7xl md:text-8xl text-[#4A171B] leading-tight drop-shadow-[0_2px_12px_rgba(255,255,255,0.95)] animate-slow-name">
                {brideName}
              </h2>
            )}
          </div>

          {/* 4. ORNATE FILIGREE DIVIDER (Animates fourth, unfolds slowly) */}
          <div className="w-full max-w-[260px] sm:max-w-[320px] my-3 sm:my-4 flex items-center justify-center min-h-[24px]">
            {animStep >= 4 && (
              <div className="w-full flex items-center justify-center animate-slow-divider">
                <svg
                  viewBox="0 0 260 22"
                  className="w-full h-5 sm:h-6 text-[#5f682a] drop-shadow-sm"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Central Diamond Accent */}
                  <path
                    d="M130 3 L133 11 L130 19 L127 11 Z"
                    fill="#5f682a"
                    stroke="#4A171B"
                    strokeWidth="0.6"
                  />
                  <circle cx="130" cy="11" r="1.8" fill="#4A171B" />

                  {/* Left Flourish Wing */}
                  <path
                    d="M123 11 C112 11, 104 5, 88 7 C72 9, 62 16, 42 11 C32 8.5, 20 11, 0 11"
                    stroke="#5f682a"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                  />
                  <path
                    d="M102 8 C98 4, 91 4, 88 8"
                    stroke="#4A171B"
                    strokeWidth="1.1"
                    strokeLinecap="round"
                  />
                  <circle cx="42" cy="11" r="1.6" fill="#5f682a" />
                  <circle cx="12" cy="11" r="1.2" fill="#4A171B" />

                  {/* Right Flourish Wing */}
                  <path
                    d="M137 11 C148 11, 156 5, 172 7 C188 9, 198 16, 218 11 C228 8.5, 240 11, 260 11"
                    stroke="#5f682a"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                  />
                  <path
                    d="M158 8 C162 4, 169 4, 172 8"
                    stroke="#4A171B"
                    strokeWidth="1.1"
                    strokeLinecap="round"
                  />
                  <circle cx="218" cy="11" r="1.6" fill="#5f682a" />
                  <circle cx="248" cy="11" r="1.2" fill="#4A171B" />
                </svg>
              </div>
            )}
          </div>

          {/* 5. WEDDING DATE (Animates fifth, reveals slowly with tracking) */}
          <div className="min-h-[28px] sm:min-h-[32px] flex items-center justify-center">
            {animStep >= 5 && (
              <p className="font-cinzel text-xs sm:text-sm font-semibold tracking-[0.25em] text-[#5f682a] drop-shadow-xs uppercase animate-slow-date">
                {weddingDate}
              </p>
            )}
          </div>

          {/* Subtle Blessing Sparkle on Full Display ("display for a second") */}
          {animStep >= 6 && (
            <div className="mt-3 flex items-center justify-center gap-2 opacity-90 transition-opacity duration-700">
              <Sparkles className="h-3 w-3 text-[#5f682a]" />
              <span className="font-moulpali text-xs sm:text-sm text-[#4A171B]">
                សូមគោរពអញ្ជើញ
              </span>
              <Sparkles className="h-3 w-3 text-[#5f682a]" />
            </div>
          )}
        </div>

        {/* ===================================================================== */}
        {/* BOTTOM BUTTON: MODERN GLASS STYLE (MATCHING COVER)                    */}
        {/* ===================================================================== */}
        <div className="pb-2 sm:pb-4 transition-all duration-700 w-full max-w-xs flex flex-col items-center gap-2">
          <div
            className={`w-full flex flex-col items-center gap-2 transition-all duration-700 ${animStep >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3 pointer-events-none'
              }`}
          >
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleComplete()
              }}
              className={`group/btn relative w-full inline-flex items-center justify-center gap-2.5 rounded-full px-8 py-3.5 font-cinzel text-xs sm:text-sm font-semibold tracking-[0.25em] transition-all duration-500 overflow-hidden cursor-pointer ${isFadingOut
                ? 'scale-95 bg-[#4A171B] text-white border border-white/40 ring-4 ring-[#5f682a]/40 shadow-[0_0_30px_rgba(74,23,27,0.4)]'
                : 'bg-white/50 backdrop-blur-2xl border border-white/75 text-[#4A171B] shadow-[0_12px_32px_rgba(74,23,27,0.15),inset_0_1px_2px_rgba(255,255,255,0.95),inset_0_-1px_1px_rgba(74,23,27,0.08)] hover:scale-[1.03] hover:bg-white/75 hover:border-white hover:shadow-[0_16px_40px_rgba(74,23,27,0.22),inset_0_1px_2px_rgba(255,255,255,1)] active:scale-95'
                }`}
            >
              {/* Specular Diagonal Glass Sheen Reflection */}
              <div className="pointer-events-none absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/40 to-transparent" />

              {/* Glass Inner Rim Highlight */}
              <div className="pointer-events-none absolute inset-0.5 rounded-full border border-white/40 opacity-70" />

              <Sparkles className="h-3.5 w-3.5 text-[#b8860b] opacity-90 group-hover/btn:rotate-12 transition-transform duration-300 relative z-10" />
              <span className="relative z-10 font-bold">
                {isFadingOut
                  ? 'ENTERING INVITATION...'
                  : animStep >= 6
                    ? 'BROWSING TO INVITATION...'
                    : 'OPEN INVITATION'}
              </span>
              <ChevronRight className="h-4 w-4 text-[#5f682a] animate-pulse relative z-10" />
            </button>

            {/* Subtitle in matching Modern Glass Capsule */}
            <div className="backdrop-blur-md bg-white/40 border border-white/60 rounded-full px-4 py-1 shadow-[0_4px_16px_rgba(74,23,27,0.06)]">
              <p className="font-moulpali text-[10px] sm:text-[11px] text-[#4A171B]/90">
                {animStep >= 6
                  ? 'កំពុងនាំលោកអ្នកទៅកាន់ទំព័រមង្គលការ...'
                  : 'សូមចុចដើម្បីបើកលិខិតអញ្ជើញ'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
