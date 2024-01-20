"use client"

import { FunctionComponent, useContext, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import Link from "next/link"
import { useParams } from "next/navigation"

import { StoreContext } from "../../../context/global.state"
import { constants } from "../../../context/global.types"
import AlertAtom from "../../atoms/alert"
import Badge from "../../atoms/badge"
import Button from "../../atoms/button"
import PictureAtom from "../../atoms/picture"
import Title from "../../atoms/title"
import ImageCard from "../imageCard"
type TMoleculeHero = {
   image: string
   title: string
   text_content: string
   level: []
   author?: string
   link?: string
}

const emptyArray: [] = []

const MoleculeHero: FunctionComponent<TMoleculeHero> = ({
   image,
   title,
   text_content,
   level = emptyArray,
   author = "",
   link = ""
}) => {
   const { t } = useTranslation()
   const { setSelectedWord, resetTranslation } = useContext(StoreContext)
   const [currentWordIntext, setCurrentWordIntext] = useState(null)
   let { id } = useParams()
   useEffect(() => {
      return () => {
         resetTranslation()
      }
   }, [])

   const xsStyles = "fixed inset-x-0 h-[calc(100vh-45vh)] pb-24 top-60 overflow-scroll px-5"
   const smStyles = "mx-auto mt-1 sm:h-[calc(100vh-40vh)] sm:pb-0"
   const mdStyles = "md:top-0 md:pb-5 md:relative md:h-min md:overflow-auto"

   const imageURL = `${process.env.VITE_API_ENVIRONMENT}/api/files/${constants.ARTICLES}/${id}/${image}`

   return (
      <div className="hero bg-base-100">
         <div className="hero-content p-0 text-center">
            <div className="max-w-md">
               <div className="fixed inset-x-0 top-16 z-10 mx-auto w-full md:hidden">
                  <ImageCard image={imageURL} level={level} title={title} />
               </div>

               <div className="mb-5 hidden text-left md:block">
                  <header className="mb-3">
                     <Title extraClassName="font-medium text-2xl">{title}</Title>

                     {level.map((item) => (
                        <Badge key={item}>{item}</Badge>
                     ))}
                  </header>
                  <PictureAtom image={imageURL} />
               </div>

               <div className={`md:px-0 ${smStyles} ${mdStyles} ${xsStyles}`}>
                  {link && (
                     <AlertAtom>
                        Fuente: {link}, author {author}
                     </AlertAtom>
                  )}
                  <p className="text-justify text-xl leading-9 tracking-wide">
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
                                 setSelectedWord(word)
                              }}
                           >
                              {`${word} `}
                           </span>
                        ))}
                  </p>
                  <footer className="tooltip tooltip-accent mb-28 mt-7 lg:hidden" data-tip={t("learn.earnPoints")}>
                     <Link href={`/quiz/${id}`}>
                        <Button>{t("learn.startQuiz")} 📝</Button>
                     </Link>
                  </footer>
               </div>
            </div>
         </div>
      </div>
   )
}

export default MoleculeHero
