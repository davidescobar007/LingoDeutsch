import i18next from 'i18next'
import { Admin, AuthProviderInfo, RecordAuthResponse } from 'pocketbase'

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

const { t } = i18next

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

export const updateUserScore = async (user: TUser): Promise<void> => {
   user.score = Math.round(Number(user.score))
   await pbUpdateRecord(constants.USERS, user.id, user)
}

export const getLoginMethods = async (): Promise<AuthProviderInfo[]> => {
   const { authProviders } = await pbListAuthMethods()
   localStorage.setItem('provider', JSON.stringify(authProviders))
   return authProviders
}

export const updateUserState = async () => {
   const pbModel = JSON.parse(localStorage.getItem('pocketbase_auth') || '')
   try {
      if (pbModel) {
         const { model } = pbModel
         const userScore = await getScore(model.id)
         model['userScore'] = userScore
         return model
      }
   } catch (error: string | any) {
      return error
   }
}

export const googleLogin = async (): Promise<TUser> => {
   const { saveItem, storageItem } = localStorageHandler<TUser>('user')
   if (storageItem) {
      return storageItem
   }
   const { origin, pathname } = window.location
   const redirectUrl = `${origin}/${pathname.split('/')[1]}/app/home`
   const params = new URL(window.location as any).searchParams
   const [provider] = JSON.parse(localStorage.getItem('provider') ?? '')
   if (provider.state !== params.get('state')) {
      throw new Error("State parameters don't match.")
   }
   const providerName = provider.name
   const code = params.get('code') ?? ''
   const codeVerifier = provider.codeVerifier
   try {
      const { record, meta }: RecordAuthResponse<TUser> = await pbSignUp(
         providerName,
         code,
         codeVerifier,
         redirectUrl
      )
      record?.id && pbCreateRecord(constants.SCORE, { user_id: record.id })
      if (!record.avatarUrl && !record.name) {
         record.avatarUrl = meta?.avatarUrl || ''
         record.name = meta?.name
         const updatedUSer = await pbUpdateRecord(constants.USERS, record.id, record)
         saveItem(updatedUSer)
         return updatedUSer as unknown as TUser
      }
      return record
   } catch (error: string | any) {
      return error
   }
}

export const isUserLoged = pb.authStore.isValid

export const getUserInfo = (): TUser | null | Admin => pb.authStore.model

export const logOut = () => {
   try {
      pbLogOut()
      localStorage.removeItem('user')
   } catch (error: string | any) {
      handleErrorModal(error)
   }
}
