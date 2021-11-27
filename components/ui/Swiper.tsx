import { useMemo, useState, createRef, RefObject } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import styles from '../../styles/ui/Swiper.module.scss';

export interface Swipe {
  id: number;
  children: ReactElement | ReactElement[];
}

interface SwipeFull extends Swipe {
  type: 'next' | 'current' | 'prev';
}

export type GetSwipeHandler = (oldNext: number) => Swipe | Promise<Swipe>;

interface SwiperProps {
  current: Swipe;
  next: Swipe;
  prev: Swipe;
  getNext: GetSwipeHandler;
  getPrev: GetSwipeHandler;
}

const DEFAULT_SWIPE: Swipe = {
  id: 0,
  children: <h1>Test</h1>,
};

const getSwipes = (prev: Swipe, current: Swipe, next: Swipe): SwipeFull[] => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result: any[] = [1, 2, 3].map((id) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const item: any = id === 1 ? { ...prev } : id === 2 ? { ...current } : { ...next };
    item.type = id === 1 ? 'prev' : id === 2 ? 'current' : 'next';
    return item;
  });
  return result;
};

const refs: {
  [key: number]: RefObject<HTMLDivElement>;
} = {};

const Swiper: Page<SwiperProps, SwiperProps> = (props) => {
  const { current, next, prev, getNext, getPrev } = props;

  const [_current, setCurrent] = useState<Swipe>(DEFAULT_SWIPE);
  const [_prev, setPrev] = useState<Swipe>(DEFAULT_SWIPE);
  const [_next, setNext] = useState<Swipe>(DEFAULT_SWIPE);

  const swipes = useMemo(() => getSwipes(prev, current, next), [prev, current, next]);

  const getRef = (id: number): typeof refs[0] => {
    refs[id] = refs[id] ? refs[id] : createRef<HTMLDivElement>();
    return refs[id];
  };

  return (
    <div className={styles.container}>
      {swipes.map((item) => (
        <div
          onTouchMove={() => {
            console.log(1);
          }}
          key={item.id}
          className={clsx(
            styles.card,
            item.type === 'prev' ? styles.prev : item.type === 'next' ? styles.next : ''
          )}
          ref={getRef(item.id)}
        >
          {item.children}
        </div>
      ))}
    </div>
  );
};

export default Swiper;
