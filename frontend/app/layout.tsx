import type React from "react"
import type { Metadata } from "next"
import { Cinzel, Crimson_Text } from "next/font/google"
import "./globals.css"
import ClientLayout from "./ClientLayout"

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  display: "swap",
})

const crimsonText = Crimson_Text({
  weight: ["400", "600"],
  subsets: ["latin"],
  variable: "--font-crimson",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Ancient Knowledge Vault - Mystical Wisdom Repository",
  description: "Discover the most sought-after ancient wisdom and mystical knowledge from the sacred archives",
  keywords: "ancient knowledge, mystical wisdom, sacred texts, ancient library, spiritual knowledge",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <ClientLayout cinzel={cinzel} crimsonText={crimsonText} >{children}</ClientLayout>
}
