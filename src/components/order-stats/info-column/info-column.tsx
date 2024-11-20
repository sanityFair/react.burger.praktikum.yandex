import classNames from 'classnames';
import styles from './styles.module.css';

type Props = {
  orders?: number[];
  title?: string;
  done?: boolean;
};

export const InfoColumn = ({ done, orders, title }: Props) => (
  <div className={classNames(styles.root)}>
    <p className='text text_type_main-medium'>{title}</p>
    <ul>
      {orders?.map((order) => (
        <li key={order} className={classNames('', { [styles.done]: done })}>
          {order}
        </li>
      ))}
    </ul>
  </div>
);
