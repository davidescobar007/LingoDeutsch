import { pbGetList } from "../../services"
import { types } from "../global.reducer"
import { constants } from "../global.types"

import { flattenObj } from "./actions.utils"
import * as articlesActions from "./articles.actions"
import * as cardsActions from "./cards.actions"
import * as quizzesActions from "./quizzes.actions"
import * as translationsAction from "./translations.actions"
import * as usersActions from "./users.actions"

const handleErrorModal = (message) => {
   console.warn(message)
   let inputs = document.getElementById("modalWarning")
   let titleElement = document.getElementById("modalTextContent")
   inputs.checked = true
   titleElement.innerHTML = ""
   titleElement.appendChild(document.createTextNode(message))
}

const getScoreList = async (dispatch) => {
   try {
      const scoreList = await pbGetList(constants.SCORE, {
         expand: "user_id",
         fields: "expand.user_id.username,score",
         sort: "-score"
      })
      const resolveScoreList = scoreList.map((item, index) => {
         item.position = index + 1
         return flattenObj(item)
      })
      dispatch(actionHandlerTypes.setScoreList(resolveScoreList))
   } catch (error) {
      handleErrorModal(error)
   }
}

const actionHandlerTypes = {
   setScoreList: (payload) => ({
      type: types.SET_SCORE_LIST,
      payload
   }),
   trigerMenu: () => ({
      type: types.IS_MENU_OPEN
   }),
   setUiTheme: () => ({
      type: types.SET_THEME
   }),
   error: (payload) => ({
      type: types.SERVICE_ERROR,
      payload
   })
}

export const actionLoaders = {
   loadingWordTranslation: (payload) => ({
      type: types.LOADING_WORD_TRANSLATION,
      payload
   }),
   loadingArticlesList: (payload) => ({
      type: types.LOADING_ARTICLE_LIST,
      payload
   }),
   loadingArticle: (payload) => ({
      type: types.LOADING_ARTICLE,
      payload
   }),
   loadingCards: (payload) => {
      return {
         type: types.LOADING_CARDS,
         payload
      }
   },
   loadingProfile: (payload) => ({
      type: types.LOADING_PROFILE,
      payload
   }),
   loadingQuizz: (payload) => ({
      type: types.LOADING_QUIZZ,
      payload
   })
}
export {
   actionHandlerTypes,
   articlesActions,
   cardsActions,
   getScoreList,
   handleErrorModal,
   quizzesActions,
   translationsAction,
   usersActions
}
