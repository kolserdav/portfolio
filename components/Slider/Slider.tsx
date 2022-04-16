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
  const [current, setCurrent] = useState<Swipe>();
  const [active, setActive] = useState<number>(0);
  const [dots, setDots] = useState<number[]>([]);
  const [blocked, setBlocked] = useState<boolean>(false);

  const getCurrent = async () => {
    setCurrent(await getNext(0));
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

  const onSwipe = (currId: any) => {
    setActive(currId);
  };

  /**
   * Get current
   */
  useEffect(() => {
    if (!current) {
      getCurrent();
    }
  }, [current]);

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
    <div className={s.swiper}>
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
  );
};

export default Slider;
