'use client'

import { useEffect, useState } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { sileo } from 'sileo'

import { getScoreList } from '@/modules/actions/global.actions'
import { getLoginMethods, googleLogin, updateUSer, updateUserScore } from '@/modules/actions/users.actions'
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
         sileo.info({ title: t(err.message as any) })
      },
      onSuccess: () => {
         sileo.success({ title: t('translation.saved') })
      }
   })
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
