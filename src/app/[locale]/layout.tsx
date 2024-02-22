import { ReactNode } from "react"
import { ToastContainer } from "react-toastify"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import type { Metadata } from "next"

import Navbar from "@/components/molecules/navbar"
import QueryProvider from "@/hooksStore/queryProvider"

import "./globals.scss"

export const metadata: Metadata = {
   title: "LingoDeutsch",
   description: "Te acompañamos en tu camino para aprender alemán.",
   icons: "images/icon-192x192.png"
}

const RootLayout = ({
   children,
   params: { locale }
}: {
   readonly children: ReactNode
   params: { locale: string }
}) => {
   return (
      <QueryProvider>
         <html lang={locale}>
            <body>
               <Navbar />
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
            <ReactQueryDevtools initialIsOpen={false} />
         </html>
      </QueryProvider>
   )
}

export default RootLayout
