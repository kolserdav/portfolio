/******************************************************************************************
 * Repository: https://github.com/kolserdav/portfolio.git
 * File name: Footer.tsx
 * Author: Sergey Kolmiller
 * Email: <kolserdav@uyem.ru>
 * License: Special
 * License text: Only the owner of the specified repository has the right to copy and distribute this file or its parts
 * Copyright: kolserdav, All rights reserved (c)
 * Create Date: Mon Jun 05 2023 12:08:24 GMT+0700 (Krasnoyarsk Standard Time)
 ******************************************************************************************/
import { useRouter } from 'next/router';
import s from './Footer.module.scss';
import { CONTACTS } from '../../utils';
import Link from 'next/link';

const { email, telegram, github } = CONTACTS;

const startYear = 2022;
let currentYear = new Date().getFullYear();
if (currentYear === startYear) {
  currentYear = 0;
}

const Footer = () => {
  const { locale } = useRouter();
  return (
    <footer className={s.wrapper}>
      <div className={s.container}>
        <div className={s.links}>
          <div className={s.link}>
            {locale === 'ru' ? 'Почта:' : 'Email:'}{' '}
            <a target="_blank" href={`mailto:${email}`}>
              {email}
            </a>
          </div>
          <div className={s.link}>
            Telegram:{' '}
            <a target="_blank" href={`https://t.me/${telegram}`}>
              @{telegram}
            </a>
          </div>
          <div className={s.link}>
            Github:{' '}
            <a target="_blank" href={github}>
              {github}
            </a>
          </div>
          <div className={s.link}>
            <Link rel="noreferrer" href={locale === 'ru' ? '/resume' : '/en/resume'}>
              {locale === 'ru' ? 'Мое актуальное резюме' : 'My current resume'}
            </Link>
          </div>
        </div>
        <div className={s.copyright}>
          © {locale === 'ru' ? 'Все права защищены' : 'All rights reserved'} 2022
          {currentYear !== 0 && ` - ${currentYear}`}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
