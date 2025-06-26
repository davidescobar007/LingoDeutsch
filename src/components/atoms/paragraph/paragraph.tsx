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
}

export const AtomText: FunctionComponent<TText> = ({
   children,
   className = '',
   type = 'paragraph',
   isBold = false,
   isItalic = false,
   isThin = false,
   fontSize = 'medium',
   isBlock = false
}) => {
   const classes = [
      className,
      isBold && 'font-bold',
      isItalic && 'italic',
      isThin && 'font-light text-gray-500',
      fontSize === 'small' && 'text-sm',
      fontSize === 'medium' && 'text-base',
      fontSize === 'large' && 'text-lg',
      fontSize === 'huge' && 'text-xl',
      isBlock && 'w-full'
   ]
      .filter(Boolean)
      .join(' ')

   const Tag = type === 'paragraph' ? 'p' : 'span'
   return <Tag className={classes}>{children}</Tag>
}
