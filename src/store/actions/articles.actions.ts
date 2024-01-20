import { aiModelRequest, pbGetList, pbGetSingleRecord } from "../../services"
import { constants, types } from "../global.types"

import { actionLoaders, handleErrorModal } from "./global.actions"
import { searchTranslationFromSources } from "./translations.actions"

const getAiArticle = async () => {
   const data = await aiModelRequest({
      content: "you are a blogger and will write an article about the city of Prague in b2 german  in 150 words"
   })
   console.log(data)
}

const getArticlesList = async (dispatch) => {
   try {
      dispatch(actionLoaders.loadingArticlesList(true))
      const data = await pbGetList("articles")
      dispatch(articleActionTypes.setArticles(data))
      dispatch(actionLoaders.loadingArticlesList(false))
   } catch (error) {
      handleErrorModal(error)
      dispatch(actionLoaders.loadingArticlesList(false))
   }
}

const getSingleArticle = async (id, dispatch) => {
   try {
      dispatch(actionLoaders.loadingArticle(true))
      const article = await pbGetSingleRecord(constants.ARTICLES, id)
      dispatch(articleActionTypes.setSelectedArticle(article))
      dispatch(actionLoaders.loadingArticle(false))
   } catch (error) {
      handleErrorModal(error)
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
