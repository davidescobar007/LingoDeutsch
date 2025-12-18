'use client'

import { TemplatePrivacy } from '@/components/templates'

type TPrivacyPageProps = {
   params: { locale: string }
}

const PrivacyPage = ({ params: { locale } }: TPrivacyPageProps) => {
   return <TemplatePrivacy locale={locale} />
}

export default PrivacyPage
