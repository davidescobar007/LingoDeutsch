import { MoleculeTestimonialCard } from '@/components/molecules'

const TESTIMONIALS_DATA = [
   {
      avatar: 'M',
      name: 'María González',
      quote: 'En 3 meses pasé de cero a B1. Increíble plataforma.',
      rating: 5,
      role: 'Estudiante'
   },
   {
      avatar: 'C',
      name: 'Carlos Ruiz',
      quote: 'El mejor método que he probado para aprender alemán.',
      rating: 5,
      role: 'Ingeniero'
   },
   {
      avatar: 'A',
      name: 'Ana Torres',
      quote: 'Interfaz hermosa y contenido de calidad. Perfecto.',
      rating: 5,
      role: 'Diseñadora'
   }
]

export const OrganismTestimonialsSection = () => {
   return (
      <div className="group">
         <div className="card-3d overflow-hidden rounded-3xl border border-gray-100 bg-gradient-to-br from-pink-50 to-white p-12 transition-all hover:shadow-2xl">
            <div className="mb-8">
               <h3 className="mb-2 text-3xl font-black text-gray-900">Lo que dicen nuestros alumnos</h3>
               <p className="text-base text-gray-600">Historias reales de éxito</p>
            </div>
            <div className="space-y-6">
               {TESTIMONIALS_DATA.map((testimonial, index) => (
                  <MoleculeTestimonialCard key={index} {...testimonial} />
               ))}
            </div>
         </div>
      </div>
   )
}
