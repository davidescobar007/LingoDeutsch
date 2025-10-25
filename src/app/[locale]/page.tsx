/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { Suspense } from 'react'

import { OrganismNavbar as Navbar } from '@/components/organisms'
import {
   OrganismFooterSection as FooterSection,
   OrganismHeroSection as HeroSection,
   OrganismHowItWorksSection as HowItWorksSection
} from '@/components/organisms'

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
