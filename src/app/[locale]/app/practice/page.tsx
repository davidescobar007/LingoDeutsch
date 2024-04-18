"use client"
import { useEffect, useMemo, useState } from "react"
import { toast } from "react-toastify"
import { useTranslations } from "next-intl"
import { useLocalStorage } from "usehooks-ts"

import AtomButton from "@/components/atoms/button"
import { PracticeLoader } from "@/components/atoms/loader"
import AtomProgressPercentage from "@/components/atoms/progressBar"
import AtomTitle from "@/components/atoms/title"
import MoleculeBadgeList from "@/components/molecules/badgeList"
import MoleculeCardsStats from "@/components/molecules/cardsStats"
import MoleculeFlipCard from "@/components/molecules/flipCard"
import { TCard } from "@/modules/actions/types"
import { useGetCardsList, useUpdateCard } from "@/store/cards"
import { getPercentage } from "@/utils"

const Practice = () => {
   const t = useTranslations()
   const [value, setValue] = useLocalStorage("selectedLevel", "")
   const { mutate } = useUpdateCard()
   const { data: cards, isLoading, refetch } = useGetCardsList(value as string)
   const [filteredCardsList, setFilteredCardsList] = useState<TCard[]>([])
   const areThereCardsInThisLEvel = useMemo(() => cards?.every((card) => card.level === value), [cards, value])
   const percentage = getPercentage(filteredCardsList.length - 1, cards?.length as number)
   const levelTranslations = [
      { label: t("practice.cardStat.easy"), value: "easy" },
      { label: t("practice.cardStat.medium"), value: "medium" },
      { label: t("practice.cardStat.hard"), value: "hard" }
   ]

   useEffect(() => {
      if (cards) {
         setFilteredCardsList(cards)
         const cardsContainValue = cards.every((card) => card.level === value)
         if (!cardsContainValue) {
            toast.info(t("practice.noFilterResult", { level: t(`practice.cardStat.${value}`) }))
         }
      }
   }, [cards, t, value])

   const getCardsByLevel = (event: any): void => {
      const selectedLevelTarget = event.target.dataset["value"]
      setValue(selectedLevelTarget)
   }

   const handleNextCard = (level: string): void => {
      const filteredCardsListCopy = [...filteredCardsList]
      filteredCardsListCopy.shift()
      setFilteredCardsList(filteredCardsListCopy)
      const mutatedCard = filteredCardsList[0]
      mutatedCard.level = level
      mutate(mutatedCard)
   }

   return (
      <section className="flex w-full justify-center">
         {isLoading ? (
            <PracticeLoader />
         ) : percentage > 100 ? (
            <div className="flex flex-col">
               <MoleculeCardsStats />
               {/* TODO: onclick to restart  useRandomObjectFromArray customHook*/}
               <AtomButton onClick={() => refetch()}>{t("practice.startAgain")}</AtomButton>
            </div>
         ) : filteredCardsList?.length ? (
            <div className="w-full justify-center">
               <MoleculeBadgeList
                  itemsArray={levelTranslations}
                  onClick={getCardsByLevel}
                  selectedItem={areThereCardsInThisLEvel ? value : ""}
               />
               <AtomProgressPercentage value={percentage} />
               <MoleculeFlipCard
                  germanText={filteredCardsList[0]?.expand?.word_id?.german_translation || ""}
                  spanishText={filteredCardsList[0]?.expand?.word_id?.spanish_translation || ""}
               />
               <footer className="mt-6 flex w-full content-between justify-center">
                  <div className="btn-group flex gap-1 md:gap-3">
                     <button
                        className="btn btn-outline btn-accent px-2 md:px-4"
                        onClick={() => handleNextCard(levelTranslations[0].value)}
                     >
                        <span className="text-lg">🙂</span>
                        {t("practice.cardStat.easy")}
                     </button>
                     <button
                        className="btn btn-outline btn-primary px-2 md:px-4"
                        onClick={() => handleNextCard(levelTranslations[1].value)}
                     >
                        <span className="text-lg">🤔</span>
                        {t("practice.cardStat.medium")}
                     </button>
                     <button
                        className="btn btn-outline btn-warning px-2 md:px-4"
                        onClick={() => handleNextCard(levelTranslations[2].value)}
                     >
                        <span className="text-lg">😰</span>
                        {t("practice.cardStat.hard")}
                     </button>
                  </div>
               </footer>
            </div>
         ) : (
            <AtomTitle extraClassName="text-xl font-semibold mb-3" type="h3">
               {t("practice.noVocabulary")}
            </AtomTitle>
         )}
      </section>
   )
}

export default Practice
