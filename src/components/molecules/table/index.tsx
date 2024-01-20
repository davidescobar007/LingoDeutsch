import { FunctionComponent } from "react"
import { useTranslation } from "react-i18next"
import { HiTrash } from "react-icons/hi"

import Title from "@/components/atoms/title"

type TAtomTable = {
   displayHeader?: boolean
   displayIndex?: boolean
   columns?: []
   data?: []
   extraClassName?: string
   isDelete?: boolean
   title?: string
}

const emptyArray: any = []

const TableAtom: FunctionComponent<TAtomTable> = ({
   displayHeader = true,
   columns = emptyArray,
   data = emptyArray,
   displayIndex = false,
   extraClassName = "",
   isDelete = false,
   title = null
}) => {
   const { t } = useTranslation()
   return (
      <>
         {title && (
            <Title extraClassName="text-lg mb-4 font-semibold underline underline-offset-4" type="h3">
               {title}
            </Title>
         )}
         <table className={`table w-full ${extraClassName}`}>
            {displayHeader && columns.length > 0 && (
               <thead>
                  <tr>
                     {columns.map((column, index) => (
                        <th className="text-sm" key={index}>
                           {t(`data.${column}`)}
                        </th>
                     ))}
                     {isDelete && <th className="text-sm">Actions</th>}
                  </tr>
               </thead>
            )}
            <tbody>
               {data.map((item, rowIndex) => (
                  <tr className="hover" key={rowIndex}>
                     {displayIndex && <td>{rowIndex + 1}</td>}
                     {columns.length
                        ? columns.map((column, columnIndex) => <td key={columnIndex}>{item[column]}</td>)
                        : Object.keys(item).map((key) => <td key={key}>{String(item[key])}</td>)}
                     {isDelete && (
                        <td>
                           <span className="cursor-pointer text-lg text-red-600">
                              <HiTrash />
                           </span>
                        </td>
                     )}
                  </tr>
               ))}
            </tbody>
         </table>
      </>
   )
}

export default TableAtom
