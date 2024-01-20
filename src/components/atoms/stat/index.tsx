import { FunctionComponent, ReactNode } from "react"

type TMoleculeCardsStats = {
   title: string
   content: string | ReactNode
   endContent: string
   extraClassName?: string
}

const AtomStat: FunctionComponent<TMoleculeCardsStats> = ({ title, content, endContent, extraClassName = "" }) => {
   return (
      <div className={`stat place-items-center p-1 py-3 ${extraClassName}`}>
         <div className="stat-title font-medium">{title}</div>
         <div className="stat-value text-accent cursor-pointer select-none">{content}</div>
         <div className="stat-desc mt-1 text-sm">{endContent}</div>
      </div>
   )
}

export default AtomStat
