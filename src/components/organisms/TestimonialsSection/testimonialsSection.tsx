import { MoleculeTestimonialCard } from '@/components/molecules'

const TESTIMONIALS_DATA = [
   {
      avatar: 'M',
      name: 'María González',
      quote: 'Llevo 4 meses usando Blabling y ya aprobé el examen A2. Los ejercicios de gramática interactivos me ayudaron mucho a entender los casos alemanes. Al principio me costaba, pero ahora puedo mantener conversaciones básicas con mi pareja alemana.',
      rating: 5,
      role: 'Estudiante de Medicina, 24 años'
   },
   {
      avatar: 'C',
      name: 'Carla Martínez',
      quote: 'Usé Duolingo por 8 meses y apenas aprendí frases básicas. Era demasiado gamificado y le faltaba profundidad educativa. Con Blabling, en solo 3 meses ya puedo mantener conversaciones reales. Las lecciones estructuradas de gramática, las lecturas y la repetición espaciada me dieron las bases que necesitaba para realmente aprender alemán.',
      rating: 5,
      role: 'Arquitecta, 29 años'
   },
   {
      avatar: 'A',
      name: 'Ana Torres',
      quote: 'Después de intentar aprender con apps y cursos por 2 años sin progreso, encontré Blabling. En 3 meses pasé de A1 a A2. La estructura de las lecciones y el seguimiento de progreso me mantuvieron motivada. Ahora me siento lista para mi entrevista de trabajo en Múnich.',
      rating: 5,
      role: 'Diseñadora UX, 28 años'
   },
   {
      avatar: 'R',
      name: 'Roberto Méndez',
      quote: 'A mis 45 años pensé que sería imposible aprender otro idioma, pero Blabling me demostró lo contrario. En 5 meses logré entender las noticias en alemán básico. Las tarjetas de vocabulario fueron perfectas para practicar mientras voy en el transporte público.',
      rating: 5,
      role: 'Gerente de Ventas, 45 años'
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
