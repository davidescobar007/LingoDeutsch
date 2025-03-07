import React, { FunctionComponent } from 'react'

import { AtomButton, AtomText, AtomTitle } from '@/components/atoms'

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
      typeOf?: 'PRIMARY' | 'INFO' | 'SECONDARY' | 'ACCENT' | 'WARNING' | 'OUTLINE'
   }
}

export const MoleculeCallToActionCard: FunctionComponent<TMoleculeCallToActionCardProps> = ({
   icon = null,
   isIconFilled = false,
   title,
   content,
   dinamicContent = null,
   buttonProps: { buttonText, buttonIcon, isBlock, typeOf = 'PRIMARY' }
}) => {
   return (
      <div className="card-outlined">
         {icon && (
            <span className="flex items-center justify-center">
               {isIconFilled ? (
                  <div className="bg-secondary text-primary rounded-full p-3">{icon}</div>
               ) : (
                  <div className="text-primary">{icon}</div>
               )}
            </span>
         )}
         <div className="ml-5 w-full">
            <AtomTitle type="h4">{title}</AtomTitle>
            <AtomText type="paragraph">{content}</AtomText>
            <div className="w-full">{dinamicContent}</div>

            <AtomButton isBlock={isBlock} variant={typeOf}>
               {buttonText}
               {buttonIcon ?? <span>{buttonIcon}</span>}
            </AtomButton>
         </div>
      </div>
   )
}
