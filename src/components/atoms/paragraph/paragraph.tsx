import { FunctionComponent, ReactNode } from 'react'

type TText = {
   children: ReactNode
   className?: string
   type?: 'span' | 'paragraph'
   isBold?: boolean
   isItalic?: boolean
   isThin?: boolean
   fontSize?: 'small' | 'medium' | 'large' | 'huge'
   isBlock?: boolean
   isPrimary?: boolean
}

export const AtomText: FunctionComponent<TText> = ({
   children,
   className = '',
   type = 'span',
   isBold = false,
   isItalic = false,
   isThin = false,
   fontSize = 'medium',
   isBlock = false,
   isPrimary = false
}) => {
   const classes = [
      className,
      isBold && 'font-bold',
      isItalic && 'italic',
      isThin && 'font-light text-gray-600',
      fontSize === 'small' && 'text-sm',
      fontSize === 'medium' && 'text-base',
      fontSize === 'large' && 'text-lg',
      fontSize === 'huge' && 'text-xl',
      isBlock && 'w-full',
      isPrimary && 'text-primary'
   ]
      .filter(Boolean)
      .join(' ')

   const Tag = type === 'paragraph' ? 'p' : 'span'
   return <Tag className={classes}>{children}</Tag>
}
