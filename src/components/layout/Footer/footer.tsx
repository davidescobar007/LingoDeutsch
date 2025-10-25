'use client'
import { BookIcon, BrainIcon, HomeIcon } from 'lucide-react'

import { Link, usePathname } from '@/navigation'

const selectedItem = 'border-2 rounded-xl p-1 border-accent bg-secondary hover:bg-secondary'

const Footer = () => {
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

export default Footer
