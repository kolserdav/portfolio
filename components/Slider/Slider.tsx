/******************************************************************************************
 * Repository: https://github.com/kolserdav/portfolio.git
 * File name: Slider.tsx
 * Author: Sergey Kolmiller
 * Email: <serega12101983@gmail.com>
 * License: Special
 * License text: Only the owner of the specified repository has the right to copy and distribute this file or its parts
 * Copyright: kolserdav, All rights reserved (c)
 * Create Date: Sun Apr 17 2022 03:56:19 GMT+0700 (Красноярск, стандартное время)
 ******************************************************************************************/
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Swiper, GetSwipeHandler, Swipe } from '@kolserdav/swiper';
import '@kolserdav/swiper/dist/index.css';
import s from './Slider.module.scss';
import PortfolioItem from '../PortfolioItem/PortfolioItem';
import { r, store } from '../../utils';

interface SliderProps {
  sliderTitle: string;
  sliderDescription: string;
}

/**
 * Slider component
 */
const Slider = ({ sliderTitle, sliderDescription }: SliderProps) => {
  const router = useRouter();
  const { locale } = router;
  const lang: any = locale;

  const [current, setCurrent] = useState<Swipe>();
  const [active, setActive] = useState<number>(0);
  const [dots, setDots] = useState<number[]>([]);
  const [blocked, setBlocked] = useState<boolean>(false);

  /**
   * Get next slide card
   */
  const getNext: GetSwipeHandler = async (old) => {
    const id = old + 1;
    const job = await r.jobFindFirst({
      where: {
        AND: [
          {
            id: {
              gte: id,
            },
          },
          {
            archive: false,
          },
          {
            lang,
          },
        ],
      },
      include: {
        Image: true,
      },
    });
    const { data } = job;
    return {
      id: data ? data.id : null,
      children: data ? <PortfolioItem data={data} /> : <div />,
    };
  };

  /**
   * Get prev slide card
   */
  const getPrevios: GetSwipeHandler = async (old) => {
    const id = old - 1;
    const job = await r.jobFindFirst({
      where: {
        AND: [
          {
            id: {
              lte: id,
            },
          },
          {
            archive: false,
          },
          {
            lang,
          },
        ],
      },
      orderBy: {
        id: 'desc',
      },
      include: {
        Image: true,
      },
    });
    const { data } = job;
    return {
      id: data ? data.id : null,
      children: data ? <PortfolioItem data={data} /> : <div />,
    };
  };

  const getCurrent = async (id?: number) => {
    setCurrent(await getNext(id || 0));
  };

  /**
   * Event onSwipe handler
   */
  const onSwipe = (currId: any) => {
    setActive(currId);
  };

  /**
   * Get current
   */
  useEffect(() => {
    (async () => {
      getCurrent(-1);
    })();
  }, [router.asPath, router.locale]);

  /**
   * Set blocked swipe when full image is open
   */
  useEffect(() => {
    const clearStore = store.subscribe(() => {
      const state = store.getState();
      if (state.type === 'SWIPER_BLOCKED') {
        setBlocked(state.swiperBlocked?.value || false);
      }
    });
    return () => {
      clearStore();
    };
  }, []);

  /**
   * Create dots
   */
  useEffect(() => {
    /**
     * Get swipe dots
     */
    const getDots = async () => {
      const jobs = await r.jobFindMany({
        where: {
          AND: [
            {
              archive: false,
            },
            {
              lang,
            },
          ],
        },
        select: {
          id: true,
        },
      });
      const { data } = jobs;
      setDots(data.map((item) => item.id));
    };
    getDots();
  }, [router.locale, router.asPath, lang]);

  return (
    <section className={s.wrapper}>
      <div className={s.container}>
        <div className={s.info}>
          <h2 className={s.title}>{sliderTitle}</h2>
          <p className={s.desc}>{sliderDescription}</p>
        </div>
        {current && (
          <Swiper
            blockSwipe={blocked}
            defaultCurrent={current}
            getNext={getNext}
            getPrev={getPrevios}
            onSwipe={onSwipe}
            className={s.card__content}
            dots={{
              list: dots,
              active,
            }}
            invitationAnimation={true}
          />
        )}
      </div>
    </section>
  );
};

export default Slider;
