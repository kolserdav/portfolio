/******************************************************************************************
 * Repository: https://github.com/kolserdav/portfolio.git
 * File name: Cloud.tsx
 * Author: Sergey Kolmiller
 * Email: <serega12101983@gmail.com>
 * License: Special
 * License text: Only the owner of the specified repository has the right to copy and distribute this file or its parts
 * Copyright: kolserdav, All rights reserved (c)
 * Create Date: Fri May 06 2022 04:40:01 GMT+0700 (Krasnoyarsk Standard Time)
 ******************************************************************************************/
import Image from 'next/image';
import s from './Cloud.module.scss';
import { HETZNER_REFERAL_LINK } from '../../utils';
import HetznerLogo from '../../images/hetzner-logo/small.png';

interface CloudProps {
  cloudTitle: string;
  cloudContent: string;
}

const Cloud = (props: CloudProps) => {
  const { cloudTitle, cloudContent } = props;
  return (
    <section className={s.wrapper}>
      <div className={s.container}>
        <div className={s.info}>
          <h2 className={s.title}>{cloudTitle}</h2>
          <p className={s.content} dangerouslySetInnerHTML={{ __html: cloudContent }} />
        </div>
        <a className={s.image} href={HETZNER_REFERAL_LINK}>
          <Image src={HetznerLogo} width={320} height={151} alt="hetzner" />
        </a>
      </div>
    </section>
  );
};

export default Cloud;
