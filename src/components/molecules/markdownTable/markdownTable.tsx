'use client'
import { ReactNode } from 'react'

interface MarkdownTableProps {
   children: ReactNode
}

export const MarkdownTable = ({ children }: MarkdownTableProps) => {
   return (
      <div className="markdown-table-wrapper my-6 overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
         <table className="table-zebra table w-full !text-base">{children}</table>
      </div>
   )
}
