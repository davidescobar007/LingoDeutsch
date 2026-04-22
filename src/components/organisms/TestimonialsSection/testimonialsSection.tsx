import { MoleculeTestimonialCard } from '@/components/molecules'

const TESTIMONIALS_DATA = [
   {
      avatar: 'M',
      name: 'María González',
      quote: 'Probé varias apps antes. Después de un mes, ya empiezo a reconocer palabras y frases sueltas en la calle.',
      rating: 5,
      role: 'Estudiante de Medicina, 24 años'
   },
   {
      avatar: 'C',
      name: 'Carla Martínez',
      quote: 'Probé 3 apps y ninguna me daba estructura. Aquí al menos entiendo lo que estoy aprendiendo.',
      rating: 5,
      role: 'Arquitecta, 29 años'
   },
   {
      avatar: 'R',
      name: 'Wilson Méndez',
      quote: 'Las tarjetas de vocabulario me sirven para practicar en el transporte. Ya llevo un mes sin fallar.',
      rating: 5,
      role: 'Ingeniero Mecánico, 45 años'
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
