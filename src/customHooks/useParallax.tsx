'use client'
import { useEffect, useState } from 'react'

export const useParallax = (speed: number = 0.5) => {
   const [offset, setOffset] = useState(0)

   useEffect(() => {
      const handleScroll = () => {
         setOffset(window.pageYOffset)
      }

      window.addEventListener('scroll', handleScroll)
      return () => window.removeEventListener('scroll', handleScroll)
   }, [])

   return offset * speed
}

export const useScrollProgress = () => {
   const [progress, setProgress] = useState(0)

   useEffect(() => {
      const handleScroll = () => {
         const windowHeight = window.innerHeight
         const documentHeight = document.documentElement.scrollHeight
         const scrollTop = window.pageYOffset

         const totalScroll = documentHeight - windowHeight
         const currentProgress = (scrollTop / totalScroll) * 100

         setProgress(currentProgress)
      }

      window.addEventListener('scroll', handleScroll)
      return () => window.removeEventListener('scroll', handleScroll)
   }, [])

   return progress
}

export const useInView = (threshold: number = 0.1) => {
   const [isInView, setIsInView] = useState(false)
   const [ref, setRef] = useState<HTMLElement | null>(null)

   useEffect(() => {
      if (!ref) return

      const observer = new IntersectionObserver(
         ([entry]) => {
            setIsInView(entry.isIntersecting)
         },
         { threshold }
      )

      observer.observe(ref)

      return () => {
         if (ref) observer.unobserve(ref)
      }
   }, [ref, threshold])

   return { ref: setRef, isInView }
}
