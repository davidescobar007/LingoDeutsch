import { FunctionComponent, ReactNode } from 'react'

type TAtomTitle = {
   children: ReactNode
   type?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5'
   extraClassName?: string
}
export const AtomTitle: FunctionComponent<TAtomTitle> = ({ children, type = 'h2', extraClassName = '' }) => {
   const cssClass = `font-semibold mb-3 ${extraClassName}`

   const title = {
      h1: <h1 className={`text-xl font-semibold ${cssClass}`}>{children}</h1>,
      h2: <h2 className={`${cssClass} text-xl`}>{children}</h2>,
      h3: <h3 className={`${cssClass} text-lg `}>{children}</h3>,
      h4: <h4 className={`${cssClass} text-base`}>{children}</h4>,
      h5: <h5 className={`${cssClass} text-base`}>{children}</h5>
   }
   return title[type]
}
