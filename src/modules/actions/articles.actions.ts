/* eslint-disable no-restricted-globals */
import { pbGetList, pbGetSingleRecord } from "@/network"

import { constants } from "../global.types"

import { delay } from "./actions.utils"
import { TArticle } from "./types"

// const getAiArticle = async () => {
//    const data = await aiModelRequest({
//       content: "you are a blogger and will write an article about the city of Prague in b2 german  in 150 words"
//    })
//    console.log(data)
// }

const getArticlesList = async (): Promise<TArticle[]> => {
   try {
      const data = await pbGetList("articles")
      return data as unknown as TArticle[]
   } catch (error: any) {
      return error
   }
}

const getSingleArticle = async (articleId: string): Promise<TArticle> => {
   const article = await pbGetSingleRecord(constants.ARTICLES, articleId)
   await delay()
   return article as unknown as TArticle
}

export { getArticlesList, getSingleArticle }
