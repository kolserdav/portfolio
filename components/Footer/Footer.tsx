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
