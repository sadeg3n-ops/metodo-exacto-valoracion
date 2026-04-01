import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import Script from "next/script"
import { Analytics } from "@vercel/analytics/next"
import { LiveToasts } from "@/components/ui/live-toasts"
import { CustomCursor } from "@/components/ui/custom-cursor"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter"
})

const socialPreviewUrl = "https://metodo-exacto-valoracion.vercel.app/social-preview-logo-v1.png?v=20260330b"

export const metadata: Metadata = {
  metadataBase: new URL("https://metodo-exacto-valoracion.vercel.app"),
  title: "Método Exacto | Asesoría Online Premium",
  description: "Reserva una valoración inicial y descubre qué necesitas para progresar con entrenamiento y nutrición adaptados a tu caso.",
  keywords: "asesoría online, entrenador personal online, entrenamiento online, nutrición flexible, recomposición corporal",
  openGraph: {
    title: "Método Exacto | Asesoría Online Premium",
    description: "Reserva una valoración inicial y descubre qué necesitas para progresar con entrenamiento y nutrición adaptados a tu caso.",
    siteName: "Método Exacto",
    type: "website",
    images: [
      {
        url: socialPreviewUrl,
        width: 1200,
        height: 630,
        alt: "Método Exacto",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Método Exacto | Asesoría Online Premium",
    description: "Reserva una valoración inicial y descubre qué necesitas para progresar con entrenamiento y nutrición adaptados a tu caso.",
    images: [socialPreviewUrl],
  },
  icons: {
    icon: "/exact-method-favicon.png",
    apple: "/exact-method-apple-icon.png",
  },
}

export const viewport: Viewport = {
  themeColor: "#0f172a",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL?.trim()

  return (
    <html lang="es" className="scroll-smooth">
      <head>
        {calendlyUrl ? (
          <link
            rel="stylesheet"
            href="https://assets.calendly.com/assets/external/widget.css"
          />
        ) : null}
      </head>
      <body className={`${inter.variable} font-sans antialiased bg-background text-foreground`}>
        <CustomCursor />
        <div className="pointer-events-none fixed inset-0 z-[100] h-full w-full opacity-[0.03] mix-blend-overlay">
          <svg width="100%" height="100%">
            <filter id="noise">
              <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
            </filter>
            <rect width="100%" height="100%" filter="url(#noise)" />
          </svg>
        </div>

        {children}
        <LiveToasts />
        <Analytics />
        {calendlyUrl ? (
          <Script
            src="https://assets.calendly.com/assets/external/widget.js"
            strategy="afterInteractive"
          />
        ) : null}
      </body>
    </html>
  )
}
