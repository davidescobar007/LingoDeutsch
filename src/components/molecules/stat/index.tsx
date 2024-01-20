import { FunctionComponent } from "react"

type TMoleculeStat = {
   extraClassName?: string
   handleClick?: () => void
   emoji?: string
   title: string
   text: string
}

const emptyFunction = () => {}

const MoleculeStat: FunctionComponent<TMoleculeStat> = ({
   extraClassName = "",
   handleClick = emptyFunction,
   emoji = "",
   title,
   text
}) => {
   return (
      <div
         className={`stat border-accent mr-3 w-48 rounded-2xl border-2 p-1 hover:bg-gray-200  lg:w-64 ${extraClassName}`}
         onClick={() => handleClick()}
      >
         <div className="stat-figure text-primary hidden text-xl lg:block">{emoji}</div>
         <div className="stat-value  text-primary block truncate text-xl ">{title}</div>
         <div className="stat-desc font-semibold text-gray-700">{text}</div>
      </div>
   )
}

export default MoleculeStat
