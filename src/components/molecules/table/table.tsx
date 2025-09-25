'use client'
import { ChangeEvent, FunctionComponent, useMemo, useState } from 'react'
import {
   ColumnDef,
   ColumnFiltersState,
   flexRender,
   getCoreRowModel,
   getFilteredRowModel,
   getPaginationRowModel,
   getSortedRowModel,
   SortingState,
   useReactTable
} from '@tanstack/react-table'

import { AtomButton, AtomInput, AtomText, AtomTitle, Icon } from '@/components/atoms'

type TAtomTable = {
   columns?: ColumnDef<any, any>[]
   data?: any[]
   displayHeader?: boolean
   extraClassName?: string
   title?: string
   initialSorting?: SortingState // Added initialSorting prop
}

const emptyArray: any = []

export const MoleculeTable: FunctionComponent<TAtomTable> = ({
   columns = emptyArray,
   data = emptyArray,
   displayHeader = true,
   extraClassName = '',
   title = null,
   initialSorting = undefined
}) => {
   const [sorting, setSorting] = useState<SortingState>(() => {
      if (initialSorting) {
         return initialSorting
      }
      if (columns && columns.length > 0) {
         const firstColumn = columns[0]
         let columnIdToUse: string | undefined = firstColumn.id

         if (!columnIdToUse && 'accessorKey' in firstColumn && typeof firstColumn.accessorKey === 'string') {
            columnIdToUse = firstColumn.accessorKey
         }

         if (columnIdToUse) {
            return [{ id: columnIdToUse, desc: false }] // Changed to asc (alphabetical)
         }
      }
      return [] // Default to no sorting
   })
   const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
   const [globalFilter, setGlobalFilter] = useState('')

   const memoizedColumns = useMemo(() => columns, [columns])
   const memoizedData = useMemo(() => data, [data])

   const table = useReactTable({
      data: memoizedData,
      columns: memoizedColumns,
      state: {
         sorting,
         columnFilters,
         globalFilter
      },
      onSortingChange: setSorting,
      onColumnFiltersChange: setColumnFilters,
      onGlobalFilterChange: setGlobalFilter,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      initialState: {
         pagination: {
            pageSize: 5
         }
      }
   })
   return (
      <div className="overflow-x-auto rounded-xl bg-white p-4">
         {title && (
            <AtomTitle extraClassName="mb-4" type="h5">
               {title}
            </AtomTitle>
         )}
         <div className="mb-4 flex justify-end">
            <AtomInput
               onChange={(event: ChangeEvent<HTMLInputElement>) => setGlobalFilter(String(event.target.value))}
               placeholder="Buscar"
               value={globalFilter ?? ''}
            />
         </div>
         <table className={`table ${extraClassName}`}>
            {displayHeader && memoizedColumns.length > 0 && (
               <thead>
                  {table.getHeaderGroups().map((headerGroup) => (
                     <tr key={headerGroup.id}>
                        {headerGroup.headers.map((header: any) => {
                           return (
                              <th
                                 className={`${
                                    header.column.columnDef.classNames || ''
                                 } cursor-pointer select-none`}
                                 key={header.id}
                                 onClick={header.column.getToggleSortingHandler()}
                              >
                                 <AtomText className="flex items-center" type="span">
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                    {{
                                       asc: <Icon icon="move-up" iconSize="small" iconState="info" />,
                                       desc: <Icon icon="move-down" iconSize="small" iconState="info" />
                                    }[header.column.getIsSorted() as string] ?? null}
                                 </AtomText>
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
            </tbody>
         </table>
         <div className="pagination mt-4 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
               {/* Pagination buttons with numbers */}
               {table.getPageCount() > 1 &&
                  [...Array(table.getPageCount()).keys()].map((page) => (
                     <AtomButton
                        disabled={table.getState().pagination.pageIndex === page}
                        extraClassName={table.getState().pagination.pageIndex === page ? 'btn-active' : ''}
                        key={page}
                        onClick={() => table.setPageIndex(page)}
                        size="sm"
                     >
                        {page + 1}
                     </AtomButton>
                  ))}
            </div>
            <span className="flex items-center gap-1">
               <div>Pagina</div>
               <strong>
                  {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
               </strong>
            </span>
            <select
               className="select select-bordered"
               onChange={(e) => {
                  table.setPageSize(Number(e.target.value))
               }}
               value={table.getState().pagination.pageSize}
            >
               {[10, 20, 50].map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                     {pageSize}
                  </option>
               ))}
            </select>
         </div>
      </div>
   )
}
