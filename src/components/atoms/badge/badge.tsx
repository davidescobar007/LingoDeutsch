import { FunctionComponent, ReactNode } from 'react'

export type BadgeColor =
   | 'neutral'
   | 'primary'
   | 'secondary'
   | 'accent'
   | 'ghost'
   | 'info'
   | 'success'
   | 'warning'
   | 'error'
   | 'default'

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
   color = 'default',
   outline = false,
   size = 'md',
   className = ''
}) => {
   // Compose badge classes according to daisyUI v4
   const colorClass = color === 'default' ? 'badge' : `badge-${color}`
   const outlineClass = outline ? 'badge-outline' : ''
   const sizeClass = size ? `badge-${size}` : ''
   return <div className={`badge ${colorClass} ${outlineClass} ${sizeClass} ${className}`.trim()}>{children}</div>
}
