'use client'
import { useState } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

import { AtomBadge, AtomButton, AtomText, AtomTitle } from '@/components/atoms'
import { OrganismImageCard } from '@/components/organisms'
import { constants } from '@/modules/global.types'

type OrganismArticleContentProps = {
   articleId: string
   image?: string
   level?: string[]
   onWordClick: (_word: string) => void
   text_content?: string
   title?: string
}

const EMPTY_LEVEL_ARRAY: string[] = []

export const OrganismArticleContent = ({
   articleId,
   image = '',
   level = EMPTY_LEVEL_ARRAY,
   onWordClick,
   text_content = '',
   title = ''
}: OrganismArticleContentProps) => {
   const t = useTranslations()
   const [currentWordIntext, setCurrentWordIntext] = useState<string | null>(null)

   const imageURL = `${process.env.NEXT_PUBLIC_API_ENVIRONMENT}/api/files/${constants.ARTICLES}/${articleId}/${image}`

   const handleWordClick = (word: string) => {
      setCurrentWordIntext(word)
      onWordClick(word)
   }

   return (
      <div className="lg:w-16/24 w-full">
         <div className="hero-content p-0 text-center">
            <div>
               <div className="inset-x-0 top-0 z-10 mx-auto w-full md:hidden">
                  <OrganismImageCard image={imageURL} level={level} title={title} />
               </div>

               <div className="mb-8 hidden text-left md:block">
                  <header className="mb-6">
                     <AtomTitle type="h2">{title}</AtomTitle>
                     <div className="flex justify-normal gap-2">
                        {level.map((item) => (
                           <AtomBadge color="primary" key={item}>
                              {item}
                           </AtomBadge>
                        ))}
                     </div>
                  </header>
                  <div className="group relative overflow-hidden rounded-xl shadow-md transition-shadow duration-300 hover:shadow-xl">
                     <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

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
                  <div className="border-primary/10 bg-primary/5 text-base-content/80 mb-6 rounded-xl border p-4 text-sm italic">
                     <p>
                        💡 Presiona sobre una palabra para obtener su traducción, luego no olvides realizar el quiz
                        al final de la sección.
                     </p>
                  </div>
                  <div className="bg-base-100 rounded-2xl p-6 shadow-sm md:p-8">
                     <AtomText
                        className="text-base-content !text-left leading-7 tracking-wide"
                        fontSize="medium"
                        type="paragraph"
                     >
                        {text_content
                           .replace(/\./g, '. ')
                           .split(' ')
                           .map((word, index) => (
                              <span
                                 className={`${
                                    currentWordIntext === word
                                       ? 'bg-primary/30 text-primary-dark font-medium'
                                       : 'hover:bg-primary/15'
                                 } cursor-pointer rounded px-0.5 py-0.5 transition-all duration-200 ease-out`}
                                 key={`${word}${index}`}
                                 onClick={() => handleWordClick(word)}
                              >
                                 {`${word} `}
                              </span>
                           ))}
                     </AtomText>
                  </div>
                  <footer className="mb-28 mt-10">
                     <AtomButton href={`/app/quiz/${articleId}`} type="link" variant="PRIMARY">
                        {t('learn.startQuiz')} 📝
                     </AtomButton>
                  </footer>
               </div>
            </div>
         </div>
      </div>
   )
}
