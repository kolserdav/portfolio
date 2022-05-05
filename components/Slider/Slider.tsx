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
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import queryString from 'query-string';
import { Swiper, GetSwipeHandler, Swipe } from '@kolserdav/swiper';
import '@kolserdav/swiper/dist/index.css';
import s from './Slider.module.scss';
import PortfolioItem from '../PortfolioItem/PortfolioItem';
import { r, store } from '../../utils';

/**
 * Get next slide card
 */
const getNext: GetSwipeHandler = async (old) => {
  const id = old + 1;
  const job = await r.jobFindFirst({
    where: {
      id: {
        gte: id,
      },
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
      id: {
        lte: id,
      },
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

/**
 * Slider component
 */
const Slider: NextPage = () => {
  const router = useRouter();

  const [current, setCurrent] = useState<Swipe>();
  const [active, setActive] = useState<number>(0);
  const [dots, setDots] = useState<number[]>([]);
  const [blocked, setBlocked] = useState<boolean>(false);

  const getCurrent = async (id?: number) => {
    setCurrent(await getNext(id || 0));
  };

  /**
   * Get swipe dots
   */
  const getDots = async () => {
    const jobs = await r.jobFindMany({
      select: {
        id: true,
      },
    });
    const { data } = jobs;
    setDots(data.map((item) => item.id));
  };

  /**
   * Event onSwipe handler
   */
  const onSwipe = (currId: any) => {
    setActive(currId);
    const _router = {
      query: {
        j: currId,
      },
    };
    router.push(_router, _router, { scroll: false });
  };

  /**
   * Get current
   */
  useEffect(() => {
    if (!current) {
      (async () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { j }: any = queryString.parse(router.asPath.replace(/^\/?\??/, ''));
        const id = parseInt(j, 10);
        if (!Number.isNaN(id)) {
          getCurrent(id - 1);
        } else {
          getCurrent();
        }
      })();
    }
  }, [current, router.asPath]);

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
    getDots();
  }, []);

  return (
    <section className={s.wrapper}>
      <div className={s.container}>
        <div className={s.info}>
          <h2 className={s.title}>Работы</h2>
          <p className={s.desc}>
            Ниже приведены работы в которых я принимал решающее участие. Из таких проектов это
            далеко не полный список, здесь приведены только те работы которые можно открыть в
            браузере.
          </p>
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
