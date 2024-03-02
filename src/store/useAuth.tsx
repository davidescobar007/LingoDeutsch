"use client"

import { useQuery } from "@tanstack/react-query"

import { getLoginMethods, googleLogin } from "@/modules/actions/users.actions"

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
