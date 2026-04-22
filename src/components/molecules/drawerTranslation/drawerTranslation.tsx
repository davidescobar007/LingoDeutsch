'use client'
import { useState } from 'react'
import { BookmarkPlus } from 'lucide-react'
import { Drawer } from 'vaul'

import { AtomBadge, AtomButton, AtomText, TranslationDrawerLoader } from '@/components/atoms'
import { MoleculeAuthCTA } from '@/components/molecules'
import { Ttranslation } from '@/modules/actions/types'

type MoleculeDrawerTranslationProps = {
   isOpen?: boolean
   onOpenChange?: (_open: boolean) => void
   onSaveVocabulary?: (_data: Ttranslation) => void
   translationData?: Ttranslation
   isAuthenticated?: boolean
   isLoading?: boolean
}

const emptyFunction = () => {}

export const MoleculeDrawerTranslation = ({
   isOpen = false,
   onOpenChange = emptyFunction,
   onSaveVocabulary = emptyFunction,
   translationData = undefined,
   isAuthenticated = false,
   isLoading = false
}: MoleculeDrawerTranslationProps) => {
   const [showAuthCTA, setShowAuthCTA] = useState(false)

   const handleSaveClick = () => {
      if (!isAuthenticated) {
         setShowAuthCTA(true)
         return
      }
      if (onSaveVocabulary && translationData) {
         onSaveVocabulary(translationData)
      }
   }

   const handleBackFromAuth = () => {
      setShowAuthCTA(false)
   }

   const handleCloseDrawer = () => {
      setShowAuthCTA(false)
      onOpenChange(false)
   }

   return (
      <Drawer.Root onOpenChange={handleCloseDrawer} open={isOpen} shouldScaleBackground>
         <Drawer.Portal>
            <Drawer.Overlay className="fixed inset-0 bg-black/40" />
            <Drawer.Content className="bg-base-100 fixed bottom-0 left-0 right-0 mt-24 flex flex-col rounded-t-2xl">
               <div className="bg-base-100 flex-1 rounded-t-2xl p-6">
                  <div className="mx-auto mb-8 h-1.5 w-12 flex-shrink-0 rounded-full bg-zinc-300" />
                  <div className="mx-auto max-w-md">
                     {showAuthCTA ? (
                        <MoleculeAuthCTA compact onBack={handleBackFromAuth} />
                     ) : isLoading || !translationData ? (
                        <TranslationDrawerLoader />
                     ) : (
                        <div className="flex flex-wrap justify-start text-start">
                           <div className="flex w-full justify-between">
                              <AtomText fontSize="medium" isBlock isBold>
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
                     )}
                  </div>
               </div>
            </Drawer.Content>
         </Drawer.Portal>
      </Drawer.Root>
   )
}
