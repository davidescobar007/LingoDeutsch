import type { MetadataRoute } from 'next'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://blabling.com'

const sitemap = (): MetadataRoute.Sitemap => {
   const locales = ['es', 'de']
   const currentDate = new Date()

   // Static pages
   const staticPages = ['', '/about', '/privacy', '/terms', '/login']

   // Generate entries for each locale
   const entries: MetadataRoute.Sitemap = []

   locales.forEach((locale) => {
      staticPages.forEach((page) => {
         entries.push({
            url: `${BASE_URL}/${locale}${page}`,
            lastModified: currentDate,
            changeFrequency: page === '' ? 'weekly' : 'monthly',
            priority: page === '' ? 1.0 : 0.8
         })
      })

      // App pages (lower priority as they require auth)
      const appPages = ['/app/home', '/app/vocabulary', '/app/grammar', '/app/article']
      appPages.forEach((page) => {
         entries.push({
            url: `${BASE_URL}/${locale}${page}`,
            lastModified: currentDate,
            changeFrequency: 'weekly',
            priority: 0.6
         })
      })
   })

   return entries
}

export default sitemap
