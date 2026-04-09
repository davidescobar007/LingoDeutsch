import React, { ReactNode } from 'react'

type TMoleculeReveal = {
   children: ReactNode
   title: string
}

export const MoleculeReveal = ({ children, title }: TMoleculeReveal) => {
   return (
      <div className="collapse-arrow border-base-300 collapse my-2 border">
         <input type="checkbox" />
         <div className="collapse-title font-medium">
            <span className="text-primary text-sm font-semibold">{title}</span>
         </div>
         <div className="collapse-content">
            <p className="text-sm">{children}</p>
         </div>
      </div>
   )
}
