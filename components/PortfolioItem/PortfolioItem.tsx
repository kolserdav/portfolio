/******************************************************************************************
 * Repository: https://github.com/kolserdav/portfolio.git
 * File name: PortfolioItem.tsx
 * Author: Sergey Kolmiller
 * Email: <serega12101983@gmail.com>
 * License: Special
 * License text: Only the owner of the specified repository has the right to copy and distribute this file or its parts
 * Copyright: kolserdav, All rights reserved (c)
 * Create Date: Sun Apr 17 2022 03:56:19 GMT+0700 (Красноярск, стандартное время)
 ******************************************************************************************/
import { useMemo, useState, useEffect } from 'react';
import { NextPage } from 'next';
import NextImage from 'next/image';
import s from './PortfolioItem.module.scss';
import { store } from '../../utils';

interface PortfolioItemProps {
  data: FullJob;
}

const getDeviceWidth = (): number => {
  const { width } = document.body.getBoundingClientRect();
  return width;
};

const PortfolioItem: NextPage<PortfolioItemProps> = (props) => {
  const { data } = props;
  const { name, description, link, Image } = data;

  const [fullOpen, setFullOpen] = useState<boolean>(false);
  const [fullStart, setFullStart] = useState<{
    width: number;
    height: number;
  } | null>(null);
  const [fullImage, setFullImage] = useState<{
    src: string;
    width: number;
    height: number;
  } | null>(null);
  const [zoomMax, setZoomMax] = useState<boolean>(false);

  /**
   * Click image handler
   */
  const clickToImage = () => {
    setFullOpen(!fullOpen);
    const devWidth = getDeviceWidth();
    const width = devWidth - 20;
    const height = Math.ceil(width / Image.coeff);
    setFullStart({
      width,
      height,
    });
    setFullImage({
      width,
      height,
      src: Image.full,
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
      src: Image.full,
    });
  };
  return (
    <div className={s.wrapper}>
      <div role="button" tabIndex={Image.id} className={s.image} onClick={clickToImage}>
        <NextImage
          objectFit="cover"
          placeholder="blur"
          blurDataURL={Image.small}
          src={data.Image.mobile}
          width={500}
          height={Math.ceil(500 / data.Image.coeff)}
          alt={`Job ${data.id}`}
        />
        <div className={s.zoom__icon} />
      </div>
      <div className={s.container}>
        <a href={link} className={s.link}>
          <h1 className={s.title}>{name}</h1>
        </a>
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
              objectFit="cover"
              objectPosition={0}
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
