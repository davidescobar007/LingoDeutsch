/* eslint-disable react/require-default-props */
import React, { FunctionComponent } from 'react'

import { AtomButton, AtomText, AtomTitle, Icon } from '@/components/atoms'

type AlertProps = {
   title?: string
   message: string
   onClick?: () => void
   type?: 'success' | 'error' | 'info' | 'warning'
   buttonText?: string
}
const defaultOnClick = () => {}

export const MoleculeAlert: FunctionComponent<AlertProps> = ({
   title,
   message,
   onClick = defaultOnClick,
   type = 'info',
   buttonText
}) => {
   const borderClass =
      {
         success: 'border-success',
         error: 'border-error',
         info: 'border-info',
         warning: 'border-warning'
      }[type] || 'border-info'

   return (
      <div className={`alert shadow-sm ${borderClass} my-2 p-2`} role="alert">
         <Icon icon={type === 'success' ? 'check' : type} iconState={type} />
         <div>
            {title && <AtomTitle type="h5">{title}</AtomTitle>}
            <AtomText fontSize="small" isThin>
               {message}
            </AtomText>
         </div>
         {buttonText && onClick && (
            <AtomButton onClick={onClick} type="button" variant="OUTLINE">
               {buttonText}
            </AtomButton>
         )}
      </div>
   )
}
