import { FunctionComponent, ReactNode } from 'react'

import { AtomTitle } from '@/components/atoms'

type TMoleculeCollapse = {
   children: ReactNode
   title: string
}
const MoleculeCollapse: FunctionComponent<TMoleculeCollapse> = ({ title, children }) => {
   return (
      <div className="collapse-arrow collapse my-2 border shadow-md">
         <input type="checkbox" />
         <div className="collapse-title text-xl font-medium">
            <AtomTitle type="h3">{title}</AtomTitle>
         </div>
         <div className="collapse-content">{children}</div>
      </div>
   )
}

export default MoleculeCollapse
