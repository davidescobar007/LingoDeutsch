import { ReactNode } from "react"
import { Slide, ToastContainer } from "react-toastify"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import type { Metadata } from "next"
import { Red_Hat_Display } from "next/font/google"
import { NextIntlClientProvider, useMessages } from "next-intl"

import QueryProvider from "@/store/queryProvider"

import "react-toastify/dist/ReactToastify.css"
import "./globals.scss"

export const metadata: Metadata = {
   title: "LingoDeutsch",
   description: "Te acompañamos en tu camino para aprender alemán.",
   icons: "images/icon-192x192.png"
}

const redHatDisplay = Red_Hat_Display({
   weight: "500",
   subsets: ["latin"],
   display: "swap",
   style: "normal"
})

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
            <html data-theme="mytheme" lang={locale}>
               <body className={`${redHatDisplay.className} text-gray-600`}> {children}</body>
               <ReactQueryDevtools initialIsOpen={false} />
               <ToastContainer
                  autoClose={5000}
                  closeOnClick
                  hideProgressBar={false}
                  newestOnTop={false}
                  position="bottom-right"
                  rtl={false}
                  transition={Slide}
               />
            </html>
         </NextIntlClientProvider>
      </QueryProvider>
   )
}

export default RootLayout
