/* eslint-disable no-useless-catch */

import { queryOperators } from "@/modules/global.types"
import { pb } from "@/network/setup"

export const pbGetList = async (collection: string, options: any) => {
   const records = await pb.collection(collection).getFullList(200, options)
   return records
}

export const pbGetSingleRecord = async (collection: string, recordId: string, expand: any = null) => {
   const records = await pb.collection(collection).getOne(recordId, {
      expand
   })
   return records
}

export const pbGetSingleRecordQuery = async ({
   collection,
   field,
   operator = queryOperators.EQUAL_TO,
   param,
   ...rest
}: {
   collection: string
   field: any
   operator: string
   param: any
}) => {
   const records = await pb.collection(collection).getFirstListItem(`${field} ${operator} "${param}"`, { ...rest })
   return records
}

export const pbCreateRecord = async (collection: string, data: any) =>
   await pb.collection(collection).create(data, { $autoCancel: false })

export const pbDeleteRecord = async (collection: string, id: string) => {
   await pb.collection(collection).delete(id)
}

export const pbUpdateRecord = async (collection: string, recordID: string, data: any) => {
   const recordResult = await pb.collection(collection).update(recordID, data)
   return recordResult
}

export const fetchData = async (method: string, url: string, body = null, headers = {}) => {
   try {
      const options: any = {
         method: method,
         headers: {
            "Content-Type": "application/json",
            ...headers
         }
      }

      if (body) options.body = JSON.stringify(body)

      const response = await fetch(url, options)
      const data = await response

      if (!response.ok) return new Error(`${data}` || "Something went wrong")

      return data
   } catch (error) {
      throw error
   }
}

export const pbSignUp = async (provider: string, code: string, codeVerifier: any, redirectUrl: string) => {
   const resultLoginData = await pb.collection("users").authWithOAuth2(provider, code, codeVerifier, redirectUrl)
   return resultLoginData
}

export const pbListAuthMethods = async () => {
   const methods = await pb.collection("users").listAuthMethods()
   return methods
}

export const pbLogOut = () => {
   pb.authStore.clear()
}
