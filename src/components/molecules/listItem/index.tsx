import { FunctionComponent, ReactNode } from "react"

import AtomTitle from "@/components/atoms/title"

type TMoleculeListItem = {
   children: ReactNode
   selected: boolean
}

const MoleculeListItem: FunctionComponent<TMoleculeListItem> = ({ children, selected, ...props }) => {
   return (
      <AtomTitle
         extraClassName={`text-xl hover:bg-gray-200 cursor-pointer rounded-2xl select-none  p-2 font-medium flex !text-myCustom items-center ${
            selected && "border-2 border-accent bg-secondary hover:bg-secondary"
         }`}
         type="h2"
         {...props}
      >
         {children}
      </AtomTitle>
   )
}

export default MoleculeListItem
