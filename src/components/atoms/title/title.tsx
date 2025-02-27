import { FunctionComponent, ReactNode } from 'react'

type TAtomTitle = {
   children: ReactNode
   type?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5'
   extraClassName?: string
}
export const AtomTitle: FunctionComponent<TAtomTitle> = ({ children, type = 'h2', extraClassName = '' }) => {
   const cssClass = `font-semibold mb-3 ${extraClassName}`

   const title = {
      h1: <h1 className={`font-extrabold ${cssClass}`}>{children}</h1>,
      h2: <h2 className={`${cssClass} `}>{children}</h2>,
      h3: <h3 className={`${cssClass} `}>{children}</h3>,
      h4: <h4 className={`${cssClass} `}>{children}</h4>,
      h5: <h5 className={`${cssClass} `}>{children}</h5>
   }
   return title[type]
}
