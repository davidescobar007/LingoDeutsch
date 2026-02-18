'use client'

import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'

import { getScoreList } from '@/modules/actions/global.actions'
import {
   getLoginMethods,
   getUserInfo,
   googleLogin,
   updateUSer,
   updateUserScore
} from '@/modules/actions/users.actions'
import { usePathname } from '@/navigation'

export const useAuth = () => {
   const {
      data: authMethods,
      error,
      isLoading
   } = useQuery({ queryKey: ['authMethodsList'], queryFn: getLoginMethods })
   return { authMethods, error, isLoading }
}

export const useLogin = (enabled = false) => {
   return useQuery({
      queryKey: ['googleAuth'],
      queryFn: googleLogin,
      enabled,
      retry: false
   })
}

export const useScore = () => {
   return useQuery({ queryKey: ['scoreList'], queryFn: getScoreList })
}

export const useUpdateUserscore = () => {
   return useMutation({ mutationFn: updateUserScore })
}

export const useUpdateUser = () => {
   const t = useTranslations()
   return useMutation({
      mutationFn: updateUSer,
      onError: (err) => {
         toast.info(t(err.message as any))
      },
      onSuccess: () => {
         toast.success(t('translation.saved'))
      }
   })
}

export const useGetUserInfo = () => {
   return useQuery({ queryKey: ['getUserInfo'], queryFn: getUserInfo })
}

export const useOAuthParams = (): boolean => {
   const pathname = usePathname()
   const searchParams = useSearchParams()
   const [hasOAuthParams, setHasOAuthParams] = useState(false)

   useEffect(() => {
      setHasOAuthParams(!!searchParams.get('state'))
   }, [pathname, searchParams]) // ← Se re-ejecuta al cambiar ruta o query params

   return hasOAuthParams
}
