"use client"

import { useState, useRef } from "react"
import Image from "next/image"

export function BeforeAfterSlider({ 
  beforeImage, 
  afterImage,
  beforeLabel = "Antes",
  afterLabel = "Después" 
}: { 
  beforeImage: string
  afterImage: string
  beforeLabel?: string
  afterLabel?: string
}) {
  const [sliderPosition, setSliderPosition] = useState(50)
  const containerRef = useRef<HTMLDivElement>(null)
  const touchStartRef = useRef<{ x: number; y: number } | null>(null)
  const touchLockRef = useRef<"pending" | "horizontal" | "vertical" | null>(null)
  const activeLabel = sliderPosition >= 50 ? beforeLabel : afterLabel

  const updateSliderPosition = (clientX: number) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()

    const x = clientX - rect.left
    const percent = Math.min(Math.max((x / rect.width) * 100, 0), 100)
    setSliderPosition(percent)
  }

  const handleMouseDrag = (e: React.MouseEvent) => {
    updateSliderPosition(e.clientX)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0]
    touchStartRef.current = { x: touch.clientX, y: touch.clientY }
    touchLockRef.current = "pending"
    updateSliderPosition(touch.clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    const touch = e.touches[0]
    const touchStart = touchStartRef.current

    if (!touchStart) {
      updateSliderPosition(touch.clientX)
      return
    }

    const deltaX = touch.clientX - touchStart.x
    const deltaY = touch.clientY - touchStart.y
    const absX = Math.abs(deltaX)
    const absY = Math.abs(deltaY)

    if (touchLockRef.current === "pending") {
      if (absX > 10 && absX > absY + 6) {
        touchLockRef.current = "horizontal"
      } else if (absY > 10 && absY > absX + 6) {
        touchLockRef.current = "vertical"
      }
    }

    if (touchLockRef.current === "vertical") {
      return
    }

    e.preventDefault()
    updateSliderPosition(touch.clientX)
  }

  const handleTouchEnd = () => {
    touchStartRef.current = null
    touchLockRef.current = null
  }

  return (
    <div 
      ref={containerRef}
      className="relative w-full aspect-[4/5] sm:aspect-[3/4] max-w-xl mx-auto rounded-xl overflow-hidden cursor-ew-resize select-none border border-border group touch-pan-x"
      onMouseMove={(e) => {
        if (e.buttons === 1) handleMouseDrag(e)
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
      onMouseDown={(e) => {
        e.preventDefault() // Prevent text selection and other default browser behaviors
        handleMouseDrag(e)
      }}
    >
      {/* Before Image */}
      <div className="absolute inset-0 w-full h-full bg-muted pointer-events-none">
        <div className="w-full h-full bg-secondary/40" />
        <Image
          src={beforeImage} 
          fill
          sizes="(max-width: 768px) 92vw, 640px"
          className="absolute inset-0 h-full w-full object-cover"
          alt={beforeLabel} 
          draggable="false"
          loading="lazy"
        />
      </div>

      {/* After Image with Clip Path */}
      <div 
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        style={{ 
          clipPath: `polygon(${sliderPosition}% 0, 100% 0, 100% 100%, ${sliderPosition}% 100%)` 
        }}
      >
        <div className="absolute inset-0 w-full h-full bg-primary/5" />
        <Image
          src={afterImage} 
          fill
          sizes="(max-width: 768px) 92vw, 640px"
          className="absolute inset-0 h-full w-full object-cover"
          alt={afterLabel} 
          draggable="false"
          loading="lazy"
        />
        {/* Border line */}
        <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-primary shadow-[0_0_10px_rgba(0,0,0,0.5)]" />
      </div>

      <div className="absolute top-4 left-1/2 -translate-x-1/2 rounded-full border border-white/20 bg-black/55 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-md pointer-events-none z-20 transition-all duration-150 ease-out">
        {activeLabel}
      </div>

      {/* Slider Handle */}
      <div 
        className="absolute top-1/2 h-10 w-10 -translate-y-1/2 rounded-full border-2 border-background bg-primary shadow-xl flex items-center justify-center pointer-events-none opacity-90 group-hover:opacity-100 transition-opacity z-20"
        style={{ left: `${sliderPosition}%`, transform: "translate(-50%, -50%)" }}
      >
        <div className="flex gap-1">
          <div className="w-1.5 h-4 bg-primary-foreground rounded-full" />
          <div className="w-1.5 h-4 bg-primary-foreground rounded-full" />
        </div>
      </div>
    </div>
  )
}
