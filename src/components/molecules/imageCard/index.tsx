/* eslint-disable react/forbid-component-props */
import { FunctionComponent, useContext, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { BsInfoCircleFill } from "react-icons/bs"
import { RiSave2Fill, RiSave2Line } from "react-icons/ri"

import { handleErrorModal } from "../../../context/actions/global.actions"
import { StoreContext } from "../../../context/global.state"
import Badge from "../../atoms/badge"
import Title from "../../atoms/title"

type TMoleculeImageCard = {
   image: string
   title: string
   level: []
}
const MoleculeImageCard: FunctionComponent<TMoleculeImageCard> = ({ image, title, level }) => {
   const { t } = useTranslation()

   const {
      saveVocabularyToStudy,
      state: { selectedWord, selectedWordTranslation, user }
   } = useContext(StoreContext)
   const [isTranslationSaved, setIsTranslationSaved] = useState(false)

   const handleSaveTranslation = () => {
      if (!user) {
         handleErrorModal(t("constants.needSignUp"))
      }
      if (selectedWordTranslation?.id && user) {
         saveVocabularyToStudy()
         setIsTranslationSaved(true)
      }
   }

   useEffect(() => {
      setIsTranslationSaved(false)
   }, [selectedWord])

   return (
      <article
         className="flex h-44 flex-wrap bg-cover p-3"
         style={{
            backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.5) 0%, rgba(65,65,65,0.35) 100%), url(${image})`
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
               {isTranslationSaved ? (
                  <RiSave2Fill className="swap-on h-8 w-8 fill-current text-white" />
               ) : (
                  <RiSave2Line className="swap-off h-8 w-8 fill-current text-white" />
               )}
            </label>
         )}
         <Title extraClassName="text-lg text-white w-full text-start font-medium" type="h4">
            {selectedWordTranslation?.spanish_translation || ""}
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
