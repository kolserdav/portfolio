import { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import clsx from 'clsx';
import Image from 'next/image';
import { Swiper, GetSwipeHandler, Swipe } from '@kolserdav/swiper';
import '@kolserdav/swiper/dist/index.css';
import s from './Slider.module.scss';
import PortfolioItem from '../PortfolioItem/PortfolioItem';
import { r } from '../../utils';

const getNext: GetSwipeHandler = async (old) => {
  const id = old + 1;
  const job = await r.jobFindFirst({
    where: {
      id: {
        gt: id,
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
        lt: id,
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

const Slider: NextPage = () => {
  const [current, setCurrent] = useState<Swipe>();

  const getCurrent = async () => {
    setCurrent(await getNext(0));
  };

  useEffect(() => {
    if (!current) {
      getCurrent();
    }
  }, []);
  return (
    <div className={s.swiper}>
      {current && (
        <Swiper
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
