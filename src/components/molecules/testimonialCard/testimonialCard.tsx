type MoleculeTestimonialCardProps = {
   avatar: string
   name: string
   quote: string
   rating: number
   role: string
}

export const MoleculeTestimonialCard = ({ avatar, name, quote, rating, role }: MoleculeTestimonialCardProps) => {
   return (
      <div className="rounded-2xl border border-gray-200 bg-white p-6">
         <div className="mb-4 flex gap-1">
            {[...Array(rating)].map((_, index) => (
               <span className="text-accent text-xl" key={index}>
                  ★
               </span>
            ))}
         </div>
         <p className="mb-4 text-gray-700">&ldquo;{quote}&rdquo;</p>
         <div className="flex items-center gap-3">
            <div className="from-primary flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br to-purple-600 font-bold text-white">
               {avatar}
            </div>
            <div>
               <div className="font-bold text-gray-900">{name}</div>
               <div className="text-sm text-gray-600">{role}</div>
            </div>
         </div>
      </div>
   )
}
