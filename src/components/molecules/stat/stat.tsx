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
      <div className="stats  text-primary-content w-full shadow">
         <div className="stat w-1/2">
            <div className="stat-figure text-primary">
               <svg
                  className="inline-block h-8 w-8 stroke-current"
                  fill="none"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
               >
                  <path
                     d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     strokeWidth="2"
                  />
               </svg>
            </div>
            <div className="stat-title">{title1}</div>
            <div className="stat-value">{value1}</div>
            <div className="stat-desc">{text1}</div>
         </div>

         <div className="stat w-1/2">
            <div className="stat-title">{title2}</div>
            <div className="stat-value">{value2}</div>
            <div className="stat-desc">{text2}</div>
         </div>
      </div>
   )
}
