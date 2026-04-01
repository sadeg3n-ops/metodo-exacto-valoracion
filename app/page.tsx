"use client"

import { useState } from "react"
import { Header } from "@/components/landing/header"
import { HeroSection } from "@/components/landing/hero-section"
import { ProblemSection } from "@/components/landing/problem-section"
import { SolutionSection } from "@/components/landing/solution-section"
import { TestimonialsSection } from "@/components/landing/testimonials-section"
import { PricingSection } from "@/components/landing/pricing-section"
import { GuaranteeSection } from "@/components/landing/guarantee-section"
import { FaqSection } from "@/components/landing/faq-section"
import { FooterSection } from "@/components/landing/footer-section"
import { CtaModal } from "@/components/landing/cta-modal"
import { SectionBridge } from "@/components/ui/section-bridge"

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { url: string }) => void
    }
  }
}

export default function MetodoExactoLandingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL?.trim() ?? ""

  const openModal = () => {
    if (!calendlyUrl) {
      setIsModalOpen(true)
      return
    }

    const bookingUrl = new URL(calendlyUrl)
    bookingUrl.searchParams.set("hide_event_type_details", "1")
    bookingUrl.searchParams.set("hide_gdpr_banner", "1")
    bookingUrl.searchParams.set("primary_color", "ea6d1f")
    bookingUrl.searchParams.set("text_color", "ffffff")
    bookingUrl.searchParams.set("background_color", "0b0d12")

    if (window.Calendly?.initPopupWidget) {
      window.Calendly.initPopupWidget({ url: bookingUrl.toString() })
      return
    }

    window.location.href = bookingUrl.toString()
  }

  const closeModal = () => setIsModalOpen(false)

  return (
    <>
      <Header onCtaClick={openModal} />
      
      <main>
        <HeroSection onCtaClick={openModal} />
        <ProblemSection />
        <SectionBridge />
        <SolutionSection />
        <SectionBridge />
        <TestimonialsSection />
        <SectionBridge compact />
        <PricingSection onCtaClick={openModal} />
        <SectionBridge compact />
        <GuaranteeSection />
        <SectionBridge compact />
        <FaqSection />
      </main>

      <FooterSection onCtaClick={openModal} />

      <CtaModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  )
}
