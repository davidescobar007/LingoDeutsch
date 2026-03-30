import { FunctionComponent } from 'react'

type TAtomDifficultyIndicator = {
   difficulty: number
   maxDifficulty?: number
   showLabel?: boolean
   size?: 'sm' | 'md' | 'lg'
   className?: string
}

export const AtomDifficultyIndicator: FunctionComponent<TAtomDifficultyIndicator> = ({
   difficulty,
   maxDifficulty = 5,
   showLabel = false,
   size = 'md',
   className = ''
}) => {
   const getDifficultyColor = (level: number, max: number): string => {
      const ratio = level / max
      if (ratio <= 0.2) return 'bg-green-500'
      if (ratio <= 0.4) return 'bg-lime-500'
      if (ratio <= 0.6) return 'bg-yellow-500'
      if (ratio <= 0.8) return 'bg-orange-500'
      return 'bg-red-500'
   }

   const getDifficultyLabel = (level: number, max: number): string => {
      const ratio = level / max
      if (ratio <= 0.2) return 'Fácil'
      if (ratio <= 0.4) return 'Básico'
      if (ratio <= 0.6) return 'Intermedio'
      if (ratio <= 0.8) return 'Avanzado'
      return 'Experto'
   }

   const sizeClasses = {
      sm: 'h-1 w-3',
      md: 'h-1.5 w-4',
      lg: 'h-2 w-5'
   }

   const barSize = sizeClasses[size]
   const bars = []

   for (let i = 1; i <= maxDifficulty; i++) {
      const isActive = i <= difficulty
      const barColor = isActive ? getDifficultyColor(difficulty, maxDifficulty) : 'bg-base-300'
      bars.push(<div className={`${barSize} ${barColor} rounded-full transition-all duration-300`} key={i} />)
   }

   return (
      <div className={`flex items-center gap-1 ${className}`}>
         <div className="flex items-end gap-0.5">{bars}</div>
         {showLabel && (
            <span className="text-base-content/70 text-xs font-medium">
               {getDifficultyLabel(difficulty, maxDifficulty)}
            </span>
         )}
      </div>
   )
}
