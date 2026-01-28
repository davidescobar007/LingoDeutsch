import { FunctionComponent, ReactNode } from 'react'

type TText = {
   children: ReactNode
   className?: string
   type?: 'span' | 'paragraph'
   isBold?: boolean
   isItalic?: boolean
   isThin?: boolean
   fontSize?: 'small' | 'medium'
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
      'leading-relaxed',
      className,
      isBold && 'font-bold',
      isItalic && 'italic',
      isThin && 'font-light text-neutral-600',
      fontSize === 'small' && 'text-sm',
      fontSize === 'medium' && 'text-base',
      isBlock && 'w-full',
      color === 'primary' && 'text-primary',
      color === 'secondary' && 'text-secondary',
      color === 'accent' && 'text-accent',
      color === 'warning' && 'text-warning',
      color === 'error' && 'text-error',
      color === 'info' && 'text-info',
      color === 'light' && '!text-base-200',
      color === 'dark' && 'text-base-content',
      color === 'success' && 'text-success',
      color === 'danger' && 'text-error',
      isPrimary && 'text-primary',
      'text-base-content'
   ]
      .filter(Boolean)
      .join(' ')

   const Tag = type === 'paragraph' ? 'p' : 'span'
   return <Tag className={classes}>{children}</Tag>
}
