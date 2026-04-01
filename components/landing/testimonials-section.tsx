"use client"

import { Star, Quote, ChevronDown } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Reveal } from "@/components/ui/reveal"
import { BeforeAfterSlider } from "@/components/ui/before-after-slider"

const testimonials = [
  {
    name: "David G.",
    age: "41 años",
    avatar: "/images/avatar-2.jpg",
    quote: "Llevaba tiempo entrenando con molestias y sin notar avances. Al corregir la técnica, ajustar la carga y ordenar el plan, dejé de tener dolor y por fin empecé a ganar músculo.",
    result: "+4 kg músculo",
    beforeImage: "/images/before-2.jpg",
    afterImage: "/images/after-2.jpg",
    problem: "Llegó con dolor y sin ganar músculo pese a entrenar con constancia."
  }
]

export function TestimonialsSection() {
  return (
    <section className="pt-12 pb-10 md:py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-14">
          <Reveal>
            <span className="inline-block text-primary font-semibold text-sm tracking-wider uppercase mb-4">
              RESULTADOS EVIDENTES
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
              Personas normales. Cambios medibles
            </h2>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-6 max-w-xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Reveal key={testimonial.name} delay={0.3 + index * 0.15}>
              <Card className="bg-card border-border hover:border-primary/30 transition-all duration-300 h-full flex flex-col">
                <CardContent className="p-5 md:p-6 flex-1 flex flex-col">
                  <div className="mb-5">
                    <BeforeAfterSlider
                      beforeImage={testimonial.beforeImage}
                      afterImage={testimonial.afterImage}
                    />
                  </div>

                  <Quote className="w-8 h-8 text-primary/20 mb-3" />

                  <p className="text-sm font-medium text-primary mb-3">
                    {testimonial.problem}
                  </p>

                  <p className="text-foreground text-base md:text-lg leading-relaxed mb-5">
                    {`"${testimonial.quote}"`}
                  </p>

                  <div className="flex gap-1 mb-5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>

                  <div className="flex items-center justify-between mt-auto pt-5">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.age}</p>
                      </div>
                    </div>
                    <div className="px-3.5 py-2 rounded-full bg-primary/10 text-primary font-semibold text-sm whitespace-nowrap">
                      {testimonial.result}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Reveal>
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
