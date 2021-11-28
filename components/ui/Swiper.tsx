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

interface SwiperProps {
  current: Swipe;
  next: Swipe;
  prev: Swipe;
  getNext: GetSwipeHandler;
  getPrev: GetSwipeHandler;
}

/**
 * Create swipe list from values
 */
const getSwipes = (__prev: Swipe, __current: Swipe, __next: Swipe): SwipeFull[] => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result: any[] = [1, 2, 3].map((id) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const item: any = id === 1 ? { ...__prev } : id === 2 ? { ...__current } : { ...__next };
    item.type = id === 1 ? 'prev' : id === 2 ? 'current' : 'next';
    return item;
  });
  return result;
};

const refs: {
  [key: number]: RefObject<HTMLDivElement>;
} = {};

let startTime: number;
let startClientX: number;

/**
 * Swiper component
 */
const Swiper: Page<SwiperProps, SwiperProps> = (props) => {
  const { current, next, prev, getNext, getPrev } = props;

  const [_current, setCurrent] = useState<Swipe>();
  const [_prev, setPrev] = useState<Swipe>();
  const [_next, setNext] = useState<Swipe>();
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const [width, setWidth] = useState<number>(0);
  const [_left, _setLeft] = useState<number>(0);
  const [left, setLeft] = useState<number>(0);

  const containerRef = createRef<HTMLDivElement>();

  const swipes = useMemo(
    () => getSwipes(_prev || prev, _current || current, _next || next),
    [_prev, _current, _next, current, next, prev]
  );

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
    startClientX = startClientX || 0;
    let __left;
    switch (name) {
      case 'onTouchStart':
        startTime = new Date().getTime();
        startClientX = clientX;
        break;
      case 'onTouchMove':
        __left = _left - (startClientX - clientX);
        setLeft(__left);
        break;
      case 'onTouchEnd':
        getRef(_next?.id || 0).current?.classList.add(styles.back);

        getRef(_prev?.id || 0).current?.classList.add(styles.back);

        getRef(_current?.id || 0).current?.classList.add(styles.back);
        setLeft(0);
        setTimeout(() => {
          getRef(_next?.id || 0).current?.classList.remove(styles.back);
          getRef(_prev?.id || 0).current?.classList.remove(styles.back);
          getRef(_current?.id || 0).current?.classList.remove(styles.back);
        }, 250);
        break;
      case 'onTouchCancel':
        break;
      default:
    }
  };

  /**
   * Touch event wrapper
   */
  const onTouchWrapper =
    (name: TouchName): ((event: TouchEvent<HTMLDivElement>) => void) =>
    (e) => {
      onTouchHandler(name, e);
    };

  useEffect(() => {
    const _width = containerRef?.current?.parentElement?.getBoundingClientRect()?.width;
    const __left = containerRef?.current?.parentElement?.getBoundingClientRect()?.left;
    const _windowWidth = document.body.clientWidth;
    if (_width && !width) {
      setWidth(_width);
    }
    // save container left
    if (__left && !left) {
      _setLeft(__left);
    }
    // save window width
    if (!windowWidth && _windowWidth) {
      setWindowWidth(_windowWidth);
    }
    // set start cards
    if (!_current || !_prev || !_next) {
      setCurrent(current);
      setNext(next);
      setPrev(prev);
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
          id={item.id.toString()}
          style={
            item.type === 'current'
              ? { width, left }
              : item.type === 'prev'
              ? { width, left: left - windowWidth }
              : { width, left: left + windowWidth }
          }
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
