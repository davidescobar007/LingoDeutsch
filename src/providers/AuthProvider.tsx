'use client'

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

import { TUser } from '@/modules/actions/types'
import { pb } from '@/network/setup'

interface AuthState {
   isAuthenticated: boolean
   user: TUser | null
   isLoading: boolean
   logout: () => void
}

const defaultState: AuthState = {
   isAuthenticated: false,
   user: null,
   isLoading: true,
   logout: () => {}
}

const AuthContext = createContext(defaultState)

export const useAuthState = () => useContext(AuthContext)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
   const [isAuthenticated, setIsAuthenticated] = useState(pb.authStore.isValid)
   const [user, setUser] = useState(pb.authStore.record as TUser | null)
   const [isLoading, setIsLoading] = useState(true)

   const logout = useCallback(() => {
      pb.authStore.clear()
      localStorage.removeItem('user')
      localStorage.removeItem('provider')
   }, [])

   useEffect(() => {
      const unsubscribe = pb.authStore.onChange((_token, record) => {
         const isValid = pb.authStore.isValid
         setIsAuthenticated(isValid)
         setUser(isValid ? (record as TUser | null) : null)
      })

      const validateAndRefresh = async () => {
         try {
            if (pb.authStore.isValid) {
               await pb.collection('users').authRefresh()
               setIsAuthenticated(true)
               setUser(pb.authStore.record as TUser | null)
            } else {
               setIsAuthenticated(false)
               setUser(null)
            }
         } catch {
            setIsAuthenticated(false)
            setUser(null)
         } finally {
            setIsLoading(false)
         }
      }

      validateAndRefresh()

      return () => {
         unsubscribe()
      }
   }, [])

   const value = useMemo(
      () => ({ isAuthenticated, user, isLoading, logout }),
      [isAuthenticated, user, isLoading, logout]
   )

   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
