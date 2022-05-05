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
import { HETZNER_REFERAL_LINK } from '../utils';

const Home: NextPage = () => {
  return (
    <div className={s.wrapper__global}>
      <Head>
        <title>Портфолио фрилансера</title>
        <meta name="description" content="Работы по верстке и программированию Кольмиллер Сергея" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header
        title="Портфолио фрилансера"
        subtitle="Разработка современных веб приложений"
        description="Презентация моих работ в области веб разработки и другая информация"
      />
      <main className={clsx(s.main, s.row)}>
        <About />
        <Slider />
        <Cloud
          title="Облачные сервисы"
          content={`В своей работе для развертывания приложений в сети я использовал разные облачные
            сервисы. Но в последнее время постоянно пользуюсь только Hetzner. Причина в том, что
            среди множества услуг веб сервисов для меня важны только две - это выделенные серверы и
            управение DNS зоной хостинга. В Hetzner сервера работают очень качественно и это не
            преувеличение, при том что их стоимость значительно ниже аналогов у конкурентов, то на
            мой взгляд выбор очевиден. Для новых пользователей рекомендую регистрироваться по моей 
            <a href="${HETZNER_REFERAL_LINK}">реферальной ссылке</a> при регистрации
            после подтверждения документов вы получите 20 евро на депозит, которые можно потратить в
            течении 12 месяцев на все услуги раздела <span>cloud</span>.
            Этой суммы вполне хватит на несколько месяцев использования не самого слабого сервера. 
            <span>
              Перед подключением ознакомьтесь с 
              <a href="https://console.hetzner.cloud/assets/legal/Referral-Programm_en.pdf">
                Правилами реферальной программы Hetzner
              </a>
            </span>`}
        />
      </main>
      <Footer />
    </div>
  );
};
export default Home;
