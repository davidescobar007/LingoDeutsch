import { TIterableData } from '@/modules/actions/types'

export const UiSchema: TIterableData[] = [
   {
      type: 'header',
      text: [
         {
            content: 'Los números cardinales (números normales):',
            className: 'text-error',
            isBold: false,
            isItalic: true,
            isUnderline: false
         }
      ],
      headerLevel: 'h4',
      classNames: 'text-error'
   },
   {
      type: 'list',
      isOrderedList: false,
      listItems: [
         {
            type: 'list-item',
            text: [
               {
                  content: '0: ',
                  isBold: true,
                  isItalic: false,
                  className: '',
                  isUnderline: false
               },
               {
                  content: 'null ',
                  isBold: true,
                  isItalic: false,
                  className: '',
                  isUnderline: false
               }
            ]
         }
      ]
   }
]

export const UiSchema2: TIterableData[] = [
   {
      type: 'list',
      isOrderedList: false,
      listItems: [
         {
            type: 'list-item',
            text: [
               {
                  content: 'g',
                  isBold: true,
                  isItalic: false,
                  className: '',
                  isUnderline: false
               },
               {
                  content: 'g',
                  isBold: false,
                  isItalic: false,
                  className: '',
                  isUnderline: false
               }
            ]
         }
      ]
   }
]
