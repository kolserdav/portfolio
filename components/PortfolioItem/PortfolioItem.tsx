import { useMemo, useState } from 'react';
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
  }>();

  /**
   * Click image handler
   */
  const clickToImage = () => {
    setFullOpen(!fullOpen);
    setFullImage({
      width: 800,
      height: 480,
      src: Image.full,
    });
  };

  return (
    <div className={s.wrapper}>
      <div role="button" tabIndex={Image.id} className={s.image} onClick={clickToImage}>
        <NextImage
          src={data.Image.mobile}
          width={500}
          height={Math.ceil(500 / data.Image.coeff)}
          alt={`Image ${data.Image.id}`}
        />
      </div>
      <div className={s.container}>
        <a href={link} className={s.link}>
          <h1 className={s.title}>{name}</h1>
        </a>
        <p className={s.desc}>{description}</p>
      </div>
      <div className={s.full__image} style={!fullOpen ? { display: 'none' } : {}}>
        <div className={s.close} />
        <div className={s.full__image__container}>
          {fullOpen && fullImage && (
            <NextImage src={fullImage.src} width={fullImage.width} height={fullImage.height} />
          )}
        </div>
      </div>
    </div>
  );
};

export default PortfolioItem;
