import { pbGetSingleRecordQuery } from "../../services"
import { constants, types } from "../global.types"

import { actionLoaders, handleErrorModal } from "./global.actions"

const getSingleQuizz = async (id, dispatch) => {
   try {
      dispatch(actionLoaders.loadingQuizz(true))
      const params = { collection: constants.QUIZZES, field: "article_id", param: id }
      const quizz = await pbGetSingleRecordQuery(params)
      dispatch(quizzActionTypes.setQuizz(quizz))
      dispatch(actionLoaders.loadingQuizz(false))
   } catch (error) {
      handleErrorModal(error)
   }
}

const quizzActionTypes = {
   setQuizz: (payload) => ({
      type: types.SET_QUIZZ,
      payload
   })
}

export { getSingleQuizz }
