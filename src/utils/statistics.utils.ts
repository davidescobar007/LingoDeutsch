import i18next from "i18next"

import { filterProperties, flattenObjects } from "."
const { t } = i18next

const getWordsByLevel = (wordList: any, level: string) => {
   return filterProperties(flattenObjects(wordList), [
      "german_translation",
      "level",
      "times_seen",
      "level_history"
   ]).filter((word) => word.level === level && word.times_seen > 0)
}

export const getLevelsData = (wordList: any) => {
   const listOfHardWords = getWordsByLevel(wordList, "hard")
   const listOfMediumWords = getWordsByLevel(wordList, "medium")
   const listOfEasyWords = getWordsByLevel(wordList, "easy")
   return {
      labels: [t("practice.cardStat.easy"), t("practice.cardStat.medium"), t("practice.cardStat.hard")],
      datasets: [
         {
            label: t("data.words_by_level"),
            data: [listOfEasyWords.length, listOfMediumWords.length, listOfHardWords.length],
            borderWidth: 2,
            backgroundColor: ["#58cc02", "#44ccff", "#F5CE42"]
         }
      ]
   }
}
