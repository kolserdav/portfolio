import s from './About.module.scss';

const About = () => {
  return (
    <section className={s.wrapper}>
      <div className={s.container}>
        <h2>Обо мне</h2>
        <p className={s.large}>
          Перед тем как предложить мне работу пожалуйста ознакомтесь с информацией о моем стеке
          технологий
        </p>
        <h3>Технологии</h3>
        <p>
          Указанными технологиями список моих навыков не ограничен. Ниже перечислены только
          основные:
        </p>
        <h4>Языки программирования</h4>
        <p>Javascript, Typescript</p>
        <h4>Программирование серверной части (Backend)</h4>
        <p>NodeJS, Express, PrismaJS (SqlLite, MySQL или Postgres)</p>
        <h4>Программирование клиентской части (Frontent)</h4>
        <p>ReactJS, Next.js</p>
        <h4>Операционные системы</h4>
        <p>Linux</p>
      </div>
    </section>
  );
};

export default About;
