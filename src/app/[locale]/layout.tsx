import { ReactNode } from "react"
import { ToastContainer } from "react-toastify"
import type { Metadata } from "next"
import { NextIntlClientProvider, useMessages } from "next-intl"

import Navbar from "@/components/molecules/navbar"
import QueryProvider from "@/store/queryProvider"

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
   const messages = useMessages()
   return (
      <QueryProvider>
         <NextIntlClientProvider messages={messages}>
            <html lang={locale}>
               <body>
                  <Navbar locale={locale} />
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
               {/* <ReactQueryDevtools initialIsOpen={false} /> */}
            </html>
         </NextIntlClientProvider>
      </QueryProvider>
   )
}

export default RootLayout
