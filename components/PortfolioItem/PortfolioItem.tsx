/******************************************************************************************
 * Repository: https://github.com/kolserdav/portfolio.git
 * File name: PortfolioItem.tsx
 * Author: Sergey Kolmiller
 * Email: <kolserdav@uyem.ru>
 * License: Special
 * License text: Only the owner of the specified repository has the right to copy and distribute this file or its parts
 * Copyright: kolserdav, All rights reserved (c)
 * Create Date: Mon Jun 05 2023 12:08:24 GMT+0700 (Krasnoyarsk Standard Time)
 ******************************************************************************************/
import { useState } from 'react';
import { NextPage } from 'next';
import NextImage from 'next/image';
import s from './PortfolioItem.module.scss';
import { store, IMG_SIZES } from '../../utils';

interface PortfolioItemProps {
  data: FullJob;
}

interface FullImage {
  src: string;
  width: number;
  height: number;
}

/**
 * Get width of device
 */
const getDeviceWidth = (): number => {
  const { width } = document.body.getBoundingClientRect();
  return width;
};

/**
 * Image loader by width
 */
const getActualImage = ({ Image, width }: { Image: FullJob['Image']; width: number }): string => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const imgKeys: any[] = Object.keys(IMG_SIZES);
  const _imgKeys: (keyof typeof IMG_SIZES)[] = imgKeys;
  let image = Image.full;
  for (let i = 0; _imgKeys[i]; i++) {
    const key = _imgKeys[i];
    if (key === 'desktop') {
      if (width >= IMG_SIZES[key]) {
        image = Image.desktop;
      }
    } else if (key === 'small') {
      if (width <= IMG_SIZES[key]) {
        image = Image.small;
      }
    } else if (width >= IMG_SIZES[key] && width <= IMG_SIZES[_imgKeys[i - 1]]) {
      image = Image[_imgKeys[i - 1]];
    } else if (width <= IMG_SIZES[key] && width >= IMG_SIZES[_imgKeys[i + 1]]) {
      image = Image[key];
    }
  }
  return image;
};

/**
 * Slider card component
 */
const PortfolioItem: NextPage<PortfolioItemProps> = (props) => {
  const { data } = props;
  const { name, description, link, Image } = data;

  const [fullOpen, setFullOpen] = useState<boolean>(false);
  const [fullStart, setFullStart] = useState<FullImage | null>(null);
  const [fullImage, setFullImage] = useState<FullImage | null>(null);
  const [zoomMax, setZoomMax] = useState<boolean>(false);

  /**
   * Click image handler
   */
  const clickToImage = () => {
    setFullOpen(!fullOpen);
    const devWidth = getDeviceWidth();
    const width = devWidth - 20;
    const height = Math.ceil(width / Image.coeff);
    const image = getActualImage({
      Image,
      width,
    });
    setFullStart({
      width,
      height,
      src: image,
    });
    setFullImage({
      width,
      height,
      src: image,
    });
    document.body.classList.add('noscroll');
    store.dispatch({ type: 'SWIPER_BLOCKED', value: true });
  };

  /**
   * Close full image
   */
  const closeFullImage = () => {
    setFullOpen(false);
    setFullImage(null);
    document.body.classList.remove('noscroll');
    store.dispatch({ type: 'SWIPER_BLOCKED', value: false });
  };

  /**
   * Click zoom in handler
   */
  const zoomIn = () => {
    setZoomMax(true);
    const { width, coeff } = Image;
    const height = Math.ceil(width / coeff);
    setFullImage({
      width,
      height,
      src: Image.full,
    });
  };

  /**
   * Click zoom out handler
   */
  const zoomOut = () => {
    setZoomMax(false);
    setFullImage({
      width: fullStart?.width || 0,
      height: fullStart?.height || 0,
      src: fullStart?.src || '',
    });
  };

  return (
    <div className={s.wrapper}>
      <div role="button" tabIndex={Image.id} className={s.image} onClick={clickToImage}>
        <NextImage
          placeholder="blur"
          blurDataURL={Image.small}
          src={data.Image.mobile}
          width={500}
          height={Math.ceil(500 / data.Image.coeff)}
          alt={`Job ${data.id}`}
          priority
          loading="eager"
        />
        <div className={s.zoom__icon} />
      </div>
      <div className={s.container}>
        {link ? (
          <a href={link} target="_blank" className={s.link}>
            <h1 className={s.title}>{name}</h1>
          </a>
        ) : (
          <h1 className={s.title}>{name}</h1>
        )}
        <p className={s.desc} dangerouslySetInnerHTML={{ __html: description }} />
      </div>
      <div className={s.full__image__container} style={!fullOpen ? { display: 'none' } : {}}>
        <div className={s.full__image__actions}>
          <div
            role="button"
            tabIndex={0}
            title="Zoom out"
            className={zoomMax ? s.zoomOut__white : s.zoomOut__black}
            onClick={zoomOut}
          />
          <div
            role="button"
            tabIndex={0}
            title="Zoom in"
            className={zoomMax ? s.zoomIn__black : s.zoomIn__white}
            onClick={zoomIn}
          />
          <div
            role="button"
            tabIndex={0}
            title="Close"
            className={s.close}
            onClick={closeFullImage}
          />
        </div>
        <div className={s.full__image}>
          {fullOpen && fullImage && (
            <NextImage
              placeholder="blur"
              blurDataURL={Image.small}
              src={fullImage.src}
              width={fullImage.width}
              height={fullImage.height}
              alt={`Full job ${data.id}`}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PortfolioItem;
