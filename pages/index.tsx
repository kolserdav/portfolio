/******************************************************************************************
 * Repository: https://github.com/kolserdav/portfolio.git
 * Author: Sergey Kolmiller
 * Email: <serega12101983@gmail.com>
 * License: Специальная
 * License Text: Права на копирование и распостранение данного файла или его частей имеет только владелец указанного репозитория
 * Copyright: kolserdav, All rights reserved (c)
 * Create date: Sat Nov 27 2021 03:15:33 GMT+0700 (Krasnoyarsk Standard Time)
 ******************************************************************************************/
import type { NextPage } from 'next';
import Head from 'next/head';
import clsx from 'clsx';
import '@kolserdav/swiper/dist/index.css';
import s from '../styles/Page.module.scss';
import Slider from '../components/Slider/Slider';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Cloud from '../components/Cloud/Cloud';
import About from '../components/About/About';
import { HETZNER_REFERAL_LINK, r } from '../utils';
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

  const _data = data || {};

  return (
    <div className={s.wrapper__global}>
      <Head>
        <title>Портфолио фрилансера</title>
        <meta name="description" content="Работы по верстке и программированию Кольмиллер Сергея" />
        <meta name="keywords" content="портфолио,сергей,кольмиллер" />
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

export async function getServerSideProps(): Promise<{ props: HomeProps }> {
  const page = await request.pageIndexFindFirst({
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
