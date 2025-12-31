'use client'
import { AtomText, AtomTitle } from '@/components/atoms'

type OrganismStreakCardProps = {
   activityDays?: boolean[] // 7-day array [mon, tue, wed, ...]
   currentStreak: number
}

const DAYS = ['L', 'M', 'X', 'J', 'V', 'S', 'D']

const DEFAULT_ACTIVITY_DAYS = [false, false, false, false, false, false, false]

export const OrganismStreakCard = ({
   activityDays = DEFAULT_ACTIVITY_DAYS,
   currentStreak
}: OrganismStreakCardProps) => {
   // Use provided days or default to all false
   const days = activityDays
   return (
      <div className="border-base-300 bg-base-100 rounded-lg border p-6 shadow-md">
         <div className="mb-6 flex items-center justify-between">
            <AtomTitle extraClassName="!text-lg" type="h3">
               🔥 Racha de Aprendizaje
            </AtomTitle>
            <span className="text-3xl font-bold text-orange-500">{currentStreak}</span>
         </div>

         <AtomText className="mb-4 text-sm" fontSize="small">
            días consecutivos
         </AtomText>

         {/* 7-day calendar grid */}
         <div className="grid grid-cols-7 gap-2">
            {DAYS.map((day, index) => (
               <div
                  className={`flex flex-col items-center justify-center rounded-lg p-3 transition-all duration-300 ${
                     days[index] ? 'bg-success/20 border-success border' : 'bg-base-200 border-base-300 border'
                  }`}
                  key={day}
               >
                  <span className="text-base-content text-xs font-semibold">{day}</span>
                  {days[index] && <span className="mt-1 text-lg">✓</span>}
               </div>
            ))}
         </div>

         <AtomText className="mt-4 text-center text-sm" fontSize="small" isThin>
            ¡Sigue así! 💪
         </AtomText>
      </div>
   )
}
