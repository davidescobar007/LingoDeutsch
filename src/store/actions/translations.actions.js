import { toast } from "react-toastify"
import i18next from "i18next"

import { pbCreateRecord, pbGetList, pbGetSingleRecordQuery } from "../../services"
import { getWordsTranslationFetchImplementation } from "../../services/implementation"
import { debounce, removePunctuation } from "../../utils"
import { constants, types } from "../global.types"

import { actionLoaders, handleErrorModal } from "./global.actions"

const { t } = i18next
const resetTranslation = async (dispatch) => {
   try {
      dispatch({ type: types.UPDATE_TRANSLATION })
   } catch (error) {
      handleErrorModal(error)
   }
}

const getWordsTranslationFromDB = async (params, dispatch) => {
   try {
      const translation = await pbGetSingleRecordQuery({ ...params, collection: constants.VOCABULARY })
      dispatch(translationActionTypes.setTranslation(translation))
      return translation
   } catch (error) {
      if (String(error) === "ClientResponseError 404: The requested resource wasn't found.") {
         return null
      } else {
         handleErrorModal(error)
      }
   }
}

const getWordsTranslationFromAPI = async (wordToTranslate) => {
   try {
      const translation = await getWordsTranslationFetchImplementation(removePunctuation(wordToTranslate))
      return translation
   } catch (error) {
      handleErrorModal(error)
   }
}

const saveTranslationToDB = async (translation, dispatch) => {
   try {
      const recordCreated = await pbCreateRecord(constants.VOCABULARY, translation)
      dispatch(translationActionTypes.setTranslation(recordCreated))
      return recordCreated
   } catch (error) {
      if (String(error) === "ClientResponseError 400: Failed to create record.") {
         dispatch(translationActionTypes.setTranslation(translation))
         return null
      } else {
         handleErrorModal(error)
      }
   }
}

const searchTranslationFromSources = async (wordToTranslate, dispatch) => {
   dispatch(actionLoaders.loadingWordTranslation(true))

   const exactTranslationFromDB = await getWordsTranslationFromDB(
      { field: "german_translation", operator: "~", param: removePunctuation(wordToTranslate) },
      dispatch
   )
   if (exactTranslationFromDB) {
      dispatch(actionLoaders.loadingWordTranslation(false))
      return
   }
   const similarTranslationFromDB = await getWordsTranslationFromDB(
      { field: "conjugation.allConjugations", operator: "~", param: removePunctuation(wordToTranslate) },
      dispatch
   )
   if (similarTranslationFromDB) {
      dispatch(actionLoaders.loadingWordTranslation(false))
      return
   }
   const translationFromAPI = await getWordsTranslationFromAPI(wordToTranslate, dispatch)
   if (translationFromAPI.data) {
      saveTranslationToDB(translationFromAPI.data, dispatch)
      dispatch(actionLoaders.loadingWordTranslation(false))
      return
   } else if (translationFromAPI.status === 204) {
      handleErrorModal(t("translation.notFoundTranslation"))
      dispatch(actionLoaders.loadingWordTranslation(false))
      return
   }
   dispatch(actionLoaders.loadingWordTranslation(false))
}

const checkVocaBularyExist = async (userId, wordId) => {
   const wordIsSaved = pbGetList(constants.STUDY_VOCABULARY, {
      filter: `user_id = "${userId}" && word_id = "${wordId}"`
   })
   return wordIsSaved
}

const saveVocabularyToStudy = async ({ user, selectedWordTranslation }) => {
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
   } catch (error) {
      handleErrorModal(error)
   }
}

const translationActionTypes = {
   setTranslation: (payload) => ({
      type: types.UPDATE_TRANSLATION,
      payload
   })
}

export {
   getWordsTranslationFromAPI,
   getWordsTranslationFromDB,
   resetTranslation,
   saveTranslationToDB,
   saveVocabularyToStudy,
   searchTranslationFromSources
}
