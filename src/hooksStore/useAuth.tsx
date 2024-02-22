"use client"

import { useQuery } from "@tanstack/react-query"

import { getLoginMethods } from "@/modules/actions/users.actions"

export const useAuth = () => {
   const {
      data: authMethods,
      error,
      isLoading
   } = useQuery({ queryKey: ["authMethodsList"], queryFn: getLoginMethods })
   return { authMethods, error, isLoading }
}
