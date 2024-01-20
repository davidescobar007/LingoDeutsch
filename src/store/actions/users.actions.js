import { toast } from "react-toastify"
import i18next from "i18next"

import {
   pbCreateRecord,
   pbGetSingleRecordQuery,
   pbListAuthMethods,
   pbLogOut,
   pbSignUp,
   pbUpdateRecord
} from "../../services"
import { types } from "../global.reducer"
import { constants } from "../global.types"

import { actionLoaders, handleErrorModal } from "./global.actions"

const { t } = i18next
const getScore = async (dispatch, userId) => {
   try {
      const response = await pbGetSingleRecordQuery({
         collection: constants.SCORE,
         field: "user_id",
         param: userId,
         fields: "score"
      })
      const { score } = response
      return score
   } catch (error) {
      handleErrorModal(error)
   }
}

const updateUSer = async (dispatch, user) => {
   try {
      const updatedUser = await pbUpdateRecord(constants.USERS, user.id, user)
      updateUserState(dispatch)
      if (updatedUser) {
         toast.success(t("profile.success"))
      }
   } catch (error) {
      handleErrorModal(error)
   }
}

const updateUserScore = async (id, newScore) => {
   const params = {
      collection: constants.SCORE,
      field: "user_id",
      param: id
   }
   const userScore = await pbGetSingleRecordQuery(params)
   const currentScore = Number(userScore.score)
   userScore.score = Math.round(currentScore + Number(newScore))
   await pbUpdateRecord(constants.SCORE, userScore.id, userScore)
}

const getLoginMethods = async (dispatch) => {
   const authMethods = await pbListAuthMethods()
   localStorage.setItem("provider", JSON.stringify(authMethods?.authProviders))
   dispatch(actionHandlerTypes.setAuthMethods(authMethods?.authProviders))
}

const updateUserState = async (dispatch) => {
   const pbModel = JSON.parse(localStorage.getItem("pocketbase_auth"))
   try {
      if (pbModel) {
         dispatch(actionLoaders.loadingProfile(true))
         const { model } = pbModel
         const userScore = await getScore(dispatch, model.id)
         model["userScore"] = userScore
         dispatch(actionHandlerTypes.setUser(model))
         dispatch(actionLoaders.loadingProfile(false))
      }
   } catch (error) {
      handleErrorModal(error)
   }
}

const googleLogin = async (dispatch) => {
   const params = new URL(window.location).searchParams
   if (params.get("state")) {
      const redirectUrl = window.location.origin + "/learn"
      const provider = JSON.parse(localStorage.getItem("provider"))
      // if (provider.state !== params.get("state")) {
      //    throw "State parameters don't match."
      // }
      const provName = provider[0].name
      const code = params.get("code")
      const codeVerifier = provider[0].codeVerifier
      try {
         const user = await pbSignUp(provName, code, codeVerifier, redirectUrl)
         user?.record?.id && pbCreateRecord(constants.SCORE, { user_id: user.record.id })
         if (!user.record.avatarUrl && !user.record.name) {
            user.record.avatarUrl = user.meta.avatarUrl
            user.record.name = user.meta.name
            const updatedUSer = await pbUpdateRecord(constants.USERS, user.record.id, user.record)
            const userScore = await getScore(dispatch, updatedUSer.id)
            updatedUSer["userScore"] = userScore
            dispatch(actionHandlerTypes.setUser(updatedUSer))
            return
         }
         const userScore = await getScore(dispatch, user.record.id)
         user.record["userScore"] = userScore
         dispatch(actionHandlerTypes.setUser(user.record))
      } catch (error) {
         handleErrorModal(error)
      }
   }
}

const logOut = (dispatch) => {
   try {
      pbLogOut()
      localStorage.removeItem("user")
      dispatch(actionHandlerTypes.setUser(null))
   } catch (error) {
      handleErrorModal(error)
   }
}

const actionHandlerTypes = {
   setAuthMethods: (payload) => ({
      type: types.SET_AUTH_METHODS,
      payload
   }),
   setUser: (payload) => ({
      type: types.SET_USER,
      payload
   })
}

export { getLoginMethods, googleLogin, logOut, updateUSer, updateUserScore, updateUserState }
