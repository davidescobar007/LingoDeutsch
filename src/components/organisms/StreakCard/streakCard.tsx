'use client'
import { useTranslations } from 'next-intl'

import { AtomBadge, AtomText, AtomTitle } from '@/components/atoms'
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

   // Get contextual message based on streak state
   const getContextualMessage = () => {
      if (isGuest) return 'Regístrate para guardar tu progreso 📊'

      if (displayStreak === 0) {
         return practicedToday ? '¡Buen comienzo! Sigue practicando 🎉' : '¡Empieza tu racha hoy! 🔥'
      }

      if (practicedToday) {
         if (displayStreak >= 30) return `¡${displayStreak} días! Impresionante 🌟`
         if (displayStreak >= 7) return '¡Racha semanal completa! 🔥🔥'
         return '¡Racha activa! Sigue así 🎉'
      }

      return '¡No rompas tu racha! Practica hoy 💪'
   }

   // Get heatmap cell styles based on state
   const getHeatmapCellClass = (isCompleted: boolean, isToday: boolean) => {
      if (isCompleted && isToday) {
         return 'bg-primary text-primary-content ring-primary/40 ring-2'
      }
      if (isCompleted) {
         return 'bg-primary text-primary-content'
      }
      if (isToday) {
         return 'border-primary/40 bg-primary/5 border-2 border-dashed'
      }
      return 'bg-base-200'
   }

   const cardContent = (
      <div className="container-card flex h-full flex-col p-6">
         {/* Header */}
         <div className="mb-6 flex items-start justify-between">
            <div className="flex items-start gap-3">
               <span className="text-xl">🔥</span>
               <div>
                  <div className="flex items-center gap-3">
                     <AtomTitle type="h3">Racha de Aprendizaje</AtomTitle>
                     {practicedToday && <AtomBadge color="success">Activa hoy</AtomBadge>}
                  </div>
                  <AtomText className="mt-1" fontSize="medium" isThin>
                     {displayStreak} días consecutivos
                  </AtomText>
               </div>
            </div>
            <AtomText className="text-orange-500" fontSize="medium" isBold>
               {displayStreak}
            </AtomText>
         </div>

         {/* Weekly Heatmap */}
         <div className="mb-6">
            <div className="grid grid-cols-7 gap-2">
               {DAYS.map((day, index) => {
                  const isToday = index === currentDayIndex
                  const isCompleted = days[index]

                  return (
                     <div className="flex flex-col items-center gap-1.5" key={day}>
                        <span className="text-base-content/50 text-xs font-medium">{day}</span>
                        <div
                           className={`flex h-10 w-10 items-center justify-center rounded-md transition-all duration-300 ${getHeatmapCellClass(
                              isCompleted,
                              isToday
                           )}`}
                        >
                           {isCompleted && <span className="text-lg">✓</span>}
                           {isToday && !isCompleted && <span className="text-primary/60 text-xs">hoy</span>}
                        </div>
                     </div>
                  )
               })}
            </div>
         </div>

         {/* Activity Breakdown */}
         {showBreakdown && hasActivities && (
            <div className="mb-4 flex flex-wrap gap-3">
               {activitiesByType.grammar > 0 && (
                  <div className="flex items-center gap-1.5">
                     <span className="bg-primary h-2 w-2 rounded-sm" />
                     <span className="text-base-content/70 text-xs">
                        <span className="text-xs">📘</span> Gramática {activitiesByType.grammar}
                     </span>
                  </div>
               )}
               {activitiesByType.articles > 0 && (
                  <div className="flex items-center gap-1.5">
                     <span className="bg-info h-2 w-2 rounded-sm" />
                     <span className="text-base-content/70 text-xs">
                        <span className="text-xs">📖</span> Lectura {activitiesByType.articles}
                     </span>
                  </div>
               )}
               {activitiesByType.vocabulary > 0 && (
                  <div className="flex items-center gap-1.5">
                     <span className="bg-success h-2 w-2 rounded-sm" />
                     <span className="text-base-content/70 text-xs">
                        <span className="text-xs">🎯</span> Vocabulario {activitiesByType.vocabulary}
                     </span>
                  </div>
               )}
            </div>
         )}

         {/* Contextual Message */}
         <div className="mt-auto flex items-center gap-2">
            <span className="text-base">💡</span>
            <AtomText fontSize="small" isThin>
               {getContextualMessage()}
            </AtomText>
         </div>
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
