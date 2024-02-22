import Link from "next/link"
import { usePathname } from "next/navigation"

const selectedItem = "border-2 rounded-xl p-1 border-accent bg-secondary hover:bg-secondary"

const Footer = () => {
   const pathname = usePathname()
   return (
      <footer className="md:hidden">
         <div className="btm-nav">
            <Link href="/learn">
               <span className={`${pathname === "/learn" && selectedItem} text-3xl`}>📖</span>
            </Link>
            <Link href="/practice">
               <span className={`${pathname === "/practice" && selectedItem} text-3xl`}>💪</span>
            </Link>
            <Link href="/score">
               <span className="text-3xl">🏆</span>
            </Link>
         </div>
      </footer>
   )
}

export default Footer
