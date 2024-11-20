import { OrdersQueue } from '@/components/orders-queue';
import { Loader } from '@/components/loader';
import { useGetOrdersQuery } from '@/services';

export const OrderHistoryPage = () => {
  const { data } = useGetOrdersQuery();

  if (!data?.success) return <Loader />;

  return <OrdersQueue orders={data.orders} />;
};
