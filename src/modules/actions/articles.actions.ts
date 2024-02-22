import { aiModelRequest, pbGetList, pbGetSingleRecord } from "../../services"
import { constants, types } from "../global.types"

import { handleErrorModal } from "./global.actions"
import { searchTranslationFromSources } from "./translations.actions"

const getAiArticle = async () => {
   const data = await aiModelRequest({
      content: "you are a blogger and will write an article about the city of Prague in b2 german  in 150 words"
   })
   console.log(data)
}

const getArticlesList = async () => {
   try {
      const data = await pbGetList("articles")
      return data
   } catch (error) {
      handleErrorModal(error)
      return error
   }
}

const getSingleArticle = async (id: any) => {
   try {
      const article = await pbGetSingleRecord(constants.ARTICLES, id)
      return article
   } catch (error) {
      handleErrorModal(error)
      return error
   }
}

const setSelectedArticle = async (article, dispatch) => {
   try {
      dispatch(articleActionTypes.setSelectedArticle(article))
   } catch (error) {
      handleErrorModal(error)
   }
}

const setSelectedWord = async (word, selectedWordInState, dispatch) => {
   try {
      dispatch(articleActionTypes.setSelectedWord(word))
      selectedWordInState !== word && searchTranslationFromSources(word, dispatch)
   } catch (error) {
      handleErrorModal(error)
   }
}

const resetTranslation = async (dispatch) => {
   try {
      dispatch({ type: types.UPDATE_TRANSLATION })
   } catch (error) {
      handleErrorModal(error)
   }
}

const articleActionTypes = {
   setArticles: (payload) => ({
      type: types.SET_ARTICLES,
      payload
   }),
   setSelectedArticle: (payload) => ({
      type: types.SET_SELECTED_ARTICLE,
      payload
   }),
   setSelectedWord: (payload) => ({
      type: types.SET_SELECTED_WORD,
      payload
   })
}

export { getAiArticle, getArticlesList, getSingleArticle, resetTranslation, setSelectedArticle, setSelectedWord }
