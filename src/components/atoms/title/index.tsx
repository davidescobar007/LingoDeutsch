import { FunctionComponent, ReactNode } from "react"

type TAtomTitle = {
   children: ReactNode
   type?: "h1" | "h2" | "h3" | "h4" | "h5"
   extraClassName?: string
}
const AtomTitle: FunctionComponent<TAtomTitle> = ({ children, type = "h2", extraClassName = "" }) => {
   const cssClass = `font-semibold ${extraClassName}`

   const title = {
      h1: <h1 className={`text-2xl font-extrabold ${cssClass}`}>{children}</h1>,
      h2: <h2 className={`text-xl ${cssClass} `}>{children}</h2>,
      h3: <h3 className={`text-lg ${cssClass} `}>{children}</h3>,
      h4: <h4 className={`text-lg ${cssClass} `}>{children}</h4>,
      h5: <h5 className={`text-md ${cssClass} `}>{children}</h5>
   }
   return title[type]
}

export default AtomTitle
