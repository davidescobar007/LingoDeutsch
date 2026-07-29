'use client'

import { Sparkles } from 'lucide-react'

type TTutorAIAvatarProps = {
   size?: 'sm' | 'md' | 'lg'
}

const ICON_SIZES: Record<NonNullable<TTutorAIAvatarProps['size']>, string> = {
   sm: 'h-3.5 w-3.5',
   md: 'h-5 w-5',
   lg: 'h-7 w-7'
}

export const TutorAIAvatar = ({ size = 'sm' }: TTutorAIAvatarProps) => (
   <div className="from-primary to-primary/70 text-primary-content flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br shadow-inner">
      <Sparkles className={ICON_SIZES[size]} fill="currentColor" strokeWidth={1.5} />
   </div>
)
