'use client'

import { use } from 'react'

import { TemplateTerms } from '@/components/templates'

const TermsPage = ({ params }: { params: Promise<{ locale: string }> }) => {
   const { locale } = use(params)

   return <TemplateTerms locale={locale} />
}

export default TermsPage
