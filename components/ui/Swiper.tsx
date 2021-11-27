import { useMemo, useState } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import styles from '../../styles/ui/Swiper.module.scss';

export interface Swipe {
  id: number;
  children: ReactElement | ReactElement[];
}

export type GetSwipeHandler = (oldNext: number) => Swipe | Promise<Swipe>;

interface SwiperProps {
  current: Swipe;
  next: Swipe;
  previos: Swipe;
  getNext: GetSwipeHandler;
  getPrevios: GetSwipeHandler;
}

const DEFAULT_SWIPE: Swipe = {
  id: 0,
  children: <></>,
};

const getSwipes = (previos: Swipe, next: Swipe, current: Swipe): Swipe[] => {
  const result: any[] = [1, 2, 3].map((id) => (id === 1 ? previos : id === 2 ? current : next));
  return result;
};

const Swiper: Page<SwiperProps, SwiperProps> = (props) => {
  const { current, next, previos, getNext, getPrevios } = props;

  const [_current, setCurrent] = useState<Swipe>(DEFAULT_SWIPE);
  const [_previos, setPrevios] = useState<Swipe>(DEFAULT_SWIPE);
  const [_next, setNext] = useState<Swipe>(DEFAULT_SWIPE);

  const swipes = useMemo(() => getSwipes(previos, current, next), [previos, current, next]);

  return (
    <div className={styles.container}>
      {swipes.map((item) => (
        <div className={styles.paper}>{item.children}</div>
      ))}
    </div>
  );
};

export default Swiper;
