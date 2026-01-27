import { AtomText, Icon } from '@/components/atoms'
import { Link } from '@/navigation'

type GrammarPreviewProps = {
   popularTopics: {
      id: string
      label: string
      colorTheme: 'blue' | 'green' | 'purple' | 'orange' | 'teal' | 'red' | 'yellow' | 'indigo'
   }[]
}

// Array of emojis relevant to German language learning
const germanLearningEmojis = [
   '🇩🇪', // German flag
   '📚', // Books
   '✏️', // Pencil
   '📝', // Writing
   '🎓', // Graduation cap
   '🧠', // Brain
   '💡', // Light bulb
   '📖', // Open book
   '✍️', // Writing hand
   '🎯', // Target
   '⭐', // Star
   '🔤', // Letters
   '📋', // Clipboard
   '🎪', // Learning/practice
   '🏆', // Trophy
   '🎨', // Art/creativity
   '🔍', // Magnifying glass
   '⚡', // Lightning/energy
   '🎊', // Celebration
   '🚀' // Rocket/progress
]

// Function to shuffle emojis and ensure no repeats until all are used
const getShuffledEmojis = (count: number) => {
   const result: string[] = []
   const availableEmojis = [...germanLearningEmojis]

   for (let i = 0; i < count; i++) {
      // If we've used all emojis, reset the pool
      if (availableEmojis.length === 0) {
         availableEmojis.push(...germanLearningEmojis)
      }

      // Pick a random emoji from available ones
      const randomIndex = Math.floor(Math.random() * availableEmojis.length)
      const selectedEmoji = availableEmojis.splice(randomIndex, 1)[0]
      result.push(selectedEmoji)
   }

   return result
}

export const OrganismGrammarPreview = ({ popularTopics }: GrammarPreviewProps) => {
   const shuffledEmojis = getShuffledEmojis(popularTopics.length)

   const getColorClasses = (_colorTheme: string) => {
      return ''
   }

   return (
      <div className="flex w-full flex-wrap justify-between gap-4 pt-10">
         <div className="flex w-full justify-between">
            <AtomText fontSize="medium" isBold>
               ****Gramatica Alemana****
            </AtomText>
            <Link href="grammar">
               <AtomText className="flex items-center justify-center gap-1" isBold isPrimary>
                  Ir a sección <Icon className="text-primary" icon="move-right" iconSize="small" />
               </AtomText>
            </Link>
         </div>

         <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {popularTopics.map((topic, index) => (
               <Link href={`grammar?topic=${topic.id}`} key={index}>
                  <div
                     className={`bg-base-100 hover:scale-102 flex h-16 transform-gpu cursor-pointer items-center rounded-lg border px-4 py-3 shadow-md transition-all duration-300 hover:shadow-lg ${getColorClasses(
                        topic.colorTheme
                     )}`}
                  >
                     {/* Emoji */}
                     <div className="mr-3 flex h-8 w-8 items-center justify-center text-lg">
                        {shuffledEmojis[index]}
                     </div>

                     {/* Topic Content */}
                     <div className="min-w-0 flex-1">
                        <AtomText className="block truncate" fontSize="small" isBold>
                           {topic.label}
                        </AtomText>
                     </div>
                  </div>
               </Link>
            ))}
         </div>
      </div>
   )
}
