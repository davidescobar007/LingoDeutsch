'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useLocale } from 'next-intl'

import { TTutorMessage } from '@/modules/actions/types'
import {
   clearTutorConversation,
   getTodayKey,
   loadTutorConversation,
   saveTutorConversation,
   TUTOR_DAILY_LIMIT
} from '@/utils/tutorStorage'

const HISTORY_LIMIT = 24
const SSE_DATA_PREFIX = 'data: '
const SSE_DONE = '[DONE]'

type UseGrammarTutorParams = {
   userId: string | null | undefined
   grammarId: string | null | undefined
}

type UseGrammarTutorReturn = {
   isStreaming: boolean
   messages: TTutorMessage[]
   remainingToday: number
   sendMessage: (_text: string) => Promise<void>
   clearConversation: () => void
   streamingText: string
   errorKey: string | null
   cancelStream: () => void
}

const parseSseLine = (line: string): { text?: string; errorKey?: string; done?: boolean } => {
   if (!line.startsWith(SSE_DATA_PREFIX)) return {}
   const payload = line.slice(SSE_DATA_PREFIX.length).trim()
   if (payload === SSE_DONE) return { done: true }
   try {
      const parsed = JSON.parse(payload) as { text?: string; error?: string }
      if (parsed.error) return { errorKey: parsed.error }
      if (typeof parsed.text === 'string') return { text: parsed.text }
   } catch {
      // ignore malformed chunk
   }
   return {}
}

export const useGrammarTutor = ({ userId, grammarId }: UseGrammarTutorParams): UseGrammarTutorReturn => {
   const locale = useLocale()
   const [messages, setMessages] = useState<TTutorMessage[]>([])
   const [streamingText, setStreamingText] = useState('')
   const [isStreaming, setIsStreaming] = useState(false)
   const [errorKey, setErrorKey] = useState<string | null>(null)
   const [todayCount, setTodayCount] = useState(0)
   const [conversationKey, setConversationKey] = useState({ userId: '', grammarId: '' })
   const abortRef = useRef<AbortController | null>(null)

   useEffect(() => {
      if (!userId || !grammarId) {
         setMessages([])
         setStreamingText('')
         setErrorKey(null)
         setTodayCount(0)
         setConversationKey({ userId: '', grammarId: '' })
         return
      }
      const stored = loadTutorConversation(userId, grammarId)
      const today = getTodayKey()
      if (stored) {
         const isSameDay = stored.lastDay === today
         setMessages(stored.messages)
         setTodayCount(isSameDay ? stored.todayCount : 0)
      } else {
         setMessages([])
         setTodayCount(0)
      }
      setStreamingText('')
      setErrorKey(null)
      setConversationKey({ userId, grammarId })
   }, [userId, grammarId])

   useEffect(() => {
      if (!conversationKey.userId || !conversationKey.grammarId) return
      if (messages.length === 0 && todayCount === 0 && !streamingText) return
      saveTutorConversation({
         userId: conversationKey.userId,
         grammarId: conversationKey.grammarId,
         messages,
         todayCount,
         lastDay: getTodayKey(),
         updatedAt: Date.now()
      })
   }, [messages, todayCount, conversationKey, streamingText])

   const cancelStream = useCallback(() => {
      abortRef.current?.abort()
      abortRef.current = null
   }, [])

   const sendMessage = useCallback(
      async (text: string) => {
         if (!userId || !grammarId) return
         const trimmed = text.trim()
         if (!trimmed) return

         if (todayCount >= TUTOR_DAILY_LIMIT) {
            setErrorKey('tutor.limitReached')
            return
         }

         const userMessage: TTutorMessage = {
            role: 'user',
            content: trimmed,
            createdAt: Date.now()
         }
         const newHistory = [...messages, userMessage].slice(-HISTORY_LIMIT)
         setMessages(newHistory)
         setStreamingText('')
         setErrorKey(null)
         setIsStreaming(true)

         const controller = new AbortController()
         abortRef.current = controller

         try {
            const response = await fetch('/api/grammar-tutor', {
               method: 'POST',
               headers: { 'Content-Type': 'application/json' },
               body: JSON.stringify({
                  grammarId,
                  messages: newHistory,
                  locale
               }),
               signal: controller.signal
            })

            if (!response.ok) {
               let errorMessageKey = 'tutor.error'
               try {
                  const errBody = (await response.json()) as { error?: string }
                  if (errBody?.error) errorMessageKey = errBody.error
               } catch {
                  // ignore
               }
               setErrorKey(errorMessageKey)
               setIsStreaming(false)
               return
            }

            if (!response.body) {
               setErrorKey('tutor.error')
               setIsStreaming(false)
               return
            }

            const reader = response.body.getReader()
            const decoder = new TextDecoder('utf-8')
            let buffer = ''
            let accumulated = ''
            let streamError: string | null = null
            let finished = false

            while (!finished) {
               const { value, done } = await reader.read()
               if (done) {
                  finished = true
                  break
               }
               buffer += decoder.decode(value, { stream: true })
               const lines = buffer.split('\n\n')
               buffer = lines.pop() ?? ''
               for (const line of lines) {
                  const parsed = parseSseLine(line.trim())
                  if (parsed.done) {
                     buffer = ''
                     finished = true
                     break
                  }
                  if (parsed.errorKey) {
                     streamError = parsed.errorKey
                  } else if (parsed.text) {
                     accumulated += parsed.text
                     setStreamingText(accumulated)
                  }
               }
               if (streamError) finished = true
            }

            if (streamError) {
               setErrorKey(streamError)
               setStreamingText('')
            } else {
               const modelMessage: TTutorMessage = {
                  role: 'model',
                  content: accumulated,
                  createdAt: Date.now()
               }
               setMessages((prev) => [...prev, modelMessage].slice(-HISTORY_LIMIT))
               setStreamingText('')
               setTodayCount((c) => c + 1)
            }
         } catch (error) {
            if ((error as Error)?.name === 'AbortError') {
               setStreamingText('')
            } else {
               console.error('useGrammarTutor error:', error)
               setErrorKey('tutor.error')
            }
         } finally {
            setIsStreaming(false)
            abortRef.current = null
         }
      },
      [grammarId, locale, messages, todayCount, userId]
   )

   const clearConversation = useCallback(() => {
      if (!userId || !grammarId) return
      clearTutorConversation(userId, grammarId)
      setMessages([])
      setStreamingText('')
      setErrorKey(null)
      setTodayCount(0)
   }, [grammarId, userId])

   useEffect(() => {
      return () => {
         abortRef.current?.abort()
      }
   }, [])

   const remainingToday = useMemo(() => Math.max(0, TUTOR_DAILY_LIMIT - todayCount), [todayCount])

   return {
      clearConversation,
      errorKey,
      isStreaming,
      messages,
      remainingToday,
      sendMessage,
      streamingText,
      cancelStream
   }
}
