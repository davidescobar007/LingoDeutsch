import { FunctionComponent, ReactNode } from 'react'

type TAtomTitle = {
   children: ReactNode
   type?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5'
   extraClassName?: string
}
export const AtomTitle: FunctionComponent<TAtomTitle> = ({ children, type = 'h2', extraClassName = '' }) => {
   const title = {
      h1: <h1 className={`text-base-content mb-4 text-3xl font-bold ${extraClassName}`}>{children}</h1>,
      h2: <h2 className={`text-base-content mb-3 text-2xl font-semibold ${extraClassName}`}>{children}</h2>,
      h3: <h3 className={`text-base-content mb-3 text-lg font-semibold ${extraClassName}`}>{children}</h3>,
      h4: <h4 className={`text-base-content mb-2 text-base font-semibold ${extraClassName}`}>{children}</h4>,
      h5: <h5 className={`text-base-content mb-2 text-sm font-medium ${extraClassName}`}>{children}</h5>
   }
   return title[type]
}
