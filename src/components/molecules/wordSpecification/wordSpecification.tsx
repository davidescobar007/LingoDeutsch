import { FunctionComponent } from 'react'
import { BookmarkPlus, WholeWord } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { AtomBadge, AtomButton, AtomText, AtomTitle } from '@/components/atoms'
import { Ttranslation } from '@/modules/actions/types'
import { isUserLoged } from '@/modules/actions/users.actions'
import { openModal } from '@/utils'

interface MoleculeWordSpecificationProps {
   selectedWord: string
   data?: Ttranslation
   isLoading: boolean
   isError: boolean
   saveVocabulary?: any
   isLoadingSaveVocabulary: boolean
   articleId: string
}
const emptyFunction = () => {}

export const MoleculeWordSpecification: FunctionComponent<MoleculeWordSpecificationProps> = ({
   selectedWord,
   data,
   isLoading,
   isError,
   saveVocabulary = emptyFunction,
   isLoadingSaveVocabulary,
   articleId
}) => {
   const t = useTranslations()

   const handleSaveTranslation = () => {
      if (!isUserLoged) {
         openModal()
         return
      }
      saveVocabulary(data)
   }
   return (
      <div className="sticky top-4">
         <section className="card-outlined !border-primary flex flex-wrap justify-center rounded-2xl !border p-2 text-center">
            {isLoading ? (
               <AtomText>Loading...</AtomText>
            ) : !data ? (
               <>
                  <WholeWord size={40} />
                  <AtomTitle extraClassName="w-full" type="h4">
                     Explorador de Palabras
                  </AtomTitle>
                  <AtomText>
                     Haz click en la cualquier palabra del articulo para ver su significado y ejemplos de uso.
                  </AtomText>
               </>
            ) : (
               <div className="flex flex-wrap justify-start text-start">
                  <div className="flex w-full justify-between">
                     <AtomText fontSize="large" isBlock isBold>
                        {data.german_translation}
                     </AtomText>
                     <div className="flex justify-end ">
                        <AtomBadge type="secondary">{data.type_of_word}</AtomBadge>

                        <BookmarkPlus
                           className="text-primary hover:bg-primary -mt-2 ml-2 cursor-pointer rounded-md p-1 hover:text-white"
                           onClick={handleSaveTranslation}
                           size={35}
                        />
                     </div>
                  </div>
                  <AtomText isBlock isThin>
                     {data?.spanish_translation}
                  </AtomText>
                  <AtomText className="mt-4" fontSize="medium" isBlock isBold>
                     Ejemplo
                  </AtomText>
                  {data.examples.length > 0 && (
                     <AtomText fontSize="medium" isThin>
                        {data.examples[Math.floor(Math.random() * data.examples.length)].sentence}
                     </AtomText>
                  )}
                  <AtomButton isBlock onClick={handleSaveTranslation} variant="PRIMARY">
                     Guardar en mi vocabulario
                  </AtomButton>
               </div>
            )}
         </section>
      </div>
   )
}
