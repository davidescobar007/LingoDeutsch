'use client'

import { useTranslations } from 'next-intl'

import { TutorAIAvatar } from './tutorAiAvatar'

type OrganismGrammarTutorTriggerProps = {
   disabled: boolean
   onOpen: () => void
   topicName?: string
}

export const OrganismGrammarTutorTrigger = ({ disabled, onOpen, topicName }: OrganismGrammarTutorTriggerProps) => {
   const t = useTranslations()
   const tooltip = topicName ? `${t('grammar.tutor.ask')} · ${topicName}` : t('grammar.tutor.ask')

   return (
      <button
         aria-label={tooltip}
         className="btn btn-circle group relative mb-12 h-14 min-h-14 w-14 border-none shadow-2xl transition-transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100"
         disabled={disabled}
         onClick={onOpen}
         title={tooltip}
         type="button"
      >
         <span className="ring-primary-content/40 absolute inset-0 overflow-hidden rounded-full ring-2">
            <TutorAIAvatar size="lg" />
         </span>
      </button>
   )
}
