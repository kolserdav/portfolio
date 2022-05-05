import Image from 'next/image';
import s from './About.module.scss';
import KolserdavIcon from '../../images/kolserdav.png';

const About = () => {
  return (
    <section className={s.wrapper}>
      <div className={s.container}>
        <h2>Обо мне</h2>
        <p className={s.large}>
          Перед тем как предложить мне работу пожалуйста ознакомьтесь с информацией о моем стеке
          технологий
        </p>
        <div className={s.personal}>
          <div className={s.personal__info}>
            <h3>Личная информация</h3>
            <p>
              Меня зовут Сергей Кольмиллер. Оказываю услуги веб программиста. С 2017 года
              профессионально занимаюсь программированием. До этого примерно с 2010 года занимался
              веб разработкой в качестве хобби и для дополнительного дохода, в то время для создания
              сайтов использовал разные CMS.
            </p>
          </div>
          <div className={s.image__container}>
            <Image
              className={s.personal__logo}
              width={225}
              height={225}
              layout="fixed"
              objectFit="cover"
              src={KolserdavIcon}
              alt="мое фото"
            />
          </div>
        </div>
        <div className={s.tech}>
          <h3>Технологии</h3>
          <p>
            Указанными технологиями список моих навыков не ограничен. Ниже перечислены только
            основные:
          </p>
        </div>
        <div className={s.stack__container}>
          <div className={s.stack__item}>
            <h4>Языки программирования</h4>
            <p>Javascript, Typescript</p>
          </div>
          <div className={s.stack__item}>
            <h4>Программирование серверной части (Backend)</h4>
            <p>NodeJS, Express, PrismaJS (SqlLite, MySQL или Postgres)</p>
          </div>
          <div className={s.stack__item}>
            <h4>Программирование клиентской части (Frontent)</h4>
            <p>ReactJS, Next.js</p>
          </div>
          <div className={s.stack__item}>
            <h4>Операционные системы</h4>
            <p>Linux</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
