import { FunctionComponent, ReactNode } from "react"

import AtomTitle from "@/components/atoms/title"

type TMoleculeListItem = {
   children: ReactNode
   selected: boolean
}

const MoleculeListItem: FunctionComponent<TMoleculeListItem> = ({ children, selected }) => {
   return (
      <li
         className={`flex cursor-pointer select-none items-start rounded-2xl p-0 text-xl font-medium ${
            selected && "border-accent border-2"
         }`}
      >
         <AtomTitle extraClassName="hover:bg-none">{children}</AtomTitle>
      </li>
   )
}

export default MoleculeListItem
