import { FunctionComponent, MouseEvent, ReactNode } from 'react'

import { Link } from '@/navigation'

type TAtomButton = {
   children: ReactNode
   type?: 'button' | 'submit' | 'reset' | 'link' | undefined
   href?: string
   variant?: 'PRIMARY' | 'SECONDARY' | 'ACCENT' | 'WARNING' | 'OUTLINE' | 'GHOST' | 'LINK' | 'SUCCESS' | 'ERROR'
   size?: 'xs' | 'sm' | 'md' | 'lg'
   extraClassName?: string
   dangerouslyResetClassName?: Boolean
   isBlock?: Boolean
   // gradient?: boolean
   onClick?: (_event?: MouseEvent<HTMLButtonElement>) => void // Prefix event with _
   disabled?: boolean
}

const buttonTypes = {
   PRIMARY: 'btn-primary',
   SECONDARY: 'btn-secondary text-neutral',
   ACCENT: 'btn-accent',
   WARNING: 'btn-warning',
   OUTLINE: 'btn-outline btn-primary',
   GHOST: 'btn-ghost',
   LINK: 'btn-link',
   SUCCESS: 'btn-success',
   ERROR: 'bg-error/80 hover:bg-error border-none'
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
   // gradient = false,
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
      LINK: 'btn-link',
      SUCCESS: 'btn-success',
      ERROR: 'btn-error'
   }

   const sizeClasses: Record<NonNullable<TAtomButton['size']>, string> = {
      xs: 'btn-xs',
      sm: 'btn-sm',
      md: 'btn-md',
      lg: 'btn-lg'
   }

   // Removed gradientClasses, only using daisyUI classes

   const baseClasses = 'btn rounded-lg font-semibold transition-all duration-300 ease-in-out'

   const combinedClasses = `${baseClasses} ${variantClasses[typeOf]} ${sizeClasses[size]} ${extraClassName} ${
      disabled ? 'opacity-50 cursor-not-allowed' : ''
   }`.trim()

   return type === 'link' ? (
      <Link
         href={href}
         {...rest}
         className={
            dangerouslyResetClassName && !extraClassName
               ? 'unset-all'
               : (dangerouslyResetClassName && extraClassName) ||
                 `btn my-3 shadow-md target:bg-transparent${isBlock ? ' btn-block' : ''} ${
                    buttonTypes[typeOf]
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
