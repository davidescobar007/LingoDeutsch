import { FunctionComponent, ReactNode } from "react"
import { RiCloseFill } from "react-icons/ri"

import AtomTitle from "@/components/atoms/title"

type TMoleculeModal = {
   children: ReactNode
   title?: string
   id: string
   onCheckboxChange?: () => void
}

const emptyFunction = () => {}

const MoleculeModal: FunctionComponent<TMoleculeModal> = ({
   title = "",
   children,
   id,
   onCheckboxChange = emptyFunction
}) => {
   return (
      <>
         <input className="modal-open modal-toggle" id={id} onChange={onCheckboxChange} type="checkbox" />

         <label className="modal modal-middle sm:modal-middle cursor-pointer" htmlFor={id}>
            <div className="modal-box relative">
               <label className="absolute right-2 top-2 text-3xl" htmlFor={id}>
                  <RiCloseFill />
               </label>
               <AtomTitle extraClassName="text-2xl font-semibold mb-3" type="h3">
                  {title}
               </AtomTitle>
               {children}
            </div>
         </label>
      </>
   )
}

export default MoleculeModal
