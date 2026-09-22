'use client'

import { useState } from 'react'
import { X, ChevronLeft, ChevronRight, Play, Maximize2, Sparkles } from 'lucide-react'

export interface GalleryItem {
  id: string
  src: string
  alt: string
  captionEn: string
  captionKm: string
  isVideo?: boolean
}

interface GalleryLightboxProps {
  items: GalleryItem[]
  lang: 'en' | 'km'
}

export default function GalleryLightbox({ items, lang }: GalleryLightboxProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)

  const openLightbox = (index: number) => {
    if (items[index].isVideo) {
      setIsVideoModalOpen(true)
    } else {
      setSelectedIndex(index)
    }
  }

  const closeLightbox = () => {
    setSelectedIndex(null)
    setIsVideoModalOpen(false)
  }

  const prevPhoto = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + items.length) % items.length)
    }
  }

  const nextPhoto = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % items.length)
    }
  }

  const currentItem = selectedIndex !== null ? items[selectedIndex] : null

  return (
    <>
      {/* Gallery Grid Matching Screenshot 4 */}
      <div className="space-y-3 px-3">
        {/* Top Horizontal Video / Highlight Image */}
        {items[0] && (
          <div
            onClick={() => openLightbox(0)}
            className="fade-left delay-100 group relative cursor-pointer overflow-hidden rounded-2xl border-2 border-[#330404]/60 shadow-md transition-all duration-300 hover:shadow-xl hover:border-[#330404]"
          >
            <div className="aspect-[16/10] w-full overflow-hidden bg-stone-100">
              <img
                src={items[0].src}
                alt={items[0].alt}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>

            {/* Dark Romantic Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10 opacity-70 transition-opacity group-hover:opacity-50" />

            {/* Video Play Button in Center */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/80 bg-white/30 text-white shadow-lg backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:bg-[#330404]">
                <Play className="h-6 w-6 fill-current ml-1" />
              </div>
              <span className="mt-2 rounded-full bg-black/50 px-3 py-1 font-moulpali text-xs tracking-wider text-white backdrop-blur">
                {lang === 'km' ? 'ទស្សនាវីដេអូរៀបការ' : 'Play Pre-Wedding Film'}
              </span>
            </div>
          </div>
        )}

        {/* 2-Column Split Grid */}
        <div className="grid grid-cols-2 gap-3">
          {items.slice(1, 3).map((item, idx) => {
            const actualIdx = idx + 1
            const animClass = idx === 0 ? 'fade-left delay-200' : 'fade-right delay-200'
            return (
              <div
                key={item.id}
                onClick={() => openLightbox(actualIdx)}
                className={`${animClass} group relative cursor-pointer overflow-hidden rounded-2xl border-2 border-[#330404]/40 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-[#330404]`}
              >
                <div className="aspect-[4/5] w-full overflow-hidden bg-stone-100">
                  <img
                    src={item.src}
                    alt={item.alt}
                    className={`h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 ${actualIdx === 1 ? 'grayscale contrast-110' : ''
                      }`}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100 flex items-end p-2.5">
                  <p className="font-moulpali text-xs text-white">
                    {lang === 'km' ? item.captionKm : item.captionEn}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom Full-Width Hero Garden Photo */}
        {items[3] && (
          <div
            onClick={() => openLightbox(3)}
            className="fade-right delay-100 group relative cursor-pointer overflow-hidden rounded-2xl border-2 border-[#330404]/60 shadow-md transition-all duration-300 hover:shadow-xl hover:border-[#330404]"
          >
            <div className="aspect-[16/11] w-full overflow-hidden bg-stone-100">
              <img
                src={items[3].src}
                alt={items[3].alt}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100 flex items-end p-3">
              <p className="font-moulpali text-xs text-white">
                {lang === 'km' ? items[3].captionKm : items[3].captionEn}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Lightbox Modal for Photos */}
      {currentItem && !isVideoModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md animate-in fade-in duration-200"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur hover:bg-[#330404]"
            aria-label="Close photo"
          >
            <X className="h-5 w-5" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation()
              prevPhoto()
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur hover:bg-[#330404]"
            aria-label="Previous photo"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation()
              nextPhoto()
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur hover:bg-[#330404]"
            aria-label="Next photo"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          <div
            className="relative max-h-[85vh] max-w-[90vw] overflow-hidden rounded-2xl border border-[#330404]"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={currentItem.src}
              alt={currentItem.alt}
              className="max-h-[75vh] w-auto object-contain"
            />
            <div className="bg-[#330404] p-3 text-center text-white">
              <p className="font-moulpali text-sm text-[#FAF7F2]">
                {lang === 'km' ? currentItem.captionKm : currentItem.captionEn}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Video Preview Modal */}
      {isVideoModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md animate-in fade-in duration-200"
          onClick={closeLightbox}
        >
          <div
            className="relative w-full max-w-2xl overflow-hidden rounded-2xl border-2 border-[#330404] bg-[#FAF7F2] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#330404]/30 bg-[#330404] px-4 py-3 text-white">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-[#5f682a]" />
                <span className="font-moulpali text-sm tracking-wider text-[#FAF7F2]">
                  {lang === 'km' ? 'វីដេអូអនុស្សាវរីយ៍ • Rithy & Nihyun' : 'Pre-Wedding Highlight • Rithy & Nihyun'}
                </span>
              </div>
              <button
                onClick={closeLightbox}
                className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 text-white hover:bg-[#330404]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Cinematic Still & Animated Playback Showcase */}
            <div className="relative aspect-video w-full overflow-hidden bg-black">
              <img
                src={items[0].src}
                alt="Video scene"
                className="h-full w-full object-cover opacity-90 transition duration-1000 scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/30 flex flex-col justify-end p-6 text-white">
                <p className="font-great-vibes text-3xl text-white drop-shadow">
                  &ldquo;A love story written in grace and devotion.&rdquo;
                </p>
                <p className="mt-1 font-cinzel text-xs text-[#FAF7F2]/90 tracking-wider">
                  Phnom Penh, Cambodia • 18th December 2025
                </p>
              </div>
            </div>

            <div className="p-4 text-center bg-[#330404] text-white">
              <p className="font-moulpali text-xs text-[#FAF7F2]">
                {lang === 'km'
                  ? 'សូមអរគុណភ្ញៀវកិត្តិយសទាំងអស់ដែលបានចូលរួមអបអរសាទរ'
                  : 'Thank you to all dear families and friends celebrating our special day.'}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
