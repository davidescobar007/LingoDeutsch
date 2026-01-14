'use client'
import { FunctionComponent, ReactNode } from 'react'
import { useTranslations } from 'next-intl'

import { AtomText, AtomTitle } from '@/components/atoms'

type MoleculeLockedOverlayProps = {
   children: ReactNode
   title?: string
   description?: string
   ctaText?: string
   ctaHref?: string
   showOverlay?: boolean
   blurIntensity?: 'light' | 'medium' | 'heavy'
   variant?: 'default' | 'compact'
   extraClassName?: string
}

export const MoleculeLockedOverlay: FunctionComponent<MoleculeLockedOverlayProps> = ({
   children,
   title,
   description,
   ctaText,
   ctaHref = '/login',
   showOverlay = true,
   blurIntensity = 'medium',
   variant = 'default',
   extraClassName = ''
}) => {
   const t = useTranslations('locked')

   const blurClasses = {
      light: 'blur-[2px]',
      medium: 'blur-[4px]',
      heavy: 'blur-[8px]'
   }

   if (!showOverlay) {
      return <div className={extraClassName}>{children}</div>
   }

   const isCompact = variant === 'compact'

   return (
      <div className={`container-card relative ${extraClassName}`}>
         {/* Blurred content */}
         <div className={`pointer-events-none select-none ${blurClasses[blurIntensity]}`}>{children}</div>

         {/* Lock overlay */}
         <div className="bg-base-100/60 absolute inset-0 flex flex-col items-center justify-center rounded-2xl p-4 backdrop-blur-sm">
            {isCompact ? (
               <div className="flex items-center gap-3 px-4 py-2">
                  <span className="text-2xl">🔒</span>
                  <div className="flex flex-col items-start gap-0.5">
                     <AtomText className="font-semibold" fontSize="medium">
                        {title || t('defaultTitle')}
                     </AtomText>
                     <AtomText fontSize="small" isThin>
                        {description || t('defaultDescription')}
                     </AtomText>
                  </div>
               </div>
            ) : (
               <div className="flex flex-col items-center gap-4 p-6 text-center">
                  <span className="text-4xl">🔒</span>
                  <AtomTitle extraClassName="!text-xl" type="h3">
                     {title || t('defaultTitle')}
                  </AtomTitle>
                  <AtomText className="max-w-xs" fontSize="medium">
                     {description || t('defaultDescription')}
                  </AtomText>
               </div>
            )}
         </div>
      </div>
   )
}
