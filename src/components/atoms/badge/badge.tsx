import { FunctionComponent, ReactNode } from 'react'

export type BadgeColor =
   | 'default'
   | 'neutral'
   | 'primary'
   | 'secondary'
   | 'accent'
   | 'ghost'
   | 'info'
   | 'success'
   | 'warning'
   | 'error'

export type BadgeSize = 'xs' | 'sm' | 'md' | 'lg'

type TAtomBadge = {
   children: ReactNode
   color?: BadgeColor
   outline?: boolean
   size?: BadgeSize
   className?: string
   onClick?: () => void
}

export const AtomBadge: FunctionComponent<TAtomBadge> = ({
   children,
   color = 'default',
   outline = false,
   size = 'md',
   className = '',
   onClick = undefined
}) => {
   // Build daisyUI badge classes
   const badgeClasses = [
      'badge', // Base daisyUI badge class
      color !== 'default' && `badge-${color}`, // daisyUI color variants (default has no class)
      outline && 'badge-outline', // daisyUI outline variant
      size !== 'md' && `badge-${size}`, // daisyUI size variants (md is default)
      onClick && 'cursor-pointer hover:scale-105 transition-transform duration-200', // Interactive styles
      className // Additional custom classes
   ]
      .filter(Boolean)
      .join(' ')

   return (
      <div className={badgeClasses} onClick={onClick}>
         {children}
      </div>
   )
}
