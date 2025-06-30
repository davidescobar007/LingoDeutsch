import { FunctionComponent, ReactNode } from 'react'

export type BadgeColor = 'neutral' | 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error'

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
   color = undefined,
   outline = false,
   size = 'md',
   className = '',
   onClick = undefined
}) => {
   const classes = [
      'badge',
      color && ` badge-${color}`,
      outline && ' badge-outline',
      size !== 'md' && ` badge-${size} `,
      onClick && 'cursor-pointer',
      className
   ]
      .filter(Boolean)
      .join(' ')

   return (
      <div className={classes} onClick={onClick}>
         {children}
      </div>
   )
}
