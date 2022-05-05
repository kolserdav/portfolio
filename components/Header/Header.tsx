import s from './Header.module.scss';

interface HeaderProps {
  title: string;
  subtitle: string;
  description: string;
}

const Header = (props: HeaderProps) => {
  const { title, subtitle, description } = props;
  return (
    <header className={s.wrapper}>
      <div className={s.container}>
        <div className={s.info}>
          <h1 className={s.title}>{title}</h1>
          <h3 className={s.subtitle}>{subtitle}</h3>
          <p className={s.description}>{description}</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
