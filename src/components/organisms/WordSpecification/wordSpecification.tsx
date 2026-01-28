'use client'
import { FunctionComponent, useState } from 'react'
import { CheckCircle, WholeWord } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { AtomBadge, AtomButton, AtomText, AtomTitle } from '@/components/atoms'
import { Ttranslation } from '@/modules/actions/types'
import { isUserLoged } from '@/modules/actions/users.actions'
import { openModal } from '@/utils'

interface OrganismWordSpecificationProps {
   selectedWord: string
   data?: Ttranslation
   isLoading: boolean
   isError: boolean
   saveVocabulary?: any
   isLoadingSaveVocabulary: boolean
   articleId: string
}
const emptyFunction = () => {}

export const OrganismWordSpecification: FunctionComponent<OrganismWordSpecificationProps> = ({
   selectedWord: _selectedWord,
   data = undefined,
   isLoading,
   isError: _isError,
   saveVocabulary = emptyFunction,
   isLoadingSaveVocabulary,
   articleId: _articleId
}) => {
   const _t = useTranslations()
   const [isSaved, setIsSaved] = useState(false)

   const handleSaveTranslation = () => {
      if (!isUserLoged()) {
         openModal()
         return
      }
      saveVocabulary(data)
      setIsSaved(true)
      setTimeout(() => setIsSaved(false), 2000) // Reset after 2 seconds
   }

   return (
      <div className="sticky top-4">
         <section className="container-card relative overflow-hidden  p-6 backdrop-blur-sm transition-all duration-500 ">
            <div className="relative z-10">
               {isLoading ? (
                  <div className="flex flex-col items-center space-y-4 py-8">
                     <div className="flex space-x-2">
                        <div className="h-3 w-3 animate-bounce rounded-full bg-blue-400 [animation-delay:-0.3s]" />
                        <div className="h-3 w-3 animate-bounce rounded-full bg-blue-500 [animation-delay:-0.15s]" />
                        <div className="h-3 w-3 animate-bounce rounded-full bg-blue-600" />
                     </div>
                     <div className="w-full space-y-3">
                        <div className="h-6 animate-pulse rounded-lg bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
                        <div className="h-4 w-3/4 animate-pulse rounded-lg bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
                        <div className="h-4 w-1/2 animate-pulse rounded-lg bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
                     </div>
                  </div>
               ) : !data ? (
                  <div className="flex flex-col items-center space-y-4 py-8 text-center">
                     <div className="relative">
                        <WholeWord className=" text-primary" size={48} />
                     </div>
                     <AtomTitle type="h4">Explorador de Palabras</AtomTitle>
                     <AtomText type="paragraph">
                        Haz click en cualquier palabra del artículo para ver su significado y ejemplos de uso.
                     </AtomText>
                  </div>
               ) : (
                  <div className="animate-in fade-in-50 slide-in-from-bottom-4 space-y-6 duration-500">
                     {/* Word Header */}
                     <div className="flex items-start justify-between">
                        <div className="flex-1">
                           <AtomText color="primary" fontSize="medium" isBold>
                              {data.german_translation}
                           </AtomText>
                        </div>
                        <div className="flex items-center space-x-2 pt-2">
                           <AtomBadge color="secondary">{data.type_of_word}</AtomBadge>
                        </div>
                     </div>

                     {/* Translation */}
                     <AtomText isBlock isThin>
                        {data?.spanish_translation}
                     </AtomText>

                     {/* Example Section */}
                     {data.examples && data.examples.length > 0 && (
                        <div className="space-y-3">
                           <AtomText fontSize="medium" isBold>
                              💡 Ejemplo
                           </AtomText>
                           <div className="rounded-2xl border-l-4 border-yellow-400 bg-gradient-to-r from-yellow-50 to-amber-50 p-4 shadow-sm">
                              <AtomText className="italic leading-relaxed text-gray-700" fontSize="medium" isThin>
                                 &ldquo;{data.examples[Math.floor(Math.random() * data.examples.length)]?.sentence}
                                 &rdquo;
                              </AtomText>
                           </div>
                        </div>
                     )}

                     {/* Save Button */}
                     <AtomButton
                        disabled={isLoadingSaveVocabulary}
                        isBlock
                        onClick={handleSaveTranslation}
                        variant="OUTLINE"
                     >
                        {isLoadingSaveVocabulary ? (
                           <div className="flex items-center justify-center space-x-2">
                              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                              <span>Guardando...</span>
                           </div>
                        ) : isSaved ? (
                           <div className="flex items-center justify-center space-x-2">
                              <CheckCircle size={18} />
                              <span>¡Guardado!</span>
                           </div>
                        ) : (
                           'Guardar en mi vocabulario'
                        )}
                     </AtomButton>
                  </div>
               )}
            </div>
         </section>
      </div>
   )
}
