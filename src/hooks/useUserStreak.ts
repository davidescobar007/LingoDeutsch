'use client'

import { useMemo } from 'react'

import { TUser } from '@/modules/actions/types'

import { useGetArticlesListByUserAndState } from './articles'
import { useGetVocabularyStats } from './cards'
import { useSavedGrammarTopicByUser } from './grammar'

export interface UserStreakMetrics {
   currentStreak: number
   activityDays: boolean[]
   totalActivities: number
   activitiesByType: {
      grammar: number
      articles: number
      vocabulary: number
   }
   isLoading: boolean
}

const DEFAULT_ACTIVITY_DAYS: boolean[] = [false, false, false, false, false, false, false]

export const useUserStreak = (user: TUser | null | undefined): UserStreakMetrics => {
   const isGuest = !user || !user.id

   // Fetch data from all sources (handle null user with optional chaining)
   const { data: grammarProgress, isLoading: grammarLoading } = useSavedGrammarTopicByUser(user)
   const { data: articleProgress, isLoading: articlesLoading } = useGetArticlesListByUserAndState({
      userId: user?.id || '',
      state: 'learned'
   })
   const { data: vocabularyStats, isLoading: vocabularyLoading } = useGetVocabularyStats()

   const isLoading = !isGuest && (grammarLoading || articlesLoading || vocabularyLoading)

   // Consolidate all activity dates
   const allActivityDates = useMemo(() => {
      if (isGuest) return []

      const dates: Date[] = []

      // Grammar activities
      grammarProgress?.forEach((p) => {
         if (p.dateCompleted && p.isCompleted) {
            dates.push(new Date(p.dateCompleted))
         }
      })

      // Article activities
      articleProgress?.forEach((p) => {
         if (p.is_completed && p.updated) {
            dates.push(new Date(p.updated))
         }
      })

      // Vocabulary activities
      vocabularyStats?.last7DayStreak?.forEach((day) => {
         if (day.completed) {
            dates.push(new Date(day.date))
         }
      })

      return dates
   }, [isGuest, grammarProgress, articleProgress, vocabularyStats])

   // Calculate streak
   const currentStreak = useMemo(() => {
      if (isGuest || allActivityDates.length === 0) return 0

      const sortedDates = [...allActivityDates].sort((a, b) => b.getTime() - a.getTime())

      let streak = 1
      const today = new Date()
      let currentDate = new Date(today)
      currentDate.setHours(0, 0, 0, 0)

      for (let i = 0; i < sortedDates.length; i++) {
         const checkDate = new Date(sortedDates[i])
         checkDate.setHours(0, 0, 0, 0)

         const diffDays = Math.floor((currentDate.getTime() - checkDate.getTime()) / (1000 * 60 * 60 * 24))

         if (diffDays === streak) {
            streak++
            currentDate = new Date(checkDate)
            currentDate.setDate(currentDate.getDate() - 1)
         } else if (diffDays > streak) {
            break
         }
      }

      return streak - 1
   }, [isGuest, allActivityDates])

   // Generate activity days for past 7 days
   const activityDays = useMemo(() => {
      if (isGuest) return DEFAULT_ACTIVITY_DAYS

      const days: boolean[] = []
      for (let i = 6; i >= 0; i--) {
         const date = new Date()
         date.setDate(date.getDate() - i)
         date.setHours(0, 0, 0, 0)

         const hasActivity = allActivityDates.some((activityDate) => {
            const checkDate = new Date(activityDate)
            checkDate.setHours(0, 0, 0, 0)
            return checkDate.getTime() === date.getTime()
         })

         days.push(Boolean(hasActivity))
      }
      return days
   }, [isGuest, allActivityDates])

   // Calculate activities by type
   const activitiesByType = useMemo(() => {
      if (isGuest) return { grammar: 0, articles: 0, vocabulary: 0 }

      const grammarCount = grammarProgress?.filter((p) => p.isCompleted).length || 0
      const articleCount = articleProgress?.filter((p) => p.is_completed).length || 0
      const vocabularyCount = vocabularyStats?.last7DayStreak?.filter((d) => d.completed).length || 0

      return {
         grammar: grammarCount,
         articles: articleCount,
         vocabulary: vocabularyCount
      }
   }, [isGuest, grammarProgress, articleProgress, vocabularyStats])

   const totalActivities = activitiesByType.grammar + activitiesByType.articles + activitiesByType.vocabulary

   return {
      currentStreak,
      activityDays,
      totalActivities,
      activitiesByType,
      isLoading
   }
}
