import { TTutorConversation } from '@/modules/actions/types'

const STORAGE_PREFIX = 'lingo:tutor:'
export const TUTOR_DAILY_LIMIT = 10

export const tutorStorageKey = (userId: string, grammarId: string): string =>
   `${STORAGE_PREFIX}${userId}:${grammarId}`

export const getTodayKey = (): string => {
   const now = new Date()
   const y = now.getFullYear()
   const m = `${now.getMonth() + 1}`.padStart(2, '0')
   const d = `${now.getDate()}`.padStart(2, '0')
   return `${y}-${m}-${d}`
}

export const loadTutorConversation = (userId: string, grammarId: string): TTutorConversation | null => {
   if (typeof window === 'undefined') return null
   try {
      const raw = window.localStorage.getItem(tutorStorageKey(userId, grammarId))
      if (!raw) return null
      const parsed = JSON.parse(raw) as TTutorConversation
      if (!parsed || parsed.userId !== userId || parsed.grammarId !== grammarId) return null
      if (!Array.isArray(parsed.messages)) return null
      return parsed
   } catch {
      return null
   }
}

export const saveTutorConversation = (conversation: TTutorConversation): void => {
   if (typeof window === 'undefined') return
   try {
      const payload: TTutorConversation = {
         ...conversation,
         messages: conversation.messages.slice(-200),
         updatedAt: Date.now()
      }
      window.localStorage.setItem(
         tutorStorageKey(conversation.userId, conversation.grammarId),
         JSON.stringify(payload)
      )
   } catch {
      // Storage may be full or disabled (private mode). Silent fail.
   }
}

export const clearTutorConversation = (userId: string, grammarId: string): void => {
   if (typeof window === 'undefined') return
   try {
      window.localStorage.removeItem(tutorStorageKey(userId, grammarId))
   } catch {
      // Silent
   }
}
