import { flattenObj } from "@/modules/actions/actions.utils"
import { pbGetList } from "@/network/index"

import { constants } from "../global.types"

import { TScore } from "./types"

export const handleErrorModal = (message: string) => {
   console.warn(message)
   let inputs: any = document.getElementById("modalWarning")
   let titleElement: any = document.getElementById("modalTextContent")
   inputs.checked = true
   titleElement.innerHTML = ""
   titleElement.appendChild(document.createTextNode(message))
}

export const getScoreList = async (): Promise<TScore> => {
   try {
      const scoreList = await pbGetList(constants.SCORE, {
         expand: "user_id",
         fields: "expand.user_id.username,score",
         sort: "-score"
      })
      const resolveScoreList = scoreList.map((item: any, index: any) => {
         item.position = index + 1
         return flattenObj(item)
      })
      return resolveScoreList as TScore
   } catch (error: string | any) {
      return error
   }
}
