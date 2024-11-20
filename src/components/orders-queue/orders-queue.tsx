import styles from './styles.module.css';
import { OrderCard } from './order-card';
import classNames from 'classnames';
import { OrderInfo } from '@/types';

type Props = {
  title?: string;
  orders?: OrderInfo[];
};

export const OrdersQueue = ({ title, orders }: Props) => (
  <div className={styles.root}>
    {title && (
      <p className={classNames(styles.title, 'text text_type_main-large')}>
        {title}
      </p>
    )}
    <div className={styles.container}>
      {orders?.map((order) => (
        <OrderCard {...order} key={order.createdAt} />
      ))}
    </div>
  </div>
);
