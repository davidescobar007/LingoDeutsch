/* eslint-disable react/forbid-component-props */
import { FunctionComponent } from "react"
import { BsInfoCircleFill } from "react-icons/bs"
import { RiSave2Line } from "react-icons/ri"
import { useTranslations } from "next-intl"

import { isUserLoged } from "@/modules/actions/users.actions"
import { openModal } from "@/utils"

import Badge from "../../atoms/badge"
import Title from "../../atoms/title"

type TMoleculeImageCard = {
   image: string
   title: string
   level: string[]
   selectedWord: string | null
   translationData: any
   saveVocabulary: any
}
const MoleculeImageCard: FunctionComponent<TMoleculeImageCard> = ({
   image,
   title,
   level,
   selectedWord,
   translationData,
   saveVocabulary
}) => {
   const t = useTranslations()

   const handleSaveTranslation = () => {
      if (!isUserLoged()) {
         openModal()
         return
      }
      saveVocabulary(translationData)
   }

   return (
      <article
         className="flex h-44 flex-wrap bg-cover p-3"
         style={{
            backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.7) 0%, rgba(65,65,65,0.35) 100%), url(${image})`
         }}
      >
         <Title extraClassName="text-2xl w-full text-start text-white leading-7 font-medium" type="h3">
            {title}
         </Title>
         <span />
         <div className="mt-2 w-11/12">
            <Title extraClassName="text-xl text-start text-white underline font-medium flex" type="h3">
               {selectedWord && (
                  <span
                     className="tooltip tooltip-right tooltip-info"
                     data-tip={t("learn.wordSpecificationTooltip")}
                  >
                     <BsInfoCircleFill className="mr-3 mt-2 text-white" />
                  </span>
               )}
               {selectedWord}
            </Title>
         </div>
         {selectedWord && (
            <label className=" mt-2 w-1/12 justify-end" onClick={handleSaveTranslation}>
               {!translationData?.isFetching && !translationData.isError ? (
                  <RiSave2Line className="h-8 w-8 fill-current text-white" />
               ) : null}
            </label>
         )}
         <Title extraClassName="text-white w-full text-start" type="h4">
            {translationData?.isFetching ? (
               <span className="loading loading-dots loading-md" />
            ) : translationData.isError ? (
               t("translation.shortNotFoundTranslation")
            ) : (
               translationData?.spanish_translation
            )}
         </Title>

         <div className="flex w-full justify-end">
            {level.map((item) => (
               <Badge key={item}>{item}</Badge>
            ))}
         </div>
      </article>
   )
}

export default MoleculeImageCard
