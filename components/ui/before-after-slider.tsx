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
  const activeLabel = sliderPosition >= 50 ? beforeLabel : afterLabel

  const handleDrag = (e: React.MouseEvent | React.TouchEvent) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    
    let clientX = 0
    if ("touches" in e) {
      clientX = e.touches[0].clientX
    } else {
      clientX = (e as React.MouseEvent).clientX
    }
    
    const x = clientX - rect.left
    const percent = Math.min(Math.max((x / rect.width) * 100, 0), 100)
    setSliderPosition(percent)
  }

  return (
    <div 
      ref={containerRef}
      className="relative w-full aspect-[4/5] sm:aspect-[3/4] max-w-xl mx-auto rounded-xl overflow-hidden cursor-ew-resize select-none border border-border group touch-pan-y"
      onMouseMove={(e) => {
        if (e.buttons === 1) handleDrag(e)
      }}
      onTouchStart={handleDrag}
      onTouchMove={handleDrag}
      onMouseDown={(e) => {
        e.preventDefault() // Prevent text selection and other default browser behaviors
        handleDrag(e)
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
