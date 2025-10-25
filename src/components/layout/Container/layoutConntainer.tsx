import React, { ReactNode } from 'react'

const LayoutContainer = ({ children, isCenter = false }: { children: ReactNode; isCenter?: boolean }) => {
   return (
      <main className={`flex w-full flex-wrap ${isCenter ? 'justify-center' : 'justify-between'}`}>
         {children}
      </main>
   )
}

export default LayoutContainer
