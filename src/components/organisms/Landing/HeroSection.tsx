'use client'
import { useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'

import { AtomBadge, AtomButton, AtomText, AtomTitle } from '@/components/atoms'

const Lottie = dynamic(() => import('lottie-react'), { ssr: false })

export const OrganismHeroSection = () => {
   const lottieRef = useRef<any>(null)

   useEffect(() => {
      if (lottieRef.current) {
         lottieRef.current.setSpeed(0.02)
      }
   }, [])

   return (
      <section className="bg-primary relative py-8 pb-20 sm:min-h-[90vh] lg:min-h-[85vh]">
         <div className="container relative mx-auto sm:px-6 sm:py-20 md:py-24 lg:px-8 lg:py-28">
            <div className="mx-auto max-w-7xl">
               <div className="flex flex-col items-center gap-8 lg:grid lg:grid-cols-2 lg:gap-16">
                  {/* Badge */}
                  <div className="flex w-full justify-center lg:hidden">
                     <AtomBadge color="secondary" size="lg">
                        🇩🇪 Alemán para hispanohablantes
                     </AtomBadge>
                  </div>

                  {/* Title - Mobile/Tablet */}
                  <div className="w-full text-center lg:hidden">
                     <AtomTitle
                        extraClassName="!text-4xl sm:!text-5xl !font-bold !text-white !mb-0 leading-tight drop-shadow-lg"
                        type="h1"
                     >
                        La forma más fácil de aprender alemán es aquí, con Blabling{' '}
                        <Image
                           alt="languages icon"
                           className="inline-block align-middle drop-shadow-lg"
                           height={48}
                           src="/images/languages.svg"
                           width={48}
                        />
                     </AtomTitle>
                  </div>

                  {/* Subtitle - Mobile/Tablet */}
                  <div className="w-full text-center lg:hidden">
                     <AtomText
                        className="mx-auto max-w-2xl !text-lg !text-white/90 drop-shadow-md sm:!text-xl"
                        fontSize="large"
                        type="paragraph"
                     >
                        Gramática efectiva, lecturas interactivas y vocabulario que realmente recuerdas.
                     </AtomText>
                  </div>

                  {/* Lottie - Mobile/Tablet (order 3) / Desktop (order 2) */}
                  <div className="relative flex w-full items-center justify-center lg:order-2 lg:justify-end">
                     <div className="relative h-[280px] w-[280px] sm:h-[350px] sm:w-[350px] md:h-[400px] md:w-[400px] lg:h-[450px] lg:w-[450px]">
                        <Lottie
                           animationData={require('/public/animated/grammar.json')}
                           loop
                           lottieRef={lottieRef}
                        />
                     </div>
                  </div>

                  {/* Left content - Desktop only */}
                  <div className="hidden w-full text-left lg:order-1 lg:block">
                     <div className="mb-6 flex justify-start">
                        <AtomBadge color="secondary" size="lg">
                           🇩🇪 Alemán para hispanohablantes
                        </AtomBadge>
                     </div>

                     <div className="mb-6 flex justify-start">
                        <AtomTitle
                           extraClassName="!text-6xl !font-bold !text-white !mb-0 leading-tight drop-shadow-lg"
                           type="h1"
                        >
                           La forma más fácil de aprender alemán es aquí, con Blabling{' '}
                           <Image
                              alt="languages icon"
                              className="inline-block align-middle drop-shadow-lg"
                              height={48}
                              src="/images/languages.svg"
                              width={48}
                           />
                        </AtomTitle>
                     </div>

                     <AtomText
                        className="!mb-8 max-w-2xl !text-2xl !text-white/90 drop-shadow-md"
                        fontSize="large"
                        type="paragraph"
                     >
                        Gramática efectiva, lecturas interactivas y vocabulario que realmente recuerdas.
                     </AtomText>

                     <div className="flex justify-start">
                        <AtomButton href="/app/home" size="lg" type="link" variant="ACCENT">
                           Comienza aquí
                        </AtomButton>
                     </div>
                  </div>

                  {/* Button - Mobile/Tablet */}
                  <div className="flex w-full justify-center lg:hidden">
                     <AtomButton href="/app/home" size="lg" type="link" variant="ACCENT">
                        Comienza aquí
                     </AtomButton>
                  </div>
               </div>
            </div>
         </div>

         {/* Wave divider */}
         <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
            <svg
               className="relative block h-[80px] w-[calc(100%+1.3px)] sm:h-[180px] md:h-[120px]"
               preserveAspectRatio="none"
               viewBox="0 0 1200 120"
               xmlns="http://www.w3.org/2000/svg"
            >
               <path d="M0,0 C150,80 350,0 600,60 C850,120 1050,40 1200,80 L1200,120 L0,120 Z" fill="#F9FAFB" />
            </svg>
         </div>
      </section>
   )
}
