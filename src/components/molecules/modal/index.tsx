import { FunctionComponent, ReactNode } from "react"
import { useTranslations } from "next-intl"

import AtomButton from "@/components/atoms/button"
import AtomTitle from "@/components/atoms/title"

type TMoleculeModal = {
   children: ReactNode
   title?: string
}

const MoleculeModal: FunctionComponent<TMoleculeModal> = ({ title = "Ooopss!", children }) => {
   const t = useTranslations()
   return (
      <dialog className="modal" id="my_modal_1">
         <div className="modal-box">
            <AtomTitle extraClassName="mb-4" type="h3">
               {title}
            </AtomTitle>
            {children}
            <div className="modal-action">
               <form className="-my-2" method="dialog">
                  <AtomButton type="submit">{t("close")}</AtomButton>
               </form>
            </div>
         </div>
      </dialog>
   )
}

export default MoleculeModal
