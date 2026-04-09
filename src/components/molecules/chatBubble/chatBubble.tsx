import React from 'react'

type TMoleculeChatBubble = {
   align?: 'left' | 'right'
   avatar?: string
   message: string
   name: string
}

export const MoleculeChatBubble = ({ align = 'left', avatar = '💬', message, name }: TMoleculeChatBubble) => {
   const isLeft = align === 'left'

   return (
      <div className={`chat ${isLeft ? 'chat-start' : 'chat-end'} my-3`}>
         <div className="chat-image avatar">
            <div
               className={`${isLeft ? 'bg-primary/10' : 'bg-base-200'} flex h-10 w-10 items-center justify-center rounded-full`}
            >
               <span className="text-xl">{avatar}</span>
            </div>
         </div>
         <div className="chat-header opacity-70">
            <span className="text-xs font-medium">{name}</span>
         </div>
         <div className={`chat-bubble ${isLeft ? 'chat-bubble-primary' : ''}`}>
            <span className="text-sm">{message}</span>
         </div>
      </div>
   )
}
