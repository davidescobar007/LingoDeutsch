'use client'

import { FunctionComponent, useState } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

import { AlertAtom, AtomBadge, AtomButton, AtomText, AtomTitle } from '@/components/atoms'
import { constants } from '@/modules/global.types'

import { MoleculeImageCard } from '../imageCard/imageCard'

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

export const MoleculeHero: FunctionComponent<TMoleculeHero> = ({
   image = '',
   title = '',
   text_content = '',
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
               <div className=" inset-x-0 top-0 z-10 mx-auto w-full md:hidden">
                  <MoleculeImageCard image={imageURL} level={level} title={title} />
               </div>

               <div className="mb-5 hidden text-left md:block">
                  <header className="mb-3">
                     <AtomTitle extraClassName="font-medium">{title}</AtomTitle>
                     <div className="flex justify-normal gap-3">
                        {level.map((item) => (
                           <AtomBadge color="primary" key={item}>
                              {item}
                           </AtomBadge>
                        ))}
                     </div>
                  </header>
                  <div className="group relative overflow-hidden rounded-2xl shadow-2xl">
                     {/* Gradient overlay */}
                     <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                     {/* Main image with enhanced styling */}
                     <Image
                        alt="image related to the title"
                        className="h-64 w-full object-cover transition-transform duration-700 group-hover:scale-105 lg:h-80"
                        height={400}
                        src={imageURL}
                        width={1000}
                     />
                  </div>
               </div>

               <div className="w-full">
                  <AlertAtom className="mb-4">
                     Presiona sobre una palabra para obtener su traducción, luego no olvides realizar el quiz al
                     final de la sección.
                  </AlertAtom>
                  <div className="bg-base-100 rounded-2xl p-6 shadow-xl md:p-4">
                     <AtomText
                        className="!text-justify leading-10 tracking-normal"
                        fontSize="large"
                        type="paragraph"
                     >
                        {text_content
                           .replace(/\./g, '. ')
                           .split(' ')
                           .map((word, index) => (
                              <span
                                 className={`${
                                    currentWordIntext === word && 'bg-accent'
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
                     </AtomText>
                  </div>
                  <footer className="tooltip tooltip-accent mb-28 mt-7" data-tip={t('learn.earnPoints')}>
                     <AtomButton gradient href={`/app/quiz/${articleId}`} type="link">
                        {t('learn.startQuiz')} 📝
                     </AtomButton>
                  </footer>
               </div>
            </div>
         </div>
      </div>
   )
}
