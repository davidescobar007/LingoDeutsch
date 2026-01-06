'use client'

import { AtomButton } from '@/components/atoms'

export const OrganismHeroSection = () => {
   return (
      <div className="lg:sticky lg:top-14 lg:h-[calc(100vh-3.5rem)] lg:w-1/2">
         <div className="flex h-full flex-col justify-center">
            <div className="bg-primary/10 mb-6 inline-block w-fit rounded-full px-5 py-2">
               <span className="from-primary bg-gradient-to-r to-blue-700 bg-clip-text text-sm font-bold text-transparent">
                  🎯 100% Gratis · Sin Anuncios
               </span>
            </div>

            <h1 className="from-primary mb-6 bg-gradient-to-r via-blue-700 to-purple-600 bg-clip-text text-5xl font-black leading-tight text-transparent md:text-6xl lg:text-7xl">
               Alemán de Forma Fácil y Rápida
            </h1>

            <p className="mb-8 max-w-xl text-lg leading-relaxed text-gray-600 lg:text-xl">
               La plataforma más completa para dominar el alemán. Gramática, vocabulario y lectura inmersiva en un
               solo lugar.
            </p>

            <div className="mb-8 flex flex-wrap gap-4">
               <AtomButton href="/app/home" size="lg" type="link" variant="PRIMARY">
                  <span className="flex items-center gap-2">
                     Empezar Gratis
                     <span>→</span>
                  </span>
               </AtomButton>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500">
               <div className="flex items-center gap-2">
                  <svg className="text-success h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                     <path
                        clipRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        fillRule="evenodd"
                     />
                  </svg>
                  <span>Sin tarjeta de crédito</span>
               </div>
            </div>
         </div>
      </div>
   )
}
