import { toast } from "react-toastify"
import i18next from "i18next"

import { pbCreateRecord, pbGetList, pbGetSingleRecordQuery } from "../../services"
import { getWordsTranslationFetchImplementation } from "../../services/implementation"
import { debounce, removePunctuation } from "../../utils"
import { constants, types } from "../global.types"

import { handleErrorModal } from "./global.actions"

const { t } = i18next

const resetTranslation = async (dispatch: any) => {
   try {
      dispatch({ type: types.UPDATE_TRANSLATION })
   } catch (error) {
      handleErrorModal(error as any)
   }
}

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

export const getWordsTranslationFromAPI = async (wordToTranslate: string) => {
   try {
      const translation = await getWordsTranslationFetchImplementation(removePunctuation(wordToTranslate))
      return translation
   } catch (error) {
      handleErrorModal(error as any)
   }
}

export const saveTranslationToDB = async (translation: string) => {
   try {
      const recordCreated = await pbCreateRecord(constants.VOCABULARY, translation)
      return recordCreated
   } catch (error: string | any) {
      if (String(error) === "ClientResponseError 400: Failed to create record.") {
         return null
      } else {
         handleErrorModal(error)
      }
   }
}

export const searchTranslationFromSources = async (wordToTranslate: string) => {
   const exactTranslationFromDB = await getWordsTranslationFromDB({
      field: "german_translation",
      operator: "~",
      param: removePunctuation(wordToTranslate)
   })
   if (exactTranslationFromDB) {
      return exactTranslationFromDB
   }
   const similarTranslationFromDB = await getWordsTranslationFromDB({
      field: "conjugation.allConjugations",
      operator: "~",
      param: removePunctuation(wordToTranslate)
   })
   if (similarTranslationFromDB) {
      return similarTranslationFromDB
   }
   const translationFromAPI = await getWordsTranslationFromAPI(wordToTranslate)
   if (translationFromAPI.data) {
      saveTranslationToDB(translationFromAPI.data)
   } else if (translationFromAPI.status === 204) {
      handleErrorModal(t("translation.notFoundTranslation"))
   }
}

export const checkVocaBularyExist = async (userId: string, wordId: string) => {
   const wordIsSaved = pbGetList(constants.STUDY_VOCABULARY, {
      filter: `user_id = "${userId}" && word_id = "${wordId}"`
   })
   return wordIsSaved
}

export const saveVocabularyToStudy = async ({ user, selectedWordTranslation }: any) => {
   try {
      if (user?.id && selectedWordTranslation?.id) {
         const valueExists = await checkVocaBularyExist(user.id, selectedWordTranslation.id)
         if (valueExists.length) {
            toast.info(t("translation.alreadySaved"))
            return
         }
         const data = {
            user_id: user.id,
            word_id: selectedWordTranslation.id,
            last_time_seen: null,
            level: "hard"
         }
         debounce(pbCreateRecord(constants.STUDY_VOCABULARY, data))
         toast.success(t("translation.saved"))
      } else {
         handleErrorModal(t("constants.needSignUp"))
      }
   } catch (error: string | any) {
      handleErrorModal(error)
   }
}
