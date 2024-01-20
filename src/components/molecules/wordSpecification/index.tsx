/* eslint-disable react/forbid-component-props */
import { useContext, useEffect } from "react"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { RiSave2Fill, RiSave2Line } from "react-icons/ri"
import { useParams } from "react-router-dom"
import Link from "next/link"

import AtomButton from "@/components/atoms/button"
import { Loader } from "@/components/atoms/loader"
import AtomTitle from "@/components/atoms/title"

import { handleErrorModal } from "../../../context/actions/global.actions"
import { StoreContext } from "../../../context/global.state"

const MoleculeWordSpecification = () => {
   const { t } = useTranslation()
   const {
      saveVocabularyToStudy,
      state: {
         selectedWord,
         selectedWordTranslation,
         user,
         isLoading: { wordTranslation }
      }
   } = useContext(StoreContext)

   const [isTranslationSaved, setIsTranslationSaved] = useState(false)
   let { id } = useParams()

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

   const objectHasOwnKey = Object.keys(selectedWordTranslation?.examples || {}).some(
      (key) => selectedWordTranslation?.examples[key] === ""
   )

   return (
      <div className="md:w-8/32 lg:w-5/24 xl:w-6/32 fixed md:right-5 2xl:right-32">
         <section className=" border-accent bg-secondary flex flex-wrap justify-between rounded-2xl border-2 p-2 ">
            {selectedWord ? (
               <>
                  <AtomTitle extraClassName="text-xl underline w-10/12 font-medium" type="h3">
                     {selectedWord}
                  </AtomTitle>
                  <div
                     className="tooltip tooltip-left tooltip-accent right-5 mt-1 flex w-2/12 cursor-pointer justify-end"
                     data-tip={t("learn.wordSpecificationTooltip")}
                     onClick={handleSaveTranslation}
                  >
                     <label className="">
                        {isTranslationSaved ? (
                           <RiSave2Fill className="swap-on h-6 w-6 fill-current" />
                        ) : (
                           <RiSave2Line className="swap-off h-6 w-6 fill-current" />
                        )}
                     </label>
                  </div>
                  <div className="mt-3">
                     {wordTranslation ? (
                        <Loader />
                     ) : (
                        <>
                           <AtomTitle extraClassName="font-medium text-lg" type="h4">
                              *{selectedWordTranslation?.spanish_translation || ""}
                           </AtomTitle>

                           <p className="text-md mt-4 text-justify font-normal">
                              <span className="font-medium">Z.B. </span>
                              {!objectHasOwnKey && selectedWordTranslation?.examples?.data[1]?.german}
                           </p>
                        </>
                     )}
                  </div>
               </>
            ) : (
               <AtomTitle extraClassName="text-lg  w-10/12 font-medium" type="h3">
                  {t("learn.wordSpecification")}
               </AtomTitle>
            )}
         </section>
         <div className="tooltip tooltip-left tooltip-accent mt-3" data-tip={t("learn.earnPoints")}>
            <Link href={`/quiz/${id}`}>
               <AtomButton>{t("learn.startQuiz")} 📝</AtomButton>
            </Link>
         </div>
      </div>
   )
}

export default MoleculeWordSpecification
