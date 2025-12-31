import { MoleculeFeatureCard } from '@/components/molecules'

const VOCABULARY_ITEMS = [
   { category: 'Comida', translation: 'el café', word: 'der Kaffee' },
   { category: 'Trabajo', translation: 'trabajar', word: 'arbeiten' },
   { category: 'Vivienda', translation: 'la casa', word: 'das Haus' }
]

export const OrganismFeatureShowcase = () => {
   return (
      <div className="w-full space-y-32">
         <MoleculeFeatureCard
            content={
               <div className="grid grid-cols-3 gap-4">
                  <div className="rounded-xl bg-white p-4 text-center shadow-sm">
                     <div className="text-primary text-2xl font-black">A1-A2</div>
                     <div className="text-xs text-gray-600">Básico</div>
                  </div>
                  <div className="rounded-xl bg-white p-4 text-center shadow-sm">
                     <div className="text-primary text-2xl font-black">B1-B2</div>
                     <div className="text-xs text-gray-600">Intermedio</div>
                  </div>
                  <div className="rounded-xl bg-white p-4 text-center shadow-sm">
                     <div className="text-primary text-2xl font-black">C1</div>
                     <div className="text-xs text-gray-600">Avanzado</div>
                  </div>
               </div>
            }
            description="Desde A1 hasta C1. Lecciones estructuradas que siguen el Marco Común Europeo de Referencia. Aprende a tu ritmo con explicaciones claras y ejercicios prácticos."
            gradient="from-blue-50"
            icon="📚"
            iconBg="bg-primary/10"
            title="Gramática Completa"
         />

         <MoleculeFeatureCard
            content={
               <div className="space-y-3">
                  {VOCABULARY_ITEMS.map((item, index) => (
                     <div
                        className="hover:border-success flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4 transition-all"
                        key={index}
                     >
                        <div>
                           <div className="font-bold text-gray-900">{item.word}</div>
                           <div className="text-sm text-gray-500">{item.translation}</div>
                        </div>
                        <div className="bg-success/10 text-success rounded-lg px-3 py-1 text-xs font-bold">
                           {item.category}
                        </div>
                     </div>
                  ))}
               </div>
            }
            description="Más de 3,000 palabras organizadas por temas. Aprende vocabulario útil en contextos reales. Sistema de repetición espaciada para retención a largo plazo."
            gradient="from-green-50"
            icon="💬"
            iconBg="bg-success/10"
            title="Vocabulario Contextual"
         />

         <MoleculeFeatureCard
            content={
               <div className="rounded-xl border-2 border-gray-200 bg-white p-6">
                  <div className="mb-4 flex items-center gap-3">
                     <div className="bg-success h-2 w-2 rounded-full" />
                     <div className="text-sm font-bold text-gray-900">60+ artículos disponibles</div>
                  </div>
                  <div className="space-y-2 text-gray-700">
                     <p className="leading-relaxed">
                        <span className="hover:text-primary cursor-pointer underline decoration-dotted">
                           Deutschland
                        </span>{' '}
                        ist ein{' '}
                        <span className="hover:text-primary cursor-pointer underline decoration-dotted">Land</span>{' '}
                        in{' '}
                        <span className="hover:text-primary cursor-pointer underline decoration-dotted">
                           Europa
                        </span>
                        ...
                     </p>
                  </div>
               </div>
            }
            description="Artículos auténticos de la cultura alemana. Click en cualquier palabra para ver su traducción instantánea. Aprende alemán leyendo sobre temas que te interesan."
            gradient="from-accent/10"
            icon="📖"
            iconBg="bg-accent/20"
            title="Lectura Inmersiva"
         />
      </div>
   )
}
