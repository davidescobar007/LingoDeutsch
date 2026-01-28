'use client'
import { useTranslations } from 'next-intl'

import { AtomText, AtomTitle } from '@/components/atoms'
import { MoleculeLockedOverlay } from '@/components/molecules'

type OrganismStreakCardProps = {
   activityDays?: boolean[] // 7-day array [mon, tue, wed, ...]
   currentStreak: number
   isGuest?: boolean
   activitiesByType?: {
      grammar: number
      articles: number
      vocabulary: number
   }
}

const DAYS = ['L', 'M', 'X', 'J', 'V', 'S', 'D']

const DEFAULT_ACTIVITY_DAYS = [false, false, false, false, false, false, false]
const SAMPLE_ACTIVITY_DAYS = [true, true, true, false, false, false, false]

export const OrganismStreakCard = ({
   activityDays = DEFAULT_ACTIVITY_DAYS,
   currentStreak,
   isGuest = false,
   activitiesByType
}: OrganismStreakCardProps) => {
   const t = useTranslations('locked.streakCard')

   // Show sample data for guests (3-day streak)
   const displayStreak = isGuest ? 3 : currentStreak
   const days = isGuest ? SAMPLE_ACTIVITY_DAYS : activityDays

   // Get current day index (0 = Monday, 6 = Sunday)
   const today = new Date()
   const currentDayIndex = (today.getDay() + 6) % 7 // Convert Sunday=0 to Monday=0

   // Check if user practiced today
   const practicedToday = days[currentDayIndex]

   // Show activity breakdown if available
   const showBreakdown = activitiesByType && !isGuest
   const hasActivities =
      activitiesByType &&
      (activitiesByType.grammar > 0 || activitiesByType.articles > 0 || activitiesByType.vocabulary > 0)

   const cardContent = (
      <div className="container-card p-6">
         <div className="mb-2 flex items-center justify-between">
            <AtomTitle type="h3">🔥 Racha de Aprendizaje</AtomTitle>
            <AtomText className="text-orange-500" fontSize="medium" isBold>
               {displayStreak} días
            </AtomText>
         </div>

         <AtomText className="mb-4 block" fontSize="medium" isThin>
            días consecutivos
         </AtomText>

         {/* 7-day calendar grid */}
         <div className="grid grid-cols-7 gap-2">
            {DAYS.map((day, index) => {
               const isToday = index === currentDayIndex
               return (
                  <div
                     className={`flex flex-col items-center justify-center rounded-lg p-3 transition-all duration-300 ${
                        days[index]
                           ? isToday
                              ? 'bg-success/30 border-success ring-success border-2 ring-2'
                              : 'bg-success/20 border-success border'
                           : isToday
                           ? 'bg-warning/10 border-warning border-2'
                           : 'bg-base-200 border-base-300 border'
                     }`}
                     key={day}
                  >
                     <span className="text-base-content text-xs font-semibold">{day}</span>
                     {days[index] && <span className="mt-1 text-lg">✓</span>}
                     {isToday && !days[index] && <span className="mt-1 text-xs">hoy</span>}
                  </div>
               )
            })}
         </div>

         {/* Activity breakdown */}
         {showBreakdown && hasActivities && (
            <div className="mt-4 flex flex-wrap justify-center gap-2">
               {activitiesByType.grammar > 0 && (
                  <span className="bg-primary/10 text-primary rounded-full px-2 py-1 text-xs">
                     📘 {activitiesByType.grammar} gramatica
                  </span>
               )}
               {activitiesByType.articles > 0 && (
                  <span className="bg-info/10 text-info rounded-full px-2 py-1 text-xs">
                     📖 {activitiesByType.articles} lectura
                  </span>
               )}
               {activitiesByType.vocabulary > 0 && (
                  <span className="bg-success/10 text-success rounded-full px-2 py-1 text-xs">
                     🎯 {activitiesByType.vocabulary} vocabulario
                  </span>
               )}
            </div>
         )}

         <AtomText className="mt-4 block" fontSize="small" isThin>
            {practicedToday ? '¡Excelente! Ya practicaste hoy 🎉' : '¡Sigue así! 💪'}
         </AtomText>
      </div>
   )

   return (
      <MoleculeLockedOverlay
         ctaHref="/login"
         description={t('description')}
         showOverlay={isGuest}
         title={t('title')}
      >
         {cardContent}
      </MoleculeLockedOverlay>
   )
}
