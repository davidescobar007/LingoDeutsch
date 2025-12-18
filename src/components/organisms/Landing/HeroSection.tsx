'use client'
import { useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

import { AtomBadge, AtomButton, AtomText } from '@/components/atoms'
import { Link } from '@/navigation'

const Lottie = dynamic(() => import('lottie-react'), { ssr: false })

export const OrganismHeroSection = () => {
   const lottieRef = useRef<any>(null)
   const t = useTranslations('landing')

   useEffect(() => {
      if (lottieRef.current) {
         lottieRef.current.setSpeed(0.5)
      }
   }, [])

   const scrollToHowItWorks = () => {
      const element = document.getElementById('how-it-works')
      if (element) {
         element.scrollIntoView({ behavior: 'smooth' })
      }
   }

   return (
      <section className="bg-primary relative py-8 pb-24 sm:min-h-[90vh] lg:min-h-[85vh]">
         <div className="container relative mx-auto sm:px-6 sm:py-20 md:py-24 lg:px-8 lg:py-28">
            <div className="mx-auto max-w-7xl">
               <div className="flex flex-col items-center gap-8 lg:grid lg:grid-cols-2 lg:gap-16">
                  {/* Badge - Mobile/Tablet */}
                  <div className="flex w-full justify-center lg:hidden">
                     <AtomBadge color="secondary" size="lg">
                        {t('hero.badge')}
                     </AtomBadge>
                  </div>

                  {/* Title - Mobile/Tablet */}
                  <div className="w-full text-center lg:hidden">
                     <h1 className="mb-0 text-4xl font-bold leading-tight text-white drop-shadow-lg sm:text-5xl">
                        {t('hero.title')}{' '}
                        <Image
                           alt="languages icon"
                           className="inline-block align-middle drop-shadow-lg"
                           height={48}
                           priority
                           src="/images/languages.svg"
                           width={48}
                        />
                     </h1>
                  </div>

                  {/* Subtitle - Mobile/Tablet */}
                  <div className="w-full text-center lg:hidden">
                     <AtomText
                        className="mx-auto max-w-2xl !text-lg !text-white/90 drop-shadow-md sm:!text-xl"
                        fontSize="large"
                        type="paragraph"
                     >
                        {t('hero.subtitle')}
                     </AtomText>
                  </div>

                  {/* Benefits - Mobile/Tablet */}
                  <div className="flex w-full flex-col items-center gap-2 lg:hidden">
                     <div className="flex items-center gap-2 text-white/90">
                        <span className="text-lg text-green-300">✓</span>
                        <span className="text-sm sm:text-base">{t('benefits.translation')}</span>
                     </div>
                     <div className="flex items-center gap-2 text-white/90">
                        <span className="text-lg text-green-300">✓</span>
                        <span className="text-sm sm:text-base">{t('benefits.spaced')}</span>
                     </div>
                     <div className="flex items-center gap-2 text-white/90">
                        <span className="text-lg text-green-300">✓</span>
                        <span className="text-sm sm:text-base">{t('benefits.grammar')}</span>
                     </div>
                  </div>

                  {/* Lottie - Mobile/Tablet (order 3) / Desktop (order 2) */}
                  <div className="relative flex w-full items-center justify-center lg:order-2 lg:justify-end">
                     <div
                        aria-label={t('hero.animationLabel')}
                        className="relative h-[240px] w-[240px] sm:h-[350px] sm:w-[350px] md:h-[400px] md:w-[400px] lg:h-[450px] lg:w-[450px]"
                        role="img"
                     >
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
                           {t('hero.badge')}
                        </AtomBadge>
                     </div>

                     <div className="mb-6 flex justify-start">
                        <h1 className="mb-0 text-5xl font-bold leading-tight text-white drop-shadow-lg xl:text-6xl">
                           {t('hero.title')}{' '}
                           <Image
                              alt="languages icon"
                              className="inline-block align-middle drop-shadow-lg"
                              height={48}
                              priority
                              src="/images/languages.svg"
                              width={48}
                           />
                        </h1>
                     </div>

                     <AtomText
                        className="!mb-6 max-w-2xl !text-xl !text-white/90 drop-shadow-md xl:!text-2xl"
                        fontSize="large"
                        type="paragraph"
                     >
                        {t('hero.subtitle')}
                     </AtomText>

                     {/* Benefits - Desktop */}
                     <div className="mb-8 flex flex-col gap-2">
                        <div className="flex items-center gap-2 text-white/90">
                           <span className="text-xl text-green-300">✓</span>
                           <span className="text-lg">{t('benefits.translation')}</span>
                        </div>
                        <div className="flex items-center gap-2 text-white/90">
                           <span className="text-xl text-green-300">✓</span>
                           <span className="text-lg">{t('benefits.spaced')}</span>
                        </div>
                        <div className="flex items-center gap-2 text-white/90">
                           <span className="text-xl text-green-300">✓</span>
                           <span className="text-lg">{t('benefits.grammar')}</span>
                        </div>
                     </div>

                     {/* CTAs - Desktop */}
                     <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                        <Link href="/app/home">
                           <AtomButton
                              extraClassName="transform-gpu transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                              size="lg"
                              variant="ACCENT"
                           >
                              {t('hero.ctaPrimary')}
                           </AtomButton>
                        </Link>
                        <button
                           className="rounded-lg px-6 py-3 text-lg font-medium text-white/90 transition-all duration-300 hover:bg-white/10 hover:text-white"
                           onClick={scrollToHowItWorks}
                           type="button"
                        >
                           {t('hero.ctaSecondary')} ↓
                        </button>
                     </div>

                     {/* Trust line - Desktop */}
                     <p className="mt-4 text-sm text-white/70">{t('hero.noCreditCard')}</p>
                  </div>

                  {/* CTAs - Mobile/Tablet */}
                  <div className="flex w-full flex-col items-center gap-3 lg:hidden">
                     <Link href="/app/home">
                        <AtomButton
                           extraClassName="transform-gpu transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                           size="lg"
                           variant="ACCENT"
                        >
                           {t('hero.ctaPrimary')}
                        </AtomButton>
                     </Link>
                     <button
                        className="rounded-lg px-6 py-3 text-base font-medium text-white/90 transition-all duration-300 hover:bg-white/10 hover:text-white"
                        onClick={scrollToHowItWorks}
                        type="button"
                     >
                        {t('hero.ctaSecondary')} ↓
                     </button>
                     <p className="text-center text-sm text-white/70">{t('hero.noCreditCard')}</p>
                  </div>
               </div>
            </div>
         </div>

         {/* Wave divider - decorative */}
         <div aria-hidden="true" className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
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
