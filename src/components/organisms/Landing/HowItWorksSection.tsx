'use client'
import { useEffect, useState } from 'react'

import { AtomBadge, AtomText, AtomTitle } from '@/components/atoms'
import { useInView } from '@/customHooks/useParallax'
export const OrganismHowItWorksSection = () => {
   const { ref: ref1, isInView: isInView1 } = useInView(0.2)
   const { ref: ref2, isInView: isInView2 } = useInView(0.2)
   const { ref: ref3, isInView: isInView3 } = useInView(0.2)

   const [mounted, setMounted] = useState(false)

   useEffect(() => {
      setMounted(true)
   }, [])

   if (!mounted) return null

   return (
      <section className="relative overflow-hidden py-20">
         <div className="pointer-events-none absolute left-0 top-0 h-full w-full bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.05),transparent_50%)]" />
         <div className="pointer-events-none absolute right-0 top-1/3 h-96 w-96 rounded-full bg-purple-200/30 blur-3xl" />
         <div className="pointer-events-none absolute bottom-1/3 left-0 h-96 w-96 rounded-full bg-blue-200/30 blur-3xl" />

         <div className="container relative z-10 mx-auto px-4">
            <div className="mb-20 text-center">
               <div className="mb-4 flex justify-center">
                  <AtomBadge color="primary" size="lg">
                     ✨ Método innovador
                  </AtomBadge>
               </div>
               <AtomTitle extraClassName="!text-4xl sm:!text-5xl lg:!text-6xl !font-bold !mb-4" type="h2">
                  ¿Cómo funciona?
               </AtomTitle>
               <AtomText className="mx-auto max-w-3xl !text-lg sm:!text-xl lg:!text-2xl" fontSize="large">
                  <span className="text-gray-600">Tres pilares fundamentales para tu dominio del alemán</span>
               </AtomText>
            </div>

            <div className="mx-auto max-w-7xl space-y-20">
               {/* Step 1 - Left */}
               <div
                  className={`transition-all duration-700 ${
                     isInView1 ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'
                  }`}
                  ref={ref1}
               >
                  <div className="flex flex-col items-center gap-8 lg:flex-row">
                     <div className="flex-1">
                        <div className="rounded-3xl border border-purple-200 bg-gradient-to-br from-purple-50 to-white p-8 shadow-xl transition-all duration-300 hover:shadow-2xl">
                           <div className="mb-6 flex items-center gap-4">
                              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-purple-700 text-2xl font-bold text-white shadow-lg">
                                 01
                              </div>
                              <div>
                                 <AtomBadge color="primary" size="sm">
                                    Fundamentos
                                 </AtomBadge>
                                 <AtomTitle extraClassName="!text-2xl sm:!text-3xl !font-bold !mb-2" type="h3">
                                    Gramática Estructurada
                                 </AtomTitle>
                              </div>
                           </div>
                           <AtomText className="!text-lg sm:!text-xl" fontSize="large">
                              <span className="text-gray-700">
                                 Empieza desde A1 o A2. Cada lección está diseñada para construir sobre la
                                 anterior, con explicaciones claras y ejemplos prácticos.
                              </span>
                           </AtomText>
                           <div className="mt-6 grid grid-cols-2 gap-4">
                              {[
                                 { label: 'Lecciones', value: '16', icon: '📚' },
                                 { label: 'Ejercicios', value: '120+', icon: '✍️' }
                              ].map((stat, idx) => (
                                 <div
                                    className="rounded-xl border border-purple-100 bg-white p-4 shadow-sm transition-all duration-300 hover:border-purple-300 hover:shadow-md"
                                    key={idx}
                                 >
                                    <div className="mb-2 text-2xl">{stat.icon}</div>
                                    <AtomText fontSize="large" isBold>
                                       {stat.value}
                                    </AtomText>
                                    <AtomText fontSize="small">
                                       <span className="text-gray-600">{stat.label}</span>
                                    </AtomText>
                                 </div>
                              ))}
                           </div>
                        </div>
                     </div>
                     <div className="flex-shrink-0">
                        <div className="flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-purple-700 text-6xl shadow-2xl ring-8 ring-purple-100">
                           📚
                        </div>
                     </div>
                  </div>
               </div>

               {/* Step 2 - Right */}
               <div
                  className={`transition-all duration-700 ${
                     isInView2 ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'
                  }`}
                  ref={ref2}
                  style={{ transitionDelay: '150ms' }}
               >
                  <div className="flex flex-col items-center gap-8 lg:flex-row-reverse">
                     <div className="flex-1">
                        <div className="rounded-3xl border border-blue-200 bg-gradient-to-br from-blue-50 to-white p-8 shadow-xl transition-all duration-300 hover:shadow-2xl">
                           <div className="mb-6 flex items-center gap-4">
                              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 text-2xl font-bold text-white shadow-lg">
                                 02
                              </div>
                              <div>
                                 <AtomBadge color="info" size="sm">
                                    Contexto
                                 </AtomBadge>
                                 <AtomTitle extraClassName="!text-2xl sm:!text-3xl !font-bold !mb-2" type="h3">
                                    Lectura Interactiva
                                 </AtomTitle>
                              </div>
                           </div>
                           <AtomText className="!text-lg sm:!text-xl" fontSize="large">
                              <span className="text-gray-700">
                                 Artículos cortos de 2-5 minutos sobre cultura alemana. Haz clic en cualquier
                                 palabra para ver su traducción instantánea.
                              </span>
                           </AtomText>
                           <div className="mt-6 rounded-xl border border-blue-100 bg-white p-5 shadow-sm transition-all duration-300 hover:border-blue-300 hover:shadow-md">
                              <div className="mb-3 flex items-center gap-3">
                                 <div className="text-3xl">🏰</div>
                                 <div className="flex-1">
                                    <AtomText fontSize="medium" isBold>
                                       Castillos de Baviera
                                    </AtomText>
                                    <AtomText fontSize="small">
                                       <span className="text-gray-600">Nivel A2 • 4 min</span>
                                    </AtomText>
                                 </div>
                                 <AtomBadge color="info" size="sm">
                                    Nuevo
                                 </AtomBadge>
                              </div>
                           </div>
                        </div>
                     </div>
                     <div className="flex-shrink-0">
                        <div className="flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-700 text-6xl shadow-2xl ring-8 ring-blue-100">
                           📖
                        </div>
                     </div>
                  </div>
               </div>

               {/* Step 3 - Left */}
               <div
                  className={`transition-all duration-700 ${
                     isInView3 ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'
                  }`}
                  ref={ref3}
                  style={{ transitionDelay: '300ms' }}
               >
                  <div className="flex flex-col items-center gap-8 lg:flex-row">
                     <div className="flex-1">
                        <div className="rounded-3xl border border-green-200 bg-gradient-to-br from-green-50 to-white p-8 shadow-xl transition-all duration-300 hover:shadow-2xl">
                           <div className="mb-6 flex items-center gap-4">
                              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500 to-emerald-700 text-2xl font-bold text-white shadow-lg">
                                 03
                              </div>
                              <div>
                                 <AtomBadge color="success" size="sm">
                                    Retención
                                 </AtomBadge>
                                 <AtomTitle extraClassName="!text-2xl sm:!text-3xl !font-bold !mb-2" type="h3">
                                    Repetición Espaciada
                                 </AtomTitle>
                              </div>
                           </div>
                           <AtomText className="!text-lg sm:!text-xl" fontSize="large">
                              <span className="text-gray-700">
                                 Nuestro algoritmo inteligente sabe exactamente cuándo debes repasar cada palabra
                                 para maximizar tu retención. Solo 3-5 minutos al día.
                              </span>
                           </AtomText>
                           <div className="mt-6 grid grid-cols-3 gap-3">
                              {[
                                 { label: ' Total', value: '156', color: 'from-green-500 to-emerald-600' },
                                 { label: ' Hoy', value: '8', color: 'from-blue-500 to-blue-600' },
                                 { label: ' Racha', value: '5d', color: 'from-orange-500 to-orange-600' }
                              ].map((stat, idx) => (
                                 <div
                                    className={`rounded-xl bg-gradient-to-br p-4 text-center shadow-lg transition-all duration-300 hover:scale-105 ${stat.color}`}
                                    key={idx}
                                 >
                                    <AtomText fontSize="large">
                                       <span className="text-2xl font-bold text-white">{stat.value}</span>
                                    </AtomText>
                                    <AtomText fontSize="small">
                                       <span className="text-white/90">{stat.label}</span>
                                    </AtomText>
                                 </div>
                              ))}
                           </div>
                        </div>
                     </div>
                     <div className="flex-shrink-0">
                        <div className="flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-emerald-700 text-6xl shadow-2xl ring-8 ring-green-100">
                           🧠
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
   )
}
