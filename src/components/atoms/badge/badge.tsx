import { FunctionComponent, ReactNode } from 'react'

type TAtomBadge = {
   children: ReactNode
   type?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info'
}

export const AtomBadge: FunctionComponent<TAtomBadge> = ({ children, type = 'primary' }) => {
   return <div className={`badge badge-${type} `}>{children}</div>
}
