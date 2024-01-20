import { ReactNode } from "react"
import { ToastContainer } from "react-toastify"
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
         <body>
            {children}
            <ToastContainer
               autoClose={5000}
               closeOnClick
               hideProgressBar={false}
               newestOnTop={false}
               position="bottom-right"
               rtl={false}
            />
         </body>
      </html>
   )
}
