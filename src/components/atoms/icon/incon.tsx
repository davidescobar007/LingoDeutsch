import { FunctionComponent, JSX } from 'react'
import {
   AlertTriangle,
   Book,
   BookmarkCheck,
   BookmarkX,
   BookOpenCheck,
   Brain,
   BrainCog,
   Check,
   CheckCircle,
   Circle,
   CircleChevronLeft,
   CircleChevronRight,
   CircleX,
   ClipboardCheck,
   Crown,
   Flame,
   Gauge,
   GraduationCap,
   Home,
   Info,
   Library,
   Medal,
   MoveDown,
   MoveUp,
   PartyPopper,
   Scale,
   Settings,
   Sparkles,
   Star,
   Target,
   Timer,
   Trophy,
   XCircle,
   Zap
} from 'lucide-react'

type IconType = {
   icon:
      | 'check'
      | 'check-circle'
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
      | 'timer'
      | 'move-down'
      | 'move-up'
      | 'graduation-cap'
      | 'party-popper'
      | 'target'
      | 'zap'
   iconSize?: 'small' | 'medium' | 'large'
   iconState?: 'warning' | 'error' | 'success' | 'info' | 'primary' | 'neutral' | 'white'
   className?: string
   onClick?: () => void
   fill?: string
   disabled?: boolean
}

const defaultOnClick = () => {}

export const Icon: FunctionComponent<IconType> = ({
   icon,
   iconSize = 'medium',
   iconState = 'neutral',
   className = '',
   onClick = defaultOnClick,
   fill = 'transparent',
   disabled = false
}) => {
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

   const disabledClass = disabled ? 'opacity-50 cursor-not-allowed' : ''
   const combinedClassName = `${iconStateClass} ${className} ${disabledClass}`.trim()

   const iconSizeMap: Record<'small' | 'medium' | 'large', number> = {
      small: 16,
      medium: 24,
      large: 32
   }
   const size = iconSizeMap[iconSize] || 24

   const iconType: Record<IconType['icon'], JSX.Element | null> = {
      check: <Check className={combinedClassName} fill={fill} size={size} />,
      'check-circle': <CheckCircle className={combinedClassName} fill={fill} size={size} />,
      cross: <XCircle className={combinedClassName} fill={fill} size={size} />,
      info: <Info className={combinedClassName} fill={fill} size={size} />,
      warning: <AlertTriangle className={combinedClassName} fill={fill} size={size} />,
      error: <CircleX className={combinedClassName} fill={fill} size={size} />,
      gauge: <Gauge className={combinedClassName} fill={fill} size={size} />,
      bookmark: <BookmarkCheck className={combinedClassName} fill={fill} size={size} />,
      'bookmark-x': <BookmarkX className={combinedClassName} fill={fill} size={size} />,
      settings: <Settings className={combinedClassName} fill={fill} size={size} />,
      balance: <Scale className={combinedClassName} fill={fill} size={size} />,
      home: <Home className={combinedClassName} fill={fill} size={size} />,
      brain: <Brain className={combinedClassName} fill={fill} size={size} />,
      book: <Book className={combinedClassName} fill={fill} size={size} />,
      'book-open-check': <BookOpenCheck className={combinedClassName} fill={fill} size={size} />,
      library: <Library className={combinedClassName} fill={fill} size={size} />,
      'brain-cog': <BrainCog className={combinedClassName} fill={fill} size={size} />,
      'clipboard-check': <ClipboardCheck className={combinedClassName} fill={fill} size={size} />,
      flame: <Flame className={combinedClassName} fill={fill} size={size} />,
      'circle-chevron-left': <CircleChevronLeft className={combinedClassName} fill={fill} size={size} />,
      'circle-chevron-right': <CircleChevronRight className={combinedClassName} fill={fill} size={size} />,
      circle: <Circle className={combinedClassName} fill={fill} size={size} />,
      crown: <Crown className={combinedClassName} fill={fill} size={size} />,
      trophy: <Trophy className={combinedClassName} fill={fill} size={size} />,
      medal: <Medal className={combinedClassName} fill={fill} size={size} />,
      star: <Star className={combinedClassName} fill={fill} size={size} />,
      stars: <Sparkles className={combinedClassName} fill={fill} size={size} />,
      timer: <Timer className={combinedClassName} fill={fill} size={size} />,
      'move-down': <MoveDown className={combinedClassName} fill={fill} size={size} />,
      'move-up': <MoveUp className={combinedClassName} fill={fill} size={size} />,
      'graduation-cap': <GraduationCap className={combinedClassName} fill={fill} size={size} />,
      'party-popper': <PartyPopper className={combinedClassName} fill={fill} size={size} />,
      target: <Target className={combinedClassName} fill={fill} size={size} />,
      zap: <Zap className={combinedClassName} fill={fill} size={size} />
   }
   return <div onClick={disabled ? defaultOnClick : onClick}>{iconType[icon] || null}</div>
}
