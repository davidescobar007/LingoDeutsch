'use client'
import { AtomText, AtomTitle } from '@/components/atoms'

type Achievement = {
   id: string
   label: string
   emoji: string
   unlocked: boolean
   unlockedDate?: Date
}

type OrganismAchievementBadgesProps = {
   achievements?: Achievement[]
}

const DEFAULT_ACHIEVEMENTS: Achievement[] = [
   {
      id: 'grammar-master',
      label: 'Maestro de Gramática A1',
      emoji: '🏆',
      unlocked: true,
      unlockedDate: new Date('2025-01-10')
   },
   {
      id: 'article-reader',
      label: 'Lector de Artículos',
      emoji: '📖',
      unlocked: true,
      unlockedDate: new Date('2025-01-08')
   },
   {
      id: 'fire-week',
      label: 'Semana en Fuego',
      emoji: '🔥',
      unlocked: false
   },
   {
      id: 'vocab-builder',
      label: '100 Palabras Aprendidas',
      emoji: '💪',
      unlocked: false
   }
]

export const OrganismAchievementBadges = ({
   achievements = DEFAULT_ACHIEVEMENTS
}: OrganismAchievementBadgesProps) => {
   return (
      <div className="border-base-300 bg-base-100 rounded-lg border p-6 shadow-md">
         <AtomTitle extraClassName="!text-lg mb-4" type="h3">
            🎖️ Logros
         </AtomTitle>

         <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {achievements.map((achievement) => (
               <div
                  className={`flex flex-col items-center justify-center gap-2 rounded-lg p-4 text-center transition-all duration-300 ${
                     achievement.unlocked
                        ? 'bg-primary/10 border-primary/30 border hover:scale-105 hover:shadow-md'
                        : 'bg-base-200 border-base-300 border opacity-50'
                  }`}
                  key={achievement.id}
               >
                  <div className="text-4xl">{achievement.emoji}</div>
                  <AtomText className="text-xs" fontSize="small" isThin>
                     {achievement.label}
                  </AtomText>
                  {achievement.unlocked && achievement.unlockedDate && (
                     <AtomText className="text-primary text-xs" fontSize="small" isThin>
                        {new Date(achievement.unlockedDate).toLocaleDateString('es-ES', {
                           month: 'short',
                           day: 'numeric'
                        })}
                     </AtomText>
                  )}
               </div>
            ))}
         </div>
      </div>
   )
}
