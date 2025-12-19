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
   onClick?: (_event?: MouseEvent<HTMLButtonElement>) => void // Prefix event with _
   disabled?: boolean
}

const emptyFunction = () => {}

export const AtomButton: FunctionComponent<TAtomButton> = ({
   children,
   type = 'button',
   href = '',
   variant: typeOf = 'PRIMARY',
   size = 'md',
   extraClassName = '',
   isBlock = false,
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

   const baseClasses = 'btn rounded-lg font-semibold transition-all duration-300 ease-in-out'
   const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : ''

   const buttonVariantClasses = variantClasses[typeOf]

   const combinedClasses = [baseClasses, buttonVariantClasses, sizeClasses[size], extraClassName, disabledClasses, isBlock ? 'btn-block' : '']
      .filter(Boolean)
      .join(' ')

   const defaultLinkBase = `btn rounded-lg shadow-md target:bg-transparent${isBlock ? ' btn-block' : ''}`
   const linkDefaultClasses = [defaultLinkBase, buttonVariantClasses, sizeClasses[size], extraClassName, disabledClasses]
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
