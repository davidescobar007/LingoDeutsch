"use client"
import { Link, usePathname } from "@/navigation"

const selectedItem = "border-2 rounded-xl p-1 border-accent bg-secondary hover:bg-secondary"

const Footer = () => {
   const pathname = usePathname()
   const language = pathname.split("/")[1]
   return (
      <footer className="md:hidden">
         <div className="btm-nav">
            <Link href="/learn">
               <span className={`${pathname === `/${language}/learn` && selectedItem} text-3xl`}>📖</span>
            </Link>
            <Link href="/practice">
               <span className={`${pathname === `/${language}/practice` && selectedItem} text-3xl`}>💪</span>
            </Link>
            <Link href="/score">
               <span className={`${pathname === `/${language}/score` && selectedItem} text-3xl`}>🏆</span>
            </Link>
         </div>
      </footer>
   )
}

export default Footer
