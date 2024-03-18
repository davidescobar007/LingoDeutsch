"use client"

import { useMutation, useQuery } from "@tanstack/react-query"

import { getScoreList } from "@/modules/actions/global.actions"
import { getLoginMethods, googleLogin, updateUserScore } from "@/modules/actions/users.actions"

export const useAuth = () => {
   const {
      data: authMethods,
      error,
      isLoading
   } = useQuery({ queryKey: ["authMethodsList"], queryFn: getLoginMethods })
   return { authMethods, error, isLoading }
}

export const useLogin = () => {
   return useQuery({ queryKey: ["googleAuth"], queryFn: googleLogin })
}

export const useScore = () => {
   return useQuery({ queryKey: ["scoreList"], queryFn: getScoreList })
}

export const useUpdateUserscore = () => {
   return useMutation({ mutationFn: updateUserScore })
}
