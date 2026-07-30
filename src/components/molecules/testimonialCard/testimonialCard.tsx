type MoleculeTestimonialCardProps = {
   avatar: string
   isFeatured?: boolean
   name: string
   quote: string
   rating: number
   role: string
}

export const MoleculeTestimonialCard = ({
   avatar,
   isFeatured = false,
   name,
   quote,
   rating,
   role
}: MoleculeTestimonialCardProps) => {
   return (
      <div className={`border-base-300 bg-base-100 rounded-2xl border p-6 ${isFeatured ? 'md:p-10' : ''}`}>
         <div className="mb-4 flex gap-1">
            {[...Array(rating)].map((_, index) => (
               <span className="text-accent text-xl" key={index}>
                  ★
               </span>
            ))}
         </div>
         <p className={`text-neutral mb-6 leading-relaxed ${isFeatured ? 'text-xl md:text-2xl' : 'text-base'}`}>
            &ldquo;{quote}&rdquo;
         </p>
         <div className="flex items-center gap-3">
            <div className="bg-primary flex h-12 w-12 items-center justify-center rounded-full font-bold text-white">
               {avatar}
            </div>
            <div>
               <div className="text-neutral font-bold">{name}</div>
               <div className="text-neutral/60 text-sm">{role}</div>
            </div>
         </div>
      </div>
   )
}
