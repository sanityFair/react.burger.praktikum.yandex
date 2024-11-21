import classNames from 'classnames';
import { InfoColumn } from './info-column';
import styles from './styles.module.css';
import { OrdersQueue } from '@/types';

type Props = OrdersQueue;

export const OrderStats = ({ orders, total, totalToday }: Props) => (
  <div>
    <div className={styles.status}>
      <InfoColumn
        title='Готовы:'
        done={true}
        orders={orders
          ?.filter((order) => order.status === 'done')
          .map((order) => order.number)
          .slice(0, 6)}
      />
      <InfoColumn
        title='В работе:'
        orders={orders
          ?.filter((order) => order.status === 'pending')
          .map((order) => order.number)
          .slice(0, 6)}
      />
    </div>
    <div className={styles.item}>
      <p className='text text_type_main-medium'>Выполнено за все время:</p>
      <p className={classNames(styles.number, 'text text_type_digits-large')}>
        {total}
      </p>
    </div>
    <div className={styles.item}>
      <p className='text text_type_main-medium'>Выполнено за сегодня:</p>
      <p className={classNames(styles.number, 'text text_type_digits-large')}>
        {totalToday}
      </p>
    </div>
  </div>
);
