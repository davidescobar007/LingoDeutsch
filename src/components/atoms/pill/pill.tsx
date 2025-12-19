import { FunctionComponent, ReactNode } from 'react'

type TAtomPill = {
   badge?: ReactNode
   disabled?: boolean
   emoji?: string
   isSelected?: boolean
   label: string
   onClick?: () => void
}

export const AtomPill: FunctionComponent<TAtomPill> = ({
   badge,
   disabled = false,
   emoji,
   isSelected = false,
   label,
   onClick
}) => {
   return (
      <button
         className={`px-4 py-2 rounded-full whitespace-nowrap transition-all duration-300 flex items-center gap-2 border-2 ${
            isSelected
               ? 'border-primary bg-primary text-white'
               : 'border-base-400 bg-base-100 text-base-content hover:border-primary'
         } ${disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}
         disabled={disabled}
         onClick={onClick}
      >
         {emoji && <span className="text-lg">{emoji}</span>}
         <span className="font-semibold">{label}</span>
         {badge && <span className="text-sm">{badge}</span>}
      </button>
   )
}
