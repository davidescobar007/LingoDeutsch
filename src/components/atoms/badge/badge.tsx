import { FunctionComponent, ReactNode } from 'react'

export type BadgeColor = 'neutral' | 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error'
export type BadgeColorTheme = 'blue' | 'green' | 'purple' | 'orange' | 'teal' | 'red' | 'yellow' | 'indigo'
export type BadgeSize = 'xs' | 'sm' | 'md' | 'lg'

type TAtomBadge = {
   children: ReactNode
   color?: BadgeColor
   colorTheme?: BadgeColorTheme
   outline?: boolean
   size?: BadgeSize
   className?: string
   onClick?: () => void
   variant?: 'default' | 'topic'
}

const colorThemes = {
   blue: 'bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-800/40',
   green: 'bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-300 dark:hover:bg-green-800/40',
   purple:
      'bg-purple-100 text-purple-700 hover:bg-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:hover:bg-purple-800/40',
   orange:
      'bg-orange-100 text-orange-700 hover:bg-orange-200 dark:bg-orange-900/30 dark:text-orange-300 dark:hover:bg-orange-800/40',
   teal: 'bg-teal-100 text-teal-700 hover:bg-teal-200 dark:bg-teal-900/30 dark:text-teal-300 dark:hover:bg-teal-800/40',
   red: 'bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-300 dark:hover:bg-red-800/40',
   yellow:
      'bg-yellow-100 text-yellow-700 hover:bg-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:hover:bg-yellow-800/40',
   indigo:
      'bg-indigo-100 text-indigo-700 hover:bg-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-300 dark:hover:bg-indigo-800/40'
}

export const AtomBadge: FunctionComponent<TAtomBadge> = ({
   children,
   color = undefined,
   colorTheme = undefined,
   outline = false,
   size = 'md',
   className = '',
   onClick = undefined,
   variant = 'default'
}) => {
   // Topic variant uses colorTheme and has different styling
   if (variant === 'topic' && colorTheme) {
      const themeClasses = colorThemes[colorTheme]
      const interactiveClass = onClick ? 'cursor-pointer transition-colors' : ''

      return (
         <span
            className={`rounded-full px-3 py-1 text-sm ${themeClasses} ${interactiveClass} ${className}`}
            onClick={onClick}
         >
            {children}
         </span>
      )
   }

   // Default badge styling
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
