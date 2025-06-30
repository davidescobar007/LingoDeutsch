import React, { FunctionComponent } from 'react'

import { AtomButton, AtomText, Icon } from '@/components/atoms'

type ProgressIndicatorProps = {
   value: number
   showIcon?: boolean
   color?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error'
   size?: 'sm' | 'md' | 'lg'
}

type ActionButtonProps = {
   text: string
   onClick?: () => void
   href?: string
   variant?: 'PRIMARY' | 'SECONDARY' | 'GHOST'
   size?: 'sm' | 'md' | 'lg'
}

type MoleculeMiniCardProps = {
   icon: React.ReactNode
   content: string
   footer?: string | number
   className?: string
   onClick?: () => void
   isLoading?: boolean
   loadingText?: string
   isSelected?: boolean
   description?: string
   variant?: 'default' | 'compact' | 'detailed' | 'action'
   size?: 'sm' | 'md' | 'lg'
   progressIndicator?: ProgressIndicatorProps
   actionButton?: ActionButtonProps
   state?: 'default' | 'completed' | 'inProgress' | 'selected'
   stateColors?: {
      completed?: string
      inProgress?: string
      selected?: string
      default?: string
   }
}

export const MoleculeMiniCard: FunctionComponent<MoleculeMiniCardProps> = ({
   icon,
   content,
   footer = undefined,
   className = '',
   onClick = undefined,
   isLoading = false,
   loadingText = undefined,
   isSelected = false,
   description = undefined,
   variant = 'default',
   size = 'md',
   progressIndicator = undefined,
   actionButton = undefined,
   state = undefined,
   stateColors = undefined
}) => {
   // Determine effective state
   const effectiveState = state || (isSelected ? 'selected' : 'default')

   const effectiveLoadingText = loadingText || 'Cargando...'

   const defaultStateColors = {
      completed: 'border-success bg-success/10 ring-2 ring-success/30 hover:border-success hover:bg-success/15',
      inProgress: 'border-warning bg-warning/5 ring-1 ring-warning/20 hover:border-warning hover:bg-warning/10',
      selected: 'border-primary bg-primary/10 ring-2 ring-primary/20',
      default: 'border-base-300 hover:border-primary/50'
   }

   const effectiveStateColors = { ...defaultStateColors, ...stateColors }
   const getSizeClasses = () => {
      switch (size) {
         case 'sm':
            return 'p-3 min-h-[100px]'
         case 'lg':
            return 'p-6 min-h-[140px]'
         default:
            return 'p-4 min-h-[120px]'
      }
   }

   const getVariantClasses = () => {
      const baseClasses = `card bg-base-100 shadow-sm transition-all duration-200 ${getSizeClasses()}`

      if (onClick) {
         return `${baseClasses} cursor-pointer hover:shadow-md hover:-translate-y-1 active:scale-95`
      }

      return baseClasses
   }

   const getStateClasses = () => {
      if (isLoading) {
         return 'border-primary bg-primary/10 animate-pulse'
      }
      return effectiveStateColors[effectiveState]
   }

   const iconSize = size === 'sm' ? 'text-xl' : size === 'lg' ? 'text-3xl' : 'text-2xl'

   return (
      <div
         className={`relative ${getVariantClasses()} border-2 ${getStateClasses()} ${className}`}
         onClick={onClick}
         onKeyDown={
            onClick
               ? (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                       e.preventDefault()
                       onClick()
                    }
                 }
               : undefined
         }
         role={onClick ? 'button' : undefined}
         tabIndex={onClick ? 0 : undefined}
      >
         {/* Progress Indicator in upper corner inside card */}
         {progressIndicator && (
            <div className="absolute right-2 top-2 z-10">
               <div
                  aria-valuemax={100}
                  aria-valuemin={0}
                  aria-valuenow={progressIndicator.value}
                  className={`radial-progress ${
                     progressIndicator.color === 'success' ? 'text-success' : 'text-warning'
                  }`}
                  role="progressbar"
                  style={
                     {
                        '--value': progressIndicator.value,
                        '--size':
                           progressIndicator.size === 'lg'
                              ? '3rem'
                              : progressIndicator.size === 'sm'
                              ? '2.5rem'
                              : '2.5rem',
                        '--thickness': '3px'
                     } as React.CSSProperties
                  }
               >
                  <span className="text-xs font-bold">
                     {progressIndicator.showIcon && progressIndicator.value === 100 ? (
                        <Icon className="text-success" icon="check" />
                     ) : (
                        `${progressIndicator.value}%`
                     )}
                  </span>
               </div>
            </div>
         )}

         <div className="flex h-full flex-col">
            {/* Icon Section - Centered at Top */}
            <div className={`mb-3 flex items-center justify-start ${iconSize}`}>
               {isLoading ? (
                  <div className="loading loading-spinner loading-sm text-primary" />
               ) : (
                  <AtomText
                     className="transition-transform duration-200 group-hover:scale-110"
                     fontSize="huge"
                     type="span"
                  >
                     {icon}
                  </AtomText>
               )}
            </div>

            {/* Content Section - Left Aligned */}
            <div className="flex-1 text-left">
               {/* Title */}
               <AtomText fontSize={size === 'sm' ? 'small' : 'medium'} isBold type="paragraph">
                  {content}
               </AtomText>

               {/* Description */}
               {variant === 'detailed' && description && (
                  <AtomText className="my-1 text-left" fontSize="small" type="paragraph">
                     {description}
                  </AtomText>
               )}
            </div>

            {/* Footer Section - Right Aligned at Bottom */}
            {footer && (
               <div className="mt-auto flex justify-end">
                  <AtomText fontSize={size === 'sm' ? 'small' : 'small'} isBold type="paragraph">
                     {footer}
                  </AtomText>
               </div>
            )}

            {/* Action Button */}
            {(variant === 'action' || actionButton) && (
               <div className="mt-2">
                  <AtomButton
                     extraClassName="w-full"
                     href={actionButton?.href}
                     onClick={actionButton?.onClick || onClick}
                     size={actionButton?.size || 'sm'}
                     type={actionButton?.href ? 'link' : 'button'}
                     variant={actionButton?.variant || 'PRIMARY'}
                  >
                     {actionButton?.text || 'Action'}
                  </AtomButton>
               </div>
            )}

            {/* Loading overlay */}
            {isLoading && (
               <div className="bg-base-100/50 absolute inset-0 flex items-center justify-center rounded-lg backdrop-blur-sm">
                  <div className="flex flex-col items-center gap-2">
                     <div className="loading loading-spinner loading-md text-primary" />
                     <AtomText fontSize="small" type="paragraph">
                        {effectiveLoadingText}
                     </AtomText>
                  </div>
               </div>
            )}
         </div>
      </div>
   )
}
