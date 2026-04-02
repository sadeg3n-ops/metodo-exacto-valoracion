"use client"

import { useEffect, useState } from "react"
import { ChevronDown } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Reveal } from "@/components/ui/reveal"
import { cn } from "@/lib/utils"

type ProcessCardVariant = "A" | "B"

const PROCESS_CARD_VARIANT: ProcessCardVariant = "B"

const variantStyles: Record<
  ProcessCardVariant,
  {
    textBlockClass: string
    titleClass: string
    subtitleWrapClass: string
    subtitleClass: string
    accentLineClass?: string
    descriptionWrapClass: string
  }
> = {
  A: {
    textBlockClass: "max-w-[17rem] text-left",
    titleClass:
      "text-2xl font-semibold leading-[1.02] text-white md:text-[2rem]",
    subtitleWrapClass: "mt-3",
    subtitleClass:
      "block text-[1rem] font-semibold leading-[1.22] tracking-[0.01em] text-primary md:text-[1.05rem]",
    descriptionWrapClass: "mt-5 h-[4.75rem] max-w-[16.5rem] overflow-hidden text-left",
  },
  B: {
    textBlockClass: "max-w-[17rem] text-left",
    titleClass:
      "text-2xl font-semibold leading-[1.02] text-white md:text-[2rem]",
    subtitleWrapClass: "mt-3.5",
    subtitleClass:
      "block text-[1rem] font-semibold leading-[1.22] tracking-[0.01em] text-primary md:text-[1.05rem]",
    accentLineClass: "mb-3 h-px w-14 bg-gradient-to-r from-primary/75 via-primary/30 to-transparent",
    descriptionWrapClass: "mt-5 h-[4.75rem] max-w-[16.5rem] overflow-hidden text-left",
  },
}

const features = [
  {
    title: "Entrenamiento programado",
    subtitle: "El estímulo exacto",
    description: "Rutina adaptada a tu nivel, tu material, tu experiencia y el tiempo real del que dispones.",
    image: "/images/process/entrenamiento-con-criterio.png",
    imagePosition: "center center",
    overlayClass: "from-black/91 via-black/64 to-black/34 md:from-black/90 md:via-black/54 md:to-black/28 md:group-hover:from-black/94 md:group-hover:via-black/68 md:group-hover:to-black/40",
  },
  {
    title: "Nutrición flexible",
    subtitle: "Comer bien sin complicarte",
    description: "Objetivos claros, pautas flexibles y margen para comer fuera sin cortar el progreso.",
    image: "/images/process/nutricion-flexible.jpg",
    imagePosition: "center center",
    overlayClass: "from-black/94 via-black/76 to-black/48 md:from-black/93 md:via-black/66 md:to-black/42 md:group-hover:from-black/96 md:group-hover:via-black/78 md:group-hover:to-black/52",
  },
  {
    title: "Seguimiento constante",
    subtitle: "Ajustes cuando toca",
    description: "Revisamos técnica, recuperación y rendimiento para corregir antes del estancamiento o de las molestias.",
    image: "/images/process/seguimiento-constante.png",
    imagePosition: "center center",
    overlayClass: "from-black/91 via-black/64 to-black/34 md:from-black/90 md:via-black/54 md:to-black/28 md:group-hover:from-black/94 md:group-hover:via-black/68 md:group-hover:to-black/40",
  }
]

function SolutionFeatureCard({
  feature,
  index,
  isMobileOpen,
  onMobileToggle,
}: {
  feature: (typeof features)[number]
  index: number
  isMobileOpen: boolean
  onMobileToggle: () => void
}) {
  const [isMobileViewport, setIsMobileViewport] = useState(false)
  const isMobileActive = isMobileViewport && isMobileOpen
  const activeVariant = variantStyles[PROCESS_CARD_VARIANT]

  useEffect(() => {
    if (typeof window === "undefined") return

    const mediaQuery = window.matchMedia("(max-width: 767px)")
    const updateViewport = () => {
      const isMobile = mediaQuery.matches
      setIsMobileViewport(isMobile)
    }

    updateViewport()
    mediaQuery.addEventListener("change", updateViewport)

    return () => mediaQuery.removeEventListener("change", updateViewport)
  }, [])

  return (
    <Reveal
      key={feature.title}
      delay={0.3 + index * 0.15}
      className="h-full"
    >
      <Card
        role={isMobileViewport ? "button" : undefined}
        tabIndex={isMobileViewport ? 0 : undefined}
        onClick={isMobileViewport ? onMobileToggle : undefined}
        onKeyDown={
          isMobileViewport
            ? (event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault()
                  onMobileToggle()
                }
              }
            : undefined
        }
        className="group relative h-full min-h-[18.5rem] overflow-hidden border-border/70 bg-card/30 transition-colors duration-200 ease-out hover:border-primary/45 md:min-h-[20rem]"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('${feature.image}')`,
            backgroundPosition: feature.imagePosition,
          }}
        />
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-t transition-opacity duration-200 ease-out",
            feature.overlayClass,
          )}
        />
        <div
          className="absolute inset-0 opacity-90"
          style={{
            background:
              "radial-gradient(circle at 26% 82%, rgba(0,0,0,0.44) 0%, rgba(0,0,0,0.28) 24%, rgba(0,0,0,0.10) 42%, rgba(0,0,0,0) 62%)",
          }}
        />

        <CardContent className="relative z-10 flex h-full flex-col justify-end p-6 md:p-8">
          <div className={activeVariant.textBlockClass}>
            <h3
              className={activeVariant.titleClass}
              style={{ textShadow: "0 2px 14px rgba(0,0,0,0.48)" }}
            >
              {feature.title}
            </h3>
            <div className={activeVariant.subtitleWrapClass}>
              {activeVariant.accentLineClass ? (
                <div className={activeVariant.accentLineClass} />
              ) : null}
              <p
                className={activeVariant.subtitleClass}
                style={{
                  textShadow:
                    "0 1px 2px rgba(0,0,0,0.62), 0 0 18px rgba(234,109,31,0.12)",
                }}
              >
                {feature.subtitle}
              </p>
            </div>
            <div className={activeVariant.descriptionWrapClass}>
              <p
                className={cn(
                  "text-sm leading-relaxed text-slate-300 transition-opacity duration-200 ease-out md:text-base",
                  isMobileViewport
                    ? isMobileActive
                      ? "opacity-100"
                      : "opacity-0"
                    : "opacity-0 md:group-hover:opacity-100",
                )}
              >
                {feature.description}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Reveal>
  )
}

export function SolutionSection() {
  const [mobileOpenIndex, setMobileOpenIndex] = useState<number | null>(null)

  return (
    <section id="resultados" className="pt-16 pb-12 md:py-28 bg-background relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <Reveal duration={0.32} direction="none">
            <span className="inline-block text-primary font-semibold text-sm tracking-wider uppercase mb-4">
              Proceso
            </span>
          </Reveal>
          <Reveal delay={0.04} duration={0.36} direction="none">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
              Qué cambia cuando dejas de improvisar
            </h2>
          </Reveal>
          <Reveal delay={0.08} duration={0.38} direction="none">
            <p className="text-lg text-muted-foreground">
              Diagnóstico, programación y ajustes continuos. Sabes qué hacer, cuánto hacer y qué tocar según tu respuesta.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3 max-w-5xl mx-auto auto-rows-fr">
          {features.map((feature, index) => (
            <SolutionFeatureCard
              key={feature.title}
              feature={feature}
              index={index}
              isMobileOpen={mobileOpenIndex === index}
              onMobileToggle={() => setMobileOpenIndex((current) => (current === index ? null : index))}
            />
          ))}
        </div>

        <div className="mt-8 flex justify-center md:hidden">
          <div className="flex flex-col items-center text-primary/80">
            <div className="h-8 w-px bg-primary/35" />
            <ChevronDown className="h-5 w-5 animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  )
}
