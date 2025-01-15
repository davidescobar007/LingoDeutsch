'use client'

import { toast } from 'react-toastify'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'

import { getScoreList } from '@/modules/actions/global.actions'
import { getLoginMethods, googleLogin, updateUSer, updateUserScore } from '@/modules/actions/users.actions'

export const useAuth = () => {
   const {
      data: authMethods,
      error,
      isLoading
   } = useQuery({ queryKey: ['authMethodsList'], queryFn: getLoginMethods })
   return { authMethods, error, isLoading }
}

export const useLogin = () => {
   return useQuery({ queryKey: ['googleAuth'], queryFn: googleLogin })
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
         toast.info(t(err.message))
      },
      onSuccess: () => {
         toast.success(t('translation.saved'))
      }
   })
}
