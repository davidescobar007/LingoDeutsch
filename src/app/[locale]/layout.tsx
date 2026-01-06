import { ReactNode } from 'react'
import { Slide, ToastContainer } from 'react-toastify'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { NextIntlClientProvider, useMessages } from 'next-intl'

import QueryProvider from '@/hooks/queryProvider'

import 'react-toastify/dist/ReactToastify.css'
import './globals.scss'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://blabling.com'

export const metadata: Metadata = {
   title: {
      default: 'Blabling - Aprende alemán de forma fácil y divertida',
      template: '%s | Blabling'
   },
   description:
      'Domina el alemán leyendo lo que te apasiona. De A1 a B2 con lecturas reales, vocabulario con repetición espaciada y gramática clara.',
   icons: {
      icon: '/images/icon.png',
      apple: '/images/apple-icon.png'
   },
   manifest: '/manifest.json',
   metadataBase: new URL(BASE_URL),
   openGraph: {
      type: 'website',
      siteName: 'Blabling',
      images: [
         {
            url: '/images/og-image.png',
            width: 1200,
            height: 630
         }
      ]
   },
   twitter: {
      card: 'summary_large_image',
      creator: '@blabling'
   }
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
               <body className={`${interFontDisplay.className} text-neutral bg-base-200`}>
                  {children}
                  <ToastContainer
                     autoClose={5000}
                     closeOnClick
                     hideProgressBar={false}
                     newestOnTop={false}
                     position="bottom-right"
                     rtl={false}
                     transition={Slide}
                  />
                  <ReactQueryDevtools initialIsOpen={false} />
               </body>
            </html>
         </NextIntlClientProvider>
      </QueryProvider>
   )
}

export default RootLayout
