'use client'
import { LogOut } from 'lucide-react'

import { Link } from '@/navigation'

type OrganismProfileActionsProps = {
   extraClassName?: string
   onLogout: () => void
}

export const OrganismProfileActions = ({ extraClassName = '', onLogout }: OrganismProfileActionsProps) => {
   return (
      <div className={`text-center ${extraClassName}`}>
         <Link className="link link-primary inline-flex gap-2" href="/" onClick={onLogout}>
            <LogOut size={18} />
            Cerrar sesión
         </Link>
      </div>
   )
}
