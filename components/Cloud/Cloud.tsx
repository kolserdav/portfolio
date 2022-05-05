import Image from 'next/image';
import s from './Cloud.module.scss';
import { HETZNER_REFERAL_LINK } from '../../utils';
import HetznerLogo from '../../images/hetzner-logo/small.png';

interface CloudProps {
  title: string;
  content: string;
}

const Cloud = (props: CloudProps) => {
  const { title, content } = props;
  return (
    <section className={s.wrapper}>
      <div className={s.container}>
        <div className={s.info}>
          <h2 className={s.title}>{title}</h2>
          <p className={s.content} dangerouslySetInnerHTML={{ __html: content }} />
        </div>
        <a className={s.image} href={HETZNER_REFERAL_LINK}>
          <Image
            layout="fixed"
            objectFit="cover"
            src={HetznerLogo}
            width={320}
            height={151}
            alt="hetzner"
          />
        </a>
      </div>
    </section>
  );
};

export default Cloud;
