/* eslint-disable @next/next/no-async-client-component */
'use client'

import { useState } from 'react'

import { ArticleLoader } from '@/components/atoms'
import { TemplateArticleReader } from '@/components/templates'
import { useArticle } from '@/hooks/articles'
import { useSaveVocabulary, useTranslation } from '@/hooks/translations'

const Page = ({ params: { id } }: { params: { id: string } }) => {
   const [wordToTranslate, setWordToTranslate] = useState<string>('')
   const [enabled, setEnabled] = useState<boolean>(false)

   const { data: article, isFetching: isLoadingArticle } = useArticle(id)
   const { data: translationData, isError, isFetching } = useTranslation({ enabled, wordToTranslate })
   const { isPending, mutate: saveVocabulary } = useSaveVocabulary()

   if (isLoadingArticle) {
      return <ArticleLoader />
   }

   return (
      <TemplateArticleReader
         article={article}
         articleId={id}
         isError={isError}
         isFetching={isFetching}
         onSaveVocabulary={(word) => saveVocabulary(word)}
         onWordClick={(word) => {
            setEnabled(true)
            setWordToTranslate(word)
         }}
         savingVocabulary={isPending}
         translationData={translationData}
      />
   )
}
export default Page
