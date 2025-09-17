import { FunctionComponent, ReactNode } from 'react'

type TText = {
   children: ReactNode
   className?: string
   type?: 'span' | 'paragraph'
   isBold?: boolean
   isItalic?: boolean
   isThin?: boolean
   fontSize?: 'small' | 'medium' | 'large' | 'huge'
   color?:
      | 'primary'
      | 'secondary'
      | 'accent'
      | 'warning'
      | 'error'
      | 'info'
      | 'light'
      | 'dark'
      | 'success'
      | 'danger'
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
   color = '',
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
      fontSize === 'huge' && 'text-2xl',
      isBlock && 'w-full',
      color === 'primary' && 'text-primary',
      color === 'secondary' && 'text-secondary',
      color === 'accent' && 'text-accent',
      color === 'warning' && 'text-warning',
      color === 'error' && 'text-error',
      color === 'info' && 'text-info',
      color === 'light' && 'text-gray-200',
      color === 'dark' && 'text-gray-800',
      color === 'success' && 'text-success',
      color === 'danger' && 'text-danger',
      isPrimary && 'text-primary',
      'text-gray-500'
   ]
      .filter(Boolean)
      .join(' ')

   const Tag = type === 'paragraph' ? 'p' : 'span'
   return <Tag className={classes}>{children}</Tag>
}
