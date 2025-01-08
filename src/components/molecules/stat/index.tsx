import { FunctionComponent } from 'react'

type TMoleculeStat = {
   title1: string
   text1: string
   value1: string
   title2: string
   text2: string
   value2: string
}

export const MoleculeStat: FunctionComponent<TMoleculeStat> = ({
   text1,
   title1,
   value1,
   text2,
   title2,
   value2
}) => {
   return (
      <div className="stats bg-primary text-primary-content shadow">
         <div className="stat w-60">
            <div className="stat-title">{title1}</div>
            <div className="stat-value">{value1}</div>
            <div className="stat-actions">
               <button className="btn btn-sm btn-secondary">{text1}</button>
            </div>
         </div>

         <div className="stat w-60">
            <div className="stat-title">{title2}</div>
            <div className="stat-value">{value2}</div>
            <div className="stat-actions">
               <button className="btn btn-sm">{text2}</button>
            </div>
         </div>
      </div>
   )
}
