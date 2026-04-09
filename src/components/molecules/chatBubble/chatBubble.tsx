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
      <div className={`chat ${isLeft ? 'chat-start' : 'chat-end'} my-2`}>
         <div className="chat-image avatar">
            <div
               className={`${
                  isLeft ? 'bg-primary/10' : 'bg-base-200'
               } flex h-8 w-8 items-center justify-center rounded-full`}
            >
               <span className="flex items-center justify-center text-xl">{avatar}</span>
            </div>
         </div>
         <div className="chat-header mb-0.5 leading-none">
            <span className="text-xs font-medium opacity-70">{name}</span>
         </div>
         <div className={`chat-bubble px-3 py-2 ${isLeft ? 'chat-bubble-primary' : ''}`}>
            <span className="text-sm">{message}</span>
         </div>
      </div>
   )
}
