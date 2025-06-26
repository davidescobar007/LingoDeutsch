import { FunctionComponent, ReactNode } from 'react'

export type BadgeColor = 'neutral' | 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error'

export type BadgeSize = 'xs' | 'sm' | 'md' | 'lg'

type TAtomBadge = {
   children: ReactNode
   color?: BadgeColor
   outline?: boolean
   size?: BadgeSize
   className?: string
}

export const AtomBadge: FunctionComponent<TAtomBadge> = ({
   children,
   color = undefined,
   outline = false,
   size = 'md',
   className = ''
}) => {
   const classes = [
      'badge',
      color && ` badge-${color}`,
      outline && ' badge-outline',
      size !== 'md' && ` badge-${size} `,
      className
   ]
      .filter(Boolean)
      .join(' ')

   return <div className={classes}>{children}</div>
}
