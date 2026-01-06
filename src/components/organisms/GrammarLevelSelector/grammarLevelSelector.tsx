import { AtomPill } from '@/components/atoms'

type GrammarLevel = 'A1' | 'A2' | 'B1' | 'B2'

type LevelProgress = {
   completed: number
   percentage: number
   total: number
}

type LevelInfo = {
   description: string
   emoji: string
   label: string
}

type OrganismGrammarLevelSelectorProps = {
   levelInfo: Record<GrammarLevel, LevelInfo>
   levels: GrammarLevel[]
   onLevelSelect: (level: GrammarLevel) => void
   progress: Record<GrammarLevel, LevelProgress>
   selectedLevel: GrammarLevel
}

export const OrganismGrammarLevelSelector = ({
   levelInfo,
   levels,
   onLevelSelect,
   progress,
   selectedLevel
}: OrganismGrammarLevelSelectorProps) => {
   const isLevelLocked = (_level: GrammarLevel) => {
      return false
   }

   return (
      <div className="mb-8 flex items-center gap-2 overflow-x-auto pb-2">
         {levels.map((level) => {
            const levelProgress = progress[level]
            const locked = isLevelLocked(level)
            const info = levelInfo[level]
            const isSelected = selectedLevel === level

            let badge: string | null = null
            if (locked) {
               badge = '🔒'
            } else if (levelProgress.percentage === 100) {
               badge = '✅'
            } else if (levelProgress.percentage > 0) {
               badge = `${levelProgress.percentage}%`
            }

            return (
               <AtomPill
                  badge={badge}
                  disabled={locked}
                  emoji={info.emoji}
                  isSelected={isSelected}
                  key={level}
                  label={level}
                  onClick={() => {
                     if (!locked) {
                        onLevelSelect(level)
                     }
                  }}
               />
            )
         })}
      </div>
   )
}
