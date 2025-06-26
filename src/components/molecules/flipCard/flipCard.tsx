import { FunctionComponent } from 'react'

import { AtomText, AtomTitle } from '@/components/atoms'

type TMoleculeFlipCard = {
   germanText: string
   spanishText: string
   germanExample?: string
   spanishExample?: string
}

export const MoleculeFlipCard: FunctionComponent<TMoleculeFlipCard> = ({
   germanText,
   spanishText,
   germanExample = '',
   spanishExample = ''
}) => {
   return (
      <div className="flex justify-center">
         <label
            aria-label="Click to flip card between German and Spanish"
            className="swap group cursor-pointer select-none"
         >
            <input className="peer hidden" type="checkbox" />

            {/* German Side (Front) - Uses info colors (blue) */}
            <div className="swap-off card border-info/30 from-info/10 to-info/20 h-64 w-96 border-2 bg-gradient-to-br shadow-lg">
               <div className="card-body relative flex h-full flex-col items-center justify-center text-center">
                  {/* Language Label */}
                  <div className="bg-info text-info-content absolute left-4 top-4 rounded-full px-2 py-1 text-xs font-semibold">
                     🇩🇪 Alemán
                  </div>

                  {/* Flip Hint */}
                  <div className="text-info-content absolute right-4 top-4 text-sm opacity-70 hover:opacity-100">
                     👆 Toca para voltear
                  </div>

                  {/* German Text */}
                  <div className="flex flex-col items-center justify-center space-y-3">
                     <div className="text-info-content text-3xl font-bold">
                        <AtomTitle type="h2">{germanText}</AtomTitle>
                     </div>
                     {germanExample && (
                        <div className="text-center">
                           <AtomText className="text-info-content text-sm italic">
                              &ldquo;{germanExample}&rdquo;
                           </AtomText>
                        </div>
                     )}
                  </div>

                  {/* Bottom Hint */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                     <AtomText className="text-info-content text-sm opacity-80">
                        Ver traducción en español
                     </AtomText>
                  </div>
               </div>
            </div>

            {/* Spanish Side (Back) - Uses success colors (green) */}
            <div className="swap-on card border-success/30 from-success/10 to-success/20 h-64 w-96 border-2 bg-gradient-to-br shadow-lg">
               <div className="card-body relative flex h-full flex-col items-center justify-center text-center">
                  {/* Language Label */}
                  <div className="bg-success text-success-content absolute left-4 top-4 rounded-full px-2 py-1 text-xs font-semibold">
                     🇪🇸 Español
                  </div>

                  {/* Flip Hint */}
                  <div className="text-success-content absolute right-4 top-4 text-sm opacity-70 transition-opacity hover:opacity-100">
                     👆 Toca para voltear
                  </div>

                  {/* Spanish Text */}
                  <div className="flex flex-col items-center justify-center space-y-3">
                     <div className="text-success-content text-3xl font-bold">
                        <AtomTitle type="h2">{spanishText}</AtomTitle>
                     </div>
                     {spanishExample && (
                        <div className="text-center">
                           <AtomText className="text-success-content text-sm italic">
                              &ldquo;{spanishExample}&rdquo;
                           </AtomText>
                        </div>
                     )}
                  </div>

                  {/* Bottom Hint */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                     <AtomText className="text-success-content text-sm opacity-80">Ver palabra en alemán</AtomText>
                  </div>
               </div>
            </div>
         </label>
      </div>
   )
}
