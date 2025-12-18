'use client'
import { useTranslations } from 'next-intl'

import { AtomBadge, AtomText, AtomTitle } from '@/components/atoms'

type Testimonial = {
   nameKey: string
   roleKey: string
   quoteKey: string
   stats: {
      words: number
      streak: number
   }
   avatar: string
   color: 'purple' | 'blue' | 'green'
}

const testimonials: Testimonial[] = [
   {
      nameKey: 'name1',
      roleKey: 'role1',
      quoteKey: 'quote1',
      stats: { words: 284, streak: 45 },
      avatar: 'M',
      color: 'purple'
   },
   {
      nameKey: 'name2',
      roleKey: 'role2',
      quoteKey: 'quote2',
      stats: { words: 156, streak: 21 },
      avatar: 'C',
      color: 'blue'
   },
   {
      nameKey: 'name3',
      roleKey: 'role3',
      quoteKey: 'quote3',
      stats: { words: 423, streak: 67 },
      avatar: 'S',
      color: 'green'
   }
]

const colorClasses = {
   purple: {
      bg: 'from-purple-50 to-purple-100/50',
      border: 'border-purple-200',
      avatar: 'from-purple-500 to-purple-700',
      ring: 'ring-purple-200',
      stat: 'text-purple-600'
   },
   blue: {
      bg: 'from-blue-50 to-blue-100/50',
      border: 'border-blue-200',
      avatar: 'from-blue-500 to-blue-700',
      ring: 'ring-blue-200',
      stat: 'text-blue-600'
   },
   green: {
      bg: 'from-green-50 to-green-100/50',
      border: 'border-green-200',
      avatar: 'from-green-500 to-emerald-700',
      ring: 'ring-green-200',
      stat: 'text-green-600'
   }
}

export const OrganismTestimonialsSection = () => {
   const t = useTranslations('landing')

   return (
      <section className="relative overflow-hidden py-20">
         {/* Background decorations */}
         <div className="pointer-events-none absolute left-0 top-1/4 h-96 w-96 rounded-full bg-purple-100/50 blur-3xl" />
         <div className="pointer-events-none absolute bottom-1/4 right-0 h-96 w-96 rounded-full bg-blue-100/50 blur-3xl" />

         <div className="container relative z-10 mx-auto px-4">
            <div className="mb-16 text-center">
               <div className="mb-4 flex justify-center">
                  <AtomBadge color="success" size="lg">
                     {t('testimonials.badge')}
                  </AtomBadge>
               </div>
               <AtomTitle extraClassName="!text-3xl sm:!text-4xl lg:!text-5xl !font-bold !mb-4" type="h2">
                  {t('testimonials.title')}
               </AtomTitle>
               <AtomText className="mx-auto max-w-2xl !text-lg text-gray-600" fontSize="large">
                  {t('testimonials.subtitle')}
               </AtomText>
            </div>

            <div className="mx-auto grid max-w-6xl gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
               {testimonials.map((testimonial, index) => {
                  const colors = colorClasses[testimonial.color]
                  return (
                     <div
                        className={`transform-gpu rounded-3xl border bg-gradient-to-br p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${colors.bg} ${colors.border}`}
                        key={index}
                     >
                        {/* Quote icon */}
                        <div className="mb-6 text-4xl text-gray-300">&ldquo;</div>

                        {/* Quote */}
                        <AtomText className="mb-6 !text-lg italic text-gray-700" fontSize="large">
                           {t(`testimonials.${testimonial.quoteKey}`)}
                        </AtomText>

                        {/* Stats */}
                        <div className="mb-6 flex gap-4">
                           <div className="rounded-xl bg-white/80 px-4 py-2 shadow-sm">
                              <AtomText className={`font-bold ${colors.stat}`} fontSize="large">
                                 {testimonial.stats.words}
                              </AtomText>
                              <AtomText className="text-gray-500" fontSize="small">
                                 {t('testimonials.words')}
                              </AtomText>
                           </div>
                           <div className="rounded-xl bg-white/80 px-4 py-2 shadow-sm">
                              <AtomText className={`font-bold ${colors.stat}`} fontSize="large">
                                 {testimonial.stats.streak}d
                              </AtomText>
                              <AtomText className="text-gray-500" fontSize="small">
                                 {t('testimonials.streak')}
                              </AtomText>
                           </div>
                        </div>

                        {/* Author */}
                        <div className="flex items-center gap-4 border-t border-gray-200/50 pt-6">
                           <div
                              className={`flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br text-lg font-bold text-white shadow-lg ring-4 ${colors.avatar} ${colors.ring}`}
                           >
                              {testimonial.avatar}
                           </div>
                           <div>
                              <AtomText className="font-semibold text-gray-800" fontSize="medium">
                                 {t(`testimonials.${testimonial.nameKey}`)}
                              </AtomText>
                              <AtomText className="text-gray-500" fontSize="small">
                                 {t(`testimonials.${testimonial.roleKey}`)}
                              </AtomText>
                           </div>
                        </div>

                        {/* Star rating */}
                        <div className="mt-4 flex gap-1">
                           {[1, 2, 3, 4, 5].map((star) => (
                              <span className="text-yellow-400" key={star}>
                                 ★
                              </span>
                           ))}
                        </div>
                     </div>
                  )
               })}
            </div>

            {/* Trust line */}
            <div className="mt-16 text-center">
               <AtomText className="text-gray-500" fontSize="large">
                  {t('testimonials.trustLine')}
               </AtomText>
            </div>
         </div>
      </section>
   )
}
