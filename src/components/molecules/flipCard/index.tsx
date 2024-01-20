import { FunctionComponent } from "react"

type TMoleculeFlipCard = {
   extraClassName?: string
   message: string
}

const MoleculeFlipCard: FunctionComponent<TMoleculeFlipCard> = ({ extraClassName = "", message, ...rest }) => {
   return (
      <div
         className={`${extraClassName} card border-accent bg-secondary text-neutral-content w-full border-2 shadow-md`}
         {...rest}
      >
         <div className="card-body items-center text-center">
            <h2 className="card-title text-gray-600">{message}</h2>
         </div>
      </div>
   )
}

export default MoleculeFlipCard
