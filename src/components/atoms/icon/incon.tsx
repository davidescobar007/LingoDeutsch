import { FunctionComponent, JSX } from 'react'
import {
   AlertTriangle,
   BookmarkCheck,
   BookmarkX,
   CheckCircle2,
   CircleX,
   Gauge,
   Info,
   Scale,
   Settings,
   XCircle
} from 'lucide-react'

type IconType = {
   icon:
      | 'check'
      | 'cross'
      | 'info'
      | 'warning'
      | 'error'
      | 'gauge'
      | 'bookmark'
      | 'bookmark-x'
      | 'settings'
      | 'balance'
   iconSize?: 'small' | 'medium' | 'large'
   iconState?: 'warning' | 'error' | 'success' | 'info'
   iconBackground?: string
   className?: string
   onClick?: () => void
}

const defaultOnClick = () => {}

export const Icon: FunctionComponent<IconType> = ({
   icon,
   iconSize = 'medium',
   iconState = '',
   iconBackground = '',
   className = '',
   onClick = defaultOnClick
}) => {
   const iconStateMap: Record<NonNullable<IconType['iconState']>, string> = {
      warning: 'text-warning',
      error: 'text-error',
      success: 'text-success',
      info: 'text-info'
   }
   const iconStateClass =
      iconState === 'warning'
         ? 'text-warning'
         : iconState === 'error'
         ? 'text-error'
         : iconState === 'success'
         ? 'text-success'
         : iconState === 'info'
         ? 'text-info'
         : 'text-base-content'

   const iconSizeMap: Record<'small' | 'medium' | 'large', number> = {
      small: 16,
      medium: 24,
      large: 32
   }
   const size = iconSizeMap[iconSize] || 24

   const iconType: Record<IconType['icon'], JSX.Element | null> = {
      check: <CheckCircle2 className={`${iconStateClass} ${className}`} size={size} />,
      cross: <XCircle className={`${iconStateClass} ${className}`} size={size} />,
      info: <Info className={`${iconStateClass}  ${className}`} size={size} />,
      warning: <AlertTriangle className={`${iconStateClass} ${className}`} size={size} />,
      error: <CircleX className={`${iconStateClass} ${className}`} size={size} />,
      gauge: <Gauge className={`${iconStateClass} ${className}`} size={size} />,
      bookmark: <BookmarkCheck className={`${iconStateClass} ${className}`} size={size} />,
      'bookmark-x': <BookmarkX className={`${iconStateClass} ${className}`} size={size} />,
      settings: <Settings className={`${iconStateClass} ${className}`} size={size} />,
      balance: <Scale className={`${iconStateClass} ${className}`} size={size} />
   }
   return <div onClick={onClick}>{iconType[icon] || null}</div>
}
