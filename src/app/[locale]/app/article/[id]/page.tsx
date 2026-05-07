/* eslint-disable @next/next/no-async-client-component */
'use client'

import { use, useState } from 'react'
import { notFound } from 'next/navigation'

import { SpinLoader } from '@/components/atoms'
import { TemplateArticleReader } from '@/components/templates'
import { useArticle } from '@/hooks/articles'
import { useSaveVocabulary, useTranslation } from '@/hooks/translations'

const Page = ({ params }: { params: Promise<{ id: string }> }) => {
   const { id } = use(params)
   const [wordToTranslate, setWordToTranslate] = useState<string>('')
   const [enabled, setEnabled] = useState<boolean>(false)

   const { data: article, isLoading: isLoadingArticle } = useArticle(id)
   const { data: translationData, isError, isFetching } = useTranslation({ enabled, wordToTranslate })
   const { isPending, mutate: saveVocabulary } = useSaveVocabulary()

   if (isLoadingArticle) {
      return <SpinLoader centered />
   }

   if (!article) {
      notFound()
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
