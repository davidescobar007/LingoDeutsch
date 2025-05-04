'use client'
import { ReactNode } from 'react'

const Drawer = ({ children, sideBar }: { children: ReactNode; sideBar: ReactNode }) => {
   return (
      <div className="drawer md:drawer-open">
         <input className="drawer-toggle" id="lingo-drawer" type="checkbox" />
         <div className="drawer-content bg-blue-4000 flex justify-center px-4 pt-8 md:px-12 2xl:px-48">
            {children}
         </div>
         <div className="drawer-side">
            <label aria-label="close sidebar" className="drawer-overlay" htmlFor="lingo-drawer" />
            {sideBar}
         </div>
      </div>
   )
}

export default Drawer
