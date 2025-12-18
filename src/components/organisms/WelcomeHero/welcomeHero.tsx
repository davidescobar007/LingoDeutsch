import { AtomText, AtomTitle } from '@/components/atoms'

type OrganismWelcomeHeroProps = {
   userName: string
   extraClassName?: string
}

export const OrganismWelcomeHero = ({ userName, extraClassName = '' }: OrganismWelcomeHeroProps) => {
   return (
      <div className={extraClassName}>
         <AtomTitle type="h2">👋 Hola {userName}, ¿listo para aprender alemán hoy?</AtomTitle>
         <AtomText type="span">Comienza tu lección diaria y sigue aprendiendo.</AtomText>
      </div>
   )
}
