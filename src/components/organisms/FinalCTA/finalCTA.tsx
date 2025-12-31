'use client'

import { AtomButton } from '@/components/atoms'

export const OrganismFinalCTA = () => {
   return (
      <div className="group">
         <div className="card-3d from-primary hover:shadow-3xl overflow-hidden rounded-3xl bg-gradient-to-r via-blue-700 to-purple-600 p-12 shadow-2xl transition-all">
            <div className="text-center text-white">
               <h3 className="mb-4 text-4xl font-black">¿Listo para comenzar?</h3>
               <p className="mb-8 text-lg text-white/90">Únete a 7,000+ estudiantes que ya dominan el alemán</p>
               <AtomButton href="/app/home" size="lg" type="link" variant="ACCENT">
                  Empezar Gratis Ahora 🚀
               </AtomButton>
               <p className="mt-6 text-sm text-white/80">Sin tarjeta de crédito · Sin anuncios · 100% gratis</p>
            </div>
         </div>
      </div>
   )
}
