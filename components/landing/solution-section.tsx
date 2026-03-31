"use client"

import { useRef } from "react"
import { ChevronDown } from "lucide-react"
import { useInView } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Reveal } from "@/components/ui/reveal"
import { Tilt } from "@/components/ui/tilt"
import { cn } from "@/lib/utils"

const features = [
  {
    title: "Entrenamiento con criterio",
    subtitle: "El estímulo exacto",
    description: "Rutina diseñada y adaptada a tu nivel, tu material, tu experiencia y el tiempo del que dispones.",
    image: "/images/process/entrenamiento-con-criterio.png",
    imagePosition: "center center",
  },
  {
    title: "Nutrición sostenible",
    subtitle: "Comer bien, sin aislarte",
    description: "Objetivos claros, pautas flexibles y margen para comer fuera sin cortar el progreso.",
    image: "/images/process/nutricion-sostenible.png",
    imagePosition: "center center",
  },
  {
    title: "Seguimiento constante",
    subtitle: "Ajustes con datos",
    description: "Revisamos tu técnica y sensaciones para corregirlas en el momento correcto y evitar lesiones.",
    image: "/images/process/seguimiento-constante.png",
    imagePosition: "center center",
  }
]

function SolutionFeatureCard({
  feature,
  index,
}: {
  feature: (typeof features)[number]
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isMobileActive = useInView(ref, {
    once: false,
    amount: 0.65,
    margin: "-10% 0px -20% 0px",
  })

  return (
    <Reveal
      key={feature.title}
      delay={0.3 + index * 0.15}
      className={index === 0 ? "lg:col-span-2 lg:row-span-2" : ""}
    >
      <Tilt className="h-full">
        <Card
          ref={ref}
          className="group relative h-full overflow-hidden border-border/70 bg-card/30 hover:border-primary/60 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10"
        >
          <div
            className="absolute inset-0 scale-100 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            style={{
              backgroundImage: `url('${feature.image}')`,
              backgroundPosition: feature.imagePosition,
            }}
          />
          <div
            className={cn(
              "absolute inset-0 transition-colors duration-500 md:bg-black/45 md:group-hover:bg-black/80",
              isMobileActive ? "bg-black/72" : "bg-black/42",
            )}
          />
          <div
            className={cn(
              "absolute inset-0 transition-all duration-500 md:bg-gradient-to-t md:from-black/90 md:via-black/45 md:to-black/20 md:group-hover:from-black/95 md:group-hover:via-black/80 md:group-hover:to-black/55",
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
              <p
                className={cn(
                  "mt-4 text-sm md:text-base leading-relaxed transition-all duration-500",
                  index === 0 ? "max-w-lg" : "max-w-sm",
                  "md:text-slate-300 md:opacity-0 md:translate-y-4 md:group-hover:opacity-100 md:group-hover:translate-y-0",
                  isMobileActive
                    ? "max-h-40 opacity-100 translate-y-0 text-slate-300"
                    : "max-h-0 opacity-0 translate-y-3 overflow-hidden text-slate-300/0",
                )}
              >
                {feature.description}
              </p>
            </div>
          </CardContent>
        </Card>
      </Tilt>
    </Reveal>
  )
}

export function SolutionSection() {
  return (
    <section id="resultados" className="pt-16 pb-12 md:py-28 bg-background relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <Reveal>
            <span className="inline-block text-primary font-semibold text-sm tracking-wider uppercase mb-4">
              Proceso
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
              Qué cambia cuando trabajamos con un sistema claro
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-lg text-muted-foreground">
              Diagnóstico, programación y ajustes continuos. Sabes qué hacer, por qué hacerlo y cuándo tocar cada variable.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3 max-w-5xl mx-auto md:auto-rows-fr">
          {features.map((feature, index) => (
            <SolutionFeatureCard key={feature.title} feature={feature} index={index} />
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
