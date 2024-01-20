import { FunctionComponent, ReactNode } from "react"

type TAtomBadge = {
   children: ReactNode
   type?: string
}

const AtomBadge: FunctionComponent<TAtomBadge> = ({ children, type = "primary" }) => {
   return <div className={`badge badge-${type} mr-2`}>{children}</div>
}

export default AtomBadge
