'use client'

import Image from 'next/image'

import { AtomText } from '@/components/atoms'
import { Link } from '@/navigation'

export const OrganismFooterSection = () => {
   return (
      <footer className="footer footer-center bg-base-200 text-base-content rounded p-10">
         <nav className="grid grid-flow-col gap-4">
            <Link className="link link-hover" href="/about">
               About us
            </Link>
            <Link className="link link-hover" href="/contact">
               Contact
            </Link>
            <Link className="link link-hover" href="/terms">
               Terms of use
            </Link>
            <Link className="link link-hover" href="/privacy">
               Privacy policy
            </Link>
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
            <AtomText>Copyright © 2025 - All right reserved</AtomText>
         </aside>
      </footer>
   )
}
