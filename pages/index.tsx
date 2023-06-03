/******************************************************************************************
 * Repository: https://github.com/kolserdav/portfolio.git
 * Author: Sergey Kolmiller
 * Email: <serega12101983@gmail.com>
 * License: Специальная
 * License Text: Права на копирование и распостранение данного файла или его частей имеет только владелец указанного репозитория
 * Copyright: kolserdav, All rights reserved (c)
 * Create date: Sat Nov 27 2021 03:15:33 GMT+0700 (Krasnoyarsk Standard Time)
 ******************************************************************************************/
import type { NextPage, GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import clsx from 'clsx';
import '@kolserdav/swiper/dist/styles.css';
import s from '../styles/Page.module.scss';
import Slider from '../components/Slider/Slider';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Cloud from '../components/Cloud/Cloud';
import About from '../components/About/About';
import { request } from '../api/utils';

interface HomeProps {
  page: Api.Result<
    Backend._PageIndex & {
      Tech: Backend._Tech[];
    }
  >;
}

const Home: NextPage<HomeProps> = ({ page }: HomeProps) => {
  const { data } = page;

  const _data = data || {
    Tech: [],
  };

  return (
    <div className={s.wrapper__global}>
      <Head>
        <title>{_data.metaTitle}</title>
        <meta name="description" content={_data.metaDescription} />
        <meta name="keywords" content={_data.metaKeywords} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header
        headerTitle={_data.headerTitle}
        headerSubtitle={_data.headerSubtitle}
        headerDescription={_data.headerDescription}
      />
      <main className={clsx(s.main, s.row)}>
        <About
          aboutTitle={_data.aboutTitle}
          aboutSubtitle={_data.aboutSubtitle}
          personalTitle={_data.personalTitle}
          personalDescription={_data.personalDescription}
          techTitle={_data.techTitle}
          techDescription={_data.techDescription}
          Tech={_data.Tech}
        />
        <Slider sliderTitle={_data.sliderTitle} sliderDescription={_data.sliderDescription} />
        <Cloud cloudTitle={_data.cloudTitle} cloudContent={_data.cloudContent} />
      </main>
      <Footer />
    </div>
  );
};

export async function getServerSideProps({
  locale,
}: GetServerSidePropsContext): Promise<{ props: HomeProps }> {
  const lang: any = locale;
  const page = await request.pageIndexFindFirst({
    where: {
      lang,
    },
    include: {
      Tech: true,
    },
  });
  return {
    props: {
      page,
    },
  };
}

export default Home;
