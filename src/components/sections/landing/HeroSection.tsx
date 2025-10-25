'use client'
import { useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'

import { AtomBadge, AtomButton } from '@/components/atoms'

const Lottie = dynamic(() => import('lottie-react'), { ssr: false })

export const HeroSection = () => {
   const lottieRef = useRef<any>(null)

   useEffect(() => {
      if (lottieRef.current) {
         lottieRef.current.setSpeed(2)
      }
   }, [])

   return (
      <section className="from-primary via-primary relative min-h-screen overflow-hidden bg-gradient-to-b to-white pb-20 sm:min-h-[90vh] lg:min-h-[85vh]">
         {/* Simple decorative blob */}
         <div className="absolute right-0 top-0 h-[300px] w-[300px] rounded-full bg-purple-600 opacity-20 blur-3xl sm:h-[400px] sm:w-[400px] md:h-[500px] md:w-[500px]" />

         <div className="container relative mx-auto px-4 py-16 sm:px-6 sm:py-20 md:py-24 lg:px-8 lg:py-28">
            <div className="mx-auto max-w-7xl">
               <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
                  {/* Left content */}
                  <div className="order-2 text-center lg:order-1 lg:text-left">
                     <div className="mb-6 flex justify-center lg:justify-start">
                        <AtomBadge color="secondary" size="lg">
                           🇩🇪 Alemán para hispanohablantes
                        </AtomBadge>
                     </div>

                     <h1 className="mb-6 text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
                        La forma más fácil de aprender alemán
                     </h1>

                     <p className="mb-8 text-base text-purple-100 sm:text-lg md:text-xl lg:text-lg">
                        Gramática efectiva, lecturas interactivas y vocabulario que realmente recuerdas.
                     </p>

                     <div className="flex justify-center lg:justify-start">
                        <AtomButton href="/app/home" size="lg" type="link" variant="ACCENT">
                           Comienza aquí
                        </AtomButton>
                     </div>
                  </div>

                  {/* Right illustration */}
                  {/* Right illustration */}
                  <div className="relative order-1 flex items-center justify-center lg:order-2 lg:justify-end">
                     <div className="relative h-[280px] w-[280px] sm:h-[350px] sm:w-[350px] md:h-[400px] md:w-[400px] lg:h-[450px] lg:w-[450px]">
                        <Lottie
                           animationData={require('/public/animated/grammar.json')}
                           loop
                           lottieRef={lottieRef}
                        />
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
   )
}
