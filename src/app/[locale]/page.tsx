'use client'

import { TemplateLanding } from '@/components/templates'

const Home = ({ params: { locale } }: { params: { locale: string } }) => {
   return <TemplateLanding locale={locale} />
}
export default Home
