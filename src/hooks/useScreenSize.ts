import { useEffect, useState } from 'react'
import resolveConfig from 'tailwindcss/resolveConfig'

import tailwindConfig from '../../tailwind.config' // Adjust the path if necessary

const fullConfig = resolveConfig(tailwindConfig)
const breakpoints = fullConfig.theme.screens as Record<string, string> // e.g., { sm: '640px', md: '768px', lg: '1024px', xl: '1280px', '2xl': '1536px' }

interface ScreenSizeState {
   isMobile: boolean
   isTablet: boolean
   isDesktop: boolean
}

// Helper function to parse breakpoint values (e.g., '768px' -> 768)
const getBreakpointValue = (value: string): number => {
   if (!value) return 0 // Handle cases where a breakpoint might be missing
   return parseInt(value.replace('px', ''), 10)
}

const useScreenSize = (): ScreenSizeState => {
   // Check if window is defined (for SSR compatibility)
   const isClient = typeof window === 'object'

   const [screenSize, setScreenSize] = useState<ScreenSizeState>(() => {
      if (!isClient) return { isMobile: false, isTablet: false, isDesktop: true } // Default for SSR

      const width = window.innerWidth
      const mdBreakpoint = getBreakpointValue(breakpoints.md)
      const lgBreakpoint = getBreakpointValue(breakpoints.lg)

      const isMobile = width < mdBreakpoint
      const isTablet = width >= mdBreakpoint && width < lgBreakpoint
      const isDesktop = width >= lgBreakpoint

      return { isMobile, isTablet, isDesktop }
   })

   useEffect(() => {
      if (!isClient) {
         return // Don't run effect on server
      }

      const checkScreenSize = () => {
         const width = window.innerWidth
         const mdBreakpoint = getBreakpointValue(breakpoints.md) // Tablet breakpoint
         const lgBreakpoint = getBreakpointValue(breakpoints.lg) // Desktop breakpoint

         const isMobile = width < mdBreakpoint
         const isTablet = width >= mdBreakpoint && width < lgBreakpoint
         const isDesktop = width >= lgBreakpoint

         setScreenSize({ isMobile, isTablet, isDesktop })
      }

      // Add resize listener
      window.addEventListener('resize', checkScreenSize)

      // Cleanup listener on component unmount
      return () => {
         window.removeEventListener('resize', checkScreenSize)
      }
   }, [isClient]) // Re-run if isClient changes (though it shouldn't after mount)

   return screenSize
}

export default useScreenSize
