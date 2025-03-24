import { useEffect, useRef } from 'react';
import Link from 'next/link';

import s from './ResumeFrame.module.scss';
import { RESUME_LINK_RU } from '../utils';

const ResumeFrame = ({ title, printVersion }: { title: string; printVersion: string }) => {
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
      <div className={s.link__container}>
        <h1>{title}</h1>
        <Link className={s.link} href={RESUME_LINK_RU}>
          {printVersion}
        </Link>
      </div>
      <iframe
        className={s.frame}
        ref={frameRef}
        title={title}
        src={`${RESUME_LINK_RU}?embedded=true`}
      />
    </div>
  );
};

export default ResumeFrame;
