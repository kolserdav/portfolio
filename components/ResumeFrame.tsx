import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { RESUME_LINK, RESUME_URL } from '../utils';
import s from './ResumeFrame.module.scss';

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
        <Link className={s.link} href={RESUME_LINK}>
          {printVersion}
        </Link>
      </div>
      <iframe ref={frameRef} title={title} src={RESUME_URL} />
    </div>
  );
};

export default ResumeFrame;
