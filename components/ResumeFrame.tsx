import { useEffect, useRef } from 'react';
import Link from 'next/link';
import type { Lang } from '@prisma/client';
import s from './ResumeFrame.module.scss';
import {
  RESUME_LINK_EN,
  RESUME_LINK_PRINT_EN,
  RESUME_LINK_PRINT_RU,
  RESUME_LINK_RU,
} from '../utils';

const ResumeFrame = ({
  title,
  printVersion,
  lang,
}: {
  title: string;
  printVersion: string;
  lang: Lang;
}) => {
  const frameRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const { current } = frameRef;
    if (!current) {
      return;
    }
    const { outerWidth, outerHeight } = window;
    current.width = outerWidth.toString();
    current.height = outerHeight.toString();
  }, []);

  return (
    <div className={s.wrapper}>
      <div className={s.back}>
        <Link className={s.link} href="/">
          &larr;
        </Link>
      </div>
      <div className={s.link__container}>
        <h1>{title}</h1>
        <Link
          target="_blank"
          className={s.link}
          href={lang === 'ru' ? RESUME_LINK_PRINT_RU : RESUME_LINK_PRINT_EN}
        >
          {printVersion}
        </Link>
      </div>
      <iframe ref={frameRef} title={title} src={lang === 'ru' ? RESUME_LINK_RU : RESUME_LINK_EN} />
    </div>
  );
};

export default ResumeFrame;
