'use client'

import { use } from 'react'

import { TemplateAbout } from '@/components/templates'

const AboutPage = ({ params }: { params: Promise<{ locale: string }> }) => {
   const { locale } = use(params)

   return <TemplateAbout locale={locale} />
}

export default AboutPage
