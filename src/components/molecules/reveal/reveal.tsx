import React, { ReactNode } from 'react'

import { AtomText } from '@/components/atoms'

type TMoleculeReveal = {
   children: ReactNode
   title: string
}

export const MoleculeReveal = ({ children, title }: TMoleculeReveal) => {
   return (
      <div className="collapse-arrow collapse my-4 border shadow-sm">
         <input type="checkbox" />
         <div className="collapse-title font-medium">
            <AtomText fontSize="small" isBold>
               {title}
            </AtomText>
         </div>
         <div className="collapse-content">
            <AtomText fontSize="small">{children}</AtomText>
         </div>
      </div>
   )
}
