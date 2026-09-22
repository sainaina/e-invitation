'use client'

import { useState, useEffect } from 'react'
import {
  Calendar,
  Clock,
  Heart,
  MapPin,
  Sparkles,
  Copy,
  Check,
  ExternalLink,
  RefreshCw,
  ChevronDown,
} from 'lucide-react'

import FloatingPetals from '@/components/floating-petals'
import AudioPlayer from '@/components/audio-player'
import UsefulFrame from '@/components/useful-frame'
import GalleryLightbox, { GalleryItem } from '@/components/gallery-lightbox'
import RsvpGuestbook from '@/components/rsvp-guestbook'

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
  const [isOpeningAnim, setIsOpeningAnim] = useState(false)
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
      { threshold: 0.08, rootMargin: '10px 0px -20px 0px' }
    )

    const observeAll = () => {
      const elements = document.querySelectorAll(
        '.fade-left, .fade-right, .reveal-slide-left, .reveal-slide-right, .reveal-on-scroll, .reveal-zoom-in'
      )
      elements.forEach((el) => observer.observe(el))
    }

    // Initial check and re-check after envelope opens
    observeAll()
    const timer1 = setTimeout(observeAll, 200)
    const timer2 = setTimeout(observeAll, 600)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
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
    setIsOpeningAnim(true)
    setTimeout(() => {
      setIsEnvelopeOpen(true)
    }, 1200)
  }

  return (
    <main className="relative min-h-screen text-[#330404] selection:bg-[#330404] selection:text-white">
      {/* Immersive Viewport Background using Arch Background Image with Heavy Blur */}
      <div
        className="fixed inset-0 pointer-events-none z-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/api/arch-bg')",
          filter: 'blur(36px)',
          transform: 'scale(1.15)',
        }}
      />
      {/* Primary Color Overlay (#5f682a matcha and #330404 deep red wine wash) */}
      <div
        className="fixed inset-0 pointer-events-none z-0 bg-gradient-to-b from-[#5f682a]/92 via-[#330404]/88 to-[#5f682a]/94"
      />

      {/* Floating Rose Petals, Matcha Leaves & Golden Dust Particles */}
      <FloatingPetals />

      {/* Floating Audio Player */}
      <AudioPlayer />

      {/* ========================================================================= */}
      {/* FULL-SCREEN ROYAL WELCOME ENVELOPE (MATCHA/20 COLOR DISPLAY + RED STAMP)  */}
      {/* ========================================================================= */}
      <div
        onClick={triggerOpenInvitation}
        style={{
          background: 'radial-gradient(ellipse at 50% 45%, rgba(95,104,42,0.20) 0%, rgba(95,104,42,0.15) 55%, rgba(95,104,42,0.25) 100%), #FAF7F2',
        }}
        className={`fixed inset-0 z-50 w-full h-[100dvh] overflow-hidden flex flex-col justify-between items-center text-center p-6 sm:p-10 select-none shadow-2xl transition-all duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] ring-4 ring-[#5f682a]/20 ${
          isEnvelopeOpen || isOpeningAnim
            ? '-translate-y-full opacity-0 pointer-events-none scale-[0.97]'
            : 'translate-y-0 opacity-100 cursor-pointer'
        }`}
      >
        {/* Background Arch Graphic with Soft Opacity */}
        <div
          className="pointer-events-none absolute inset-0 bg-cover bg-center sm:bg-top opacity-35"
          style={{ backgroundImage: "url('/api/arch-bg')" }}
        />

        {/* Matcha/20 Color Display Wash Layer */}
        <div className="pointer-events-none absolute inset-0 bg-[#5f682a]/20" />

        {/* Soft Central Radial Vignette */}
        <div className="pointer-events-none absolute inset-0 bg-radial-[ellipse_at_center,_rgba(250,247,242,0.85)_0%,_rgba(250,247,242,0.55)_60%,_rgba(250,247,242,0.15)_100%]" />

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
          <p className="font-cinzel text-xs font-semibold tracking-[0.35em] text-[#5f682a] drop-shadow-xs">
            ROYAL WEDDING INVITATION
          </p>
          <p className="font-moul-light font-moul text-base sm:text-lg text-[#330404] mt-1.5 drop-shadow-xs">
            សិរីសួស្តី អាពាហ៍ពិពាហ៍
          </p>
        </div>

        {/* Couple Calligraphy & Red Wax Seal Medallion in Center */}
        <div className="relative z-10 my-auto py-2 w-full max-w-lg">
          <h1 className="font-great-vibes text-6xl sm:text-7xl md:text-8xl text-[#330404] leading-tight drop-shadow-[0_2px_10px_rgba(250,247,242,0.9)]">
            Rithy <span className="font-great-vibes text-4xl sm:text-5xl text-[#5f682a]">&amp;</span> Nihyun
          </h1>

          <p className="mt-1 font-moulpali text-2xl sm:text-3xl text-[#5f682a] drop-shadow-[0_1px_4px_rgba(250,247,242,0.8)]">
            រីទ្ធី និង និគុណ
          </p>

          <p className="mt-2 font-cinzel text-xs tracking-[0.25em] text-[#330404]/80 font-medium">
            18TH DECEMBER 2025 • PHNOM PENH
          </p>

          {/* =================================================================== */}
          {/* CIRCULAR MATCHA MEDALLION (CHANGES BEIGE TO MATCHA, STAMP REMAINS RED) */}
          {/* =================================================================== */}
          <div className="my-6 sm:my-7 flex justify-center">
            <div className="relative flex h-48 w-48 sm:h-56 sm:w-56 items-center justify-center rounded-full border-2 border-[#330404] shadow-[0_18px_40px_rgba(51,4,4,0.38)] ring-4 ring-[#5f682a]/30 overflow-hidden group/medallion">
              
              {/* Matcha Paper Texture Gradient inside the Circle (Changed from beige to matcha) */}
              <div 
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'radial-gradient(circle at 50% 45%, #6d7934 0%, #5f682a 55%, #464e1c 100%)',
                }}
              />

              {/* Envelope Flap Fold Lines on Matcha Paper */}
              <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-45" viewBox="0 0 200 200">
                {/* Diagonal envelope fold lines meeting in center behind seal */}
                <line x1="28" y1="28" x2="100" y2="100" stroke="#330404" strokeWidth="1.75" strokeDasharray="3 2" />
                <line x1="172" y1="28" x2="100" y2="100" stroke="#330404" strokeWidth="1.75" strokeDasharray="3 2" />
                <line x1="28" y1="172" x2="100" y2="100" stroke="#330404" strokeWidth="1.75" strokeDasharray="3 2" />
                <line x1="172" y1="172" x2="100" y2="100" stroke="#330404" strokeWidth="1.75" strokeDasharray="3 2" />
              </svg>

              {/* Inner Circular Stitch & Filigree Ring */}
              <div className="pointer-events-none absolute inset-2 sm:inset-2.5 rounded-full border border-[#FAF7F2]/35" />
              <div className="pointer-events-none absolute inset-3 sm:inset-3.5 rounded-full border border-[#330404]/40" />

              {/* The Stamp: Kept RED with Authentic Monogram */}
              <div
                className={`group/seal relative flex h-28 w-28 sm:h-32 sm:w-32 items-center justify-center rounded-full transition-all duration-700 z-10 ${
                  isOpeningAnim ? 'scale-125 rotate-12 ring-8 ring-[#330404]/60' : 'hover:scale-110 active:scale-95'
                }`}
              >
                {/* Luminous Red Pulsing Halo */}
                <div className="seal-pulse absolute inset-0 rounded-full bg-[#330404]/40" />

                {/* Golden Shockwave Wave Burst on Click */}
                {isOpeningAnim && (
                  <div className="animate-seal-break absolute inset-0 rounded-full border-4 border-[#330404] bg-radial-[circle,_rgba(51,4,4,0.5)_0%,_transparent_70%]" />
                )}

                {/* Red Wine Shimmer Ring */}
                <div className="absolute -inset-1 rounded-full border border-[#330404] opacity-80 group-hover/seal:opacity-100 transition-opacity" />

                <img
                  src="/images/wax_seal_rn_1790042663814.jpg"
                  alt="RN Royal Red Wax Seal"
                  className="h-28 w-28 sm:h-32 sm:w-32 rounded-full object-cover shadow-[0_15px_30px_rgba(51,4,4,0.6)] ring-2 ring-[#330404]"
                />
              </div>
            </div>
          </div>

          {/* Tap Hint */}
          <p className="font-moulpali text-xs sm:text-sm text-[#330404] animate-pulse drop-shadow-xs font-semibold">
            សូមចុចលើត្រាដើម្បីបើកលិខិតអញ្ជើញ
          </p>
          <p className="font-cinzel text-[10px] tracking-widest text-[#5f682a] mt-1 font-bold">
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
            className="w-full inline-flex items-center justify-center gap-2 rounded-full border border-[#5f682a]/50 bg-[#330404] px-7 py-3 font-cinzel text-xs font-semibold tracking-widest text-white shadow-xl transition-all duration-300 hover:scale-105 hover:bg-[#5f682a] active:scale-95"
          >
            <span>OPEN INVITATION</span>
            <ChevronDown className="h-4 w-4 animate-bounce" />
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MAIN INVITATION: FRAMED WITH CUSTOM ARCH & CLEAN CHANDELIER               */}
      {/* ========================================================================= */}
      <div className={isEnvelopeOpen ? 'animate-card-slide-up' : ''}>
        <UsefulFrame
          onReopenEnvelope={() => {
            setIsEnvelopeOpen(false)
            setIsOpeningAnim(false)
          }}
        >
          {/* ===================================================================== */}
          {/* INVITATION HOMEPAGE: ARCH BACKGROUND & CHANDELIER                      */}
          {/* ===================================================================== */}
          <header className="relative min-h-[100dvh] w-full px-4 sm:px-8 pt-8 pb-14 text-center overflow-hidden flex flex-col justify-between items-center rounded-none sm:rounded-t-[36px]">
            {/* The Arch Background Image - Sized properly to fill edge-to-edge */}
            <div
              className="pointer-events-none absolute inset-0 z-0 bg-cover bg-center sm:bg-top bg-no-repeat opacity-60"
              style={{
                backgroundImage: "url('/api/arch-bg')",
              }}
            />

            {/* Soft central parchment vignette with matcha/20 tint so all text is crystal clear */}
            <div
              className="pointer-events-none absolute inset-0 z-0"
              style={{
                background:
                  'radial-gradient(ellipse at 50% 50%, rgba(250, 247, 242, 0.90) 0%, rgba(250, 247, 242, 0.70) 65%, rgba(95, 104, 42, 0.15) 90%, transparent 100%)',
              }}
            />

            {/* Top Spacing under Arch */}
            <div className="h-4 sm:h-8" />

            {/* Khmer Royal Greeting in Moul */}
            <p className="fade-left relative z-10 font-moul text-xs tracking-wider text-[#5f682a]">
              សូមគោរពអញ្ជើញ
            </p>

            {/* Luxury English Eyebrow with Spaced Serif */}
            <p className="fade-right delay-100 relative z-10 mt-1.5 font-cinzel text-[11px] font-semibold tracking-[0.32em] text-[#330404]">
              THE WEDDING OF
            </p>

            {/* Couple Calligraphy in Great Vibes & Khmer Moulpali */}
            <div className="fade-left delay-150 relative z-10 my-2">
              <h1 className="font-great-vibes text-6xl sm:text-7xl text-[#330404] drop-shadow-[0_2px_4px_rgba(255,255,255,0.9)] leading-none">
                Rithy <span className="font-great-vibes text-4xl text-[#5f682a]">&amp;</span> Nihyun
              </h1>
              <p className="mt-1 font-moulpali text-xl text-[#5f682a] drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)]">
                រីទ្ធី និង និគុណ
              </p>
            </div>

            {/* Modern Royal Cathedral Arch Portrait (Grand Redesign of Wedding Photo) */}
            <div className="fade-right delay-200 relative z-10 my-6 flex justify-center w-full px-4">
              <div className="group relative w-full max-w-[310px] sm:max-w-[350px] aspect-[3/4] rounded-t-[140px] sm:rounded-t-[160px] rounded-b-[24px] sm:rounded-b-[28px] p-2.5 sm:p-3 bg-[#FAF7F2] shadow-[0_20px_50px_-10px_rgba(51,4,4,0.3)] border-2 border-[#330404] ring-4 ring-[#5f682a]/20 transition-all duration-500 hover:shadow-[0_25px_60px_-10px_rgba(51,4,4,0.4)]">
                {/* Inner Arch Matting with dual hairline borders */}
                <div className="relative w-full h-full overflow-hidden rounded-t-[128px] sm:rounded-t-[146px] rounded-b-[18px] sm:rounded-b-[22px] border border-[#5f682a]/40 bg-stone-100 shadow-inner">
                  <img
                    src="/images/couple_hero_portrait_1790042546264.jpg"
                    alt="Rithy & Nihyun Royal Wedding Portrait"
                    className="h-full w-full object-cover object-[center_20%] transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  {/* Gentle Gradient at base to frame floating badge */}
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#330404]/55 via-[#330404]/10 to-transparent" />
                </div>

                {/* Floating Calligraphic Badge at Arch Base */}
                <div className="absolute -bottom-4 inset-x-0 mx-auto w-fit flex items-center gap-1.5 px-4 sm:px-5 py-1.5 rounded-full bg-[#FAF7F2] border-2 border-[#330404] text-[#330404] shadow-lg ring-2 ring-[#5f682a]/20 backdrop-blur-md">
                  <span className="text-xs text-[#5f682a]">✦</span>
                  <span className="font-great-vibes text-xl sm:text-2xl text-[#330404] tracking-wide">
                    Rithy &amp; Nihyun
                  </span>
                  <span className="text-xs text-[#5f682a]">✦</span>
                </div>
              </div>
            </div>

            {/* Formal Royal Khmer & English Invitation Verse */}
            <div className="fade-left delay-250 relative z-10 mx-auto max-w-sm px-2">
              <p className="font-cinzel text-[10px] font-semibold tracking-[0.16em] text-[#330404] uppercase leading-relaxed">
                WE CORDIALLY REQUEST THE HONOR OF YOUR PRESENCE
              </p>
              <p className="mt-1 font-moulpali text-xs leading-relaxed text-[#330404]">
                យើងខ្ញុំមានកិត្តិយសសូមគោរពអញ្ជើញ ឯកឧត្តម លោកជំទាវ លោក លោកស្រី អ្នកនាងកញ្ញា អញ្ជើញចូលរួមជាអធិបតី និងជាភ្ញៀវកិត្តិយសក្នុងពិធីរៀបអាពាហ៍ពិពាហ៍កូនប្រុស កូនស្រី របស់យើងខ្ញុំ
              </p>
            </div>

            {/* Filigree Divider */}
            <div className="filigree-divider">
              <span className="text-xs text-[#330404]">❦</span>
            </div>

            {/* Date & Time Highlights */}
            <div className="fade-left space-y-1">
              <p className="font-cinzel text-xs tracking-widest text-[#5f682a]">
                FROM 5:00 PM • វេលាម៉ោង ៥:០០ រសៀល
              </p>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#330404]/50 bg-white/90 px-5 py-2 shadow-xs">
                <Calendar className="h-4 w-4 text-[#330404]" />
                <span className="font-cinzel text-xs sm:text-sm font-bold tracking-wider text-[#330404]">
                  THURSDAY 18<sup>TH</sup> DECEMBER 2025
                </span>
              </div>
              <p className="font-moulpali text-xs text-[#5f682a] mt-1">
                ត្រូវនឹងថ្ងៃព្រហស្បតិ៍ ទី ១៨ ខែធ្នូ ឆ្នាំ ២០២៥
              </p>
              <p className="font-cinzel text-[10px] tracking-wider text-stone-600">
                THE PREMIER SENSOK CENTER (BUILDING H-I)
              </p>
            </div>

            {/* Save the Date Plaque Button */}
            <div className="fade-right delay-100 mt-5 flex flex-col items-center justify-center gap-3">
              <button
                onClick={handleSaveCalendar}
                className="group relative inline-flex items-center gap-2 rounded-xl border-2 border-[#330404] bg-white/95 px-6 py-2.5 shadow-md transition-all hover:scale-105 hover:bg-[#330404] hover:text-white"
              >
                <div className="h-1.5 w-1.5 rounded-full bg-[#330404] group-hover:bg-white" />
                <span className="font-great-vibes text-xl font-normal tracking-wide text-[#330404] group-hover:text-white">
                  Save our Date
                </span>
                <div className="h-1.5 w-1.5 rounded-full bg-[#330404] group-hover:bg-white" />
              </button>

              {/* Countdown Timer with English & Khmer Moulpali */}
              <div className="grid grid-cols-4 gap-2 text-center text-xs">
                <div className="fade-left delay-100 rounded-xl border border-[#330404]/40 bg-white/90 p-2 shadow-2xs min-w-[58px]">
                  <span className="block font-cinzel text-base font-bold text-[#330404]">{timeLeft.days}</span>
                  <span className="block font-cinzel text-[8px] tracking-wider text-stone-500">DAYS</span>
                  <span className="block font-moulpali text-[9px] text-[#5f682a]">ថ្ងៃ</span>
                </div>
                <div className="fade-left delay-200 rounded-xl border border-[#330404]/40 bg-white/90 p-2 shadow-2xs min-w-[58px]">
                  <span className="block font-cinzel text-base font-bold text-[#330404]">{timeLeft.hours}</span>
                  <span className="block font-cinzel text-[8px] tracking-wider text-stone-500">HOURS</span>
                  <span className="block font-moulpali text-[9px] text-[#5f682a]">ម៉ោង</span>
                </div>
                <div className="fade-right delay-200 rounded-xl border border-[#330404]/40 bg-white/90 p-2 shadow-2xs min-w-[58px]">
                  <span className="block font-cinzel text-base font-bold text-[#330404]">{timeLeft.minutes}</span>
                  <span className="block font-cinzel text-[8px] tracking-wider text-stone-500">MINS</span>
                  <span className="block font-moulpali text-[9px] text-[#5f682a]">នាទី</span>
                </div>
                <div className="fade-right delay-100 rounded-xl border border-[#330404]/40 bg-white/90 p-2 shadow-2xs min-w-[58px]">
                  <span className="block font-cinzel text-base font-bold text-[#330404]">{timeLeft.seconds}</span>
                  <span className="block font-cinzel text-[8px] tracking-wider text-stone-500">SECS</span>
                  <span className="block font-moulpali text-[9px] text-[#5f682a]">វិនាទី</span>
                </div>
              </div>
            </div>
          </header>

          {/* ===================================================================== */}
          {/* PARENTS BLESSINGS                                                     */}
          {/* ===================================================================== */}
          <section className="relative border-t border-[#330404]/20 px-6 py-9 text-center">
            <p className="fade-left font-cinzel text-[10px] tracking-[0.25em] text-[#5f682a]">
              HONORED FAMILIES
            </p>
            <h2 className="fade-right mt-0.5 font-moul text-lg text-[#330404]">
              មាតាបិតាទាំងសងខាង
            </h2>

            <div className="filigree-divider">
              <span className="text-xs text-[#330404]">✦ · ✦ · ✦</span>
            </div>

            <div className="my-4 space-y-3 text-xs">
              <div className="fade-left delay-100 rounded-2xl border border-[#330404]/30 bg-white/90 p-4 shadow-xs">
                <p className="font-great-vibes text-2xl text-[#330404]">Groom&apos;s Parents <span className="font-moulpali text-xs text-[#5f682a]">• មាតាបិតាខាងកូនប្រុស</span></p>
                <p className="mt-1 font-moulpali text-sm text-[#330404]">លោក នីវ សុវណ្ណ និង លោកស្រី គឹម សុផល</p>
              </div>

              <div className="fade-right delay-200 rounded-2xl border border-[#330404]/30 bg-white/90 p-4 shadow-xs">
                <p className="font-great-vibes text-2xl text-[#330404]">Bride&apos;s Parents <span className="font-moulpali text-xs text-[#5f682a]">• មាតាបិតាខាងកូនស្រី</span></p>
                <p className="mt-1 font-moulpali text-sm text-[#330404]">លោក ឈីវ ម៉េង និង លោកស្រី លី ហួង</p>
              </div>
            </div>
          </section>

          {/* ===================================================================== */}
          {/* THE COUPLE: STAGGERED DIAGONAL VINTAGE CAMEO (MATCHING REFERENCE)     */}
          {/* ===================================================================== */}
          <section id="couple" className="relative border-t border-[#330404]/20 px-3 sm:px-6 py-12 text-center overflow-hidden">
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

            <p className="fade-right delay-200 font-moulpali text-xs text-[#5f682a] italic mb-8">
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
                  <p className="font-moulpali text-sm sm:text-base text-[#330404]">
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
                  <p className="font-moulpali text-sm sm:text-base text-[#330404]">
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
          {/* WEDDING AGENDA / 2-DAY PROGRAM                                        */}
          {/* ===================================================================== */}
          <section id="agenda" className="relative border-t border-[#330404]/20 px-5 py-11 text-center">
            <div className="fade-left mx-auto flex justify-center text-[#330404] mb-1">
              <Clock className="h-5 w-5" />
            </div>

            <p className="fade-left delay-100 font-cinzel text-[10px] tracking-[0.28em] text-[#5f682a]">
              CELEBRATION TIMELINE
            </p>
            <h2 className="fade-right delay-150 mt-0.5 font-great-vibes text-4xl sm:text-5xl text-[#330404]">
              Wedding Agenda
            </h2>
            <p className="fade-left delay-200 font-moul text-xs text-[#5f682a]">
              កាលវិភាគពិធីមង្គលការ
            </p>

            <div className="filigree-divider">
              <span className="text-xs text-[#330404]">❦</span>
            </div>

            {/* DAY 1: WEDNESDAY 17TH DECEMBER 2025 */}
            <div className="fade-left delay-100 mx-auto my-5 max-w-md rounded-2xl border border-[#330404]/35 bg-white/90 p-5 shadow-xs backdrop-blur">
              <div className="border-b border-[#330404]/20 pb-3">
                <h3 className="font-cinzel text-sm sm:text-base font-bold tracking-wider text-[#330404]">
                  WEDNESDAY 17<sup>TH</sup> DECEMBER 2025
                </h3>
                <p className="font-moulpali text-xs text-[#5f682a] mt-0.5">
                  ថ្ងៃពុធ ទី ១៧ ខែធ្នូ ឆ្នាំ ២០២៥
                </p>
                <p className="font-cinzel text-[10px] tracking-wider text-stone-600 mt-0.5">
                  THE PREMIER SENSOK CENTER (BUILDING H-I)
                </p>
              </div>

              <div className="mt-4 space-y-3.5 text-center text-xs">
                <div>
                  <span className="font-cinzel text-xs font-bold text-[#330404]">1:30 PM</span>
                  <p className="font-cinzel text-[11px] font-semibold text-[#5f682a]">GUEST ARRIVAL</p>
                  <p className="font-moulpali text-xs text-stone-600">ការទទួលភ្ញៀវកិត្តិយស</p>
                </div>

                <div className="h-[1px] w-16 mx-auto bg-[#330404]/20" />

                <div>
                  <span className="font-cinzel text-xs font-bold text-[#330404]">2:00 PM — 4:00 PM</span>
                  <p className="font-cinzel text-[11px] font-semibold text-[#5f682a]">
                    CAMBODIAN TRADITIONAL WEDDING CEREMONY
                  </p>
                  <p className="font-moulpali text-xs text-stone-600">
                    ពិធីកាត់សក់បង្កក់សិរី និងសំពះផ្ទឹម
                  </p>
                </div>

                <div className="h-[1px] w-16 mx-auto bg-[#330404]/20" />

                <div>
                  <span className="font-cinzel text-xs font-bold text-[#330404]">4:00 PM — 5:00 PM</span>
                  <p className="font-cinzel text-[11px] font-semibold text-[#5f682a]">CHINESE TEA CEREMONY</p>
                  <p className="font-moulpali text-xs text-stone-600">ពិធីលើកតែសែនព្រេន</p>
                </div>

                <div className="h-[1px] w-16 mx-auto bg-[#330404]/20" />

                <div>
                  <span className="font-cinzel text-xs font-bold text-[#330404]">DINNER IS SERVED</span>
                  <p className="font-cinzel text-[11px] font-semibold text-[#5f682a]">FAMILY DINNER CELEBRATION</p>
                  <p className="font-moulpali text-xs text-stone-600">
                    ពិធីទទួលទានអាហារពេលល្ងាចជាលក្ខណៈគ្រួសារ
                  </p>
                </div>
              </div>
            </div>

            {/* Flourish Divider */}
            <div className="reveal-zoom-in delay-150 my-4 flex items-center justify-center text-[#330404]">
              <svg className="h-6 w-32" viewBox="0 0 160 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M10 12 Q 40 0, 70 12 T 80 12 T 90 12 Q 120 24, 150 12" />
                <circle cx="80" cy="12" r="3" fill="currentColor" />
              </svg>
            </div>

            {/* DAY 2: THURSDAY 18TH DECEMBER 2025 */}
            <div className="fade-right delay-200 mx-auto my-5 max-w-md rounded-2xl border border-[#330404]/35 bg-white/90 p-5 shadow-xs backdrop-blur">
              <div className="border-b border-[#330404]/20 pb-3">
                <h3 className="font-cinzel text-sm sm:text-base font-bold tracking-wider text-[#330404]">
                  THURSDAY 18<sup>TH</sup> DECEMBER 2025
                </h3>
                <p className="font-moulpali text-xs text-[#5f682a] mt-0.5">
                  ថ្ងៃព្រហស្បតិ៍ ទី ១៨ ខែធ្នូ ឆ្នាំ ២០២៥
                </p>
                <p className="font-cinzel text-[10px] tracking-wider text-stone-600 mt-0.5">
                  THE PREMIER SENSOK CENTER (BUILDING H-I)
                </p>
              </div>

              <div className="mt-4 space-y-3.5 text-center text-xs">
                <div>
                  <span className="font-cinzel text-xs font-bold text-[#330404]">06:30 AM</span>
                  <p className="font-cinzel text-[11px] font-semibold text-[#5f682a]">MORNING GUEST ARRIVAL</p>
                  <p className="font-moulpali text-xs text-stone-600">ការទទួលភ្ញៀវពេលព្រឹកព្រលឹម</p>
                </div>

                <div className="h-[1px] w-16 mx-auto bg-[#330404]/20" />

                <div>
                  <span className="font-cinzel text-xs font-bold text-[#330404]">07:00 AM — 11:00 AM</span>
                  <p className="font-cinzel text-[11px] font-semibold text-[#5f682a]">
                    CAMBODIAN TRADITIONAL WEDDING CEREMONY
                  </p>
                  <p className="font-moulpali text-xs text-stone-600">
                    ពិធីហែជំនូន រៀបចំផ្ទឹម និងចងដៃ
                  </p>
                </div>

                <div className="h-[1px] w-16 mx-auto bg-[#330404]/20" />

                <div>
                  <span className="font-cinzel text-xs font-bold text-[#330404]">LUNCH IS SERVED</span>
                  <p className="font-cinzel text-[11px] font-semibold text-[#5f682a]">TRADITIONAL LUNCH</p>
                  <p className="font-moulpali text-xs text-stone-600">ពិធីទទួលទានអាហារថ្ងៃត្រង់</p>
                </div>

                <div className="h-[1px] w-16 mx-auto bg-[#330404]/20" />

                {/* Grand Evening Reception */}
                <div className="rounded-xl bg-[#330404]/10 p-3.5 border border-[#330404]/30">
                  <span className="font-cinzel text-xs font-bold text-[#330404]">05:00 PM ONWARDS</span>
                  <p className="font-cinzel text-xs font-bold tracking-wider text-[#330404]">
                    GRAND WEDDING RECEPTION &amp; DINNER
                  </p>
                  <p className="font-moulpali text-xs text-[#5f682a] mt-0.5">
                    ពិធីជប់លៀងមហោឡារិកអបអរសាទរអាពាហ៍ពិពាហ៍
                  </p>
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
          {/* RSVP & GUESTBOOK SECTION                                              */}
          {/* ===================================================================== */}
          <section id="rsvp" className="relative border-t border-[#330404]/20 py-11">
            <RsvpGuestbook />
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
