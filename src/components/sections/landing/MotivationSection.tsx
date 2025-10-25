'use client'
import { useParallax } from '@/customHooks/useParallax'

export const MotivationSection = () => {
   const parallax = useParallax(0.15)

   return (
      <section className="relative overflow-hidden bg-gradient-to-b from-purple-50 to-white py-20">
         <div
            className="absolute left-0 top-20 h-72 w-72 rounded-full bg-purple-200 opacity-20 blur-3xl"
            style={{ transform: `translateY(${parallax}px)` }}
         />

         <div className="container relative z-10 mx-auto px-4">
            <div className="mb-12 text-center">
               <span className="mb-4 inline-block rounded-full bg-yellow-100 px-4 py-2 text-sm font-medium text-yellow-700">
                  🏆 Tu progreso, tu ritmo
               </span>
               <h2 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">Motivación que te impulsa</h2>
               <p className="mx-auto max-w-2xl text-xl text-gray-600">
                  Compite si quieres, o progresa a tu ritmo. Tú decides.
               </p>
            </div>

            <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
               {/* Leaderboard card */}
               <div className="rounded-2xl bg-white p-6 shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                  <div className="mb-6 flex items-center justify-between">
                     <h3 className="text-lg font-bold text-gray-800">Tabla de Posiciones</h3>
                     <span className="text-2xl">🏆</span>
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
                           <span className="w-8 text-xl font-bold">{user.medal}</span>
                           <div className="flex-1">
                              <div className={`font-bold ${user.highlight ? 'text-primary' : 'text-gray-800'}`}>
                                 {user.name}
                              </div>
                              <div className="text-sm text-gray-500">{user.exp.toLocaleString()} EXP</div>
                           </div>
                           {user.highlight && (
                              <span className="bg-primary rounded px-2 py-1 text-xs text-white">¡Tú!</span>
                           )}
                        </div>
                     ))}
                  </div>

                  <div className="mt-6 text-center">
                     <p className="mb-2 text-sm text-gray-600">Próximo nivel en</p>
                     <div className="mb-1 h-3 w-full rounded-full bg-gray-200">
                        <div
                           className="from-primary h-3 rounded-full bg-gradient-to-r to-purple-600"
                           style={{ width: '75%' }}
                        />
                     </div>
                     <p className="text-primary text-xs font-bold">750 / 1,000 EXP</p>
                  </div>
               </div>

               {/* Achievements card */}
               <div className="rounded-2xl bg-white p-6 shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                  <div className="mb-6 flex items-center justify-between">
                     <h3 className="text-lg font-bold text-gray-800">Logros Recientes</h3>
                     <span className="text-2xl">⭐</span>
                  </div>

                  <div className="space-y-4">
                     <div className="rounded-xl border-2 border-yellow-200 bg-gradient-to-r from-yellow-50 to-orange-50 p-4">
                        <div className="mb-2 flex items-center gap-3">
                           <span className="text-3xl">🔥</span>
                           <div>
                              <div className="font-bold text-gray-800">Racha de 7 días</div>
                              <div className="text-xs text-gray-600">Desbloqueado hace 2 días</div>
                           </div>
                        </div>
                     </div>

                     <div className="rounded-xl border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50 p-4">
                        <div className="mb-2 flex items-center gap-3">
                           <span className="text-3xl">📚</span>
                           <div>
                              <div className="font-bold text-gray-800">Lector ávido</div>
                              <div className="text-xs text-gray-600">10 artículos completados</div>
                           </div>
                        </div>
                     </div>

                     <div className="rounded-xl border-2 border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 p-4">
                        <div className="mb-2 flex items-center gap-3">
                           <span className="text-3xl">🎯</span>
                           <div>
                              <div className="font-bold text-gray-800">Maestro de vocabulario</div>
                              <div className="text-xs text-gray-600">100 palabras aprendidas</div>
                           </div>
                        </div>
                     </div>
                  </div>

                  <div className="mt-6 border-t border-gray-200 pt-4">
                     <p className="text-center text-xs text-gray-500">3 de 15 logros desbloqueados</p>
                  </div>
               </div>

               {/* Progress card */}
               <div className="rounded-2xl bg-white p-6 shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                  <div className="mb-6 flex items-center justify-between">
                     <h3 className="text-lg font-bold text-gray-800">Tu Progreso</h3>
                     <span className="text-2xl">📊</span>
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
                                 <div className="text-primary text-3xl font-bold">75%</div>
                                 <div className="text-xs text-gray-500">Nivel A1</div>
                              </div>
                           </div>
                        </div>
                     </div>

                     <div className="space-y-3">
                        <div className="flex items-center justify-between">
                           <span className="text-sm text-gray-600">✓ Gramática</span>
                           <span className="text-sm font-bold text-green-600">12/16 lecciones</span>
                        </div>
                        <div className="flex items-center justify-between">
                           <span className="text-sm text-gray-600">✓ Lectura</span>
                           <span className="text-sm font-bold text-blue-600">18 artículos</span>
                        </div>
                        <div className="flex items-center justify-between">
                           <span className="text-sm text-gray-600">✓ Vocabulario</span>
                           <span className="text-sm font-bold text-purple-600">156 palabras</span>
                        </div>
                     </div>
                  </div>

                  <button className="btn btn-primary btn-block mt-6 rounded-lg">
                     Ver estadísticas detalladas
                  </button>
               </div>
            </div>

            {/* Bottom message */}
            <div className="mt-12 text-center">
               <div className="inline-block max-w-2xl rounded-2xl bg-white p-6 shadow-lg">
                  <p className="text-lg text-gray-700">
                     <span className="text-primary font-bold">La competencia es opcional.</span> Usa las
                     estadísticas para medir tu propio crecimiento, o compara tu progreso con otros si te motiva.
                     Tú decides cómo aprender.
                  </p>
               </div>
            </div>
         </div>
      </section>
   )
}
