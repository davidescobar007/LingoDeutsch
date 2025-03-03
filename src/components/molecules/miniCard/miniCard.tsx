import React, { FunctionComponent } from 'react'

import { AtomText } from '@/components/atoms'

type MoleculeMiniCardProps = {
   icon: React.ReactNode
   content: string
   footer?: string | number
   className?: string
}

export const MoleculeMiniCard: FunctionComponent<MoleculeMiniCardProps> = ({
   icon,
   content,
   footer,
   className = ''
}) => {
   return (
      <div className={`card-outlined flex-col items-center justify-center ${className}`}>
         <span className="text-primary ">{icon}</span>

         <AtomText type="paragraph">{content}</AtomText>
         <AtomText isBold type="paragraph">
            {footer}
         </AtomText>
      </div>
   )
}
