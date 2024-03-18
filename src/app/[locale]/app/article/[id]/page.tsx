/* eslint-disable @next/next/no-async-client-component */
"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"

import { ArticleLoader } from "@/components/atoms/loader"
import MoleculeHero from "@/components/molecules/hero"
import MoleculeModal from "@/components/molecules/modal"
import MoleculeWordSpecification from "@/components/molecules/wordSpecification"
import { useArticle } from "@/store/articles"
import { useSaveVocabulary, useTranslation } from "@/store/translations"

const Page = ({ params: { id } }: { params: { id: string } }) => {
   const t = useTranslations()

   const [wordToTranslate, setWordToTranslate] = useState<string>("")
   const [enabled, setEnabled] = useState<boolean>(false)
   const { data: article, isFetching: isLoadingArticle } = useArticle(id)
   const { data: translationData, isError, isFetching } = useTranslation({ wordToTranslate, enabled })
   const { mutate, isPending } = useSaveVocabulary()
   if (isLoadingArticle) {
      return <ArticleLoader />
   }
   return (
      <>
         <MoleculeHero
            articleId={id}
            image={article?.imageFile}
            level={article?.level}
            saveVocabulary={(word: any) => mutate(word)}
            searchWordTranslation={(word: string) => {
               setEnabled(true)
               setWordToTranslate(word)
            }}
            text_content={article?.text_content}
            title={article?.title}
            translationData={{ ...translationData, isError, isFetching }}
         />
         <MoleculeWordSpecification
            articleId={id}
            data={translationData}
            isError={isError}
            isLoading={isFetching}
            isLoadingSaveVocabulary={isPending}
            saveVocabulary={(word: any) => mutate(word)}
            selectedWord={wordToTranslate}
         />
         <MoleculeModal>
            <p>{t("constants.needSignUp")}</p>
         </MoleculeModal>
      </>
   )
}
export default Page
