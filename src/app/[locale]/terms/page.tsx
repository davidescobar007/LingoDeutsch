'use client'

import { TemplateTerms } from '@/components/templates'

const TermsPage = ({ params: { locale } }: { params: { locale: string } }) => {
   return <TemplateTerms locale={locale} />
}

export default TermsPage
