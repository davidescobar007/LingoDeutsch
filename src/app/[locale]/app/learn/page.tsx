/* eslint-disable react/jsx-sort-props */
'use client'
import React, { useMemo } from 'react'
import { TbBook, TbBook2, TbBrain, TbChecklist, TbClock, TbFlame } from 'react-icons/tb'
import { useTranslations } from 'next-intl'
import { Keyboard, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import { AtomTitle } from '@/components/atoms'
import { MoleculeCallToActionCard, MoleculeCard, MoleculeMiniCard, MoleculeScore } from '@/components/molecules'
import { useArticleList } from '@/hooks/articles'
import { useGetGrammarByLevel } from '@/hooks/grammar'
import { useGetVocabularyStats } from '@/hooks/translations'
import { useScore } from '@/hooks/user'
import { TUser } from '@/modules/actions/types'
import { getUserInfo } from '@/modules/actions/users.actions'
import { constants } from '@/modules/global.types'
import { getCookie } from '@/utils'

import 'swiper/css/pagination'
import 'swiper/css/navigation'

import 'swiper/css'

const classes = {
   container: 'flex w-full flex-col',
   section: 'mb-10 w-full rounded-2xl bg-white shadow-md',
   sectionContent: 'p-8',
   timelineContainer: 'flex h-full flex-1 gap-10',
   leftColumn: 'flex w-8/12 flex-wrap',
   cardContainer: 'mb-12 w-full rounded-2xl bg-white p-8 shadow-md',
   articleContainer: 'w-full rounded-2xl bg-white p-8 shadow-md',
   articleContent: 'w-full',
   articleList: 'rounded-box flex w-full space-x-4 overflow-x-scroll',
   rightColumn: 'flex h-full w-3/12 flex-1 flex-col rounded-2xl bg-white p-8 shadow-md'
}

const Learn = () => {
   const t = useTranslations()
   const user = getUserInfo() as TUser
   const { data: listOfGrammarTopics } = useGetGrammarByLevel('A1')
   const { data: articles, isFetching } = useArticleList()
   const { data: vocabularyStats } = useGetVocabularyStats(user)
   const { data: scoreList } = useScore()
   const language = useMemo(() => getCookie('NEXT_LOCALE'), []) as string

   const listOfItems: { text: string; url: string }[] = (
      listOfGrammarTopics?.map(({ topic, id }) =>
         topic ? { text: topic[language as keyof typeof topic], url: `/app/grammar/A1/${id}` } : null
      ) ?? []
   ).filter((item: { text: string; url: string } | null): item is { text: string; url: string } => item !== null)

   return (
      <div className="flex w-full flex-col">
         <AtomTitle type="h3">{t('grammar.title')}</AtomTitle>
         <MoleculeCallToActionCard
            buttonProps={{ buttonText: 'Empieza con gramatica', isBlock: false, buttonIcon: <TbBook /> }}
            content="Learn the foundations of German grammar through our structured modules. From basic prepositions to understanding noun"
            icon={<TbBook />}
            isIconFilled
            title={t('grammar.title')}
         />

         <AtomTitle type="h3">Vocabulario</AtomTitle>
         <div className="-m-3 mb-3 flex flex-wrap">
            <div className="w-6/12  p-3 md:w-3/12">
               <MoleculeMiniCard content="Guardadas" footer="42" icon={<TbBook />} className="" />
            </div>
            <div className="w-6/12  p-3 md:w-3/12 ">
               <MoleculeMiniCard content="Aprendidas" footer="15" icon={<TbBrain />} className=" " />
            </div>
            <div className="w-6/12  p-3 md:w-3/12">
               <MoleculeMiniCard content="A revisar" footer="8" icon={<TbClock />} className="" />
            </div>
            <div className="w-6/12  p-3 md:w-3/12">
               <MoleculeMiniCard content="Racha" footer="5" icon={<TbFlame />} className="" />
            </div>
            <div className="w-full p-3 md:w-6/12">
               <MoleculeCallToActionCard
                  buttonProps={{ buttonText: 'Review vocabulary', isBlock: true, typeOf: 'SECONDARY' }}
                  content="learn 5 new words today"
                  dinamicContent={<progress className="progress progress-primary w-full" max="100" value={30} />}
                  icon={<TbChecklist />}
                  title="Daily goal"
               />
            </div>
            <div className="w-full p-3 md:w-6/12">
               <MoleculeCallToActionCard
                  buttonProps={{ buttonText: 'Continue learning', isBlock: true }}
                  content="15% of total words mastered"
                  dinamicContent={<progress className="progress progress-primary w-full" max="100" value={30} />}
                  icon={<TbBook2 />}
                  title={t('grammar.title')}
               />
            </div>
         </div>

         <AtomTitle type="h3">Reading practice</AtomTitle>
         <div className="mb-3 w-full">
            <Swiper
               slidesPerView={1}
               spaceBetween={30}
               keyboard={{
                  enabled: true
               }}
               style={
                  {
                     '--swiper-navigation-color': '#fff',
                     '--swiper-pagination-color': '#fff'
                     // '--swiper-pagination-background': '#000'
                  } as React.CSSProperties
               }
               allowTouchMove
               cardsEffect={{
                  slideShadows: true
               }}
               breakpoints={{
                  640: {
                     slidesPerView: 1,
                     spaceBetween: 30
                  },
                  768: {
                     slidesPerView: 2,
                     spaceBetween: 40
                  },
                  1024: {
                     slidesPerView: 3,
                     spaceBetween: 20
                  }
               }}
               pagination={{
                  clickable: true
               }}
               navigation
               modules={[Keyboard, Pagination, Navigation]}
               className="mySwiper"
            >
               {articles.map(({ id, title, imageFile }) => {
                  return (
                     <SwiperSlide key={id}>
                        <div className="">
                           <MoleculeCard
                              className="h-64 from-10% via-80% to-10% before:!bg-transparent before:!bg-gradient-to-b before:!from-gray-700 before:!via-gray-600 before:!to-transparent"
                              image={`${process.env.NEXT_PUBLIC_API_ENVIRONMENT}/api/files/${constants.ARTICLES}/${id}/${imageFile}`}
                              key={id}
                              redirectTo={id}
                              title={title}
                           />
                        </div>
                     </SwiperSlide>
                  )
               })}
            </Swiper>
         </div>

         <AtomTitle type="h3">{t('score.title')}</AtomTitle>
         <div className="outlinedCard flex-grow overflow-y-auto" style={{ height: '500px' }}>
            {scoreList && <MoleculeScore scoreList={scoreList} user={user} />}
         </div>
      </div>
   )
}

export default Learn
