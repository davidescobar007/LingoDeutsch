'use client'

import React from 'react'
import ReactMarkdown, { Components } from 'react-markdown'
import remarkGfm from 'remark-gfm'

type TMoleculeChatMarkdown = {
   children: string
}

const components: Components = {
   a: ({ children, href, ...props }) => (
      <a
         {...props}
         className="link link-primary break-words"
         href={href}
         rel="noopener noreferrer"
         target="_blank"
      >
         {children}
      </a>
   ),
   p: ({ children, ...props }) => (
      <p {...props} className="mb-2 text-base leading-relaxed last:mb-0">
         {children}
      </p>
   ),
   strong: ({ children, ...props }) => (
      <strong {...props} className="font-semibold">
         {children}
      </strong>
   ),
   em: ({ children, ...props }) => (
      <em {...props} className="italic">
         {children}
      </em>
   ),
   ul: ({ children, ...props }) => (
      <ul {...props} className="mb-2 ml-4 list-disc text-base last:mb-0">
         {children}
      </ul>
   ),
   ol: ({ children, ...props }) => (
      <ol {...props} className="mb-2 ml-4 list-decimal text-base last:mb-0">
         {children}
      </ol>
   ),
   li: ({ children, ...props }) => (
      <li {...props} className="mb-1 last:mb-0">
         {children}
      </li>
   ),
   code: ({ children, className, ...props }) => {
      const isBlock = typeof className === 'string' && className.includes('language-')
      if (isBlock) {
         return (
            <code {...props} className={`${className ?? ''} text-xs`}>
               {children}
            </code>
         )
      }
      return (
         <code {...props} className="bg-base-300 rounded px-1 py-0.5 text-xs">
            {children}
         </code>
      )
   },
   pre: ({ children, ...props }) => (
      <pre {...props} className="bg-base-300 mb-2 overflow-x-auto rounded p-2 text-xs last:mb-0">
         {children}
      </pre>
   ),
   h1: ({ children, ...props }) => (
      <h1 {...props} className="mb-2 text-base font-semibold last:mb-0">
         {children}
      </h1>
   ),
   h2: ({ children, ...props }) => (
      <h2 {...props} className="mb-2 text-base font-semibold last:mb-0">
         {children}
      </h2>
   ),
   h3: ({ children, ...props }) => (
      <h3 {...props} className="mb-1 text-sm font-semibold last:mb-0">
         {children}
      </h3>
   ),
   h4: ({ children, ...props }) => (
      <h4 {...props} className="mb-1 text-sm font-medium last:mb-0">
         {children}
      </h4>
   ),
   blockquote: ({ children, ...props }) => (
      <blockquote
         {...props}
         className="border-primary/40 mb-2 border-l-4 pl-3 text-base italic opacity-80 last:mb-0"
      >
         {children}
      </blockquote>
   ),
   table: ({ children, ...props }) => (
      <div className="mb-2 overflow-x-auto last:mb-0">
         <table {...props} className="table-zebra table-xs table">
            {children}
         </table>
      </div>
   ),
   hr: () => <hr className="border-base-300 my-3" />
}

export const MoleculeChatMarkdown = ({ children }: TMoleculeChatMarkdown) => {
   if (!children || !children.trim()) return null
   return (
      <div className="chat-markdown text-base">
         <ReactMarkdown components={components} remarkPlugins={[remarkGfm]}>
            {children}
         </ReactMarkdown>
      </div>
   )
}
