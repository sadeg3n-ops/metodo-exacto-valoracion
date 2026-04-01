"use client"

import { TrendingDown, Users, AlertCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const problems = [
  {
    icon: TrendingDown,
    title: "Rutina sin dirección",
    description: "Entrenas, pero no sabes qué tocar cuando te estancas o empiezas a acumular fatiga."
  },
  {
    icon: Users,
    title: "Nutrición imposible de sostener",
    description: "Si comer bien te complica la vida o te aísla, acabarás soltándolo."
  },
  {
    icon: AlertCircle,
    title: "Sin seguimiento real",
    description: "Sin ajustes en el momento correcto, es fácil perder semanas sin saber qué está fallando."
  }
]

export function ProblemSection() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28 bg-secondary/25">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/35 to-background" />
      <div className="absolute left-1/4 top-10 h-64 w-64 rounded-full bg-primary/6 blur-3xl" />
      <div className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />

      <div className="container relative z-10 mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
            Si entrenas y comes razonablemente bien, pero no avanzas, no te falta esfuerzo.
          </h2>
          <p className="text-lg text-muted-foreground">
            Suele faltar dirección, ajustes y un sistema que encaje con tu vida real.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {problems.map((problem) => (
            <Card
              key={problem.title}
              className="h-full border-border/70 bg-card/75 backdrop-blur-sm transition-all duration-200 hover:border-primary/35 hover:bg-card/85"
            >
              <CardContent className="flex h-full flex-col items-center p-6 text-center md:p-8">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/12 transition-colors duration-200 group-hover:bg-primary/16">
                  <problem.icon className="h-7 w-7 text-orange-500" />
                </div>
                <h3 className="mb-3 text-xl font-semibold text-foreground">
                  {problem.title}
                </h3>
                <p className="leading-relaxed text-muted-foreground">
                  {problem.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
