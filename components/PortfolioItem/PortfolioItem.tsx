import { useMemo, useState, useEffect } from 'react';
import { NextPage } from 'next';
import NextImage from 'next/image';
import s from './PortfolioItem.module.scss';

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
    setFullImage({
      width,
      height,
      src: Image.full,
    });
    document.body.classList.add('noscroll');
  };

  /**
   * Close full image full
   */
  const closeFullImage = () => {
    setFullOpen(false);
    setFullImage(null);
    document.body.classList.remove('noscroll');
  };

  const zoomIn = () => {
    setZoomMax(true);
    setFullImage({
      width: 1920,
      height: 1080,
      src: Image.full,
    });
  };

  const zoomOut = () => {
    setZoomMax(false);
  };

  return (
    <div className={s.wrapper}>
      <div role="button" tabIndex={Image.id} className={s.image} onClick={clickToImage}>
        <NextImage
          src={data.Image.mobile}
          width={500}
          height={Math.ceil(500 / data.Image.coeff)}
          alt={`Job ${data.id}`}
        />
      </div>
      <div className={s.container}>
        <a href={link} className={s.link}>
          <h1 className={s.title}>{name}</h1>
        </a>
        <p className={s.desc}>{description}</p>
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
