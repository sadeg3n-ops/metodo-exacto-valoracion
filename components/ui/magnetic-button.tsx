"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useSpring } from "framer-motion"

export function MagneticButton({ 
  children, 
  className = "" 
}: { 
  children: React.ReactNode, 
  className?: string 
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [isEnabled, setIsEnabled] = useState(false)
  
  const springConfig = { damping: 20, stiffness: 120, mass: 0.16 }
  const x = useSpring(0, springConfig)
  const y = useSpring(0, springConfig)

  useEffect(() => {
    if (typeof window === "undefined") return

    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)")
    const updateEnabled = () => setIsEnabled(mediaQuery.matches)

    updateEnabled()
    mediaQuery.addEventListener("change", updateEnabled)

    return () => mediaQuery.removeEventListener("change", updateEnabled)
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current || !isEnabled) return
    const rect = ref.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    
    // Magnetic pull: reduced for smoother desktop behavior
    const hX = (e.clientX - rect.left - width / 2) * 0.16
    const hY = (e.clientY - rect.top - height / 2) * 0.16
    
    x.set(hX)
    y.set(hY)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={isEnabled ? handleMouseMove : undefined}
      onMouseLeave={isEnabled ? handleMouseLeave : undefined}
      style={{ x, y }}
      className={`relative inline-flex ${className}`}
    >
      {children}
    </motion.div>
  )
}
