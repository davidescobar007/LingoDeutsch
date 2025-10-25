'use client'

import Image from 'next/image'

export const OrganismFooterSection = () => {
   return (
      <footer className="footer footer-center bg-base-200 text-base-content rounded p-10">
         <nav className="grid grid-flow-col gap-4">
            <a className="link link-hover">About us</a>
            <a className="link link-hover">Contact</a>
            <a className="link link-hover">Terms of use</a>
            <a className="link link-hover">Privacy policy</a>
         </nav>
         <nav>
            <aside>
               <Image
                  alt="heart with german flag colors"
                  height={50}
                  priority
                  src="/images/logo4.svg"
                  width={60}
               />
            </aside>
         </nav>
         <aside>
            <p>Copyright © 2025 - All right reserved</p>
         </aside>
      </footer>
   )
}
