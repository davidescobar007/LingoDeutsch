import React from 'react'

import { AtomText } from '@/components/atoms'

type TMoleculeChatBubble = {
   align?: 'left' | 'right'
   avatar?: string
   message: string
   name: string
}

export const MoleculeChatBubble = ({ align = 'left', avatar = '💬', message, name }: TMoleculeChatBubble) => {
   const alignmentClass = align === 'left' ? 'chat-start' : 'chat-end'

   return (
      <div className={`chat ${alignmentClass} my-2`}>
         <div className="chat-image avatar">
            <div className="bg-base-200 flex h-10 w-10 items-center justify-center rounded-full">
               <span className="text-xl">{avatar}</span>
            </div>
         </div>
         <div className="chat-header mb-1">
            <AtomText fontSize="small" isBold>
               {name}
            </AtomText>
         </div>
         <div className="chat-bubble">
            <AtomText fontSize="small">{message}</AtomText>
         </div>
      </div>
   )
}
