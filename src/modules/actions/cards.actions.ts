import { toast } from "react-toastify"
import i18next from "i18next"

import { delay } from "@/store/actions/actions.utils"
import { constants } from "@/store/modules/global.types"

import { pbGetList, pbUpdateRecord } from "../../services"

import { handleErrorModal } from "./global.actions"

export const getCardsList = async ({ user, cards }: any, filter: string) => {
   try {
      if (!user?.id) {
         handleErrorModal(i18next.t("constants.needSignUp"))
         return
      }
      const fields =
         "expand.word_id.german_translation,expand.word_id.spanish_translation,id,level,last_time_seen,times_seen,level_history"

      const cardsNoLevelFilter = await pbGetList(constants.STUDY_VOCABULARY, {
         filter: `user_id = "${user.id}"`,
         expand: "word_id",
         fields
      })

      const cardsWithLevelFilter = await pbGetList(constants.STUDY_VOCABULARY, {
         filter: `user_id = "${user.id}" && level="${filter}"`,
         expand: "word_id",
         fields
      })
      await delay()
      if (filter && cardsWithLevelFilter.length) {
         return cardsWithLevelFilter
      } else if (filter && !cardsWithLevelFilter.length) {
         localStorage.removeItem("selectedLevel")
         toast.info(i18next.t("practice.noFilterResult", { level: i18next.t(`practice.cardStat.${filter}`) }))
         return cardsNoLevelFilter
      } else if (!filter) {
         return cardsNoLevelFilter
      }
      return cards || cardsNoLevelFilter
   } catch (error: string | any) {
      handleErrorModal(error)
      return error
   }
}

export const updateCard = async (card: any) => {
   const currentDate = new Date()
   card.last_time_seen = currentDate
   card.times_seen = Number(card.times_seen + 1)
   const levelHistoryObj = { level: card.level, date: currentDate, value: constants.CARDS_LEVEL[card.level] }
   card.level_history = card.level_history?.length ? [...card.level_history, levelHistoryObj] : [levelHistoryObj]
   await pbUpdateRecord(constants.STUDY_VOCABULARY, card.id, card)
}
