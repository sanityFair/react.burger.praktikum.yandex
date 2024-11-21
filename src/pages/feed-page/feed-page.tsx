import { OrdersQueue } from '@/components/orders-queue';
import styles from './styles.module.css';
import { OrderStats } from '@/components/order-stats';
import { Loader } from '@/components/loader';
import { useGetOrdersQuery } from '@/services';

export const FeedPage = () => {
  const { data } = useGetOrdersQuery();

  if (!data?.success) return <Loader />;

  return (
    <div className={styles.root}>
      <OrdersQueue title='Лента заказов' orders={data.orders} />
      <OrderStats {...data} />
    </div>
  );
};
