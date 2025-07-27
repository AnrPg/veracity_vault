"use client"

import type React from "react"

/* eslint-disable @typescript-eslint/no-explicit-any */
interface Props {
  cinzel: any
  crimsonText: any
  children: React.ReactNode
}
/* eslint-enable @typescript-eslint/no-explicit-any */

export default function ClientLayout({ cinzel, crimsonText, children }: Props) {
  return (
    <html lang="en" className={`${cinzel.variable} ${crimsonText.variable}`}>
      <body className={`${crimsonText.className} antialiased`}>
        <style jsx global>{`
          h1, h2, h3, h4, h5, h6 {
            font-family: var(--font-cinzel);
          }
        `}</style>
        {children}
      </body>
    </html>
  )
}
