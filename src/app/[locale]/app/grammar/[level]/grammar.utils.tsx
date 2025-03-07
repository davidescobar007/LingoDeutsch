import { AtomText, AtomTitle } from '@/components/atoms'
import { MoleculeTable } from '@/components/molecules'
import { TIterableData } from '@/modules/actions/types'

export const RenderSchema = (uiSchema: TIterableData[]) => {
   return uiSchema.map(({ type, text, headerLevel, classNames, listItems, tableData }, index) => {
      switch (type) {
         case 'header':
            return (
               <AtomTitle type={headerLevel}>
                  {text?.map((item) => {
                     return item.content
                  })}
               </AtomTitle>
            )

         case 'paragraph':
            return <AtomText>{text?.map((item) => item.content)}</AtomText>
         case 'list':
            return (
               <ul className="mb-3 list-disc">
                  {listItems?.map(({ text }, i) => {
                     return (
                        <li className="ml-6" key={i}>
                           <p>
                              {text?.map(({ content, isBold, isItalic, isUnderline }, i) => {
                                 return (
                                    <span key={i}>
                                       {!isBold && !isItalic && !isUnderline && content}
                                       {isBold && isItalic && isUnderline && (
                                          <strong>
                                             <em>
                                                <u>{`${content} `}</u>
                                             </em>
                                          </strong>
                                       )}

                                       {isBold && isItalic && !isUnderline && (
                                          <strong>
                                             <em>{`${content} `}</em>
                                          </strong>
                                       )}
                                       {isBold && isUnderline && !isItalic && (
                                          <strong>
                                             <u>{`${content} `}</u>
                                          </strong>
                                       )}

                                       {isItalic && isUnderline && !isBold && (
                                          <em>
                                             <u>{`${content} `}</u>
                                          </em>
                                       )}

                                       {isBold && !isItalic && !isUnderline && <strong>{`${content} `}</strong>}
                                       {isItalic && !isBold && !isUnderline && <em>{`${content} `}</em>}
                                       {isUnderline && !isBold && !isItalic && <u>{`${content} `}</u>}
                                    </span>
                                 )
                              })}
                           </p>
                        </li>
                     )
                  })}
               </ul>
            )
         case 'table':
            return (
               <div key={index}>
                  <MoleculeTable
                     columns={tableData?.columns}
                     data={tableData?.data}
                     extraClassName="table-sm"
                     key={index}
                  />
               </div>
            )
         default:
            break
      }
   })
}
