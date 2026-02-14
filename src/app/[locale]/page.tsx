import type { Metadata } from 'next'

import { TemplateLanding } from '@/components/templates'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://blabling.com'

export const generateMetadata = async ({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> => {
   const { locale } = await params
   const isSpanish = locale === 'es'

   const title = isSpanish
      ? 'Blabling - Aprende alemán de forma fácil y divertida'
      : 'Blabling - Lerne Deutsch einfach und unterhaltsam'

   const description = isSpanish
      ? 'Domina el alemán leyendo lo que te apasiona. De A1 a B2 con lecturas reales, vocabulario con repetición espaciada y gramática clara. Todo en español.'
      : 'Beherrsche Deutsch durch das Lesen dessen, was dich begeistert. Von A1 bis B2 mit echten Texten, Vokabeln mit Spaced Repetition und klarer Grammatik.'

   const keywords = isSpanish
      ? [
           'aprender alemán',
           'alemán para hispanohablantes',
           'curso alemán online',
           'alemán A1',
           'alemán A2',
           'alemán B1',
           'alemán B2',
           'vocabulario alemán',
           'gramática alemana',
           'repetición espaciada',
           'Blabling'
        ]
      : [
           'Deutsch lernen',
           'Deutsch für Spanischsprachige',
           'Online Deutschkurs',
           'Deutsch A1',
           'Deutsch A2',
           'Deutsch B1',
           'Deutsch B2',
           'deutscher Wortschatz',
           'deutsche Grammatik',
           'Spaced Repetition',
           'Blabling'
        ]

   return {
      title,
      description,
      keywords,
      authors: [{ name: 'Blabling Team' }],
      creator: 'Blabling',
      publisher: 'Blabling',
      metadataBase: new URL(BASE_URL),
      alternates: {
         canonical: `${BASE_URL}/${locale}`,
         languages: {
            es: `${BASE_URL}/es`,
            de: `${BASE_URL}/de`
         }
      },
      openGraph: {
         type: 'website',
         locale: locale === 'es' ? 'es_ES' : 'de_DE',
         alternateLocale: locale === 'es' ? 'de_DE' : 'es_ES',
         url: `${BASE_URL}/${locale}`,
         siteName: 'Blabling',
         title,
         description,
         images: [
            {
               url: `${BASE_URL}/images/og-image.png`,
               width: 1200,
               height: 630,
               alt: isSpanish ? 'Blabling - Aprende alemán' : 'Blabling - Lerne Deutsch'
            }
         ]
      },
      twitter: {
         card: 'summary_large_image',
         title,
         description,
         images: [`${BASE_URL}/images/og-image.png`],
         creator: '@blabling'
      },
      robots: {
         index: true,
         follow: true,
         googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1
         }
      },
      verification: {
         google: process.env.GOOGLE_SITE_VERIFICATION || ''
      }
   }
}

const Home = async ({ params }: { params: Promise<{ locale: string }> }) => {
   const { locale } = await params
   const websiteSchema = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Blabling',
      url: BASE_URL,
      description:
         locale === 'es'
            ? 'Plataforma de aprendizaje de alemán para hispanohablantes'
            : 'Deutschlernplattform für Spanischsprachige',
      inLanguage: [locale === 'es' ? 'es-ES' : 'de-DE'],
      potentialAction: {
         '@type': 'SearchAction',
         target: `${BASE_URL}/search?q={search_term_string}`,
         'query-input': 'required name=search_term_string'
      }
   }

   const organizationSchema = {
      '@context': 'https://schema.org',
      '@type': 'EducationalOrganization',
      name: 'Blabling',
      url: BASE_URL,
      logo: `${BASE_URL}/images/icon.png`,
      description:
         locale === 'es'
            ? 'Aprende alemán de forma fácil y divertida con lecturas interactivas y repetición espaciada'
            : 'Lerne Deutsch einfach und unterhaltsam mit interaktiven Texten und Spaced Repetition',
      sameAs: ['https://twitter.com/blabling', 'https://instagram.com/blabling'],
      offers: {
         '@type': 'Offer',
         category: 'German Language Course',
         price: '0',
         priceCurrency: 'EUR',
         availability: 'https://schema.org/InStock'
      }
   }

   const courseSchema = {
      '@context': 'https://schema.org',
      '@type': 'Course',
      name: locale === 'es' ? 'Curso de Alemán Online' : 'Online Deutschkurs',
      description:
         locale === 'es'
            ? 'Aprende alemán de A1 a B2 con lecturas interactivas, vocabulario con repetición espaciada y gramática clara'
            : 'Lerne Deutsch von A1 bis B2 mit interaktiven Texten, Vokabeln mit Spaced Repetition und klarer Grammatik',
      provider: {
         '@type': 'Organization',
         name: 'Blabling',
         url: BASE_URL
      },
      educationalLevel: ['A1', 'A2', 'B1', 'B2'],
      inLanguage: locale === 'es' ? 'es' : 'de',
      teaches: 'German Language',
      isAccessibleForFree: true,
      hasCourseInstance: {
         '@type': 'CourseInstance',
         courseMode: 'online',
         courseWorkload: 'PT1H'
      }
   }

   return (
      <>
         {/* eslint-disable-next-line react/no-danger */}
         <script dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} type="application/ld+json" />
         {/* eslint-disable-next-line react/no-danger */}
         {/* eslint-disable react/no-danger */}
         <script
            dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
            type="application/ld+json"
         />
         {/* eslint-disable-next-line react/no-danger */}
         <script dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }} type="application/ld+json" />
         <TemplateLanding locale={locale} />
      </>
   )
}

export default Home
