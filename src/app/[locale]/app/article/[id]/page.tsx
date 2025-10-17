/* eslint-disable @next/next/no-async-client-component */
'use client'

import { useState } from 'react'
import { BookmarkPlus } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Drawer } from 'vaul'

import { ArticleLoader, AtomBadge, AtomButton, AtomText } from '@/components/atoms'
import { MoleculeHero, MoleculeModal, MoleculeWordSpecification } from '@/components/molecules'
import { useArticle } from '@/hooks/articles'
import { useSaveVocabulary, useTranslation } from '@/hooks/translations'
import useScreenSize from '@/hooks/useScreenSize'

const Page = ({ params: { id } }: { params: { id: string } }) => {
   const t = useTranslations()

   const [wordToTranslate, setWordToTranslate] = useState<string>('')
   const [enabled, setEnabled] = useState<boolean>(false)
   const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false)
   const { data: article, isFetching: isLoadingArticle } = useArticle(id)
   const { data: translationData, isError, isFetching } = useTranslation({ wordToTranslate, enabled })
   const { mutate: saveVocabulary, isPending } = useSaveVocabulary()
   const { isMobile, isTablet } = useScreenSize()
   if (isLoadingArticle) {
      return <ArticleLoader />
   }

   const handleWordClick = (word: string) => {
      setEnabled(true)
      setWordToTranslate(word)
      setIsDrawerOpen(true) // Open the drawer on mobile
   }

   return (
      <>
         <MoleculeHero
            articleId={id}
            image={article?.imageFile}
            level={article?.level}
            saveVocabulary={(word: any) => saveVocabulary(word)}
            searchWordTranslation={handleWordClick} // Use the new handler
            text_content={article?.text_content}
            title={article?.title}
            translationData={{ ...translationData, isError, isFetching }}
         />
         <div className="w-7/24 sticky top-4 hidden lg:block">
            <MoleculeWordSpecification
               articleId={id}
               data={translationData}
               isError={isError}
               isLoading={isFetching}
               isLoadingSaveVocabulary={isPending}
               saveVocabulary={(word: any) => saveVocabulary(word)}
               selectedWord={wordToTranslate}
            />
         </div>

         {(isMobile || isTablet) && translationData && (
            <Drawer.Root onOpenChange={setIsDrawerOpen} open={isDrawerOpen} shouldScaleBackground>
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
                                 <div className="flex justify-end ">
                                    <AtomBadge color="accent">{translationData.type_of_word}</AtomBadge>

                                    <BookmarkPlus
                                       className="text-primary hover:bg-primary -mt-2 ml-2 cursor-pointer rounded-md p-1 hover:text-white"
                                       onClick={() => saveVocabulary(translationData)}
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
                              <AtomButton
                                 isBlock
                                 onClick={() => saveVocabulary(translationData)}
                                 variant="PRIMARY"
                              >
                                 Guardar en mi vocabulario
                              </AtomButton>
                           </div>
                        </div>
                     </div>
                  </Drawer.Content>
               </Drawer.Portal>
            </Drawer.Root>
         )}

         <MoleculeModal>
            <p>{t('constants.needSignUp')}</p>
         </MoleculeModal>
      </>
   )
}
export default Page
