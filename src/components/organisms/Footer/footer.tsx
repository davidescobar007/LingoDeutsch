'use client'
import { BookIcon, BrainIcon, HomeIcon } from 'lucide-react'

import { Link, usePathname } from '@/navigation'

const OrganismFooter = () => {
   const pathname = usePathname()
   const language = pathname.split('/')[1]
   return (
      <footer className="md:hidden">
         <div className="btm-nav">
            <Link href={`/${language}/home`}>
               <HomeIcon size={20} />
               <span className={`btm-nav-label ${pathname === `/${language}/home` && 'active'}`}>Inicio</span>
            </Link>
            <Link href={`/${language}/practice`}>
               <BrainIcon size={20} />
               <span className={`btm-nav-label ${pathname === `/${language}/practice` && 'active'}`}>
                  Practica
               </span>
            </Link>
            <Link href={`/${language}/grammar`}>
               <BookIcon size={20} />
               <span className={`btm-nav-label ${pathname === `/${language}/grammar` && 'active'}`}>
                  Gramatica
               </span>
            </Link>
         </div>
      </footer>
   )
}

export default OrganismFooter
