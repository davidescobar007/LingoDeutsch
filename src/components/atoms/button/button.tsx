import { FunctionComponent, MouseEvent, ReactNode } from 'react'

import { Link } from '@/navigation'

type TAtomButton = {
   children: ReactNode
   type?: 'button' | 'submit' | 'reset' | 'link' | undefined
   href?: string
   variant?: 'PRIMARY' | 'SECONDARY' | 'ACCENT' | 'WARNING' | 'OUTLINE' | 'GHOST' | 'LINK'
   size?: 'xs' | 'sm' | 'md' | 'lg'
   extraClassName?: string
   dangerouslyResetClassName?: Boolean
   isBlock?: Boolean
   gradient?: boolean
   onClick?: (_event?: MouseEvent<HTMLButtonElement>) => void // Prefix event with _
   disabled?: boolean
}

const buttonTypes = {
   PRIMARY: 'btn-primary',
   SECONDARY: 'btn-secondary text-neutral',
   ACCENT: 'btn-accent',
   WARNING: 'btn-warning',
   OUTLINE: 'btn-outline btn-primary',
   GHOST: 'btn-ghost', // Added GHOST
   LINK: 'btn-link' // Added LINK
}
const emptyFunction = () => {}

export const AtomButton: FunctionComponent<TAtomButton> = ({
   children,
   type = 'button',
   href = '',
   variant: typeOf = 'PRIMARY',
   size = 'md', // Destructured size
   extraClassName = '',
   dangerouslyResetClassName = false,
   isBlock = false,
   gradient = false,
   onClick = emptyFunction,
   disabled = false,
   ...rest
}) => {
   const variantClasses: Record<NonNullable<TAtomButton['variant']>, string> = {
      PRIMARY: 'btn-primary',
      SECONDARY: 'btn-secondary text-neutral',
      ACCENT: 'btn-accent',
      WARNING: 'btn-warning',
      OUTLINE: 'btn-outline btn-primary',
      GHOST: 'btn-ghost',
      LINK: 'btn-link'
   }

   const sizeClasses: Record<NonNullable<TAtomButton['size']>, string> = {
      xs: 'btn-xs',
      sm: 'btn-sm',
      md: 'btn-md',
      lg: 'btn-lg'
   }

   // Gradient classes based on variant using the custom theme colors
   const gradientClasses: Record<NonNullable<TAtomButton['variant']>, string> = {
      PRIMARY:
         'bg-gradient-to-r from-[#805AF2] to-[#6B46C1] hover:from-[#7C3AED] hover:to-[#5B21B6] text-white border-none',
      SECONDARY:
         'bg-gradient-to-r from-[#e5defc] to-[#D1C4E9] hover:from-[#DDD6FE] hover:to-[#C4B5FD] text-[#4D2C91] border-none',
      ACCENT:
         'bg-gradient-to-r from-[#FFC107] to-[#F59E0B] hover:from-[#FFB300] hover:to-[#F57C00] text-[#5A3B00] border-none',
      WARNING:
         'bg-gradient-to-r from-[#F59E0B] to-[#EF4444] hover:from-[#F57C00] hover:to-[#DC2626] text-white border-none',
      OUTLINE:
         'bg-gradient-to-r from-transparent to-transparent border-2 border-[#805AF2] hover:from-[#805AF2]/10 hover:to-[#6B46C1]/10 text-[#805AF2] hover:text-[#6B46C1]',
      GHOST: 'bg-gradient-to-r from-transparent to-transparent hover:from-[#805AF2]/10 hover:to-[#6B46C1]/10 text-[#805AF2] hover:text-[#6B46C1] border-none',
      LINK: 'bg-gradient-to-r from-transparent to-transparent text-[#805AF2] hover:text-[#6B46C1] border-none underline hover:no-underline'
   }

   const baseClasses = 'btn rounded-lg font-semibold transition-all duration-300 ease-in-out'

   const combinedClasses = `${baseClasses} ${gradient ? gradientClasses[typeOf] : variantClasses[typeOf]} ${
      sizeClasses[size] // size is now defined
   } ${extraClassName} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`.trim()

   return type === 'link' ? (
      <Link
         href={href}
         {...rest}
         className={
            dangerouslyResetClassName && !extraClassName
               ? 'unset-all'
               : (dangerouslyResetClassName && extraClassName) ||
                 `btn my-3 shadow-md target:bg-transparent ${isBlock ? ' btn-block' : ''} ${
                    gradient ? gradientClasses[typeOf] : buttonTypes[typeOf] // Use gradient if enabled
                 } ${extraClassName}`
         }
      >
         {children}
      </Link>
   ) : (
      <button className={combinedClasses} disabled={disabled} onClick={onClick} type={type} {...rest}>
         {children}
      </button>
   )
}
