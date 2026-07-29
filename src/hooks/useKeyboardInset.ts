'use client'

import { useEffect, useState } from 'react'

export const useKeyboardInset = (): number => {
   const [inset, setInset] = useState(0)

   useEffect(() => {
      if (typeof window === 'undefined') return
      const visualViewport = window.visualViewport
      if (!visualViewport) return

      const update = () => {
         const keyboardHeight = Math.max(0, window.innerHeight - visualViewport.height - visualViewport.offsetTop)
         setInset(keyboardHeight)
      }

      update()
      visualViewport.addEventListener('resize', update)
      visualViewport.addEventListener('scroll', update)
      return () => {
         visualViewport.removeEventListener('resize', update)
         visualViewport.removeEventListener('scroll', update)
      }
   }, [])

   return inset
}
