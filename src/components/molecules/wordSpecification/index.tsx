import { FunctionComponent } from "react"
import { useTranslations } from "next-intl"

import AtomButton from "@/components/atoms/button"
import { Loader } from "@/components/atoms/loader"
import AtomTitle from "@/components/atoms/title"
import { isUserLoged } from "@/modules/actions/users.actions"
import { Link } from "@/navigation"
import { openModal } from "@/utils"

interface MoleculeWordSpecificationProps {
   selectedWord: string
   data: any
   isLoading: boolean
   isError: boolean
   saveVocabulary?: any
   isLoadingSaveVocabulary: boolean
   articleId: string
}
const emptyFunction = () => {}

const MoleculeWordSpecification: FunctionComponent<MoleculeWordSpecificationProps> = ({
   selectedWord,
   data,
   isLoading,
   isError,
   saveVocabulary = emptyFunction,
   isLoadingSaveVocabulary,
   articleId
}) => {
   const t = useTranslations()

   const handleSaveTranslation = () => {
      if (!isUserLoged()) {
         openModal()
         return
      }
      saveVocabulary(data)
   }
   return (
      <div className="w-7/24 hidden md:block">
         <section className="border-accent bg-secondary mb-4 flex flex-wrap justify-between rounded-2xl border-2 p-2">
            <AtomTitle extraClassName="w-10/12 font-medium" type="h3">
               {t("learn.wordSpecification")}
            </AtomTitle>
         </section>

         {selectedWord && (
            <section className="border-accent bg-secondary flex w-full flex-wrap justify-between rounded-2xl border-2 p-2">
               <AtomTitle extraClassName="underline w-10/12" type="h3">
                  {selectedWord}
               </AtomTitle>
               <div className="mt-3">
                  {isLoading ? (
                     <Loader />
                  ) : (
                     <>
                        <AtomTitle extraClassName="font-medium" type="h4">
                           {data?.spanish_translation}
                        </AtomTitle>

                        <div className=" mt-4 text-justify">
                           {isError ? (
                              <span className="font-medium">{t("translation.notFoundTranslation")}</span>
                           ) : (
                              !!data?.examples?.data.length && (
                                 <>
                                    <p className="mb-2 font-medium">
                                       <b>De: </b>
                                       {data?.examples?.data[1]?.german}
                                    </p>
                                    <p className="font-medium">
                                       <b>Es: </b> {data?.examples?.data[1]?.spanish}
                                    </p>
                                 </>
                              )
                           )}
                        </div>
                        {!!data?.examples?.data && (
                           <AtomButton
                              extraClassName="btn-outline btn-block mb-1"
                              onClick={handleSaveTranslation}
                              typeOf="ACCENT"
                           >
                              {isLoadingSaveVocabulary ? (
                                 <span className="loading loading-spinner" />
                              ) : (
                                 t("translation.save")
                              )}
                           </AtomButton>
                        )}
                     </>
                  )}
               </div>
            </section>
         )}
         <div className="tooltip tooltip-left tooltip-accent mt-3" data-tip={t("learn.earnPoints")}>
            <Link href={`/app/quiz/${articleId}`}>
               <AtomButton>{t("learn.startQuiz")} 📝</AtomButton>
            </Link>
         </div>
      </div>
   )
}

export default MoleculeWordSpecification
