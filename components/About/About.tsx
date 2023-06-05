/******************************************************************************************
 * Repository: https://github.com/kolserdav/portfolio.git
 * File name: About.tsx
 * Author: Sergey Kolmiller
 * Email: <kolserdav@uyem.ru>
 * License: Special
 * License text: Only the owner of the specified repository has the right to copy and distribute this file or its parts
 * Copyright: kolserdav, All rights reserved (c)
 * Create Date: Mon Jun 05 2023 12:08:24 GMT+0700 (Krasnoyarsk Standard Time)
 ******************************************************************************************/
import Image from 'next/image';
import s from './About.module.scss';
import KolserdavIcon from '../../images/kolserdav.png';

interface AboutProps {
  aboutTitle: string;
  aboutSubtitle: string;
  personalTitle: string;
  personalDescription: string;
  techTitle: string;
  techDescription: string;
  Tech: {
    id: number;
    title: string;
    description: string;
  }[];
}

const About = ({
  aboutTitle,
  aboutSubtitle,
  personalDescription,
  personalTitle,
  techTitle,
  techDescription,
  Tech,
}: AboutProps) => {
  return (
    <section className={s.wrapper}>
      <div className={s.container}>
        <h2>{aboutTitle}</h2>
        <p className={s.large}>{aboutSubtitle}</p>
        <div className={s.personal}>
          <div className={s.personal__info}>
            <h3>{personalTitle}</h3>
            <p>{personalDescription}</p>
          </div>
          <div className={s.image__container}>
            <Image
              className={s.personal__logo}
              width={225}
              height={225}
              src={KolserdavIcon}
              alt="мое фото"
            />
          </div>
        </div>
        <div className={s.tech}>
          <h3>{techTitle}</h3>
          <p>{techDescription}</p>
        </div>
        <div className={s.stack__container}>
          {Tech.map((item) => (
            <div key={item.id} className={s.stack__item}>
              <h4>{item.title}</h4>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
