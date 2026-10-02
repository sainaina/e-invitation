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
  Sun,
} from 'lucide-react'

import ButterflyFlight from '@/components/butterfly-flight'
import AudioPlayer from '@/components/audio-player'
import UsefulFrame from '@/components/useful-frame'
import GalleryLightbox, { GalleryItem } from '@/components/gallery-lightbox'

const galleryList: GalleryItem[] = [
  {
    id: 'wedding-video',
    src: '/images/image1.png',
    videoSrc: '/videos/floral_background.mp4',
    alt: 'Pheakdey & Munineath - Pre-Wedding Highlight Video',
    captionEn: 'Pre-Wedding Highlight • Garden of Eternal Bloom',
    captionKm: 'វីដេអូអនុស្សាវរីយ៍អាពាហ៍ពិពាហ៍ • ភក្តី & មុនីនាថ',
    isVideo: true,
    layout: 'landscape',
  },
  {
    id: 'couple-formal',
    src: '/images/image.png',
    alt: 'Pheakdey & Munineath - Timeless Formal Portrait',
    captionEn: 'Everlasting Devotion • Walking Hand in Hand Forever',
    captionKm: 'កាន់ដៃគ្នាឆ្ពោះទៅរកសុភមង្គលអស់មួយជីវិត ក្នុងភាពថ្លៃថ្នូរ និងឧត្តុង្គឧត្តម',
    layout: 'portrait',
  },
  {
    id: 'bride-radiance',
    src: '/images/image32.png',
    alt: 'Bride Munineath - Pure Grace & Elegance',
    captionEn: 'Graceful Bride • Munineath in Pure Charm & Radiance',
    captionKm: 'កូនក្រមុំដ៏ស្រស់សោភា ទន់ភ្លន់ និងរមទម្យ • មុនីនាថ',
    layout: 'portrait',
  },
  {
    id: 'hero-roses',
    src: '/images/image1.png',
    alt: 'Pheakdey & Munineath - Romantic Rose Bouquet',
    captionEn: 'Sweetest Moment • A Garden of Red Roses & Vows',
    captionKm: 'ស្នាមញញឹមនៃក្តីស្រលាញ់ និងភួងផ្កាកុលាបក្រហមដ៏ស្រស់បំព្រង',
    layout: 'landscape',
  },
  {
    id: 'groom-distinction',
    src: '/images/groom_portrait.png',
    alt: 'Groom Pheakdey - Distinguished Devotion',
    captionEn: 'Distinguished Groom • Pheakdey with Honor & Devotion',
    captionKm: 'កូនកម្លោះដ៏ស្រស់សង្ហា ថ្លៃថ្នូរ និងស្មោះស្ម័គ្រ • ភក្តី',
    layout: 'portrait',
  },
  {
    id: 'bride-close',
    src: '/images/image3.png',
    alt: 'Bride Munineath - Sweet Smile',
    captionEn: 'Sweet Smile of Serenity & Purity • Munineath',
    captionKm: 'ស្នាមញញឹមស្រស់ថ្លា និងមនោសញ្ចេតនាដ៏បរិសុទ្ធ • មុនីនាថ',
    layout: 'portrait',
  },
  {
    id: 'grand-venue',
    src: '/images/premier_sensok_venue_1790042694667.jpg',
    alt: 'Grand Reception Hall at Premier Centre Sen Sok (The Grand Orchid)',
    captionEn: 'Grand Reception Hall • Premier Centre Sen Sok (The Grand Orchid)',
    captionKm: 'សាលមង្គលការដ៏ធំស្កឹមស្កៃ អមដោយទស្សនីយភាពទឹកបាញ់ និងពន្លឺព្រលប់ដ៏វិចិត្រ',
    layout: 'landscape',
  },
]

export default function Page() {
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false)
  const [isStampRotating, setIsStampRotating] = useState(false)
  const [isEnvelopeSliding, setIsEnvelopeSliding] = useState(false)
  const [isOpening, setIsOpening] = useState(false)
  const [envelopeKey, setEnvelopeKey] = useState(0)
  const [copiedAddress, setCopiedAddress] = useState(false)
  const [activeChildhood, setActiveChildhood] = useState<{ groom: boolean; bride: boolean }>({
    groom: true,
    bride: true,
  })

  // Lock page scrolling while the open invitation cover is active so the home invitation cannot scroll underneath
  useEffect(() => {
    if (!isEnvelopeOpen) {
      const prevBodyOverflow = document.body.style.overflow
      const prevHtmlOverflow = document.documentElement.style.overflow
      document.body.style.overflow = 'hidden'
      document.documentElement.style.overflow = 'hidden'
      window.scrollTo(0, 0)

      return () => {
        document.body.style.overflow = prevBodyOverflow
        document.documentElement.style.overflow = prevHtmlOverflow
      }
    } else {
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
    }
  }, [isEnvelopeOpen])

  // Countdown timer to March 18, 2027
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const targetDate = new Date('2027-03-18T17:00:00+07:00').getTime()

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
    // If envelope is still closed, ensure all invitation elements are reset so they animate when unveiled
    if (!isEnvelopeOpen && !isEnvelopeSliding) {
      const elements = document.querySelectorAll(
        '.fade-left, .fade-right, .reveal-slide-left, .reveal-slide-right, .reveal-on-scroll, .reveal-zoom-in'
      )
      elements.forEach((el) => el.classList.remove('is-visible'))
      return
    }

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
      { threshold: 0.05, rootMargin: '10px 0px -20px 0px' }
    )

    const observeAll = () => {
      const elements = document.querySelectorAll(
        '.fade-left, .fade-right, .reveal-slide-left, .reveal-slide-right, .reveal-on-scroll, .reveal-zoom-in'
      )
      elements.forEach((el) => observer.observe(el))
    }

    // Give a smooth stagger when the envelope dissolves
    const timer1 = setTimeout(observeAll, 120)
    const timer2 = setTimeout(observeAll, 450)
    const timer3 = setTimeout(observeAll, 900)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
      observer.disconnect()
    }
  }, [isEnvelopeOpen, isEnvelopeSliding])

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
PRODID:-//Pheakdey & Munineath Wedding//KH
CALSCALE:GREGORIAN
METHOD:PUBLISH
BEGIN:VEVENT
UID:pheakdey-munineath-wedding-2027@royal
DTSTAMP:20270301T000000Z
DTSTART:20270318T100000Z
DTEND:20270318T160000Z
SUMMARY:Wedding of Pheakdey & Munineath (ភក្តី និង មុនីនាថ)
DESCRIPTION:You are cordially invited to celebrate the wedding of Pheakdey & Munineath at The Premier Sensok Center (Building H-I).
LOCATION:The Premier Sensok Center (Building H-I), Phnom Penh, Cambodia
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'Pheakdey_Munineath_Wedding.ics')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const triggerOpenInvitation = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0)
      window.dispatchEvent(new CustomEvent('play-wedding-music'))
    }
    if (isOpening || isEnvelopeOpen) return
    setIsOpening(true)

    // 1. Immediately trigger 180-degree rotation of the wax seal with royal shockwave pop
    setIsStampRotating(true)

    // 2. Majestic, slow royal separation starts (2400ms duration)
    setTimeout(() => {
      setIsEnvelopeSliding(true)
    }, 450)

    // 3. Complete transition after doors fully glide off-screen
    setTimeout(() => {
      setIsEnvelopeOpen(true)
      setIsOpening(false)
    }, 2900)
  }

  return (
    <main
      className={`relative min-h-screen text-[#4A171B] selection:bg-[#4A171B] selection:text-white ${!isEnvelopeOpen ? 'h-[100dvh] overflow-hidden' : ''
        }`}
    >
      {/* Immersive Video Background with Crystal Clarity (Stable - No Scale on Scroll) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/images/wedding_floral_bg.jpg"
          className="h-full w-full object-cover"
        >
          <source src="/videos/floral_background.mp4" type="video/mp4" />
          <source src="/videos/arch_background.mp4" type="video/mp4" />
        </video>
        {/* Ambient overlay with /30 opacity */}
        <div className="absolute inset-0 bg-black/5" />
        <div className="absolute inset-0 bg-white/30" />
      </div>

      {/* Elegant 3D Royal Butterfly Flight Animation on Invitation (elevated to z-[60] so visible on all screens) */}
      <ButterflyFlight />

      {/* Floating Audio Player (hidden on open invitation landing page, appears once opened) */}
      <AudioPlayer isOpen={isEnvelopeOpen} />

      {/* ========================================================================= */}
      {/* ROYAL GATEFOLD SEPARATING PANELS (BACKGROUND SPLITS LEFT & RIGHT ON OPEN) */}
      {/* ========================================================================= */}
      <div
        key={envelopeKey}
        onClick={triggerOpenInvitation}
        className={`fixed inset-0 z-50 w-full h-[100dvh] overflow-hidden select-none transition-all duration-[1300ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${isEnvelopeOpen
          ? 'opacity-0 pointer-events-none invisible'
          : 'opacity-100 cursor-pointer'
          }`}
      >
        {/* ===================================================================== */}
        {/* LEFT SEPARATING HALF OF BACKGROUND IMAGE (MATCHING OPACITY)          */}
        {/* ===================================================================== */}
        <div
          className={`absolute inset-0 w-full h-[100dvh] pointer-events-none will-change-transform transition-all duration-[2400ms] ease-[cubic-bezier(0.19,1,0.22,1)] ${isEnvelopeSliding ? '-translate-x-[102%] scale-[1.01]' : 'translate-x-0 scale-100'
            }`}
          style={{
            clipPath: 'polygon(0% 0%, 50.08% 0%, 50.08% 100%, 0% 100%)',
            WebkitClipPath: 'polygon(0% 0%, 50.08% 0%, 50.08% 100%, 0% 100%)',
          }}
        >
          <img
            src="/images/wedding_floral_bg.jpg"
            alt="Floral Background Left"
            className="w-full h-full object-cover"
          />
          {/* Ambient overlay matching home background exactly (/30 opacity) */}
          <div className="absolute inset-0 bg-black/5" />
          <div className="absolute inset-0 bg-white/30" />
          {/* Subtle 3D Inner Edge Depth Shadow along the Parting Seam */}
          <div
            className={`absolute top-0 right-[49.92%] w-10 sm:w-16 h-full pointer-events-none transition-opacity duration-1000 bg-gradient-to-l from-black/25 via-black/10 to-transparent ${isEnvelopeSliding ? 'opacity-100' : 'opacity-0'
              }`}
          />
        </div>

        {/* ===================================================================== */}
        {/* RIGHT SEPARATING HALF OF BACKGROUND IMAGE (MATCHING OPACITY)         */}
        {/* ===================================================================== */}
        <div
          className={`absolute inset-0 w-full h-[100dvh] pointer-events-none will-change-transform transition-all duration-[2400ms] ease-[cubic-bezier(0.19,1,0.22,1)] ${isEnvelopeSliding ? 'translate-x-[102%] scale-[1.01]' : 'translate-x-0 scale-100'
            }`}
          style={{
            clipPath: 'polygon(49.92% 0%, 100% 0%, 100% 100%, 49.92% 100%)',
            WebkitClipPath: 'polygon(49.92% 0%, 100% 0%, 100% 100%, 49.92% 100%)',
          }}
        >
          <img
            src="/images/wedding_floral_bg.jpg"
            alt="Floral Background Right"
            className="w-full h-full object-cover"
          />
          {/* Ambient overlay matching home background exactly (/30 opacity) */}
          <div className="absolute inset-0 bg-black/5" />
          <div className="absolute inset-0 bg-white/30" />
          {/* Subtle 3D Inner Edge Depth Shadow along the Parting Seam */}
          <div
            className={`absolute top-0 left-[49.92%] w-10 sm:w-16 h-full pointer-events-none transition-opacity duration-1000 bg-gradient-to-r from-black/25 via-black/10 to-transparent ${isEnvelopeSliding ? 'opacity-100' : 'opacity-0'
              }`}
          />
        </div>

        {/* ===================================================================== */}
        {/* CENTER CONTENT LAYER (FLOATS ON TOP OF BOTH PANELS)                   */}
        {/* ===================================================================== */}
        <div
          className={`relative z-20 w-full h-full flex flex-col justify-between items-center text-center p-4 sm:p-8 md:p-10 transition-all duration-1000 ease-[cubic-bezier(0.19,1,0.22,1)] ${isEnvelopeSliding ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
            }`}
        >
          {/* Top Eyebrow */}
          <div className="pt-2 sm:pt-4">
            <p className="cover-fade-left cover-delay-100 font-cinzel text-[10px] sm:text-xs font-semibold tracking-[0.35em] text-[#5f682a] drop-shadow-xs">
              ROYAL WEDDING INVITATION
            </p>
            <p className="cover-fade-right cover-delay-200 font-moulpali text-base sm:text-lg text-[#4A171B] mt-1 drop-shadow-xs">
              សិរីសួស្តី អាពាហ៍ពិពាហ៍
            </p>
          </div>

          {/* Couple Calligraphy & Red Wax Seal Medallion in Center */}
          <div className="my-auto py-1 sm:py-2 w-full max-w-lg">
            <h1 className="cover-fade-left cover-delay-300 font-great-vibes text-5xl sm:text-7xl md:text-8xl text-[#4A171B] leading-tight drop-shadow-[0_2px_10px_rgba(255,255,255,0.9)]">
              Pheakdey <span className="font-great-vibes text-3xl sm:text-5xl text-[#5f682a]">&amp;</span> Munineath
            </h1>

            <p className="cover-fade-left cover-delay-500 mt-1.5 font-cinzel text-[10px] sm:text-xs tracking-[0.25em] text-[#5f682a] font-semibold">
              18TH MARCH 2027 • PHNOM PENH
            </p>

            {/* CIRCULAR MEDALLION WITH RED WAX SEAL (Centered Over Seam) */}
            <div className="cover-scale-in cover-delay-650 my-4 sm:my-6 flex justify-center">
              <div
                className={`group/seal relative flex h-28 w-28 sm:h-34 sm:w-34 items-center justify-center rounded-full border-2 border-[#4A171B] shadow-[0_12px_28px_rgba(74,23,27,0.35)] ring-4 ring-[#5f682a]/40 overflow-hidden cursor-pointer transition-all duration-700 ${isStampRotating
                  ? 'animate-seal-open-pop ring-8 ring-[#4A171B]/70 shadow-[0_0_35px_rgba(74,23,27,0.5)]'
                  : 'hover:scale-105 active:scale-95'
                  }`}
              >
                {/* Luminous Red Pulsing Halo */}
                <div className="seal-pulse absolute inset-0 rounded-full bg-[#4A171B]/25" />

                {/* Royal Shockwave Wave Burst on Click */}
                {isStampRotating && (
                  <div className="animate-seal-break absolute inset-0 rounded-full border-4 border-[#4A171B] bg-radial-[circle,_rgba(74,23,27,0.45)_0%,_transparent_70%]" />
                )}

                {/* Royal Burgundy & Pearl Starburst on Click */}
                {isStampRotating && (
                  <div className="animate-seal-royal-burst pointer-events-none absolute -inset-10 rounded-full border-2 border-[#4A171B]/60 bg-radial-[circle,_rgba(74,23,27,0.35)_0%,_rgba(255,248,240,0.3)_40%,_transparent_75%]" />
                )}

                {/* The Wax Seal Image */}
                <img
                  src="/images/wax_seal_pm.jpg"
                  alt="P&M Royal Red Wax Seal"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover/seal:scale-105"
                />

                {/* Decorative Dual Inner Filigree Rings */}
                <div className="pointer-events-none absolute inset-1.5 sm:inset-2 rounded-full border border-[#5f682a]/40" />
                <div className="pointer-events-none absolute inset-2.5 sm:inset-3 rounded-full border border-[#4A171B]/40" />
              </div>
            </div>

            {/* Tap Hint */}
            <p className="cover-fade-left cover-delay-750 font-moulpali text-xs sm:text-sm text-[#4A171B] animate-pulse drop-shadow-xs font-semibold">
              {isOpening ? 'កំពុងបើកស្រោមសំបុត្រ...' : 'សូមចុចលើត្រាដើម្បីបើកលិខិតអញ្ជើញ'}
            </p>
            <p className="cover-fade-right cover-delay-850 font-cinzel text-[9px] sm:text-[10px] tracking-widest text-[#5f682a] mt-1 font-bold">
              {isOpening ? 'UNVEILING INVITATION...' : 'TAP SEAL TO UNVEIL INVITATION'}
            </p>
          </div>

          {/* Bottom Button */}
          <div className="cover-fade-up cover-delay-950 pb-2 sm:pb-4 w-full max-w-xs">
            <button
              onClick={(e) => {
                e.stopPropagation()
                triggerOpenInvitation()
              }}
              className={`w-full inline-flex items-center justify-center gap-2 rounded-full border border-[#5f682a] bg-[#4A171B] px-7 py-2.5 sm:py-3 font-cinzel text-xs font-semibold tracking-widest text-white shadow-xl transition-all duration-300 ${isOpening
                ? 'scale-95 bg-[#5f682a] ring-4 ring-[#5f682a]/50 ring-offset-2 ring-offset-[#FAF7F2]'
                : 'hover:scale-105 hover:bg-[#5f682a] active:scale-95'
                }`}
            >
              <span>{isOpening ? 'OPENING INVITATION...' : 'OPEN INVITATION'}</span>
              <ChevronDown className={`h-4 w-4 ${isOpening ? 'rotate-180 transition-transform duration-500' : 'animate-bounce'}`} />
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MAIN INVITATION: FRAMED WITH CUSTOM ARCH & CLEAN CHANDELIER               */}
      {/* ========================================================================= */}
      <div
        className={`transition-all duration-[2400ms] ease-[cubic-bezier(0.19,1,0.22,1)] ${isEnvelopeOpen || isEnvelopeSliding
          ? 'opacity-100 translate-y-0 scale-100 filter-none'
          : 'opacity-0 translate-y-12 scale-[0.88] blur-[2px] pointer-events-none h-[100dvh] overflow-hidden'
          }`}
      >
        <UsefulFrame
          onReopenEnvelope={() => {
            window.scrollTo({ top: 0, behavior: 'instant' })
            setIsEnvelopeOpen(false)
            setIsEnvelopeSliding(false)
            setIsStampRotating(false)
            setIsOpening(false)
            setEnvelopeKey((prev) => prev + 1)
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
          <header className="relative w-full px-4 sm:px-8 lg:px-12 pt-8 sm:pt-14 lg:pt-16 pb-10 sm:pb-14 text-center flex flex-col justify-between items-center rounded-none sm:rounded-t-[36px]">
            {/* Top Ornamental Header */}
            <div className="relative z-10 pt-2 sm:pt-4">
              <span className="fade-left text-xs sm:text-sm md:text-base text-[#5f682a] block select-none">❖ · ❦ · ❖</span>
              <h1 className="fade-right delay-100 font-moulpali text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-[#4A171B] tracking-wide mt-1.5 drop-shadow-[0_2px_8px_rgba(255,255,255,0.95)]">
                សិរីសួស្តី អាពាហ៍ពិពាហ៍
              </h1>
              <p className="fade-left delay-150 font-cinzel text-[10px] sm:text-xs md:text-sm font-semibold tracking-[0.35em] text-[#5f682a] mt-1 uppercase">
                Royal Wedding Invitation
              </p>
            </div>

            {/* 2-Column Honored Parents Section (Clean, Open & Elegant - Responsive) */}
            <div className="relative z-10 w-full max-w-xl md:max-w-2xl lg:max-w-3xl my-5 sm:my-8 px-2 sm:px-4">
              <div className="grid grid-cols-2 divide-x divide-[#5f682a]/30 text-center">
                {/* Bride's Parents (Left) */}
                <div className="fade-left delay-200 px-3 sm:px-6">
                  <p className="font-moul-light font-moul text-xs sm:text-sm md:text-base text-[#5f682a]">
                    មាតាបិតាខាងស្រី
                  </p>
                  <div className="h-0.5 w-10 sm:w-14 mx-auto bg-[#5f682a]/40 my-2 sm:my-2.5 rounded-full" />
                  <div className="space-y-1 sm:space-y-1.5">
                    <p className="font-moul-light font-moul text-sm sm:text-base md:text-lg lg:text-xl text-[#4A171B] leading-relaxed">
                      លោក ឈីវ ម៉េង
                    </p>
                    <p className="font-moul-light font-moul text-sm sm:text-base md:text-lg lg:text-xl text-[#4A171B] leading-relaxed">
                      លោកស្រី លី ហួង
                    </p>
                  </div>
                </div>

                {/* Groom's Parents (Right) */}
                <div className="fade-right delay-200 px-3 sm:px-6">
                  <p className="font-moul-light font-moul text-xs sm:text-sm md:text-base text-[#5f682a]">
                    មាតាបិតាខាងប្រុស
                  </p>
                  <div className="h-0.5 w-10 sm:w-14 mx-auto bg-[#5f682a]/40 my-2 sm:my-2.5 rounded-full" />
                  <div className="space-y-1 sm:space-y-1.5">
                    <p className="font-moul-light font-moul text-sm sm:text-base md:text-lg lg:text-xl text-[#4A171B] leading-relaxed">
                      លោក នីវ សុវណ្ណ
                    </p>
                    <p className="font-moul-light font-moul text-sm sm:text-base md:text-lg lg:text-xl text-[#4A171B] leading-relaxed">
                      អ្នកស្រី គឹម សុផល
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Delicate Sage Divider */}
            <div className="reveal-zoom-in delay-150 my-5 sm:my-7 flex items-center justify-center gap-3">
              <div className="h-px w-20 sm:w-32 md:w-44 bg-gradient-to-r from-transparent to-[#5f682a]/60" />
              <span className="font-cinzel text-xs sm:text-sm text-[#5f682a] select-none">✦ · ❧ · ✦</span>
              <div className="h-px w-20 sm:w-32 md:w-44 bg-gradient-to-l from-transparent to-[#5f682a]/60" />
            </div>

            {/* Formal Khmer Invitation Greeting & Body */}
            <div className="text-center space-y-2 px-2 max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto">
              <h2 className="fade-left delay-100 font-moulpali text-base sm:text-xl md:text-2xl text-[#4A171B] drop-shadow-xs">
                មានកិត្តិយសសូមគោរពអញ្ជើញ
              </h2>
              <p className="fade-right delay-150 font-kantumruy text-xs sm:text-sm md:text-[15px] lg:text-base text-[#4A171B] font-medium leading-relaxed mx-auto">
                ឯកឧត្តម លោកជំទាវ លោក លោកស្រី អ្នកនាងកញ្ញា និងប្រិយមិត្តជិតឆ្ងាយ អញ្ជើញចូលរួមជាអធិបតី និងជាភ្ញៀវកិត្តិយស ដើម្បីប្រសិទ្ធពរជ័យសិរីសួស្តី ក្នុងពិធីរៀបអាពាហ៍ពិពាហ៍ កូនប្រុស-កូនស្រី របស់យើងខ្ញុំ។
              </p>
            </div>

            {/* The Couple with Center Royal Ampersand */}
            <div className="relative z-10 w-full max-w-2xl md:max-w-3xl lg:max-w-4xl my-5 sm:my-8 px-2 sm:px-6">
              <div className="flex items-center justify-between sm:justify-center gap-3 sm:gap-8 lg:gap-12">
                {/* Bride (Left) */}
                <div className="fade-left delay-200 flex-1 text-center sm:text-right">
                  <span className="font-moul-light font-moul text-xs sm:text-sm md:text-base text-[#5f682a] block">
                    កូនស្រីនាម
                  </span>
                  <h3 className="font-moul-light font-moul text-xl sm:text-3xl md:text-4xl lg:text-5xl text-[#4A171B] mt-0.5 leading-snug">
                    មុនីនាថ
                  </h3>
                </div>

                {/* Central Royal Calligraphic Ampersand */}
                <div className="reveal-zoom-in delay-150 flex-shrink-0 flex flex-col items-center justify-center px-2 sm:px-6 select-none">
                  <span className="font-great-vibes text-5xl sm:text-6xl md:text-8xl text-[#5f682a] leading-none drop-shadow-xs transition-transform duration-300 hover:scale-110">
                    &amp;
                  </span>
                  <span className="font-cinzel text-[9px] sm:text-xs md:text-sm tracking-[0.25em] text-[#4A171B] font-bold mt-0.5 sm:mt-1">
                    2027
                  </span>
                </div>

                {/* Groom (Right) */}
                <div className="fade-right delay-200 flex-1 text-center sm:text-left">
                  <span className="font-moul-light font-moul text-xs sm:text-sm md:text-base text-[#5f682a] block">
                    កូនប្រុសនាម
                  </span>
                  <h3 className="font-moul-light font-moul text-xl sm:text-3xl md:text-4xl lg:text-5xl text-[#4A171B] mt-0.5 leading-snug">
                    ភក្តី
                  </h3>
                </div>
              </div>
            </div>

            {/* Event Date, Time & Venue in Khmer */}
            <div className="fade-left delay-250 relative z-10 w-full max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto my-3 sm:my-5 text-center space-y-1.5">
              <p className="font-moulpali text-xs sm:text-sm md:text-base lg:text-lg text-[#4A171B] leading-relaxed">
                ថ្ងៃព្រហស្បតិ៍ ទី ១៨ ខែមីនា ឆ្នាំ ២០២៧ វេលាម៉ោង ៥:០០ រសៀល
              </p>
              <p className="font-moulpali text-xs sm:text-sm md:text-base lg:text-lg text-[#5f682a] leading-relaxed">
                នៅមជ្ឈមណ្ឌល The Premier Sensok Center (អគារ H-I) រាជធានីភ្នំពេញ
              </p>
            </div>

            {/* Modern English Wedding Invitation Section */}
            <div className="relative z-10 w-full max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto mt-3 sm:mt-5 pt-4 sm:pt-5 border-t border-[#5f682a]/30">
              <h2 className="fade-right delay-100 font-cinzel text-base sm:text-xl md:text-2xl font-bold tracking-[0.25em] text-[#4A171B] uppercase">
                Wedding Invitation
              </h2>
              <p className="fade-left delay-150 font-cinzel text-[11px] sm:text-xs md:text-sm tracking-wider text-[#4A171B]/90 mt-1.5 max-w-md sm:max-w-lg lg:max-w-xl mx-auto leading-relaxed">
                Together with their families, the bride and groom respectfully invite you to celebrate their wedding and share in the joy of this special occasion.
              </p>

              {/* Date & Location Pill Badge */}
              <div className="fade-right delay-200 mt-4 inline-flex items-center gap-2 sm:gap-2.5 rounded-full border border-[#5f682a]/50 bg-white/70 px-5 sm:px-8 py-2 sm:py-2.5 shadow-xs">
                <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-[#5f682a]" />
                <span className="font-cinzel text-xs sm:text-sm md:text-base font-bold tracking-wider text-[#4A171B]">
                  THURSDAY 18<sup>TH</sup> MARCH 2027 • 5:00 PM
                </span>
              </div>
            </div>

            {/* Save the Date Button & Countdown Timer (Redesigned & Modern) */}
            <div className="relative z-10 mt-6 sm:mt-8 w-full flex flex-col items-center justify-center gap-4 sm:gap-5">
              <button
                onClick={handleSaveCalendar}
                className="fade-left delay-200 group relative inline-flex items-center gap-2.5 rounded-full border border-[#5f682a] bg-[#4A171B] px-8 sm:px-11 py-3 sm:py-3.5 shadow-[0_4px_18px_rgba(74,23,27,0.3)] hover:bg-[#5f682a] transition-all duration-300 hover:scale-105 active:scale-95 text-white ring-2 ring-[#5f682a]/30"
              >
                <span className="text-[#5f682a] group-hover:text-white transition-colors text-xs sm:text-sm">✦</span>
                <span className="font-great-vibes text-xl sm:text-2xl md:text-3xl font-normal tracking-wide text-white drop-shadow-xs">
                  Save our Date
                </span>
                <span className="text-[#5f682a] group-hover:text-white transition-colors text-xs sm:text-sm">✦</span>
              </button>

              {/* Countdown Timer with English & Kantumruy Pro */}
              <div className="fade-right delay-250 grid grid-cols-4 gap-2.5 sm:gap-4 md:gap-5 text-center text-xs">
                <div className="rounded-2xl border border-[#5f682a]/40 bg-white/70 p-2.5 sm:p-3.5 md:p-4 shadow-xs min-w-[62px] sm:min-w-[85px] md:min-w-[105px] lg:min-w-[120px] ring-1 ring-[#4A171B]/10 transition-transform hover:-translate-y-0.5">
                  <span className="block font-cinzel text-base sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#4A171B]">{timeLeft.days}</span>
                  <span className="block font-cinzel text-[8px] sm:text-[10px] md:text-xs tracking-wider text-[#4A171B]/70 font-bold">DAYS</span>
                  <span className="block font-moulpali text-[10px] sm:text-xs md:text-sm text-[#5f682a]">ថ្ងៃ</span>
                </div>
                <div className="rounded-2xl border border-[#5f682a]/40 bg-white/70 p-2.5 sm:p-3.5 md:p-4 shadow-xs min-w-[62px] sm:min-w-[85px] md:min-w-[105px] lg:min-w-[120px] ring-1 ring-[#4A171B]/10 transition-transform hover:-translate-y-0.5">
                  <span className="block font-cinzel text-base sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#4A171B]">{timeLeft.hours}</span>
                  <span className="block font-cinzel text-[8px] sm:text-[10px] md:text-xs tracking-wider text-[#4A171B]/70 font-bold">HOURS</span>
                  <span className="block font-moulpali text-[10px] sm:text-xs md:text-sm text-[#5f682a]">ម៉ោង</span>
                </div>
                <div className="rounded-2xl border border-[#5f682a]/40 bg-white/70 p-2.5 sm:p-3.5 md:p-4 shadow-xs min-w-[62px] sm:min-w-[85px] md:min-w-[105px] lg:min-w-[120px] ring-1 ring-[#4A171B]/10 transition-transform hover:-translate-y-0.5">
                  <span className="block font-cinzel text-base sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#4A171B]">{timeLeft.minutes}</span>
                  <span className="block font-cinzel text-[8px] sm:text-[10px] md:text-xs tracking-wider text-[#4A171B]/70 font-bold">MINS</span>
                  <span className="block font-moulpali text-[10px] sm:text-xs md:text-sm text-[#5f682a]">នាទី</span>
                </div>
                <div className="rounded-2xl border border-[#5f682a]/40 bg-white/70 p-2.5 sm:p-3.5 md:p-4 shadow-xs min-w-[62px] sm:min-w-[85px] md:min-w-[105px] lg:min-w-[120px] ring-1 ring-[#4A171B]/10 transition-transform hover:-translate-y-0.5">
                  <span className="block font-cinzel text-base sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#4A171B]">{timeLeft.seconds}</span>
                  <span className="block font-cinzel text-[8px] sm:text-[10px] md:text-xs tracking-wider text-[#4A171B]/70 font-bold">SECS</span>
                  <span className="block font-moulpali text-[10px] sm:text-xs md:text-sm text-[#5f682a]">វិនាទី</span>
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
              <div className="h-px w-20 sm:w-28 bg-gradient-to-r from-transparent to-[#5f682a]/50" />
              <span className="font-cinzel text-xs text-[#5f682a] select-none">✦ · ❦ · ✦</span>
              <div className="h-px w-20 sm:w-28 bg-gradient-to-l from-transparent to-[#5f682a]/50" />
            </div>
            {/* Soft Ambient Corner Glows */}
            <div className="pointer-events-none absolute -top-8 -left-8 w-40 h-40 opacity-25 rounded-full bg-radial-[circle,_rgba(95,104,42,0.4)_0%,_transparent_70%]" />
            <div className="pointer-events-none absolute -bottom-8 -right-8 w-40 h-40 opacity-25 rounded-full bg-radial-[circle,_rgba(74,23,27,0.4)_0%,_transparent_70%]" />

            <p className="fade-left font-cinzel text-[10px] tracking-[0.3em] text-[#5f682a]">
              THE COUPLE
            </p>
            <h2 className="fade-right delay-100 mt-0.5 font-great-vibes text-4xl sm:text-5xl md:text-6xl text-[#4A171B]">
              Bride &amp; Groom
            </h2>
            <p className="fade-left delay-150 font-moulpali text-sm sm:text-base text-[#5f682a] mt-0.5">
              កូនកំលោះ និង កូនក្រមុំ
            </p>

            <div className="filigree-divider">
              <span className="text-xs text-[#5f682a]">✦</span>
            </div>

            <p className="fade-right delay-200 font-moulpali text-xs text-[#5f682a] mb-8">
              ចុចលើរូបថតដើម្បីផ្លាស់ប្តូររូបថតកុមារភាព និងរូបបច្ចុប្បន្ន
            </p>

            {/* STAGGERED DIAGONAL LAYOUT (Expansive & Responsive) */}
            <div className="relative mx-auto w-full max-w-2xl md:max-w-4xl lg:max-w-5xl px-3 sm:px-6 md:px-8 space-y-8 md:space-y-12">

              {/* ROW 1: GROOM (Photo on Left, Name/Details on Right) */}
              <div className="flex items-center justify-between gap-3 sm:gap-8 md:gap-12">
                {/* Groom Cameo Photo (Left) */}
                <div className="fade-left delay-100 flex-shrink-0">
                  <div
                    onClick={() =>
                      setActiveChildhood((prev) => ({ ...prev, groom: !prev.groom }))
                    }
                    className="group relative cursor-pointer select-none transition-transform duration-500 hover:scale-105"
                    aria-label="Toggle Groom photo"
                  >
                    {/* Vintage Ornate Royal Cameo Frame (Dainty, Elegant & Perfectly Proportionate) */}
                    <div className="relative p-2 sm:p-2.5 md:p-3 rounded-[50%_50%_48%_48%] bg-gradient-to-b from-[#FFFDF9] via-[#FAF5EB] to-[#EFE7D8] shadow-[0_16px_36px_-8px_rgba(74,23,27,0.35),0_0_0_1.5px_rgba(95,104,42,0.35)] border border-[#4A171B]/40 ring-2 ring-[#5f682a]/30">
                      {/* Top Ornamental Baroque Crest Crown */}
                      <div className="pointer-events-none absolute -top-2.5 inset-x-0 mx-auto w-fit flex items-center justify-center text-[#5f682a] drop-shadow-xs">
                        <span className="font-cinzel text-[11px] sm:text-xs">❖</span>
                      </div>

                      {/* Dotted Antique Jewel Bezel */}
                      <div className="pointer-events-none absolute inset-1 sm:inset-1.5 rounded-[50%_50%_48%_48%] border border-dashed border-[#5f682a]/40" />

                      {/* Photo Container with Inner Bevel Vignette */}
                      <div className="relative w-32 h-44 sm:w-42 sm:h-56 md:w-48 md:h-64 overflow-hidden rounded-[50%_50%_48%_48%] border-2 border-[#4A171B]/35 bg-stone-100 shadow-[inset_0_2px_10px_rgba(74,23,27,0.22)]">
                        <img
                          src={
                            activeChildhood.groom
                              ? '/images/groom_portrait.png'
                              : '/images/image.png'
                          }
                          alt="Groom Pheakdey"
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-108"
                        />
                        {/* Soft antique portrait sheen overlay */}
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/10" />
                      </div>

                      {/* Interactive Childhood / Present Switcher Pill Badge */}
                      <div className="absolute -bottom-3 inset-x-0 mx-auto w-fit flex items-center gap-1.5 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-[#4A171B] hover:bg-[#5f682a] border border-[#5f682a] text-white shadow-md transition-all duration-300 transform group-hover:scale-105">
                        <RefreshCw className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-[#EAD29A] group-hover:text-white transition-colors" />
                        <span className="font-moulpali text-[10px] sm:text-xs tracking-wide text-white">
                          {activeChildhood.groom ? 'កុមារភាព' : 'បច្ចុប្បន្ន'}
                        </span>
                        <span className="text-[8px] sm:text-[10px] tracking-widest text-[#EAD29A] group-hover:text-white transition-colors pl-0.5">
                          {activeChildhood.groom ? '●' : '○'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Groom Name & Role */}
                <div className="fade-right delay-200 flex-1 text-left pl-2 sm:pl-4 md:pl-6">
                  <p className="font-cinzel text-xs sm:text-sm md:text-base font-bold tracking-[0.25em] text-[#5f682a]">
                    GROOM
                  </p>
                  <p className="font-moul-light font-moul text-xs sm:text-sm md:text-base text-[#4A171B] mt-0.5">
                    កូនកំលោះ
                  </p>
                  <h3 className="mt-1 font-cinzel text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-[0.18em] text-[#4A171B] leading-tight uppercase">
                    PHEAKDEY
                  </h3>
                  <p className="font-moul-light font-moul text-sm sm:text-xl md:text-2xl text-[#5f682a] mt-1">
                    ភក្តី
                  </p>
                </div>
              </div>

              {/* DIAGONAL CENTER: ROMANTIC AMPERSAND */}
              <div className="reveal-zoom-in delay-150 relative my-3 sm:my-5 flex items-center justify-center">
                <div className="h-[1px] w-16 sm:w-32 md:w-48 bg-gradient-to-r from-transparent to-[#5f682a]" />
                <span className="mx-4 sm:mx-8 font-great-vibes text-4xl sm:text-6xl md:text-7xl text-[#4A171B] select-none leading-none drop-shadow-xs">
                  &amp;
                </span>
                <div className="h-[1px] w-16 sm:w-32 md:w-48 bg-gradient-to-l from-transparent to-[#5f682a]" />
              </div>

              {/* ROW 2: BRIDE (Name/Details on Left, Photo on Right) */}
              <div className="flex items-center justify-between gap-3 sm:gap-8 md:gap-12">
                {/* Bride Name & Role */}
                <div className="fade-left delay-200 flex-1 text-right pr-2 sm:pr-4 md:pr-6">
                  <p className="font-cinzel text-xs sm:text-sm md:text-base font-bold tracking-[0.25em] text-[#5f682a]">
                    BRIDE
                  </p>
                  <p className="font-moul-light font-moul text-xs sm:text-sm md:text-base text-[#4A171B] mt-0.5">
                    កូនក្រមុំ
                  </p>
                  <h3 className="mt-1 font-cinzel text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-[0.18em] text-[#4A171B] leading-tight uppercase">
                    MUNINEATH
                  </h3>
                  <p className="font-moul-light font-moul text-sm sm:text-xl md:text-2xl text-[#5f682a] mt-1">
                    មុនីនាថ
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
                    {/* Vintage Ornate Royal Cameo Frame (Dainty, Elegant & Perfectly Proportionate) */}
                    <div className="relative p-2 sm:p-2.5 md:p-3 rounded-[50%_50%_48%_48%] bg-gradient-to-b from-[#FFFDF9] via-[#FAF5EB] to-[#EFE7D8] shadow-[0_16px_36px_-8px_rgba(74,23,27,0.35),0_0_0_1.5px_rgba(95,104,42,0.35)] border border-[#4A171B]/40 ring-2 ring-[#5f682a]/30">
                      {/* Top Ornamental Baroque Crest Crown */}
                      <div className="pointer-events-none absolute -top-2.5 inset-x-0 mx-auto w-fit flex items-center justify-center text-[#5f682a] drop-shadow-xs">
                        <span className="font-cinzel text-[11px] sm:text-xs">❖</span>
                      </div>

                      {/* Dotted Antique Jewel Bezel */}
                      <div className="pointer-events-none absolute inset-1 sm:inset-1.5 rounded-[50%_50%_48%_48%] border border-dashed border-[#5f682a]/40" />

                      {/* Photo Container with Inner Bevel Vignette */}
                      <div className="relative w-32 h-44 sm:w-42 sm:h-56 md:w-48 md:h-64 overflow-hidden rounded-[50%_50%_48%_48%] border-2 border-[#4A171B]/35 bg-stone-100 shadow-[inset_0_2px_10px_rgba(74,23,27,0.22)]">
                        <img
                          src={
                            activeChildhood.bride
                              ? '/images/image3.png'
                              : '/images/image.png'
                          }
                          alt="Bride Munineath"
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-108"
                        />
                        {/* Soft antique portrait sheen overlay */}
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/10" />
                      </div>

                      {/* Interactive Childhood / Present Switcher Pill Badge */}
                      <div className="absolute -bottom-3 inset-x-0 mx-auto w-fit flex items-center gap-1.5 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-[#4A171B] hover:bg-[#5f682a] border border-[#5f682a] text-white shadow-md transition-all duration-300 transform group-hover:scale-105">
                        <RefreshCw className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-[#EAD29A] group-hover:text-white transition-colors" />
                        <span className="font-moulpali text-[10px] sm:text-xs tracking-wide text-white">
                          {activeChildhood.bride ? 'កុមារភាព' : 'បច្ចុប្បន្ន'}
                        </span>
                        <span className="text-[8px] sm:text-[10px] tracking-widest text-[#EAD29A] group-hover:text-white transition-colors pl-0.5">
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
          <section id="gallery" className="relative border-t border-[#5f682a]/20 px-3.5 sm:px-8 py-12 text-center overflow-hidden">
            {/* Consistent Section Header matching Bride & Groom / Ceremony / Venue */}
            <div className="relative">
              <div className="fade-left mb-3 flex items-center justify-center gap-3">
                <div className="h-px w-12 sm:w-20 bg-gradient-to-r from-transparent to-[#5f682a]/50" />
                <span className="font-cinzel text-xs text-[#5f682a] select-none">❖ · ❦ · ❖</span>
                <div className="h-px w-12 sm:w-20 bg-gradient-to-l from-transparent to-[#5f682a]/50" />
              </div>

              <p className="fade-left delay-100 font-cinzel text-[10px] tracking-[0.3em] text-[#5f682a] uppercase">
                PRECIOUS MOMENTS
              </p>
              <h2 className="fade-right delay-150 mt-0.5 font-great-vibes text-4xl sm:text-5xl md:text-6xl text-[#4A171B]">
                Gallery of Moments
              </h2>
              <p className="fade-left delay-200 font-moulpali text-xs sm:text-sm text-[#5f682a] mt-0.5">
                កម្រងរូបភាពអនុស្សាវរីយ៍
              </p>

              <div className="filigree-divider">
                <span className="text-xs text-[#5f682a]">✦</span>
              </div>
            </div>

            {/* Consistent Responsive Container matching Wedding Events & Venue */}
            <div className="relative mx-auto mt-8 max-w-2xl md:max-w-4xl lg:max-w-5xl px-2 sm:px-6">
              <GalleryLightbox items={galleryList} lang="km" />
            </div>
          </section>

          {/* ===================================================================== */}
          {/* WEDDING CEREMONY PROGRAM (MATCHING USER REFERENCE PICTURE)            */}
          {/* ===================================================================== */}
          {/* ===================================================================== */}
          {/* WEDDING CEREMONY PROGRAM (MATCHING REFERENCE LAYOUT + MODERN ANIMATION) */}
          {/* ===================================================================== */}
          <section id="event" className="relative border-t border-[#5f682a]/20 px-3.5 sm:px-8 py-12 text-center overflow-hidden">
            {/* Consistent Section Header matching Bride & Groom / Gallery / Venue */}
            <div className="relative">
              <div className="fade-left mb-3 flex items-center justify-center gap-3">
                <div className="h-px w-12 sm:w-20 bg-gradient-to-r from-transparent to-[#5f682a]/50" />
                <span className="font-cinzel text-xs text-[#5f682a] select-none">❖ · ❦ · ❖</span>
                <div className="h-px w-12 sm:w-20 bg-gradient-to-l from-transparent to-[#5f682a]/50" />
              </div>

              <p className="fade-left delay-100 font-cinzel text-[10px] tracking-[0.3em] text-[#5f682a] uppercase">
                WEDDING TIMELINE
              </p>
              <h2 className="fade-right delay-150 mt-0.5 font-great-vibes text-4xl sm:text-5xl md:text-6xl text-[#4A171B]">
                Wedding Events
              </h2>
              <p className="fade-left delay-200 font-moulpali text-xs sm:text-sm text-[#5f682a] mt-0.5">
                ថ្ងៃព្រហស្បតិ៍ ទី១៨ ខែមីនា ឆ្នាំ២០២៧
              </p>

              <div className="filigree-divider">
                <span className="text-xs text-[#5f682a]">✦</span>
              </div>
            </div>

            {/* Modern Wedding Event Schedule (Expansive & Responsive) */}
            <div className="relative mx-auto mt-8 max-w-2xl md:max-w-4xl lg:max-w-5xl px-2 sm:px-6">
              {/* Morning Ceremonies Header Chip */}
              <div className="fade-left delay-100 flex items-center justify-center gap-3 mb-5">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#5f682a]/40" />
                <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/60 border border-[#5f682a]/40 text-[#4A171B] font-kantumruy text-xs sm:text-sm font-bold tracking-wide shadow-xs">
                  <Sun className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#5f682a]" />
                  កម្មវិធីពេលព្រឹក • Morning Ceremonies
                </span>
                <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#5f682a]/40" />
              </div>

              {/* Morning Events Cards in Responsive 2-Column Grid on Tablet/Desktop */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 lg:gap-5">
                {/* Event 1 */}
                <div className="fade-left delay-100 group relative overflow-hidden rounded-2xl border border-[#5f682a]/30 bg-white/60 p-3.5 sm:p-4 text-left shadow-xs transition-all duration-300 hover:border-[#5f682a]/60 hover:bg-white/80 hover:shadow-md">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="flex flex-col items-center justify-center min-w-[70px] sm:min-w-[80px] py-1.5 px-2 rounded-xl bg-[#5f682a]/15 border border-[#5f682a]/25 group-hover:bg-[#5f682a]/25 transition-colors">
                      <span className="font-kantumruy text-sm sm:text-base font-bold text-[#4A171B]">
                        ០៦:០០
                      </span>
                      <span className="font-kantumruy text-[10px] sm:text-xs font-semibold text-[#5f682a]">
                        ព្រឹក
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-kantumruy text-sm sm:text-base font-bold text-[#4A171B] leading-snug">
                        ពិធីសែនក្រុងពាលី
                      </h3>
                      <p className="font-cinzel text-[10px] sm:text-xs text-[#5f682a] font-medium tracking-wide mt-0.5">
                        Krong Pali • Sacred Blessing
                      </p>
                    </div>
                    <div className="flex h-8 w-8 sm:h-9 sm:w-9 flex-shrink-0 items-center justify-center rounded-xl bg-[#4A171B]/10 text-[#4A171B] border border-[#4A171B]/15 transition-all duration-300 group-hover:bg-[#4A171B] group-hover:text-white">
                      <Bell className="h-4 w-4" />
                    </div>
                  </div>
                </div>

                {/* Event 2 */}
                <div className="fade-right delay-150 group relative overflow-hidden rounded-2xl border border-[#5f682a]/30 bg-white/60 p-3.5 sm:p-4 text-left shadow-xs transition-all duration-300 hover:border-[#5f682a]/60 hover:bg-white/80 hover:shadow-md">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="flex flex-col items-center justify-center min-w-[70px] sm:min-w-[80px] py-1.5 px-2 rounded-xl bg-[#5f682a]/15 border border-[#5f682a]/25 group-hover:bg-[#5f682a]/25 transition-colors">
                      <span className="font-kantumruy text-sm sm:text-base font-bold text-[#4A171B]">
                        ០៧:០០
                      </span>
                      <span className="font-kantumruy text-[10px] sm:text-xs font-semibold text-[#5f682a]">
                        ព្រឹក
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-kantumruy text-sm sm:text-base font-bold text-[#4A171B] leading-snug">
                        ពិធីហែជំនូនចូលរោងជ័យ
                      </h3>
                      <p className="font-cinzel text-[10px] sm:text-xs text-[#5f682a] font-medium tracking-wide mt-0.5">
                        Groom&apos;s Procession &amp; Fruit Trays
                      </p>
                    </div>
                    <div className="flex h-8 w-8 sm:h-9 sm:w-9 flex-shrink-0 items-center justify-center rounded-xl bg-[#4A171B]/10 text-[#4A171B] border border-[#4A171B]/15 transition-all duration-300 group-hover:bg-[#4A171B] group-hover:text-white">
                      <PartyPopper className="h-4 w-4" />
                    </div>
                  </div>
                </div>

                {/* Event 3 */}
                <div className="fade-left delay-200 group relative overflow-hidden rounded-2xl border border-[#5f682a]/30 bg-white/60 p-3.5 sm:p-4 text-left shadow-xs transition-all duration-300 hover:border-[#5f682a]/60 hover:bg-white/80 hover:shadow-md">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="flex flex-col items-center justify-center min-w-[70px] sm:min-w-[80px] py-1.5 px-2 rounded-xl bg-[#5f682a]/15 border border-[#5f682a]/25 group-hover:bg-[#5f682a]/25 transition-colors">
                      <span className="font-kantumruy text-sm sm:text-base font-bold text-[#4A171B]">
                        ០៧:៣០
                      </span>
                      <span className="font-kantumruy text-[10px] sm:text-xs font-semibold text-[#5f682a]">
                        ព្រឹក
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-kantumruy text-sm sm:text-base font-bold text-[#4A171B] leading-snug">
                        ពិធីពិសាស្លាកំណត់ និងបំពាក់ចិញ្ចៀន
                      </h3>
                      <p className="font-cinzel text-[10px] sm:text-xs text-[#5f682a] font-medium tracking-wide mt-0.5">
                        Ring Exchange &amp; Betrothal
                      </p>
                    </div>
                    <div className="flex h-8 w-8 sm:h-9 sm:w-9 flex-shrink-0 items-center justify-center rounded-xl bg-[#4A171B]/10 text-[#4A171B] border border-[#4A171B]/15 transition-all duration-300 group-hover:bg-[#4A171B] group-hover:text-white">
                      <Sparkles className="h-4 w-4" />
                    </div>
                  </div>
                </div>

                {/* Event 4 */}
                <div className="fade-right delay-250 group relative overflow-hidden rounded-2xl border border-[#5f682a]/30 bg-white/60 p-3.5 sm:p-4 text-left shadow-xs transition-all duration-300 hover:border-[#5f682a]/60 hover:bg-white/80 hover:shadow-md">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="flex flex-col items-center justify-center min-w-[70px] sm:min-w-[80px] py-1.5 px-2 rounded-xl bg-[#5f682a]/15 border border-[#5f682a]/25 group-hover:bg-[#5f682a]/25 transition-colors">
                      <span className="font-kantumruy text-sm sm:text-base font-bold text-[#4A171B]">
                        ០៨:៣០
                      </span>
                      <span className="font-kantumruy text-[10px] sm:text-xs font-semibold text-[#5f682a]">
                        ព្រឹក
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-kantumruy text-sm sm:text-base font-bold text-[#4A171B] leading-snug">
                        ពិធីសូត្រមន្តចម្រើនព្រះបរិត្ត
                      </h3>
                      <p className="font-cinzel text-[10px] sm:text-xs text-[#5f682a] font-medium tracking-wide mt-0.5">
                        Monks&apos; Sacred Blessing
                      </p>
                    </div>
                    <div className="flex h-8 w-8 sm:h-9 sm:w-9 flex-shrink-0 items-center justify-center rounded-xl bg-[#4A171B]/10 text-[#4A171B] border border-[#4A171B]/15 transition-all duration-300 group-hover:bg-[#4A171B] group-hover:text-white">
                      <Bell className="h-4 w-4" />
                    </div>
                  </div>
                </div>

                {/* Event 5 */}
                <div className="fade-left delay-100 group relative overflow-hidden rounded-2xl border border-[#5f682a]/30 bg-white/60 p-3.5 sm:p-4 text-left shadow-xs transition-all duration-300 hover:border-[#5f682a]/60 hover:bg-white/80 hover:shadow-md">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="flex flex-col items-center justify-center min-w-[70px] sm:min-w-[80px] py-1.5 px-2 rounded-xl bg-[#5f682a]/15 border border-[#5f682a]/25 group-hover:bg-[#5f682a]/25 transition-colors">
                      <span className="font-kantumruy text-sm sm:text-base font-bold text-[#4A171B]">
                        ០៩:០០
                      </span>
                      <span className="font-kantumruy text-[10px] sm:text-xs font-semibold text-[#5f682a]">
                        ព្រឹក
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-kantumruy text-sm sm:text-base font-bold text-[#4A171B] leading-snug">
                        ពិធីកាត់សក់បង្កក់សិរី
                      </h3>
                      <p className="font-cinzel text-[10px] sm:text-xs text-[#5f682a] font-medium tracking-wide mt-0.5">
                        Traditional Hair Cutting Ceremony
                      </p>
                    </div>
                    <div className="flex h-8 w-8 sm:h-9 sm:w-9 flex-shrink-0 items-center justify-center rounded-xl bg-[#4A171B]/10 text-[#4A171B] border border-[#4A171B]/15 transition-all duration-300 group-hover:bg-[#4A171B] group-hover:text-white">
                      <Scissors className="h-4 w-4" />
                    </div>
                  </div>
                </div>

                {/* Event 6 */}
                <div className="fade-right delay-150 group relative overflow-hidden rounded-2xl border border-[#5f682a]/30 bg-white/60 p-3.5 sm:p-4 text-left shadow-xs transition-all duration-300 hover:border-[#5f682a]/60 hover:bg-white/80 hover:shadow-md">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="flex flex-col items-center justify-center min-w-[70px] sm:min-w-[80px] py-1.5 px-2 rounded-xl bg-[#5f682a]/15 border border-[#5f682a]/25 group-hover:bg-[#5f682a]/25 transition-colors">
                      <span className="font-kantumruy text-sm sm:text-base font-bold text-[#4A171B]">
                        ១០:៤៥
                      </span>
                      <span className="font-kantumruy text-[10px] sm:text-xs font-semibold text-[#5f682a]">
                        ព្រឹក
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-kantumruy text-sm sm:text-base font-bold text-[#4A171B] leading-snug">
                        ពិធីសំពះផ្ទឹម សែនចងដៃ និងបាចផ្កាស្លា
                      </h3>
                      <p className="font-cinzel text-[10px] sm:text-xs text-[#5f682a] font-medium tracking-wide mt-0.5">
                        Knot Tying Ceremony &amp; Floral Blessing
                      </p>
                    </div>
                    <div className="flex h-8 w-8 sm:h-9 sm:w-9 flex-shrink-0 items-center justify-center rounded-xl bg-[#4A171B]/10 text-[#4A171B] border border-[#4A171B]/15 transition-all duration-300 group-hover:bg-[#4A171B] group-hover:text-white">
                      <Heart className="h-4 w-4 fill-current text-[#4A171B] group-hover:text-white" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Evening Reception Header Chip */}
              <div className="fade-left delay-100 flex items-center justify-center gap-3 mt-8 sm:mt-10 mb-5">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#5f682a]/30" />
                <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/60 border border-[#5f682a]/40 text-[#4A171B] font-kantumruy text-xs sm:text-sm font-bold tracking-wide shadow-xs">
                  <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#5f682a]" />
                  កម្មវិធីពេលល្ងាច • Evening Reception
                </span>
                <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#5f682a]/30" />
              </div>

              {/* Featured Evening Reception Card (Grand Banner across Desktop) */}
              <div className="fade-right delay-200 group relative overflow-hidden rounded-2xl sm:rounded-3xl border-2 border-[#5f682a] bg-[#4A171B] p-4 sm:p-6 lg:p-7 shadow-lg text-left transition-all duration-300 hover:shadow-xl">
                <div className="relative z-10 flex items-center gap-4 sm:gap-6">
                  {/* Left Time Capsule */}
                  <div className="flex flex-col items-center justify-center min-w-[76px] sm:min-w-[90px] py-2 sm:py-3 px-2 rounded-xl bg-[#5f682a]/20 border border-[#5f682a]/50 text-center flex-shrink-0">
                    <span className="font-kantumruy text-sm sm:text-lg font-bold text-white">
                      ០៥:០០
                    </span>
                    <span className="font-kantumruy text-[10px] sm:text-xs font-semibold text-[#5f682a]">
                      ល្ងាច
                    </span>
                  </div>

                  {/* Center Event Text */}
                  <div className="flex-1 min-w-0">
                    <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#5f682a]/20 text-[#5f682a] border border-[#5f682a]/30 text-[9px] sm:text-xs font-cinzel tracking-wider uppercase mb-1">
                      <Sparkles className="h-2.5 w-2.5 sm:h-3 sm:w-3" /> Grand Celebration
                    </div>
                    <h3 className="font-kantumruy text-sm sm:text-lg md:text-xl font-bold text-white leading-snug">
                      ពិធីជប់លៀងមហោឡារិកអបអរសាទរអាពាហ៍ពិពាហ៍
                    </h3>
                    <p className="font-cinzel text-[10px] sm:text-xs md:text-sm font-bold text-[#5f682a] tracking-widest mt-1">
                      GRAND WEDDING RECEPTION &amp; DINNER
                    </p>
                  </div>

                  {/* Right Icon */}
                  <div className="flex h-11 w-11 sm:h-14 sm:w-14 flex-shrink-0 items-center justify-center rounded-xl sm:rounded-2xl bg-[#5f682a]/25 border border-[#5f682a]/50 text-[#5f682a] transition-transform duration-300 group-hover:scale-110">
                    <Utensils className="h-5 w-5 sm:h-7 sm:w-7" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ===================================================================== */}
          {/* VENUE & LOCATION DIRECTIONS                                           */}
          {/* ===================================================================== */}
          {/* ===================================================================== */}
          {/* VENUE & LOCATION DIRECTIONS                                           */}
          {/* ===================================================================== */}
          <section id="venue" className="relative border-t border-[#5f682a]/20 px-4 sm:px-8 py-11 sm:py-16 text-center">
            <div className="fade-left mx-auto flex justify-center text-[#5f682a] mb-1">
              <MapPin className="h-6 w-6 sm:h-7 sm:w-7" />
            </div>

            <p className="fade-left delay-100 font-cinzel text-[10px] sm:text-xs tracking-[0.28em] text-[#5f682a]">
              VENUE LOCATION
            </p>
            <h2 className="fade-right delay-150 mt-0.5 font-great-vibes text-4xl sm:text-5xl md:text-6xl text-[#4A171B]">
              Celebration Venue
            </h2>
            <p className="fade-left delay-200 font-cinzel text-xs sm:text-sm md:text-base font-bold tracking-wider text-[#4A171B]">
              THE PREMIER SENSOK CENTER
            </p>
            <p className="fade-right delay-200 font-kantumruy font-semibold text-xs sm:text-sm text-[#5f682a] mt-0.5">
              មជ្ឈមណ្ឌល ព្រីមៀរ សែនសុខ (អាគារ H-I) • រាជធានីភ្នំពេញ
            </p>

            <div className="filigree-divider">
              <span className="text-xs text-[#5f682a]">✦</span>
            </div>

            {/* Expansive Responsive Venue Card (50/50 Split on Desktop) */}
            <div className="fade-left delay-150 mx-auto mt-6 max-w-2xl md:max-w-4xl lg:max-w-5xl overflow-hidden rounded-2xl sm:rounded-3xl border-2 border-[#5f682a]/40 bg-blue shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 items-stretch">
                <div className="aspect-video md:aspect-auto md:h-full w-full bg-stone-200 overflow-hidden">
                  <img
                    src="/images/premier_sensok_venue_1790042694667.jpg"
                    alt="The Premier Sensok Center"
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>

                <div className="bg-white p-5 sm:p-7 lg:p-9 text-left border-t md:border-t-0 md:border-l border-[#5f682a]/20 flex flex-col justify-between">
                  <div>
                    <h4 className="font-cinzel text-base sm:text-lg md:text-xl font-bold text-[#4A171B]">
                      The Premier Sensok Center (Building H-I)
                    </h4>
                    <p className="mt-2 font-kantumruy text-xs sm:text-sm md:text-base text-[#4A171B] leading-relaxed">
                      ផ្លូវ ១០០៣ សង្កាត់ភ្នំពេញថ្មី ខណ្ឌសែនសុខ រាជធានីភ្នំពេញ
                    </p>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-2.5 sm:gap-3">
                    <a
                      href="https://maps.google.com/?q=The+Premier+Center+Sen+Sok+Phnom+Penh"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 rounded-xl border border-[#5f682a] bg-[#4A171B] px-4 sm:px-6 py-2.5 font-cinzel text-xs sm:text-sm font-semibold text-white shadow-xs transition hover:bg-[#5f682a]"
                    >
                      <MapPin className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#5f682a]" />
                      <span>GOOGLE MAPS</span>
                      <ExternalLink className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                    </a>

                    <button
                      onClick={copyAddressToClipboard}
                      className="flex items-center gap-1.5 rounded-xl border border-[#5f682a] bg-white px-3.5 sm:px-5 py-2.5 font-kantumruy text-xs sm:text-sm text-[#4A171B] transition hover:bg-[#4A171B] hover:text-white"
                    >
                      {copiedAddress ? (
                        <>
                          <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#5f682a]" />
                          <span className="text-[#5f682a]">បានចម្លង!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#5f682a]" />
                          <span>ចម្លងអាសយដ្ឋាន</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>


          {/* ===================================================================== */}
          {/* CLOSING FOOTER                                                        */}
          {/* ===================================================================== */}
          <footer className="relative border-t border-[#5f682a]/40 bg-[#4A171B] px-6 py-12 sm:py-16 text-center text-white">
            <div className="fade-left mx-auto flex justify-center text-[#5f682a]">
              <Heart className="h-6 w-6 sm:h-7 sm:w-7 fill-current text-[#5f682a]" />
            </div>

            <p className="fade-left delay-100 mt-3 font-moulpali text-xs sm:text-sm md:text-base text-white/90">
              សូមថ្លែងអំណរគុណយ៉ាងជ្រាលជ្រៅបំផុត ចំពោះវត្តមាន និងពរជ័យ
            </p>

            <h3 className="fade-right delay-200 mt-2 font-great-vibes text-5xl sm:text-6xl md:text-7xl text-white">
              With love, always.
            </h3>

            <p className="fade-left delay-250 mt-1 font-cinzel text-xs sm:text-sm tracking-[0.2em] text-[#5f682a]">
              PHEAKDEY &amp; MUNINEATH
            </p>

            <div className="fade-right delay-300 mt-4 sm:mt-5 flex justify-center">
              <img
                src="/images/wax_seal_pm.jpg"
                alt="P&M Wax Seal"
                className="h-14 w-14 sm:h-16 sm:w-16 rounded-full border border-[#5f682a] object-cover shadow-lg"
              />
            </div>

            <p className="fade-left delay-300 mt-4 sm:mt-5 font-cinzel text-[9px] sm:text-[11px] tracking-widest text-[#5f682a]/80">
              17 · 18 · MARCH · 2027 • PHNOM PENH, CAMBODIA
            </p>
          </footer>
        </UsefulFrame>
      </div>
    </main>
  )
}
