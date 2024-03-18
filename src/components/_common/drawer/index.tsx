"use client"
import { ReactNode } from "react"

const Drawer = ({ children, sideBar }: { children: ReactNode; sideBar: ReactNode }) => {
   return (
      <div className="drawer md:drawer-open">
         <input className="drawer-toggle" id="lingo-drawer" type="checkbox" />
         <div className="drawer-content bg-blue-4000 flex justify-center md:pt-10">
            {/* Page content here */ children}
            {/* <label className="btn btn-primary drawer-button md:hidden" htmlFor="lingo-drawer">
               Open drawer
            </label> */}
         </div>
         <div className="drawer-side">
            <label aria-label="close sidebar" className="drawer-overlay" htmlFor="lingo-drawer" />
            {sideBar}
         </div>
      </div>
   )
}

export default Drawer
