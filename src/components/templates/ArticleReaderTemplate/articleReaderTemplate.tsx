'use client'
import { useState } from 'react'
import { useTranslations } from 'next-intl'

import { MoleculeDrawerTranslation } from '@/components/molecules'
import { OrganismArticleContent, OrganismWordSpecification } from '@/components/organisms'
import useScreenSize from '@/hooks/useScreenSize'
import { TArticle, Ttranslation } from '@/modules/actions/types'
import { useAuthState } from '@/providers/AuthProvider'

type TemplateArticleReaderProps = {
   article?: TArticle
   articleId: string
   isError?: boolean
   isFetching?: boolean
   onSaveVocabulary: (_word: Ttranslation) => void
   onWordClick: (_word: string) => void
   savingVocabulary?: boolean
   translationData?: Ttranslation
}

export const TemplateArticleReader = ({
   article = undefined,
   articleId,
   isError = false,
   isFetching = false,
   onSaveVocabulary,
   onWordClick,
   savingVocabulary = false,
   translationData = undefined
}: TemplateArticleReaderProps) => {
   const t = useTranslations()
   const { isAuthenticated } = useAuthState()
   const [wordToTranslate, setWordToTranslate] = useState('')
   const [isDrawerOpen, setIsDrawerOpen] = useState(false)
   const { isMobile, isTablet } = useScreenSize()

   const handleWordClick = (word: string) => {
      setWordToTranslate(word)
      setIsDrawerOpen(true)
      onWordClick(word)
   }

   return (
      <>
         <OrganismArticleContent
            articleId={articleId}
            image={article?.imageFile}
            level={article?.level}
            onWordClick={handleWordClick}
            text_content={article?.text_content}
            title={article?.title}
         />

         <div className="w-7/24 sticky top-4 hidden lg:block">
            <OrganismWordSpecification
               articleId={articleId}
               data={translationData}
               isError={isError}
               isLoading={isFetching}
               isLoadingSaveVocabulary={savingVocabulary}
               saveVocabulary={onSaveVocabulary}
               selectedWord={wordToTranslate}
            />
         </div>

         {(isMobile || isTablet) && (
            <MoleculeDrawerTranslation
               isAuthenticated={isAuthenticated}
               isLoading={isFetching}
               isOpen={isDrawerOpen}
               onOpenChange={setIsDrawerOpen}
               onSaveVocabulary={onSaveVocabulary}
               translationData={translationData}
            />
         )}
      </>
   )
}
