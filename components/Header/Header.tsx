/******************************************************************************************
 * Repository: https://github.com/kolserdav/portfolio.git
 * File name: Header.tsx
 * Author: Sergey Kolmiller
 * Email: <serega12101983@gmail.com>
 * License: Special
 * License text: Only the owner of the specified repository has the right to copy and distribute this file or its parts
 * Copyright: kolserdav, All rights reserved (c)
 * Create Date: Fri May 06 2022 04:40:01 GMT+0700 (Krasnoyarsk Standard Time)
 ******************************************************************************************/
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
