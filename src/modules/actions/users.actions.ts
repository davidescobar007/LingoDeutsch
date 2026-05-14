import {
   pbCreateRecord,
   pbGetSingleRecordQuery,
   pbListAuthMethods,
   pbLogOut,
   pbSignUp,
   pbUpdateRecord
} from '@/network/index'
import { pb } from '@/network/setup'
import { localStorageHandler } from '@/utils'

import { constants } from '../global.types'

import { handleErrorModal } from './global.actions'
import { TUser } from './types'

export const getScore = async (userId: string): Promise<number> => {
   try {
      const { score } = await pbGetSingleRecordQuery({
         collection: constants.SCORE,
         field: 'user_id',
         param: userId,
         fields: 'score'
      })
      return score
   } catch (error: string | any) {
      handleErrorModal(error)
      return error
   }
}

export const updateUSer = async (user: TUser) => pbUpdateRecord(constants.USERS, user.id, user)

export const updateUserScore = async ({ user, newScore }: { user: TUser; newScore: number }): Promise<void> => {
   user.score = Math.round(newScore + (user.score ?? 0))
   await pbUpdateRecord(constants.USERS, user.id, user)
   updateUserState()
}

export const getLoginMethods = async () => {
   const methods = await pbListAuthMethods()
   const providers = methods.oauth2?.providers || []
   localStorage.setItem('provider', JSON.stringify(providers))
   return providers
}

export const updateUserState = async () => {
   try {
      const currentUser = pb.authStore.record as TUser | null
      if (currentUser?.id) {
         const userScore = await getScore(currentUser.id)
         currentUser.userScore = userScore
         return currentUser
      }
      return null
   } catch (error: string | any) {
      return error
   }
}

export const googleLogin = async (): Promise<TUser> => {
   const { saveItem, storageItem } = localStorageHandler('user')
   if (storageItem) {
      return storageItem as TUser
   }
   const { origin, pathname } = window.location
   const redirectUrl = `${origin}/${pathname.split('/')[1]}/app/home`
   const params = new URL(window.location as any).searchParams
   const storedProvider = localStorage.getItem('provider')
   if (!storedProvider) {
      throw new Error('No OAuth provider found in storage.')
   }
   const [provider] = JSON.parse(storedProvider)
   if (provider.state !== params.get('state')) {
      throw new Error("State parameters don't match.")
   }
   const providerName = provider.name
   const code = params.get('code') ?? ''
   const codeVerifier = provider.codeVerifier
   try {
      const result = await pbSignUp(providerName, code, codeVerifier, redirectUrl)
      const record = result.record
      const meta = result.meta
      record?.id && pbCreateRecord(constants.SCORE, { user_id: record.id })
      if (!record.avatarUrl && !record.name) {
         record.avatarUrl = meta?.avatarUrl || ''
         record.name = meta?.name
         const updatedUSer = await pbUpdateRecord(constants.USERS, record.id, record)
         saveItem(updatedUSer)
         return updatedUSer as unknown as TUser
      }
      return record as unknown as TUser
   } catch (error: string | any) {
      return error
   }
}

export const logOut = () => {
   pbLogOut()
   localStorage.removeItem('user')
   localStorage.removeItem('provider')
}
