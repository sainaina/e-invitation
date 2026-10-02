'use client'

import { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { createPortal } from 'react-dom'
import {
  X,
  ChevronLeft,
  ChevronRight,
  Play,
  Sparkles,
  ZoomIn,
  ZoomOut,
  Loader2,
} from 'lucide-react'

export interface GalleryItem {
  id: string
  src: string
  videoSrc?: string
  alt: string
  captionEn?: string
  captionKm?: string
  isVideo?: boolean
  layout?: 'landscape' | 'portrait'
}

interface GalleryLightboxProps {
  items: GalleryItem[]
  lang: 'en' | 'km'
}

type GalleryRow =
  | { type: 'landscape'; item: GalleryItem }
  | { type: 'portrait_pair'; items: GalleryItem[] }

export default function GalleryLightbox({ items, lang }: GalleryLightboxProps) {
  const [isMounted, setIsMounted] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [isZoomed, setIsZoomed] = useState(false)
  const [isImageLoading, setIsImageLoading] = useState(true)

  const videoRef = useRef<HTMLVideoElement | null>(null)
  const touchStartX = useRef<number | null>(null)
  const touchEndX = useRef<number | null>(null)

  // Ensure portal only mounts on the client
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Open item in unified lightbox (both photo and video display in this same style)
  const openItem = useCallback(
    (item: GalleryItem) => {
      const idx = items.findIndex((i) => i.id === item.id)
      setSelectedIndex(idx !== -1 ? idx : 0)
      setIsZoomed(false)
      setIsImageLoading(true)
    },
    [items]
  )

  const closeLightbox = useCallback(() => {
    setSelectedIndex(null)
    setIsZoomed(false)
    if (videoRef.current) {
      videoRef.current.pause()
    }
  }, [])

  // Lightbox navigation across all items
  const prevItem = useCallback(() => {
    if (selectedIndex === null) return
    if (videoRef.current) {
      videoRef.current.pause()
    }
    setIsZoomed(false)
    setIsImageLoading(true)
    setSelectedIndex((prev) => {
      if (prev === null) return 0
      return (prev - 1 + items.length) % items.length
    })
  }, [items.length, selectedIndex])

  const nextItem = useCallback(() => {
    if (selectedIndex === null) return
    if (videoRef.current) {
      videoRef.current.pause()
    }
    setIsZoomed(false)
    setIsImageLoading(true)
    setSelectedIndex((prev) => {
      if (prev === null) return 0
      return (prev + 1) % items.length
    })
  }, [items.length, selectedIndex])

  // Body scroll locking without scrollTo thrashing
  useEffect(() => {
    const isModalOpen = selectedIndex !== null
    if (!isModalOpen) return

    const originalOverflow = document.body.style.overflow
    const originalPaddingRight = document.body.style.paddingRight

    document.body.style.overflow = 'hidden'

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeLightbox()
      } else if (e.key === 'ArrowLeft') {
        prevItem()
      } else if (e.key === 'ArrowRight') {
        nextItem()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = originalOverflow
      document.body.style.paddingRight = originalPaddingRight
    }
  }, [selectedIndex, closeLightbox, prevItem, nextItem])

  // Touch swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX
  }

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return
    const diffX = touchStartX.current - touchEndX.current
    const minSwipe = 45

    if (diffX > minSwipe) {
      nextItem()
    } else if (diffX < -minSwipe) {
      prevItem()
    }

    touchStartX.current = null
    touchEndX.current = null
  }

  const currentItem = selectedIndex !== null ? items[selectedIndex] : null

  // Partition items into mixed landscape rows and portrait pairs
  const rows: GalleryRow[] = useMemo(() => {
    const result: GalleryRow[] = []
    let currentPortraitPair: GalleryItem[] = []

    items.forEach((item) => {
      const isLandscape = item.layout === 'landscape' || item.isVideo
      if (isLandscape) {
        if (currentPortraitPair.length > 0) {
          result.push({ type: 'portrait_pair', items: [...currentPortraitPair] })
          currentPortraitPair = []
        }
        result.push({ type: 'landscape', item })
      } else {
        currentPortraitPair.push(item)
        if (currentPortraitPair.length === 2) {
          result.push({ type: 'portrait_pair', items: [...currentPortraitPair] })
          currentPortraitPair = []
        }
      }
    })

    if (currentPortraitPair.length > 0) {
      result.push({ type: 'portrait_pair', items: [...currentPortraitPair] })
    }

    return result
  }, [items])

  return (
    <>
      {/* ===================================================================== */}
      {/* PURE PHOTO & VIDEO GALLERY (NO FRAMES, NO BORDERS, NO TEXT OVERLAYS)  */}
      {/* ===================================================================== */}
      <div className="w-full space-y-3 sm:space-y-4 md:space-y-4.5">
        {rows.map((row, rowIdx) => {
          // LANDSCAPE ROW (Video or Photo Card)
          if (row.type === 'landscape') {
            const item = row.item
            const isVideo = item.isVideo

            return (
              <div
                key={item.id || `landscape-${rowIdx}`}
                onClick={() => openItem(item)}
                className="group relative cursor-pointer overflow-hidden rounded-2xl sm:rounded-3xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.12)] transition-all duration-500 hover:shadow-2xl hover:scale-[1.01]"
              >
                <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-stone-900 rounded-2xl sm:rounded-3xl">
                  {isVideo ? (
                    <>
                      {/* Video Poster Image with Muted Loop preview */}
                      <video
                        src={item.videoSrc || '/videos/floral_background.mp4'}
                        poster={item.src}
                        preload="metadata"
                        muted
                        playsInline
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />

                      {/* Gentle hover overlay to elevate play button */}
                      <div className="pointer-events-none absolute inset-0 bg-black/15 group-hover:bg-black/30 transition-colors duration-500" />

                      {/* Minimalist Center Play Button (NO TEXT, NO EYE ICON) */}
                      <div className="absolute inset-0 flex items-center justify-center z-20">
                        <div className="relative flex items-center justify-center">
                          <span className="absolute -inset-2.5 rounded-full bg-white/25 animate-ping opacity-70" />
                          <div className="relative flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full border border-white/80 bg-black/45 text-white shadow-2xl backdrop-blur-md transition-all duration-300 group-hover:scale-115 group-hover:bg-[#4A171B] group-hover:border-[#EAD29A]">
                            <Play className="h-6 w-6 sm:h-7 sm:w-7 fill-white text-white ml-1 transition-transform group-hover:scale-110" />
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    /* Pure Landscape Photo (NO TEXT, NO EYE ICON, NO BORDER) */
                    <img
                      src={item.src}
                      alt={item.alt}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  )}
                </div>
              </div>
            )
          }

          // PORTRAIT PAIR ROW (2 Columns side-by-side)
          return (
            <div
              key={`portrait-pair-${rowIdx}`}
              className={`grid gap-3 sm:gap-4 md:gap-4.5 ${
                row.items.length === 1 ? 'grid-cols-1 max-w-sm sm:max-w-md mx-auto' : 'grid-cols-2'
              }`}
            >
              {row.items.map((item) => (
                <div
                  key={item.id}
                  onClick={() => openItem(item)}
                  className="group relative cursor-pointer overflow-hidden rounded-2xl sm:rounded-3xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.12)] transition-all duration-500 hover:shadow-2xl hover:scale-[1.01]"
                >
                  <div className="aspect-[4/5] sm:aspect-[3/4] w-full overflow-hidden bg-stone-100 rounded-2xl sm:rounded-3xl">
                    <img
                      src={item.src}
                      alt={item.alt}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </div>
                </div>
              ))}
            </div>
          )
        })}
      </div>

      {/* ===================================================================== */}
      {/* UNIFIED LIGHTBOX (EXACT STYLE OF USER SCREENSHOT FOR BOTH VIDEO & IMAGE) */}
      {/* ===================================================================== */}
      {isMounted &&
        currentItem &&
        createPortal(
          <div
            className="fixed inset-0 z-[99999] h-[100dvh] w-screen flex flex-col items-center justify-between bg-black/95 backdrop-blur-2xl overflow-hidden select-none animate-in fade-in duration-200"
            onClick={closeLightbox}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Top Bar (Matching Screenshot: Sparkles + Title on Left, Zoom & Close on Right) */}
            <div
              className="w-full flex-shrink-0 flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4 bg-black/60 border-b border-white/10 z-30"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Photo / Video Counter */}
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-[#EAD29A]" />
                <span className="font-moulpali text-xs sm:text-sm text-[#FAF7F2] tracking-wide">
                  {lang === 'km'
                    ? `រូបភាពទី ${(selectedIndex ?? 0) + 1} នៃ ${items.length}`
                    : `Item ${(selectedIndex ?? 0) + 1} of ${items.length}`}
                </span>
                <span className="hidden sm:inline-block text-white/40">•</span>
                <span className="hidden sm:inline-block font-cinzel text-xs text-[#EAD29A]">
                  Pheakdey &amp; Munineath
                </span>
              </div>

              {/* Action Buttons: Zoom & Close */}
              <div className="flex items-center gap-2 sm:gap-3">
                {!currentItem.isVideo && (
                  <button
                    type="button"
                    onClick={() => setIsZoomed((prev) => !prev)}
                    className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
                    title={isZoomed ? 'Zoom Out' : 'Zoom In'}
                    aria-label="Toggle Zoom"
                  >
                    {isZoomed ? <ZoomOut className="h-4 w-4" /> : <ZoomIn className="h-4 w-4" />}
                  </button>
                )}

                <button
                  type="button"
                  onClick={closeLightbox}
                  className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-white/10 hover:bg-red-900/80 text-white transition-all shadow-md active:scale-90 cursor-pointer"
                  aria-label="Close"
                >
                  <X className="h-4.5 w-4.5" />
                </button>
              </div>
            </div>

            {/* Main Center Media Viewport (Displays Video OR Image in Exact Same Theater Style) */}
            <div
              className="flex-1 min-h-0 w-full relative flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Previous Button */}
              <button
                type="button"
                onClick={prevItem}
                className="absolute left-2 sm:left-6 z-30 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-black/60 hover:bg-[#4A171B] border border-white/25 text-white backdrop-blur-md shadow-2xl transition-all duration-300 hover:scale-110 active:scale-90 cursor-pointer"
                aria-label="Previous item"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>

              {/* Loading Spinner for Image */}
              {!currentItem.isVideo && isImageLoading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 z-10">
                  <Loader2 className="h-8 w-8 animate-spin text-[#EAD29A]" />
                  <span className="font-moulpali text-xs text-white/70">
                    {lang === 'km' ? 'កំពុងផ្ទុករូបភាព...' : 'Loading image...'}
                  </span>
                </div>
              )}

              {/* MEDIA DISPLAY: Video OR Image */}
              {currentItem.isVideo ? (
                /* Video Player with Clean Rounded Corners & Shadow */
                <video
                  ref={videoRef}
                  src={currentItem.videoSrc || '/videos/floral_background.mp4'}
                  poster={currentItem.src}
                  controls
                  autoPlay
                  playsInline
                  className="max-h-[70dvh] sm:max-h-[74dvh] w-auto max-w-[92vw] object-contain rounded-xl sm:rounded-2xl shadow-2xl bg-black"
                >
                  Your browser does not support the video tag.
                </video>
              ) : (
                /* High-Res Photo Display with Zoom */
                <div
                  className={`relative flex items-center justify-center max-h-[72dvh] sm:max-h-[76dvh] max-w-[94vw] transition-transform duration-300 ${
                    isZoomed ? 'scale-125 sm:scale-140 cursor-zoom-out' : 'scale-100 cursor-zoom-in'
                  }`}
                  onClick={() => setIsZoomed((prev) => !prev)}
                >
                  <img
                    src={currentItem.src}
                    alt={currentItem.alt}
                    onLoad={() => setIsImageLoading(false)}
                    className={`max-h-[70dvh] sm:max-h-[74dvh] w-auto max-w-[92vw] object-contain rounded-xl sm:rounded-2xl shadow-2xl transition-opacity duration-300 ${
                      isImageLoading ? 'opacity-0' : 'opacity-100'
                    }`}
                  />
                </div>
              )}

              {/* Next Button */}
              <button
                type="button"
                onClick={nextItem}
                className="absolute right-2 sm:right-6 z-30 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-black/60 hover:bg-[#4A171B] border border-white/25 text-white backdrop-blur-md shadow-2xl transition-all duration-300 hover:scale-110 active:scale-90 cursor-pointer"
                aria-label="Next item"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>

            {/* Bottom Caption & Thumbnail Strip (Matching Screenshot) */}
            <div
              className="w-full flex-shrink-0 flex flex-col items-center justify-center bg-black/80 border-t border-white/10 px-4 py-2.5 sm:px-6 sm:py-3 z-30 space-y-2"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Caption Text */}
              <div className="text-center max-w-xl">
                <p className="font-moulpali text-xs sm:text-sm md:text-base text-[#FAF7F2] leading-snug">
                  {lang === 'km' ? currentItem.captionKm : currentItem.captionEn}
                </p>
                <p className="font-kantumruy text-[10px] sm:text-xs text-[#EAD29A] mt-0.5">
                  Pheakdey &amp; Munineath • 18 March 2027
                </p>
              </div>

              {/* Thumbnail Strip with Active Item Highlighted */}
              <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto max-w-full px-2 py-1 scrollbar-none">
                {items.map((item, idx) => {
                  const isCurrent = idx === selectedIndex
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        if (videoRef.current) {
                          videoRef.current.pause()
                        }
                        setSelectedIndex(idx)
                        setIsZoomed(false)
                        setIsImageLoading(true)
                      }}
                      className={`relative flex-shrink-0 h-10 w-10 sm:h-12 sm:w-12 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                        isCurrent
                          ? 'border-[#EAD29A] ring-2 ring-[#4A171B] scale-110'
                          : 'border-white/20 opacity-55 hover:opacity-100'
                      }`}
                    >
                      <img src={item.src} alt={item.alt} className="h-full w-full object-cover" />
                      {item.isVideo && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                          <Play className="h-3 w-3 fill-white text-white ml-0.5" />
                        </div>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  )
}
