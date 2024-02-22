import { pbGetSingleRecordQuery } from "../../services"
import { constants } from "../global.types"

import { handleErrorModal } from "./global.actions"

export const getSingleQuizz = async (id: string) => {
   try {
      const params = { collection: constants.QUIZZES, field: "article_id", param: id }
      const quizz = await pbGetSingleRecordQuery(params)
      return quizz
   } catch (error: string | any) {
      handleErrorModal(error)
      return error
   }
}
