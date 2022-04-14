import { NextPage } from 'next';
import s from './PortfolioItem.module.scss';

interface PortfolioItemProps {
  data: Job;
}

const PortfolioItem: NextPage<PortfolioItemProps> = (props) => {
  const { data } = props;
  const { name } = data;
  return (
    <div className={s.wrapper}>
      <h1 className={s.title}>{name}</h1>
    </div>
  );
};

export default PortfolioItem;
