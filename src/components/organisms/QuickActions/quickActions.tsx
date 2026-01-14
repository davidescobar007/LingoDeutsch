'use client'
import { useTranslations } from 'next-intl'

import { AtomText, AtomTitle } from '@/components/atoms'
import { Link } from '@/navigation'

type QuickAction = {
   id: string
   title: string
   emoji: string
   description: string
   href: string
   variant?: 'PRIMARY' | 'SECONDARY'
   badgeCount?: number
   isLocked?: boolean
}

type OrganismQuickActionsProps = {
   actions?: QuickAction[]
   isGuest?: boolean
}

const DEFAULT_ACTIONS: QuickAction[] = [
   {
      id: 'continue-grammar',
      title: 'Continuar Gramática',
      emoji: '📘',
      description: 'Nominativo & Acusativo',
      href: '/app/grammar',
      variant: 'PRIMARY'
   },
   {
      id: 'practice-vocab',
      title: 'Practicar Vocabulario',
      emoji: '🎯',
      description: '5 palabras pendientes',
      href: '/app/vocabulary/practice',
      variant: 'SECONDARY',
      badgeCount: 5
   },
   {
      id: 'read-article',
      title: 'Leer Artículo',
      emoji: '📖',
      description: 'Nivel A1 • 8 minutos',
      href: '/app/article',
      variant: 'SECONDARY'
   }
]

const GUEST_ACTIONS: QuickAction[] = [
   {
      id: 'explore-grammar',
      title: 'Explorar Gramática',
      emoji: '📘',
      description: 'Lecciones A1-B2',
      href: '/login',
      variant: 'PRIMARY',
      isLocked: true
   },
   {
      id: 'practice-vocab',
      title: 'Practicar Vocabulario',
      emoji: '🎯',
      description: 'Repetición espaciada',
      href: '/login',
      variant: 'SECONDARY',
      isLocked: true
   },
   {
      id: 'read-article',
      title: 'Leer Artículos',
      emoji: '📖',
      description: 'Gratis sin registro',
      href: '/app/article',
      variant: 'SECONDARY',
      isLocked: false
   }
]

export const OrganismQuickActions = ({
   actions = DEFAULT_ACTIONS,
   isGuest = false
}: OrganismQuickActionsProps) => {
   const t = useTranslations('locked.quickActions')
   const displayActions = isGuest ? GUEST_ACTIONS : actions

   return (
      <div className="w-full">
         <AtomTitle extraClassName="!text-lg mb-4" type="h3">
            ⚡ Acciones Rápidas
         </AtomTitle>

         <div className="flex flex-col gap-3">
            {displayActions.map((action) => (
               <Link href={action.isLocked && isGuest ? '/login' : action.href} key={action.id}>
                  <div
                     className={`container-card hover:scale-102 transform-gpu p-4 transition-all duration-300 ${
                        action.isLocked && isGuest ? 'opacity-75' : ''
                     }`}
                  >
                     <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                           <span className="text-3xl">{action.emoji}</span>
                           <div>
                              <AtomText className="block font-semibold" fontSize="medium">
                                 {action.title}
                              </AtomText>
                              <AtomText className="text-sm" fontSize="small" isThin>
                                 {action.description}
                              </AtomText>
                           </div>
                        </div>
                        <div className="flex items-center gap-3">
                           {action.isLocked && isGuest && (
                              <span className="bg-warning text-warning-content flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold">
                                 🔒 {t('lockedBadge')}
                              </span>
                           )}
                           {action.badgeCount !== undefined && !isGuest && (
                              <span className="bg-primary/20 text-primary rounded-full px-3 py-1 text-sm font-bold">
                                 {action.badgeCount}
                              </span>
                           )}
                           <span className="text-primary">→</span>
                        </div>
                     </div>
                  </div>
               </Link>
            ))}
         </div>
      </div>
   )
}
