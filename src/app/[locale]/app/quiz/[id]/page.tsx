/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import { useEffect, useState } from "react"
import { useTranslations } from "next-intl"

import AtomButton from "@/components/atoms/button"
import AtomProgressPercentage from "@/components/atoms/progressBar"
import AtomTitle from "@/components/atoms/title"
import MoleculeInputCheckGroup from "@/components/molecules/inputCheckGroup"
import useRandomObjectFromArray from "@/hooks/useRandomObject"
import { useArticle } from "@/store/articles"
import { useLogin, useUpdateUserscore } from "@/store/user"
import { getPercentage } from "@/utils"

const Quiz = ({ params: { id } }: { params: { id: string } }) => {
   const t = useTranslations()
   const { data } = useArticle(id)
   const { quizz: arrayOfQuestions } = data
   const { data: user } = useLogin()
   const { randomObject, getRandomObject, filteredArrayLength, filteringComplete }: any = useRandomObjectFromArray(
      arrayOfQuestions || []
   )
   const [checkedOption, setCheckedOption] = useState()
   const [isOptionRated, setIsOptionRated] = useState(false)
   const [totalRating, setTotalRating] = useState(0)
   const progressPercentage = getPercentage(filteredArrayLength, arrayOfQuestions?.length)

   const { mutate } = useUpdateUserscore()

   const checkAnswerIfCorrect = () => {
      setTimeout(() => {
         getRandomObject()
         setIsOptionRated(false)
      }, 2000)
      setIsOptionRated(true)
   }

   const updateCheckedOption = (option: any) => {
      setCheckedOption(option)
      if (option === randomObject?.correct_answer) {
         setTotalRating(totalRating + 1)
      }
   }

   useEffect(() => {
      if (filteringComplete && user) {
         const newScore = (totalRating * 100) / arrayOfQuestions?.length
         const userCopy: any = user
         userCopy.score = newScore + userCopy.score
         mutate(userCopy)
      }
   }, [filteringComplete])

   const handleInputState = (inputValue: any) => {
      let inputState = ""
      if (inputValue === checkedOption) {
         inputState = "selected"
         if (isOptionRated && checkedOption === randomObject.correct_answer) {
            inputState = "success"
         } else if (isOptionRated && checkedOption !== randomObject.correct_answer) {
            inputState = "error"
         }
      }
      return inputState
   }
   return (
      <div className="">
         {randomObject?.question ? (
            <>
               <AtomProgressPercentage value={progressPercentage} />
               <AtomTitle extraClassName="font-medium text-xl">{randomObject.question}</AtomTitle>
               {Object.keys(randomObject).map((key) => {
                  if (key.startsWith("option_")) {
                     return (
                        <MoleculeInputCheckGroup
                           checked={checkedOption === randomObject[key]}
                           inputState={handleInputState(randomObject[key]) as "success" | "error" | "selected"}
                           key={key}
                           name="radio-1"
                           onChange={() => updateCheckedOption(randomObject[key])}
                           text={randomObject[key]}
                           value={randomObject[key]}
                        />
                     )
                  }
               })}
               <AtomButton onClick={() => checkAnswerIfCorrect()}>{t("quiz.checkAnswer")}</AtomButton>
            </>
         ) : (
            <AtomTitle extraClassName="font-medium text-2xl mb-5 animate__animated animate__backInRight">
               {t("quiz.quizResult", { totalRating, numberOfQuestions: arrayOfQuestions?.length })}
               <span className="font-bold">{Math.round((totalRating * 100) / arrayOfQuestions?.length)}</span>
            </AtomTitle>
         )}
      </div>
   )
}

export default Quiz
