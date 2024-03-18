/* eslint-disable no-useless-catch */

import { pbCreateRecord, pbGetList, pbGetSingleRecordQuery } from "@/network"
import { getWordsTranslationFetchImplementation } from "@/network/implementation"
import { pb } from "@/network/setup"
import { removePunctuation } from "@/utils"

import { constants } from "../global.types"

import { delay } from "./actions.utils"
import { handleErrorModal } from "./global.actions"
import { Ttranslation } from "./types"
import { isUserLoged } from "./users.actions"

export const getWordsTranslationFromDB = async (params: any) => {
   try {
      const translation = await pbGetSingleRecordQuery({ ...params, collection: constants.VOCABULARY })
      return translation
   } catch (error) {
      if (String(error) === "ClientResponseError 404: The requested resource wasn't found.") {
         return null
      } else {
         handleErrorModal(error as any)
         return error
      }
   }
}

export const searchTranslationFromSources = async (wordToTranslate: string): Promise<Ttranslation> => {
   try {
      await delay()
      const exactTranslationFromDB = await getWordsTranslationFromDB({
         field: "german_translation",
         operator: "~",
         param: removePunctuation(wordToTranslate)
      })
      if (exactTranslationFromDB) return exactTranslationFromDB as Ttranslation

      const similarTranslationFromDB = await getWordsTranslationFromDB({
         field: "conjugation.allConjugations",
         operator: "~",
         param: removePunctuation(wordToTranslate)
      })
      if (similarTranslationFromDB) return similarTranslationFromDB as Ttranslation
      const translationFromAPI = await getWordsTranslationFetchImplementation(removePunctuation(wordToTranslate))
      if (!translationFromAPI) {
         throw new Error()
      }
      const newTranslationSaved = pbCreateRecord(constants.VOCABULARY, translationFromAPI)
      return newTranslationSaved as unknown as Ttranslation
   } catch (error) {
      throw error
   }
}

export const checkVocaBularyExist = async (userId: string, wordId: string) => {
   const wordIsSaved = pbGetList(constants.STUDY_VOCABULARY, {
      filter: `user_id = "${userId}" && word_id = "${wordId}"`
   })
   return wordIsSaved
}

export const saveVocabularyToStudy = async (selectedWordTranslation: any) => {
   try {
      if (isUserLoged() && selectedWordTranslation?.id) {
         await delay()
         const userId = pb.authStore.model?.id || ""
         const valueExists = await checkVocaBularyExist(userId, selectedWordTranslation.id)
         if (valueExists.length) {
            throw new Error("translation.alreadySaved")
         }
         const data = {
            user_id: userId,
            word_id: selectedWordTranslation.id,
            last_time_seen: null,
            level: "hard"
         }
         pbCreateRecord(constants.STUDY_VOCABULARY, data)
      } else {
         throw new Error("translation.error")
      }
   } catch (error) {
      throw error
   }
}
