const STATS_DATA = [
   { icon: '👥', label: 'Estudiantes', value: '10,000+' },
   { icon: '🎯', label: 'Tasa de éxito', value: '97%' },
   { icon: '📝', label: 'Palabras', value: '3,000+' },
   { icon: '📚', label: 'Artículos', value: '60+' }
]

export const OrganismStatsSection = () => {
   return (
      <div className="group">
         <div className="card-3d overflow-hidden rounded-3xl border border-gray-100 bg-gradient-to-br from-purple-50 to-white p-12 transition-all hover:shadow-2xl">
            <div className="mb-8">
               <h3 className="mb-2 text-4xl font-black text-gray-900">Resultados Comprobados</h3>
               <p className="text-lg text-gray-600">Miles de estudiantes ya confiaron en nosotros</p>
            </div>
            <div className="grid grid-cols-2 gap-6">
               {STATS_DATA.map((stat, index) => (
                  <div className="rounded-2xl border border-gray-200 bg-white p-6 text-center" key={index}>
                     <div className="mb-2 text-4xl">{stat.icon}</div>
                     <div className="mb-1 text-3xl font-black text-gray-900">{stat.value}</div>
                     <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
               ))}
            </div>
         </div>
      </div>
   )
}
