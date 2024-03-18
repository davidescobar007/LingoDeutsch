import { pbGetSingleRecordQuery } from "@/network"

import { constants } from "../global.types"

export const getSingleQuizz = async (id: string) => {
   try {
      const params = { collection: constants.QUIZZES, field: "article_id", param: id }
      const quizz = await pbGetSingleRecordQuery(params)
      return quizz
   } catch (error: string | any) {
      return error
   }
}
