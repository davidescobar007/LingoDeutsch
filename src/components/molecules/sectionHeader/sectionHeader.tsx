'use client'
import { AtomText, Icon } from '@/components/atoms'
import { Link } from '@/navigation'

type MoleculeSectionHeaderProps = {
   title: string
   linkHref: string
   linkText: string
   extraClassName?: string
}

export const MoleculeSectionHeader = ({
   title,
   linkHref,
   linkText,
   extraClassName = ''
}: MoleculeSectionHeaderProps) => {
   return (
      <div className={`flex w-full justify-between ${extraClassName}`}>
         <AtomText fontSize="large" isBold>
            {title}
         </AtomText>
         <Link href={linkHref}>
            <AtomText className="flex items-center justify-center gap-1" isBold isPrimary>
               {linkText} <Icon className="text-primary" icon="move-right" iconSize="small" />
            </AtomText>
         </Link>
      </div>
   )
}
