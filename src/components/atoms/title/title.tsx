import { FunctionComponent, ReactNode } from 'react'

type TAtomTitle = {
   children: ReactNode
   type?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5'
   extraClassName?: string
}
export const AtomTitle: FunctionComponent<TAtomTitle> = ({ children, type = 'h2', extraClassName = '' }) => {
   const title = {
      h1: <h1 className={`text-3xl font-bold text-base-content mb-4 ${extraClassName}`}>{children}</h1>,
      h2: <h2 className={`text-2xl font-semibold text-base-content mb-3 ${extraClassName}`}>{children}</h2>,
      h3: <h3 className={`text-lg font-semibold text-base-content mb-3 ${extraClassName}`}>{children}</h3>,
      h4: <h4 className={`text-base font-semibold text-base-content mb-2 ${extraClassName}`}>{children}</h4>,
      h5: <h5 className={`text-sm font-medium text-base-content mb-2 ${extraClassName}`}>{children}</h5>
   }
   return title[type]
}
