"use client"

import { useEffect, useState } from "react"
import { ChevronDown } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Reveal } from "@/components/ui/reveal"
import { Tilt } from "@/components/ui/tilt"
import { cn } from "@/lib/utils"

const features = [
  {
    title: "Entrenamiento programado",
    subtitle: "El estímulo exacto",
    description: "Rutina adaptada a tu nivel, tu material, tu experiencia y el tiempo real del que dispones.",
    image: "/images/process/entrenamiento-con-criterio.png",
    imagePosition: "center center",
  },
  {
    title: "Nutrición flexible",
    subtitle: "Comer bien sin complicarte",
    description: "Objetivos claros, pautas flexibles y margen para comer fuera sin cortar el progreso.",
    image: "/images/process/nutricion-flexible.jpg",
    imagePosition: "center center",
  },
  {
    title: "Seguimiento constante",
    subtitle: "Ajustes cuando toca",
    description: "Revisamos técnica, recuperación y rendimiento para corregir antes del estancamiento o de las molestias.",
    image: "/images/process/seguimiento-constante.png",
    imagePosition: "center center",
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
      className={index === 0 ? "lg:col-span-2 lg:row-span-2" : ""}
    >
      <Tilt className="h-full">
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
          className="group relative h-full overflow-hidden border-border/70 bg-card/30 transition-[border-color,box-shadow] duration-300 ease-out hover:border-primary/55 hover:shadow-xl hover:shadow-primary/8"
        >
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 ease-out md:group-hover:scale-[1.03]"
            style={{
              backgroundImage: `url('${feature.image}')`,
              backgroundPosition: feature.imagePosition,
            }}
          />
          <div
            className={cn(
              "absolute inset-0 transition-colors duration-300 ease-out md:bg-black/45 md:group-hover:bg-black/72",
              isMobileActive ? "bg-black/72" : "bg-black/42",
            )}
          />
          <div
            className={cn(
              "absolute inset-0 transition-opacity duration-300 ease-out md:bg-gradient-to-t md:from-black/90 md:via-black/45 md:to-black/20 md:group-hover:from-black/95 md:group-hover:via-black/78 md:group-hover:to-black/50",
              isMobileActive
                ? "bg-gradient-to-t from-black/96 via-black/78 to-black/34"
                : "bg-gradient-to-t from-black/88 via-black/44 to-black/16",
            )}
          />

          <CardContent
            className={cn(
              "relative z-10 flex h-full flex-col justify-end p-6 text-left md:p-8",
              index === 0 ? "md:p-12" : "",
            )}
          >
            <div className="max-w-xl">
              <h3 className={cn("font-semibold text-white mb-2", index === 0 ? "text-3xl md:text-4xl" : "text-2xl")}>
                {feature.title}
              </h3>
              <p className={cn("text-primary font-semibold tracking-wide", index === 0 ? "text-lg md:text-xl" : "text-base")}>
                {feature.subtitle}
              </p>
              <div
                className={cn(
                  "grid transition-[grid-template-rows,opacity,margin-top] duration-350 ease-out will-change-[opacity]",
                  index === 0 ? "max-w-lg" : "max-w-sm",
                  isMobileActive
                    ? "mt-4 grid-rows-[1fr] opacity-100"
                    : "mt-2 grid-rows-[0fr] opacity-0 md:group-hover:mt-4 md:group-hover:grid-rows-[1fr] md:group-hover:opacity-100",
                )}
              >
                <p
                  className={cn(
                    "min-h-0 overflow-hidden text-sm md:text-base leading-relaxed text-slate-300 transition-[opacity,transform] duration-300 ease-out will-change-[opacity,transform]",
                    isMobileActive ? "translate-y-0" : "translate-y-3 md:group-hover:translate-y-0",
                  )}
                >
                  {feature.description}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </Tilt>
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

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3 max-w-5xl mx-auto md:auto-rows-fr">
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
