import { FunctionComponent } from 'react'

type MoleculeScoreProps = {
   title: string
   textContent: string
   buttonText?: string
   onButtonClick?: () => void
   className?: string
}

const defaultOnButtonClick = () => {}

export const MoleculeSimpleCard: FunctionComponent<MoleculeScoreProps> = ({
   title,
   textContent,
   buttonText = '',
   onButtonClick = defaultOnButtonClick,
   className = ''
}) => {
   return (
      <div className={`card bg-base-100 mx-10 w-96 min-w-72 shadow-xl ${className}`}>
         <div className="card-body">
            <h2 className="card-title">{title}</h2>
            <p>{textContent}</p>
            <div className="card-actions justify-end">
               {buttonText && (
                  <button className="btn" onClick={onButtonClick}>
                     {buttonText}
                  </button>
               )}
            </div>
         </div>
      </div>
   )
}
