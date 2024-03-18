"use client"

import { FunctionComponent, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useTranslations } from "next-intl"

import AtomBadge from "@/components/atoms/badge"
import AtomButton from "@/components/atoms/button"
import AtomTitle from "@/components/atoms/title"
import { constants } from "@/modules/global.types"

import ImageCard from "../imageCard"

type TMoleculeHero = {
   image?: string
   title?: string
   text_content?: string
   level?: string[]
   articleId: string
   searchWordTranslation: any
   translationData: any
   saveVocabulary: any
}

const emptyArray: [] = []

const MoleculeHero: FunctionComponent<TMoleculeHero> = ({
   image = "",
   title = "",
   text_content = "",
   level = emptyArray,
   articleId,
   searchWordTranslation,
   translationData,
   saveVocabulary
}) => {
   const t = useTranslations()
   const [currentWordIntext, setCurrentWordIntext] = useState<string | null>(null)

   const imageURL = `${process.env.NEXT_PUBLIC_API_ENVIRONMENT}/api/files/${constants.ARTICLES}/${articleId}/${image}`
   return (
      <div className="md:w-16/24 w-full">
         <div className="hero-content p-0 text-center">
            <div>
               <div className="fixed inset-x-0 top-0 z-10 mx-auto w-full md:hidden">
                  <ImageCard
                     image={imageURL}
                     level={level}
                     saveVocabulary={saveVocabulary}
                     selectedWord={currentWordIntext}
                     title={title}
                     translationData={translationData}
                  />
               </div>

               <div className="mb-5 hidden text-left md:block">
                  <header className="mb-3">
                     <AtomTitle extraClassName="font-medium">{title}</AtomTitle>

                     {level.map((item) => (
                        <AtomBadge key={item}>{item}</AtomBadge>
                     ))}
                  </header>
                  <Image
                     alt="image related to the title"
                     height={50}
                     src={imageURL}
                     // eslint-disable-next-line react/forbid-component-props
                     style={{ borderRadius: "10px" }}
                     width={1000}
                  />
               </div>

               <div className="mt-44 w-full p-5 md:mt-0 md:p-0">
                  <p className="text-justify text-lg leading-9 tracking-wide">
                     {text_content
                        .replace(/\./g, ". ")
                        .split(" ")
                        .map((word, index) => (
                           <span
                              className={`${
                                 currentWordIntext === word && "bg-accent"
                              } hover:bg-accent cursor-pointer rounded-lg duration-300 ease-in-out`}
                              key={`${word}${index}`}
                              onClick={() => {
                                 setCurrentWordIntext(word)
                                 searchWordTranslation(word)
                              }}
                           >
                              {`${word} `}
                           </span>
                        ))}
                  </p>
                  <footer className="tooltip tooltip-accent mb-28 mt-7 lg:hidden" data-tip={t("learn.earnPoints")}>
                     <Link href={`/quiz/${articleId}`}>
                        <AtomButton>{t("learn.startQuiz")} 📝</AtomButton>
                     </Link>
                  </footer>
               </div>
            </div>
         </div>
      </div>
   )
}

export default MoleculeHero
