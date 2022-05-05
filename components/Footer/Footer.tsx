/******************************************************************************************
 * Repository: https://github.com/kolserdav/portfolio.git
 * File name: Footer.tsx
 * Author: Sergey Kolmiller
 * Email: <serega12101983@gmail.com>
 * License: Special
 * License text: Only the owner of the specified repository has the right to copy and distribute this file or its parts
 * Copyright: kolserdav, All rights reserved (c)
 * Create Date: Fri May 06 2022 04:40:01 GMT+0700 (Krasnoyarsk Standard Time)
 ******************************************************************************************/
import s from './Footer.module.scss';
import { CONTACTS } from '../../utils';

const { email, telegram, github } = CONTACTS;

const startYear = 2022;
let currentYear = new Date().getFullYear();
if (currentYear === startYear) {
  currentYear = 0;
}

const Footer = () => {
  return (
    <footer className={s.wrapper}>
      <div className={s.container}>
        <div className={s.links}>
          <div className={s.link}>
            Почта: <a href={`mailto:${email}`}>{email}</a>
          </div>
          <div className={s.link}>
            Телеграм: <a href={`https://t.me/${telegram}`}>@{telegram}</a>
          </div>
          <div className={s.link}>
            Github: <a href={github}>{github}</a>
          </div>
        </div>
        <div className={s.copyright}>
          © Все права защищены 2022{currentYear !== 0 && ` - ${currentYear}`}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
