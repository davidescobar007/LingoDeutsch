'use client'

import { KeyboardEvent, useEffect, useRef, useState } from 'react'
import { Send, Sparkles, Trash2, X } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { AtomButton } from '@/components/atoms'
import { MoleculeAuthCTA, MoleculeChatBubble, MoleculeChatMarkdown } from '@/components/molecules'
import { useGrammarTutor } from '@/hooks/useGrammarTutor'
import { useKeyboardInset } from '@/hooks/useKeyboardInset'
import { useAuthState } from '@/providers/AuthProvider'

import { TutorAIAvatar } from './tutorAiAvatar'

type OrganismGrammarTutorProps = {
   grammarId: string
   onClose: () => void
   topicName?: string
}

const asideClasses = 'bg-base-100 border-base-300 flex h-full w-full flex-col border-l shadow-2xl'

export const OrganismGrammarTutor = ({ grammarId, onClose, topicName }: OrganismGrammarTutorProps) => {
   const t = useTranslations()
   const { user, isAuthenticated } = useAuthState()
   const userId = user?.id ?? null
   const [input, setInput] = useState('')
   const [showClearConfirm, setShowClearConfirm] = useState(false)
   const scrollRef = useRef<HTMLDivElement | null>(null)
   const keyboardInset = useKeyboardInset()

   const { messages, streamingText, isStreaming, sendMessage, clearConversation, remainingToday, errorKey } =
      useGrammarTutor({ userId, grammarId })

   const isLimitReached = remainingToday <= 0
   const youLabel = user?.name ?? user?.username ?? t('grammar.tutor.you')

   useEffect(() => {
      const el = scrollRef.current
      if (!el) return
      el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' })
   }, [messages.length, streamingText])

   const handleSend = async () => {
      const text = input.trim()
      if (!text || isStreaming || isLimitReached) return
      setInput('')
      await sendMessage(text)
   }

   const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
      if (event.key === 'Enter' && !event.shiftKey) {
         event.preventDefault()
         handleSend()
      }
   }

   const handleClear = () => {
      if (showClearConfirm) {
         clearConversation()
         setShowClearConfirm(false)
      } else {
         setShowClearConfirm(true)
      }
   }

   const greetingTopic = topicName?.trim() || t('grammar.tutor.defaultTopic')

   const header = (
      <header className="navbar bg-primary text-primary-content min-h-0 gap-2 border-none px-3 py-2 shadow-sm">
         <div className="navbar-start w-5/6 flex-1 gap-2">
            <div className="h-8 w-8 flex-none overflow-hidden rounded-full">
               <TutorAIAvatar size="md" />
            </div>
            {isAuthenticated ? (
               <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                     <h4 className="text-primary-content text-sm font-semibold leading-tight">
                        {t('grammar.tutor.title')}
                     </h4>
                     <span className="bg-primary-content/20 text-primary-content flex-none rounded-full px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide">
                        AI
                     </span>
                  </div>
                  {topicName && (
                     <span className="text-primary-content/80 block truncate text-xs">{topicName}</span>
                  )}
               </div>
            ) : (
               <h4 className="text-primary-content text-sm font-semibold leading-tight">
                  {t('grammar.tutor.title')}
               </h4>
            )}
         </div>
         <div className="navbar-end w-1/6 flex-none">
            <button
               aria-label={t('grammar.tutor.close')}
               className="btn btn-ghost btn-circle text-primary-content min-h-11 min-w-11"
               onClick={onClose}
            >
               <X className="h-5 w-5" />
            </button>
         </div>
      </header>
   )

   if (!isAuthenticated) {
      return (
         <aside aria-label={t('grammar.tutor.title')} className={asideClasses}>
            {header}
            <div className="flex flex-1 items-center justify-center p-4">
               <MoleculeAuthCTA
                  description={t('grammar.tutor.authCta.description')}
                  title={t('grammar.tutor.authCta.title')}
               />
            </div>
         </aside>
      )
   }

   return (
      <aside aria-label={t('grammar.tutor.title')} className={asideClasses}>
         {header}

         <div className="navbar bg-base-100 border-base-300 min-h-0 border-b px-3 py-1 text-xs">
            <div className="navbar-start flex-1">
               <span className="text-base-content/60 flex items-center gap-1.5">
                  <Sparkles className="text-primary h-3.5 w-3.5" />
                  {isLimitReached
                     ? t('grammar.tutor.limitReached')
                     : t('grammar.tutor.remaining', { count: remainingToday })}
               </span>
            </div>
            {messages.length > 0 && !isStreaming && (
               <div className="navbar-end flex-none">
                  <button
                     aria-label={t('grammar.tutor.clear')}
                     className="btn btn-ghost text-base-content/60 hover:text-error min-h-11 min-w-11"
                     onClick={handleClear}
                  >
                     <Trash2 className="h-4 w-4" />
                     <span className="hidden sm:inline">
                        {showClearConfirm ? t('grammar.tutor.clearConfirm') : t('grammar.tutor.clear')}
                     </span>
                  </button>
               </div>
            )}
         </div>

         <div className="bg-base-200/30 flex-1 overflow-y-auto overscroll-contain px-4 py-3" ref={scrollRef}>
            {messages.length === 0 && !streamingText && (
               <MoleculeChatBubble
                  align="left"
                  avatar={<TutorAIAvatar size="md" />}
                  key="greeting"
                  name={t('grammar.tutor.title')}
               >
                  <MoleculeChatMarkdown>
                     {t('grammar.tutor.greeting', { topic: greetingTopic })}
                  </MoleculeChatMarkdown>
               </MoleculeChatBubble>
            )}

            {messages.map((msg) => (
               <MoleculeChatBubble
                  align={msg.role === 'user' ? 'right' : 'left'}
                  avatar={msg.role === 'user' ? '🙋' : <TutorAIAvatar size="md" />}
                  key={`${msg.createdAt}-${msg.role}`}
                  name={msg.role === 'user' ? youLabel : t('grammar.tutor.title')}
               >
                  {msg.role === 'user' ? (
                     <span className="whitespace-pre-wrap text-sm">{msg.content}</span>
                  ) : (
                     <MoleculeChatMarkdown>{msg.content}</MoleculeChatMarkdown>
                  )}
               </MoleculeChatBubble>
            ))}

            {streamingText && (
               <MoleculeChatBubble
                  align="left"
                  avatar={<TutorAIAvatar size="md" />}
                  name={t('grammar.tutor.sending')}
               >
                  <span className="whitespace-pre-wrap text-sm">{streamingText}</span>
               </MoleculeChatBubble>
            )}

            {errorKey && (
               <div className="alert alert-error my-2 py-2 text-sm">
                  <span>{t(errorKey as never)}</span>
               </div>
            )}
         </div>

         <div
            className="border-base-300 bg-base-100 border-t p-3"
            style={{ paddingBottom: `calc(0.75rem + env(safe-area-inset-bottom) + ${keyboardInset}px)` }}
         >
            <div className="flex items-end gap-2">
               <textarea
                  aria-label={t('grammar.tutor.placeholder')}
                  className="textarea textarea-bordered focus:border-primary max-h-32 min-h-[44px] flex-1 resize-none text-sm"
                  disabled={isStreaming || isLimitReached}
                  onChange={(event) => {
                     setInput(event.target.value)
                     if (showClearConfirm) setShowClearConfirm(false)
                  }}
                  onKeyDown={handleKeyDown}
                  placeholder={isLimitReached ? t('grammar.tutor.limitReached') : t('grammar.tutor.placeholder')}
                  rows={1}
                  value={input}
               />
               <AtomButton
                  aria-label={t('grammar.tutor.send')}
                  disabled={isStreaming || isLimitReached || !input.trim()}
                  extraClassName="min-h-11 min-w-11 px-4"
                  onClick={handleSend}
                  variant="PRIMARY"
               >
                  <Send className="h-4 w-4" />
               </AtomButton>
            </div>
         </div>
      </aside>
   )
}
