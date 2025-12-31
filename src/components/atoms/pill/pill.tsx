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
         className={`flex items-center gap-2 whitespace-nowrap rounded-full border-2 px-4 py-2 transition-all duration-300 ${
            isSelected
               ? 'border-primary bg-primary text-white'
               : 'border-base-400 bg-base-100 text-base-content hover:border-primary'
         } ${disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}
         disabled={disabled}
         onClick={onClick}
      >
         {emoji && <span className="text-lg">{emoji}</span>}
         <span className="font-semibold">{label}</span>
         {badge && <span className="text-sm">{badge}</span>}
      </button>
   )
}
