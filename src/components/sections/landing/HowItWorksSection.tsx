'use client'
import { useEffect, useState } from 'react'

import { useInView } from '@/customHooks/useParallax'

export const HowItWorksSection = () => {
   const { ref: ref1, isInView: isInView1 } = useInView(0.3)
   const { ref: ref2, isInView: isInView2 } = useInView(0.3)
   const { ref: ref3, isInView: isInView3 } = useInView(0.3)

   const [mounted, setMounted] = useState(false)

   useEffect(() => {
      setMounted(true)
   }, [])

   if (!mounted) return null

   const steps = [
      {
         number: '01',
         emoji: '📚',
         title: 'Elige tu nivel',
         description:
            'Comienza con A1 para principiantes o A2 si ya tienes conocimientos básicos. Accede a lecciones de gramática estructuradas por tema.',
         features: ['Lecciones organizadas', 'Explicaciones claras', 'Ejemplos prácticos'],
         color: 'purple',
         ref: ref1,
         isInView: isInView1
      },
      {
         number: '02',
         emoji: '📖',
         title: 'Lee y aprende',
         description:
            'Descubre artículos interactivos de 2-5 minutos sobre cultura, vida cotidiana y más. Cada palabra desconocida está a un clic de distancia.',
         features: ['Lecturas adaptadas', 'Traducciones instantáneas', 'Contexto real'],
         color: 'blue',
         ref: ref2,
         isInView: isInView2
      },
      {
         number: '03',
         emoji: '🧠',
         title: 'Memoriza con repaso inteligente',
         description:
            'Nuestro sistema de repetición espaciada te presenta las palabras justo cuando estás a punto de olvidarlas. 3-5 minutos al día es todo lo que necesitas.',
         features: ['Algoritmo neuroadaptivo', 'Sesiones cortas', 'Progreso medible'],
         color: 'green',
         ref: ref3,
         isInView: isInView3
      }
   ]

   return (
      <section className="bg-white py-20 lg:py-28" id="como-funciona">
         <div className="container mx-auto px-4">
            <div className="mb-16 text-center">
               <span className="bg-primary mb-4 inline-block rounded-full px-4 py-2 text-sm font-medium text-white">
                  💡 Metodología probada
               </span>
               <h2 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">¿Cómo funciona?</h2>
               <p className="mx-auto max-w-2xl text-xl text-gray-600">
                  Tres pasos simples para dominar el alemán a tu propio ritmo
               </p>
            </div>

            <div className="mx-auto max-w-6xl space-y-16">
               {steps.map((step, index) => (
                  <div
                     className={`grid items-center gap-8 transition-all duration-1000 md:grid-cols-2 ${
                        step.isInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                     }`}
                     key={step.number}
                     ref={step.ref}
                  >
                     {/* Content - alternates left/right */}
                     <div className={`${index % 2 === 1 ? 'md:order-2' : ''} space-y-6`}>
                        <div className="inline-flex items-center gap-4">
                           <span className="text-6xl font-bold text-purple-200">{step.number}</span>
                           <span className="text-5xl">{step.emoji}</span>
                        </div>

                        <h3 className="text-3xl font-bold text-gray-900">{step.title}</h3>

                        <p className="text-lg leading-relaxed text-gray-600">{step.description}</p>

                        <ul className="space-y-3">
                           {step.features.map((feature, idx) => (
                              <li className="flex items-center gap-3" key={idx}>
                                 <span className="bg-primary flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full">
                                    <svg
                                       className="h-4 w-4 text-white"
                                       fill="none"
                                       stroke="currentColor"
                                       viewBox="0 0 24 24"
                                    >
                                       <path
                                          d="M5 13l4 4L19 7"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={2}
                                       />
                                    </svg>
                                 </span>
                                 <span className="font-medium text-gray-700">{feature}</span>
                              </li>
                           ))}
                        </ul>
                     </div>

                     {/* Mockup card */}
                     <div className={`${index % 2 === 1 ? 'md:order-1' : ''}`}>
                        <div className="rounded-2xl bg-white p-6 shadow-2xl">
                           {/* Step 1 - Grammar levels */}
                           {index === 0 && (
                              <div className="space-y-4">
                                 <div className="mb-4 flex items-center justify-between">
                                    <h4 className="font-bold text-gray-800">Temas de Gramática</h4>
                                    <div className="badge badge-primary">A1</div>
                                 </div>
                                 {[
                                    { title: 'Alfabeto y Pronunciación', progress: 100 },
                                    { title: 'Saludos y Presentaciones', progress: 80 },
                                    { title: 'Sustantivos y Género', progress: 60 },
                                    { title: 'Artículos Definidos', progress: 30 }
                                 ].map((topic, idx) => (
                                    <div className="rounded-lg bg-purple-50 p-4" key={idx}>
                                       <div className="mb-2 flex items-center justify-between">
                                          <span className="text-sm font-medium text-gray-800">{topic.title}</span>
                                          <span className="text-primary text-xs font-bold">{topic.progress}%</span>
                                       </div>
                                       <div className="h-2 w-full rounded-full bg-purple-200">
                                          <div
                                             className="from-primary h-2 rounded-full bg-gradient-to-r to-purple-600"
                                             style={{ width: `${topic.progress}%` }}
                                          />
                                       </div>
                                    </div>
                                 ))}
                              </div>
                           )}

                           {/* Step 2 - Reading card */}
                           {index === 1 && (
                              <div className="space-y-4">
                                 <div className="mb-4 flex aspect-video items-center justify-center rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 text-4xl text-white">
                                    🏰
                                 </div>
                                 <div className="mb-2 flex items-center gap-2">
                                    <span className="badge badge-info badge-sm">A2</span>
                                    <span className="text-xs text-gray-500">• 4 min lectura</span>
                                 </div>
                                 <h5 className="text-lg font-bold text-gray-800">Los Castillos de Baviera</h5>
                                 <p className="text-sm text-gray-600">
                                    Descubre la historia fascinante del castillo de Neuschwanstein y su influencia
                                    en la cultura alemana...
                                 </p>
                                 <div className="flex flex-wrap gap-2">
                                    <span className="badge badge-outline badge-sm">Cultura</span>
                                    <span className="badge badge-outline badge-sm">Historia</span>
                                    <span className="badge badge-outline badge-sm">Turismo</span>
                                 </div>
                                 <div className="btn btn-primary btn-block btn-sm pointer-events-none rounded-lg">
                                    Leer artículo →
                                 </div>
                              </div>
                           )}

                           {/* Step 3 - Vocabulary spaced repetition */}
                           {index === 2 && (
                              <div className="space-y-4">
                                 <div className="mb-4 flex items-center justify-between">
                                    <h4 className="font-bold text-gray-800">Repaso Diario</h4>
                                    <div className="flex gap-1">
                                       {[...Array(7)].map((_, i) => (
                                          <span className="text-sm" key={i}>
                                             {i < 5 ? '❤️' : '🤍'}
                                          </span>
                                       ))}
                                    </div>
                                 </div>

                                 <div className="mb-4 grid grid-cols-3 gap-2">
                                    <div className="rounded-lg bg-green-50 p-3 text-center">
                                       <div className="text-2xl font-bold text-green-700">45</div>
                                       <div className="text-xs text-green-600">Aprendidas</div>
                                    </div>
                                    <div className="rounded-lg bg-yellow-50 p-3 text-center">
                                       <div className="text-2xl font-bold text-yellow-700">12</div>
                                       <div className="text-xs text-yellow-600">Difíciles</div>
                                    </div>
                                    <div className="rounded-lg bg-blue-50 p-3 text-center">
                                       <div className="text-2xl font-bold text-blue-700">8</div>
                                       <div className="text-xs text-blue-600">Disponibles</div>
                                    </div>
                                 </div>

                                 <div className="rounded-lg border-2 border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50 p-4">
                                    <div className="mb-2 text-sm text-gray-600">Próxima palabra</div>
                                    <div className="mb-1 text-2xl font-bold text-gray-800">der Apfel</div>
                                    <div className="mb-3 text-sm text-gray-500">la manzana</div>
                                    <div className="flex gap-2">
                                       <span className="badge badge-warning badge-sm">Difícil</span>
                                       <span className="badge badge-outline badge-sm">Sustantivo</span>
                                    </div>
                                 </div>

                                 <div className="btn btn-success btn-block pointer-events-none rounded-lg">
                                    Practicar ahora →
                                 </div>
                              </div>
                           )}
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>
   )
}
