'use client'

import { use } from 'react'

import { TemplatePrivacy } from '@/components/templates'

type TPrivacyPageProps = {
   params: Promise<{ locale: string }>
}

const PrivacyPage = ({ params }: TPrivacyPageProps) => {
   const { locale } = use(params)

   return <TemplatePrivacy locale={locale} />
}

export default PrivacyPage
