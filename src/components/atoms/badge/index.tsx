import { FunctionComponent, ReactNode } from 'react'

type TAtomBadge = {
   children: ReactNode
   type?: string
}

export const AtomBadge: FunctionComponent<TAtomBadge> = ({ children, type = 'primary' }) => {
   return <div className={`badge badge-${type} mr-2`}>{children}</div>
}
