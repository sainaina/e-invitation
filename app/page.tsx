'use client'

import { useState, useEffect } from 'react'
import {
  Calendar,
  Heart,
  MapPin,
  Sparkles,
  Copy,
  Check,
  ExternalLink,
  RefreshCw,
  ChevronDown,
  Bell,
  PartyPopper,
  Scissors,
  Utensils,
  Clock,
} from 'lucide-react'

import FloatingPetals from '@/components/floating-petals'
import AudioPlayer from '@/components/audio-player'
import UsefulFrame from '@/components/useful-frame'
import GalleryLightbox, { GalleryItem } from '@/components/gallery-lightbox'

const galleryList: GalleryItem[] = [
  {
    id: '1',
    src: '/images/couple_floral_closeup_1790042642555.jpg',
    alt: 'Rithy & Nihyun Pre-Wedding Highlight',
    captionEn: 'Pre-Wedding Highlight • Garden of Eternal Bloom',
    captionKm: 'វីដេអូអនុស្សាវរីយ៍ • ផ្កាស្នេហ៍រីកស្គុសស្គាយ',
    isVideo: true,
  },
  {
    id: '2',
    src: '/images/couple_veil_bw_1790042623902.jpg',
    alt: 'Forever Hand in Hand',
    captionEn: 'Walking hand in hand toward forever',
    captionKm: 'កាន់ដៃគ្នាឆ្ពោះទៅរកសុភមង្គលអស់មួយជីវិត',
  },
  {
    id: '3',
    src: '/images/couple_floral_closeup_1790042642555.jpg',
    alt: 'Romantic Whispers Under The Veil',
    captionEn: 'Whispers of devotion under the veil',
    captionKm: 'ក្តីស្រលាញ់ដ៏កក់ក្តៅក្រោមកន្សែងស្បៃរៀបការ',
  },
  {
    id: '4',
    src: '/images/couple_hero_portrait_1790042546264.jpg',
    alt: 'Royal Palace Garden Wedding Portrait',
    captionEn: 'Royal elegance at the Grand Garden, Phnom Penh',
    captionKm: 'ភាពស្រស់សោភាដ៏ឧត្តុង្គឧត្តម នៅរាជធានីភ្នំពេញ',
  },
]

export default function Page() {
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false)
  const [isStampRotating, setIsStampRotating] = useState(false)
  const [isEnvelopeSliding, setIsEnvelopeSliding] = useState(false)
  const [copiedAddress, setCopiedAddress] = useState(false)
  const [activeChildhood, setActiveChildhood] = useState<{ groom: boolean; bride: boolean }>({
    groom: true,
    bride: true,
  })

  // Countdown timer to Dec 18, 2025
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const targetDate = new Date('2025-12-18T17:00:00+07:00').getTime()

    const updateCountdown = () => {
      const now = new Date().getTime()
      const diff = targetDate - now

      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / 1000 / 60) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }

    updateCountdown()
    const timer = setInterval(updateCountdown, 1000)
    return () => clearInterval(timer)
  }, [])

  // Bi-directional scroll reveal observer (animates on scrolling up and down)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
          } else {
            // Remove when leaving viewport so it re-triggers smoothly when scrolling up & down
            entry.target.classList.remove('is-visible')
          }
        })
      },
      { threshold: 0.1, rootMargin: '25px 0px -25px 0px' }
    )

    const observeAll = () => {
      const elements = document.querySelectorAll(
        '.fade-left, .fade-right, .reveal-slide-left, .reveal-slide-right, .reveal-on-scroll, .reveal-zoom-in, .timeline-row'
      )
      elements.forEach((el) => observer.observe(el))
    }

    // Initial check and re-check after envelope opens
    observeAll()
    const timer1 = setTimeout(observeAll, 200)
    const timer2 = setTimeout(observeAll, 600)
    const timer3 = setTimeout(observeAll, 1200)
    const timer4 = setTimeout(observeAll, 1800)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
      clearTimeout(timer4)
      observer.disconnect()
    }
  }, [isEnvelopeOpen])

  const copyAddressToClipboard = () => {
    navigator.clipboard.writeText(
      'The Premier Sensok Center (Building H-I), Street 1003, Sen Sok, Phnom Penh, Cambodia'
    )
    setCopiedAddress(true)
    setTimeout(() => setCopiedAddress(false), 2500)
  }

  const handleSaveCalendar = () => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Rithy & Nihyun Wedding//KH
CALSCALE:GREGORIAN
METHOD:PUBLISH
BEGIN:VEVENT
UID:rithy-nihyun-wedding-2025@royal
DTSTAMP:20251201T000000Z
DTSTART:20251218T100000Z
DTEND:20251218T160000Z
SUMMARY:Wedding of Rithy & Nihyun (រីទ្ធី និង និគុណ)
DESCRIPTION:You are cordially invited to celebrate the wedding of Rithy & Nihyun at The Premier Sensok Center (Building H-I).
LOCATION:The Premier Sensok Center (Building H-I), Phnom Penh, Cambodia
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'Rithy_Nihyun_Wedding.ics')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const triggerOpenInvitation = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('play-wedding-music'))
    }
    // 1. Immediately trigger 180-degree rotation of the stamp with royal shockwave
    setIsStampRotating(true)

    // 2. Smoothly slide the envelope away after the stamp rotates
    setTimeout(() => {
      setIsEnvelopeSliding(true)
    }, 550)

    // 3. Complete transition, open invitation homepage, and smoothly scroll into view
    setTimeout(() => {
      setIsEnvelopeOpen(true)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 1450)
  }

  return (
    <main className="relative min-h-screen text-[#330404] selection:bg-[#330404]/70 selection:text-white">
      {/* Immersive Video Background with Crystal Clarity (No Heavy Blur) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover"
          style={{
            filter: 'blur(1px)',
            transform: 'scale(1.02)',
          }}
        >
          <source src="/videos/arch_background.mp4" type="video/mp4" />
        </video>
        {/* Ultra-soft, minimal neutral overlay so the video is clearly seen */}
        <div className="absolute inset-0 bg-black/5" />
      </div>

      {/* Floating Rose Petals, Matcha Leaves & Golden Dust Particles */}
      <FloatingPetals />

      {/* Floating Audio Player (hidden on open invitation landing page, appears once opened) */}
      <AudioPlayer isOpen={isEnvelopeOpen} />

      {/* ========================================================================= */}
      {/* FULL-SCREEN ROYAL WELCOME ENVELOPE (ROYAL STATIONERY + RED STAMP)         */}
      {/* ========================================================================= */}
      <div
        onClick={triggerOpenInvitation}
        style={{
          background: 'transparent',
        }}
        className={`fixed inset-0 z-50 w-full h-[100dvh] overflow-hidden flex flex-col justify-between items-center text-center p-4 sm:p-8 md:p-10 select-none shadow-2xl transition-all duration-[950ms] ease-[cubic-bezier(0.22,1,0.36,1)] ring-4 ring-[#330404]/15 ${isEnvelopeOpen
          ? '-translate-y-full opacity-0 pointer-events-none invisible'
          : isEnvelopeSliding
            ? '-translate-y-full opacity-0 pointer-events-none scale-[0.98]'
            : 'translate-y-0 opacity-100 cursor-pointer'
          }`}
      >
        {/* Exact same capacity (opacity) and white as the home invitation page */}
        <div className="pointer-events-none absolute inset-0 bg-[#FAF7F2]/60" />

        {/* Full-Screen Royal Dual Hairline Framing (Red Wine & Matcha/20) */}
        <div className="pointer-events-none fixed inset-3 sm:inset-5 rounded-2xl sm:rounded-3xl border-2 border-[#330404]/40" />
        <div className="pointer-events-none fixed inset-4.5 sm:inset-7 rounded-xl sm:rounded-2xl border border-[#5f682a]/40 ring-1 ring-[#5f682a]/20" />

        {/* Royal Corner Filigrees */}
        <div className="pointer-events-none absolute top-4 left-4 font-cinzel text-xs text-[#330404]/60">❧</div>
        <div className="pointer-events-none absolute top-4 right-4 font-cinzel text-xs text-[#330404]/60 scale-x-[-1]">❧</div>
        <div className="pointer-events-none absolute bottom-4 left-4 font-cinzel text-xs text-[#330404]/60 scale-y-[-1]">❧</div>
        <div className="pointer-events-none absolute bottom-4 right-4 font-cinzel text-xs text-[#330404]/60 rotate-180">❧</div>

        {/* Top Eyebrow */}
        <div className="relative z-10 pt-2 sm:pt-4">
          <p className="font-cinzel text-[10px] sm:text-xs font-semibold tracking-[0.35em] text-[#5f682a] drop-shadow-xs">
            ROYAL WEDDING INVITATION
          </p>
          <p className="font-moul-light font-moul text-base sm:text-lg text-[#330404] mt-1 drop-shadow-xs">
            សិរីសួស្តី អាពាហ៍ពិពាហ៍
          </p>
        </div>

        {/* Couple Calligraphy & Red Wax Seal Medallion in Center */}
        <div className="relative z-10 my-auto py-1 sm:py-2 w-full max-w-lg">
          <h1 className="font-great-vibes text-5xl sm:text-7xl md:text-8xl text-[#330404] leading-tight drop-shadow-[0_2px_10px_rgba(250,247,242,0.9)]">
            Rithy <span className="font-great-vibes text-3xl sm:text-5xl text-[#5f682a]">&amp;</span> Nihyun
          </h1>

          <p className="mt-1 font-moulpali text-xl sm:text-2xl md:text-3xl text-[#5f682a] drop-shadow-[0_1px_4px_rgba(250,247,242,0.8)]">
            រីទ្ធី និង និគុណ
          </p>

          <p className="mt-1.5 font-cinzel text-[10px] sm:text-xs tracking-[0.25em] text-[#330404]/80 font-medium">
            18TH DECEMBER 2025 • PHNOM PENH
          </p>

          {/* =================================================================== */}
          {/* CIRCULAR MATCHA MEDALLION WITH RED WAX SEAL (SMALL & 180° ROTATION) */}
          {/* =================================================================== */}
          <div className="my-4 sm:my-6 flex justify-center">
            <div
              className={`group/seal relative flex h-28 w-28 sm:h-34 sm:w-34 items-center justify-center rounded-full border-2 border-[#330404] shadow-[0_12px_28px_rgba(51,4,4,0.35)] ring-4 ring-[#5f682a]/30 overflow-hidden cursor-pointer transition-all duration-700 ${isStampRotating
                ? 'animate-seal-rotate-180 ring-8 ring-[#330404]/60'
                : 'hover:scale-105 active:scale-95'
                }`}
            >
              {/* Luminous Red Pulsing Halo */}
              <div className="seal-pulse absolute inset-0 rounded-full bg-[#330404]/25" />

              {/* Golden Shockwave Wave Burst on Click */}
              {isStampRotating && (
                <div className="animate-seal-break absolute inset-0 rounded-full border-4 border-[#330404] bg-radial-[circle,_rgba(51,4,4,0.45)_0%,_transparent_70%]" />
              )}

              {/* The Matcha Paper & Red Wax Seal Image (100% matcha, zero beige) */}
              <img
                src="/api/wax-seal"
                alt="RN Royal Red Wax Seal on Matcha Paper"
                className="h-full w-full object-cover transition-transform duration-700 group-hover/seal:scale-105"
              />

              {/* Decorative Dual Inner Filigree Rings */}
              <div className="pointer-events-none absolute inset-1.5 sm:inset-2 rounded-full border border-[#FAF7F2]/40" />
              <div className="pointer-events-none absolute inset-2.5 sm:inset-3 rounded-full border border-[#330404]/40" />
            </div>
          </div>

          {/* Tap Hint */}
          <p className="font-moulpali text-xs sm:text-sm text-[#330404] animate-pulse drop-shadow-xs font-semibold">
            សូមចុចលើត្រាដើម្បីបើកលិខិតអញ្ជើញ
          </p>
          <p className="font-cinzel text-[9px] sm:text-[10px] tracking-widest text-[#5f682a] mt-1 font-bold">
            TAP SEAL TO UNVEIL INVITATION
          </p>
        </div>

        {/* Bottom Button */}
        <div className="relative z-10 pb-2 sm:pb-4 w-full max-w-xs">
          <button
            onClick={(e) => {
              e.stopPropagation()
              triggerOpenInvitation()
            }}
            className="w-full inline-flex items-center justify-center gap-2 rounded-full border border-[#5f682a]/50 bg-[#330404] px-7 py-2.5 sm:py-3 font-cinzel text-xs font-semibold tracking-widest text-white shadow-xl transition-all duration-300 hover:scale-105 hover:bg-[#5f682a] active:scale-95"
          >
            <span>OPEN INVITATION</span>
            <ChevronDown className="h-4 w-4 animate-bounce" />
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MAIN INVITATION: FRAMED WITH CUSTOM ARCH & CLEAN CHANDELIER               */}
      {/* ========================================================================= */}
      <div
        className={`transition-all duration-700 ${isEnvelopeOpen || isEnvelopeSliding
          ? 'opacity-100 animate-card-slide-up'
          : 'opacity-0 pointer-events-none invisible h-0 overflow-hidden'
          }`}
      >
        <UsefulFrame
          onReopenEnvelope={() => {
            setIsEnvelopeOpen(false)
            setIsEnvelopeSliding(false)
            setIsStampRotating(false)
          }}
        >
          {/* ===================================================================== */}
          {/* INVITATION HOMEPAGE: ARCH BACKGROUND & CHANDELIER                      */}
          {/* ===================================================================== */}
          {/* ===================================================================== */}
          {/* TRADITIONAL ROYAL KHMER INVITATION CARD (MATCHING REFERENCE LAYOUT)   */}
          {/* ===================================================================== */}
          {/* ===================================================================== */}
          {/* TRADITIONAL ROYAL KHMER INVITATION CARD (MODERN LUXURY EDITORIAL)    */}
          {/* ===================================================================== */}
          <header className="relative w-full px-4 sm:px-8 pt-8 sm:pt-12 pb-10 text-center flex flex-col justify-between items-center rounded-none sm:rounded-t-[36px]">
            {/* Top Ornamental Header (Matching Reference Top Title) */}
            <div className="relative z-10 pt-2 sm:pt-4">
              <span className="text-xs sm:text-sm text-[#c5a059] block select-none">❖ · ❦ · ❖</span>
              <h1 className="font-moul text-2xl sm:text-4xl md:text-5xl text-[#330404] tracking-wide mt-1.5 drop-shadow-[0_2px_8px_rgba(250,247,242,0.95)]">
                សិរីសួស្តី អាពាហ៍ពិពាហ៍
              </h1>
              <p className="font-cinzel text-[10px] sm:text-xs font-semibold tracking-[0.35em] text-[#5f682a] mt-1 uppercase">
                Royal Wedding Invitation
              </p>
            </div>

            {/* 2-Column Honored Parents Section with Kantumruy Pro Typography */}
            <div className="relative z-10 w-full max-w-lg my-4 sm:my-6 px-2">
              <div className="grid grid-cols-2 gap-3 sm:gap-6 text-center">
                {/* Bride's Parents (Left) */}
                <div className="p-3.5 sm:p-4 rounded-2xl border-2 border-[#c5a059]/70 bg-white/85 shadow-sm transition-all hover:border-[#c5a059]">
                  <p className="font-kantumruy text-[11px] sm:text-xs font-bold tracking-wider text-[#5f682a] uppercase">
                    មាតាបិតាខាងស្រី
                  </p>
                  <p className="font-kantumruy text-sm sm:text-base text-[#260202] mt-1.5 font-bold leading-relaxed">
                    លោក ឈីវ ម៉េង
                  </p>
                  <p className="font-kantumruy text-sm sm:text-base text-[#260202] font-bold leading-relaxed">
                    លោកស្រី លី ហួង
                  </p>
                </div>

                {/* Groom's Parents (Right) */}
                <div className="p-3.5 sm:p-4 rounded-2xl border-2 border-[#c5a059]/70 bg-white/85 shadow-sm transition-all hover:border-[#c5a059]">
                  <p className="font-kantumruy text-[11px] sm:text-xs font-bold tracking-wider text-[#5f682a] uppercase">
                    មាតាបិតាខាងប្រុស
                  </p>
                  <p className="font-kantumruy text-sm sm:text-base text-[#260202] mt-1.5 font-bold leading-relaxed">
                    លោក នីវ សុវណ្ណ
                  </p>
                  <p className="font-kantumruy text-sm sm:text-base text-[#260202] font-bold leading-relaxed">
                    អ្នកស្រី គឹម សុផល
                  </p>
                </div>
              </div>

              {/* Delicate Gold Divider */}
              <div className="my-5 flex items-center justify-center gap-3">
                <div className="h-px w-16 sm:w-24 bg-gradient-to-r from-transparent to-[#c5a059]" />
                <span className="font-cinzel text-xs text-[#330404] select-none">✦ · ❦ · ✦</span>
                <div className="h-px w-16 sm:w-24 bg-gradient-to-l from-transparent to-[#c5a059]" />
              </div>

              {/* Formal Khmer Invitation Greeting & Body with Kantumruy Pro */}
              <div className="text-center space-y-1.5 px-2">
                <h2 className="font-moul text-base sm:text-xl text-[#330404] drop-shadow-xs">
                  មានកិត្តិយសសូមគោរពអញ្ជើញ
                </h2>
                <p className="font-kantumruy text-xs sm:text-[13px] text-[#260202] font-medium leading-relaxed max-w-md mx-auto">
                  ឯកឧត្តម លោកជំទាវ លោក លោកស្រី អ្នកនាងកញ្ញា និងប្រិយមិត្តជិតឆ្ងាយ អញ្ជើញចូលរួមជាអធិបតី និងជាភ្ញៀវកិត្តិយស ដើម្បីប្រសិទ្ធពរជ័យសិរីសួស្តី ក្នុងពិធីរៀបអាពាហ៍ពិពាហ៍ កូនប្រុស-កូនស្រី របស់យើងខ្ញុំ។
                </p>
              </div>
            </div>

            {/* The Couple with Center Royal Monogram Emblem */}
            <div className="relative z-10 w-full max-w-xl my-3 sm:my-5 px-2">
              <div className="flex items-center justify-between sm:justify-center gap-2 sm:gap-6">
                {/* Bride (Left) */}
                <div className="flex-1 text-center sm:text-right">
                  <span className="font-kantumruy text-[11px] sm:text-xs text-[#5f682a] font-semibold block">
                    កូនស្រីនាម
                  </span>
                  <h3 className="font-moul text-base sm:text-2xl text-[#260202] mt-0.5 leading-snug">
                    ឈីវ អិចងី
                  </h3>
                  <p className="font-kantumruy text-xs sm:text-sm text-[#5f682a] font-semibold">
                    (និគុណ)
                  </p>
                  <p className="font-great-vibes text-xl sm:text-2xl text-[#330404] mt-0.5">
                    Nihyun
                  </p>
                </div>

                {/* Central Royal RN Monogram Emblem */}
                <div className="flex-shrink-0 flex flex-col items-center justify-center px-1 sm:px-3">
                  <div className="relative flex h-20 w-20 sm:h-28 sm:w-28 items-center justify-center rounded-full border-2 border-[#c5a059] bg-gradient-to-b from-white to-[#faf7f2] shadow-md ring-2 ring-[#c5a059]/40 transition-transform duration-500 hover:scale-105">
                    {/* Inner Ornate Filigree Ring */}
                    <div className="pointer-events-none absolute inset-1.5 rounded-full border border-dashed border-[#c5a059]/70" />
                    {/* Monogram Typography */}
                    <div className="text-center select-none">
                      <span className="block font-cinzel text-[7px] sm:text-[9px] tracking-[0.25em] text-[#5f682a]">R &amp; N</span>
                      <span className="font-great-vibes text-3xl sm:text-4xl text-[#330404] font-bold leading-none block my-0.5">
                        R&amp;N
                      </span>
                      <span className="block font-cinzel text-[7px] sm:text-[8px] tracking-[0.3em] text-[#c5a059]">2025</span>
                    </div>
                  </div>
                </div>

                {/* Groom (Right) */}
                <div className="flex-1 text-center sm:text-left">
                  <span className="font-kantumruy text-[11px] sm:text-xs text-[#5f682a] font-semibold block">
                    កូនប្រុសនាម
                  </span>
                  <h3 className="font-moul text-base sm:text-2xl text-[#260202] mt-0.5 leading-snug">
                    នីវ រិទ្ធីវង្ស
                  </h3>
                  <p className="font-kantumruy text-xs sm:text-sm text-[#5f682a] font-semibold">
                    (រីទ្ធី)
                  </p>
                  <p className="font-great-vibes text-xl sm:text-2xl text-[#330404] mt-0.5">
                    Rithy
                  </p>
                </div>
              </div>
            </div>

            {/* Event Date, Time & Venue in Khmer */}
            <div className="relative z-10 w-full max-w-md mx-auto my-3 text-center space-y-1">
              <p className="font-kantumruy text-xs sm:text-sm text-[#260202] font-bold leading-relaxed">
                ថ្ងៃព្រហស្បតិ៍ ទី ១៨ ខែធ្នូ ឆ្នាំ ២០២៥ វេលាម៉ោង ៥:០០ រសៀល
              </p>
              <p className="font-kantumruy text-xs sm:text-sm text-[#474f20] font-bold leading-relaxed">
                នៅមជ្ឈមណ្ឌល The Premier Sensok Center (អគារ H-I) រាជធានីភ្នំពេញ
              </p>
            </div>

            {/* Modern English Wedding Invitation Section */}
            <div className="relative z-10 w-full max-w-md mx-auto mt-2 pt-3 border-t border-[#c5a059]/25">
              <h2 className="font-cinzel text-base sm:text-lg font-bold tracking-[0.25em] text-[#330404] uppercase">
                Wedding Invitation
              </h2>
              <p className="font-cinzel text-[10px] sm:text-[11px] tracking-wider text-[#330404]/90 mt-1 max-w-sm mx-auto leading-relaxed">
                Together with their families, the bride and groom respectfully invite you to celebrate their wedding and share in the joy of this special occasion.
              </p>

              {/* Date & Location Pill Badge */}
              <div className="mt-3.5 inline-flex items-center gap-2 rounded-full border border-[#c5a059]/70 bg-white/90 px-5 py-2 shadow-xs">
                <Calendar className="h-4 w-4 text-[#330404]" />
                <span className="font-cinzel text-xs sm:text-sm font-bold tracking-wider text-[#260202]">
                  THURSDAY 18<sup>TH</sup> DECEMBER 2025 • 5:00 PM
                </span>
              </div>
            </div>

            {/* Save the Date Button & Countdown Timer (Redesigned & Modern) */}
            <div className="relative z-10 mt-5 w-full flex flex-col items-center justify-center gap-3.5">
              <button
                onClick={handleSaveCalendar}
                className="group relative inline-flex items-center gap-2.5 rounded-full border border-[#c5a059]/80 bg-gradient-to-r from-[#330404] via-[#4d0707] to-[#330404] px-8 py-3 shadow-[0_4px_18px_rgba(51,4,4,0.3)] hover:shadow-[0_6px_25px_rgba(51,4,4,0.45)] transition-all duration-300 hover:scale-105 active:scale-95 text-white ring-1 ring-[#c5a059]/30"
              >
                <span className="text-[#c5a059] text-xs">✦</span>
                <span className="font-great-vibes text-xl sm:text-2xl font-normal tracking-wide text-white drop-shadow-xs">
                  Save our Date
                </span>
                <span className="text-[#c5a059] text-xs">✦</span>
              </button>

              {/* Countdown Timer with English & Kantumruy Pro */}
              <div className="grid grid-cols-4 gap-2.5 text-center text-xs">
                <div className="rounded-2xl border border-[#c5a059]/60 bg-white/90 p-2.5 shadow-xs min-w-[62px] transition-transform hover:-translate-y-0.5">
                  <span className="block font-cinzel text-base sm:text-lg font-bold text-[#260202]">{timeLeft.days}</span>
                  <span className="block font-cinzel text-[8px] tracking-wider text-stone-600 font-bold">DAYS</span>
                  <span className="block font-kantumruy text-[10px] font-bold text-[#5f682a]">ថ្ងៃ</span>
                </div>
                <div className="rounded-2xl border border-[#c5a059]/60 bg-white/90 p-2.5 shadow-xs min-w-[62px] transition-transform hover:-translate-y-0.5">
                  <span className="block font-cinzel text-base sm:text-lg font-bold text-[#260202]">{timeLeft.hours}</span>
                  <span className="block font-cinzel text-[8px] tracking-wider text-stone-600 font-bold">HOURS</span>
                  <span className="block font-kantumruy text-[10px] font-bold text-[#5f682a]">ម៉ោង</span>
                </div>
                <div className="rounded-2xl border border-[#c5a059]/60 bg-white/90 p-2.5 shadow-xs min-w-[62px] transition-transform hover:-translate-y-0.5">
                  <span className="block font-cinzel text-base sm:text-lg font-bold text-[#260202]">{timeLeft.minutes}</span>
                  <span className="block font-cinzel text-[8px] tracking-wider text-stone-600 font-bold">MINS</span>
                  <span className="block font-kantumruy text-[10px] font-bold text-[#5f682a]">នាទី</span>
                </div>
                <div className="rounded-2xl border border-[#c5a059]/60 bg-white/90 p-2.5 shadow-xs min-w-[62px] transition-transform hover:-translate-y-0.5">
                  <span className="block font-cinzel text-base sm:text-lg font-bold text-[#260202]">{timeLeft.seconds}</span>
                  <span className="block font-cinzel text-[8px] tracking-wider text-stone-600 font-bold">SECS</span>
                  <span className="block font-kantumruy text-[10px] font-bold text-[#5f682a]">វិនាទី</span>
                </div>
              </div>
            </div>
          </header>

          {/* ===================================================================== */}
          {/* THE COUPLE: STAGGERED DIAGONAL VINTAGE CAMEO (MATCHING REFERENCE)     */}
          {/* ===================================================================== */}
          <section id="couple" className="relative px-3 sm:px-6 py-10 text-center overflow-hidden">
            {/* Seamless Section Divider */}
            <div className="mb-8 flex items-center justify-center gap-3">
              <div className="h-px w-20 sm:w-28 bg-gradient-to-r from-transparent to-[#c5a059]/50" />
              <span className="font-cinzel text-xs text-[#330404]/60 select-none">✦ · ❦ · ✦</span>
              <div className="h-px w-20 sm:w-28 bg-gradient-to-l from-transparent to-[#c5a059]/50" />
            </div>
            {/* Soft Ambient Corner Glows in Primary Colors */}
            <div className="pointer-events-none absolute -top-8 -left-8 w-40 h-40 opacity-25 rounded-full bg-radial-[circle,_rgba(95,104,42,0.5)_0%,_transparent_70%]" />
            <div className="pointer-events-none absolute -bottom-8 -right-8 w-40 h-40 opacity-25 rounded-full bg-radial-[circle,_rgba(51,4,4,0.5)_0%,_transparent_70%]" />

            <p className="fade-left font-cinzel text-[10px] tracking-[0.3em] text-[#5f682a]">
              THE COUPLE
            </p>
            <h2 className="fade-right delay-100 mt-0.5 font-great-vibes text-5xl sm:text-6xl text-[#330404]">
              Bride &amp; Groom
            </h2>
            <p className="fade-left delay-150 font-moul-light font-moul text-sm text-[#5f682a] mt-0.5">
              កូនកំលោះ និង កូនក្រមុំ
            </p>

            <div className="filigree-divider">
              <span className="text-xs text-[#330404]">✦</span>
            </div>

            <p className="fade-right delay-200 font-kantumruy text-xs text-[#5f682a] italic mb-8">
              ✨ ចុចលើរូបថតដើម្បីផ្លាស់ប្តូររូបថតកុមារភាព និងរូបបច្ចុប្បន្ន
            </p>

            {/* STAGGERED DIAGONAL LAYOUT (DIRECTLY FROM USER'S TIKTOK REFERENCE) */}
            <div className="relative mx-auto w-full max-w-lg px-2 sm:px-4 space-y-6">

              {/* ROW 1: GROOM (Photo on Left, Name/Details on Right) */}
              <div className="flex items-center justify-between gap-4 sm:gap-6">
                {/* Groom Cameo Photo (Left) */}
                <div className="fade-left delay-100 flex-shrink-0">
                  <div
                    onClick={() =>
                      setActiveChildhood((prev) => ({ ...prev, groom: !prev.groom }))
                    }
                    className="group relative cursor-pointer select-none transition-transform duration-500 hover:scale-105"
                    aria-label="Toggle Groom photo"
                  >
                    {/* Vintage Ornate Scalloped / Cameo Frame with Red Wine & Matcha Rings */}
                    <div className="relative p-2 sm:p-2.5 rounded-[50%_50%_46%_46%] bg-[#FAF7F2] shadow-[0_18px_35px_-8px_rgba(51,4,4,0.35)] border-2 border-[#330404] ring-2 ring-[#5f682a]/40">
                      {/* Photo Container */}
                      <div className="relative w-36 h-48 sm:w-44 sm:h-56 overflow-hidden rounded-[50%_50%_46%_46%] border border-[#330404]/30 bg-stone-100 shadow-inner">
                        <img
                          src={
                            activeChildhood.groom
                              ? '/images/groom_childhood_1790042563724.jpg'
                              : '/images/couple_hero_portrait_1790042546264.jpg'
                          }
                          alt="Groom Neou Rithyvong"
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      </div>

                      {/* Interactive Childhood / Present Switcher Pill */}
                      <div className="absolute -bottom-3 inset-x-0 mx-auto w-fit flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#330404] hover:bg-[#5f682a] border border-[#FAF7F2] text-white shadow-md backdrop-blur-md transition-all duration-300 transform group-hover:scale-105">
                        <RefreshCw className="h-2.5 w-2.5 text-[#5f682a] group-hover:text-white transition-colors" />
                        <span className="font-moul-light font-moul text-[10px] tracking-wide text-white">
                          {activeChildhood.groom ? 'កុមារភាព' : 'បច្ចុប្បន្ន'}
                        </span>
                        <span className="text-[8px] tracking-widest text-[#5f682a] group-hover:text-white transition-colors pl-0.5">
                          {activeChildhood.groom ? '●' : '○'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Groom Name & Role (Right - Matching Reference Image 3) */}
                <div className="fade-right delay-200 flex-1 text-left pl-1 sm:pl-3">
                  <p className="font-cinzel text-xs sm:text-sm font-bold tracking-[0.25em] text-[#5f682a]">
                    GROOM
                  </p>
                  <p className="font-moul-light font-moul text-xs text-[#330404] mt-0.5">
                    កូនកំលោះ
                  </p>
                  <h3 className="mt-1 font-cinzel text-xl sm:text-2xl font-bold tracking-[0.18em] text-[#330404] leading-tight uppercase">
                    NEOU<br />RITHYVONG
                  </h3>
                  <p className="font-great-vibes text-2xl sm:text-3xl text-[#5f682a] -mt-1 leading-normal">
                    Neou Rithyvong
                  </p>
                  <p className="font-kantumruy font-semibold text-sm sm:text-base text-[#330404]">
                    នីវ រិទ្ធីវង្ស (រីទ្ធី)
                  </p>
                </div>
              </div>

              {/* DIAGONAL CENTER: ROMANTIC AMPERSAND (MATCHING REFERENCE IMAGE 3) */}
              <div className="reveal-zoom-in delay-150 relative my-2 flex items-center justify-center">
                <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-[#5f682a]" />
                <span className="mx-4 font-great-vibes text-5xl sm:text-6xl text-[#330404] select-none leading-none drop-shadow-xs">
                  &amp;
                </span>
                <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-[#5f682a]" />
              </div>

              {/* ROW 2: BRIDE (Name/Details on Left, Photo on Right) */}
              <div className="flex items-center justify-between gap-4 sm:gap-6">
                {/* Bride Name & Role (Left - Matching Reference Image 3) */}
                <div className="fade-left delay-200 flex-1 text-right pr-1 sm:pr-3">
                  <p className="font-cinzel text-xs sm:text-sm font-bold tracking-[0.25em] text-[#5f682a]">
                    BRIDE
                  </p>
                  <p className="font-moul-light font-moul text-xs text-[#330404] mt-0.5">
                    កូនក្រមុំ
                  </p>
                  <h3 className="mt-1 font-cinzel text-xl sm:text-2xl font-bold tracking-[0.18em] text-[#330404] leading-tight uppercase">
                    CHHIV<br />EXNGY
                  </h3>
                  <p className="font-great-vibes text-2xl sm:text-3xl text-[#5f682a] -mt-1 leading-normal">
                    Chhiv Exngy
                  </p>
                  <p className="font-kantumruy font-semibold text-sm sm:text-base text-[#330404]">
                    ឈីវ អិចងី (និគុណ)
                  </p>
                </div>

                {/* Bride Cameo Photo (Right) */}
                <div className="fade-right delay-100 flex-shrink-0">
                  <div
                    onClick={() =>
                      setActiveChildhood((prev) => ({ ...prev, bride: !prev.bride }))
                    }
                    className="group relative cursor-pointer select-none transition-transform duration-500 hover:scale-105"
                    aria-label="Toggle Bride photo"
                  >
                    {/* Vintage Ornate Scalloped / Cameo Frame with Red Wine & Matcha Rings */}
                    <div className="relative p-2 sm:p-2.5 rounded-[50%_50%_46%_46%] bg-[#FAF7F2] shadow-[0_18px_35px_-8px_rgba(51,4,4,0.35)] border-2 border-[#330404] ring-2 ring-[#5f682a]/40">
                      {/* Photo Container */}
                      <div className="relative w-36 h-48 sm:w-44 sm:h-56 overflow-hidden rounded-[50%_50%_46%_46%] border border-[#330404]/30 bg-stone-100 shadow-inner">
                        <img
                          src={
                            activeChildhood.bride
                              ? '/images/bride_childhood_1790042583131.jpg'
                              : '/images/couple_floral_closeup_1790042642555.jpg'
                          }
                          alt="Bride Chhiv Exngy"
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      </div>

                      {/* Interactive Childhood / Present Switcher Pill */}
                      <div className="absolute -bottom-3 inset-x-0 mx-auto w-fit flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#330404] hover:bg-[#5f682a] border border-[#FAF7F2] text-white shadow-md backdrop-blur-md transition-all duration-300 transform group-hover:scale-105">
                        <RefreshCw className="h-2.5 w-2.5 text-[#5f682a] group-hover:text-white transition-colors" />
                        <span className="font-moul-light font-moul text-[10px] tracking-wide text-white">
                          {activeChildhood.bride ? 'កុមារភាព' : 'បច្ចុប្បន្ន'}
                        </span>
                        <span className="text-[8px] tracking-widest text-[#5f682a] group-hover:text-white transition-colors pl-0.5">
                          {activeChildhood.bride ? '●' : '○'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </section>

          {/* ===================================================================== */}
          {/* GALLERY SECTION                                                       */}
          {/* ===================================================================== */}
          {/* ===================================================================== */}
          {/* GALLERY SECTION                                                       */}
          {/* ===================================================================== */}
          <section id="gallery" className="relative border-t border-[#330404]/20 px-3 py-11 text-center">
            <p className="fade-left font-cinzel text-[10px] tracking-[0.28em] text-[#5f682a]">
              PRECIOUS MOMENTS
            </p>
            <h2 className="fade-right delay-100 mt-0.5 font-great-vibes text-4xl sm:text-5xl text-[#330404]">
              Gallery of Moments
            </h2>
            <p className="fade-left delay-150 font-moul-light font-moul text-xs text-[#5f682a]">
              កម្រងរូបភាពអនុស្សាវរីយ៍
            </p>

            <div className="filigree-divider">
              <span className="text-xs text-[#330404]">• · •</span>
            </div>

            <div className="fade-right delay-200 mt-5">
              <GalleryLightbox items={galleryList} lang="km" />
            </div>
          </section>

          {/* ===================================================================== */}
          {/* WEDDING CEREMONY PROGRAM (MATCHING USER REFERENCE PICTURE)            */}
          {/* ===================================================================== */}
          {/* ===================================================================== */}
          {/* WEDDING CEREMONY PROGRAM (MATCHING REFERENCE LAYOUT + MODERN ANIMATION) */}
          {/* ===================================================================== */}
          <section id="event" className="relative border-t border-[#330404]/20 px-3.5 sm:px-8 py-12 text-center overflow-hidden">
            {/* Consistent Section Header matching Bride & Groom / Gallery / Venue */}
            <div className="reveal-on-scroll">
              <div className="mb-3 flex items-center justify-center gap-3">
                <div className="h-px w-12 sm:w-20 bg-gradient-to-r from-transparent to-[#5f682a]/50" />
                <span className="font-cinzel text-xs text-[#5f682a] select-none">❖ · ❦ · ❖</span>
                <div className="h-px w-12 sm:w-20 bg-gradient-to-l from-transparent to-[#5f682a]/50" />
              </div>

              <p className="fade-left font-cinzel text-[10px] tracking-[0.3em] text-[#5f682a] uppercase">
                WEDDING TIMELINE
              </p>
              <h2 className="fade-right delay-100 mt-0.5 font-great-vibes text-5xl sm:text-6xl text-[#330404]">
                Wedding Events
              </h2>
              <p className="fade-left delay-150 font-kantumruy text-xs sm:text-sm font-bold text-[#5f682a] mt-0.5">
                ថ្ងៃព្រហស្បតិ៍ ទី១៨ ខែធ្នូ ឆ្នាំ២០២៥
              </p>

              <div className="filigree-divider">
                <span className="text-xs text-[#330404]">✦</span>
              </div>
            </div>

            {/* Event Timeline Container (Matching Reference Picture Layout) */}
            <div className="relative mx-auto mt-7 max-w-md px-2 sm:px-6">
              <div className="relative space-y-6 sm:space-y-7 text-left">
                {/* Continuous Vertical Connecting Line with Animated Beam */}
                <div className="timeline-connector-line absolute left-[22px] sm:left-[26px] top-6 bottom-6 w-0.5 rounded-full shadow-[0_0_8px_rgba(95,104,42,0.4)]" />

                {/* Event 1: 06:00 AM */}
                <div className="timeline-row delay-1 relative flex items-center gap-3.5 sm:gap-4.5 group -mx-2 px-2 py-1.5 rounded-2xl transition-all duration-300 hover:bg-white/40">
                  <div className="timeline-badge relative z-10 flex h-11 w-11 sm:h-13 sm:w-13 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#727d35] to-[#5a6427] text-white shadow-md ring-2 ring-white/95">
                    <Bell className="h-5 w-5 sm:h-6 sm:w-6 transition-transform duration-300 group-hover:rotate-12" />
                  </div>
                  <div className="timeline-content flex-1 transition-transform duration-300 group-hover:translate-x-1.5">
                    <p className="font-kantumruy text-sm sm:text-base font-bold text-[#330404] leading-snug">
                      ០៦:០០ ព្រឹក
                    </p>
                    <p className="font-kantumruy text-xs sm:text-sm font-semibold text-[#5f682a] leading-snug mt-0.5">
                      ពិធីសែនក្រុងពាលី
                    </p>
                  </div>
                </div>

                {/* Event 2: 07:00 AM */}
                <div className="timeline-row delay-2 relative flex items-center gap-3.5 sm:gap-4.5 group -mx-2 px-2 py-1.5 rounded-2xl transition-all duration-300 hover:bg-white/40">
                  <div className="timeline-badge relative z-10 flex h-11 w-11 sm:h-13 sm:w-13 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#727d35] to-[#5a6427] text-white shadow-md ring-2 ring-white/95">
                    <PartyPopper className="h-5 w-5 sm:h-6 sm:w-6 transition-transform duration-300 group-hover:scale-110" />
                  </div>
                  <div className="timeline-content flex-1 transition-transform duration-300 group-hover:translate-x-1.5">
                    <p className="font-kantumruy text-sm sm:text-base font-bold text-[#330404] leading-snug">
                      ០៧:០០ ព្រឹក
                    </p>
                    <p className="font-kantumruy text-xs sm:text-sm font-semibold text-[#5f682a] leading-snug mt-0.5">
                      ពិធីហែជំនូនចូលរោងជ័យ
                    </p>
                  </div>
                </div>

                {/* Event 3: 07:30 AM */}
                <div className="timeline-row delay-3 relative flex items-center gap-3.5 sm:gap-4.5 group -mx-2 px-2 py-1.5 rounded-2xl transition-all duration-300 hover:bg-white/40">
                  <div className="timeline-badge relative z-10 flex h-11 w-11 sm:h-13 sm:w-13 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#727d35] to-[#5a6427] text-white shadow-md ring-2 ring-white/95">
                    <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 transition-transform duration-300 group-hover:rotate-12" />
                  </div>
                  <div className="timeline-content flex-1 transition-transform duration-300 group-hover:translate-x-1.5">
                    <p className="font-kantumruy text-sm sm:text-base font-bold text-[#330404] leading-snug">
                      ០៧:៣០ ព្រឹក
                    </p>
                    <p className="font-kantumruy text-xs sm:text-sm font-semibold text-[#5f682a] leading-snug mt-0.5">
                      ពិធីពិសាស្លាកំណត់ និងបំពាក់ចិញ្ចៀន
                    </p>
                  </div>
                </div>

                {/* Event 4: 08:30 AM */}
                <div className="timeline-row delay-4 relative flex items-center gap-3.5 sm:gap-4.5 group -mx-2 px-2 py-1.5 rounded-2xl transition-all duration-300 hover:bg-white/40">
                  <div className="timeline-badge relative z-10 flex h-11 w-11 sm:h-13 sm:w-13 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#727d35] to-[#5a6427] text-white shadow-md ring-2 ring-white/95">
                    <Bell className="h-5 w-5 sm:h-6 sm:w-6 transition-transform duration-300 group-hover:scale-110" />
                  </div>
                  <div className="timeline-content flex-1 transition-transform duration-300 group-hover:translate-x-1.5">
                    <p className="font-kantumruy text-sm sm:text-base font-bold text-[#330404] leading-snug">
                      ០៨:៣០ ព្រឹក
                    </p>
                    <p className="font-kantumruy text-xs sm:text-sm font-semibold text-[#5f682a] leading-snug mt-0.5">
                      ពិធីសូត្រមន្តចម្រើនព្រះបរិត្ត
                    </p>
                  </div>
                </div>

                {/* Event 5: 09:00 AM */}
                <div className="timeline-row delay-5 relative flex items-center gap-3.5 sm:gap-4.5 group -mx-2 px-2 py-1.5 rounded-2xl transition-all duration-300 hover:bg-white/40">
                  <div className="timeline-badge relative z-10 flex h-11 w-11 sm:h-13 sm:w-13 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#727d35] to-[#5a6427] text-white shadow-md ring-2 ring-white/95">
                    <Scissors className="h-5 w-5 sm:h-6 sm:w-6 transition-transform duration-300 group-hover:rotate-12" />
                  </div>
                  <div className="timeline-content flex-1 transition-transform duration-300 group-hover:translate-x-1.5">
                    <p className="font-kantumruy text-sm sm:text-base font-bold text-[#330404] leading-snug">
                      ០៩:០០ ព្រឹក
                    </p>
                    <p className="font-kantumruy text-xs sm:text-sm font-semibold text-[#5f682a] leading-snug mt-0.5">
                      ពិធីកាត់សក់បង្កក់សិរី
                    </p>
                  </div>
                </div>

                {/* Event 6: 10:45 AM */}
                <div className="timeline-row delay-6 relative flex items-center gap-3.5 sm:gap-4.5 group -mx-2 px-2 py-1.5 rounded-2xl transition-all duration-300 hover:bg-white/40">
                  <div className="timeline-badge relative z-10 flex h-11 w-11 sm:h-13 sm:w-13 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#727d35] to-[#5a6427] text-white shadow-md ring-2 ring-white/95">
                    <Heart className="h-5 w-5 sm:h-6 sm:w-6 fill-current text-white transition-transform duration-300 group-hover:scale-110" />
                  </div>
                  <div className="timeline-content flex-1 transition-transform duration-300 group-hover:translate-x-1.5">
                    <p className="font-kantumruy text-sm sm:text-base font-bold text-[#330404] leading-snug">
                      ១០:៤៥ ព្រឹក
                    </p>
                    <p className="font-kantumruy text-xs sm:text-sm font-semibold text-[#5f682a] leading-snug mt-0.5">
                      ពិធីសំពះផ្ទឹម សែនចងដៃ និងបាចផ្កាស្លា
                    </p>
                  </div>
                </div>

                {/* Event 7: 05:00 PM - Evening Reception */}
                <div className="timeline-row delay-7 relative flex items-center gap-3.5 sm:gap-4.5 group -mx-2 px-2 py-1.5 rounded-2xl transition-all duration-300 hover:bg-white/40">
                  <div className="timeline-badge timeline-badge-reception relative z-10 flex h-11 w-11 sm:h-13 sm:w-13 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#330404] to-[#4d0707] text-white shadow-lg ring-2 ring-white/95">
                    <Utensils className="h-5 w-5 sm:h-6 sm:w-6 text-white transition-transform duration-300 group-hover:rotate-12" />
                  </div>
                  <div className="timeline-content flex-1 transition-transform duration-300 group-hover:translate-x-1.5">
                    <p className="font-kantumruy text-sm sm:text-base font-bold text-[#330404] leading-snug">
                      ០៥:០០ ល្ងាច
                    </p>
                    <p className="font-kantumruy text-xs sm:text-sm font-bold text-[#330404] leading-snug mt-0.5">
                      ពិធីជប់លៀងមហោឡារិកអបអរសាទរអាពាហ៍ពិពាហ៍
                    </p>
                    <p className="font-cinzel text-[10px] sm:text-xs font-semibold text-[#5f682a] tracking-wider mt-0.5">
                      GRAND WEDDING RECEPTION &amp; DINNER
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ===================================================================== */}
          {/* VENUE & LOCATION DIRECTIONS                                           */}
          {/* ===================================================================== */}
          <section id="venue" className="relative border-t border-[#330404]/20 px-5 py-11 text-center">
            <div className="fade-left mx-auto flex justify-center text-[#330404] mb-1">
              <MapPin className="h-6 w-6" />
            </div>

            <p className="fade-left delay-100 font-cinzel text-[10px] tracking-[0.28em] text-[#5f682a]">
              VENUE LOCATION
            </p>
            <h2 className="fade-right delay-150 mt-0.5 font-great-vibes text-4xl sm:text-5xl text-[#330404]">
              Celebration Venue
            </h2>
            <p className="fade-left delay-200 font-cinzel text-xs font-bold tracking-wider text-[#330404]">
              THE PREMIER SENSOK CENTER
            </p>
            <p className="fade-right delay-200 font-moulpali text-xs text-[#5f682a] mt-0.5">
              មជ្ឈមណ្ឌល ព្រីមៀរ សែនសុខ (អាគារ H-I) • រាជធានីភ្នំពេញ
            </p>

            <div className="filigree-divider">
              <span className="text-xs text-[#330404]">✦</span>
            </div>

            <div className="fade-left delay-150 mx-auto mt-4 max-w-md overflow-hidden rounded-2xl border-2 border-[#330404]/40 shadow-md">
              <div className="aspect-video w-full bg-stone-200">
                <img
                  src="/images/premier_sensok_venue_1790042694667.jpg"
                  alt="The Premier Sensok Center"
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="bg-white p-4 text-left text-xs">
                <h4 className="font-cinzel text-sm font-bold text-[#330404]">
                  The Premier Sensok Center (Building H-I)
                </h4>
                <p className="mt-1 font-moulpali text-xs text-[#330404]">
                  ផ្លូវ ១០០៣ សង្កាត់ភ្នំពេញថ្មី ខណ្ឌសែនសុខ រាជធានីភ្នំពេញ
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  <a
                    href="https://maps.google.com/?q=The+Premier+Center+Sen+Sok+Phnom+Penh"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 rounded-xl bg-[#330404] px-4 py-2 font-cinzel text-xs font-semibold text-white shadow-xs transition hover:bg-[#5f682a]"
                  >
                    <MapPin className="h-3.5 w-3.5" />
                    <span>GOOGLE MAPS</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>

                  <button
                    onClick={copyAddressToClipboard}
                    className="flex items-center gap-1.5 rounded-xl border border-[#5f682a]/50 bg-[#FAF7F2] px-3 py-2 font-moulpali text-xs text-[#5f682a] transition hover:border-[#330404] hover:text-[#330404]"
                  >
                    {copiedAddress ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-green-600" />
                        <span className="text-green-600">បានចម្លង!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>ចម្លងអាសយដ្ឋាន</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </section>


          {/* ===================================================================== */}
          {/* CLOSING FOOTER                                                        */}
          {/* ===================================================================== */}
          <footer className="relative border-t border-[#330404]/40 bg-[#260202] px-6 py-12 text-center text-white">
            <div className="fade-left mx-auto flex justify-center text-[#5f682a]">
              <Heart className="h-6 w-6 fill-current text-[#FAF7F2]" />
            </div>

            <p className="fade-left delay-100 mt-3 font-moulpali text-xs text-[#FAF7F2]/90">
              សូមថ្លែងអំណរគុណយ៉ាងជ្រាលជ្រៅបំផុត ចំពោះវត្តមាន និងពរជ័យ
            </p>

            <h3 className="fade-right delay-200 mt-2 font-great-vibes text-5xl text-[#FAF7F2]">
              With love, always.
            </h3>

            <p className="fade-left delay-250 mt-1 font-cinzel text-xs tracking-[0.2em] text-[#FAF7F2]/80">
              RITHY &amp; NIHYUN
            </p>

            <div className="fade-right delay-300 mt-4 flex justify-center">
              <img
                src="/images/wax_seal_rn_1790042663814.jpg"
                alt="RN Wax Seal"
                className="h-14 w-14 rounded-full border border-[#330404] object-cover shadow-lg"
              />
            </div>

            <p className="fade-left delay-300 mt-4 font-cinzel text-[9px] tracking-widest text-stone-400">
              17 · 18 · DECEMBER · 2025 • PHNOM PENH, CAMBODIA
            </p>
          </footer>
        </UsefulFrame>
      </div>
    </main>
  )
}
