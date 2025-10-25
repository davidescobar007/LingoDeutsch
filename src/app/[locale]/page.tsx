/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { Suspense } from 'react'

import Navbar from '@/components/_common/navbar/navbar'
import { FooterSection, HeroSection, HowItWorksSection } from '@/components/sections/landing'

const Home = ({ params: { locale } }: { params: { locale: string } }) => {
   return (
      <div className="flex flex-col">
         <Suspense fallback="loading Navigation bar...">
            <Navbar locale={locale} />
         </Suspense>

         <main className="overflow-x-hidden">
            <HeroSection />
            <HowItWorksSection />
         </main>

         <FooterSection />
      </div>
   )
}
export default Home
