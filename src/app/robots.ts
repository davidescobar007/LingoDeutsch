import type { MetadataRoute } from 'next'

const BASE_URL = process.env.BASE_URL || 'https://blabling.com'

const robots = (): MetadataRoute.Robots => {
   return {
      rules: [
         {
            userAgent: '*',
            allow: '/',
            disallow: ['/api/', '/app/vocabulary/practice/', '/app/quiz/']
         }
      ],
      sitemap: `${BASE_URL}/sitemap.xml`
   }
}

export default robots
