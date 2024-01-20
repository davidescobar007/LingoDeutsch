import { FunctionComponent, ReactNode } from "react"

type AlertAtomProps = {
   readonly children: ReactNode
}

const AlertAtom: FunctionComponent<AlertAtomProps> = ({ children }) => {
   return (
      <div className="alert p-2 italic" role="alert">
         <svg
            className="stroke-info h-6 w-6 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
         >
            <path
               d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
               strokeLinecap="round"
               strokeLinejoin="round"
               strokeWidth="2"
            />
         </svg>
         <span className="text-sm">{children}</span>
      </div>
   )
}

export default AlertAtom
