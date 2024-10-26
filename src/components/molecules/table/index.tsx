import { FunctionComponent } from 'react'
import { useTranslation } from 'react-i18next'
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'

import { AtomTitle } from '@/components/atoms'

type TAtomTable = {
   displayHeader?: boolean
   columns?: { header: string; accessorKey: string; cell?: any; classNames?: string }[]
   data?: any[]
   extraClassName?: string
   isDelete?: boolean
   title?: string
}

const emptyArray: any = []

const MoleculeTable: FunctionComponent<TAtomTable> = ({
   displayHeader = true,
   columns = emptyArray,
   data = emptyArray,
   extraClassName = '',
   isDelete = false,
   title = null
}) => {
   const { t } = useTranslation()
   const table = useReactTable({ data, columns, getCoreRowModel: getCoreRowModel() })
   return (
      <div className="overflow-x-auto">
         {title && (
            <AtomTitle extraClassName="text-lg mb-4 font-semibold underline underline-offset-4" type="h3">
               {title}
            </AtomTitle>
         )}
         <table className={`table ${extraClassName}`}>
            {displayHeader && columns.length > 0 && (
               <thead>
                  {table.getHeaderGroups().map((headerGroup) => (
                     <tr key={headerGroup.id}>
                        {headerGroup.headers.map((header: any) => {
                           return (
                              <th className={` text-sm ${header.column.columnDef.classNames}`} key={header.id}>
                                 {header.column.columnDef.header}
                              </th>
                           )
                        })}
                     </tr>
                  ))}
               </thead>
            )}
            <tbody>
               {table.getRowModel().rows.map((row) => (
                  <tr className="hover" key={row.id}>
                     {row.getVisibleCells().map((cell) => (
                        <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                     ))}
                  </tr>
               ))}
               {/* {data.map((item: any, rowIndex: number) => (
                  <tr className="hover" key={rowIndex}>
                     {displayIndex && <td>{rowIndex + 1}</td>}
                     {columns.length
                        ? columns.map((column: any, columnIndex: any) => <td key={columnIndex}>{item[column]}</td>)
                        : Object.keys(item).map((key) => <td key={key}>{String(item[key])}</td>)}
                     {isDelete && (
                        <td>
                           <span className="cursor-pointer text-lg text-red-600">
                              <HiTrash />
                           </span>
                        </td>
                     )}
                  </tr>
               ))} */}
            </tbody>
         </table>
      </div>
   )
}

export default MoleculeTable
