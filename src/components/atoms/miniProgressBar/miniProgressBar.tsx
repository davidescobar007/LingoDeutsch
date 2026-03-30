import { FunctionComponent } from 'react'

type TAtomMiniProgressBar = {
   value: number
   max: number
   showPercentage?: boolean
   size?: 'sm' | 'md' | 'lg'
   color?: 'primary' | 'success' | 'warning' | 'accent'
   className?: string
}

export const AtomMiniProgressBar: FunctionComponent<TAtomMiniProgressBar> = ({
   value,
   max,
   showPercentage = false,
   size = 'md',
   color = 'primary',
   className = ''
}) => {
   const percentage = Math.min(Math.max((value / max) * 100, 0), 100)

   const colorClasses = {
      primary: 'bg-primary',
      success: 'bg-success',
      warning: 'bg-warning',
      accent: 'bg-accent'
   }

   const sizeClasses = {
      sm: 'h-1',
      md: 'h-1.5',
      lg: 'h-2'
   }

   return (
      <div className={`flex items-center gap-2 ${className}`}>
         <div className={`bg-base-300 flex-1 overflow-hidden rounded-full ${sizeClasses[size]}`}>
            <div
               className={`${colorClasses[color]} ${sizeClasses[size]} rounded-full transition-all duration-500 ease-out`}
               style={{ width: `${percentage}%` }}
            />
         </div>
         {showPercentage && (
            <span className="text-base-content/70 min-w-[2.5rem] text-right text-xs font-medium">
               {Math.round(percentage)}%
            </span>
         )}
      </div>
   )
}
