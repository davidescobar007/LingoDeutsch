import { FunctionComponent, MouseEvent, ReactNode } from 'react'

import { Link } from '@/navigation'

type TAtomButton = {
   children: ReactNode
   type?: 'button' | 'submit' | 'reset' | 'link' | undefined
   href?: string
   variant?: 'PRIMARY' | 'SECONDARY' | 'ACCENT' | 'WARNING' | 'OUTLINE' | 'GHOST' | 'LINK' | 'SUCCESS' | 'ERROR'
   size?: 'xs' | 'sm' | 'md' | 'lg'
   extraClassName?: string
   isBlock?: Boolean
   gradient?: boolean
   onClick?: (_event?: MouseEvent<HTMLButtonElement>) => void // Prefix event with _
   disabled?: boolean
}

const emptyFunction = () => {}

export const AtomButton: FunctionComponent<TAtomButton> = ({
   children,
   type = 'button',
   href = '',
   variant: typeOf = 'PRIMARY',
   size = 'md', // Destructured size
   extraClassName = '',
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
      LINK: 'btn-link',
      SUCCESS: 'btn-success',
      ERROR: 'btn-error'
   }

   // Gradient classes for each variant using mytheme colors
   const gradientClasses: Record<NonNullable<TAtomButton['variant']>, string> = {
      PRIMARY:
         'bg-gradient-to-r from-primary via-purple-600 to-indigo-700 hover:from-purple-700 hover:via-purple-800 hover:to-indigo-800 text-primary-content border-0 shadow-lg hover:shadow-xl',
      SECONDARY:
         'bg-gradient-to-r from-secondary via-purple-200 to-purple-300 hover:from-purple-300 hover:via-purple-400 hover:to-purple-500 text-secondary-content border-0 shadow-lg hover:shadow-xl',
      ACCENT:
         'bg-gradient-to-r from-accent via-yellow-500 to-orange-500 hover:from-yellow-600 hover:via-orange-600 hover:to-red-500 text-accent-content border-0 shadow-lg hover:shadow-xl',
      WARNING:
         'bg-gradient-to-r from-warning via-orange-600 to-red-500 hover:from-orange-600 hover:via-red-600 hover:to-red-700 text-warning-content border-0 shadow-lg hover:shadow-xl',
      OUTLINE:
         'bg-gradient-to-r from-transparent to-transparent border-2 border-primary text-primary hover:from-primary/10 hover:to-primary/20 hover:text-primary hover:border-primary',
      GHOST: 'bg-gradient-to-r from-transparent to-transparent hover:from-base-200 hover:to-base-300 text-base-content hover:text-neutral',
      LINK: 'bg-gradient-to-r from-transparent to-transparent text-primary hover:text-primary underline hover:no-underline',
      SUCCESS:
         'bg-gradient-to-r from-success via-green-600 to-emerald-600 hover:from-green-600 hover:via-emerald-600 hover:to-teal-600 text-success-content border-0 shadow-lg hover:shadow-xl',
      ERROR: 'bg-gradient-to-r from-error via-red-600 to-rose-600 hover:from-red-600 hover:via-rose-600 hover:to-pink-600 text-error-content border-0 shadow-lg hover:shadow-xl'
   }

   const sizeClasses: Record<NonNullable<TAtomButton['size']>, string> = {
      xs: 'btn-xs',
      sm: 'btn-sm',
      md: 'btn-md',
      lg: 'btn-lg'
   }

   const baseClasses = 'btn rounded-lg font-semibold transition-all duration-300 ease-in-out'

   const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : ''

   // Use gradient classes if gradient is true, otherwise use regular variant classes
   const buttonVariantClasses = gradient ? gradientClasses[typeOf] : variantClasses[typeOf]

   const combinedClasses = [
      baseClasses,
      buttonVariantClasses,
      sizeClasses[size],
      gradient && 'transform hover:scale-105 active:scale-95', // Add subtle scale effect for gradients
      extraClassName,
      disabledClasses
   ]
      .filter(Boolean)
      .join(' ')

   const defaultLinkBase = `btn my-3 shadow-md target:bg-transparent${isBlock ? ' btn-block' : ''}`
   const linkVariantClasses = gradient ? gradientClasses[typeOf] : variantClasses[typeOf]
   const linkDefaultClasses = [
      defaultLinkBase,
      linkVariantClasses,
      gradient && 'transform hover:scale-105 active:scale-95',
      extraClassName,
      disabledClasses
   ]
      .filter(Boolean)
      .join(' ')

   if (type === 'link') {
      return (
         <Link href={href} {...rest} className={linkDefaultClasses}>
            {children}
         </Link>
      )
   }

   return (
      <button className={combinedClasses} disabled={disabled} onClick={onClick} type={type} {...rest}>
         {children}
      </button>
   )
}
