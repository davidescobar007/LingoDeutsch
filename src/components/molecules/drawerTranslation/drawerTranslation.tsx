'use client'
import { BookmarkPlus } from 'lucide-react'
import { Drawer } from 'vaul'

import { AtomBadge, AtomButton, AtomText } from '@/components/atoms'
import { Ttranslation } from '@/modules/actions/types'

type MoleculeDrawerTranslationProps = {
   isOpen?: boolean
   onOpenChange?: (_open: boolean) => void
   onSaveVocabulary?: (_data: Ttranslation) => void
   translationData?: Ttranslation
}

const emptyFunction = () => {}

export const MoleculeDrawerTranslation = ({
   isOpen = false,
   onOpenChange = emptyFunction,
   onSaveVocabulary = emptyFunction,
   translationData = undefined
}: MoleculeDrawerTranslationProps) => {
   if (!translationData) {
      return null
   }

   const handleSaveClick = () => {
      if (onSaveVocabulary) {
         onSaveVocabulary(translationData)
      }
   }

   return (
      <Drawer.Root onOpenChange={onOpenChange} open={isOpen} shouldScaleBackground>
         <Drawer.Portal>
            <Drawer.Overlay className="fixed inset-0 bg-black/40" />
            <Drawer.Content className="fixed bottom-0 left-0 right-0 mt-24 flex flex-col rounded-t-[10px] bg-zinc-100">
               <div className="flex-1 rounded-t-[10px] bg-white p-4">
                  <div className="mx-auto mb-8 h-1.5 w-12 flex-shrink-0 rounded-full bg-zinc-300" />
                  <div className="mx-auto max-w-md">
                     <div className="flex flex-wrap justify-start text-start">
                        <div className="flex w-full justify-between">
                           <AtomText fontSize="large" isBlock isBold>
                              {translationData.german_translation}
                           </AtomText>
                           <div className="flex justify-end">
                              <AtomBadge color="accent">{translationData.type_of_word}</AtomBadge>

                              <BookmarkPlus
                                 className="text-primary hover:bg-primary -mt-2 ml-2 cursor-pointer rounded-md p-1 hover:text-white"
                                 onClick={handleSaveClick}
                                 size={35}
                              />
                           </div>
                        </div>
                        <AtomText isBlock isThin>
                           {translationData?.spanish_translation}
                        </AtomText>
                        <AtomText className="mt-4" fontSize="medium" isBlock isBold>
                           Ejemplo
                        </AtomText>
                        {translationData.examples.length > 0 && (
                           <AtomText fontSize="medium" isThin>
                              {
                                 translationData.examples[
                                    Math.floor(Math.random() * translationData.examples.length)
                                 ].sentence
                              }
                           </AtomText>
                        )}
                        <AtomButton isBlock onClick={handleSaveClick} variant="PRIMARY">
                           Guardar en mi vocabulario
                        </AtomButton>
                     </div>
                  </div>
               </div>
            </Drawer.Content>
         </Drawer.Portal>
      </Drawer.Root>
   )
}
