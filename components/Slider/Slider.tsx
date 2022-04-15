import { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import { Swiper, GetSwipeHandler, Swipe } from '@kolserdav/swiper';
import '@kolserdav/swiper/dist/index.css';
import s from './Slider.module.scss';
import PortfolioItem from '../PortfolioItem/PortfolioItem';
import { r, store } from '../../utils';

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

const Slider: NextPage = () => {
  const [current, setCurrent] = useState<Swipe>();
  const [blocked, setBlocked] = useState<boolean>(false);

  const getCurrent = async () => {
    setCurrent(await getNext(0));
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

  return (
    <div className={s.swiper}>
      {current && (
        <Swiper
          blockSwipe={blocked}
          defaultCurrent={current}
          getNext={getNext}
          getPrev={getPrevios}
          invitationAnimation={true}
        />
      )}
    </div>
  );
};

export default Slider;
