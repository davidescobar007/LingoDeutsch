'use client'
import { AtomBadge, AtomButton, AtomText, AtomTitle } from '@/components/atoms'
import { useParallax } from '@/customHooks/useParallax'

export const OrganismMotivationSection = () => {
   const parallax = useParallax(0.15)

   return (
      <section className="relative overflow-hidden bg-gradient-to-b from-purple-50 to-white py-20">
         <div
            className="absolute left-0 top-20 h-72 w-72 rounded-full bg-purple-200 opacity-20 blur-3xl"
            style={{ transform: `translateY(${parallax}px)` }}
         />

         <div className="container relative z-10 mx-auto px-4">
            <div className="mb-12 text-center">
               <AtomBadge color="warning" size="md">
                  🏆 Tu progreso, tu ritmo
               </AtomBadge>
               <AtomTitle extraClassName="mb-4 mt-4 text-4xl text-gray-900 md:text-5xl" type="h2">
                  Motivación que te impulsa
               </AtomTitle>
               <AtomText className="mx-auto max-w-2xl text-gray-600" fontSize="large">
                  Compite si quieres, o progresa a tu ritmo. Tú decides.
               </AtomText>
            </div>

            <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
               {/* Leaderboard card */}
               <div className="rounded-2xl bg-white p-6 shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                  <div className="mb-6 flex items-center justify-between">
                     <AtomTitle extraClassName="text-gray-800" type="h3">
                        Tabla de Posiciones
                     </AtomTitle>
                     <AtomText className="text-2xl">🏆</AtomText>
                  </div>

                  <div className="space-y-3">
                     {[
                        { rank: 1, name: 'María G.', exp: 2450, medal: '🥇', highlight: false },
                        { rank: 2, name: 'Carlos M.', exp: 2380, medal: '🥈', highlight: false },
                        { rank: 3, name: 'Tú', exp: 2250, medal: '🥉', highlight: true },
                        { rank: 4, name: 'Ana L.', exp: 2100, medal: '4', highlight: false },
                        { rank: 5, name: 'Pedro R.', exp: 1980, medal: '5', highlight: false }
                     ].map((user) => (
                        <div
                           className={`flex items-center gap-3 rounded-lg p-3 transition-all ${
                              user.highlight
                                 ? 'bg-gradient-to-r from-purple-100 to-blue-100 shadow-md'
                                 : 'bg-gray-50'
                           }`}
                           key={user.rank}
                        >
                           <AtomText className="w-8 text-xl" isBold>
                              {user.medal}
                           </AtomText>
                           <div className="flex-1">
                              <AtomText className={user.highlight ? 'text-primary' : 'text-gray-800'} isBold>
                                 {user.name}
                              </AtomText>
                              <AtomText className="text-gray-500" fontSize="small">
                                 {user.exp.toLocaleString()} EXP
                              </AtomText>
                           </div>
                           {user.highlight && (
                              <AtomBadge color="primary" size="sm">
                                 ¡Tú!
                              </AtomBadge>
                           )}
                        </div>
                     ))}
                  </div>

                  <div className="mt-6 text-center">
                     <AtomText className="mb-2 text-gray-600" fontSize="small">
                        Próximo nivel en
                     </AtomText>
                     <div className="mb-1 h-3 w-full rounded-full bg-gray-200">
                        <div
                           className="from-primary h-3 rounded-full bg-gradient-to-r to-purple-600"
                           style={{ width: '75%' }}
                        />
                     </div>
                     <AtomText className="text-primary" fontSize="small" isBold>
                        750 / 1,000 EXP
                     </AtomText>
                  </div>
               </div>

               {/* Achievements card */}
               <div className="rounded-2xl bg-white p-6 shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                  <div className="mb-6 flex items-center justify-between">
                     <AtomTitle extraClassName="text-gray-800" type="h3">
                        Logros Recientes
                     </AtomTitle>
                     <AtomText className="text-2xl">⭐</AtomText>
                  </div>

                  <div className="space-y-4">
                     <div className="rounded-xl border-2 border-yellow-200 bg-gradient-to-r from-yellow-50 to-orange-50 p-4">
                        <div className="mb-2 flex items-center gap-3">
                           <AtomText className="text-3xl">🔥</AtomText>
                           <div>
                              <AtomText className="text-gray-800" isBold>
                                 Racha de 7 días
                              </AtomText>
                              <AtomText className="text-gray-600" fontSize="small">
                                 Desbloqueado hace 2 días
                              </AtomText>
                           </div>
                        </div>
                     </div>

                     <div className="rounded-xl border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50 p-4">
                        <div className="mb-2 flex items-center gap-3">
                           <AtomText className="text-3xl">📚</AtomText>
                           <div>
                              <AtomText className="text-gray-800" isBold>
                                 Lector ávido
                              </AtomText>
                              <AtomText className="text-gray-600" fontSize="small">
                                 10 artículos completados
                              </AtomText>
                           </div>
                        </div>
                     </div>

                     <div className="rounded-xl border-2 border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 p-4">
                        <div className="mb-2 flex items-center gap-3">
                           <AtomText className="text-3xl">🎯</AtomText>
                           <div>
                              <AtomText className="text-gray-800" isBold>
                                 Maestro de vocabulario
                              </AtomText>
                              <AtomText className="text-gray-600" fontSize="small">
                                 100 palabras aprendidas
                              </AtomText>
                           </div>
                        </div>
                     </div>
                  </div>

                  <div className="mt-6 border-t border-gray-200 pt-4">
                     <AtomText className="text-center text-gray-500" fontSize="small">
                        3 de 15 logros desbloqueados
                     </AtomText>
                  </div>
               </div>

               {/* Progress card */}
               <div className="rounded-2xl bg-white p-6 shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                  <div className="mb-6 flex items-center justify-between">
                     <AtomTitle extraClassName="text-gray-800" type="h3">
                        Tu Progreso
                     </AtomTitle>
                     <AtomText className="text-2xl">📊</AtomText>
                  </div>

                  <div className="space-y-4">
                     <div className="mb-6 text-center">
                        <div className="relative inline-block">
                           <svg className="h-32 w-32 -rotate-90 transform">
                              <circle cx="64" cy="64" fill="none" r="56" stroke="#e5e7eb" strokeWidth="8" />
                              <circle
                                 cx="64"
                                 cy="64"
                                 fill="none"
                                 r="56"
                                 stroke="url(#gradient)"
                                 strokeDasharray="351.86"
                                 strokeDashoffset="87.96"
                                 strokeLinecap="round"
                                 strokeWidth="8"
                              />
                              <defs>
                                 <linearGradient id="gradient" x1="0%" x2="100%" y1="0%" y2="0%">
                                    <stop offset="0%" stopColor="#805AF2" />
                                    <stop offset="100%" stopColor="#9333ea" />
                                 </linearGradient>
                              </defs>
                           </svg>
                           <div className="absolute inset-0 flex items-center justify-center">
                              <div className="text-center">
                                 <AtomText className="text-primary" fontSize="huge" isBold>
                                    75%
                                 </AtomText>
                                 <AtomText className="text-gray-500" fontSize="small">
                                    Nivel A1
                                 </AtomText>
                              </div>
                           </div>
                        </div>
                     </div>

                     <div className="space-y-3">
                        <div className="flex items-center justify-between">
                           <AtomText className="text-gray-600" fontSize="small">
                              ✓ Gramática
                           </AtomText>
                           <AtomText className="text-green-600" fontSize="small" isBold>
                              12/16 lecciones
                           </AtomText>
                        </div>
                        <div className="flex items-center justify-between">
                           <AtomText className="text-gray-600" fontSize="small">
                              ✓ Lectura
                           </AtomText>
                           <AtomText className="text-blue-600" fontSize="small" isBold>
                              18 artículos
                           </AtomText>
                        </div>
                        <div className="flex items-center justify-between">
                           <AtomText className="text-gray-600" fontSize="small">
                              ✓ Vocabulario
                           </AtomText>
                           <AtomText className="text-purple-600" fontSize="small" isBold>
                              156 palabras
                           </AtomText>
                        </div>
                     </div>
                  </div>

                  <AtomButton extraClassName="btn-block mt-6 rounded-lg" size="md">
                     Ver estadísticas detalladas
                  </AtomButton>
               </div>
            </div>

            {/* Bottom message */}
            <div className="mt-12 text-center">
               <div className="inline-block max-w-2xl rounded-2xl bg-white p-6 shadow-lg">
                  <AtomText className="text-gray-700" fontSize="large">
                     <AtomText className="text-primary" isBold type="span">
                        La competencia es opcional.
                     </AtomText>{' '}
                     Usa las estadísticas para medir tu propio crecimiento, o compara tu progreso con otros si te
                     motiva. Tú decides cómo aprender.
                  </AtomText>
               </div>
            </div>
         </div>
      </section>
   )
}
