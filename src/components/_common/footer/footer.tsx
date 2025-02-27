'use client'
import { Link, usePathname } from '@/navigation'

const selectedItem = 'border-2 rounded-xl p-1 border-accent bg-secondary hover:bg-secondary'

const Footer = () => {
   const pathname = usePathname()
   const language = pathname.split('/')[1]
   return (
      <footer className="md:hidden">
         <div className="btm-nav">
            <Link href={`/${language}/learn`}>
               <span className={`${pathname === `/${language}/learn` && selectedItem}`}>📖</span>
            </Link>
            <Link href={`/${language}/practice`}>
               <span className={`${pathname === `/${language}/practice` && selectedItem}`}>💪</span>
            </Link>
            <Link href={`/${language}/grammar`}>
               <span className={`${pathname === `/${language}/grammar` && selectedItem}`}>📓</span>
            </Link>
         </div>
      </footer>
   )
}

export default Footer
