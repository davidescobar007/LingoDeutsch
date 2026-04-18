'use client'

import React, { useEffect, useMemo, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { PluggableList } from 'unified'

import { AtomText } from '@/components/atoms'

type TMoleculeTypewriterMarkdown = {
   children: string
   components?: React.ComponentProps['components']
   delay?: number
   remarkPlugins?: PluggableList
   onComplete?: () => void
}

export const MoleculeTypewriterMarkdown = ({
   children,
   components,
   delay = 120,
   remarkPlugins,
   onComplete
}: TMoleculeTypewriterMarkdown) => {
   const blocks = useMemo(() => {
      return children
         .split(/\n\n+/)
         .map((block) => block.trim())
         .filter((block) => block.length > 0)
   }, [children])

   const [visibleCount, setVisibleCount] = useState(0)
   const [isComplete, setIsComplete] = useState(false)

   useEffect(() => {
      setVisibleCount(0)
      setIsComplete(false)
   }, [children])

   useEffect(() => {
      if (visibleCount < blocks.length) {
         const timer = setTimeout(() => {
            setVisibleCount((prev) => prev + 1)
         }, delay)

         return () => clearTimeout(timer)
      } else if (!isComplete && blocks.length > 0) {
         setIsComplete(true)
         onComplete?.()
      }
   }, [visibleCount, blocks.length, delay, isComplete, onComplete])

   const visibleBlocks = blocks.slice(0, visibleCount)

   if (blocks.length === 0) {
      return null
   }

   return (
      <div className="typewriter-container">
         {visibleBlocks.map((block, index) => (
            <div className="typewriter-block" key={`${index}-${block.slice(0, 20)}`}>
               <ReactMarkdown components={components} remarkPlugins={remarkPlugins}>
                  {block}
               </ReactMarkdown>
            </div>
         ))}
         {!isComplete && <span aria-hidden="true" className="typewriter-cursor" />}
         {isComplete && blocks.length === 0 && (
            <AtomText fontSize="small" type="paragraph">
               No content available.
            </AtomText>
         )}
      </div>
   )
}
