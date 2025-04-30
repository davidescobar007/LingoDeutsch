import { FunctionComponent, JSX } from 'react'
import {
   AlertTriangle,
   Book,
   BookmarkCheck,
   BookmarkX,
   BookOpenCheck,
   Brain,
   BrainCog,
   CheckCircle2,
   Circle,
   CircleChevronLeft,
   CircleChevronRight,
   CircleX,
   ClipboardCheck,
   Crown,
   Flame,
   Gauge,
   Home,
   Info,
   Library,
   Medal,
   Scale,
   Settings,
   Sparkles,
   Star,
   Trophy,
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
      | 'home'
      | 'brain'
      | 'book'
      | 'book-open-check'
      | 'library'
      | 'brain-cog'
      | 'clipboard-check'
      | 'flame'
      | 'circle-chevron-left'
      | 'circle-chevron-right'
      | 'circle'
      | 'crown'
      | 'trophy'
      | 'medal'
      | 'star'
      | 'stars'
   iconSize?: 'small' | 'medium' | 'large'
   iconState?: 'warning' | 'error' | 'success' | 'info' | 'primary' | 'neutral' | 'white'
   className?: string
   onClick?: () => void
   fill?: string
}

const defaultOnClick = () => {}

export const Icon: FunctionComponent<IconType> = ({
   icon,
   iconSize = 'medium',
   iconState = 'neutral',

   className = '',
   onClick = defaultOnClick,
   fill = 'transparent'
}) => {
   const iconStateMap: Record<NonNullable<IconType['iconState']>, string> = {
      warning: 'text-warning',
      error: 'text-error',
      success: 'text-success',
      info: 'text-info',
      primary: 'text-primary',
      neutral: 'text-neutral',
      white: 'text-white'
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
         : iconState === 'primary'
         ? 'text-primary'
         : iconState === 'white'
         ? 'text-white'
         : className
         ? className
         : 'text-neutral'

   const iconSizeMap: Record<'small' | 'medium' | 'large', number> = {
      small: 16,
      medium: 24,
      large: 32
   }
   const size = iconSizeMap[iconSize] || 24

   const iconType: Record<IconType['icon'], JSX.Element | null> = {
      check: <CheckCircle2 className={`${iconStateClass} ${className}`} fill={fill} size={size} />,
      cross: <XCircle className={`${iconStateClass} ${className}`} fill={fill} size={size} />,
      info: <Info className={`${iconStateClass}  ${className}`} fill={fill} size={size} />,
      warning: <AlertTriangle className={`${iconStateClass} ${className}`} fill={fill} size={size} />,
      error: <CircleX className={`${iconStateClass} ${className}`} fill={fill} size={size} />,
      gauge: <Gauge className={`${iconStateClass} ${className}`} fill={fill} size={size} />,
      bookmark: <BookmarkCheck className={`${iconStateClass} ${className}`} fill={fill} size={size} />,
      'bookmark-x': <BookmarkX className={`${iconStateClass} ${className}`} fill={fill} size={size} />,
      settings: <Settings className={`${iconStateClass} ${className}`} fill={fill} size={size} />,
      balance: <Scale className={`${iconStateClass} ${className}`} fill={fill} size={size} />,
      home: <Home className={`${iconStateClass} ${className}`} fill={fill} size={size} />,
      brain: <Brain className={`${iconStateClass} ${className}`} fill={fill} size={size} />,
      book: <Book className={`${iconStateClass} ${className}`} fill={fill} size={size} />,
      'book-open-check': <BookOpenCheck className={`${iconStateClass} ${className}`} fill={fill} size={size} />,
      library: <Library className={`${iconStateClass} ${className}`} fill={fill} size={size} />,
      'brain-cog': <BrainCog className={`${iconStateClass} ${className}`} fill={fill} size={size} />,
      'clipboard-check': <ClipboardCheck className={`${iconStateClass} ${className}`} fill={fill} size={size} />,
      flame: <Flame className={`${iconStateClass} ${className}`} fill={fill} size={size} />,
      'circle-chevron-left': (
         <CircleChevronLeft className={`${iconStateClass} ${className}`} fill={fill} size={size} />
      ),
      'circle-chevron-right': (
         <CircleChevronRight className={`${iconStateClass} ${className}`} fill={fill} size={size} />
      ),
      circle: <Circle className={`${iconStateClass} ${className}`} fill={fill} size={size} />,
      crown: <Crown className={`${iconStateClass} ${className}`} fill={fill} size={size} />,
      trophy: <Trophy className={`${iconStateClass} ${className}`} fill={fill} size={size} />,
      medal: <Medal className={`${iconStateClass} ${className}`} fill={fill} size={size} />,
      star: <Star className={`${iconStateClass} ${className}`} fill={fill} size={size} />,
      stars: <Sparkles className={`${iconStateClass} ${className}`} fill={fill} size={size} />
   }
   return <div onClick={onClick}>{iconType[icon] || null}</div>
}
