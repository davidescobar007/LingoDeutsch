import React, { ReactNode } from 'react'

import { AtomText } from '@/components/atoms'

type TMoleculeReveal = {
   children: ReactNode
   title: string
}

export const MoleculeReveal = ({ children, title }: TMoleculeReveal) => {
   return (
      <div className="collapse-arrow border-base-300 collapse my-2 border">
         <input type="checkbox" />
         <div className="collapse-title font-medium">
            <AtomText color="primary" fontSize="small">
               {title}
            </AtomText>
         </div>
         <div className="collapse-content">
            <AtomText fontSize="small" type="paragraph">
               {children}
            </AtomText>
         </div>
      </div>
   )
}
