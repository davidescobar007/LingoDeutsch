import { toast } from "react-toastify"
import i18next from "i18next"

import {
   pbCreateRecord,
   pbGetSingleRecordQuery,
   pbListAuthMethods,
   pbLogOut,
   pbSignUp,
   pbUpdateRecord
} from "@/network/index"

import { constants } from "../global.types"

import { handleErrorModal } from "./global.actions"

const { t } = i18next

export const getScore = async (userId: string) => {
   try {
      const response = await pbGetSingleRecordQuery({
         collection: constants.SCORE,
         field: "user_id",
         param: userId,
         fields: "score"
      })
      const { score } = response
      return score
   } catch (error: string | any) {
      handleErrorModal(error)
   }
}

export const updateUSer = async (user: any) => {
   try {
      const updatedUser = await pbUpdateRecord(constants.USERS, user.id, user)
      if (updatedUser) {
         toast.success(t("profile.success"))
      }
   } catch (error: string | any) {
      handleErrorModal(error)
   }
}

export const updateUserScore = async (id: string, newScore: number) => {
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

export const getLoginMethods = async () => {
   const authMethods = await pbListAuthMethods()
   localStorage.setItem("provider", JSON.stringify(authMethods?.authProviders))
   return authMethods?.authProviders
}

export const updateUserState = async () => {
   const pbModel = JSON.parse(localStorage.getItem("pocketbase_auth") || "")
   try {
      if (pbModel) {
         const { model } = pbModel
         const userScore = await getScore(model.id)
         model["userScore"] = userScore
         return model
      }
   } catch (error: string | any) {
      handleErrorModal(error)
   }
}

export const googleLogin = async () => {
   const params = new URL(window.location as any).searchParams
   if (params.get("state")) {
      const redirectUrl = window.location.origin + "/learn"
      const provider = JSON.parse(localStorage.getItem("provider") || "")
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
            const userScore = await getScore(updatedUSer.id)
            updatedUSer["userScore"] = userScore
            return updatedUSer
         }
         const userScore = await getScore(user.record.id)
         user.record["userScore"] = userScore
         return user.record
      } catch (error: string | any) {
         handleErrorModal(error)
      }
   }
}

export const logOut = () => {
   try {
      pbLogOut()
      localStorage.removeItem("user")
   } catch (error: string | any) {
      handleErrorModal(error)
   }
}
