import { FunctionComponent, ReactNode } from 'react'

type TText = {
   children: ReactNode
   className?: string
   type?: 'span' | 'paragraph'
   isBold?: boolean
   isItalic?: boolean
   fontSize?: 'small' | 'medium' | 'large'
}

export const AtomText: FunctionComponent<TText> = ({
   children,
   className = '',
   type = 'span',
   isBold = false,
   isItalic = false,
   fontSize = 'small'
}) => {
   const classes = [
      className,
      isBold && 'font-bold',
      isItalic && 'italic',
      fontSize === 'small' && 'text-sm',
      fontSize === 'medium' && 'text-lg',
      fontSize === 'large' && 'text-xl'
   ]
      .filter(Boolean)
      .join(' ')

   const Tag = type === 'paragraph' ? 'p' : 'span'

   return <Tag className={classes}>{children}</Tag>
}
