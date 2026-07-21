'use client'
import { ReactNode } from 'react'

const OrganismDrawer = ({ children, sideBar }: { children: ReactNode; sideBar: ReactNode }) => {
   return (
      <div className="drawer md:drawer-open main-area-content h-screen max-w-[1920px] overflow-hidden">
         <input className="drawer-toggle" id="lingo-drawer" type="checkbox" />
         <div className="drawer-content bg-blue-4000 3xl:px-52 flex justify-center overflow-y-auto px-4 pb-20 pt-8 md:px-12 2xl:px-40">
            {children}
         </div>
         <div className="drawer-side">
            <label aria-label="close sidebar" className="drawer-overlay" htmlFor="lingo-drawer" />
            {sideBar}
         </div>
      </div>
   )
}

export default OrganismDrawer
