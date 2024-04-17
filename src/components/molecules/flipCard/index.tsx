import { FunctionComponent } from "react"

import AtomTitle from "@/components/atoms/title"

type TMoleculeFlipCard = {
   germanText: string
   spanishText: string
}

const MoleculeFlipCard: FunctionComponent<TMoleculeFlipCard> = ({ germanText, spanishText }) => {
   return (
      <div className="flex justify-center">
         <label className="swap swap-flip text-center">
            <input type="checkbox" />
            <div className="swap-off card text-primary-content bg-secondary shadow-sm">
               <div className="card-body">
                  <AtomTitle type="h4">
                     <p>{germanText}</p>
                  </AtomTitle>
               </div>
            </div>
            <div className="swap-on card text-primary-content bg-secondary shadow-sm">
               <div className="card-body">
                  <AtomTitle type="h4">
                     <p>{spanishText}</p>
                  </AtomTitle>
               </div>
            </div>
         </label>
      </div>
   )
}

export default MoleculeFlipCard
