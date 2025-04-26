import { ReactNode } from 'react'
import { Slide, ToastContainer } from 'react-toastify'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { NextIntlClientProvider, useMessages } from 'next-intl'

import QueryProvider from '@/hooks/queryProvider'

import 'react-toastify/dist/ReactToastify.css'
import './globals.scss'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

export const metadata: Metadata = {
   title: 'LingoDeutsch',
   description: 'Te acompañamos en tu camino para aprender alemán.',
   icons: 'images/icon-192x192.png'
}

const interFontDisplay = Inter({
   weight: '500',
   subsets: ['latin'],
   display: 'auto',
   style: 'normal'
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
               <body className={`${interFontDisplay.className} text-neutral bg-base-300`}>
                  {children}
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
               </body>
            </html>
         </NextIntlClientProvider>
      </QueryProvider>
   )
}

export default RootLayout
