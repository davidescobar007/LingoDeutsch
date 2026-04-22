import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
   return {
      name: 'Blabling - Aprende alemán de forma fácil y divertida',
      short_name: 'Blabling',
      description:
         'Domina el alemán leyendo lo que te apasiona. De A1 a B2 con lecturas reales, vocabulario con repetición espaciada y gramática clara.',
      start_url: '/es',
      display: 'standalone',
      background_color: '#ffffff',
      theme_color: '#2563EB',
      icons: [
         {
            src: '/images/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
         },
         {
            src: '/images/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'
         }
      ]
   }
}
