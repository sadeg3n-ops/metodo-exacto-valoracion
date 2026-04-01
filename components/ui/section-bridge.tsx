"use client"

import { cn } from "@/lib/utils"

interface SectionBridgeProps {
  className?: string
  compact?: boolean
}

export function SectionBridge({ className, compact = false }: SectionBridgeProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none relative flex items-center justify-center overflow-hidden",
        compact ? "h-16 md:h-20" : "h-20 md:h-24",
        className,
      )}
    >
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2">
        <div className="section-bridge-line mx-auto h-px w-[min(80vw,46rem)]" />
        <div className="section-bridge-wave mx-auto mt-[-1px] h-px w-[min(52vw,24rem)]" />
        <div className="section-bridge-spark section-bridge-spark-left" />
        <div className="section-bridge-spark section-bridge-spark-right" />
      </div>

      <div className="section-bridge-aura absolute left-1/2 top-1/2 h-24 w-[min(68vw,24rem)] -translate-x-1/2 -translate-y-1/2 rounded-full md:h-28 md:w-[min(54vw,28rem)]" />
      <div className="section-bridge-halo absolute left-1/2 top-1/2 h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full md:h-16 md:w-16" />

      <div className="relative flex items-center justify-center">
        <div className="section-bridge-ring absolute h-10 w-10 rounded-full md:h-12 md:w-12" />
        <div className="section-bridge-beam h-8 w-px rounded-full md:h-10" />
      </div>
    </div>
  )
}
