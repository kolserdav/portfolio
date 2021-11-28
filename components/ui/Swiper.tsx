import { useMemo, useState, createRef, RefObject, useEffect, TouchEvent, LegacyRef } from 'react';
import clsx from 'clsx';
import styles from '../../styles/ui/Swiper.module.scss';

export interface Swipe {
  id: number;
  children: ReactElement | ReactElement[];
}

interface SwipeFull extends Swipe {
  type: 'next' | 'current' | 'prev';
}

/**
 * Callback for get next or previous card content
 */
export type GetSwipeHandler = (oldId: number) => Swipe | Promise<Swipe>;

type TouchName = 'onTouchMove' | 'onTouchStart' | 'onTouchEnd';

interface SwiperProps {
  /**
   * Current card content
   */
  current: Swipe;

  /**
   * Next card content
   */
  next: Swipe;

  /**
   * Previous card content
   */
  prev: Swipe;

  /**
   * Get next card handler
   */
  getNext: GetSwipeHandler;

  /**
   * Get previous card handler
   */
  getPrev: GetSwipeHandler;

  /**
   * Class name for content block
   */
  className?: string;

  /**
   * Button for swipe to next
   */
  nextButtonRef?: LegacyRef<HTMLButtonElement | undefined>;

  /**
   * Button for swipe to previous
   */
  prevButtonRef?: LegacyRef<HTMLButtonElement | undefined>;
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

let startClientX: number;
let lastLeft: number;

/**
 * Swiper component
 */
const Swiper: Page<SwiperProps, SwiperProps> = (props) => {
  const { current, next, prev, getNext, getPrev, className, prevButtonRef, nextButtonRef } = props;

  const [_current, setCurrent] = useState<Swipe>();
  const [_prev, setPrev] = useState<Swipe>();
  const [_next, setNext] = useState<Swipe>();
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [width, setWidth] = useState<number>(0);
  const [_left, _setLeft] = useState<number>(0);
  const [left, setLeft] = useState<number>(0);

  const containerRef = createRef<HTMLDivElement>();

  const swipes = useMemo(
    () => getSwipes(_prev || prev, _current || current, _next || next),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [_next]
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
  const onTouchHandler = async (name: TouchName, e: TouchEvent) => {
    const { touches } = e;
    const clientX = touches[0]?.clientX;
    startClientX = startClientX || 0;
    const touchLength = Math.abs(lastLeft);
    switch (name) {
      case 'onTouchStart':
        startClientX = clientX;
        break;
      case 'onTouchMove':
        lastLeft = _left - (startClientX - clientX);
        setLeft(lastLeft);
        break;
      case 'onTouchEnd':
        if (touchLength > width / 3) {
          setLeft(0);
          if (lastLeft < 0) {
            setPrev(_current);
            setCurrent(_next);
            setNext(await getNext(_next?.id || 0));
          } else {
            setPrev(await getPrev(_prev?.id || 0));
            setCurrent(_prev);
            setNext(_current);
          }
          getRef(_next?.id || 0).current?.classList.add(styles.go);
          getRef(_prev?.id || 0).current?.classList.add(styles.go);
          getRef(_current?.id || 0).current?.classList.add(styles.go);
          setTimeout(() => {
            getRef(_next?.id || 0).current?.classList.remove(styles.go);
            getRef(_prev?.id || 0).current?.classList.remove(styles.go);
            getRef(_current?.id || 0).current?.classList.remove(styles.go);
          }, 450);
        } else {
          getRef(_next?.id || 0).current?.classList.add(styles.back);
          getRef(_prev?.id || 0).current?.classList.add(styles.back);
          getRef(_current?.id || 0).current?.classList.add(styles.back);
          setLeft(0);
          setTimeout(() => {
            getRef(_next?.id || 0).current?.classList.remove(styles.back);
            getRef(_prev?.id || 0).current?.classList.remove(styles.back);
            getRef(_current?.id || 0).current?.classList.remove(styles.back);
          }, 450);
        }
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
    const _height = containerRef?.current?.parentElement?.getBoundingClientRect()?.height;
    const __left = containerRef?.current?.parentElement?.getBoundingClientRect()?.left;
    const _windowWidth = document.body.clientWidth;
    if (_width && !width && _height && !height) {
      setWidth(_width);
      setHeight(_height);
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
          key={item.id}
          id={item.id.toString()}
          style={
            item.type === 'current'
              ? { width, height, left }
              : item.type === 'prev'
              ? { width, height, left: left - windowWidth }
              : { width, height, left: left + windowWidth }
          }
          className={clsx(
            styles.card,
            item.type === 'prev' ? styles.prev : item.type === 'next' ? styles.next : ''
          )}
          ref={getRef(item.id)}
        >
          <div className={clsx(styles.content, className)}>{item.children}</div>
        </div>
      ))}
    </div>
  );
};

Swiper.defaultProps = {
  className: '',
};

export default Swiper;
