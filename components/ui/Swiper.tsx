import { useMemo, useState, createRef, RefObject, useEffect, TouchEvent } from 'react';
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

type TouchName = 'onTouchMove' | 'onTouchStart' | 'onTouchEnd' | 'onTouchCancel';
type TouchHandler = (name: TouchName) => (event: TouchEvent<HTMLDivElement>) => void;

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

let startTime: number;

/**
 * Swiper component
 */
const Swiper: Page<SwiperProps, SwiperProps> = (props) => {
  const { current, next, prev, getNext, getPrev } = props;

  const [_current, setCurrent] = useState<Swipe>(DEFAULT_SWIPE);
  const [_prev, setPrev] = useState<Swipe>(DEFAULT_SWIPE);
  const [_next, setNext] = useState<Swipe>(DEFAULT_SWIPE);
  const [width, setWidth] = useState<number>();

  const containerRef = createRef<HTMLDivElement>();

  const swipes = useMemo(() => getSwipes(prev, current, next), [prev, current, next]);

  /**
   *
   */
  const getRef = (id: number): typeof refs[0] => {
    refs[id] = refs[id] ? refs[id] : createRef<HTMLDivElement>();
    return refs[id];
  };

  /**
   * Touch event handler
   */
  const onTouchHandler = (name: TouchName, e: TouchEvent) => {
    const { touches } = e;
    const clientX = touches[0]?.clientX;
    switch (name) {
      case 'onTouchStart':
        startTime = new Date().getTime();
        break;
      case 'onTouchMove':
        break;
      case 'onTouchEnd':
        break;
      case 'onTouchCancel':
        break;
      default:
    }
  };

  /**
   * Touch event wrapper
   */
  const onTouchWrapper: TouchHandler = (name) => (e) => {
    onTouchHandler(name, e);
  };

  useEffect(() => {
    const _width = containerRef?.current?.parentElement?.getBoundingClientRect()?.width;
    if (_width && !width) {
      setWidth(_width);
    }
  }, []);

  return (
    <div className={styles.container} ref={containerRef}>
      {swipes.map((item) => (
        <div
          onTouchMove={onTouchWrapper('onTouchMove')}
          onTouchStart={onTouchWrapper('onTouchStart')}
          onTouchEnd={onTouchWrapper('onTouchEnd')}
          onTouchCancel={onTouchWrapper('onTouchCancel')}
          key={item.id}
          style={{ width }}
          className={clsx(
            styles.card,
            item.type === 'prev' ? styles.prev : item.type === 'next' ? styles.next : ''
          )}
          ref={getRef(item.id)}
        >
          <div className={styles.content}>{item.children}</div>
        </div>
      ))}
    </div>
  );
};

export default Swiper;
