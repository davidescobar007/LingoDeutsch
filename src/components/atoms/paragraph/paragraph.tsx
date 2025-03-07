import { FunctionComponent, ReactNode } from 'react'

type TText = {
   children: ReactNode
   className?: string
   type?: 'span' | 'paragraph'
   isBold?: boolean
   isItalic?: boolean
   isThin?: boolean
   fontSize?: 'small' | 'medium' | 'large'
}

export const AtomText: FunctionComponent<TText> = ({
   children,
   className = '',
   type = 'span',
   isBold = false,
   isItalic = false,
   isThin = false,
   fontSize = 'medium'
}) => {
   const classes = [
      className,
      isBold && 'font-bold',
      isItalic && 'italic',
      isThin && 'font-thin',
      fontSize === 'small' && 'text-xs',
      fontSize === 'medium' && 'text-base',
      fontSize === 'large' && 'text-lg'
   ]
      .filter(Boolean)
      .join(' ')

   const Tag = type === 'paragraph' ? 'p' : 'span'
   return <Tag className={classes}>{children}</Tag>
}
