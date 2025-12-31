'use client'
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
}

type OrganismQuickActionsProps = {
   actions?: QuickAction[]
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

export const OrganismQuickActions = ({ actions = DEFAULT_ACTIONS }: OrganismQuickActionsProps) => {
   return (
      <div className="w-full">
         <AtomTitle extraClassName="!text-lg mb-4" type="h3">
            ⚡ Acciones Rápidas
         </AtomTitle>

         <div className="flex flex-col gap-3">
            {actions.map((action) => (
               <Link href={action.href} key={action.id}>
                  <div className="border-base-300 bg-base-100 hover:border-primary/50 hover:scale-102 rounded-lg border p-4 shadow-md transition-all duration-300 hover:shadow-lg">
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
                           {action.badgeCount !== undefined && (
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
