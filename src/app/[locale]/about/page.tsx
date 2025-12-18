'use client'

import { TemplateAbout } from '@/components/templates'

const AboutPage = ({ params: { locale } }: { params: { locale: string } }) => {
   return <TemplateAbout locale={locale} />
}

export default AboutPage
