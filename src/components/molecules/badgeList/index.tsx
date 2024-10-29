import { FunctionComponent } from 'react'

type TMoleculeBadgeList = {
   itemsArray: Array<{
      label: string
      value: string
   }>
   selectedItem: string
   [index: string]: any
}

export const MoleculeBadgeList: FunctionComponent<TMoleculeBadgeList> = ({
   itemsArray,
   selectedItem,
   ...rest
}) => {
   return (
      <div className="mb-5 flex flex-nowrap">
         <div className="flex justify-around overflow-x-auto pb-2 pt-3">
            {itemsArray.map(({ label, value }, index) => {
               return (
                  <div
                     className={`badge ${
                        selectedItem === value && 'badge-primary '
                     } badge-md mr-3 cursor-pointer select-none`}
                     key={index}
                     {...rest}
                     data-value={value}
                  >
                     {label}
                  </div>
               )
            })}
         </div>
      </div>
   )
}
