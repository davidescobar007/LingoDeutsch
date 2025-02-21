import React from 'react'

import { AtomButton, AtomTitle } from '@/components/atoms'

type TMoleculeCallToActionCardProps = {
   icon?: React.ReactNode
   isIconFilled?: boolean
   title: string
   content: string
   dinamicContent?: React.ReactNode
   buttonProps: {
      buttonText: string
      buttonIcon?: React.ReactNode
      isBlock: boolean
      typeOf?: 'PRIMARY' | 'INFO' | 'SECONDARY' | 'ACCENT' | 'WARNING'
   }
}

export const MoleculeCallToActionCard = ({
   icon = null,
   isIconFilled = false,
   title,
   content,
   dinamicContent = null,
   buttonProps: { buttonText, buttonIcon, isBlock, typeOf = 'PRIMARY' }
}: TMoleculeCallToActionCardProps) => {
   return (
      <div className="outlinedCard">
         {icon && (
            <span className="flex items-center justify-center text-4xl">
               {isIconFilled ? (
                  <div className="bg-secondary text-primary rounded-full p-3">{icon}</div>
               ) : (
                  <div className="text-primary">{icon}</div>
               )}
               {/* <div className="bg-secondary text-primary rounded-full p-3">{icon}</div> */}
            </span>
         )}
         <div className="ml-5 w-full">
            <AtomTitle type="h4">{title}</AtomTitle>
            <p className="w-full">{content}</p>
            <div className="w-full">{dinamicContent}</div>

            <AtomButton isBlock={isBlock} typeOf={typeOf}>
               {buttonText}
               {buttonIcon ?? <span className="text-lg">{buttonIcon}</span>}
            </AtomButton>
         </div>
      </div>
   )
}
