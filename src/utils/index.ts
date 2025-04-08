import { closest } from 'color-2-name'

import { TIterableData, TListItem } from '@/modules/actions/types'
import { tailwindColors } from '@/modules/global.types'
export const getRandomFromArray = (array: any[]) => {
   const random = Math.floor(Math.random() * array.length)
   return array[random]
}
export const removePunctuation = (inputString: string) => {
   return inputString.replace(/[.,#!$%^&*;:{}=\-_`~()?"'„“\\\r\n]/g, '')
}

export const extractAndSortSentences = (inputData: any) => {
   const transformedData = { data: [] }

   inputData.slice(0, 3).forEach((item: any) => {
      const sentences = item?.sentences
      if (sentences) {
         const firstFiveShortest = sentences
            .map((sentence: any) => {
               if (Array.isArray(sentence) && sentence.length >= 2) {
                  return {
                     german: sentence[0].replace(/<\/?b>/g, ''),
                     spanish: sentence[1].replace(/<\/?b>/g, '')
                  }
               }
               return null
            })
            .filter((sentence: any) => sentence !== null)
            .sort((a: any, b: any) => a.german.length - b.german.length)
            .slice(0, 5)

         transformedData.data = transformedData.data
            .concat(firstFiveShortest)
            .sort((a: any, b: any) => a.german.length - b.german.length)
      }
   })

   return transformedData
}

export function areObjectsDistinct(obj1: any, obj2: any): boolean {
   const keys = new Set([...Object.keys(obj1), ...Object.keys(obj2)])
   for (const key of keys) {
      if (typeof obj1[key] === 'object' || typeof obj2[key] === 'object') {
         return false
      }
      if (obj1[key] !== obj2[key]) {
         // TODO: uncomment following line when checking for differences between two objects
         // TODO: when committing, this must be always commented
         console.log(`Difference in ${key}: ${obj1[key]} !== ${obj2[key]}`)
         return true
      }
   }
   return false
}

export function flattenObjects(arrayOfObjects: any[]): Record<string, any>[] {
   if (!arrayOfObjects.length) {
      return []
   }
   return arrayOfObjects.map((object) => {
      const flattenedObject: Record<string, any> = {}

      function flatten(current: any, path = []) {
         if (Array.isArray(current)) {
            flattenedObject[path.join('.')] = current
         } else if (typeof current === 'object' && current !== null) {
            for (const [key, value] of Object.entries(current)) {
               flatten(value, path.concat(key as any))
            }
         } else {
            const propertyName = path[path.length - 1]
            if (flattenedObject[propertyName] !== undefined) {
               let index = 2
               while (flattenedObject[`${propertyName}${index}`] !== undefined) {
                  index++
               }
               flattenedObject[`${propertyName}${index}`] = current
            } else {
               flattenedObject[propertyName] = current
            }
         }
      }

      flatten(object)
      return flattenedObject
   })
}

export function filterProperties(arr: any[], propertiesToKeep: any[]) {
   return arr.map((obj) => {
      const newObj: any = {}
      propertiesToKeep.forEach((property) => {
         if (obj[property] !== undefined) {
            newObj[property] = obj[property]
         }
      })
      return newObj
   })
}

export const getPercentage = (number1: number, number2: number) => {
   if (typeof number1 !== 'number' || typeof number2 !== 'number' || number2 === 0) {
      return 0
   }
   if (number1 === 0) return 100

   const partial = (number1 / number2) * 100
   const percentage = Math.floor(100 - partial)

   return Math.max(0, percentage)
}

export const localStorageHandler = <T>(key: string) => {
   const getItem = () => {
      let data = localStorage.getItem(key)
      return data ? (JSON.parse(data) as T) : undefined
   }
   const saveItem = (data?: any) => {
      localStorage.setItem(key, JSON.stringify(data))
   }
   const clearItem = () => {
      localStorage.removeItem(key)
   }
   const storageItem = getItem()
   return { storageItem, saveItem, clearItem }
}

export const openModal = (): void => {
   const newDocument: any = document.getElementById('my_modal_1')
   newDocument.showModal()
}

export function getCookie(name: string): string | null {
   const nameEQ = `${name}=`
   const cookies = document.cookie.split(';')

   for (const cookie of cookies) {
      const trimmedCookie = cookie.trim()
      if (trimmedCookie.startsWith(nameEQ)) {
         return trimmedCookie.substring(nameEQ.length)
      }
   }

   return null
}

function mapColorToTailwind(color: string): string {
   const colorLowerCase = color.toLowerCase()
   for (const [tailwindColor, variants] of Object.entries(tailwindColors)) {
      if (variants.includes(colorLowerCase)) {
         return tailwindColor
      }
   }

   return color // Return the original color if no match is found
}

export function parseHtmlToTIterableData(html: string): TIterableData[] {
   const parser = new DOMParser()
   const doc = parser.parseFromString(html, 'text/html')
   const getTextNodes = (node: Node): TIterableData['text'] => {
      return Array.from(node.childNodes)
         .map((child) => {
            if (child.textContent === '\n') return
            const isBold = child.nodeName === 'STRONG'
            const isItalic = child.nodeName === 'EM'
            const isUnderline = child.nodeName === 'U'
            const content = String(child.textContent || '')
            const className = child instanceof Element ? child.getAttribute('class') || '' : ''
            return {
               content,
               isBold,
               isItalic,
               className,
               isUnderline
            }
         })
         .filter((node): node is Exclude<typeof node, undefined> => node !== undefined)
   }

   const parseList = (listNode: Element): TListItem[] => {
      return Array.from(listNode.children).map((li) => {
         return {
            type: 'list-item',
            text: getTextNodes(li),
            classNames: li.getAttribute('class') || ''
         }
      })
   }

   const tIterableDataArray: TIterableData[] = []

   doc.body.childNodes.forEach((node) => {
      if (node instanceof Element) {
         const nodeName = node.nodeName.toLowerCase()
         const className = node.getAttribute('class') || ''

         if (nodeName.startsWith('h')) {
            const headerLevel = nodeName as 'h1' | 'h2' | 'h3' | 'h4' | 'h5'
            const span = node.querySelector('span')
            let backgroundColor: string | null = ''
            if (span) {
               backgroundColor = span.style.backgroundColor
                  ? mapColorToTailwind(closest(span.style.backgroundColor).name as unknown as string)
                  : null
            }
            tIterableDataArray.push({
               type: 'header',
               text: getTextNodes(node),
               headerLevel,
               classNames: backgroundColor && `bg-${backgroundColor}-200`
            })
         } else if (nodeName === 'ul' || nodeName === 'ol') {
            tIterableDataArray.push({
               type: 'list',
               isOrderedList: nodeName === 'ol',
               listItems: parseList(node),
               classNames: className
            })
         } else if (nodeName === 'p') {
            tIterableDataArray.push({
               type: 'paragraph',
               text: getTextNodes(node),
               classNames: className
            })
         } else if (nodeName === 'table') {
            const columns: { header: string; accessorKey: string; cell?: any; classNames?: string }[] = []
            const data: any[] = []

            const headerRow = node.querySelector('thead tr')
            if (headerRow) {
               Array.from(headerRow.children).forEach((headerCell) => {
                  const span = headerCell.querySelector('span')
                  let backgroundColor = ''
                  if (span) {
                     backgroundColor = mapColorToTailwind(
                        closest(span.style.backgroundColor).name as unknown as string
                     )
                  }
                  columns.push({
                     header: headerCell.textContent || '',
                     accessorKey: headerCell.textContent?.toLowerCase() || '',
                     classNames: backgroundColor && `bg-${backgroundColor}-200`
                  })
               })
            }

            const tableRows = node.querySelectorAll('tbody tr')
            tableRows.forEach((row) => {
               const rowData: any = {}
               Array.from(row.children).forEach((cell, index) => {
                  rowData[columns[index].accessorKey] = cell.textContent || ''
               })
               data.push(rowData)
            })
            tIterableDataArray.push({
               type: 'table',
               classNames: className,
               tableData: {
                  columns,
                  data
               }
            })
         }
      }
   })

   console.log(tIterableDataArray)
   return tIterableDataArray
}
