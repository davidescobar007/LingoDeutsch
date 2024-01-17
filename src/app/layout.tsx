import { ReactNode } from "react"
import type { Metadata } from "next"

import "./globals.scss"

export const metadata: Metadata = {
   title: "LingoDeutsch",
   description: "Te acompañamos en tu camino para aprender alemán.",
   icons: "images/icon-192x192.png"
}

export default function RootLayout({ children }: { readonly children: ReactNode }) {
   return (
      <html lang="en">
         <body>{children}</body>
      </html>
   )
}
