import { ReactNode } from 'react'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { Toaster } from 'sileo'

import QueryProvider from '@/hooks/queryProvider'
import { AuthProvider } from '@/providers/AuthProvider'

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

const plusJakartaSans = Plus_Jakarta_Sans({
   weight: ['400', '500', '600', '700'],
   subsets: ['latin'],
   display: 'auto',
   style: 'normal'
})

const RootLayout = async ({ children, params }: { readonly children: ReactNode; params: Promise }) => {
   const { locale } = await params
   const messages = await getMessages()
   return (
      <QueryProvider>
         <AuthProvider>
            <NextIntlClientProvider messages={messages}>
               <html data-theme="mytheme" lang={locale}>
                  <body className={`${plusJakartaSans.className} text-neutral bg-base-200`}>
                     {children}
                     <Toaster
                        options={{
                           duration: 5000
                        }}
                        position="bottom-right"
                     />
                     <ReactQueryDevtools buttonPosition="relative" initialIsOpen={false} />
                  </body>
               </html>
            </NextIntlClientProvider>
         </AuthProvider>
      </QueryProvider>
   )
}

export default RootLayout
