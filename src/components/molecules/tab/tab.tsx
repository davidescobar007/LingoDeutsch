import React from 'react'

export interface TabItem {
   id: string
   label: string
   disabled?: boolean
}

export interface MoleculeTabProps {
   /** Array of tab items */
   items: TabItem[]
   /** Currently active tab ID */
   activeTab: string
   /** Callback when a tab is clicked */
   onTabChange: (_tabId: string) => void
   /** Tab style variant */
   variant?: 'default' | 'bordered' | 'lifted' | 'boxed'
   /** Tab size */
   size?: 'xs' | 'sm' | 'md' | 'lg'
   /** Color scheme for the tabs */
   colorScheme?: 'primary' | 'secondary' | 'accent' | 'neutral'
   /** Additional CSS classes */
   className?: string
}

const MoleculeTab: React.FC<MoleculeTabProps> = ({
   items,
   activeTab,
   onTabChange,
   variant = 'default',
   size = 'md',
   colorScheme = 'primary',
   className = ''
}) => {
   const getVariantClasses = () => {
      switch (variant) {
         case 'bordered':
            return 'tabs-bordered'
         case 'lifted':
            return 'tabs-lifted'
         case 'boxed':
            return 'tabs-boxed'
         default:
            return ''
      }
   }

   const getSizeClasses = () => {
      switch (size) {
         case 'xs':
            return 'tabs-xs'
         case 'sm':
            return 'tabs-sm'
         case 'lg':
            return 'tabs-lg'
         default:
            return ''
      }
   }

   const getTabClasses = (variant: string) => {
      const baseClasses = 'tab transition-colors duration-200'
      switch (variant) {
         case 'bordered':
            return `${baseClasses} tab-bordered`
         case 'lifted':
            return `${baseClasses} tab-lifted`
         default:
            return baseClasses
      }
   }

   const getTabStateClasses = (isActive: boolean, isDisabled: boolean) => {
      if (isDisabled) {
         return 'tab-disabled text-base-300 cursor-not-allowed'
      }

      const colorMap = {
         primary: {
            active: 'tab-active text-primary border-primary bg-primary/10',
            inactive: 'text-base-content/70 hover:text-primary hover:bg-primary/5 hover:border-primary/30'
         },
         secondary: {
            active: 'tab-active text-secondary border-secondary bg-secondary/10',
            inactive: 'text-base-content/70 hover:text-secondary hover:bg-secondary/5 hover:border-secondary/30'
         },
         accent: {
            active: 'tab-active text-accent border-accent bg-accent/10',
            inactive: 'text-base-content/70 hover:text-accent hover:bg-accent/5 hover:border-accent/30'
         },
         neutral: {
            active: 'tab-active text-neutral border-neutral bg-neutral/10',
            inactive: 'text-base-content/70 hover:text-neutral hover:bg-neutral/5 hover:border-neutral/30'
         }
      }

      return isActive ? colorMap[colorScheme].active : colorMap[colorScheme].inactive
   }

   return (
      <div className={`tabs ${getVariantClasses()} ${getSizeClasses()} ${className}`} role="tablist">
         {items.map((item) => (
            <a
               className={`${getTabClasses(variant)} ${getTabStateClasses(
                  activeTab === item.id,
                  item.disabled || false
               )}`}
               href="#"
               key={item.id}
               onClick={(e) => {
                  e.preventDefault()
                  if (!item.disabled) {
                     onTabChange(item.id)
                  }
               }}
               role="tab"
            >
               {item.label}
            </a>
         ))}
      </div>
   )
}

export default MoleculeTab
