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
import s from '../styles/Index.module.scss';
import Slider from '../components/Slider/Slider';

const Home: NextPage = () => {
  return (
    <div className={s.container}>
      <Head>
        <title>Мое портфолио</title>
        <meta name="description" content="Работы по верстке и программированию Кольмиллер Сергея" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={clsx(s.main, s.row)}>
        <Slider />
      </main>
    </div>
  );
};
export default Home;
